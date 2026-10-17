import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogData';
import { SITE_URL, PERSONAL_INFO } from '@/data/portfolioData';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Clock, Calendar, ArrowRight, Tag, BookOpen, Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Engineering Notes — Mubasshir Ali | Full-Stack & AI Engineer',
  description:
    'Technical deep dives on production RAG architectures, multi-tenant MERN systems, and clinical machine learning by Mubasshir Ali. Field notes from shipping real-world software.',
  keywords: [
    'Mubasshir Ali blog',
    'Mubasshir Ali articles',
    'Production RAG',
    'Multi-tenant MERN',
    'Machine Learning Engineering',
    'Next.js 15',
    'AI Engineer',
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Engineering Notes & Deep Dives — Mubasshir Ali',
    description:
      'Field notes on building zero-hallucination RAG pipelines, multi-tenant SaaS engines, and low-latency clinical ML classifiers.',
    url: `${SITE_URL}/blog`,
    siteName: 'Mubasshir Ali Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Notes & Deep Dives — Mubasshir Ali',
    description:
      'Technical insights by Mubasshir Ali on shipping production AI products and resilient full-stack systems.',
  },
};

export default function BlogListingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Engineering Notes by Mubasshir Ali',
    description: 'Technical articles authored by Mubasshir Ali on RAG, MERN, and Machine Learning.',
    url: `${SITE_URL}/blog`,
    author: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
      url: SITE_URL,
    },
    hasPart: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.isoDate,
      author: {
        '@type': 'Person',
        name: PERSONAL_INFO.name,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12 border-b border-border pb-8">
          <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Mubasshir Ali &apos;s Technical Notes
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight text-text-primary">
            Engineering Field Notes
          </h1>
          <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Detailed technical post-mortems and architectural breakdowns authored by{' '}
            <strong className="text-text-primary font-semibold">Mubasshir Ali</strong>. Focusing on zero-hallucination RAG, scalable MERN architectures, and low-latency machine learning.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono text-text-muted">
            <span className="px-2.5 py-1 rounded-pill bg-surface border border-border text-text-primary font-medium">
              3 Published Articles
            </span>
            <span>•</span>
            <span>Syndicated via RSS: <a href="/rss.xml" className="text-accent hover:underline">/rss.xml</a></span>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group p-6 sm:p-8 rounded-card bg-surface border border-border hover:border-accent/40 hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted mb-3">
                  <span className="text-accent font-semibold uppercase tracking-wide">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.publishDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary group-hover:text-accent transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                {/* Description */}
                <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Read button */}
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
                <span className="text-text-muted">
                  By {post.author.name} ({post.author.role})
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1.5 group-hover:underline"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
