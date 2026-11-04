import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle, Shield, Zap, Code2, Database, Layers } from 'lucide-react';
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

const SPANS = ['lg:col-span-5', 'lg:col-span-7', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'];

export const WhyCustomSection: React.FC = () => (
  <section id="why-custom" className="py-28 border-b border-mc-border bg-mc-bg">
    <div className="max-w-275 mx-auto px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-16"
      >
        <h2 className="vt-title">Why choose <em>custom</em> engineering?</h2>
        <p className="mt-5 text-mc-text-secondary max-w-xl mx-auto leading-relaxed">
          Every solution is custom engineered for your business. Never built from templates. Never assembled from pre-made themes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {COMPARISON_ROWS.map((row, i) => (
          <motion.article
            key={row.id}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn('vt-glow vt-bento', SPANS[i])}
          >
            <div className="vt-bento__orb">{row.icon}</div>
            <h3>{row.category}</h3>
            <p className="vt-bento__win">{row.monolithAdvantage}</p>
            <p className="vt-bento__lose"><XCircle className="w-3.5 h-3.5" /> Templates: {row.templatePainPoint}</p>
          </motion.article>
        ))}
      </div>

      <div className="vt-dont">
        <span>What we <b>don't</b> build with</span>
        {DONT_BUILD_WITH.map((item) => <i key={item}><XCircle className="w-3.5 h-3.5" />{item}</i>)}
      </div>
    </div>
  </section>
);
