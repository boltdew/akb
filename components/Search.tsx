'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// Define the structure of a Pagefind search result
interface PagefindResult {
  id: string;
  data: () => Promise<{
    url: string;
    meta: { title: string };
    excerpt: string;
  }>;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [pagefind, setPagefind] = useState<any>(null);

  useEffect(() => {
    // This effect runs once on the client to load the Pagefind script
    const loadPagefind = async () => {
      if (window.pagefind) {
        setPagefind(window.pagefind);
      } else {
        try {
          // @ts-ignore
          const pagefindModule = await import(/* webpackIgnore: true */ '/pagefind/pagefind.js');
          setPagefind(pagefindModule);
          window.pagefind = pagefindModule;
        } catch (e) {
          console.error('Failed to load Pagefind:', e);
        }
      }
    };
    loadPagefind();
  }, []);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (pagefind && searchQuery.length > 2) {
      const search = await pagefind.search(searchQuery);
      setResults(search.results);
    } else {
      setResults([]);
    }
  }, [pagefind]);

  useEffect(() => {
    // Debounce search to avoid excessive API calls
    const handler = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, performSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search docs..."
        className="border rounded-md px-2 py-1 w-full"
      />
      {results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border mt-1 rounded-md shadow-lg z-10">
          {results.map((result) => (
            <SearchResultItem key={result.id} result={result} />
          ))}
        </ul>
      )}
    </div>
  );
}

// Sub-component to render each search result
function SearchResultItem({ result }: { result: PagefindResult }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await result.data();
      setData(res);
    };
    fetchData();
  }, [result]);

  if (!data) {
    return null; // Or a loading skeleton
  }

  return (
    <li className="border-b last:border-b-0">
      <Link href={data.url} className="block p-4 hover:bg-gray-100">
        <div className="font-bold text-blue-600">{data.meta.title}</div>
        <div
          className="text-sm text-gray-700 mt-1"
          dangerouslySetInnerHTML={{ __html: data.excerpt }}
        />
      </Link>
    </li>
  );
}
