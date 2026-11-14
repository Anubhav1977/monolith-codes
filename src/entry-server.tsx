import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { ROUTES, NOT_FOUND_ROUTE, type RouteDef } from '@/lib/routes';
import { setServerLocation } from '@/lib/router';
import { PAGE_LOADERS, PAGE_SOURCES } from '@/pages/registry';
import { routeHeadHtml } from '@/components/Seo';
import { humansTxt, llmsFullTxt, llmsTxt, markdownFileFor, routeMarkdown } from '@/lib/markdown';
import { ogImageFor } from '@/lib/routes';
import { SITE } from '@/lib/site';

/** Build-time renderer used by scripts/prerender.mjs. */
export async function render(route: RouteDef) {
  setServerLocation(route.path);
  const { default: Page } = await PAGE_LOADERS[route.page]();
  const html = renderToString(<App initialRoute={route} initialPage={Page} />);
  return { html, head: routeHeadHtml(route), source: PAGE_SOURCES[route.page] };
}

export { ROUTES, NOT_FOUND_ROUTE, SITE, humansTxt, llmsFullTxt, llmsTxt, markdownFileFor, routeMarkdown, ogImageFor };
