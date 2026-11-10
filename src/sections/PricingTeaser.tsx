import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useCurrency } from '@/lib/currency';
import { STARTING_PRICES } from '@/lib/pricing';

const TIERS = [
  { id: 'launch', name: 'Launch' },
  { id: 'grow', name: 'Grow' },
  { id: 'build', name: 'Build' },
] as const;

/**
 * Home-page decision point: starting prices at a glance, with the full tiers,
 * process and commercial terms on the Pricing page (#pricing).
 */
export const PricingTeaser: React.FC = () => {
  const currency = useCurrency();

  return (
    <section aria-labelledby="pricing-teaser-title" className="border-b border-mc-border bg-mc-bg">
      <div className="max-w-340 mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-20 grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-mc-orange" aria-hidden="true" />
            MC / Pricing
          </p>
          <h2 id="pricing-teaser-title" className="text-2xl md:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
            Transparent engagement tiers
          </h2>
        </div>

        <ul className="lg:col-span-5 grid grid-cols-3 border border-mc-border rounded-xl divide-x divide-mc-border bg-mc-surface-deep">
          {TIERS.map(({ id, name }) => {
            const price = STARTING_PRICES[id];
            return (
              <li key={id} className="p-3 sm:p-5 min-w-0">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-mc-text-tertiary mb-1.5">
                  {name}
                </span>
                {price ? (
                  <>
                    <span className="sr-only">from </span>
                    <span className="block text-lg sm:text-2xl font-sans font-medium text-mc-text-strong tracking-tight tabular-nums">
                      {price[currency]}
                    </span>
                  </>
                ) : (
                  <span className="block text-lg sm:text-2xl font-sans font-medium text-mc-text-strong tracking-tight">
                    Custom
                  </span>
                )}
                <span className="block font-mono text-[10px] text-mc-text-tertiary mt-1">
                  {price ? `Starting · ${currency}` : 'Quoted per project'}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="lg:col-span-3 lg:justify-self-end">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 min-h-12 px-5 rounded-lg border border-mc-border text-sm font-sans font-medium text-mc-text hover:border-mc-orange hover:text-mc-orange transition-colors focus-visible:outline-2 focus-visible:outline-mc-orange focus-visible:outline-offset-2"
          >
            See pricing &amp; how we work
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
