import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, BlogPost } from '@/data/blogData';
import { SITE_URL, PERSONAL_INFO } from '@/data/portfolioData';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogPostClient } from './BlogPostClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found — Mubasshir Ali',
    };
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.seoTitle} | Full-Stack & AI Engineer`,
    description: post.description,
    authors: [{ name: 'Mubasshir Ali', url: `${SITE_URL}/about` }],
    creator: 'Mubasshir Ali',
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${post.title} — Mubasshir Ali`,
      description: post.description,
      url: postUrl,
      siteName: 'Mubasshir Ali Portfolio',
      type: 'article',
      publishedTime: post.isoDate,
      authors: ['Mubasshir Ali'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — Mubasshir Ali`,
      description: post.description,
      creator: '@mubasshirali',
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  // JSON-LD BlogPosting Schema for rich Google search results
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    author: {
      '@type': 'Person',
      name: 'Mubasshir Ali',
      jobTitle: 'Full-Stack & AI Engineer',
      url: `${SITE_URL}/about`,
      sameAs: [PERSONAL_INFO.linkedin, PERSONAL_INFO.github, PERSONAL_INFO.twitter],
    },
    publisher: {
      '@type': 'Person',
      name: 'Mubasshir Ali',
      url: SITE_URL,
    },
    keywords: post.tags.join(', '),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navigation />

      <BlogPostClient post={post} postUrl={postUrl} />

      <Footer />
    </div>
  );
}
