import React from 'react';
import { MonolithField } from '@/components/MonolithField';
import { ArrowUpRight, ShieldCheck, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HeroSection: React.FC = () => {
  const scrollToInquiry = () => {
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-[96px] pb-16 md:py-24 min-h-[calc(100vh-72px)] flex items-center overflow-hidden border-b border-mc-border-soft">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* System Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-mc-surface border border-mc-border text-mc-orange font-mono text-xs mb-6 w-fit">
              <Cpu className="w-3.5 h-3.5" />
              <span className="tracking-widest uppercase text-[11px]">
                MC / SOFTWARE ENGINEERING STUDIO
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium text-mc-text-strong tracking-tight leading-[1.02] mb-6">
              WE ENGINEER <br />
              <span className="text-mc-orange">DIGITAL SYSTEMS</span> <br />
              THAT MOVE BUSINESS.
            </h1>

            {/* Support Copy (max width ~580px) */}
            <p className="text-base sm:text-lg text-mc-text-body max-w-[580px] leading-relaxed mb-8">
              We design and build custom web applications, SaaS platforms, mobile apps, ERP/CRM systems, and automated workflow software for companies that require production-grade engineering.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={scrollToInquiry}
                className={cn(
                  'h-[48px] px-6 text-sm font-sans font-medium rounded-[6px]',
                  'bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight active:bg-mc-orange-dark',
                  'flex items-center gap-2.5 shadow-md transition-all duration-160 hover:-translate-y-[1px]'
                )}
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToWork}
                className={cn(
                  'h-[48px] px-6 text-sm font-sans font-medium rounded-[6px]',
                  'bg-mc-surface border border-mc-border text-mc-text',
                  'hover:bg-mc-surface-hover hover:border-mc-border-strong',
                  'flex items-center gap-2 transition-all duration-160'
                )}
              >
                <span>View Selected Work</span>
                <span className="text-mc-text-tertiary">↗</span>
              </button>
            </div>

            {/* Trust Signals */}
            <div className="pt-6 border-t border-mc-border-soft flex flex-wrap items-center gap-6 font-mono text-xs text-mc-text-tertiary">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-mc-orange" />
                <span>100% Production-Grade React Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-mc-orange animate-pulse" />
                <span>Available for Q3/Q4 Projects</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Monolith Field Canvas */}
          <div className="lg:col-span-6 h-[400px] sm:h-[480px] lg:h-[560px] w-full">
            <MonolithField />
          </div>
        </div>
      </div>
    </section>
  );
};
