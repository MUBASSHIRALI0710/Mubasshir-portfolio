'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Layers, Zap, Blocks, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '@/data/portfolioData';

interface ServicesProps {
  onSelectServiceForBrief?: (serviceType: string) => void;
}

export function Services({ onSelectServiceForBrief }: ServicesProps) {
  const icons = [Bot, Layers, Zap, Blocks];

  const handleSelectService = (title: string) => {
    if (onSelectServiceForBrief) {
      onSelectServiceForBrief(title);
    } else {
      const el = document.getElementById('reverse-brief');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Capabilities &amp; Pricing Signals
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-text-primary tracking-tight">
            How we can work together.
          </h2>
        </div>
        <p className="text-sm sm:text-base text-text-secondary max-w-md">
          Direct engineering access with transparent starting rates. No agency markups, no junior handoffs.
        </p>
      </div>

      {/* Services Grid (4 cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-surface border border-border rounded-card p-6 flex flex-col justify-between hover:border-accent/40 hover:shadow-subtle transition-all duration-300 group"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-primary group-hover:text-accent group-hover:border-accent/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">
                    {service.badge}
                  </span>
                </div>

                {/* Title & 2-line description */}
                <h3 className="text-lg font-bold font-heading text-text-primary leading-snug">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  {service.description}
                </p>

                {/* PRICING SIGNAL BADGE */}
                <div className="mt-4 p-2.5 rounded-lg bg-surface-elevated border border-border text-xs font-mono space-y-0.5">
                  <div className="text-accent font-bold text-xs">
                    {service.startingAt}
                  </div>
                  <div className="text-[10px] text-text-muted">
                    {service.pricingSignal}
                  </div>
                </div>

                {/* Deliverables checklist */}
                <div className="mt-4 space-y-2 pt-3 border-t border-border/60">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">
                    Scope Highlights:
                  </span>
                  {service.deliverables.slice(0, 3).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 text-xs text-text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Timeframe pill */}
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                  <span>Turnaround:</span>
                  <span className="text-text-primary font-semibold">{service.timeframe}</span>
                </div>
              </div>

              {/* Discuss CTA */}
              <button
                onClick={() => handleSelectService(service.title)}
                className="mt-6 pt-3 border-t border-border flex items-center justify-between w-full text-xs font-mono font-semibold uppercase tracking-wider text-text-primary group-hover:text-accent transition-colors"
              >
                <span>Discuss your project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
