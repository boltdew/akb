import Link from 'next/link';
import { BookOpen, Lock, Search as SearchIcon } from 'lucide-react';
import Search from '@/components/Search';

export default function DocsIndexPage() {
  // Sample documentation structure
  const docCategories = [
    {
      title: "ATA 21 - Air Conditioning",
      description: "Environmental control systems, air conditioning, and pressurization",
      docs: ["21-10 General", "21-20 Distribution", "21-30 Pressurization Control"],
      locked: true
    },
    {
      title: "ATA 24 - Electrical Power",
      description: "Electrical generation, distribution, and emergency power systems",
      docs: ["24-10 Generator Drive", "24-20 AC Generation", "24-30 DC Power"],
      locked: true
    },
    {
      title: "ATA 27 - Flight Controls",
      description: "Primary and secondary flight control systems",
      docs: ["27-10 Aileron Control", "27-20 Rudder Control", "27-30 Spoiler Control"],
      locked: true
    },
    {
      title: "ATA 32 - Landing Gear",
      description: "Landing gear systems, wheels, brakes, and steering",
      docs: ["32-10 Main Gear", "32-20 Nose Gear", "32-30 Gear Extension"],
      locked: true
    },
    {
      title: "Sample Documentation",
      description: "Free sample documents to explore the platform",
      docs: ["Getting Started", "Sample Technical Manual", "Platform Overview"],
      locked: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Aviation Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive technical documentation organized by ATA chapters for aviation professionals.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <div className="pl-12">
                <Search />
              </div>
            </div>
          </div>

          {/* Access Status */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-medium">
            <BookOpen className="w-4 h-4 mr-2" />
            <Link href="/sign-up" className="underline">Sign up for free trial</Link>
          </div>
        </div>

        {/* Documentation Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docCategories.map((category, index) => (
            <div key={index} className={`card p-6 ${category.locked ? 'opacity-75' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h3>
                {category.locked && (
                  <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </div>
              
              <p className="text-gray-600 mb-6">
                {category.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {category.docs.map((doc, docIndex) => (
                  <div key={docIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    {doc}
                  </div>
                ))}
              </div>
              
              {category.locked ? (
                <Link 
                  href="/pricing" 
                  className="btn-secondary w-full text-center block"
                >
                  Unlock Access
                </Link>
              ) : (
                <Link 
                  href={`/docs/${category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="btn-primary w-full text-center block"
                >
                  Browse Documents
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Access All Documentation?
            </h2>
            <p className="text-gray-600 mb-6">
              Get unlimited access to over 2000 aviation technical documents with our subscription plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing" className="btn-primary">
                View Pricing Plans
              </Link>
              <Link href="/sign-up" className="btn-secondary">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}