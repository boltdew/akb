import Stripe from 'stripe';

import { buffer } from 'node:stream/consumers';
import xata from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await buffer(req.body as any);
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const userId = session.metadata?.userId;
    if (!userId) {
      return new Response('Webhook Error: No user ID in session metadata', { status: 400 });
    }

    const user = await xata.db.users.filter({ user_id: userId }).getFirst();

    if (user) {
      await xata.db.users.update(user.id, {
        subscription_status: 'active',
        plan_type: subscription.items.data[0].price.id,
        stripe_customer_id: subscription.customer as string,
      });
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const stripeCustomerId = subscription.customer as string;

    const user = await xata.db.users.filter({ stripe_customer_id: stripeCustomerId }).getFirst();

    if (user) {
      await xata.db.users.update(user.id, {
        subscription_status: 'inactive',
        plan_type: '',
      });
    }
  }

  return new Response(null, { status: 200 });
}
