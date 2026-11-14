/// <reference types="vite/client" />
import { IS_SERVER } from '@/lib/env';

/**
 * Vercel Web Analytics + Speed Insights, loaded after the page is idle so they never compete with
 * first paint / LCP. Both scripts are served from this origin (/_vercel/…), so the CSP is unchanged.
 *
 * Conversion events (custom events need Web Analytics enabled in the Vercel project; see seo/SEO_REPORT.md):
 *   generate_lead     — inquiry form submitted successfully   { service, budget }
 *   book_call         — click on the cal.com booking link
 *   contact_email     — click on a mailto: link
 *   contact_phone     — click on a tel: link
 *   contact_whatsapp  — click on a wa.me link
 * No personal data (names, emails, phone numbers, message text) is ever sent.
 */

type EventProps = Record<string, string | number | boolean | null>;
type AnalyticsModule = typeof import('@vercel/analytics');

let loader: Promise<AnalyticsModule | null> | null = null;

const load = () => {
  if (IS_SERVER || !import.meta.env.PROD) return Promise.resolve(null);
  loader ??= import('@vercel/analytics')
    .then((m) => {
      m.inject({ mode: 'production', framework: 'react' });
      return m;
    })
    .catch(() => null);
  return loader;
};

export const track = (name: string, props?: EventProps) => {
  void load().then((m) => m?.track(name, props));
};

const LINK_EVENTS: [RegExp, string][] = [
  [/^mailto:/i, 'contact_email'],
  [/^tel:/i, 'contact_phone'],
  [/^https:\/\/(api\.)?wa\.me\//i, 'contact_whatsapp'],
  [/^https:\/\/cal\.com\//i, 'book_call'],
];

/** Call once in the browser: schedules analytics on idle and tracks contact-link clicks. */
export const initAnalytics = () => {
  if (IS_SERVER) return () => {};
  const idle = (cb: () => void) =>
    typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(cb, { timeout: 4000 }) : setTimeout(cb, 2500);
  idle(() => {
    void load();
    if (import.meta.env.PROD) {
      void import('@vercel/speed-insights').then((m) => m.injectSpeedInsights({ framework: 'react' })).catch(() => {});
    }
  });

  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') ?? '';
    const hit = LINK_EVENTS.find(([re]) => re.test(href));
    if (hit) track(hit[1], { location: window.location.pathname });
  };
  // Capture phase: runs before handlers that preventDefault (e.g. the desktop mailto → Gmail redirect).
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
};
