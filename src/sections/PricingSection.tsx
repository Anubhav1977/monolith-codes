import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Sparkles, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  sprintTimeline: string;
  retainerTimeline: string;
  idealFor: string;
  features: string[];
  expandableDetails: string;
  ctaText: string;
  featured?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'launch',
    name: 'Launch',
    tagline: 'High-conversion, bespoke web frontends & digital product foundations.',
    sprintTimeline: '2 – 4 Weeks Scope',
    retainerTimeline: 'Dedicated Sprint Cell',
    idealFor: 'Businesses replacing slow templates with production-grade web experiences.',
    features: [
      '100% Custom React 19 & Tailwind v4 architecture',
      'Sub-second initial paint & 99+ Core Web Vitals score',
      'Headless CMS or static data integration',
      'Full responsive design & dark/light theme support',
      '100% IP ownership & Git repository handoff',
    ],
    expandableDetails: 'Includes complete UX architecture, custom component library, SEO optimization, and sub-second performance tuning for high-converting marketing sites.',
    ctaText: 'Start Launch Project',
    featured: false,
  },
  {
    id: 'grow',
    name: 'Grow',
    badge: 'MOST POPULAR',
    tagline: 'Custom web applications, multi-tenant SaaS platforms & customer portals.',
    sprintTimeline: '6 - 10 Weeks Scope',
    retainerTimeline: 'Embedded Senior Team',
    idealFor: 'Founders & growing companies building scalable custom software platforms.',
    features: [
      'Everything in Launch plus full-stack backend API',
      'Multi-role auth, RBAC & audit-logged workflows',
      'Real-time WebSocket telemetry & analytics dashboards',
      'Stripe subscription & automated billing engine',
      'AWS / Cloudflare CI/CD automated deployment',
      '30-day post-launch hypercare & bug guarantee',
    ],
    expandableDetails: 'Designed for production applications handling live user accounts, subscription billing, real-time telemetry dashboards, and multi-tenant data security.',
    ctaText: 'Start Grow Platform',
    featured: true,
  },
  {
    id: 'build',
    name: 'Build',
    tagline: 'Enterprise ERP/CRM systems, AI agent pipelines & studio cell teams.',
    sprintTimeline: '10 - 16+ Weeks Scope',
    retainerTimeline: 'Quarterly Dedicated Studio',
    idealFor: 'Established enterprises requiring complex operational systems or dedicated sprint cells.',
    features: [
      'Bespoke ERP, CRM & inventory management engines',
      'Custom REST/GraphQL API bridges & legacy SAP/Oracle sync',
      'Pragmatic AI / LLM workflow & RAG document triage',
      'Dedicated Senior React/Node studio engineering cell',
      'Custom SLA, infrastructure hardening & security audit',
    ],
    expandableDetails: 'Bespoke enterprise engineering cell tailored to complex operational workflows, high-concurrency database queries, and legacy database migration.',
    ctaText: 'Inquire for Enterprise Build',
    featured: false,
  },
];

export const PricingSection: React.FC = () => {
  const [modelType, setModelType] = useState<'sprint' | 'retainer'>('sprint');
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  const scrollToInquiry = () => {
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleDetails = (id: string) => {
    setExpandedTier(expandedTier === id ? null : id);
  };

  return (
    <section id="pricing" className="py-24 border-b border-mc-border bg-mc-bg relative">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12"
        >
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>07 / PRICING & TIERS</span>
          </div>

          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-sans font-medium text-mc-text-strong tracking-tight mb-2">
                TRANSPARENT ENGAGEMENT TIERS
              </h2>
              <p className="text-mc-text-body text-base md:text-lg max-w-xl">
                Bespoke engineering structured for predictability. No hidden fees, no recurring theme licenses, 100% full IP handoff.
              </p>
            </div>

            {/* Sprint vs Retainer Switcher Toggle */}
            <div className="inline-flex p-1 rounded-lg bg-mc-surface border border-mc-border shrink-0 self-start md:self-auto">
              <button
                onClick={() => setModelType('sprint')}
                className={cn(
                  'px-4 py-2 text-xs font-mono rounded-md transition-all cursor-pointer',
                  modelType === 'sprint'
                    ? 'bg-mc-orange text-mc-bg font-semibold shadow-md'
                    : 'text-mc-text-secondary hover:text-mc-text'
                )}
              >
                Fixed Project Sprint
              </button>

              <button
                onClick={() => setModelType('retainer')}
                className={cn(
                  'px-4 py-2 text-xs font-mono rounded-md transition-all cursor-pointer',
                  modelType === 'retainer'
                    ? 'bg-mc-orange text-mc-bg font-semibold shadow-md'
                    : 'text-mc-text-secondary hover:text-mc-text'
                )}
              >
                Studio Retainer Cell
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3-Column Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {PRICING_TIERS.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={cn(
                'rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative',
                tier.featured
                  ? 'bg-mc-surface border-2 border-mc-orange shadow-2xl shadow-mc-orange/15'
                  : 'bg-mc-surface-deep/80 border border-mc-border hover:border-mc-border-strong'
              )}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-mc-orange text-mc-bg font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong">
                    {tier.name}
                  </h3>
                  <span className="px-3 py-1 rounded-md bg-mc-surface-deep border border-mc-border font-mono text-xs text-mc-text-secondary">
                    {modelType === 'sprint' ? tier.sprintTimeline : tier.retainerTimeline}
                  </span>
                </div>

                <p className="text-sm font-sans text-mc-text-body leading-relaxed mb-6">
                  {tier.tagline}
                </p>

                {/* Target Context Box */}
                <div className="p-4 rounded-lg bg-mc-surface-deep border border-mc-border-soft text-xs font-sans text-mc-text-body mb-6">
                  <span className="font-mono text-mc-orange uppercase block mb-1 font-semibold">IDEAL FOR:</span>
                  {tier.idealFor}
                </div>

                {/* Included Deliverables Checklist */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-mono text-xs text-mc-text-secondary uppercase tracking-wider">
                    INCLUDED DELIVERABLES:
                  </h4>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs font-sans text-mc-text">
                      <CheckCircle2
                        className={cn(
                          'w-4 h-4 shrink-0 mt-0.5',
                          tier.featured ? 'text-mc-orange' : 'text-mc-system-green'
                        )}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Expandable Technical Details Button */}
                <button
                  onClick={() => toggleDetails(tier.id)}
                  className="w-full text-left py-2 font-mono text-xs text-mc-orange hover:underline flex items-center justify-between mb-6 cursor-pointer"
                >
                  <span>{expandedTier === tier.id ? 'Hide Scope Specs' : 'View Scope Specs'}</span>
                  <ChevronDown
                    className={cn('w-3.5 h-3.5 transition-transform duration-200', expandedTier === tier.id && 'rotate-180')}
                  />
                </button>

                <AnimatePresence>
                  {expandedTier === tier.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3.5 rounded bg-mc-surface-deep border border-mc-border-soft text-xs font-sans text-mc-text-body leading-relaxed mb-6"
                    >
                      {tier.expandableDetails}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action CTA Button */}
              <button
                onClick={scrollToInquiry}
                className={cn(
                  'w-full h-12 rounded-lg text-sm font-sans font-medium',
                  'flex items-center justify-center gap-2 transition-all cursor-pointer',
                  tier.featured
                    ? 'bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight shadow-lg shadow-mc-orange/20'
                    : 'bg-mc-surface border border-mc-border text-mc-text hover:border-mc-border-strong hover:text-mc-orange'
                )}
              >
                <span>{tier.ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Studio Guarantees Rail */}
        <div className="p-6 rounded-xl border border-mc-border bg-mc-surface-deep flex flex-wrap items-center justify-between gap-6 font-mono text-xs text-mc-text-secondary shadow-lg">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4.5 h-4.5 text-mc-orange shrink-0" />
            <span>100% Source Code & IP Handoff</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Zap className="w-4.5 h-4.5 text-mc-orange shrink-0" />
            <span>Zero Recurring Theme/Plugin Fees</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4.5 h-4.5 text-mc-orange shrink-0" />
            <span>30-Day Post-Launch Hypercare</span>
          </div>
        </div>
      </div>
    </section>
  );
};
