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
  expandedDetail: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: 'performance',
    category: 'Performance & Speed',
    icon: <Zap className="w-4 h-4 text-mc-orange" />,
    templatePainPoint: 'Heavy plugin bloat, slow 3–6s page loads, poor Core Web Vitals, low Google rankings.',
    monolithAdvantage: 'Sub-second initial paint, zero unnecessary JS bloat, 99+ Core Web Vitals score.',
    expandedDetail: 'Template systems bundle hundreds of unneeded CSS/JS libraries for features you never use. We hand-craft clean React & Tailwind architecture so every byte serves your user.',
  },
  {
    id: 'security',
    category: 'Security & Maintenance',
    icon: <Shield className="w-4 h-4 text-mc-orange" />,
    templatePainPoint: 'Constant plugin updates breaking layouts, vulnerable to known CMS exploits.',
    monolithAdvantage: 'Zero third-party plugin vulnerability, hardened API gateway, automated CI/CD.',
    expandedDetail: 'Over 90% of web hacks exploit outdated third-party plugins. Monolith software is built from first principles with zero plugin dependencies to keep your business safe.',
  },
  {
    id: 'workflow',
    category: 'Business Workflow Fit',
    icon: <Layers className="w-4 h-4 text-mc-orange" />,
    templatePainPoint: 'Forcing your business processes to fit into rigid, pre-made template forms & fields.',
    monolithAdvantage: 'Bespoke UI & data architecture custom engineered around your exact operational rules.',
    expandedDetail: 'Your software should adapt to your business, not the other way around. We build tailored dashboards, order flows, and customer portals matching your specific operations.',
  },
  {
    id: 'ownership',
    category: 'Code Ownership & Lock-in',
    icon: <Code2 className="w-4 h-4 text-mc-orange" />,
    templatePainPoint: 'Dependent on theme developers, recurring plugin licensing, and platform lock-in.',
    monolithAdvantage: '100% full IP ownership, clean typescript source code, zero ongoing theme fees.',
    expandedDetail: 'You own every line of code we write. No hidden licensing subscriptions, no proprietary lock-in—just clean, well-documented repository handoff.',
  },
  {
    id: 'scalability',
    category: 'Scalability & Longevity',
    icon: <Database className="w-4 h-4 text-mc-orange" />,
    templatePainPoint: 'Slows down under heavy user concurrency or large database record volume.',
    monolithAdvantage: 'Enterprise cloud scale, handles high concurrency, sub-millisecond database queries.',
    expandedDetail: 'Built with production-grade React, Node/Python backends, and optimized database indexing designed to seamlessly scale as your business grows.',
  },
];

const DONT_BUILD_WITH = [
  'WordPress themes & heavy page builders',
  'Purchased website templates from marketplaces',
  'Shopify themes with 20+ app dependencies',
  'Drag-and-drop website tools (Wix/Squarespace)',
  'Cookie-cutter agency template workflows',
  'Bloated third-party plugin ecosystems',
];

export const WhyCustomSection: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(COMPARISON_ROWS[0].id);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DONT_BUILD_WITH.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-mc-surface border border-mc-border-soft flex items-center gap-3 text-xs font-sans text-mc-text-body"
              >
                <XCircle className="w-4 h-4 text-mc-text-tertiary shrink-0" />
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
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-mc-surface-deep border-b border-mc-border font-mono text-xs text-mc-text-secondary uppercase">
            <div className="col-span-3">Pillar</div>
            <div className="col-span-4 text-mc-text-tertiary">Off-the-shelf Templates</div>
            <div className="col-span-5 text-mc-system-green flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>MONOLITH Custom Engineering</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-mc-border">
            {COMPARISON_ROWS.map((row) => {
              const isExpanded = expandedRow === row.id;
              return (
                <div key={row.id} className="transition-colors hover:bg-mc-surface-hover/50">
                  <div
                    onClick={() => toggleRow(row.id)}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center cursor-pointer select-none"
                  >
                    {/* Category Title */}
                    <div className="md:col-span-3 flex items-center justify-between md:justify-start gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded bg-mc-surface-deep border border-mc-border shrink-0">
                          {row.icon}
                        </div>
                        <span className="font-sans font-medium text-sm md:text-base text-mc-text-strong">
                          {row.category}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 text-mc-text-tertiary transition-transform duration-200 md:hidden',
                          isExpanded && 'rotate-180 text-mc-orange'
                        )}
                      />
                    </div>

                    {/* Template Pain Point */}
                    <div className="md:col-span-4 text-xs md:text-sm font-sans text-mc-text-secondary flex items-start gap-2">
                      <span className="font-mono text-[10px] uppercase text-mc-text-tertiary md:hidden shrink-0 mt-0.5">Template:</span>
                      <span>{row.templatePainPoint}</span>
                    </div>

                    {/* Monolith Advantage */}
                    <div className="md:col-span-5 text-xs md:text-sm font-sans text-mc-text-strong font-medium flex items-start gap-2 justify-between">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-mc-system-green shrink-0 mt-0.5" />
                        <span>{row.monolithAdvantage}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 text-mc-text-tertiary transition-transform duration-200 hidden md:block shrink-0 mt-1',
                          isExpanded && 'rotate-180 text-mc-orange'
                        )}
                      />
                    </div>
                  </div>

                  {/* Expanded Architectural Rationale */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 md:pl-[calc(25%+1rem)] bg-mc-surface-deep/40 border-t border-mc-border-soft animate-in fade-in duration-160">
                      <div className="p-4 rounded-lg bg-mc-surface-deep border border-mc-border-soft text-xs md:text-sm font-sans text-mc-text-body leading-relaxed flex items-start gap-3">
                        <Sparkles className="w-4 h-4 text-mc-orange shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-mono text-xs text-mc-orange block mb-1 uppercase">ENGINEERING ADVANTAGE:</strong>
                          {row.expandedDetail}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
