import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { MonolithField } from '@/components/MonolithField';
import { MonolithPillars } from '@/components/MonolithPillars';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ── Framer Motion variants ─────────────────────────────────── */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const copyVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.10, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const visualVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay: 0.3, ease: EASE_OUT },
  },
};

export const HeroSection: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const scrollToInquiry = () => {
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  /* When reduced-motion is requested, skip the entrance animations */
  const initial = reduceMotion ? 'visible' : 'hidden';

  return (
    <section
      className="relative pt-[92px] pb-10 md:pt-[96px] md:pb-10 min-h-[calc(100svh-72px)] flex items-center overflow-hidden border-b border-mc-border-soft bg-mc-bg"
    >
      {/* Full-bleed MonolithField canvas background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <MonolithField />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-6 md:px-10 w-full grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.78fr)] gap-8 xl:gap-14 items-center">

        {/* ─── Left: Copy column ─────────────────────────────── */}
        <motion.div
          className="hero-copy flex flex-col items-start"
          variants={copyVariants}
          initial={initial}
          animate="visible"
        >
          {/* Eyebrow label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-mc-surface/80 backdrop-blur-md border border-mc-border font-mono text-[10px] tracking-[0.12em] uppercase text-mc-text-tertiary mb-6 select-none"
          >
            MONOLITH CODES&nbsp;/&nbsp;CUSTOM SOFTWARE STUDIO
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="hero-headline font-sans font-medium tracking-tight leading-[1.02] mb-5 max-w-[640px]"
          >
            <span className="text-mc-text-strong block">YOUR BUSINESS IS UNIQUE.</span>
            <span className="text-mc-orange block">YOUR SOFTWARE SHOULD BE TOO.</span>
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-mc-text-body max-w-[560px] leading-relaxed mb-8"
          >
            From professional websites to custom applications and business
            management systems, we build digital solutions around your goals,
            your workflow and your customers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 mb-8"
          >
            <button
              id="hero-cta-start"
              onClick={scrollToInquiry}
              className={cn(
                'h-11 px-5 text-sm font-sans font-medium rounded-[6px]',
                'bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight active:bg-mc-orange-dark',
                'inline-flex items-center gap-2 shadow-lg shadow-mc-orange/15',
                'transition-all duration-[160ms] ease-out hover:-translate-y-[1px] cursor-pointer'
              )}
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              id="hero-cta-work"
              onClick={scrollToWork}
              className={cn(
                'h-11 px-5 text-sm font-sans font-medium rounded-[6px]',
                'bg-mc-surface border border-mc-border text-mc-text',
                'hover:bg-mc-surface-hover hover:border-mc-border-strong',
                'inline-flex items-center gap-2 transition-all duration-[160ms] cursor-pointer'
              )}
            >
              Explore Our Work
              <ArrowUpRight className="w-4 h-4 text-mc-text-tertiary" />
            </button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 font-mono text-[11px] text-mc-text-tertiary pt-5 border-t border-mc-border-soft w-full max-w-[560px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-mc-orange opacity-70 shrink-0" />
            <span>Custom-built for your business</span>
            <span className="text-mc-border-bright mx-1">·</span>
            <span>Clear scope before development</span>
          </motion.div>
        </motion.div>

        {/* ─── Right: Pillars visual ─────────────────────────── */}
        <motion.div
          className="flex justify-center lg:justify-end lg:self-stretch lg:items-center"
          variants={visualVariants}
          initial={initial}
          animate="visible"
        >
          <MonolithPillars />
        </motion.div>

      </div>
    </section>
  );
};
