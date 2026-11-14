import React from 'react';
import { PageShell, Breadcrumbs } from '@/components/PageShell';
import { ClosingCta, IndexLabel } from '@/components/ContentBlocks';
import { GUIDES } from '@/content/guides';
import type { PageProps } from './registry';

const GuidesPage: React.FC<PageProps> = ({ route }) => (
  <PageShell>
    <header className="border-b border-mc-border">
      <div className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 pt-10 md:pt-16 pb-12 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Guides', path: route.path }]} />
        </div>
        <div className="lg:col-span-3">
          <IndexLabel>Guides</IndexLabel>
        </div>
        <div className="lg:col-span-9">
          <h1 className="text-[clamp(2.2rem,4.6vw,4rem)] font-sans font-medium text-mc-text-strong tracking-[-0.04em] leading-[1.02] text-balance">
            Guides for planning and buying custom software
          </h1>
          <p className="mt-6 text-lg md:text-xl text-mc-text-body leading-relaxed max-w-3xl">
            Straight answers to the questions we hear most from business owners and product teams — cost, build vs buy, and
            what to prepare before you start.
          </p>
        </div>
      </div>
    </header>

    <section aria-label="All guides" className="py-14 md:py-20 border-b border-mc-border">
      <ul className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <a
              href={`/guides/${g.slug}`}
              className="group flex h-full flex-col rounded-lg border border-mc-border bg-mc-surface p-6 md:p-8 hover:border-mc-orange transition-colors"
            >
              <span className="font-mono text-xs text-mc-text-tertiary uppercase tracking-wider">
                {g.eyebrow} · {g.readingMinutes} min read
              </span>
              <h2 className="mt-4 text-xl md:text-2xl font-sans font-medium text-mc-text-strong tracking-tight group-hover:text-mc-orange transition-colors">
                {g.h1}
              </h2>
              <p className="mt-3 text-sm md:text-base text-mc-text-body leading-relaxed">{g.summary}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>

    <ClosingCta
      title="Have a question these guides don't answer?"
      text="Ask us directly. A senior engineer will reply — no sales script."
    />
  </PageShell>
);

export default GuidesPage;
