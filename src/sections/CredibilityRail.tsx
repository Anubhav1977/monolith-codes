import React from 'react';

interface MetricItem {
  index: string;
  value: string;
  label: string;
  description: string;
}

const METRICS: MetricItem[] = [
  {
    index: 'SYS.01',
    value: '99.99%',
    label: 'System Reliability',
    description: 'Bespoke architecture built for fault-tolerant operation and zero unplanned downtime.',
  },
  {
    index: 'SYS.02',
    value: '< 100ms',
    label: 'API Response Target',
    description: 'Sub-second data processing and optimized database pipelines for real-time applications.',
  },
  {
    index: 'SYS.03',
    value: 'WCAG 2.2 AA',
    label: 'Accessibility Standard',
    description: 'Fully accessible, semantic HTML, visible keyboard focus, and screen-reader tested UI.',
  },
  {
    index: 'SYS.04',
    value: '100% Direct',
    label: 'Senior Engineer Access',
    description: 'No middle managers or outsourcing layers. Direct technical collaboration from day one.',
  },
];

export const CredibilityRail: React.FC = () => {
  return (
    <section className="py-16 bg-mc-surface-deep/40 border-b border-mc-border">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map((metric) => (
            <div
              key={metric.index}
              className="p-6 rounded-lg bg-mc-surface border border-mc-border hover:border-mc-border-strong transition-all"
            >
              <div className="flex items-center justify-between font-mono text-xs text-mc-orange mb-3">
                <span>{metric.index}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
              </div>
              <div className="text-3xl font-sans font-medium text-mc-text-strong tracking-tight mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-sans font-medium text-mc-text mb-2">
                {metric.label}
              </div>
              <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
