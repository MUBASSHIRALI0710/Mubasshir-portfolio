'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, Tag, Copy, Check, Share2 } from 'lucide-react';
import { Article } from '@/types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!article) return null;

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-surface border border-border rounded-card shadow-2xl overflow-hidden my-8 z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 sm:p-8 border-b border-border bg-surface-elevated/50">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-text-muted mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span>•</span>
                <span className="text-accent uppercase font-semibold">{article.category}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
                {article.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label="Close article"
              className="p-2 rounded-input bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors shrink-0 ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Article Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
            <p className="font-medium text-text-primary text-base sm:text-lg border-l-2 border-accent pl-4 italic">
              {article.summary}
            </p>

            <div className="space-y-4 whitespace-pre-wrap font-sans text-text-primary/90">
              {article.content}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-border bg-surface-elevated/40 flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">
              Written by Mubasshir Ali • Production Engineering Notes
            </span>
            <button
              onClick={copyArticleLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-input bg-surface border border-border text-xs font-mono text-text-primary hover:border-accent transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-text-secondary" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
