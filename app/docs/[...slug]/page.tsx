import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

// MDX Components
const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold text-gray-900 mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-700 leading-7" {...props} />,
  ul: (props: any) => <ul className="mb-4 pl-6 list-disc" {...props} />,
  ol: (props: any) => <ol className="mb-4 pl-6 list-decimal" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  code: (props: any) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props} />,
  pre: (props: any) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4" {...props} />,
};

async function getDocContent(slug: string[]) {
  const filePath = path.join(process.cwd(), 'content', `${slug.join('/')}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return { frontmatter: data, content };
  } catch (error) {
    return null;
  }
}

export default async function DocPage({ params }: { params: { slug: string[] } }) {
  const docData = await getDocContent(params.slug);

  if (!docData) {
    notFound();
  }

  const { frontmatter, content } = docData;
  const isPro = frontmatter.pro === true;

  // If content is pro, show paywall (simplified for now)
  if (isPro) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/docs" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documentation
            </Link>
          </div>

          <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-yellow-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Content
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              This document is part of our premium collection. Subscribe to get access to all aviation documentation.
            </p>

            <div className="space-y-4 mb-8">
              <div className="text-left max-w-md mx-auto">
                <h3 className="font-semibold text-gray-900 mb-2">What you'll get:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Access to 2000+ technical documents
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Organized by ATA chapters
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Instant search functionality
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Regular content updates
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up" className="btn-primary">
                Start Free Trial
              </Link>
              <Link href="/sign-in" className="btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/docs" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documentation
          </Link>
        </div>

        <article className="prose lg:prose-xl max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {frontmatter.title || 'Untitled Document'}
            </h1>
            {isPro && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                Premium Content
              </div>
            )}
          </header>

          <div className="prose-content">
            <MDXRemote source={content} components={components} />
          </div>
        </article>
      </div>
    </div>
  );
}