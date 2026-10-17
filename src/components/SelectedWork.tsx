'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Layers, ExternalLink, Check, Sparkles } from 'lucide-react';
import { PROJECTS } from '@/data/portfolioData';
import { Project } from '@/types';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { TiltCard } from '@/components/TiltCard';

interface SelectedWorkProps {
  onBookCall: () => void;
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}

export function SelectedWork({
  onBookCall,
  selectedProjectId,
  onClearSelectedProject,
}: SelectedWorkProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // If external command palette triggered project selection
  React.useEffect(() => {
    if (selectedProjectId) {
      const match = PROJECTS.find((p) => p.id === selectedProjectId);
      if (match) setActiveProject(match);
      if (onClearSelectedProject) onClearSelectedProject();
    }
  }, [selectedProjectId, onClearSelectedProject]);

  return (
    <section id="work" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Selected Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-text-primary tracking-tight">
            Proof in production.
          </h2>
        </div>
        <p className="text-sm sm:text-base text-text-secondary max-w-md">
          Every project is built to deliver commercial outcomes — from high-accuracy ML classifiers to multi-tenant SaaS engines.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="h-full"
          >
            <TiltCard
              maxTilt={5}
              className="group h-full bg-surface border border-border rounded-card p-6 sm:p-8 hover:border-accent/40 hover:shadow-subtle transition-all duration-300"
            >
            {/* Top row: Category & Badge */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono uppercase bg-surface-elevated text-text-secondary border border-border px-2.5 py-0.5 rounded-full font-medium">
                  {project.category.toUpperCase()}
                </span>
                {project.badge && (
                  <span className="text-[10px] font-mono uppercase bg-accent/15 text-accent font-bold px-2 py-0.5 rounded-full">
                    {project.badge}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-text-primary group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {project.tagline}
              </p>

              {/* What This Proves Callout Box */}
              {project.whatThisProves && (
                <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/25 text-xs">
                  <span className="font-semibold text-accent font-mono text-[10px] uppercase block mb-0.5">
                    What this proves:
                  </span>
                  <p className="text-text-primary text-xs leading-relaxed font-medium">
                    {project.whatThisProves}
                  </p>
                </div>
              )}

              {/* Key Metrics Strip */}
              <div className="mt-6 grid grid-cols-3 gap-2 pt-4 border-t border-border/60">
                {project.metrics.map((m, mIdx) => (
                  <div key={mIdx}>
                    <div className="text-base sm:text-lg font-bold font-heading text-text-primary">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono text-text-muted truncate mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Tech Tags & CTA */}
            <div className="mt-8 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-text-secondary px-2 py-0.5 rounded bg-surface-elevated"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="text-[11px] font-mono text-text-muted px-1.5 py-0.5">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>

              <button
                onClick={() => setActiveProject(project)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors font-mono uppercase tracking-wider group-hover:underline self-end sm:self-auto"
              >
                <span>Case study</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onBookCall={onBookCall}
      />
    </section>
  );
}
