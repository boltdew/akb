import { createCheckoutSession } from '@/lib/stripe';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get access to comprehensive aviation documentation with flexible pricing options.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Monthly Plan */}
          <div className="card p-8 relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Monthly Subscription</h3>
              <div className="text-5xl font-bold text-blue-600 mb-2">35 AED</div>
              <p className="text-gray-600">per month</p>
              <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <Star className="w-4 h-4 mr-1" />
                7-day free trial
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Access to all 2000+ aviation documents</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Organized by ATA chapters</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Instant search across all content</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Regular content updates</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Mobile-friendly access</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Cancel anytime</span>
              </li>
            </ul>

            <Link href="/sign-up" className="btn-primary w-full text-center block">
              Sign Up for Free Trial
            </Link>
          </div>

          {/* Lifetime Plan */}
          <div className="card p-8 relative border-2 border-blue-500">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                Best Value - Save 70%
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lifetime Access</h3>
              <div className="text-5xl font-bold text-blue-600 mb-2">125 AED</div>
              <p className="text-gray-600">one-time payment</p>
              <div className="mt-4 text-sm text-gray-500">
                <span className="line-through">420 AED/year</span>
                <span className="text-green-600 font-semibold ml-2">Save 295 AED</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Everything in Monthly plan</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Lifetime access</strong> - no recurring payments</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>All future content updates included</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Priority customer support</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Early access to new features</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Transferable license</span>
              </li>
            </ul>

            <Link href="/sign-up" className="btn-primary w-full text-center block">
              Sign Up for Lifetime Access
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's included in the free trial?
              </h3>
              <p className="text-gray-600">
                The 7-day free trial gives you full access to all 2000+ aviation documents, search functionality, and all premium features. No credit card required to start.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your monthly subscription at any time through your dashboard. You'll continue to have access until the end of your billing period.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, Mastercard, American Express) and digital wallets through our secure Stripe payment system.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is the lifetime plan really lifetime?
              </h3>
              <p className="text-gray-600">
                Yes! The lifetime plan gives you permanent access to the platform and all future content updates for a one-time payment. No recurring fees ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}