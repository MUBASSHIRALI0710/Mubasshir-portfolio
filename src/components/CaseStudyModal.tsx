'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { Project } from '@/types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onBookCall: () => void;
}

export function CaseStudyModal({ project, onClose, onBookCall }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-surface border border-border rounded-card shadow-2xl overflow-hidden my-8 z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 sm:p-8 border-b border-border bg-surface-elevated/50">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase bg-accent/15 text-accent font-semibold px-2.5 py-0.5 rounded-full">
                  {project.badge || 'Case Study'}
                </span>
                <span className="text-xs font-mono text-text-muted">
                  Category: {project.category.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
                {project.title}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-text-secondary">
                {project.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-input bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors shrink-0 ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Metrics Grid */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">
                Key Performance & Impact Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-surface-elevated border border-border flex flex-col justify-between"
                  >
                    <div className="text-2xl sm:text-3xl font-bold font-heading text-accent">
                      {metric.value}
                    </div>
                    <div className="text-xs font-mono text-text-secondary mt-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem & Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-lg bg-surface border border-border">
                <div className="flex items-center gap-2 text-rose-500 text-xs font-mono font-semibold uppercase mb-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Client / Core Problem
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.clientProblem || project.problem}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-surface border border-border">
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono font-semibold uppercase mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  What Mubasshir Built
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.whatYouBuilt || project.approach}
                </p>
              </div>
            </div>

            {/* WHAT THIS PROVES Callout */}
            {project.whatThisProves && (
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 text-xs">
                <span className="font-mono font-bold text-accent uppercase tracking-wider block mb-1">
                  What This Proves to Prospective Clients:
                </span>
                <p className="text-text-primary font-medium text-sm leading-relaxed">
                  {project.whatThisProves}
                </p>
              </div>
            )}

            {/* System Architecture Highlights */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent" />
                System Architecture & Implementation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architecture.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-elevated/40 border border-border/70 text-xs sm:text-sm text-text-primary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inside The Build Visual Breakdown */}
            <div className="p-5 sm:p-6 rounded-card border border-accent/25 bg-accent/5">
              <div className="flex items-center gap-2 mb-2 text-accent">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Inside The Build: {project.insideTheBuild.title}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {project.insideTheBuild.description}
              </p>
              <div className="space-y-2">
                {project.insideTheBuild.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md bg-surface-elevated border border-border text-xs font-mono text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-border bg-surface-elevated/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.demoUrl && project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-input bg-surface border border-border text-text-primary text-xs font-medium hover:border-text-secondary transition-colors flex items-center gap-1.5"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
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
                  <span>Source Code</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onBookCall();
              }}
              className="px-5 py-2.5 rounded-pill bg-accent text-white font-medium text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-glow flex items-center gap-2"
            >
              <span>Build Something Similar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
