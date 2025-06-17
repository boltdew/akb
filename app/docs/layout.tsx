import Sidebar from '@/components/Sidebar';
import fs from 'fs';
import path from 'path';

const getDocs = () => {
  const contentDir = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(contentDir);

  return filenames.map(filename => {
    const slug = filename.replace(/\.mdx$/, '');
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { slug, title };
  });
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const docs = getDocs();

  return (
    <div className="flex">
      <Sidebar docs={docs} />
      <main className="flex-1 p-8">
        <article className="prose lg:prose-xl max-w-none">
          {children}
        </article>
      </main>
    </div>
  );
}
