'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, CloudSun, Heart } from 'lucide-react';

export function Footer() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-surface-elevated/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Identity & Stack */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-text-secondary text-center sm:text-left">
          <span className="font-heading font-bold text-sm text-text-primary">
            Mubasshir Ali
          </span>
          <span className="hidden sm:inline text-text-muted">•</span>
          <span>Crafted with Next.js 15, Tailwind &amp; AI</span>
          <span className="hidden sm:inline text-text-muted">•</span>
          <span>© {new Date().getFullYear()} All rights reserved</span>
        </div>

        {/* Center: Live Time & Location */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-pill bg-surface border border-border text-xs font-mono text-text-secondary shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>{timeString || 'IST'} (India)</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-text-muted">
            <CloudSun className="w-3.5 h-3.5 text-amber-500" />
            <span>28°C Clear</span>
          </span>
        </div>

        {/* Right: Quick Links & Back to Top */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <a href="/blog" className="text-text-secondary hover:text-accent transition-colors">
            Blog
          </a>
          <a href="/about" className="text-text-secondary hover:text-accent transition-colors">
            About
          </a>
          <a href="/now" className="text-text-secondary hover:text-accent transition-colors">
            /now
          </a>
          <a href="/uses" className="text-text-secondary hover:text-accent transition-colors">
            /uses
          </a>
          <a href="/contact" className="text-text-secondary hover:text-accent transition-colors">
            Contact
          </a>
          <a href="/rss.xml" className="text-accent hover:underline">
            RSS
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors ml-2"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
