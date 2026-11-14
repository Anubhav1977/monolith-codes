import React from 'react';
import ReactDOM from 'react-dom/client';
import { flushSync } from 'react-dom';
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
 */
async function boot() {
  redirectLegacyHash();
  const route = matchRoute(window.location.pathname);
  const { default: Page } = await PAGE_LOADERS[route.page]();
  const container = document.getElementById('root')!;
  const root = ReactDOM.createRoot(container);
  flushSync(() => {
    root.render(
      <React.StrictMode>
        <App initialRoute={route} initialPage={Page} />
      </React.StrictMode>
    );
  });
  container.removeAttribute('data-prerendered');
  // First-visit home: the prerendered page was hidden until the intro screen could mount (index.html).
  document.documentElement.classList.remove('mc-intro-pending');
}

boot();
