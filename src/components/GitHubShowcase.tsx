'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, Star, GitFork, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { GITHUB_PINNED_REPOS, PERSONAL_INFO } from '@/data/portfolioData';
import { TiltCard } from '@/components/TiltCard';

export function GitHubShowcase() {
  return (
    <section id="live-builds" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            GitHub as a Live Production Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-text-primary tracking-tight">
            Open Source &amp; Live Builds.
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-pill bg-surface border border-border text-xs font-mono text-text-primary hover:border-text-secondary hover:text-accent transition-colors flex items-center gap-2 shadow-xs"
          >
            <GithubIcon className="w-4 h-4" />
            <span>github.com/MUBASSHIRALI0710</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Pinned Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GITHUB_PINNED_REPOS.map((repo, idx) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="h-full"
          >
            <TiltCard
              maxTilt={6}
              className="group h-full bg-surface border border-border rounded-card p-6 hover:border-accent/40 hover:shadow-subtle transition-all duration-300"
            >
            <div>
              {/* Header: Name & Links */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 text-accent">
                  <Terminal className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                    Production Repo
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={repo.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View source on GitHub"
                    className="p-1.5 rounded hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  {repo.demoUrl && (
                    <a
                      href={repo.demoUrl}
                      title="View live demo or case study"
                      className="p-1.5 rounded hover:bg-surface-elevated text-text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-heading text-text-primary group-hover:text-accent transition-colors leading-snug">
                {repo.name}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                {repo.description}
              </p>

              {/* WHAT THIS PROVES Callout Box */}
              <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/20 text-xs">
                <span className="font-mono font-bold text-accent uppercase tracking-wider block mb-1 text-[10px]">
                  What This Proves:
                </span>
                <p className="text-text-primary font-medium leading-relaxed">
                  {repo.whatThisProves}
                </p>
              </div>
            </div>

            {/* Bottom Stack Badges & Link */}
            <div className="mt-6 pt-4 border-t border-border space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {repo.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-text-secondary px-2 py-0.5 rounded bg-surface-elevated border border-border/70"
                  >
                    {tech}
                  </span>
                ))}
                {repo.stack.length > 4 && (
                  <span className="text-[11px] font-mono text-text-muted px-1.5 py-0.5">
                    +{repo.stack.length - 4}
                  </span>
                )}
              </div>

              <a
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1 group-hover:underline"
              >
                <span>Inspect Repository Code</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
