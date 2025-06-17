'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Doc = {
  slug: string;
  title: string;
};

type SidebarProps = {
  docs: Doc[];
};

export default function Sidebar({ docs }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 p-4 border-r bg-white">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Documentation</h2>
      <nav>
        <ul>
          {docs.map(doc => {
            const href = `/docs/${doc.slug}`;
            const isActive = pathname === href;

            return (
              <li key={doc.slug}>
                <Link
                  href={href}
                  className={`
                    block py-2 px-3 rounded-md text-gray-600 transition-colors duration-200
                    hover:bg-gray-100 hover:text-gray-900
                    ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : ''}
                  `}
                >
                  {doc.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
