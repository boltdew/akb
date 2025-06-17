import { auth } from '@clerk/nextjs/server';
import xata from '@/lib/db';
import { createBillingPortalSession } from '@/lib/stripe';
import Link from 'next/link';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    // This should ideally be handled by middleware, but as a fallback:
    return (
      <div className="text-center">
        <p>You must be logged in to view the dashboard.</p>
        <Link href="/" className="text-blue-600 hover:underline">Go to Homepage</Link>
      </div>
    );
  }

  const user = await xata.db.users.filter({ user_id: userId }).getFirst();

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">Your Dashboard</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Manage your subscription and access your account details.
        </p>
      </div>

      <div className="max-w-2xl mx-auto card p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Subscription Details</h2>
        {user?.subscription_status === 'active' ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                {user.subscription_status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plan:</span>
              <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                {user.plan_type}
              </span>
            </div>
            <form action={createBillingPortalSession.bind(null, user.stripe_customer_id)} className="pt-4">
              <button type="submit" className="btn-primary w-full">
                Manage Billing
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">You do not have an active subscription.</p>
            <Link href="/pricing" className="btn-primary">
              View Plans
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
