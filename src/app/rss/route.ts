import { NextResponse } from 'next/server';
import { getAllPostSummaries } from '@/lib/posts';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const posts = getAllPostSummaries();
  const items = posts
    .map(
      (p) => `
    <item>
      <title>${p.metadata.title}</title>
      <link>${base}/blog/${p.slug}</link>
      <description>${p.metadata.excerpt ?? ''}</description>
      <pubDate>${new Date(p.metadata.date).toUTCString()}</pubDate>
      <guid>${base}/blog/${p.slug}</guid>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Next Fundamentals</title>
      <link>${base}</link>
      <description>Tiny blog</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
