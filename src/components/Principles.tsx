'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Code, Target } from 'lucide-react';
import { PRINCIPLES } from '@/data/portfolioData';

export function Principles() {
  const icons = [Zap, ShieldCheck, Code, Target];

  return (
    <section id="principles" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Core Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-text-primary tracking-tight">
            What I focus on.
          </h2>
        </div>
        <p className="text-sm sm:text-base text-text-secondary max-w-md">
          Strict standards that govern how I architect code, collaborate with founders, and ship software.
        </p>
      </div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRINCIPLES.map((principle, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-6 rounded-card bg-surface border border-border flex flex-col justify-between hover:border-accent/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-primary group-hover:text-accent group-hover:border-accent/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-surface-elevated text-text-muted px-2 py-0.5 rounded border border-border">
                    {principle.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold font-heading text-text-primary mb-2">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
