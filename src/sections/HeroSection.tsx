import React from 'react';
import { MonolithField } from '@/components/MonolithField';
import { MonolithCore } from '@/components/MonolithCore';
import { ArrowUpRight, ShieldCheck, Cpu, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HeroSection: React.FC = () => {
  const scrollToInquiry = () => {
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-[92px] pb-10 md:pt-[96px] md:pb-10 min-h-[calc(100svh-72px)] flex items-center overflow-hidden border-b border-mc-border-soft bg-mc-bg">
      {/* Full-bleed Hero Monolith Field Canvas Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <MonolithField />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-6 md:px-10 w-full grid lg:grid-cols-[minmax(0,0.96fr)_minmax(400px,0.84fr)] gap-7 xl:gap-12 items-center">
        {/* Copy remains in a protected column; visual never occupies this space. */}
        <div className="hero-copy flex flex-col items-start pointer-events-none">
          {/* System Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-mc-surface/80 backdrop-blur-md border border-mc-border text-mc-orange font-mono text-xs mb-4 pointer-events-auto shadow-sm">
            <Cpu className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase text-[11px] font-medium">
              MC / SOFTWARE ENGINEERING STUDIO
            </span>
          </div>

          {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-[clamp(3.4rem,4.7vw,5.2rem)] font-sans font-medium text-mc-text-strong tracking-tight leading-[0.98] mb-4 max-w-[720px] text-balance">
            WE ENGINEER <span className="text-mc-orange">DIGITAL SYSTEMS</span>{' '}
            THAT MOVE BUSINESS.
          </h1>

          {/* Highest Priority Core USP Highlight */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-mc-surface-deep/90 border border-mc-border text-mc-text-strong font-mono text-xs mb-5 pointer-events-auto shadow-lg max-w-[620px]">
            <Sparkles className="w-4 h-4 text-mc-orange shrink-0" />
            <span className="leading-normal">
              <strong>100% Custom Engineered.</strong> Never built from templates. Never assembled from pre-made themes.
            </span>
          </div>

          {/* Support Copy */}
        <p className="text-sm sm:text-lg text-mc-text-body max-w-[620px] leading-relaxed mb-6 text-left">
            We design and build bespoke web applications, SaaS platforms, mobile apps, ERP/CRM systems, and automated workflow software tailored precisely to your operational requirements.
          </p>

          {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-[340px] sm:flex sm:w-auto sm:max-w-none sm:gap-4 mb-7 pointer-events-auto">
            <button
              onClick={scrollToInquiry}
              className={cn(
                'h-12 w-full px-2 text-[11px] sm:w-auto sm:px-8 sm:text-sm font-sans font-medium rounded-[6px] whitespace-nowrap',
                'bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight active:bg-mc-orange-dark',
                'flex items-center justify-center gap-2.5 shadow-lg shadow-mc-orange/15 transition-all duration-200 hover:-translate-y-[1px] cursor-pointer'
              )}
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToWork}
              className={cn(
                'h-12 w-full px-2 text-[11px] sm:w-auto sm:px-8 sm:text-sm font-sans font-medium rounded-[6px] whitespace-nowrap',
                'bg-mc-surface/80 backdrop-blur-md border border-mc-border text-mc-text',
                'hover:bg-mc-surface-hover hover:border-mc-border-strong',
                'flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer'
              )}
            >
              <span>View Selected Work</span>
              <span className="text-mc-text-tertiary">↗</span>
            </button>
          </div>

          {/* Trust Signals with System Green */}
        <div className="pt-5 border-t border-mc-border-soft/80 w-full max-w-[620px] flex flex-wrap items-center justify-start gap-4 md:gap-6 font-mono text-[11px] text-mc-text-tertiary pointer-events-auto">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-mc-orange" />
              <span>Zero Vendor Lock-in & Full IP Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-mc-system-green animate-pulse" />
              <span className="text-mc-text-body font-medium">Verified Active | Available for Q3/Q4 Sprints</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-center lg:justify-end lg:self-stretch lg:items-center pointer-events-auto">
          <MonolithCore />
        </div>
      </div>
    </section>
  );
};
