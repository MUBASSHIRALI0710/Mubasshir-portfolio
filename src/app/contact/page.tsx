import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL, PERSONAL_INFO } from '@/data/portfolioData';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact Mubasshir Ali — Full-Stack & AI Engineer | Hire for Freelance',
  description:
    'Get in touch with Mubasshir Ali for freelance engineering, high-impact contracts, and AI/MERN development. Usually replies within 24 hours.',
  keywords: [
    'Contact Mubasshir Ali',
    'Hire Mubasshir Ali',
    'Mubasshir Ali freelance',
    'Mubasshir Ali contact',
    'Full-Stack Developer contact',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Mubasshir Ali — Full-Stack & AI Engineer',
    description: 'Direct inquiries, discovery calls, and project specifications.',
    url: `${SITE_URL}/contact`,
    siteName: 'Mubasshir Ali Portfolio',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navigation />

      <main className="flex-1 pt-24">
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
