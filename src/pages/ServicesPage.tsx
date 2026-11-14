import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageShell, Breadcrumbs } from '@/components/PageShell';
import { ClosingCta, CtaPair, IndexLabel, RailSection, CardGrid } from '@/components/ContentBlocks';
import { CapabilitiesSection } from '@/sections/CapabilitiesSection';
import { SERVICES } from '@/content/services';
import { GUIDES } from '@/content/guides';
import { STARTING_PRICES } from '@/lib/pricing';
import { SITE } from '@/lib/site';
import type { PageProps } from './registry';

const fromPrice = (tier: (typeof SERVICES)[number]['tier']) => {
  const p = tier ? STARTING_PRICES[tier] : null;
  return p ? `From ${p.INR} · ${p.USD}` : 'Quoted per project';
};

const WHY = [
  { title: 'Hand-coded, never templated', text: 'Every product is engineered from scratch around your workflow — no WordPress themes, page builders or white-label kits.' },
  { title: '100% IP and source-code ownership', text: 'You receive the full Git repository, documentation and deployment set-up. No licence fees, no lock-in.' },
  { title: 'Fixed scope before development', text: 'A written proposal with deliverables, price, timeline and milestones is agreed before any code is written.' },
  { title: 'Founder-led, senior engineering', text: 'You work directly with the people who architect and build your system, not an account manager.' },
];

const ServicesPage: React.FC<PageProps> = ({ route }) => (
  <PageShell>
    <header className="border-b border-mc-border">
      <div className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 pt-10 md:pt-16 pb-14 md:pb-20">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Services', path: route.path }]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <IndexLabel>Services</IndexLabel>
          </div>
          <div className="lg:col-span-9">
            <h1 className="text-[clamp(2.2rem,4.6vw,4rem)] font-sans font-medium text-mc-text-strong tracking-[-0.04em] leading-[1.02] text-balance">
              Custom software development services, engineered in India for clients worldwide
            </h1>
            <p className="mt-6 text-lg md:text-xl text-mc-text-body leading-relaxed max-w-3xl">
              MONOLITH CODES is a custom software development company based in India. We design and hand-code websites,
              web applications, SaaS platforms, mobile apps, ERP/CRM systems and AI automation for businesses in India and
              internationally — and hand over 100% of the source code.
            </p>
            <p className="mt-4 font-mono text-xs text-mc-text-tertiary">{SITE.locationLine}</p>
            <div className="mt-8">
              <CtaPair />
            </div>
          </div>
        </div>
      </div>
    </header>

    <RailSection index="01 / What we build" title="Choose the service that matches your project" id="services-list">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map((s, i) => (
          <li key={s.slug}>
            <a
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col rounded-lg border border-mc-border bg-mc-surface p-5 md:p-6 hover:border-mc-orange transition-colors"
            >
              <span className="font-mono text-xs text-mc-orange">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-xl font-sans font-medium text-mc-text-strong tracking-tight group-hover:text-mc-orange transition-colors">
                {s.name}
              </h3>
              <p className="mt-2 flex-1 text-sm md:text-base text-mc-text-body leading-relaxed">{s.summary}</p>
              <span className="mt-5 flex items-center justify-between gap-3 font-mono text-xs text-mc-text-secondary">
                <span>{fromPrice(s.tier)}</span>
                <ArrowUpRight className="w-4 h-4 text-mc-orange" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </RailSection>

    <RailSection index="02 / Why MONOLITH" title="Why companies choose a custom build with us" id="why">
      <CardGrid items={WHY} numbered />
    </RailSection>

    <CapabilitiesSection />

    <RailSection index="04 / Guides" title="Planning a project? Start here" id="guides">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <a
              href={`/guides/${g.slug}`}
              className="group flex h-full flex-col rounded-lg border border-mc-border bg-mc-surface-deep p-5 md:p-6 hover:border-mc-orange transition-colors"
            >
              <span className="font-mono text-xs text-mc-text-tertiary uppercase tracking-wider">{g.eyebrow}</span>
              <h3 className="mt-3 text-lg font-sans font-medium text-mc-text-strong group-hover:text-mc-orange transition-colors">{g.h1}</h3>
              <p className="mt-2 text-sm text-mc-text-body leading-relaxed">{g.summary}</p>
            </a>
          </li>
        ))}
      </ul>
    </RailSection>

    <ClosingCta
      title="Not sure which service fits? Describe the problem instead."
      text="Tell us what is slowing your business down. We will recommend the right approach — including when an off-the-shelf tool is the better answer."
    />
  </PageShell>
);

export default ServicesPage;
