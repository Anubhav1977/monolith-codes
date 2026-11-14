/**
 * Build-time prerender (runs after `vite build` + `vite build --ssr`).
 *
 *  - Renders every route in src/lib/routes.ts to static HTML with its own <head> (title, description,
 *    canonical, Open Graph, JSON-LD) so crawlers and AI fetchers that don't run JavaScript get the
 *    full page. Output: dist/<path>.html (served at /<path> by Vercel `cleanUrls`) + dist/404.html.
 *  - Adds <link rel="modulepreload"> for each page's own chunk (no lazy-load waterfall).
 *  - Writes dist/sitemap.xml from the same route table (accurate per-page lastmod).
 *  - Verifies the CSP in vercel.json still allows the inline theme script (hash pinning).
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SERVER_ENTRY = path.join(ROOT, 'dist-server', 'entry-server.js');
const SITE = 'https://monolithcodes.com';

const fail = (msg) => {
  console.error(`\n[prerender] ✖ ${msg}\n`);
  process.exit(1);
};

const template = await readFile(path.join(DIST, 'index.html'), 'utf8');
const manifest = JSON.parse(await readFile(path.join(DIST, '.vite', 'manifest.json'), 'utf8'));
const { render, ROUTES, NOT_FOUND_ROUTE } = await import(pathToFileURL(SERVER_ENTRY).href);

if (!/<!--route-head-->[\s\S]*?<!--\/route-head-->/.test(template)) fail('index.html is missing the <!--route-head--> markers.');
if (!template.includes('<div id="root"><!--app-html--></div>')) fail('index.html is missing <div id="root"><!--app-html--></div>.');

/* ── CSP hash check ─────────────────────────────────────────────────────────── */
const vercel = await readFile(path.join(ROOT, 'vercel.json'), 'utf8');
const inlineScripts = [...template.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
for (const code of inlineScripts) {
  const hash = `'sha256-${createHash('sha256').update(code, 'utf8').digest('base64')}'`;
  if (!vercel.includes(hash)) fail(`Inline script hash ${hash} is not in the Content-Security-Policy in vercel.json. Update script-src.`);
}

/* ── modulepreload per page ─────────────────────────────────────────────────── */
const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry);
const entryFiles = new Set();
const collect = (key, acc) => {
  const chunk = manifest[key];
  if (!chunk || acc.has(chunk.file)) return acc;
  acc.add(chunk.file);
  (chunk.imports ?? []).forEach((k) => collect(k, acc));
  return acc;
};
collect(entryKey, entryFiles);
const preloadsFor = (source) => {
  if (!manifest[source]) fail(`No manifest entry for ${source} — is it imported from src/pages/registry.tsx?`);
  return [...collect(source, new Set())]
    .filter((f) => !entryFiles.has(f) && f.endsWith('.js'))
    .map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`)
    .join('\n  ');
};

/* ── render ─────────────────────────────────────────────────────────────────── */
const outFileFor = (routePath) => (routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`);

const renderRoute = async (route, file) => {
  const { html, head, source } = await render(route);
  if (route.page !== 'notFound' && !/<h1[\s>]/.test(html)) fail(`Route ${route.path} rendered without an <h1>.`);
  const page = template
    .replace(/<!--route-head-->[\s\S]*?<!--\/route-head-->/, `${head}\n  ${preloadsFor(source)}`)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-prerendered>${html}</div>`);
  const dest = path.join(DIST, file);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, page, 'utf8');
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`[prerender] ${route.path.padEnd(52)} → ${file}  (${words} words)`);
};

for (const route of ROUTES) await renderRoute(route, outFileFor(route.path));
await renderRoute(NOT_FOUND_ROUTE, '404.html');

/* ── sitemap.xml ────────────────────────────────────────────────────────────── */
const urls = ROUTES.filter((r) => r.meta.indexable !== false)
  .map((r) => {
    const loc = r.path === '/' ? `${SITE}/` : `${SITE}${r.path}`;
    const image = r.path === '/' ? `\n    <image:image>\n      <image:loc>${SITE}/og-image.jpg</image:loc>\n    </image:image>` : '';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${r.lastmod}</lastmod>${image}\n  </url>`;
  })
  .join('\n');
await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`,
  'utf8',
);
console.log(`[prerender] sitemap.xml — ${ROUTES.length} URLs`);

await rm(path.join(ROOT, 'dist-server'), { recursive: true, force: true });
console.log('[prerender] ✔ done');
