'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Eye,
  ArrowLeft,
  Terminal,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { LinkedinIcon, TwitterIcon } from '@/components/Icons';
import { SITE_URL } from '@/data/portfolioData';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('AI & RAG');
  const [tags, setTags] = useState('AI, Next.js, Engineering');
  const [content, setContent] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);
  const [copiedX, setCopiedX] = useState(false);

  // Auto-slug generator from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
      );
    }
  };

  // Estimate read time
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  // Generate code snippet to paste into src/data/blogData.ts
  const generatedCode = `  {
    slug: '${slug || 'your-slug'}',
    title: '${title.replace(/'/g, "\\'") || 'Your Article Title'}',
    seoTitle: '${title.replace(/'/g, "\\'") || 'Your Title'} — Mubasshir Ali',
    description: '${description.replace(/'/g, "\\'") || 'Short description...'}',
    publishDate: '${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}',
    isoDate: '${new Date().toISOString()}',
    readTime: '${readTimeMin} min read',
    tags: [${tags.split(',').map((t) => `'${t.trim()}'`).join(', ')}],
    category: '${category}' as const,
    coverImage: '/images/blog-default.jpg',
    author: {
      name: 'Mubasshir Ali',
      role: 'Full-Stack & AI Engineer',
      avatar: '/images/profile.jpg',
      url: '${SITE_URL}/about',
    },
    headings: [],
    content: \`${content.replace(/`/g, '\\`')}\`,
    linkedinDraft: \`New article: ${title.replace(/`/g, '\\`')}\n\n${description.replace(/`/g, '\\`')}\n\nRead the full technical deep dive:\n${SITE_URL}/blog/${slug || 'your-slug'}\n\n#SoftwareEngineering #Tech #MubasshirAli\`,
    xThreadDraft: [
      \`1/ ${title.replace(/`/g, '\\`')}\n\n${description.replace(/`/g, '\\`')}\n\nRead full post:\n${SITE_URL}/blog/${slug || 'your-slug'}\`,
    ],
  },`;

  const linkedInSnippet = `🚀 Just published a new technical article: "${title || 'Title'}"

${description || 'Description'}

Key takeaways:
• Architectural design from first principles
• Real production benchmarks and edge-case handling
• Full code examples in TypeScript

Read the full breakdown:
${SITE_URL}/blog/${slug || 'your-slug'}

#SoftwareEngineering #FullStack #AI #MubasshirAli`;

  const xSnippet = `1/ Just published: "${title || 'Title'}"

${description || 'Description'}

Full deep dive on my portfolio:
${SITE_URL}/blog/${slug || 'your-slug'}`;

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Owner Studio • Option A (Git-Backed MDX)</span>
            </div>
            <h1 className="text-3xl font-bold font-heading text-text-primary">
              Blog Publishing &amp; Cross-Post Studio
            </h1>
          </div>
          <Link
            href="/blog"
            className="text-xs font-mono text-text-secondary hover:text-accent transition-colors"
          >
            ← View Live Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input Form (6 cols) */}
          <div className="lg:col-span-6 space-y-4 bg-surface border border-border rounded-card p-6 shadow-subtle">
            <h2 className="text-sm font-bold font-mono text-text-primary uppercase pb-2 border-b border-border">
              Post Metadata &amp; Content
            </h2>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Post Title
              </label>
              <input
                type="text"
                placeholder="e.g. Scaling Next.js 15 Server Actions"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3.5 py-2 rounded-input bg-surface-elevated border border-border text-sm text-text-primary focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Slug (URL)
              </label>
              <input
                type="text"
                placeholder="scaling-nextjs-15-server-actions"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2 rounded-input bg-surface-elevated border border-border text-xs font-mono text-text-primary focus:border-accent focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-input bg-surface-elevated border border-border text-xs text-text-primary focus:border-accent focus:outline-none"
                >
                  <option value="AI & RAG">AI &amp; RAG</option>
                  <option value="Full-Stack MERN">Full-Stack MERN</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Architecture">Architecture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="AI, Next.js, Cloud"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-input bg-surface-elevated border border-border text-xs text-text-primary focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Description (SEO Meta Description &amp; Social Card)
              </label>
              <textarea
                rows={2}
                placeholder="A concise summary containing Mubasshir Ali and primary keywords..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-input bg-surface-elevated border border-border text-xs text-text-primary focus:border-accent focus:outline-none resize-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono uppercase text-text-secondary">
                  Article Markdown Body
                </label>
                <span className="text-[11px] font-mono text-text-muted">
                  {wordCount} words • ~{readTimeMin} min read
                </span>
              </div>
              <textarea
                rows={10}
                placeholder="Write markdown here... Use ## for H2 headings and ```typescript for code blocks."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3.5 py-2 rounded-input bg-surface-elevated border border-border font-mono text-xs text-text-primary focus:border-accent focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Right: Code Generator & Social Cross-post Snippets (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Git Code Snippet */}
            <div className="bg-surface border border-border rounded-card p-6 shadow-subtle space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-xs font-mono font-bold text-text-primary uppercase flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-accent" />
                  Code to add to src/data/blogData.ts
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCode);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="flex items-center gap-1 text-xs font-mono text-accent hover:underline"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-text-secondary bg-surface-elevated p-3 rounded-lg max-h-48 overflow-y-auto">
                {generatedCode}
              </pre>
              <p className="text-[11px] font-mono text-text-muted">
                Paste this into the `BLOG_POSTS` array in `src/data/blogData.ts` and commit. Done in under 2 minutes.
              </p>
            </div>

            {/* LinkedIn Cross-Post Snippet */}
            <div className="bg-surface border border-border rounded-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-text-primary flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-500" />
                  Instant LinkedIn Post
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(linkedInSnippet);
                    setCopiedLinkedIn(true);
                    setTimeout(() => setCopiedLinkedIn(false), 2000);
                  }}
                  className="flex items-center gap-1 text-xs font-mono text-accent hover:underline"
                >
                  {copiedLinkedIn ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLinkedIn ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-text-secondary bg-surface-elevated p-2 rounded max-h-32 overflow-y-auto whitespace-pre-wrap">
                {linkedInSnippet}
              </pre>
            </div>

            {/* X Cross-Post Snippet */}
            <div className="bg-surface border border-border rounded-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-text-primary flex items-center gap-1.5">
                  <TwitterIcon className="w-3.5 h-3.5" />
                  Instant X / Twitter Post
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(xSnippet);
                    setCopiedX(true);
                    setTimeout(() => setCopiedX(false), 2000);
                  }}
                  className="flex items-center gap-1 text-xs font-mono text-accent hover:underline"
                >
                  {copiedX ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedX ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-text-secondary bg-surface-elevated p-2 rounded max-h-24 overflow-y-auto whitespace-pre-wrap">
                {xSnippet}
              </pre>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
