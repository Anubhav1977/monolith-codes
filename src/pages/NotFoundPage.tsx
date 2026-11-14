import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { CtaPair } from '@/components/ContentBlocks';
import { ROUTES, type RouteDef } from '@/lib/routes';
import { usePathname } from '@/lib/router';
import { IS_SERVER } from '@/lib/env';

/**
 * Branded 404 — served by Vercel from /404.html with a real 404 status.
 * Visual first: an unmistakable "404 / Page not found", one typo-aware suggestion, a page search,
 * and a block field whose missing module links to the inquiry form.
 */

interface PageEntry {
  path: string;
  label: string;
  description: string;
}

const PAGES: PageEntry[] = ROUTES.map((r: RouteDef) => ({
  path: r.path,
  label: r.path === '/' ? 'Home' : r.meta.title.split(' | ')[0].replace(/ — .*$/, ''),
  description: r.meta.description,
}));

const tokens = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1);

/** Classic edit distance — small strings only (URL segments). */
const distance = (a: string, b: string) => {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
};

/** Best page for the URL that 404'd: typo distance on the last segment + shared words. */
const suggestFor = (requested: string): PageEntry | undefined => {
  const reqTokens = tokens(requested);
  const reqLast = requested.split('/').filter(Boolean).pop()?.toLowerCase() ?? '';
  if (!reqTokens.length) return undefined;
  return PAGES.filter((p) => p.path !== '/')
    .map((p) => {
      const last = p.path.split('/').pop() ?? '';
      const typo = reqLast ? Math.max(0, 4 - distance(reqLast, last)) * 2 : 0;
      const haystack = `${p.path} ${p.label}`.toLowerCase();
      const words = reqTokens.reduce((n, t) => n + (haystack.includes(t) ? 3 : haystack.includes(t.slice(0, 4)) ? 1 : 0), 0);
      return { p, score: typo + words };
    })
    .filter((x) => x.score >= 3)
    .sort((a, b) => b.score - a.score)[0]?.p;
};

const searchPages = (query: string) => {
  const q = tokens(query);
  if (!q.length) return [];
  return PAGES.filter((p) => {
    const hay = `${p.label} ${p.description} ${p.path}`.toLowerCase();
    return q.every((t) => hay.includes(t));
  })
    .map((p) => ({ p, title: q.filter((t) => `${p.label} ${p.path}`.toLowerCase().includes(t)).length }))
    .sort((a, b) => b.title - a.title) // title/URL matches rank above description-only matches
    .slice(0, 5)
    .map((x) => x.p);
};

/* ── Block field: proximity-reactive grid with one missing module ──────────────── */

const COLS = 6;
const ROWS = 4;
const MISSING = 15; // row 3, col 4

const BlockField: React.FC = () => {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const blocks = Array.from(field.querySelectorAll<HTMLElement>('[data-block]'));
    let raf = 0;
    let px = -9999;
    let py = -9999;

    const paint = () => {
      raf = 0;
      for (const b of blocks) {
        const r = b.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        b.style.setProperty('--heat', Math.max(0, 1 - d / 180).toFixed(3)); // 0 → 1 within 180px
      }
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      px = py = -9999;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    field.addEventListener('pointermove', onMove, { passive: true });
    field.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      field.removeEventListener('pointermove', onMove);
      field.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={fieldRef} className="nf-field" style={{ '--cols': COLS } as React.CSSProperties}>
      {Array.from({ length: COLS * ROWS }, (_, i) =>
        i === MISSING ? (
          <a key={i} href="/#inquiry" className="nf-missing" aria-label="This page is missing — start a project and we will build it">
            <span aria-hidden="true">+</span>
          </a>
        ) : (
          <span key={i} data-block className="nf-block" aria-hidden="true" />
        ),
      )}
    </div>
  );
};

/* ── Page ─────────────────────────────────────────────────────────────────────── */

const NotFoundPage: React.FC = () => {
  const pathname = usePathname();
  // Prerendered 404.html can't know the URL; the browser fills in the real one.
  const requested = IS_SERVER ? '' : `${pathname}${window.location.search}`;
  const suggestion = useMemo(() => suggestFor(requested), [requested]);
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchPages(query), [query]);

  return (
    <PageShell>
      <section className="max-w-340 mx-auto px-5 sm:px-6 md:px-10 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        <div className="lg:col-span-7">
          <h1 className="nf-title">
            <span className="nf-code" aria-hidden="true">404</span>
            <span className="nf-label">Page not found</span>
          </h1>

          {requested && (
            <p className="mt-5 font-mono text-xs sm:text-sm text-mc-text-tertiary break-all">
              <span className="text-mc-orange">✕</span> {requested}
            </p>
          )}

          {suggestion && (
            <a
              href={suggestion.path}
              className="group mt-6 inline-flex min-h-11 items-center gap-2 text-base md:text-lg text-mc-text-body hover:text-mc-orange transition-colors"
            >
              Did you mean <span className="font-medium text-mc-text-strong group-hover:text-mc-orange">{suggestion.label}</span>
              <ArrowUpRight className="w-4 h-4 text-mc-orange shrink-0" aria-hidden="true" />
            </a>
          )}

          <div className="mt-8">
            <CtaPair primaryHref="/#inquiry" secondaryHref="/" secondaryLabel="Back to home" />
          </div>

          <form role="search" className="mt-10 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="nf-search" className="sr-only">
              Search pages
            </label>
            <div className="nf-search">
              <Search className="w-4 h-4 text-mc-text-tertiary shrink-0" aria-hidden="true" />
              <input
                id="nf-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages — ERP, pricing, mobile…"
                autoComplete="off"
                aria-controls="nf-results"
              />
            </div>
            <ul id="nf-results" aria-live="polite" className="mt-1 flex flex-col">
              {query && results.length === 0 && (
                <li className="py-3 text-sm text-mc-text-secondary">
                  No match.{' '}
                  <a href="/#inquiry" className="text-mc-orange underline-offset-4 hover:underline">
                    Ask us directly
                  </a>
                </li>
              )}
              {results.map((r) => (
                <li key={r.path}>
                  <a
                    href={r.path}
                    className="flex min-h-11 items-center justify-between gap-3 border-b border-mc-border-soft py-2 text-sm text-mc-text-strong hover:text-mc-orange transition-colors"
                  >
                    <span>{r.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-mc-text-tertiary shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </form>
        </div>

        <figure className="lg:col-span-5 rounded-xl border border-mc-border bg-mc-surface p-5">
          <BlockField />
          <figcaption className="mt-4 flex items-center justify-between gap-3 font-mono text-[11px] text-mc-text-tertiary uppercase tracking-wider">
            <span>1 module missing</span>
            <a href="/#inquiry" className="inline-flex min-h-11 items-center text-mc-orange hover:underline underline-offset-4">
              We can build it →
            </a>
          </figcaption>
        </figure>
      </section>
    </PageShell>
  );
};

export default NotFoundPage;
