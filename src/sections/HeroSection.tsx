import React from 'react';
import { MonolithField } from '@/components/MonolithField';
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
    <section className="relative pt-[112px] pb-28 md:pb-36 min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden border-b border-mc-border-soft bg-mc-bg">
      {/* Full-bleed Hero Monolith Field Canvas Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <MonolithField />
      </div>

      {/* Hero Content Container - Centered Alignment */}
      <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-10 w-full text-center flex flex-col items-center pointer-events-none">
        {/* System Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-mc-surface/80 backdrop-blur-md border border-mc-border text-mc-orange font-mono text-xs mb-6 pointer-events-auto shadow-sm">
          <Cpu className="w-3.5 h-3.5" />
          <span className="tracking-widest uppercase text-[11px] font-medium">
            MC / SOFTWARE ENGINEERING STUDIO
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-medium text-mc-text-strong tracking-tight leading-[1.04] mb-6 max-w-[980px]">
          WE ENGINEER <span className="text-mc-orange">DIGITAL SYSTEMS</span> <br />
          THAT MOVE BUSINESS.
        </h1>

        {/* Highest Priority Core USP Highlight */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-mc-surface-deep/90 border border-mc-border text-mc-text-strong font-mono text-xs mb-8 pointer-events-auto shadow-lg max-w-[760px]">
          <Sparkles className="w-4 h-4 text-mc-orange shrink-0" />
          <span className="leading-normal">
            <strong>100% Custom Engineered.</strong> Never built from templates. Never assembled from pre-made themes.
          </span>
        </div>

        {/* Support Copy */}
        <p className="text-base sm:text-xl text-mc-text-body max-w-[720px] leading-relaxed mb-10 text-center">
          We design and build bespoke web applications, SaaS platforms, mobile apps, ERP/CRM systems, and automated workflow software tailored precisely to your operational requirements.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 pointer-events-auto">
          <button
            onClick={scrollToInquiry}
            className={cn(
              'h-[52px] px-8 text-sm font-sans font-medium rounded-[6px]',
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
              'h-[52px] px-8 text-sm font-sans font-medium rounded-[6px]',
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
        <div className="pt-8 border-t border-mc-border-soft/80 w-full max-w-[680px] flex flex-wrap items-center justify-center gap-6 md:gap-10 font-mono text-xs text-mc-text-tertiary pointer-events-auto">
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
    </section>
  );
};
