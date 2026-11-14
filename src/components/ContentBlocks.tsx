import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STARTING_PRICES } from '@/lib/pricing';
import type { PriceTier } from '@/content/services';

/** Shared building blocks for service / guide / hub pages (design tokens only — no ad-hoc colors). */

export const IndexLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-mc-orange" aria-hidden="true" />
    <span>{children}</span>
  </p>
);

/** Section with the DESIGN.md §6.3 grammar: index rail (3 cols) + content (9 cols). */
export const RailSection: React.FC<{
  index: string;
  title: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ index, title, id, children, className = '' }) => (
  <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={`py-16 md:py-24 border-b border-mc-border ${className}`}>
    <div className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      <div className="lg:col-span-3">
        <IndexLabel>{index}</IndexLabel>
      </div>
      <div className="lg:col-span-9 min-w-0">
        <h2
          id={id ? `${id}-title` : undefined}
          className="text-2xl md:text-4xl font-sans font-medium text-mc-text-strong tracking-tight leading-[1.1] mb-8 text-balance"
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  </section>
);

export const CardGrid: React.FC<{ items: { title: string; text: string }[]; numbered?: boolean }> = ({
  items,
  numbered = false,
}) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {items.map((it, i) => (
      <li key={it.title} className="rounded-lg border border-mc-border bg-mc-surface p-5 md:p-6">
        {numbered && <span className="block font-mono text-xs text-mc-orange mb-3">{String(i + 1).padStart(2, '0')}</span>}
        <h3 className="text-lg font-sans font-medium text-mc-text-strong tracking-tight mb-2">{it.title}</h3>
        <p className="text-sm md:text-base text-mc-text-body leading-relaxed">{it.text}</p>
      </li>
    ))}
  </ul>
);

export const Prose: React.FC<{ paragraphs: string[]; lead?: boolean }> = ({ paragraphs, lead = false }) => (
  <div className="space-y-5 max-w-3xl">
    {paragraphs.map((p, i) => (
      <p
        key={i}
        className={
          lead && i === 0
            ? 'text-lg md:text-xl text-mc-text-strong leading-relaxed'
            : 'text-base md:text-lg text-mc-text-body leading-relaxed'
        }
      >
        {p}
      </p>
    ))}
  </div>
);

/** Starting price for a tier in both currencies (India + international), straight from pricing.ts. */
export const PriceFromBoth: React.FC<{ tier: PriceTier | null }> = ({ tier }) => {
  const p = tier ? STARTING_PRICES[tier] : null;
  if (!p) {
    return <p className="text-2xl md:text-3xl font-sans font-medium text-mc-text-strong">Quoted per project</p>;
  }
  return (
    <dl className="grid grid-cols-2 gap-4 max-w-md">
      <div>
        <dt className="font-mono text-xs text-mc-text-tertiary uppercase tracking-wider mb-1">India</dt>
        <dd className="text-2xl md:text-3xl font-sans font-medium text-mc-text-strong">from {p.INR}</dd>
      </div>
      <div>
        <dt className="font-mono text-xs text-mc-text-tertiary uppercase tracking-wider mb-1">International</dt>
        <dd className="text-2xl md:text-3xl font-sans font-medium text-mc-text-strong">from {p.USD}</dd>
      </div>
    </dl>
  );
};

/** Primary + secondary CTA pair used at decision points on content pages. */
export const CtaPair: React.FC<{ primaryHref?: string; secondaryHref?: string; secondaryLabel?: string }> = ({
  primaryHref = '/#inquiry',
  secondaryHref = '/pricing',
  secondaryLabel = 'See pricing',
}) => (
  <div className="flex flex-wrap gap-3">
    <a href={primaryHref} className="vt-btn vt-btn--light">
      Start a Project <i><ArrowUpRight aria-hidden="true" /></i>
    </a>
    <a href={secondaryHref} className="vt-btn vt-btn--ghost">
      {secondaryLabel}
    </a>
  </div>
);

/** Closing conversion band shared by content pages. */
export const ClosingCta: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <section className="py-20 md:py-28">
    <div className="max-w-340 mx-auto px-5 sm:px-6 md:px-10">
      <div className="rounded-2xl border border-mc-border bg-mc-surface p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <IndexLabel>Next step</IndexLabel>
          <h2 className="mt-4 text-2xl md:text-4xl font-sans font-medium text-mc-text-strong tracking-tight leading-[1.1] text-balance">
            {title}
          </h2>
          <p className="mt-4 text-base md:text-lg text-mc-text-body leading-relaxed max-w-2xl">{text}</p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <CtaPair />
        </div>
      </div>
    </div>
  </section>
);
