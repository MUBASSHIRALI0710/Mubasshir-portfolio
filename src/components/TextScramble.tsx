'use client';

import React, { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number; // interval tick in ms
  step?: number;  // fraction of character unlocked per tick
  delay?: number; // initial delay before scramble starts in ms
}

const GLYPHS = '01#$_/\\<>[]{}*~+=!?';

export function TextScramble({
  text,
  className = '',
  speed = 55,
  step = 0.35,
  delay = 250,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;
    const maxIterations = text.length;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(() =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('')
        );

        if (iteration >= maxIterations) {
          clearInterval(interval);
        }

        iteration += step;
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, step, delay]);

  return <span className={className}>{displayText}</span>;
}
