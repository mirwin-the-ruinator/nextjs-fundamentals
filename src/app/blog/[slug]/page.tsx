import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import type { Metadata } from 'next';
import Image from 'next/image';
import JsonLdArticle from './JsonLd';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post.metadata.title || 'A Blog Post';
  const description = post.metadata.excerpt || 'Read this blog post.';
  const bannerImage = post.metadata.banner || '/images/default-banner.jpg';
  const canonical = `/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: bannerImage }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [bannerImage],
    },
    keywords: [post.slug, 'blog', 'nextjs', 'react'],
    authors: [{ name: 'Me', url: 'https://example.com' }],
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const url = `/blog/${post.slug}`;

  return (
    <article>
      <h1 className="px-12">{post.metadata.title}</h1>
      {!!post.metadata.banner && (
        <div className="my-8 w-full h-[26vw] relative">
          <Image className="object-cover max-h-full min-w-full" src={post.metadata.banner} alt="" sizes="100vw" width={1200} height={630} priority />
        </div>
      )}
      <JsonLdArticle
        url={url}
        title={post.metadata.title}
        description={post.metadata.excerpt}
        image={post.metadata.banner}
        datePublished={post.metadata.date}
      />
      <div className="pb-32 px-12" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
