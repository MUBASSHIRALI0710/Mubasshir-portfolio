'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon, Command, Menu, X, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface NavigationProps {
  onOpenCmdk?: () => void;
  onOpenAITwin?: () => void;
}

export function Navigation({ onOpenCmdk, onOpenAITwin }: NavigationProps) {
  const pathname = usePathname() || '/';
  const { resolvedTheme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');

  const handleOpenCmdk = () => {
    if (onOpenCmdk) {
      onOpenCmdk();
    } else {
      window.location.href = '/#hero';
    }
  };

  const handleOpenAITwin = () => {
    if (onOpenAITwin) {
      onOpenAITwin();
    } else {
      window.location.href = '/#hero';
    }
  };

  useEffect(() => {
    setIsMac(typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ScrollSpy to track active homepage sections (work, services, brief)
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = ['work', 'services', 'brief'];
    const handleSectionScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleSectionScroll, { passive: true });
    handleSectionScroll();
    return () => window.removeEventListener('scroll', handleSectionScroll);
  }, [pathname]);

  const navLinks = [
    { name: 'Work', href: '/#work', sectionId: 'work' },
    { name: 'Services', href: '/#services', sectionId: 'services' },
    { name: 'Brief', href: '/#brief', sectionId: 'brief' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Now', href: '/now', isLive: true },
    { name: 'Contact', href: '/contact' },
  ];

  const checkIsActive = (link: { href: string; sectionId?: string }) => {
    if (link.sectionId) {
      return pathname === '/' && activeSection === link.sectionId;
    }
    if (link.href === '/') {
      return pathname === '/' && !activeSection;
    }
    return pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-background/85 backdrop-blur-md border-b border-border py-2.5 shadow-xs'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Logo & Compact Availability Indicator */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/"
              className={`text-base sm:text-lg font-bold font-heading tracking-tight transition-colors flex items-center gap-2 whitespace-nowrap ${
                pathname === '/' && !activeSection ? 'text-accent' : 'text-text-primary hover:text-accent'
              }`}
            >
              <span>Mubasshir Ali</span>
              <span className="relative flex h-2 w-2" title="Available for freelance (Q1 2027)">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </a>

            {/* Availability Pill ONLY on very wide screens (2xl:flex) */}
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill bg-surface border border-border text-[11px] font-mono text-text-secondary whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Available for freelance</span>
            </div>
          </div>

          {/* Desktop Nav Links with Active State Highlighting */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface/80 border border-border/80 backdrop-blur-md p-1 rounded-pill shadow-xs shrink-0">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-accent text-white font-semibold shadow-xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated font-medium'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.isLive && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-white' : 'bg-emerald-500'
                      } animate-pulse`}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Command Palette, AI Twin, Theme Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Command Palette Button */}
            <button
              id="cmdk-nav-trigger"
              onClick={handleOpenCmdk}
              aria-label="Open Command Palette"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-input bg-surface border border-border text-xs text-text-secondary hover:text-text-primary hover:border-text-muted transition-all shadow-xs shrink-0"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] text-text-muted">
                {isMac ? '⌘K' : 'Ctrl+K'}
              </span>
            </button>

            {/* AI Twin Quick Pill */}
            <button
              onClick={handleOpenAITwin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all text-xs font-medium whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Twin</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-input bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors shadow-xs shrink-0"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-text-secondary" />
              )}
            </button>

            {/* Hamburger Toggle (Visible on screens < lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Menu"
              className="p-2 lg:hidden rounded-input bg-surface border border-border text-text-secondary hover:text-text-primary transition-colors shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Drawer Menu with Active Highlights */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-background/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 overflow-y-auto">
          <div className="space-y-4">
            <div className="px-3 py-2 rounded-lg bg-surface border border-border flex items-center gap-2 text-xs font-mono text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for freelance • Q1 2027</span>
            </div>

            <nav className="flex flex-col space-y-1.5 pt-2">
              {navLinks.map((link) => {
                const isActive = checkIsActive(link);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-card text-base font-heading transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-accent text-white font-semibold shadow-xs'
                        : 'text-text-primary hover:bg-surface-elevated font-medium'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{link.name}</span>
                      {isActive && <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">(Current)</span>}
                    </span>
                    {link.isLive && (
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-500/15 text-emerald-500'
                        }`}
                      >
                        Live
                      </span>
                    )}
                  </a>
                );
              })}
              <a
                href="/uses"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-card text-base font-heading transition-colors flex items-center justify-between ${
                  pathname === '/uses'
                    ? 'bg-accent text-white font-semibold'
                    : 'text-text-secondary hover:bg-surface-elevated font-medium'
                }`}
              >
                <span>Tech Stack (/uses)</span>
                {pathname === '/uses' && (
                  <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">(Current)</span>
                )}
              </a>
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-border mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenAITwin();
              }}
              className="w-full py-3 px-4 rounded-pill bg-accent text-white font-medium text-sm flex items-center justify-center gap-2 shadow-glow"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask My AI Twin</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenCmdk();
              }}
              className="w-full py-3 px-4 rounded-pill bg-surface border border-border text-text-primary font-medium text-sm flex items-center justify-center gap-2"
            >
              <Command className="w-4 h-4" />
              <span>Command Palette (⌘K)</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
