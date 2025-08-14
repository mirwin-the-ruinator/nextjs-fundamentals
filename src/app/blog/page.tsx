import Link from 'next/link';
import Image from 'next/image';
import { getAllPostSummaries } from '@/lib/posts';

export const revalidate = false; // build-time only for now

export default function BlogIndex() {
  const posts = getAllPostSummaries(); // runs at build
  return (
    <main>
      <h1 className={'text-2xl underline mb-2.5'}>Blog</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug} className={'p-3.5 mb-2.5'}>
            <Link href={`/blog/${p.slug}`}>
              <h2>{p.metadata.title}</h2>
              {p.metadata.banner && (
                <Image
                  src={p.metadata.banner}
                  alt=""
                  width={800}
                  height={420}
                  style={{ maxWidth: 250, width: '100%', height: 'auto', borderRadius: 6 }}
                />
              )}

              <div style={{ fontSize: 12, color: '#666' }}>{p.metadata.date}</div>
              {p.metadata.excerpt && <div>{p.metadata.excerpt}</div>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
