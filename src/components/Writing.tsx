'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { ARTICLES } from '@/data/portfolioData';
import { Article } from '@/types';
import { ArticleModal } from '@/components/ArticleModal';

export function Writing() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <section id="writing" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Engineering Notes &amp; Deep Dives
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-text-primary tracking-tight">
            How I think about systems.
          </h2>
        </div>
        <p className="text-sm sm:text-base text-text-secondary max-w-md">
          Field notes on production RAG, multi-tenant databases, and latency optimization.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ARTICLES.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => setActiveArticle(article)}
            className="group cursor-pointer bg-surface border border-border rounded-card p-6 sm:p-8 flex flex-col justify-between hover:border-accent/40 hover:shadow-subtle transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-4">
                <span className="text-accent uppercase font-semibold">{article.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-xl font-bold font-heading text-text-primary group-hover:text-accent transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs font-mono font-semibold text-text-secondary group-hover:text-accent transition-colors">
              <span>Read Deep Dive</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Article Reader Modal */}
      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
    </section>
  );
}
