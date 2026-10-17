'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { LogoStrip } from '@/components/LogoStrip';
import { GitHubShowcase } from '@/components/GitHubShowcase';
import { SelectedWork } from '@/components/SelectedWork';
import { Services } from '@/components/Services';
import { ProcessSection } from '@/components/ProcessSection';
import { ReverseBrief } from '@/components/ReverseBrief';
import { About } from '@/components/About';
import { Writing } from '@/components/Writing';
import { Principles } from '@/components/Principles';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { AITwinChat } from '@/components/AITwinChat';
import { CalendlyModal } from '@/components/CalendlyModal';

export default function Home() {
  const [isCmdkOpen, setIsCmdkOpen] = useState(false);
  const [isAITwinOpen, setIsAITwinOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [reverseBriefService, setReverseBriefService] = useState('');

  const handleSelectServiceForBrief = (serviceName: string) => {
    setReverseBriefService(serviceName);
    const el = document.getElementById('reverse-brief');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navigation
        onOpenCmdk={() => setIsCmdkOpen(true)}
        onOpenAITwin={() => setIsAITwinOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Trust-First Positioning & Urgency */}
        <Hero
          onOpenAITwin={() => setIsAITwinOpen(true)}
          onBookCall={() => setIsCalendlyOpen(true)}
        />

        {/* 2. Logo Strip */}
        <LogoStrip />

        {/* 3. GitHub as a Live Portfolio (Open Source & Live Builds) */}
        <GitHubShowcase />

        {/* 4. Selected Work (Client Case Studies: Problem → Solution → Result) */}
        <SelectedWork
          onBookCall={() => setIsCalendlyOpen(true)}
          selectedProjectId={selectedProjectId}
          onClearSelectedProject={() => setSelectedProjectId(null)}
        />

        {/* 5. Services + Pricing Signals */}
        <Services onSelectServiceForBrief={handleSelectServiceForBrief} />

        {/* 6. Process Section ("How We'll Work Together" + Payment Terms) */}
        <ProcessSection onBookCall={() => setIsCalendlyOpen(true)} />

        {/* 7. Reverse Brief (Instant Consultation Engine) */}
        <ReverseBrief
          initialProjectType={reverseBriefService}
          onBookCall={() => setIsCalendlyOpen(true)}
          onSelectProject={handleSelectProject}
        />

        {/* 6. About */}
        <About onBookCall={() => setIsCalendlyOpen(true)} />

        {/* 7. Writing */}
        <Writing />

        {/* 8. Principles */}
        <Principles />

        {/* 9. Contact */}
        <Contact onBookCall={() => setIsCalendlyOpen(true)} />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <CommandPalette
        isOpen={isCmdkOpen}
        onClose={() => setIsCmdkOpen(false)}
        onOpenAITwin={() => setIsAITwinOpen(true)}
        onSelectProject={handleSelectProject}
      />

      <AITwinChat
        isOpen={isAITwinOpen}
        onClose={() => setIsAITwinOpen(false)}
        onBookCall={() => {
          setIsAITwinOpen(false);
          setIsCalendlyOpen(true);
        }}
      />

      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </div>
  );
}
