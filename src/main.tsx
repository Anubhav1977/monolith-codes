import React, { startTransition, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { matchRoute } from '@/lib/routes';
import { redirectLegacyHash } from '@/lib/router';
import { PAGE_LOADERS } from '@/pages/registry';
import './fonts.css';
import './index.css';
import './video-theme.css';
import './video-theme-v2.css';
import './video-theme-v3.css';
import './work-together.css';
import './ownership.css';

/**
 * The HTML for every route is prerendered at build time (scripts/prerender.mjs) so crawlers and
 * no-JS visitors get full content. In the browser the app renders fresh into #root, replacing that
 * markup — the content is identical, so there is no visual change, and no hydration-mismatch risk
 * from client-only state (theme, intro screen, currency, canvases).
 *
 * Performance: the first render runs inside startTransition, so React renders in small slices and
 * yields to the browser (low Total Blocking Time / INP) instead of one long synchronous task. The
 * prerendered markup stays on screen until the commit, so there is no blank frame or flicker.
 */

/** Runs right after the first commit, before paint: drop the prerender marker and reveal #root. */
const BootComplete: React.FC<{ container: HTMLElement; children: React.ReactNode }> = ({ container, children }) => {
  useLayoutEffect(() => {
    container.removeAttribute('data-prerendered');
    // First-visit home: the prerendered page was hidden until the intro screen could mount (index.html).
    document.documentElement.classList.remove('mc-intro-pending');
  }, [container]);
  return <>{children}</>;
};
async function boot() {
  redirectLegacyHash();
  const route = matchRoute(window.location.pathname);
  const { default: Page } = await PAGE_LOADERS[route.page]();
  const container = document.getElementById('root')!;
  const root = ReactDOM.createRoot(container);
  startTransition(() => {
    root.render(
      <React.StrictMode>
        <BootComplete container={container}>
          <App initialRoute={route} initialPage={Page} />
        </BootComplete>
      </React.StrictMode>
    );
  });
}

boot();
