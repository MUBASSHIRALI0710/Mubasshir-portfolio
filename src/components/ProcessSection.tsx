'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, FileText, Code2, Rocket, ShieldCheck, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { WORK_PROCESS, PAYMENT_TERMS } from '@/data/portfolioData';

interface ProcessSectionProps {
  onBookCall: () => void;
}

export function ProcessSection({ onBookCall }: ProcessSectionProps) {
  const stepIcons = [PhoneCall, FileText, Code2, Rocket];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border/80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Predictable Delivery System
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-text-primary tracking-tight">
            How we&apos;ll work together.
          </h2>
        </div>
        <p className="text-sm sm:text-base text-text-secondary max-w-md">
          Clients pay for predictability. Every engagement follows a disciplined 4-step framework with weekly demos and zero surprises.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {WORK_PROCESS.map((step, idx) => {
          const Icon = stepIcons[idx % stepIcons.length];
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-card bg-surface border border-border flex flex-col justify-between hover:border-accent/40 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold font-heading text-accent/80">
                    {step.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent/40 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-[10px] font-mono uppercase bg-accent/10 text-accent font-bold px-2 py-0.5 rounded w-fit mb-2">
                  {step.timeframe}
                </div>

                <h3 className="text-base font-bold font-heading text-text-primary mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* PAYMENT & ENGAGEMENT TERMS (Part 9) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-6 sm:p-8 rounded-card bg-surface border border-border shadow-subtle grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-accent">
            <CheckCircle2 className="w-4 h-4" />
            <span>Engagement Models</span>
          </div>
          <p className="text-sm font-semibold text-text-primary">
            {PAYMENT_TERMS.model}
          </p>
          <p className="text-xs text-text-secondary">
            Transparent milestones with clear deliverable acceptance criteria.
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-accent">
            <CheckCircle2 className="w-4 h-4" />
            <span>Payment Terms</span>
          </div>
          <p className="text-sm font-semibold text-text-primary">
            {PAYMENT_TERMS.split}
          </p>
          <p className="text-xs text-text-secondary">
            Invoiced via Razorpay (INR) or Stripe / Bank Transfer (USD/EUR).
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-accent">
            <CheckCircle2 className="w-4 h-4" />
            <span>Timezone &amp; Warranty</span>
          </div>
          <p className="text-sm font-semibold text-text-primary">
            {PAYMENT_TERMS.timezone}
          </p>
          <p className="text-xs text-text-secondary">
            {PAYMENT_TERMS.guarantee}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
