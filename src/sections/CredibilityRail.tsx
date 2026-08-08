import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

type EvidenceKind = 'reliability' | 'response' | 'accessibility' | 'communication';

interface MetricItem { index: string; label: string; description: string; kind: EvidenceKind; }

const METRICS: MetricItem[] = [
  { index: '01', label: 'Reliability', description: 'Built to keep your business running, even under heavy use.', kind: 'reliability' },
  { index: '02', label: 'Fast Response', description: 'Fast websites and software that respond without making people wait.', kind: 'response' },
  { index: '03', label: 'Accessibility', description: 'Clear, usable experiences for more of your customers and team.', kind: 'accessibility' },
  { index: '04', label: 'Direct Communication', description: 'Talk directly with the engineer building your system—without extra layers.', kind: 'communication' },
];

const EvidenceArtifact: React.FC<{ kind: EvidenceKind }> = ({ kind }) => {
  if (kind === 'reliability') return <div className="cred-artifact cred-artifact--reliability"><div className="cred-artifact__meta"><span>99.99%</span><span>OPERATIONAL</span></div><div className="cred-stability-bar"><span /></div></div>;
  if (kind === 'response') return <div className="cred-artifact cred-artifact--response"><span>REQUEST</span><div className="cred-request-route"><i /></div><span>DELIVERED</span><strong>100 ms</strong></div>;
  if (kind === 'accessibility') return <div className="cred-artifact cred-artifact--accessibility">{['Semantic HTML', 'SEO Ready', 'WCAG Ready'].map((item) => <span key={item}><i>✓</i>{item}</span>)}</div>;
  return (
    <div className="cred-artifact cred-artifact--communication">
      <div className="cred-access-row">
        <span className="cred-access-person">YOU</span>

        <div className="cred-access-progress" aria-hidden="true">
          {Array.from({ length: 15 }, (_, i) => (
            <i key={i} />
          ))}
        </div>

        <div className="cred-access-engineer">
          <span>MONOLITH</span>
        </div>
      </div>

      <span className="cred-access-connected">
        CONNECTED
      </span>
    </div>
  );
};

const CredibilityCard: React.FC<{ metric: MetricItem; index: number }> = ({ metric, index }) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.45 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article ref={cardRef} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }} animate={isInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: [0.2, 0.72, 0.24, 1] }} className={`cred-card cred-card--${index + 1} ${isInView ? 'cred-card--active' : ''}`}>
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.1em] text-mc-text-tertiary mb-5"><span>MC / {metric.index}</span><span className="cred-card__accent" /></div>
      <EvidenceArtifact kind={metric.kind} />
      <h2 className="text-lg font-sans font-medium text-mc-text-strong tracking-tight mt-5 mb-2">{metric.label}</h2>
      <p className="text-sm font-sans text-mc-text-secondary leading-relaxed">{metric.description}</p>
    </motion.article>
  );
};

export const CredibilityRail: React.FC = () => {
  return (
    <section className="py-16 bg-mc-surface-deep/40 border-b border-mc-border" aria-label="How we work">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {METRICS.map((metric, index) => <CredibilityCard key={metric.index} metric={metric} index={index} />)}
      </div></div>
    </section>
  );
};
