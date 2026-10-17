'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Bot, Sparkles, Terminal, CheckCircle2, ShieldCheck, Zap, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { MagneticButton } from '@/components/MagneticButton';

interface HeroProps {
  onOpenAITwin: () => void;
  onBookCall: () => void;
}

export function Hero({ onOpenAITwin, onBookCall }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden hero-grid"
    >
      {/* Subtle ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-60 dark:opacity-80"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x || '50%'}px ${
            mousePos.y || '40%'
          }px, var(--accent-subtle), transparent 80%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 hero-glow" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Urgency / Availability Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-surface border border-border shadow-xs mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono font-medium text-text-primary">
            {PERSONAL_INFO.status}
          </span>
        </motion.div>

        {/* H1 Headline: Stating WHO you help and WHAT outcome you deliver */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading text-text-primary tracking-tighter leading-[1.08] max-w-5xl"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6.2rem)' }}
        >
          I build <span className="text-accent">AI-powered SaaS tools</span> that ship to production.
        </motion.h1>

        {/* Subtitle - MERN + LLM Agents from idea to deployment */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16, ease: 'easeOut' }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl leading-relaxed font-normal"
        >
          <strong className="text-text-primary font-semibold">Mubasshir Ali</strong> — MERN + LLM agents, from idea to deployment. Building payment-integrated SaaS backends with webhook idempotency, multi-agent browser automation, and zero hallucination risk.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {/* Primary CTA: Magnetic Button Book 15-min discovery call */}
          <MagneticButton
            onClick={onBookCall}
            className="px-6 py-3.5 rounded-pill bg-accent text-white font-medium text-sm sm:text-base hover:bg-accent-hover transition-all duration-200 shadow-glow flex items-center gap-2.5 group cursor-pointer"
          >
            <span>Book 15-Min Discovery Call</span>
            <Zap className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
          </MagneticButton>

          {/* Secondary CTA: Ask AI Twin */}
          <button
            onClick={onOpenAITwin}
            className="px-6 py-3.5 rounded-pill bg-surface border border-border text-text-primary font-medium text-sm sm:text-base hover:bg-surface-elevated hover:border-text-secondary/40 transition-all duration-200 shadow-subtle flex items-center gap-2.5"
          >
            <Bot className="w-4 h-4 text-accent" />
            <span>Ask My AI Twin</span>
            <span className="text-[10px] font-mono uppercase bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">
              Instant
            </span>
          </button>

          {/* Quick Portfolio Jump */}
          <a
            href="#live-builds"
            className="text-xs sm:text-sm font-mono text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5 px-3 py-2"
          >
            <span>View Live GitHub Builds ↓</span>
          </a>
        </motion.div>

        {/* TRUST BAR (Immediately below hero) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.32, ease: 'easeOut' }}
          className="mt-12 p-4 rounded-card bg-surface/90 border border-border/80 shadow-subtle flex flex-wrap items-center justify-between gap-4 text-xs font-mono"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-text-primary font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Built production SaaS used by real customers</span>
            </span>
            <span className="hidden md:inline text-text-muted">•</span>
            <span className="text-text-secondary px-2 py-0.5 rounded bg-surface-elevated border border-border/60">
              Razorpay Integrated
            </span>
            <span className="text-text-secondary px-2 py-0.5 rounded bg-surface-elevated border border-border/60">
              AWS Bedrock
            </span>
            <span className="text-text-secondary px-2 py-0.5 rounded bg-surface-elevated border border-border/60">
              Google Cloud Run
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-text-muted text-[11px]">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>{PERSONAL_INFO.responseTime}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
