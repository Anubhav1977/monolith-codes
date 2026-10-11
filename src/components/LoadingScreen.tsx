import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * LoadingScreen — Premium first-load brand introduction.
 *
 * Sequence:
 *   1. Monolith mark rises into place with mechanical weight  (0 → 900ms)
 *   2. Orange edge-light sweep traces the logo edges            (600 → 1200ms)
 *   3. Wordmark reveals: MONOLITH then CODES                   (1000 → 1600ms)
 *   4. Tagline fades in                                         (1400 → 1700ms)
 *   5. Entire screen exits upward, revealing the website        (1800 → 2400ms)
 *
 * Guards:
 *   - sessionStorage prevents replay within a browser session
 *   - prefers-reduced-motion: instant reveal with a brief brand flash
 *   - Light/dark themes: uses design tokens, always reads correctly
 */

const SESSION_KEY = 'mc_intro_played';

export const LoadingScreen: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const [shouldShow, setShouldShow] = useState(() => {
    try {
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return true;
    }
  });

  const [phase, setPhase] = useState<
    'mounting' | 'logo-rise' | 'edge-light' | 'wordmark' | 'tagline' | 'exit'
  >('mounting');

  const beginExit = useCallback(() => {
    setPhase('exit');
    // Small delay then remove from DOM
    setTimeout(() => {
      setShouldShow(false);
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {}
    }, 700);
  }, []);

  useEffect(() => {
    if (!shouldShow) return;

    // Reduced motion: show the brand for a brief moment then exit
    if (shouldReduceMotion) {
      setPhase('wordmark');
      const t = setTimeout(beginExit, 800);
      return () => clearTimeout(t);
    }

    // Full animation timeline — paced for readability
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase('logo-rise'), 100));
    timers.push(setTimeout(() => setPhase('edge-light'), 900));
    timers.push(setTimeout(() => setPhase('wordmark'), 1600));
    timers.push(setTimeout(() => setPhase('tagline'), 2200));
    timers.push(setTimeout(beginExit, 3600));

    return () => timers.forEach(clearTimeout);
  }, [shouldShow, shouldReduceMotion, beginExit]);

  // Don't render at all after exit completes, or if already played
  if (!shouldShow) return null;

  const isExiting = phase === 'exit';
  const showLogo = phase !== 'mounting';
  const showEdgeLight = phase === 'edge-light' || phase === 'wordmark' || phase === 'tagline';
  const showWordmark = phase === 'wordmark' || phase === 'tagline';
  const showTagline = phase === 'tagline';

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="loading-screen"
          className="mc-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-4%' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          role="status"
          aria-label="Loading MONOLITH CODES"
          aria-live="polite"
        >
          {/* Subtle background pattern — architectural grid */}
          <div className="mc-loading-grid" aria-hidden="true" />

          {/* Central content cluster */}
          <div className="mc-loading-content">
            {/* Logo mark container */}
            <div
              className={`mc-loading-mark ${showLogo ? 'is-risen' : ''} ${showEdgeLight ? 'is-lit' : ''} ${isExiting ? 'is-exiting' : ''}`}
              aria-hidden="true"
            >
              {/* Orange edge-light sweep */}
              <div className="mc-loading-edge-light" />

              {/* The actual logo */}
              <img
                src="/assets/brand/monolith-mark.png"
                alt=""
                className="mc-loading-logo-img"
                draggable={false}
              />

              {/* Impact glow — brief flash when mark lands */}
              <div className="mc-loading-impact" />
            </div>

            {/* Wordmark */}
            <div
              className={`mc-loading-wordmark ${showWordmark ? 'is-visible' : ''} ${isExiting ? 'is-exiting' : ''}`}
            >
              <span className="mc-loading-word mc-loading-word--monolith">
                MONOLITH
              </span>
              <span className="mc-loading-word mc-loading-word--codes">
                CODES
              </span>
            </div>

            {/* Tagline */}
            <div
              className={`mc-loading-tagline ${showTagline ? 'is-visible' : ''} ${isExiting ? 'is-exiting' : ''}`}
            >
              SOFTWARE ENGINEERING STUDIO
            </div>
          </div>

          {/* Horizontal signal line — sweeps at bottom */}
          <div
            className={`mc-loading-signal ${showEdgeLight ? 'is-active' : ''}`}
            aria-hidden="true"
          />

          {/* Screen reader live text */}
          <span className="sr-only">
            {isExiting ? 'Welcome to MONOLITH CODES' : 'Loading…'}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
