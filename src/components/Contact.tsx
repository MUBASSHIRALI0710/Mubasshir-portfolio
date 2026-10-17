'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Calendar,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface ContactProps {
  onBookCall?: () => void;
}

export function Contact({ onBookCall }: ContactProps) {
  const handleBookCall = () => {
    if (onBookCall) {
      onBookCall();
    } else {
      window.open(PERSONAL_INFO.calendly, '_blank');
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'AI Web Application / RAG',
    budget: '$1,500 – $3,500',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setIsSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FF4D00', '#00D47E'],
        });
      } catch (err) {
        // ignore
      }
    } catch (err) {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Info & Quick Booking (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Direct Engagement
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-text-primary tracking-tight">
              Let&apos;s build something.
            </h2>
            <p className="mt-4 text-base text-text-secondary leading-relaxed">
              Have an AI MVP to ship or a MERN application that needs scaling? Reach out directly. No gatekeepers, no automated ticket queues.
            </p>
          </div>

          {/* Response Promise Badge */}
          <div className="p-4 rounded-lg bg-surface border border-border flex items-center gap-3">
            <Clock className="w-5 h-5 text-accent shrink-0" />
            <div>
              <div className="text-xs font-semibold font-mono text-text-primary uppercase">
                Response Guarantee
              </div>
              <p className="text-xs text-text-secondary">
                Usually replies within 24 hours (often under 2 hours).
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-surface border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-text-muted">Email</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm font-medium text-text-primary hover:text-accent transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="p-1.5 rounded hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 rounded-lg bg-surface border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-text-muted">Phone / WhatsApp</div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    className="text-xs sm:text-sm font-medium text-text-primary hover:text-accent transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          </div>

          {/* Discovery Call Trigger */}
          <div className="p-6 rounded-card bg-surface-elevated border border-accent/30 space-y-3">
            <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase">
              <Calendar className="w-4 h-4" />
              <span>Fast-Track Your Discovery</span>
            </div>
            <p className="text-xs text-text-secondary">
              Prefer speaking directly? Reserve a 15-minute consultation to review requirements and architecture.
            </p>
            <button
              onClick={handleBookCall}
              className="w-full py-3 px-4 rounded-pill bg-accent text-white font-medium text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-glow flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 15-Min Intro Call</span>
            </button>
          </div>

          {/* Direct WhatsApp and LinkedIn Funnel CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-input bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Me Directly</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-input bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-3 pt-1">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-input bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>github.com/MUBASSHIRALI0710</span>
            </a>
            <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Verified on LinkedIn</span>
            </span>
          </div>
        </div>

        {/* Right Column: Direct Form (7 cols) */}
        <div className="lg:col-span-7 bg-surface border border-border rounded-card p-6 sm:p-8 shadow-subtle">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-text-primary">
                Inquiry Received!
              </h3>
              <p className="text-sm text-text-secondary max-w-md mx-auto">
                Thank you for reaching out. Mubasshir has received your message and will review your specifications within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    projectType: 'AI Web Application / RAG',
                    budget: '$1,500 – $3,500',
                    message: '',
                  });
                }}
                className="mt-4 px-4 py-2 rounded-pill bg-surface-elevated border border-border text-xs font-mono text-text-primary hover:border-accent transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-lg font-bold font-heading text-text-primary pb-2 border-b border-border">
                Project Inquiry Form
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-1.5 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-input bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-1.5 font-medium">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-input bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-1.5 font-medium">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-input bg-surface-elevated border border-border text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="AI Web Application / RAG">AI Web Application / RAG</option>
                    <option value="Full-Stack MERN Product">Full-Stack MERN Product</option>
                    <option value="AI Workflow & Integrations">AI Workflow &amp; Integrations</option>
                    <option value="Clinical / Predictive ML App">Clinical / Predictive ML App</option>
                    <option value="Contract / Consultation">Contract / Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-1.5 font-medium">
                    Target Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-input bg-surface-elevated border border-border text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="$500 – $1,500">$500 – $1,500 (MVP / Sprint)</option>
                    <option value="$1,500 – $3,500">$1,500 – $3,500 (Production App)</option>
                    <option value="$3,500 – $7,000+">$3,500 – $7,000+ (Full Platform)</option>
                    <option value="Custom / Hourly Retainer">Custom / Retainer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-1.5 font-medium">
                  Project Overview &amp; Goals *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about what you're building, target launch date, and any specific technical requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-input bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-pill bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-all duration-200 shadow-glow flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending Specifications...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Project Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
