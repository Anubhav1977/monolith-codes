import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { applyRouteMeta } from '@/components/Seo';
import { matchRoute, type RouteDef } from '@/lib/routes';
import { installLinkInterception, redirectLegacyHash, scrollToId, scrollToTopInstant, usePathname } from '@/lib/router';
import { PAGE_LOADERS, type PageComponent } from '@/pages/registry';
import { initAnalytics } from '@/lib/analytics';

interface AppProps {
  initialRoute: RouteDef;
  initialPage: PageComponent;
}

interface View {
  route: RouteDef;
  Page: PageComponent;
}

export const App: React.FC<AppProps> = ({ initialRoute, initialPage }) => {
  const pathname = usePathname();
  const route = matchRoute(pathname);
  const [view, setView] = useState<View>({ route: initialRoute, Page: initialPage });
  const firstView = useRef(true);

  // Load the page chunk for the new route; keep showing the current page until it is ready.
  useEffect(() => {
    if (route === view.route) return;
    let cancelled = false;
    PAGE_LOADERS[route.page]().then((m) => {
      if (!cancelled) setView({ route, Page: m.default });
    });
    return () => {
      cancelled = true;
    };
  }, [route, view.route]);

  // After a page swap: update <head>, then scroll to the hash target or the top.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (firstView.current) {
      firstView.current = false;
      if (hash) scrollToId(hash, 'instant');
      return;
    }
    applyRouteMeta(view.route);
    if (hash) scrollToId(hash, 'instant');
    else scrollToTopInstant();
  }, [view]);

  useEffect(() => installLinkInterception(), []);
  useEffect(() => initAnalytics(), []);

  // Old in-page links such as `/#pricing` followed while already on home → real URL.
  useEffect(() => {
    const onHash = () => {
      if (redirectLegacyHash()) window.dispatchEvent(new PopStateEvent('popstate'));
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // On desktop, mailto: links open Gmail compose in a new tab (works without a mail app installed).
  // On touch devices the native mail app is the better target, so the link is left alone.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="mailto:"]');
      if (!a) return;
      e.preventDefault();
      const url = new URL(a.getAttribute('href') as string);
      const params = new URLSearchParams({ view: 'cm', fs: '1', to: decodeURIComponent(url.pathname) });
      const subject = url.searchParams.get('subject');
      const body = url.searchParams.get('body');
      if (subject) params.set('su', subject);
      if (body) params.set('body', body);
      window.open(`https://mail.google.com/mail/?${params.toString()}`, '_blank', 'noopener,noreferrer');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('.cred-card, .vt-glow');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const { Page } = view;
  return (
    <ThemeProvider>
      <Page key={view.route.path} route={view.route} />
    </ThemeProvider>
  );
};

export default App;
