import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { PageShell, Breadcrumbs } from '@/components/PageShell';
import { ClosingCta, CtaPair, IndexLabel, RailSection } from '@/components/ContentBlocks';
import { CASE_STUDIES, getCaseStudy } from '@/content/work';
import { getService } from '@/content/services';
import { getTestimonial } from '@/content/testimonials';
import type { PageProps } from './registry';

/** /work/<slug> — one case study (data: src/content/work.ts). */
const CaseStudyPage: React.FC<PageProps> = ({ route }) => {
  const c = getCaseStudy(route.slug ?? '');
  if (!c) return null;
  const services = c.services.map(getService).filter((s): s is NonNullable<typeof s> => !!s);
  const testimonial = getTestimonial(c.testimonialId);
  const others = CASE_STUDIES.filter((o) => o.slug !== c.slug);
  let section = 0;
  const idx = (label: string) => `${String(++section).padStart(2, '0')} / ${label}`;

  return (
    <PageShell>
      <header className="border-b border-mc-border">
        <div className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 pt-10 md:pt-16 pb-14 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <Breadcrumbs
              items={[
                { name: 'Home', path: '/' },
                { name: 'Work', path: '/work' },
                { name: c.name, path: route.path },
              ]}
            />
            <div className="mt-8">
              <IndexLabel>
                {c.index} · {c.category}
              </IndexLabel>
            </div>
            <h1 className="mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)] font-sans font-medium text-mc-text-strong tracking-[-0.04em] leading-[1.04] text-balance">
              {c.title}
            </h1>
            <dl className="mt-6 grid grid-cols-2 gap-4 max-w-md font-mono text-xs">
              <div>
                <dt className="uppercase tracking-wider text-mc-text-tertiary">Client</dt>
                <dd className="mt-1 text-mc-text-strong">{c.client}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-wider text-mc-text-tertiary">Sector</dt>
                <dd className="mt-1 text-mc-text-strong">{c.sector}</dd>
              </div>
            </dl>
            <div className="mt-8">
              <CtaPair secondaryHref="/work" secondaryLabel="All case studies" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <figure className="overflow-hidden rounded-xl border border-mc-border bg-mc-surface-deep">
              {c.image ? (
                <img
                  src={c.image.src}
                  width={c.image.width}
                  height={c.image.height}
                  alt={c.image.alt}
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="grid aspect-video place-items-center bg-linear-to-br from-mc-surface-deep to-mc-orange/20" aria-hidden="true">
                  <span className="font-mono text-7xl font-semibold text-mc-text-tertiary">{c.index.split('/ ')[1]}</span>
                </div>
              )}
              {c.metrics.length > 0 && (
                <figcaption className="grid grid-cols-3 gap-px border-t border-mc-border bg-mc-border">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="bg-mc-surface p-4">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-mc-text-tertiary">{m.label}</div>
                      <div className="mt-1 font-mono text-xl font-semibold text-mc-orange">{m.value}</div>
                    </div>
                  ))}
                </figcaption>
              )}
            </figure>
          </div>
        </div>
      </header>

      {c.problem && (
        <RailSection index={idx('Challenge')} title="The challenge" id="challenge">
          <p className="max-w-3xl text-base md:text-lg text-mc-text-body leading-relaxed">{c.problem}</p>
        </RailSection>
      )}

      <RailSection index={idx('Solution')} title="What we built" id="solution">
        <p className="max-w-3xl text-base md:text-lg text-mc-text-body leading-relaxed">{c.solution}</p>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
          {c.features.map((f) => (
            <li key={f} className="flex gap-3 rounded-lg border border-mc-border bg-mc-surface p-4 text-sm md:text-base text-mc-text-body leading-relaxed">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-mc-orange" aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </RailSection>

      <RailSection index={idx('Technology')} title="Technology stack" id="technology">
        <ul className="flex flex-wrap gap-2.5" aria-label={`Technologies used for ${c.title}`}>
          {c.stack.map((t) => (
            <li key={t} className="px-3 py-2 rounded-md border border-mc-border bg-mc-surface font-mono text-xs text-mc-text-strong">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm md:text-base text-mc-text-body max-w-2xl leading-relaxed">
          Hand-coded by Monolith Codes, with the complete source code and intellectual property handed over to the client.
        </p>
      </RailSection>

      {testimonial && (
        <RailSection index={idx('Client')} title="What the client said" id="testimonial">
          <figure className="max-w-3xl rounded-xl border border-mc-border bg-mc-surface p-6 md:p-8">
            <blockquote className="text-lg md:text-xl text-mc-text-strong leading-relaxed">{testimonial.quote}</blockquote>
            <figcaption className="mt-5 font-mono text-xs uppercase tracking-wider text-mc-text-secondary">
              {testimonial.person ? `${testimonial.person}, ` : ''}
              {testimonial.company} · {testimonial.tagline}
            </figcaption>
          </figure>
        </RailSection>
      )}

      <RailSection index={idx('Services')} title="Related services" id="related-services">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((s) => (
            <li key={s.slug}>
              <a
                href={`/services/${s.slug}`}
                className="flex min-h-14 flex-col justify-center gap-1 rounded-lg border border-mc-border bg-mc-surface px-4 py-3 hover:border-mc-orange transition-colors"
              >
                <span className="flex items-center justify-between gap-3 font-medium text-mc-text-strong">
                  {s.name}
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-mc-orange" aria-hidden="true" />
                </span>
                <span className="text-sm text-mc-text-secondary">{s.summary.split(' — ')[0].slice(0, 140)}</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="/pricing"
              className="flex min-h-14 items-center justify-between gap-3 rounded-lg border border-mc-border bg-mc-surface-deep px-4 py-3 font-medium text-mc-text-strong hover:border-mc-orange hover:text-mc-orange transition-colors"
            >
              Pricing & process <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </RailSection>

      <RailSection index={idx('More work')} title="More case studies" id="more-work">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {others.map((o) => (
            <li key={o.slug}>
              <a
                href={`/work/${o.slug}`}
                className="flex h-full min-h-14 items-center justify-between gap-3 rounded-lg border border-mc-border bg-mc-surface px-4 py-3 text-mc-text-strong hover:border-mc-orange hover:text-mc-orange transition-colors"
              >
                <span className="font-medium">{o.title}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </RailSection>

      <ClosingCta
        title="Need something like this built?"
        text="Send a short brief. We reply with questions, a recommended approach and a fixed-price proposal before any development starts."
      />
    </PageShell>
  );
};

export default CaseStudyPage;
