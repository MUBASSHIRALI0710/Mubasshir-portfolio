'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Terminal, Home, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';

export default function NotFound() {
  const [logs, setLogs] = useState([
    '[INIT] Routing request to requested path...',
    '[ERROR 404] Resource pointer dereferenced null pointer.',
    '[RAG_AGENT] Knowledge graph returned 0 vector matches for this URI.',
    '[GUARDRAIL] Preserving sanity: Initiating graceful reroute protocol.',
  ]);
  const [isScanning, setIsScanning] = useState(false);

  const runDiagnostic = () => {
    setIsScanning(true);
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[DIAGNOSTIC] Scanned 15 production routes...`,
        `[RECOMMENDATION] Suggested route: / (Mubasshir's home base)`,
      ]);
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-text-primary">
      <div className="w-full max-w-xl bg-surface border border-border rounded-card p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-2 text-xs font-mono text-text-muted">system_kernel_dump.log</span>
          </div>
          <span className="text-xs font-mono text-accent font-bold">STATUS: 404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-text-primary">
            Route not found in memory.
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            The page you are looking for has either been refactored, garbage collected, or never existed in the repository.
          </p>
        </div>

        {/* Fake Terminal Logs */}
        <div className="p-4 rounded-lg bg-surface-elevated font-mono text-xs text-text-secondary space-y-1.5 border border-border">
          {logs.map((log, i) => (
            <div key={i} className={log.includes('ERROR') ? 'text-rose-500' : 'text-text-primary'}>
              {log}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-pill bg-accent text-white font-medium text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-glow flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>

          <button
            onClick={runDiagnostic}
            disabled={isScanning}
            className="px-4 py-2.5 rounded-pill bg-surface border border-border text-xs font-mono text-text-primary hover:bg-surface-elevated transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>Run Diagnostic</span>
          </button>
        </div>
      </div>
    </div>
  );
}
