import { useSyncExternalStore } from 'react';

/**
 * Minimal path router (no dependency).
 *
 * - Real, crawlable URLs (/pricing, /services/erp-crm-development …) instead of hash "pages".
 * - `navigate()` pushes history and notifies subscribers; back/forward work through `popstate`.
 * - `installLinkInterception()` turns ordinary same-origin `<a href="/…">` clicks into client-side
 *   navigations, so components just render plain links that crawlers can follow.
 * - During prerendering there is no window: `setServerLocation()` supplies the URL being rendered.
 */

const IS_BROWSER = typeof window !== 'undefined';
const LOCATION_EVENT = 'mc:locationchange';

let serverPath = '/';

export const setServerLocation = (path: string) => {
  serverPath = path;
};

/** Pages that used to live behind a hash on the home URL (`/#pricing`) → their real path. */
const LEGACY_HASH_ROUTES: Record<string, string> = {
  '#pricing': '/pricing',
  '#process': '/pricing#process',
  '#about': '/about',
  '#privacy': '/privacy',
  '#terms': '/terms',
};

/** Normalise a pathname: no trailing slash (except root), no `.html`, lowercase-insensitive match left to the route table. */
export const normalizePath = (path: string) => {
  let p = path.split(/[?#]/)[0] || '/';
  if (p.endsWith('.html')) p = p.slice(0, -5);
  if (p.endsWith('/index')) p = p.slice(0, -6) || '/';
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
};

const subscribe = (cb: () => void) => {
  if (!IS_BROWSER) return () => {};
  window.addEventListener('popstate', cb);
  window.addEventListener(LOCATION_EVENT, cb);
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener(LOCATION_EVENT, cb);
  };
};

const getPath = () => (IS_BROWSER ? normalizePath(window.location.pathname) : serverPath);

/** Current normalised pathname; re-renders on navigation. */
export const usePathname = () => useSyncExternalStore(subscribe, getPath, () => serverPath);

/** Scroll to an element id, retrying for a few frames while a freshly loaded page mounts. */
export const scrollToId = (id: string, behavior: ScrollBehavior = 'smooth', attempts = 30) => {
  if (!IS_BROWSER || !id) return;
  const el = document.getElementById(decodeURIComponent(id));
  if (el) {
    el.scrollIntoView({ behavior });
    // After a page swap, images/sticky sections above the target can still change height —
    // re-align once layout has settled.
    if (behavior === 'instant') window.setTimeout(() => el.scrollIntoView({ behavior: 'instant' }), 450);
    return;
  }
  if (attempts > 0) requestAnimationFrame(() => scrollToId(id, behavior, attempts - 1));
};

/** Jump to top without the global CSS smooth-scroll (used on page changes). */
export const scrollToTopInstant = () => {
  if (IS_BROWSER) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
};

/** Client-side navigation. Same-path links with a hash just scroll. */
export const navigate = (to: string, { replace = false }: { replace?: boolean } = {}) => {
  if (!IS_BROWSER) return;
  const url = new URL(to, window.location.href);
  const samePath = normalizePath(url.pathname) === getPath();

  if (samePath && url.hash) {
    if (window.location.hash !== url.hash) window.history.replaceState(window.history.state, '', url.hash);
    scrollToId(url.hash.slice(1));
    return;
  }
  if (samePath && !url.hash) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const target = url.pathname + url.search + url.hash;
  if (replace) window.history.replaceState(null, '', target);
  else window.history.pushState(null, '', target);
  window.dispatchEvent(new Event(LOCATION_EVENT));
};

/**
 * Go to a section by id. Scrolls if it is on the current page; otherwise navigates to the page
 * that owns it (the inquiry form, work and FAQ live on home; process lives on /pricing).
 */
const SECTION_OWNERS: Record<string, string> = { process: '/pricing', pricing: '/pricing' };

export function goToSection(id: string) {
  if (!IS_BROWSER) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  const owner = SECTION_OWNERS[id] ?? '/';
  navigate(id === 'pricing' ? owner : `${owner}#${id}`);
}

/** Old shared links (`/#pricing`, `/#privacy-…`) → real URLs. Runs once before the first render. */
export const redirectLegacyHash = (): boolean => {
  if (!IS_BROWSER) return false;
  const { pathname, hash } = window.location;
  if (normalizePath(pathname) !== '/' || !hash) return false;
  const key = Object.keys(LEGACY_HASH_ROUTES).find((k) => hash === k || hash.startsWith(`${k}-`));
  if (!key) return false;
  const target = hash === key ? LEGACY_HASH_ROUTES[key] : `${LEGACY_HASH_ROUTES[key].split('#')[0]}#${hash.slice(1)}`;
  window.history.replaceState(null, '', target);
  return true;
};

/** Intercept same-origin `<a href="/…">` clicks for client-side navigation. Returns a cleanup. */
export const installLinkInterception = () => {
  if (!IS_BROWSER) return () => {};
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download') || a.dataset.native !== undefined) return;
    const href = a.getAttribute('href') ?? '';
    if (!href.startsWith('/') || href.startsWith('//')) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (/\.(xml|txt|pdf|png|jpe?g|webp|svg|ico|json|webmanifest)$/i.test(url.pathname)) return;
    e.preventDefault();
    navigate(href);
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
};
