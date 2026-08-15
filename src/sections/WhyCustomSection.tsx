import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ChevronDown, Sparkles, Shield, Zap, Code2, Database, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonRow {
  id: string;
  category: string;
  icon: React.ReactNode;
  templatePainPoint: string;
  monolithAdvantage: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: 'performance',
    category: 'Performance & Speed',
    icon: <Zap className="w-4 h-4 text-mc-orange" />,
    templatePainPoint: 'Slow 3–6s load times, heavy JS bundle bloat, poor Google Web Vitals.',
    monolithAdvantage: 'Sub-second initial paint, zero unused code, 99+ Core Web Vitals score.',
  },
  {
    id: 'security',
    category: 'Security & Maintenance',
    icon: <Shield className="w-4 h-4 text-mc-orange" />,
    templatePainPoint: 'Vulnerable to CMS plugin exploits, breaking updates, high upkeep.',
    monolithAdvantage: 'Hardened zero-plugin architecture, protected API gateway, automated CI/CD.',
  },
  {
    id: 'workflow',
    category: 'Business Workflow Fit',
    icon: <Layers className="w-4 h-4 text-mc-orange" />,
    templatePainPoint: 'Rigid pre-made forms forcing your business into fixed theme limitations.',
    monolithAdvantage: 'Bespoke UI and data workflows custom-built for your operational rules.',
  },
  {
    id: 'ownership',
    category: 'Code Ownership & Lock-in',
    icon: <Code2 className="w-4 h-4 text-mc-orange" />,
    templatePainPoint: 'Locked into third-party themes, platform limits, and recurring license fees.',
    monolithAdvantage: '100% full IP ownership, clean TypeScript codebase, zero theme fees.',
  },
  {
    id: 'scalability',
    category: 'Scalability & Longevity',
    icon: <Database className="w-4 h-4 text-mc-orange" />,
    templatePainPoint: 'Degrades under high database record volume and heavy user traffic.',
    monolithAdvantage: 'Cloud-native infrastructure engineered for high concurrency & enterprise growth.',
  },
];

const DONT_BUILD_WITH = [
  'WordPress & Page Builders',
  'Pre-Made Marketplace Themes',
  'Wix / Squarespace Builders',
  'Bloated Plugin Ecosystems',
];

export const WhyCustomSection: React.FC = () => {
  return (
    <section id="why-custom" className="py-24 border-b border-mc-border bg-mc-bg">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16"
        >
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>02 / WHY CUSTOM ENGINEERING</span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-mc-text-strong tracking-tight mb-4">
              WHY BUSINESSES CHOOSE CUSTOM ENGINEERING
            </h2>
            <p className="text-mc-text-body text-base md:text-lg max-w-3xl leading-relaxed">
              Every solution is custom engineered for your business. Never built from templates. Never assembled from pre-made themes. We educate buyers on why ground-up engineering delivers superior speed, security, and long-term business value.
            </p>
          </div>
        </motion.div>

        {/* What We DON'T Build With Panel */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-16 p-6 sm:p-8 rounded-xl border border-mc-border bg-mc-surface-deep/80 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-mc-orange uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>OUR ARCHITECTURAL COMMITMENT</span>
          </div>
          <h3 className="text-xl md:text-2xl font-sans font-medium text-mc-text-strong mb-4">
            What We <span className="text-mc-orange">DON'T</span> Build With:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {DONT_BUILD_WITH.map((item, idx) => (
              <div
                key={idx}
                className="group p-3.5 rounded-lg bg-mc-surface border border-mc-border-soft hover:border-red-500/40 transition-all flex items-center gap-3 text-xs font-sans font-medium text-mc-text-body"
              >
                <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 transition-transform group-hover:scale-110" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Matrix Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-xl border border-mc-border bg-mc-surface overflow-hidden shadow-xl"
        >
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-mc-surface-deep border-b border-mc-border font-mono text-xs uppercase">
            <div className="col-span-3 text-mc-text-secondary">Pillar</div>
            <div className="col-span-4 text-red-400/90 flex items-center gap-1.5 font-semibold">
              <XCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Off-the-shelf Templates</span>
            </div>
            <div className="col-span-5 text-emerald-400 flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>MONOLITH Custom Engineering</span>
            </div>
          </div>

          {/* Table Content (Mobile & Desktop) */}
          <div className="divide-y divide-mc-border">
            {COMPARISON_ROWS.map((row) => (
              <React.Fragment key={row.id}>
                {/* Mobile View: Visual Dual-Comparison Cards */}
                <div className="p-4 sm:p-5 flex flex-col gap-3 md:hidden">
                  {/* Pillar Category Header */}
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-mc-surface-deep border border-mc-border shrink-0">
                      {row.icon}
                    </div>
                    <span className="font-sans font-semibold text-sm text-mc-text-strong">
                      {row.category}
                    </span>
                  </div>

                  {/* Dual Comparison Boxes */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {/* Template Pain Point Box */}
                    <div className="p-3 rounded-lg bg-red-500/[0.04] border border-red-500/20 text-xs font-sans">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-red-400 mb-1.5 font-semibold">
                        <XCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Off-the-shelf Templates</span>
                      </div>
                      <p className="text-mc-text-body leading-normal">{row.templatePainPoint}</p>
                    </div>

                    {/* Monolith Advantage Box */}
                    <div className="p-3 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/30 text-xs font-sans">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1.5 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>MONOLITH Custom Engineering</span>
                      </div>
                      <p className="text-mc-text-strong font-medium leading-normal">{row.monolithAdvantage}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop View: Grid Row */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-5 items-center transition-colors hover:bg-mc-surface-hover/40">
                  {/* Category Title */}
                  <div className="col-span-3 flex items-center gap-2.5">
                    <div className="p-2 rounded bg-mc-surface-deep border border-mc-border shrink-0">
                      {row.icon}
                    </div>
                    <span className="font-sans font-medium text-sm lg:text-base text-mc-text-strong">
                      {row.category}
                    </span>
                  </div>

                  {/* Template Pain Point */}
                  <div className="col-span-4 text-xs lg:text-sm font-sans text-mc-text-secondary flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400/90 shrink-0 mt-0.5" />
                    <span>{row.templatePainPoint}</span>
                  </div>

                  {/* Monolith Advantage */}
                  <div className="col-span-5 text-xs lg:text-sm font-sans text-mc-text-strong font-medium flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{row.monolithAdvantage}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
