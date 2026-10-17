'use client';

import React from 'react';
import { TECH_STACK_LOGOS } from '@/data/portfolioData';

export function LogoStrip() {
  return (
    <section className="py-12 border-y border-border/70 bg-surface/40 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-text-secondary mb-8">
          Production Architecture & Ecosystem Technologies
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
          {TECH_STACK_LOGOS.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center justify-center p-3 rounded-lg border border-border/50 bg-surface/50 hover:bg-surface hover:border-accent/40 transition-all duration-200 cursor-default"
            >
              <span className="font-heading font-semibold text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                {tech.name}
              </span>
              <span className="text-[10px] font-mono text-text-muted group-hover:text-accent transition-colors mt-0.5">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
