import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { CtaPair, IndexLabel } from '@/components/ContentBlocks';
import { SERVICES } from '@/content/services';

/** Branded 404 — served by Vercel from /404.html with a real 404 status. */
const NotFoundPage: React.FC = () => (
  <PageShell>
    <section className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-3">
        <IndexLabel>Error / 404</IndexLabel>
      </div>
      <div className="lg:col-span-9">
        <h1 className="text-[clamp(2.4rem,5vw,4.4rem)] font-sans font-medium text-mc-text-strong tracking-[-0.045em] leading-[1.02]">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-6 text-lg text-mc-text-body leading-relaxed max-w-2xl">
          The link may be old or mistyped. Here is where you can go instead.
        </p>
        <div className="mt-8">
          <CtaPair primaryHref="/#inquiry" secondaryHref="/" secondaryLabel="Back to home" />
        </div>
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <a
                href={`/services/${s.slug}`}
                className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-mc-border bg-mc-surface px-4 py-3 text-mc-text-strong hover:border-mc-orange hover:text-mc-orange transition-colors"
              >
                <span>{s.name}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </PageShell>
);

export default NotFoundPage;
