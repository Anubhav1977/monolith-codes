import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageShell, Breadcrumbs } from '@/components/PageShell';
import { ClosingCta, CtaPair, IndexLabel } from '@/components/ContentBlocks';
import { CASE_STUDIES } from '@/content/work';
import { getService } from '@/content/services';
import { SITE } from '@/lib/site';
import type { PageProps } from './registry';

/** /work — index of case studies (data: src/content/work.ts). */
const WorkPage: React.FC<PageProps> = ({ route }) => (
  <PageShell>
    <header className="border-b border-mc-border">
      <div className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 pt-10 md:pt-16 pb-14 md:pb-20">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Work', path: route.path }]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <IndexLabel>Selected work</IndexLabel>
          </div>
          <div className="lg:col-span-9">
            <h1 className="text-[clamp(2.2rem,4.6vw,4rem)] font-sans font-medium text-mc-text-strong tracking-[-0.04em] leading-[1.02] text-balance">
              Case studies: custom software we have designed and built
            </h1>
            {/* REVIEW(owner): intro copy written from existing site content. */}
            <p className="mt-6 text-lg md:text-xl text-mc-text-body leading-relaxed max-w-3xl">
              A selection of websites, web platforms, a fintech dashboard and mobile apps built by Monolith Codes, a custom
              software development studio based in India. Each case study covers what the client needed, what we built and
              the technology behind it. Every project was hand-coded and handed over with its full source code.
            </p>
            <p className="mt-4 font-mono text-xs text-mc-text-tertiary">{SITE.locationLine}</p>
            <div className="mt-8">
              <CtaPair secondaryHref="/services" secondaryLabel="Explore services" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <section aria-labelledby="case-studies-title" className="py-14 md:py-20 border-b border-mc-border">
      <div className="max-w-340 mx-auto px-5 sm:px-6 md:px-10">
        <h2 id="case-studies-title" className="sr-only">
          All case studies
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CASE_STUDIES.map((c) => (
            <li key={c.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-mc-border bg-mc-surface hover:border-mc-orange transition-colors">
                <div className="aspect-video overflow-hidden border-b border-mc-border bg-mc-surface-deep">
                  {c.image ? (
                    <img
                      src={c.image.src}
                      width={c.image.width}
                      height={c.image.height}
                      alt={c.image.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-linear-to-br from-mc-surface-deep to-mc-orange/20" aria-hidden="true">
                      <span className="font-mono text-5xl font-semibold text-mc-text-tertiary">{c.index.split('/ ')[1]}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-mc-orange">
                    {c.index} · {c.category}
                  </p>
                  <h3 className="mt-3 text-xl md:text-2xl font-sans font-medium text-mc-text-strong tracking-tight">
                    <a href={`/work/${c.slug}`} className="after:absolute after:inset-0 group-hover:text-mc-orange transition-colors">
                      {c.title}
                    </a>
                  </h3>
                  <p className="mt-1 font-mono text-xs text-mc-text-tertiary">Client: {c.client}</p>
                  <p className="mt-3 text-sm md:text-base text-mc-text-body leading-relaxed">{c.problem || c.solution}</p>
                  <p className="mt-4 text-xs text-mc-text-secondary">
                    {c.services.map((slug) => getService(slug)?.name).filter(Boolean).join(' · ')}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-mc-orange">
                    Read the case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <ClosingCta
      title="Want something similar built for your business?"
      text="Tell us what you need. We reply with questions, a recommended approach and a fixed-price proposal — in INR for Indian clients, USD for international clients."
    />
  </PageShell>
);

export default WorkPage;
