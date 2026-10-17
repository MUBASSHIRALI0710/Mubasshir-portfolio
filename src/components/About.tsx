'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Hammer,
  BookOpen,
  FlaskConical,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface AboutProps {
  onBookCall?: () => void;
}

export function About({ onBookCall }: AboutProps) {
  const handleBookCall = () => {
    if (onBookCall) {
      onBookCall();
    } else {
      window.open(PERSONAL_INFO.calendly, '_blank');
    }
  };
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          The Engineer Behind The Code
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-text-primary tracking-tight">
          Not an agency. A high-leverage product engineer.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Photo & Direct Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-border/80 hover:border-accent/40 bg-surface-elevated aspect-[4/5] max-w-md mx-auto lg:max-w-none shadow-2xl group transition-all duration-300">
            {/* Real photo with next/image */}
            <Image
              src="/images/profile.jpg"
              alt="Mubasshir Ali - Full-Stack & AI Systems Engineer"
              fill
              className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

            {/* Top Verified Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available Q1 2027</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified</span>
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 bg-black/70 backdrop-blur-md border-t border-white/10 text-white">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-heading text-white">Mubasshir Ali</h3>
                <span className="text-[10px] font-mono uppercase bg-accent/20 text-accent border border-accent/30 px-1.5 py-0.2 rounded font-semibold">
                  SWE
                </span>
              </div>
              <p className="text-xs text-white/80 font-mono mt-0.5">
                Full-Stack &amp; AI Engineer • AiKing Solutions
              </p>
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/70">
                <span>Bengaluru, India (IST)</span>
                <a
                  href="https://wa.me/917003151313"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-medium"
                >
                  +91 70031 51313
                </a>
              </div>
            </div>
          </div>

          {/* Quick Academic & Credentials Pill */}
          <div className="p-4 rounded-lg bg-surface border border-border flex items-center justify-between text-xs font-mono text-text-secondary">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-accent" />
              <span>B.Tech in Computer Science (MAKAUT)</span>
            </div>
            <span className="font-bold text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              8.57 / 10 GPA
            </span>
          </div>
        </div>

        {/* Right Column: Story & "Currently" Board (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Authentic, human copy */}
          <div className="space-y-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            <p>
              I don&apos;t build brochure websites that gather dust. I engineer high-conversion full-stack web platforms and zero-hallucination AI products that solve tangible operational headaches.
            </p>
            <p>
              My background in Computer Science at MAKAUT (graduated with an 8.57 / 10 GPA) taught me to reason from first principles: deterministic database locking, multi-tenant isolation, and sub-100ms API endpoints. When AI exploded, I applied the same engineering rigor — replacing hype with verifiable semantic retrieval, strict guardrails, and latency optimization.
            </p>
            <p>
              Whether it&apos;s helping an educational institute recover 18% of uncollected tuition via custom SaaS automation, or training an SVM classifier to assist clinicians with 77.4% accuracy, I focus on commercial outcomes first and clean, maintainable code second.
            </p>
          </div>

          {/* "Currently" Live Status Board */}
          <div className="p-6 rounded-card bg-surface border border-border shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                Currently / Live Status Board
              </span>
              <span className="text-[10px] font-mono text-text-muted">Updated Nov 2026</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-surface-elevated/70 border border-border/80">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-text-primary mb-1">
                  <Hammer className="w-3.5 h-3.5 text-accent" />
                  <span>Building</span>
                </div>
                <p className="text-xs text-text-secondary">
                  {PERSONAL_INFO.currently.building}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-elevated/70 border border-border/80">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-text-primary mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-accent" />
                  <span>Reading</span>
                </div>
                <p className="text-xs text-text-secondary">
                  {PERSONAL_INFO.currently.reading}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-elevated/70 border border-border/80">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-text-primary mb-1">
                  <FlaskConical className="w-3.5 h-3.5 text-accent" />
                  <span>Exploring</span>
                </div>
                <p className="text-xs text-text-secondary">
                  {PERSONAL_INFO.currently.exploring}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-elevated/70 border border-border/80">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-text-primary mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Core Focus</span>
                </div>
                <p className="text-xs text-text-secondary">
                  {PERSONAL_INFO.currently.focus}
                </p>
              </div>
            </div>
          </div>

          {/* Work With Me CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleBookCall}
              className="px-6 py-3 rounded-pill bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors shadow-glow flex items-center gap-2"
            >
              <span>Schedule 15-Min Technical Intro</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="#contact"
              className="px-5 py-3 rounded-pill bg-surface border border-border text-text-primary font-medium text-sm hover:bg-surface-elevated transition-colors"
            >
              Send Direct Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
