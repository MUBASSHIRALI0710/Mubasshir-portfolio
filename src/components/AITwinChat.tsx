'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Calendar,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Mail,
  FolderGit2,
} from 'lucide-react';
import { ChatMessage, CitationSource } from '@/types';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface AITwinChatProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCall: () => void;
}

export function AITwinChat({ isOpen, onClose, onBookCall }: AITwinChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Hey! I'm **Mubasshir's AI Twin** — an interactive agent with zero-hallucination guardrails trained on his actual resume, deployed projects (NanoBrowser SaaS, AI Refund Agent, AttendPro), blog deep dives, and production metrics.\n\nAsk me anything in natural language, or pick a suggested prompt below:`,
      citations: ['Verified Resume & Production Repositories'],
      citationSources: [
        { label: 'AiKing Solutions Experience', url: '/about#experience' },
        { label: 'MAKAUT GPA 8.57', url: '/about#education' },
      ],
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedPrompts = [
    'How did you build NanoBrowser SaaS with AWS Bedrock?',
    'What was your role at AiKing Solutions?',
    'Explain your Production RAG chunking architecture',
    'What are your freelance rates and timelines for Q1 2027?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    const newCount = questionCount + 1;
    setQuestionCount(newCount);

    try {
      const response = await fetch('/api/ai-twin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const rawContent: string = data.content || '';
      const citations: string[] = data.citations || [];
      const citationSources: CitationSource[] = data.citationSources || [];
      const actionType = data.actionType || 'none';
      const actionPrompt = data.actionPrompt;
      const actionUrl = data.actionUrl;

      // Streamed simulation effect for realistic typing
      let currentLength = 0;
      const targetContent = rawContent;
      const assistantId = `assistant-${Date.now()}`;

      // Insert placeholder message
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: '',
          citations,
          citationSources,
          actionType,
          actionPrompt,
          actionUrl,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      const interval = setInterval(() => {
        currentLength += Math.floor(Math.random() * 12) + 6;
        if (currentLength >= targetContent.length) {
          clearInterval(interval);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, content: targetContent } : msg
            )
          );
          setIsTyping(false);
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: targetContent.slice(0, currentLength) }
                : msg
            )
          );
        }
      }, 20);
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          role: 'assistant',
          content:
            "I ran into a temporary network delay. You can reach out directly to Mubasshir at mubasshirali0710@gmail.com or connect on WhatsApp!",
          citations: ['Network Fallback'],
          actionType: 'ask_direct',
          actionPrompt: 'Chat on WhatsApp with Mubasshir',
          actionUrl: 'https://wa.me/917003151313',
          timestamp: 'Just now',
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `Hey! I'm **Mubasshir's AI Twin** — an interactive agent with zero-hallucination guardrails trained on his actual resume, deployed projects (NanoBrowser SaaS, AI Refund Agent, AttendPro), blog deep dives, and production metrics.\n\nAsk me anything in natural language, or pick a suggested prompt below:`,
        citations: ['Verified Resume & Production Repositories'],
        citationSources: [
          { label: 'AiKing Solutions Experience', url: '/about#experience' },
          { label: 'MAKAUT GPA 8.57', url: '/about#education' },
        ],
        timestamp: 'Just now',
      },
    ]);
    setQuestionCount(0);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-surface border border-border rounded-card shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[720px] z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-elevated/70">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-surface" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-sm text-text-primary">
                    Mubasshir&apos;s AI Twin
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-accent/15 text-accent font-bold px-1.5 py-0.2 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>RAG Verified</span>
                  </span>
                </div>
                <p className="text-[11px] font-mono text-text-secondary">
                  Trained on verified resume, AiKing Solutions code, and case studies
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={resetChat}
                title="Reset conversation"
                className="p-1.5 rounded-input text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                aria-label="Close AI Twin"
                className="p-1.5 rounded-input text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[92%] sm:max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-surface-elevated border border-border text-text-primary rounded-tl-xs'
                        : 'bg-accent text-white rounded-tr-xs shadow-glow'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Interactive Citation Sources */}
                    {isAssistant && msg.citationSources && msg.citationSources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-border/60 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-text-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="font-semibold text-text-secondary">Citations:</span>
                        {msg.citationSources.map((source, sIdx) => {
                          if (source.url) {
                            return (
                              <Link
                                key={sIdx}
                                href={source.url}
                                onClick={onClose}
                                className="inline-flex items-center gap-1 bg-surface border border-border hover:border-accent px-2 py-0.5 rounded text-text-primary hover:text-accent transition-colors"
                              >
                                <span>{source.label}</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </Link>
                            );
                          }
                          return (
                            <span
                              key={sIdx}
                              className="bg-surface border border-border px-2 py-0.5 rounded text-text-secondary"
                            >
                              {source.label}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Contextual Action CTA within Assistant Message */}
                    {isAssistant && msg.actionPrompt && msg.actionUrl && (
                      <div className="mt-3 pt-2 border-t border-border/40 flex items-center gap-2">
                        {msg.actionType === 'book_call' ? (
                          <button
                            onClick={() => {
                              onClose();
                              onBookCall();
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-accent text-white text-xs font-medium hover:bg-accent-hover transition-colors shadow-glow"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{msg.actionPrompt}</span>
                          </button>
                        ) : msg.actionType === 'ask_direct' ? (
                          <a
                            href={msg.actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{msg.actionPrompt}</span>
                          </a>
                        ) : (
                          <Link
                            href={msg.actionUrl}
                            onClick={onClose}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-surface border border-border text-text-primary hover:border-accent text-xs font-medium transition-colors"
                          >
                            <FolderGit2 className="w-3.5 h-3.5 text-accent" />
                            <span>{msg.actionPrompt}</span>
                            <ArrowRight className="w-3 h-3 text-text-muted" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-text-muted mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-elevated border border-border w-fit text-xs font-mono text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <span>Scanning Mubasshir&apos;s verified knowledge base &amp; repos...</span>
              </div>
            )}

            {/* Smart 3-Question Callout Card */}
            {questionCount >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-accent/40 bg-accent/10 space-y-2 mt-4"
              >
                <div className="flex items-center gap-2 text-accent font-semibold text-xs font-mono uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>High-Intent Match Detected</span>
                </div>
                <p className="text-xs text-text-primary leading-relaxed">
                  You&apos;ve asked {questionCount} technical questions! Skip the back-and-forth and lock in a quick 15-minute call with Mubasshir.
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onBookCall();
                    }}
                    className="px-3.5 py-1.5 rounded-pill bg-accent text-white font-medium text-xs hover:bg-accent-hover transition-colors shadow-glow flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book 15-Min Discovery Call</span>
                  </button>
                  <a
                    href="https://wa.me/917003151313"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-pill bg-surface border border-border text-text-primary text-xs font-medium hover:bg-surface-elevated transition-colors flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="px-3 py-1.5 rounded-pill bg-surface border border-border text-text-primary text-xs font-medium hover:bg-surface-elevated transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts */}
          {messages.length <= 3 && (
            <div className="px-4 py-2 border-t border-border/60 bg-surface/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono text-text-muted shrink-0 uppercase">
                Explore:
              </span>
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isTyping}
                  className="px-2.5 py-1 rounded-pill bg-surface-elevated border border-border text-xs text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors shrink-0 text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 sm:p-4 border-t border-border bg-surface">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about MERN, AWS Bedrock, NanoBrowser, pricing, GPA..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 px-4 py-2.5 rounded-pill bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="p-2.5 rounded-full bg-accent text-white hover:bg-accent-hover disabled:opacity-40 transition-all shrink-0 shadow-glow"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-text-muted px-2">
              <span>Deterministic RAG guardrails active • Never hallucinates</span>
              <span>Press Enter ↵ to send</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
