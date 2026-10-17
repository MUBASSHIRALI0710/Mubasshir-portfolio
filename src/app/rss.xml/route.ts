import { NextResponse } from 'next/server';
import { BLOG_POSTS } from '@/data/blogData';
import { SITE_URL, PERSONAL_INFO } from '@/data/portfolioData';

export async function GET() {
  const itemsXml = BLOG_POSTS.map((post) => {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${new Date(post.isoDate).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <author>${PERSONAL_INFO.email} (${PERSONAL_INFO.name})</author>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mubasshir Ali — Engineering Blog &amp; Notes</title>
    <link>${SITE_URL}/blog</link>
    <description>Technical articles on production RAG, multi-tenant MERN, and clinical machine learning by Mubasshir Ali.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
