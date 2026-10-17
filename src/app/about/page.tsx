import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_URL, PERSONAL_INFO } from '@/data/portfolioData';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  GraduationCap,
  Briefcase,
  Trophy,
  Award,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Terminal,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'About Mubasshir Ali — Software Engineer | Full-Stack & AI-Integrated Systems',
  description:
    'Learn about Mubasshir Ali: Next.js Developer Intern at AiKing Solutions, B.Tech CSE graduate from Maulana Abul Kalam Azad University of Technology (GPA 8.57/10). 200+ LeetCode DSA, NASA Space Apps competitor.',
  keywords: [
    'Mubasshir Ali',
    'Mubasshir Ali developer',
    'Mubasshir Ali AI engineer',
    'Mubasshir Ali portfolio',
    'AiKing Solutions Mubasshir Ali',
    'NanoBrowser SaaS',
    'MAKAUT CSE',
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Mubasshir Ali — Software Engineer | Full-Stack & AI-Integrated Systems',
    description:
      'Professional background, production SaaS experience at AiKing Solutions, and engineering credentials of Mubasshir Ali.',
    url: `${SITE_URL}/about`,
    siteName: 'Mubasshir Ali Portfolio',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Mubasshir Ali — Software Engineer',
    description:
      'Software Engineer shipping production subscription-based SaaS products with AWS Bedrock, Next.js 15, and Razorpay.',
    creator: '@mubasshirali',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mubasshir Ali',
    givenName: 'Mubasshir',
    familyName: 'Ali',
    jobTitle: 'Software Engineer | Full-Stack & AI-Integrated Systems',
    gender: 'Male',
    nationality: 'Indian',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressCountry: 'India',
    },
    email: PERSONAL_INFO.email,
    telephone: PERSONAL_INFO.phone,
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/images/profile.jpg`,
    sameAs: [PERSONAL_INFO.linkedin, PERSONAL_INFO.github, PERSONAL_INFO.twitter],
    worksFor: {
      '@type': 'Organization',
      name: 'AiKing Solutions',
      jobTitle: 'Next.js Developer Intern',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Maulana Abul Kalam Azad University of Technology, West Bengal',
      award: 'Bachelor of Technology in Computer Science & Engineering (GPA 8.57/10)',
    },
    knowsAbout: [
      'Full-Stack Web Development',
      'Artificial Intelligence',
      'AWS Bedrock & Amazon Nova Lite',
      'Groq LLM Function Calling',
      'Next.js 15',
      'React 19',
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'Razorpay Payment Webhooks',
      'Python',
      'Scikit-learn',
      'Data Structures & Algorithms',
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12 border-b border-border pb-8">
          <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Verified Resume &amp; Professional Background
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight text-text-primary">
            About Mubasshir Ali
          </h1>
          <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Software Engineer specializing in Full-Stack &amp; AI-Integrated Systems. Hands-on experience shipping production subscription-based SaaS products end-to-end.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Photo & Facts (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-border/80 hover:border-accent/40 bg-surface-elevated aspect-[4/5] shadow-2xl group transition-all duration-300">
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

              {/* Bottom Glassmorphic Identity Card */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-black/70 backdrop-blur-md border-t border-white/10 text-white">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-heading text-white">Mubasshir Ali</h2>
                  <span className="text-[10px] font-mono uppercase bg-accent/20 text-accent border border-accent/30 px-1.5 py-0.2 rounded font-semibold">
                    SWE
                  </span>
                </div>
                <p className="text-xs text-white/80 font-mono mt-0.5">
                  Software Engineer • Full-Stack &amp; AI
                </p>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span>Bengaluru, India (IST)</span>
                  <a
                    href="https://wa.me/917003151313"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>+91 70031 51313</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick credentials card */}
            <div className="p-5 rounded-card bg-surface border border-border space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-text-muted">Current Role</span>
                <span className="font-semibold text-text-primary">Next.js Dev Intern @ AiKing</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-text-muted">Degree &amp; GPA</span>
                <span className="font-bold text-accent">B.Tech CSE (8.57 / 10)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-text-muted">University</span>
                <span className="text-text-primary text-right max-w-[180px] truncate" title="Maulana Abul Kalam Azad University of Technology">
                  MAKAUT, West Bengal
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-text-muted">DSA Solving</span>
                <span className="font-bold text-emerald-500">200+ LeetCode Problems</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Competition</span>
                <span className="text-text-primary">NASA Space Apps 2023</span>
              </div>
            </div>

            {/* Download Resume button */}
            <a
              href="/assets/resume.pdf"
              download="Mubasshir_Ali_Resume.pdf"
              className="w-full py-3 px-4 rounded-pill bg-accent text-white font-medium text-xs font-mono flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors shadow-glow"
            >
              <span>Download Official Resume (PDF)</span>
            </a>

            {/* Social channels */}
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-2.5 rounded-input bg-surface border border-border text-xs font-mono flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-2.5 rounded-input bg-surface border border-border text-xs font-mono flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Experience, Narrative & Achievements (7 cols) */}
          <div className="md:col-span-7 space-y-8 text-base text-text-secondary leading-relaxed font-sans">
            {/* Professional Summary */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-heading text-text-primary">
                Professional Summary
              </h2>
              <p>
                I am <strong className="text-text-primary font-semibold">Mubasshir Ali</strong>, a Software Engineer with hands-on experience shipping a production, subscription-based SaaS product end-to-end — architecting backend systems, integrating payment gateways, and deploying LLM-powered browser automation agents.
              </p>
              <p>
                I hold a strong full-stack foundation in React.js, Node.js, and REST API development, paired with practical experience across the Python ML ecosystem (Scikit-learn, Pandas, NumPy), and solid grounding in Data Structures &amp; Algorithms (200+ solved on LeetCode), DBMS, and Operating Systems.
              </p>
            </div>

            {/* Experience Card: AiKing Solutions */}
            <div className="p-6 rounded-card bg-surface border border-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-accent font-bold text-sm font-mono uppercase">
                  <Briefcase className="w-4 h-4" />
                  <span>AiKing Solutions</span>
                </div>
                <span className="text-xs font-mono text-text-muted">Aug 2026 – Present</span>
              </div>
              <div className="text-base font-bold font-heading text-text-primary">
                Next.js Developer Intern
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    Own full-stack development of <strong>NanoBrowser SaaS</strong>, a subscription-based AI browser automation Chrome extension; architected backend with Node.js, TypeScript, Express.js, and MongoDB.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    Integrated <strong>Razorpay payment gateway</strong> across a 3-tier subscription model, including webhook-based billing events and a fully verified checkout flow.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    Led migration of core LLM infrastructure from OpenAI to <strong>AWS Bedrock</strong>, integrating <strong>Amazon Nova Lite</strong> for tool-calling-based browser automation agents.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    Implemented JWT authentication and Zod schema validation across backend APIs; resolved critical and high-severity security audit findings.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    Owned deployment pipeline on <strong>Render</strong> and MongoDB Atlas production setup alongside Chrome extension builds.
                  </span>
                </li>
              </ul>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-card bg-surface border border-border space-y-2">
                <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <div className="text-sm font-bold font-heading text-text-primary">
                  B.Tech in CSE (GPA: 8.57/10)
                </div>
                <p className="text-xs text-text-secondary">
                  Maulana Abul Kalam Azad University of Technology, West Bengal
                </p>
              </div>

              <div className="p-5 rounded-card bg-surface border border-border space-y-2">
                <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase">
                  <Award className="w-4 h-4" />
                  <span>Certifications</span>
                </div>
                <div className="text-xs text-text-primary space-y-1">
                  <div>• Legacy Responsive Web Design (freeCodeCamp, 2026)</div>
                  <div>• C++ DSA (Coder Army, 2025)</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="p-5 rounded-card bg-surface-elevated border border-border space-y-3">
              <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase">
                <Trophy className="w-4 h-4" />
                <span>Achievements &amp; Extracurriculars</span>
              </div>
              <ul className="space-y-1.5 text-xs font-mono text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Solved 200+ Data Structures &amp; Algorithms problems on LeetCode.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Participated in 2023 NASA International Space Apps Challenge (57,900+ participants, 152 countries) as part of a competing team.</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-pill bg-accent text-white font-medium text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-glow flex items-center gap-2"
              >
                <span>Hire Mubasshir for Freelance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-pill bg-surface border border-border text-xs sm:text-sm font-medium text-text-primary hover:bg-surface-elevated transition-colors"
              >
                WhatsApp Me Directly
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
