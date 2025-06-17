'use server';

import Stripe from 'stripe';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(userId: string | null, userEmail: string | undefined, priceId: string) {
  if (!userId || !userEmail) {
    throw new Error('User must be logged in to subscribe.');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/docs/introduction`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: {
      userId: userId,
    },
  });

  if (session.url) {
    redirect(session.url);
  } else {
    throw new Error('Could not create Stripe checkout session.');
  }
}

export async function createBillingPortalSession(stripeCustomerId: string | null | undefined) {
  if (!stripeCustomerId) {
    throw new Error('Stripe customer ID is required.');
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
  });

  if (session.url) {
    redirect(session.url);
  } else {
    throw new Error('Could not create Stripe billing portal session.');
  }
}