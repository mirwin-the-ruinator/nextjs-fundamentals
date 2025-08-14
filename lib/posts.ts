import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const POSTS_DIR = path.resolve(process.cwd(), 'content', 'posts');

export type PostMeta = {
  title: string;
  date: string;
  excerpt?: string;
  banner?: string;
};
export type PostSummary = { slug: string; metadata: PostMeta };
export type Post = PostSummary & { html: string };

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getAllPostSummaries(): PostSummary[] {
  return getAllSlugs()
    .map((slug) => {
      const full = path.join(POSTS_DIR, `${slug}.md`);
      const file = fs.readFileSync(full, 'utf8');
      const { data } = matter(file);
      return { slug, metadata: data as PostMeta };
    })
    .sort((a, b) => (a.metadata.date > b.metadata.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  return { slug, metadata: data as PostMeta, html: processed.toString() };
}
