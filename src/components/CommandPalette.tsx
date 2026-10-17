'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Bot,
  FileDown,
  Mail,
  Sparkles,
  ArrowRight,
  Code2,
  FolderGit2,
  BookOpen,
  Compass,
  Check,
  Copy,
  MessageCircle,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { PROJECTS, SERVICES, PERSONAL_INFO } from '@/data/portfolioData';
import { BLOG_POSTS } from '@/data/blogData';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Actions' | 'Projects' | 'Blog' | 'Services' | 'Navigation';
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  keywords: string[];
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAITwin: () => void;
  onSelectProject?: (projectId: string) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenAITwin,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      // Check for either ID (e.g. brief or reverse-brief)
      let el = document.getElementById(id);
      if (!el && id === 'brief') el = document.getElementById('reverse-brief');
      if (!el && id === 'reverse-brief') el = document.getElementById('brief');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `/#${id}`;
      }
    }, 150);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const downloadResume = () => {
    onClose();
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf';
    link.setAttribute('download', 'Mubasshir_Ali_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const items: CommandItem[] = useMemo(() => {
    return [
      // Quick Actions
      {
        id: 'action-call',
        title: 'Book a 15-Min Discovery Call',
        subtitle: 'Reserve a technical consultation directly on Calendly',
        category: 'Actions',
        icon: Calendar,
        badge: 'High Intent',
        keywords: ['book', 'call', 'calendar', 'calendly', 'hire', 'consultation', 'talk', 'schedule'],
        action: () => {
          onClose();
          window.open(PERSONAL_INFO.calendly, '_blank');
        },
      },
      {
        id: 'action-ai-twin',
        title: "Ask Mubasshir's AI Twin",
        subtitle: 'Interactive RAG chatbot trained on resume, code & pricing',
        category: 'Actions',
        icon: Bot,
        badge: 'AI Assistant',
        keywords: ['ai', 'twin', 'chat', 'ask', 'bot', 'rag', 'agent', 'conversational', 'llm'],
        action: () => {
          onClose();
          onOpenAITwin();
        },
      },
      {
        id: 'action-whatsapp',
        title: 'Chat Directly on WhatsApp',
        subtitle: '+91 70031 51313 • Quickest response (within 2–4 hours)',
        category: 'Actions',
        icon: MessageCircle,
        badge: 'Instant',
        keywords: ['whatsapp', 'chat', 'message', 'direct', 'phone', 'quick', 'contact'],
        action: () => {
          onClose();
          window.open('https://wa.me/917003151313', '_blank');
        },
      },
      {
        id: 'action-github',
        title: 'View GitHub Profile & Repositories',
        subtitle: 'github.com/MUBASSHIRALI0710 • Production SaaS & Agent Code',
        category: 'Actions',
        icon: GithubIcon,
        badge: 'Open Source',
        keywords: ['github', 'git', 'repo', 'code', 'open source', 'repositories', 'commit'],
        action: () => {
          onClose();
          window.open(PERSONAL_INFO.github, '_blank');
        },
      },
      {
        id: 'action-resume',
        title: 'Download Technical Resume (PDF)',
        subtitle: 'MAKAUT CSE (GPA 8.57/10), AiKing Solutions, 200+ LeetCode DSA',
        category: 'Actions',
        icon: FileDown,
        badge: 'Verified',
        keywords: ['resume', 'cv', 'pdf', 'download', 'education', 'gpa', 'credentials', 'experience'],
        action: downloadResume,
      },
      {
        id: 'action-reverse-brief',
        title: 'Launch Reverse Brief Consultation',
        subtitle: 'Select scope, timeline & budget to get custom roadmap',
        category: 'Actions',
        icon: Sparkles,
        badge: '60s Estimator',
        keywords: ['brief', 'reverse brief', 'quote', 'estimate', 'cost', 'roadmap', 'proposal', 'scope'],
        action: () => scrollToSection('brief'),
      },
      {
        id: 'action-email',
        title: copiedEmail ? 'Email Copied to Clipboard!' : 'Copy Email Address',
        subtitle: PERSONAL_INFO.email,
        category: 'Actions',
        icon: copiedEmail ? Check : Copy,
        keywords: ['email', 'copy', 'mail', 'inquiry', 'reach out'],
        action: copyEmail,
      },

      // Projects / Case Studies
      ...PROJECTS.map((project) => ({
        id: `project-${project.id}`,
        title: project.title,
        subtitle: project.tagline,
        category: 'Projects' as const,
        icon: FolderGit2,
        badge: project.badge || 'Case Study',
        keywords: [
          'project',
          'projects',
          'case study',
          project.title.toLowerCase(),
          ...project.stack.map((s) => s.toLowerCase()),
          project.category,
        ],
        action: () => {
          onClose();
          if (onSelectProject) {
            onSelectProject(project.id);
          } else {
            window.location.href = `/projects/${project.id}`;
          }
        },
      })),

      // Blog & Technical Deep Dives
      ...BLOG_POSTS.map((post) => ({
        id: `blog-${post.slug}`,
        title: post.title,
        subtitle: `${post.readTime} • ${post.category}`,
        category: 'Blog' as const,
        icon: BookOpen,
        badge: post.category,
        keywords: [
          'blog',
          'article',
          'post',
          'writing',
          'deep dive',
          post.title.toLowerCase(),
          ...post.tags.map((t) => t.toLowerCase()),
        ],
        action: () => {
          onClose();
          window.location.href = `/blog/${post.slug}`;
        },
      })),

      // Services
      ...SERVICES.map((service) => ({
        id: `service-${service.id}`,
        title: service.title,
        subtitle: `${service.timeframe} • ${service.pricingSignal}`,
        category: 'Services' as const,
        icon: Code2,
        badge: service.badge,
        keywords: [
          'service',
          'services',
          'pricing',
          'cost',
          'hire',
          'rate',
          service.title.toLowerCase(),
        ],
        action: () => scrollToSection('services'),
      })),

      // Navigation Links
      {
        id: 'nav-work',
        title: 'Selected Work & Case Studies',
        subtitle: 'Detailed architectural breakdowns & metrics',
        category: 'Navigation',
        icon: FolderGit2,
        keywords: ['work', 'projects', 'portfolio', 'case studies', 'nav'],
        action: () => scrollToSection('work'),
      },
      {
        id: 'nav-about',
        title: 'About Mubasshir Ali',
        subtitle: 'Education, AiKing Solutions experience & backstory',
        category: 'Navigation',
        icon: Compass,
        keywords: ['about', 'bio', 'who', 'story', 'journey', 'makaut', 'experience'],
        action: () => {
          onClose();
          window.location.href = '/about';
        },
      },
      {
        id: 'nav-blog',
        title: 'Engineering Blog & Technical Guides',
        subtitle: 'Articles on Production RAG, Multi-Tenancy & Clinical ML',
        category: 'Navigation',
        icon: BookOpen,
        keywords: ['blog', 'articles', 'writing', 'posts', 'guides'],
        action: () => {
          onClose();
          window.location.href = '/blog';
        },
      },
      {
        id: 'nav-uses',
        title: 'Tech Stack & Hardware (/uses)',
        subtitle: 'Tools, IDE extensions, hardware & production software',
        category: 'Navigation',
        icon: Laptop,
        keywords: ['uses', 'hardware', 'setup', 'tools', 'software', 'editor', 'vscode'],
        action: () => {
          onClose();
          window.location.href = '/uses';
        },
      },
      {
        id: 'nav-now',
        title: 'What I am Doing Now (/now)',
        subtitle: 'Live Derek Sivers recency signal: current builds, books & availability',
        category: 'Navigation',
        icon: Compass,
        badge: 'Live',
        keywords: ['now', 'doing', 'current', 'reading', 'learning', 'recency', 'active', 'freelance slots'],
        action: () => {
          onClose();
          window.location.href = '/now';
        },
      },
      {
        id: 'nav-contact',
        title: 'Contact & Project Inquiry Form',
        subtitle: 'Direct email or project discovery form (24h response guarantee)',
        category: 'Navigation',
        icon: Mail,
        keywords: ['contact', 'form', 'inquiry', 'message', 'touch'],
        action: () => {
          onClose();
          window.location.href = '/contact';
        },
      },
    ];
  }, [copiedEmail, onOpenAITwin, onSelectProject]);

  const categories = ['All', 'Actions', 'Projects', 'Blog', 'Services', 'Navigation'];

  const filteredItems = useMemo(() => {
    let result = items;

    // Filter by active category tab if selected
    if (selectedCategory !== 'All') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (!query.trim()) return result;

    const q = query.toLowerCase().trim();
    return result.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.some((kw) => kw.includes(q))
    );
  }, [items, query, selectedCategory]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setSelectedCategory('All');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          const btn = document.getElementById('cmdk-nav-trigger');
          if (btn) btn.click();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Raycast / Linear style Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-surface border border-border rounded-card shadow-2xl overflow-hidden flex flex-col max-h-[82vh] z-10"
          >
            {/* Search Input Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-border gap-3 bg-surface">
              <Search className="w-5 h-5 text-accent shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command, project, or topic... (e.g. projects, ai, blog, resume)"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-text-primary placeholder:text-text-secondary/50 text-sm sm:text-base focus:outline-none"
              />
              <button
                onClick={onClose}
                className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded border border-border text-text-secondary bg-surface-elevated hover:text-text-primary transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Quick Filter Category Pills */}
            <div className="px-4 py-2 border-b border-border/60 bg-surface-elevated/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedIndex(0);
                  }}
                  className={`px-2.5 py-1 rounded-pill text-[11px] font-mono transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-accent text-white font-semibold shadow-xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-2 divide-y divide-border/30 max-h-[52vh]">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-text-secondary text-sm">
                  <p>No matching commands found for &ldquo;{query}&rdquo;</p>
                  <p className="mt-1 text-xs text-text-muted">
                    Try searching for &ldquo;projects&rdquo;, &ldquo;ai&rdquo;, &ldquo;resume&rdquo;, &ldquo;blog&rdquo; or &ldquo;call&rdquo;
                  </p>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left transition-colors duration-150 group ${
                        isSelected
                          ? 'bg-accent/10 border border-accent/30 text-text-primary'
                          : 'hover:bg-surface-elevated text-text-primary border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 pr-2">
                        <div
                          className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-accent text-white'
                              : 'bg-surface-elevated text-text-secondary group-hover:text-text-primary'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-xs sm:text-sm text-text-primary truncate">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-mono uppercase tracking-wide px-1.5 py-0.2 rounded-full bg-accent/15 text-accent font-semibold shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <p className="text-[11px] text-text-secondary truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-text-muted hidden sm:inline">
                          {item.category}
                        </span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 text-text-muted transition-transform ${
                            isSelected ? 'text-accent translate-x-0.5' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="px-4 py-2.5 bg-surface-elevated border-t border-border flex items-center justify-between text-[11px] text-text-secondary font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border">↵</kbd>
                  Select
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border">ESC</kbd>
                  Close
                </span>
              </div>
              <span className="text-text-muted text-[10px]">Linear / Raycast Experience</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
