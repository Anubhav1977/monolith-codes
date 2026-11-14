import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageShell, Breadcrumbs } from '@/components/PageShell';
import { ClosingCta, IndexLabel } from '@/components/ContentBlocks';
import { getGuide, type GuideBlock } from '@/content/guides';
import { getService } from '@/content/services';
import { getFounder } from '@/lib/site';
import type { PageProps } from './registry';

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const Block: React.FC<{ block: GuideBlock }> = ({ block }) => {
  if (typeof block === 'string') {
    return <p className="text-base md:text-lg text-mc-text-body leading-relaxed">{block}</p>;
  }
  if ('list' in block) {
    return (
      <ul className="space-y-3 pl-5 list-disc marker:text-mc-orange">
        {block.list.map((item) => (
          <li key={item} className="text-base md:text-lg text-mc-text-body leading-relaxed pl-1">
            {item}
          </li>
        ))}
      </ul>
    );
  }
  const { caption, head, rows } = block.table;
  return (
    <div className="overflow-x-auto rounded-lg border border-mc-border" tabIndex={0} role="region" aria-label={caption}>
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-mc-surface">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-mc-text-secondary font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.join('|')} className="border-t border-mc-border-soft">
              {r.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-4 py-3 font-medium text-mc-text-strong">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-4 py-3 text-mc-text-body">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const GuidePage: React.FC<PageProps> = ({ route }) => {
  const g = getGuide(route.slug ?? '');
  if (!g) return null;
  const author = getFounder(g.author);
  const services = g.relatedServices.map(getService).filter((s): s is NonNullable<typeof s> => !!s);

  return (
    <PageShell>
      <article>
        <header className="border-b border-mc-border">
          <div className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 pt-10 md:pt-16 pb-12 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12">
              <Breadcrumbs
                items={[
                  { name: 'Home', path: '/' },
                  { name: 'Guides', path: '/guides' },
                  { name: g.name, path: route.path },
                ]}
              />
            </div>
            <div className="lg:col-span-3">
              <IndexLabel>{g.eyebrow}</IndexLabel>
            </div>
            <div className="lg:col-span-9">
              <h1 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-sans font-medium text-mc-text-strong tracking-[-0.04em] leading-[1.05] text-balance">
                {g.h1}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-mc-text-strong leading-relaxed max-w-3xl">{g.summary}</p>
              <p className="mt-5 font-mono text-xs text-mc-text-tertiary">
                By{' '}
                {author ? (
                  <a href="/about" rel="author" className="text-mc-text-secondary underline underline-offset-4 hover:text-mc-orange">
                    {author.name}
                  </a>
                ) : (
                  'the MONOLITH CODES engineering team'
                )}
                {author ? `, ${author.jobTitle}` : ''} · Published <time dateTime={g.published}>{formatDate(g.published)}</time>
                {g.updated !== g.published && (
                  <>
                    {' '}
                    · Updated <time dateTime={g.updated}>{formatDate(g.updated)}</time>
                  </>
                )}{' '}
                · {g.readingMinutes} min read
              </p>
            </div>
          </div>
        </header>

        <div className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <nav aria-label="On this page" className="lg:col-span-3 lg:sticky lg:top-24 self-start">
            <p className="font-mono text-xs text-mc-text-tertiary uppercase tracking-wider mb-3">On this page</p>
            <ol className="space-y-1 text-sm">
              {g.sections.map((sec) => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`} className="block py-1.5 text-mc-text-secondary hover:text-mc-orange transition-colors">
                    {sec.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="lg:col-span-9 max-w-3xl space-y-14">
            {g.sections.map((sec) => (
              <section key={sec.id} id={sec.id} aria-labelledby={`${sec.id}-title`} className="scroll-mt-24 space-y-5">
                <h2 id={`${sec.id}-title`} className="text-2xl md:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                  {sec.heading}
                </h2>
                {sec.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </section>
            ))}

            <aside aria-label="Related services" className="rounded-lg border border-mc-border bg-mc-surface p-6">
              <p className="font-mono text-xs text-mc-orange uppercase tracking-wider">Related services</p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={`/services/${s.slug}`}
                      className="flex min-h-11 items-center justify-between gap-2 text-mc-text-strong hover:text-mc-orange transition-colors"
                    >
                      <span>{s.name}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/pricing" className="flex min-h-11 items-center justify-between gap-2 text-mc-text-strong hover:text-mc-orange transition-colors">
                    <span>Pricing & process</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </article>

      <ClosingCta
        title="Want a number for your project?"
        text="Send a short brief and we will reply with questions and a fixed-price proposal — in INR for Indian clients, USD for international clients."
      />
    </PageShell>
  );
};

export default GuidePage;
