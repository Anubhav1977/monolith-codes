import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { PageShell, Breadcrumbs } from '@/components/PageShell';
import {
  CardGrid,
  ClosingCta,
  CtaPair,
  IndexLabel,
  PriceFromBoth,
  Prose,
  RailSection,
} from '@/components/ContentBlocks';
import { SERVICES, getService } from '@/content/services';
import { GUIDES } from '@/content/guides';
import { SITE } from '@/lib/site';
import type { PageProps } from './registry';

const ServicePage: React.FC<PageProps> = ({ route }) => {
  const s = getService(route.slug ?? '');
  if (!s) return null;
  const others = SERVICES.filter((o) => o.slug !== s.slug);
  const guides = GUIDES.filter((g) => g.relatedServices.includes(s.slug));

  return (
    <PageShell>
      {/* Hero */}
      <header className="border-b border-mc-border">
        <div className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 pt-10 md:pt-16 pb-14 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Breadcrumbs
              items={[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: s.name, path: route.path },
              ]}
            />
            <div className="mt-8">
              <IndexLabel>{s.eyebrow}</IndexLabel>
            </div>
            <h1 className="mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-sans font-medium text-mc-text-strong tracking-[-0.04em] leading-[1.02] text-balance">
              {s.h1}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-mc-text-body leading-relaxed max-w-2xl">{s.summary}</p>
            <p className="mt-4 font-mono text-xs text-mc-text-tertiary">{SITE.locationLine}</p>
            <div className="mt-8">
              <CtaPair secondaryHref="#pricing-and-timeline" secondaryLabel="Price & timeline" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="rounded-xl border border-mc-border bg-mc-surface-deep p-6 md:p-8">
              <img
                src={s.image.src}
                width={s.image.width}
                height={s.image.height}
                alt={s.image.alt}
                decoding="async"
                fetchPriority="high"
                className="w-full h-auto object-contain"
              />
              <figcaption className="mt-4 font-mono text-[11px] text-mc-text-tertiary uppercase tracking-wider">
                Illustrative interface · {s.name}
              </figcaption>
            </figure>
          </div>
        </div>
      </header>

      <RailSection index="01 / Overview" title={`${s.name}: our approach`} id="overview">
        <Prose paragraphs={s.intro} />
      </RailSection>

      <RailSection index="02 / Who it's for" title="Who this service is for" id="who-for">
        <CardGrid items={s.whoFor} />
      </RailSection>

      <RailSection index="03 / Deliverables" title="What you get" id="deliverables">
        <CardGrid items={s.deliverables} numbered />
      </RailSection>

      <RailSection index="04 / Process" title="How the project runs" id="process">
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.approach.map((step, i) => (
            <li key={step.title} className="relative rounded-lg border border-mc-border bg-mc-surface-deep p-5">
              <span className="font-mono text-xs text-mc-orange">STEP {String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-lg font-sans font-medium text-mc-text-strong">{step.title}</h3>
              <p className="mt-2 text-sm text-mc-text-body leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-mc-text-secondary">
          Every project follows our written-scope, milestone-based delivery model —{' '}
          <a href="/pricing#process" className="text-mc-orange underline-offset-4 hover:underline">
            see the full 7-stage process
          </a>
          .
        </p>
      </RailSection>

      <RailSection index="05 / Technology" title="Technology we typically use" id="technology">
        <ul className="flex flex-wrap gap-2.5" aria-label={`Technologies used for ${s.name}`}>
          {s.stack.map((t) => (
            <li key={t} className="px-3 py-2 rounded-md border border-mc-border bg-mc-surface font-mono text-xs text-mc-text-strong">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm md:text-base text-mc-text-body max-w-2xl leading-relaxed">
          Technology is chosen per project. Whatever we use, you receive the complete source code, documentation and
          deployment set-up — 100% of the intellectual property is yours.
        </p>
      </RailSection>

      <RailSection index="06 / Investment" title="Price and timeline" id="pricing-and-timeline">
        <PriceFromBoth tier={s.tier} />
        <ul className="mt-8 space-y-3 max-w-2xl">
          {[s.timeline, s.pricingNote, 'Fixed price and deliverables agreed in a written proposal before development begins.'].map((t) => (
            <li key={t} className="flex gap-3 text-base text-mc-text-body leading-relaxed">
              <Check className="w-5 h-5 text-mc-orange shrink-0 mt-0.5" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <a href="/pricing" className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-mc-orange font-medium hover:underline underline-offset-4">
          Compare all pricing tiers <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </RailSection>

      {s.relatedWork.length > 0 && (
        <RailSection index="07 / Related work" title="Related projects" id="related-work">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {s.relatedWork.map((w) => (
              <li key={w.title} className="rounded-lg border border-mc-border bg-mc-surface p-5 md:p-6">
                <h3 className="text-lg font-sans font-medium text-mc-text-strong">{w.title}</h3>
                <p className="mt-2 text-sm md:text-base text-mc-text-body leading-relaxed">{w.text}</p>
              </li>
            ))}
          </ul>
          <a href="/#work" className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-mc-orange font-medium hover:underline underline-offset-4">
            View selected work <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </RailSection>
      )}

      <RailSection index="08 / Questions" title={`${s.name} — frequently asked questions`} id="faq">
        <div className="space-y-4 max-w-3xl">
          {s.faqs.map((f) => (
            <details key={f.q} className="group rounded-lg border border-mc-border bg-mc-surface open:border-mc-orange">
              <summary className="cursor-pointer list-none p-5 md:p-6 flex items-start justify-between gap-4 min-h-11">
                <h3 className="text-base md:text-lg font-sans font-medium text-mc-text-strong">{f.q}</h3>
                <span aria-hidden="true" className="font-mono text-mc-orange transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 md:px-6 pb-6 text-sm md:text-base text-mc-text-body leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </RailSection>

      <RailSection index="09 / Explore" title="Other services and guides" id="explore">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {others.map((o) => (
            <li key={o.slug}>
              <a
                href={`/services/${o.slug}`}
                className="flex min-h-14 items-center justify-between gap-3 rounded-lg border border-mc-border bg-mc-surface px-4 py-3 text-mc-text-strong hover:border-mc-orange hover:text-mc-orange transition-colors"
              >
                <span className="font-medium">{o.name}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
          {guides.map((g) => (
            <li key={g.slug}>
              <a
                href={`/guides/${g.slug}`}
                className="flex min-h-14 items-center justify-between gap-3 rounded-lg border border-mc-border bg-mc-surface-deep px-4 py-3 text-mc-text-strong hover:border-mc-orange hover:text-mc-orange transition-colors"
              >
                <span className="font-medium">Guide: {g.name}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </RailSection>

      <ClosingCta
        title="Planning a project like this? Tell us what you need."
        text="Send a short brief and we will reply with questions, a recommended approach and next steps — usually followed by a fixed-price proposal."
      />
    </PageShell>
  );
};

export default ServicePage;
