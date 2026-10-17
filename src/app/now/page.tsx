import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  Sparkles,
  Clock,
  BookOpen,
  Cpu,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Radio,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { PERSONAL_INFO, SITE_URL } from '@/data/portfolioData';

export const metadata: Metadata = {
  title: 'Now — What Mubasshir Ali is Doing Right Now (October 2026)',
  description:
    'A live /now page by Mubasshir Ali, Software Engineer & AI Builder based in Bengaluru, India. Current builds, reading list, and freelance availability.',
  alternates: {
    canonical: `${SITE_URL}/now`,
  },
  openGraph: {
    title: 'Now — What Mubasshir Ali is Doing Right Now (October 2026)',
    description:
      'Current focus, active engineering builds, books, and freelance availability of Mubasshir Ali.',
    url: `${SITE_URL}/now`,
    type: 'website',
  },
};

export default function NowPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'What Mubasshir Ali is Doing Now',
    url: `${SITE_URL}/now`,
    dateModified: '2026-10-17',
    description:
      'Current focus, production engineering builds, and active availability of Mubasshir Ali.',
    author: {
      '@type': 'Person',
      name: 'Mubasshir Ali',
      url: `${SITE_URL}/about`,
      sameAs: [PERSONAL_INFO.linkedin, PERSONAL_INFO.github],
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Live Recency Signal • Updated October 2026</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-text-primary tracking-tight">
          What I&apos;m Doing Now
        </h1>

        <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
          Inspired by{' '}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary underline hover:text-accent transition-colors"
          >
            Derek Sivers&apos; /now movement
          </a>
          . This page acts as a public declaration of my current priorities, active software builds,
          and availability.
        </p>

        {/* Location & Timezone Bar */}
        <div className="mt-8 p-4 rounded-xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-text-secondary">
            <MapPin className="w-4 h-4 text-accent shrink-0" />
            <span>Bengaluru, Karnataka, India (UTC +5:30 IST)</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Clock className="w-4 h-4 text-text-muted shrink-0" />
            <span>Overlapping US EST &amp; EU Business Hours</span>
          </div>
        </div>

        {/* Focus Sections */}
        <div className="mt-12 space-y-10">
          {/* Section 1: Building */}
          <div className="p-6 rounded-card bg-surface border border-border space-y-4 shadow-subtle">
            <div className="flex items-center gap-2.5 text-accent">
              <Cpu className="w-5 h-5" />
              <h2 className="text-lg font-bold font-heading text-text-primary">
                1. What I&apos;m Building
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-text-secondary leading-relaxed">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-text-primary font-medium">
                    NanoBrowser SaaS (AI Browser Automation Chrome Extension):
                  </strong>{' '}
                  At AiKing Solutions, I own full-stack development of a commercial SaaS product with
                  dual-agent Planner/Navigator workflows using Amazon Nova Lite via AWS Bedrock and
                  3-tier Razorpay subscription billing.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-text-primary font-medium">
                    Zero-Hallucination AI Twin &amp; Reverse Brief Engine:
                  </strong>{' '}
                  This living portfolio interface — equipped with deterministic RAG retrieval,
                  sentence-window expansion, and an interactive consultation flow.
                </div>
              </li>
            </ul>
          </div>

          {/* Section 2: Learning & Exploring */}
          <div className="p-6 rounded-card bg-surface border border-border space-y-4 shadow-subtle">
            <div className="flex items-center gap-2.5 text-accent">
              <Code2 className="w-5 h-5" />
              <h2 className="text-lg font-bold font-heading text-text-primary">
                2. What I&apos;m Learning &amp; Engineering
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-text-secondary leading-relaxed">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-text-primary font-medium">
                    LangGraph &amp; Multi-Agent Orchestration:
                  </strong>{' '}
                  Deep-diving into state graphs, human-in-the-loop approvals, and cyclical
                  agentic workflows for autonomous business processes.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-text-primary font-medium">
                    Chrome Manifest V3 Architecture:
                  </strong>{' '}
                  Mastering offscreen document execution, service-worker lifecycle survival, and
                  anti-fingerprinting DOM automations.
                </div>
              </li>
            </ul>
          </div>

          {/* Section 3: Reading */}
          <div className="p-6 rounded-card bg-surface border border-border space-y-4 shadow-subtle">
            <div className="flex items-center gap-2.5 text-accent">
              <BookOpen className="w-5 h-5" />
              <h2 className="text-lg font-bold font-heading text-text-primary">
                3. What I&apos;m Reading
              </h2>
            </div>
            <div className="text-sm text-text-secondary leading-relaxed space-y-2">
              <p>
                📖 <strong className="text-text-primary">Designing Data-Intensive Applications</strong>{' '}
                by Martin Kleppmann.
              </p>
              <p className="text-xs text-text-muted leading-normal">
                Studying leaderless replication consensus, partition tolerant hashing, and
                serializable snapshot isolation for scalable SaaS backends.
              </p>
            </div>
          </div>

          {/* Section 4: Freelance Availability */}
          <div className="p-8 rounded-card border-2 border-accent/40 bg-accent/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-accent font-bold text-xs font-mono uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Freelance Capacity Status</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 text-xs font-mono font-semibold">
                🟢 2 Slots Open for Q1 2027
              </span>
            </div>

            <h3 className="text-2xl font-bold font-heading text-text-primary">
              Ready to ship your next AI or full-stack SaaS MVP?
            </h3>

            <p className="text-sm text-text-secondary leading-relaxed">
              I partner with founders and engineering leads on high-impact projects: RAG pipelines,
              LLM function-calling agents, MERN architectures, and Chrome extensions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-pill bg-accent text-white font-medium text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-glow flex items-center gap-2"
              >
                <span>Reserve a Q1 2027 Slot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#brief"
                className="px-4 py-2.5 rounded-pill bg-surface border border-border text-text-primary font-medium text-xs sm:text-sm hover:bg-surface-elevated transition-colors"
              >
                Estimate Scope in Reverse Brief
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
