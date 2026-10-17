'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/data/blogData';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Send,
} from 'lucide-react';
import { LinkedinIcon, TwitterIcon } from '@/components/Icons';

interface BlogPostClientProps {
  post: BlogPost;
  postUrl: string;
}

export function BlogPostClient({ post, postUrl }: BlogPostClientProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);
  const [copiedXThread, setCopiedXThread] = useState(false);
  const [showCrossPostTool, setShowCrossPostTool] = useState(false);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(postUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const copyLinkedInDraft = () => {
    navigator.clipboard.writeText(post.linkedinDraft);
    setCopiedLinkedIn(true);
    setTimeout(() => setCopiedLinkedIn(false), 2000);
  };

  const copyXThreadDraft = () => {
    navigator.clipboard.writeText(post.xThreadDraft.join('\n\n---\n\n'));
    setCopiedXThread(true);
    setTimeout(() => setCopiedXThread(false), 2000);
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnX = () => {
    const text = `${post.title} by @mubasshirali\n\n`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Helper to render markdown paragraphs and code blocks with copy-code buttons
  const renderContent = () => {
    const parts = post.content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const lines = part.trim().split('\n');
        const lang = lines[0].replace('```', '') || 'code';
        const codeContent = lines.slice(1, -1).join('\n');

        return (
          <div key={index} className="my-6 rounded-card border border-border bg-surface-elevated overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface text-xs font-mono text-text-muted">
              <span className="uppercase">{lang}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codeContent);
                  setCopiedCodeIndex(index);
                  setTimeout(() => setCopiedCodeIndex(null), 2000);
                }}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
              >
                {copiedCodeIndex === index ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-text-primary leading-relaxed">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      }

      // Markdown Headings and regular text
      const subparts = part.split('\n\n');
      return subparts.map((p, pIdx) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('## ')) {
          const headingText = trimmed.replace('## ', '');
          const id = headingText
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          return (
            <h2 key={`${index}-${pIdx}`} id={id} className="text-2xl sm:text-3xl font-bold font-heading text-text-primary mt-10 mb-4 pt-4 border-t border-border/60 scroll-mt-24">
              {headingText}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace('### ', '');
          const id = headingText
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          return (
            <h3 key={`${index}-${pIdx}`} id={id} className="text-xl sm:text-2xl font-bold font-heading text-text-primary mt-6 mb-3 scroll-mt-24">
              {headingText}
            </h3>
          );
        }

        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter((l) => l.startsWith('- '));
          return (
            <ul key={`${index}-${pIdx}`} className="list-disc pl-6 space-y-2 my-4 text-text-secondary text-base leading-relaxed">
              {items.map((it, itIdx) => (
                <li key={itIdx}>{it.replace('- ', '')}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${index}-${pIdx}`} className="my-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            {trimmed}
          </p>
        );
      });
    });
  };

  return (
    <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </Link>

        {/* Cross-post Drawer Toggle for Owner */}
        <button
          onClick={() => setShowCrossPostTool(!showCrossPostTool)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all text-xs font-mono"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cross-Post Helper (Owner)</span>
        </button>
      </div>

      {/* Cross-post Drawer Box for Owner */}
      {showCrossPostTool && (
        <div className="mb-10 p-6 rounded-card bg-surface-elevated border border-accent/40 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <h3 className="text-sm font-bold font-mono text-text-primary uppercase">
                Owner Cross-Posting Toolkit (LinkedIn &amp; X)
              </h3>
            </div>
            <span className="text-xs font-mono text-text-muted">Canonical: {postUrl}</span>
          </div>

          <p className="text-xs text-text-secondary">
            Use these pre-formatted snippets with canonical backlinks to distribute this post to your professional networks in under 60 seconds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* LinkedIn Snippet */}
            <div className="p-4 rounded-lg bg-surface border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-text-primary flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-500" />
                  LinkedIn Draft
                </span>
                <button
                  onClick={copyLinkedInDraft}
                  className="flex items-center gap-1 text-xs font-mono text-accent hover:underline"
                >
                  {copiedLinkedIn ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLinkedIn ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-text-secondary bg-surface-elevated p-2 rounded max-h-36 overflow-y-auto whitespace-pre-wrap">
                {post.linkedinDraft}
              </pre>
            </div>

            {/* X Thread Snippet */}
            <div className="p-4 rounded-lg bg-surface border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-text-primary flex items-center gap-1.5">
                  <TwitterIcon className="w-3.5 h-3.5" />
                  X / Twitter Thread ({post.xThreadDraft.length} Tweets)
                </span>
                <button
                  onClick={copyXThreadDraft}
                  className="flex items-center gap-1 text-xs font-mono text-accent hover:underline"
                >
                  {copiedXThread ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedXThread ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-text-secondary bg-surface-elevated p-2 rounded max-h-36 overflow-y-auto whitespace-pre-wrap">
                {post.xThreadDraft.join('\n\n---\n\n')}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Article Header */}
      <header className="mb-10 pb-8 border-b border-border">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted mb-4">
          <span className="text-accent font-semibold uppercase">{post.category}</span>
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

        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-text-primary leading-tight tracking-tight">
          {post.title}
        </h1>

        <p className="mt-4 text-base sm:text-xl text-text-secondary leading-relaxed font-normal">
          {post.description}
        </p>

        {/* Author Byline & Sharing Actions */}
        <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
          {/* Author info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-bold text-accent font-heading">
              MA
            </div>
            <div>
              <Link
                href="/about"
                className="text-sm font-bold font-heading text-text-primary hover:text-accent transition-colors block"
              >
                {post.author.name}
              </Link>
              <span className="text-xs font-mono text-text-secondary">
                {post.author.role} • Kolkata, India
              </span>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={shareOnLinkedIn}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-input bg-surface border border-border text-xs font-mono text-text-primary hover:border-accent hover:text-accent transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={shareOnX}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-input bg-surface border border-border text-xs font-mono text-text-primary hover:border-accent hover:text-accent transition-colors"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
              <span>Post</span>
            </button>

            <button
              onClick={copyUrlToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-input bg-surface border border-border text-xs font-mono text-text-primary hover:border-accent transition-colors"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid: Content + TOC Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Article Body (8 cols) */}
        <div className="lg:col-span-8 min-w-0 font-sans">
          {renderContent()}

          {/* Related Project CTA (Internal Linking) */}
          {post.relatedProjectSlug && (
            <div className="mt-12 p-6 rounded-card bg-surface-elevated border border-accent/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-accent uppercase font-bold tracking-wider">
                  Related Production Work
                </span>
                <h4 className="text-base font-bold font-heading text-text-primary mt-1">
                  See this architecture in action in my case studies
                </h4>
              </div>
              <Link
                href={`/projects/${post.relatedProjectSlug}`}
                className="px-4 py-2 rounded-pill bg-accent text-white font-medium text-xs hover:bg-accent-hover transition-colors shrink-0 flex items-center gap-1.5 shadow-glow"
              >
                <span>View Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar: Table of Contents & Author Card (4 cols) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          {/* Table of contents */}
          <div className="p-5 rounded-card bg-surface border border-border">
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-accent" />
              <span>Table of Contents</span>
            </h4>
            <nav className="space-y-1.5 text-xs font-mono">
              {post.headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className={`block text-text-secondary hover:text-accent transition-colors leading-snug py-0.5 ${
                    h.level === 3 ? 'pl-3 text-[11px] text-text-muted' : ''
                  }`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </div>

          {/* Author mini profile */}
          <div className="p-5 rounded-card bg-surface border border-border space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted">
              About the Author
            </h4>
            <div className="text-sm font-bold font-heading text-text-primary">
              Mubasshir Ali
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Full-Stack &amp; AI Engineer specializing in Next.js 15, MERN stack, and zero-hallucination RAG pipelines. B.Tech Computer Science graduate (8.75 CGPA).
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/about"
                className="text-xs font-mono text-accent hover:underline font-semibold"
              >
                Read full bio →
              </Link>
              <Link
                href="/contact"
                className="text-xs font-mono text-text-secondary hover:text-text-primary"
              >
                Hire Mubasshir →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
