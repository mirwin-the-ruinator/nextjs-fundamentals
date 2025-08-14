import { getAllSlugs } from '@/lib/posts';

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const posts = getAllSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
  }));
  return [{ url: base, lastModified: new Date() }, { url: `${base}/blog`, lastModified: new Date() }, ...posts];
}
