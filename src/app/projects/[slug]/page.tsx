import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data/portfolioData';
import { SITE_URL, PERSONAL_INFO } from '@/data/portfolioData';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Calendar,
  Check,
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return {
      title: 'Project Case Study Not Found — Mubasshir Ali',
    };
  }

  const projectUrl = `${SITE_URL}/projects/${project.id}`;

  return {
    title: `${project.title} — Case Study by Mubasshir Ali`,
    description: `${project.tagline}. Architectural case study by Mubasshir Ali, Full-Stack & AI Engineer.`,
    authors: [{ name: 'Mubasshir Ali', url: `${SITE_URL}/about` }],
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: `${project.title} — Case Study by Mubasshir Ali`,
      description: project.problem,
      url: projectUrl,
      siteName: 'Mubasshir Ali Portfolio',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Case Study by Mubasshir Ali`,
      description: project.tagline,
      creator: '@mubasshirali',
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const projectUrl = `${SITE_URL}/projects/${project.id}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.tagline,
    applicationCategory: project.category === 'ai' ? 'Artificial Intelligence' : 'WebApplication',
    operatingSystem: 'Web Browser',
    url: projectUrl,
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

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Selected Work</span>
        </Link>

        {/* Header */}
        <header className="pb-8 border-b border-border">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-mono uppercase bg-accent/15 text-accent font-semibold px-2.5 py-0.5 rounded-full">
              {project.badge || 'Case Study'}
            </span>
            <span className="text-xs font-mono text-text-muted">
              Engineered by Mubasshir Ali
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-text-primary tracking-tight">
            {project.title}
          </h1>

          <p className="mt-3 text-base sm:text-xl text-text-secondary leading-relaxed">
            {project.tagline}
          </p>

          {/* Links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-input bg-accent text-white text-xs font-medium hover:bg-accent-hover transition-colors shadow-glow flex items-center gap-1.5"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-input bg-surface border border-border text-text-primary text-xs font-medium hover:border-text-secondary transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5 text-text-muted" />
                <span>GitHub Source</span>
              </a>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="py-10 space-y-10">
          {/* Metrics */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-4">
              Verified Production Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-surface border border-border flex flex-col justify-between"
                >
                  <div className="text-3xl font-bold font-heading text-accent">
                    {m.value}
                  </div>
                  <div className="text-xs font-mono text-text-secondary mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem vs Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-card bg-surface border border-border space-y-2">
              <span className="text-xs font-mono uppercase text-rose-500 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                The Core Problem
              </span>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-card bg-surface border border-border space-y-2">
              <span className="text-xs font-mono uppercase text-emerald-500 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                The Engineering Solution
              </span>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.approach}
              </p>
            </div>
          </div>

          {/* System Architecture */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent" />
              <span>Architectural Specifications</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architecture.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-surface-elevated/70 border border-border text-sm text-text-primary"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inside The Build */}
          <div className="p-6 rounded-card border border-accent/30 bg-accent/5 space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <Cpu className="w-4 h-4" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider">
                Inside The Build: {project.insideTheBuild.title}
              </h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.insideTheBuild.description}
            </p>
            <div className="space-y-2 pt-2 border-t border-accent/20">
              {project.insideTheBuild.highlights.map((h, hIdx) => (
                <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">
              Production Stack &amp; Dependencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded bg-surface border border-border text-xs font-mono text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Conversion CTA */}
          <div className="p-8 rounded-card bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-subtle">
            <div>
              <h3 className="text-xl font-bold font-heading text-text-primary">
                Need an architecture like this built?
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Let&apos;s discuss your technical roadmap directly with Mubasshir Ali.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-pill bg-accent text-white font-medium text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-glow shrink-0 flex items-center gap-2"
            >
              <span>Schedule Technical Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
