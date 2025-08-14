export default function JsonLdArticle({
  url,
  title,
  description,
  image,
  datePublished,
}: {
  url: string;
  title: string;
  description?: string;
  image?: string;
  datePublished?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    mainEntityOfPage: url,
    author: { '@type': 'Person', name: 'You' },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
