import type { RouteDef } from '@/lib/routes';
import { SITE, absoluteUrl } from '@/lib/site';

/**
 * Per-route <head> tags. The same data is used twice:
 *  - at build time, `routeHeadHtml()` is written into each prerendered HTML file (what crawlers read);
 *  - in the browser, `applyRouteMeta()` keeps the head in sync during client-side navigation.
 */

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON for a <script> tag — `<` escaped so content can never close the script element. */
export const jsonForScript = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

const routeGraph = (route: RouteDef) =>
  route.jsonLd.length ? { '@context': 'https://schema.org', '@graph': route.jsonLd } : null;

const robotsFor = (route: RouteDef) =>
  route.meta.indexable === false
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const canonicalFor = (route: RouteDef) => absoluteUrl(route.path);

export const routeHeadHtml = (route: RouteDef) => {
  const { title, description, ogType = 'website' } = route.meta;
  const canonical = canonicalFor(route);
  const graph = routeGraph(route);
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${robotsFor(route)}" />`,
    route.meta.indexable === false ? '' : `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    graph ? `<script type="application/ld+json" id="route-jsonld">${jsonForScript(graph)}</script>` : '',
  ];
  return lines.filter(Boolean).join('\n  ');
};

const upsertMeta = (attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

/** Browser: sync <head> with the route after a client-side navigation. */
export const applyRouteMeta = (route: RouteDef) => {
  const { title, description, ogType = 'website' } = route.meta;
  const canonical = canonicalFor(route);
  document.title = title;
  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', robotsFor(route));
  upsertMeta('property', 'og:type', ogType);
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);

  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (route.meta.indexable === false) {
    link?.remove();
  } else {
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }

  const graph = routeGraph(route);
  let script = document.getElementById('route-jsonld') as HTMLScriptElement | null;
  if (!graph) {
    script?.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'route-jsonld';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(graph);
};

/** Absolute URL helper re-exported for page components that build share links. */
export const siteUrl = (path: string) => `${SITE.url}${path}`;
