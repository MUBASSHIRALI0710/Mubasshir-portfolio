import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, PERSONAL_INFO } from '@/data/portfolioData';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Laptop, Terminal, Cpu, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tools & Workspace Setup (/uses) — Mubasshir Ali',
  description:
    'A living document of the hardware, software, developer tools, and AI workflows used daily by Mubasshir Ali, Full-Stack & AI Engineer.',
  keywords: [
    'Mubasshir Ali uses',
    'Mubasshir Ali setup',
    'developer workstation',
    'AI engineering tools',
    'Next.js 15 setup',
  ],
  alternates: {
    canonical: `${SITE_URL}/uses`,
  },
  openGraph: {
    title: 'Tools & Workspace Setup — Mubasshir Ali',
    description: 'Hardware, editor setup, terminal, and AI workflows.',
    url: `${SITE_URL}/uses`,
    siteName: 'Mubasshir Ali Portfolio',
    type: 'website',
  },
};

export default function UsesPage() {
  const sections = [
    {
      title: 'Core Development Machine & Hardware',
      icon: Laptop,
      items: [
        { name: 'ASUS High-Performance Workstation', desc: 'Fast multi-core processor for concurrent Docker containers, Node builds, and local Python model training.' },
        { name: 'Dual Monitor Workspace', desc: 'Primary 27-inch 4K high-density display for code and side-by-side terminal logs.' },
        { name: 'Keychron Mechanical Keyboard', desc: 'Tactile switches with custom keycaps for long uninterrupted coding sessions.' },
      ],
    },
    {
      title: 'Editor, Terminal & Shell Environment',
      icon: Terminal,
      items: [
        { name: 'VS Code & Antigravity IDE', desc: 'Equipped with strict TypeScript language servers, Prettier, Tailwind CSS IntelliSense, and GitHub Copilot.' },
        { name: 'PowerShell 7 & Zsh', desc: 'Fast, customized prompt with Git branch status and execution timers.' },
        { name: 'JetBrains Mono Font', desc: 'Clean monospace typography with programming ligatures.' },
      ],
    },
    {
      title: 'AI Engineering & Production Stack',
      icon: Cpu,
      items: [
        { name: 'Next.js 15 (App Router)', desc: 'My default framework for production full-stack apps with server actions and streaming responses.' },
        { name: 'Vercel AI SDK', desc: 'Unified abstraction layer for token-streaming LLM responses and function-calling.' },
        { name: 'LangChain & Vector Databases', desc: 'Pinecone and pgvector (Supabase) for semantic document search and hybrid retrieval.' },
        { name: 'Scikit-learn & Python', desc: 'For classical predictive modeling, clinical classification, and data preprocessing pipelines.' },
      ],
    },
    {
      title: 'Productivity & Hosting Infrastructure',
      icon: Layers,
      items: [
        { name: 'Vercel & Render', desc: 'Instant edge deployments with automatic preview branches and zero-downtime rollouts.' },
        { name: 'Docker', desc: 'Containerizing Python microservices and database engines for reproducible dev environments.' },
        { name: 'Plausible Analytics', desc: 'Privacy-focused, cookie-free web metrics that load in under 1KB.' },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12 border-b border-border pb-8">
          <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Workspace &amp; Tooling
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight text-text-primary">
            What I Use Daily
          </h1>
          <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
            A curated inventory of the hardware, software, frameworks, and AI tools{' '}
            <strong className="text-text-primary font-semibold">Mubasshir Ali</strong> relies on to engineer production-ready web products.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-border text-text-primary">
                  <Icon className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-bold font-heading">{section.title}</h2>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {section.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-4 rounded-lg bg-surface border border-border flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 hover:border-accent/40 transition-colors"
                    >
                      <span className="text-sm font-bold font-heading text-text-primary">
                        {item.name}
                      </span>
                      <span className="text-xs text-text-secondary sm:text-right max-w-md">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-6 rounded-card bg-surface-elevated border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-text-secondary">
            Curious about how any of these tools fit into your next build?
          </span>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-pill bg-accent text-white font-medium text-xs hover:bg-accent-hover transition-colors shadow-glow flex items-center gap-1.5 shrink-0"
          >
            <span>Ask Mubasshir</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
