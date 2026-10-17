'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MacHelloLoader() {
  const [show, setShow] = useState(true);
  const [isDoneWriting, setIsDoneWriting] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const hasSeenLoader = sessionStorage.getItem('mac_hello_seen');
    if (hasSeenLoader) {
      setShow(false);
      return;
    }

    // Writing timeline (cinematic slow luxury pace):
    // 0.15s - 2.6s: Ultra-smooth cursive handwriting draw (~2.5s)
    // 2.7s: Writing completes, orange dot & subtitle glow
    // 3.6s: Silky dissolve into portfolio
    const writingTimer = setTimeout(() => {
      setIsDoneWriting(true);
    }, 2700);

    const finishTimer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('mac_hello_seen', 'true');
    }, 3600);

    // Keyboard escape to skip instantly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        setShow(false);
        sessionStorage.setItem('mac_hello_seen', 'true');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(writingTimer);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSkip = () => {
    setShow(false);
    sessionStorage.setItem('mac_hello_seen', 'true');
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="mac-hello-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.025,
            filter: 'blur(10px)',
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-[#FFFFFF] cursor-pointer overflow-hidden select-none"
          style={{ backgroundColor: '#000000' }}
        >
          {/* Pure OLED Pitch Black Vignette (Ultra Dark) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(255, 77, 0, 0.035) 0%, rgba(0, 0, 0, 0.85) 55%, #000000 100%)',
            }}
          />

          {/* Grain texture overlay for tactile Mac display feel */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-screen"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Mac "hello" Signature Stage */}
          <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-4xl">
            {/* Calligraphy Container */}
            <div className="relative flex items-center justify-center py-6 w-full">
              {/* Layer 1: Soft Ambient Atmospheric Glow behind text */}
              <div
                style={{
                  fontFamily: "'Dancing Script', 'Satisfy', cursive",
                  fontSize: 'clamp(3.8rem, 11vw, 8.5rem)',
                  lineHeight: 1.15,
                  letterSpacing: '0.01em',
                }}
                className="absolute text-white/5 blur-2xl pointer-events-none select-none transition-opacity duration-1000"
              >
                Mubasshir Ali<span className="text-[#FF4D00]">.</span>
              </div>

              {/* Layer 2: Ultra-Smooth SVG Masked Calligraphy Flow */}
              <div className="relative inline-block overflow-hidden py-3 px-4">
                {/* SVG Feathered Mask Wrapper for liquid fountain-pen ink flow */}
                <svg
                  className="w-0 h-0 absolute"
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <linearGradient id="mac-ink-feather" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                      <stop offset="85%" stopColor="#fff" stopOpacity="1" />
                      <stop offset="97%" stopColor="#fff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                    <mask id="mac-feather-mask" maskUnits="userSpaceOnUse">
                      <rect x="0" y="0" width="100%" height="100%" fill="url(#mac-ink-feather)" />
                    </mask>
                  </defs>
                </svg>

                {/* Animated cursive text with hardware-accelerated clip path & feathered soft reveal */}
                <motion.div
                  initial={{
                    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                    opacity: 0.9,
                  }}
                  animate={{
                    clipPath: 'polygon(0% 0%, 102% 0%, 102% 100%, 0% 100%)',
                    opacity: 1,
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1], // Apple fluid motion curve
                  }}
                  className="relative whitespace-nowrap"
                >
                  <span
                    style={{
                      fontFamily: "'Dancing Script', 'Satisfy', cursive",
                      fontSize: 'clamp(3.8rem, 11vw, 8.5rem)',
                      lineHeight: 1.15,
                      letterSpacing: '0.01em',
                      color: '#FFFFFF',
                      textShadow:
                        '0 0 35px rgba(255, 255, 255, 0.35), 0 0 70px rgba(255, 77, 0, 0.15)',
                    }}
                    className="font-bold tracking-normal inline-block"
                  >
                    Mubasshir Ali<span className="text-[#FF4D00]">.</span>
                  </span>
                </motion.div>

                {/* Flowing Ink Particle Tracer */}
                <motion.div
                  initial={{ left: '0%', opacity: 0, scale: 0.8 }}
                  animate={{
                    left: isDoneWriting ? '100%' : '98%',
                    opacity: isDoneWriting ? 0 : [0, 1, 1, 0.8],
                    scale: isDoneWriting ? 1.5 : 1,
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full pointer-events-none"
                  style={{
                    backgroundColor: '#FF4D00',
                    boxShadow:
                      '0 0 16px #FF4D00, 0 0 32px rgba(255, 77, 0, 0.8), 0 0 48px #ffffff',
                  }}
                />
              </div>
            </div>

            {/* Apple Mac-style Subtitle with silky fade reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isDoneWriting ? 1 : 0,
                y: isDoneWriting ? 0 : 10,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-2 flex items-center gap-2.5 text-[11px] sm:text-xs font-mono text-white/50 tracking-[0.2em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Full-Stack &amp; AI Systems Engineer</span>
            </motion.div>
          </div>

          {/* Bottom subtle indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-6 flex items-center gap-1.5 text-[11px] font-mono text-white/35"
          >
            <span>Click anywhere or press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] text-white/60 font-mono">
              ESC
            </kbd>
            <span>to skip</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
