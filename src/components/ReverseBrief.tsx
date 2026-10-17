'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import {
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Clock,
  RefreshCw,
  FolderGit2,
  ExternalLink,
  MessageCircle,
  IndianRupee,
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { GeneratedRoadmap, ReverseBriefData } from '@/types';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface ReverseBriefProps {
  initialProjectType?: string;
  onBookCall: () => void;
  onSelectProject?: (id: string) => void;
}

export function ReverseBrief({
  initialProjectType = '',
  onBookCall,
  onSelectProject,
}: ReverseBriefProps) {
  const [formData, setFormData] = useState<ReverseBriefData>({
    projectType: initialProjectType || 'SaaS Product (MERN / Full-Stack)',
    timeline: '1 Month (Standard)',
    budget: '₹50,000 – ₹1,00,000 ($600 – $1,200)',
    description: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<GeneratedRoadmap | null>(null);
  const [copiedProposal, setCopiedProposal] = useState(false);

  // Sync if initialProjectType changes
  React.useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  const projectTypeOptions = [
    'SaaS Product (MERN / Full-Stack)',
    'AI Tool / Agent (RAG / LLM Tool-Calling)',
    'Chrome Extension (Manifest V3 / Automation)',
    'Other / Custom Full-Stack Architecture',
  ];

  const timelineOptions = [
    '2 Weeks (Sprint MVP)',
    '1 Month (Standard Launch)',
    '2+ Months (Comprehensive Platform)',
  ];

  const budgetOptions = [
    '₹25,000 – ₹50,000 ($300 – $600)',
    '₹50,000 – ₹1,00,000 ($600 – $1,200)',
    '₹1,00,000+ ($1,200+)',
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate smart dynamic roadmap synthesis
    setTimeout(() => {
      let stack: string[] = [];
      let relevantProjects = [];
      let phases = [];

      if (formData.projectType.includes('Chrome Extension')) {
        stack = ['Chrome Manifest V3', 'TypeScript', 'Node.js', 'AWS Bedrock', 'Razorpay', 'Docker'];
        phases = [
          {
            name: 'Phase 1: Architecture & Manifest V3 Scaffolding',
            duration: 'Days 1 – 4',
            deliverables: [
              'Manifest V3 background service worker setup with offscreen documents',
              'Popup UI & options panel with Tailwind CSS and React',
              'API contract & secure token management architecture',
            ],
          },
          {
            name: 'Phase 2: Automation Engine & Backend Integration',
            duration: 'Days 5 – 10',
            deliverables: [
              'DOM manipulation & event-driven automation with human-like delays',
              'Backend API endpoints with JWT auth and rate limiting',
              'Payment integration (Razorpay / Stripe) with webhook verification',
            ],
          },
          {
            name: 'Phase 3: Webstore Packaging, Hardening & Delivery',
            duration: 'Days 11 – 14',
            deliverables: [
              'Chrome Web Store zip packaging compliant with Google policies',
              'End-to-end edge case testing across Chromium browsers',
              'Code repository handover + 14-day deployment warranty',
            ],
          },
        ];
        relevantProjects = [
          {
            title: 'NanoBrowser SaaS (AI Browser Automation)',
            relevanceReason: 'Chrome Extension V3 with AWS Bedrock Amazon Nova Lite & Razorpay recurring billing.',
            linkId: 'nanobrowser-saas',
            githubUrl: 'https://github.com/MUBASSHIRALI0710',
            techBadge: 'Manifest V3 • AWS Bedrock',
          },
          {
            title: 'AI Refund Support Agent',
            relevanceReason: 'Autonomous tool-calling architecture with strict policy enforcement.',
            linkId: 'ai-refund-agent',
            githubUrl: 'https://github.com/MUBASSHIRALI0710',
            techBadge: 'Groq LLM • Function Calling',
          },
          {
            title: 'AttendPro Attendance System',
            relevanceReason: 'Full-stack authentication and secure backend API workflows.',
            linkId: 'attendpro-system',
            githubUrl: 'https://github.com/MUBASSHIRALI0710',
            techBadge: 'MERN • JWT Auth',
          },
        ];
      } else if (formData.projectType.includes('AI Tool')) {
        stack = ['Next.js 15', 'TypeScript', 'AWS Bedrock / Groq', 'Vector DB', 'Zod', 'Tailwind CSS'];
        phases = [
          {
            name: 'Phase 1: RAG Pipeline & Guardrail Modeling',
            duration: 'Days 1 – 5',
            deliverables: [
              'Knowledge chunking strategy & semantic window retrieval setup',
              'Deterministic negative-response guardrails to prevent hallucinations',
              'Type-safe system prompts and function/tool schema definitions',
            ],
          },
          {
            name: 'Phase 2: Core Agent Logic & Streaming UI',
            duration: 'Days 6 – 14',
            deliverables: [
              'Sub-200ms token streaming API routes using Vercel AI SDK',
              'Autonomous function calling with backend verification layers',
              'Interactive chat / dashboard interface with citation badges',
            ],
          },
          {
            name: 'Phase 3: Stress Testing, Deployment & Handover',
            duration: 'Days 15 – 20',
            deliverables: [
              'Adversarial prompt injection testing and latency benchmarking',
              'Production deployment on Vercel / Google Cloud Run',
              'Documentation, API contracts, and 14-day warranty support',
            ],
          },
        ];
        relevantProjects = [
          {
            title: 'AI Refund Support Agent (Groq LLM Function Calling)',
            relevanceReason: 'Zero-hallucination agent with 7 tool functions and 6 policy rules (7/7 test scenarios passed).',
            linkId: 'ai-refund-agent',
            githubUrl: 'https://github.com/MUBASSHIRALI0710',
            techBadge: 'Groq LLM • 7 Tool Functions',
          },
          {
            title: 'NanoBrowser SaaS (Dual-Agent Planner/Navigator)',
            relevanceReason: 'Multi-agent orchestration with Amazon Nova Lite via AWS Bedrock.',
            linkId: 'nanobrowser-saas',
            githubUrl: 'https://github.com/MUBASSHIRALI0710',
            techBadge: 'AWS Bedrock • Nova Lite',
          },
          {
            title: 'Clinical Diabetes Prediction ML Platform',
            relevanceReason: 'Explainable Support Vector Machine ML classifier with sub-95ms inference.',
            linkId: 'diabetes-prediction-ml',
            githubUrl: 'https://github.com/MUBASSHIRALI0710',
            techBadge: 'Python • Scikit-learn',
          },
        ];
      } else {
        // SaaS or Other
        stack = ['Next.js 15', 'React 19', 'Node.js', 'Express', 'MongoDB / Postgres', 'Razorpay', 'Tailwind CSS'];
        phases = [
          {
            name: 'Phase 1: System Architecture & Database Design',
            duration: 'Days 1 – 6',
            deliverables: [
              'Normalized MongoDB / Postgres schema with compound indexes',
              'Role-based JWT authentication and session management',
              'Interactive high-fidelity frontend wireframes in Tailwind CSS',
            ],
          },
          {
            name: 'Phase 2: Core Business Logic & Payment Gateways',
            duration: 'Days 7 – 18',
            deliverables: [
              'CRUD API endpoints with Zod type validation',
              'Razorpay / Stripe subscription billing with idempotent webhooks',
              'Responsive admin analytics dashboard with live data charts',
            ],
          },
          {
            name: 'Phase 3: Hardening, Cloud Deployment & Warranty',
            duration: 'Days 19 – 25',
            deliverables: [
              'Sub-80ms query optimization & security penetration audits',
              'Production CI/CD deployment on Render / Vercel with MongoDB Atlas',
              'Full source code handover on GitHub + 14-day warranty',
            ],
          },
        ];
        relevantProjects = [
          {
            title: 'NanoBrowser SaaS (Subscription Billing Architecture)',
            relevanceReason: 'Shipped commercial SaaS with 3-tier Razorpay billing and webhook idempotency.',
            linkId: 'nanobrowser-saas',
            githubUrl: 'https://github.com/MUBASSHIRALI0710',
            techBadge: 'Razorpay • MongoDB Atlas',
          },
          {
            title: 'AttendPro Smart Attendance Management System',
            relevanceReason: 'Full-stack MERN with sub-80ms queries, role-based JWT auth, and duplicate validation.',
            linkId: 'attendpro-system',
            githubUrl: 'https://github.com/MUBASSHIRALI0710',
            techBadge: 'MERN Stack • JWT',
          },
          {
            title: 'AI Refund Support Agent',
            relevanceReason: 'Autonomous workflow integration with real-time admin reasoning dashboard.',
            linkId: 'ai-refund-agent',
            githubUrl: 'https://github.com/MUBASSHIRALI0710',
            techBadge: 'Next.js 15 • Express',
          },
        ];
      }

      const roadmap: GeneratedRoadmap = {
        title: `Tailored Architecture: ${formData.projectType}`,
        summary: `Strategic engineering roadmap crafted for your ${formData.timeline} launch and ${formData.budget} budget. Includes 50% milestone billing, production code handover, and 14-day post-launch warranty.`,
        timelineWeeks: formData.timeline,
        estimatedInvestment: formData.budget,
        phases,
        recommendedStack: stack,
        relevantProjects,
      };

      setGeneratedRoadmap(roadmap);
      setIsGenerating(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#FF4D00', '#00D47E', '#0A0A0A'],
        });
      } catch (err) {
        // ignore in non-browser env
      }
    }, 500);
  };

  const copyProposal = () => {
    if (!generatedRoadmap) return;
    const text = `
PROJECT ROADMAP & ESTIMATE — Mubasshir Ali
Scope: ${formData.projectType}
Timeline: ${formData.timeline}
Target Budget: ${formData.budget}

PHASES:
${generatedRoadmap.phases
  .map(
    (p) => `${p.name} (${p.duration}):\n${p.deliverables.map((d) => `  - ${d}`).join('\n')}`
  )
  .join('\n\n')}

RECOMMENDED STACK: ${generatedRoadmap.recommendedStack.join(', ')}

Mubasshir Ali (Software Engineer | Full-Stack & AI)
Portfolio: https://mubasshirali0710.github.io/Mubasshir-portfolio
Email: ${PERSONAL_INFO.email} | WhatsApp: ${PERSONAL_INFO.phone}
`.trim();

    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  return (
    <section
      id="brief"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-12"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-pill bg-accent/10 border border-accent/20">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Client Consultation
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-text-primary tracking-tight">
          A consultation, not a brochure.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
          Skip generic &ldquo;Hire Me&rdquo; emails. Tell me your project scope in 3 quick fields, and get a tailored phased roadmap, estimated cost, and matching production GitHub precedents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column (5 cols) */}
        <div className="lg:col-span-5 bg-surface border border-border rounded-card p-6 sm:p-8 shadow-subtle">
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Step 1: What are you building? */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-2 font-semibold flex items-center justify-between">
                <span>Step 1: What are you building?</span>
                <span className="text-[10px] font-mono text-accent">Required</span>
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-input bg-surface-elevated border border-border text-text-primary text-sm focus:border-accent focus:outline-none transition-colors"
              >
                {projectTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Timeline */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-2 font-semibold flex items-center justify-between">
                <span>Step 2: Desired Timeline</span>
                <Clock className="w-3.5 h-3.5 text-text-muted" />
              </label>
              <div className="space-y-2">
                {timelineOptions.map((time) => (
                  <button
                    type="button"
                    key={time}
                    onClick={() => setFormData({ ...formData, timeline: time })}
                    className={`w-full px-3.5 py-2.5 text-xs font-mono rounded-input border transition-all text-left flex items-center justify-between ${
                      formData.timeline === time
                        ? 'border-accent bg-accent/10 text-accent font-semibold shadow-xs'
                        : 'border-border bg-surface-elevated text-text-secondary hover:border-text-secondary'
                    }`}
                  >
                    <span>{time}</span>
                    {formData.timeline === time && <Check className="w-3.5 h-3.5 text-accent" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Budget Range */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-2 font-semibold flex items-center justify-between">
                <span>Step 3: Budget Range</span>
                <IndianRupee className="w-3.5 h-3.5 text-text-muted" />
              </label>
              <div className="space-y-2">
                {budgetOptions.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setFormData({ ...formData, budget: b })}
                    className={`w-full px-3.5 py-2.5 text-xs font-mono rounded-input border transition-all text-left flex items-center justify-between ${
                      formData.budget === b
                        ? 'border-accent bg-accent/10 text-accent font-semibold shadow-xs'
                        : 'border-border bg-surface-elevated text-text-secondary hover:border-text-secondary'
                    }`}
                  >
                    <span>{b}</span>
                    {formData.budget === b && <Check className="w-3.5 h-3.5 text-accent" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Context */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                Optional: Brief notes or unique requirements
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Needs AWS Bedrock integration, Razorpay subscription webhooks, sub-200ms latency..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-input bg-surface-elevated border border-border text-text-primary text-xs focus:border-accent focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 px-4 rounded-pill bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-all duration-200 shadow-glow flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Tailored Roadmap...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Custom Roadmap & Estimate</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-text-muted">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Instant blueprint • Zero sales pressure</span>
            </div>
          </form>
        </div>

        {/* Output Column (7 cols) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {generatedRoadmap ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-surface border border-accent/40 rounded-card p-6 sm:p-8 shadow-subtle relative overflow-hidden"
              >
                {/* Top Status */}
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono uppercase text-accent font-semibold tracking-wider">
                      Tailored Blueprint Ready
                    </span>
                  </div>
                  <button
                    onClick={copyProposal}
                    className="flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text-primary px-2.5 py-1 rounded border border-border bg-surface-elevated transition-colors"
                  >
                    {copiedProposal ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Roadmap</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Title & Summary */}
                <div className="mt-4">
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-text-primary">
                    {generatedRoadmap.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {generatedRoadmap.summary}
                  </p>
                </div>

                {/* Investment & Timeline Bar */}
                <div className="mt-5 grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-surface-elevated border border-border">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-text-muted block">
                      Target Timeline
                    </span>
                    <span className="text-sm font-bold font-mono text-text-primary">
                      {generatedRoadmap.timelineWeeks}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-text-muted block">
                      Estimated Cost
                    </span>
                    <span className="text-sm font-bold font-mono text-accent">
                      {generatedRoadmap.estimatedInvestment}
                    </span>
                  </div>
                </div>

                {/* Phased Roadmap */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-accent" />
                    Phased Implementation Roadmap
                  </h4>
                  {generatedRoadmap.phases.map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-border/80 bg-surface/70 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold font-mono text-text-primary">
                          {phase.name}
                        </span>
                        <span className="text-[10px] font-mono text-accent px-2 py-0.5 rounded bg-accent/10">
                          {phase.duration}
                        </span>
                      </div>
                      <ul className="space-y-1 mt-2">
                        {phase.deliverables.map((d, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-2 text-xs text-text-secondary"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Recommended Stack */}
                <div className="mt-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-2">
                    Recommended Production Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedRoadmap.recommendedStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-surface-elevated border border-border text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* "Here are 3 similar things I've built" (GitHub & Case Studies) */}
                <div className="mt-7 pt-5 border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <FolderGit2 className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono uppercase tracking-wider text-text-primary font-bold">
                      Here are 3 similar things I&apos;ve built:
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {generatedRoadmap.relevantProjects.map((rp, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-lg bg-surface-elevated border border-border/80 hover:border-accent/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-text-primary font-mono">
                              {rp.title}
                            </span>
                            {rp.techBadge && (
                              <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.2 rounded">
                                {rp.techBadge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-text-secondary mt-1">
                            {rp.relevanceReason}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {rp.linkId && (
                            <Link
                              href={`/projects/${rp.linkId}`}
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline px-2.5 py-1 rounded bg-accent/10 border border-accent/20"
                            >
                              <span>Case Study</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                          {rp.githubUrl && (
                            <a
                              href={rp.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-text-secondary hover:text-text-primary px-2.5 py-1 rounded bg-surface border border-border hover:border-text-secondary transition-colors"
                            >
                              <GithubIcon className="w-3 h-3" />
                              <span>GitHub</span>
                              <ExternalLink className="w-2.5 h-2.5 text-text-muted" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversion CTAs */}
                <div className="mt-8 pt-5 border-t border-border flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={onBookCall}
                    className="w-full sm:w-auto px-6 py-3 rounded-pill bg-accent text-white font-medium text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-glow flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book 15-Min Call to Discuss</span>
                  </button>

                  <a
                    href={`https://wa.me/917003151313?text=${encodeURIComponent(
                      `Hi Mubasshir, I generated a tailored roadmap on your portfolio for ${formData.projectType} with timeline ${formData.timeline} and budget ${formData.budget}. Let's discuss!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-3 rounded-pill bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=Project Proposal: ${encodeURIComponent(
                      formData.projectType
                    )}&body=Hi Mubasshir,%0D%0A%0D%0AI reviewed the custom roadmap on your portfolio for ${encodeURIComponent(
                      formData.projectType
                    )} (${encodeURIComponent(formData.timeline)}, ${encodeURIComponent(
                      formData.budget
                    )}).%0D%0A%0D%0ALet's connect to review details.`}
                    className="w-full sm:w-auto px-4 py-3 rounded-pill bg-surface border border-border text-text-primary font-medium text-xs sm:text-sm hover:bg-surface-elevated transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-text-secondary" />
                    <span>Email Proposal</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="bg-surface border border-dashed border-border rounded-card p-12 text-center flex flex-col items-center justify-center min-h-[440px]">
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-text-primary">
                  Ready to map your product
                </h3>
                <p className="mt-2 text-sm text-text-secondary max-w-sm leading-relaxed">
                  Select your project type, timeline, and budget on the left to receive a custom phased roadmap, estimated cost, and 3 matching GitHub project precedents.
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Free • Zero obligation • Immediate consultation</span>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
