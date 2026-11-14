/**
 * Build-time prerender (runs after `vite build` + `vite build --ssr`).
 *
 *  - Renders every route in src/lib/routes.ts to static HTML with its own <head> (title, description,
 *    canonical, Open Graph, JSON-LD) so crawlers and AI fetchers that don't run JavaScript get the
 *    full page. Output: dist/<path>.html (served at /<path> by Vercel `cleanUrls`) + dist/404.html.
 *  - Adds <link rel="modulepreload"> for each page's own chunk (no lazy-load waterfall).
 *  - Writes a sitemap index (dist/sitemap.xml) + one sitemap per section, with lastmod from the git
 *    history of each page's source files (falls back to declared dates on shallow clones) and image entries.
 *  - Writes AI/crawler text files from the same content: llms.txt, llms-full.txt, humans.txt,
 *    .well-known/security.txt and a Markdown mirror per key page (<path>.md).
 *  - Verifies the CSP in vercel.json still allows the inline theme script (hash pinning).
 */
import { readFile, writeFile, mkdir, rm, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
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
const { render, ROUTES, NOT_FOUND_ROUTE, SITE: SITE_FACTS, humansTxt, llmsTxt, llmsFullTxt, markdownFileFor, routeMarkdown, ogImageFor } = await import(
  pathToFileURL(SERVER_ENTRY).href
);
const exists = (p) => access(p).then(() => true, () => false);

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
  const { html, head: rawHead, source } = await render(route);
  // Per-page OG image (npm run seo:og). Missing → fall back to the site-wide image rather than a 404.
  let head = rawHead;
  const og = ogImageFor(route.path);
  if (route.meta.indexable !== false && !(await exists(path.join(DIST, og)))) {
    console.warn(`[prerender] ⚠ ${og} missing — using /og-image.jpg (run npm run seo:og)`);
    head = head.split(`${SITE}${og}`).join(`${SITE}/og-image.jpg`);
  }
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

/* ── lastmod from git ───────────────────────────────────────────────────────── */
const git = (...args) => {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};
// Shallow clones (CI) only know the deploy commit — every file would get the same date, so use declared dates.
const gitUsable = git('rev-parse', '--is-shallow-repository') === 'false';
const lastmodFor = (route) => {
  const declared = route.lastmod;
  if (!gitUsable || !route.sources?.length) return declared;
  const iso = git('log', '-1', '--format=%cI', '--', ...route.sources);
  return iso ? iso.slice(0, 10) : declared;
};
console.log(`[prerender] lastmod source: ${gitUsable ? 'git history' : 'declared dates (shallow clone)'}`);

/* ── sitemaps (index + one per section) ───────────────────────────────────── */
const NL = '\n';
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const indexable = ROUTES.filter((r) => r.meta.indexable !== false);
const groups = [...new Set(indexable.map((r) => r.sitemap))];
const today = new Date().toISOString().slice(0, 10);
const groupLastmod = {};
for (const group of groups) {
  const routes = indexable.filter((r) => r.sitemap === group);
  const entries = routes.map((r) => {
    const loc = r.path === '/' ? `${SITE}/` : `${SITE}${r.path}`;
    const lastmod = lastmodFor(r);
    groupLastmod[group] = [groupLastmod[group], lastmod].filter(Boolean).sort().pop();
    const images = (r.images ?? [])
      .map((img) => [``, `    <image:image>`, `      <image:loc>${SITE}${img.src}</image:loc>`, `    </image:image>`].join(NL))
      .join('');
    return [`  <url>`, `    <loc>${xmlEsc(loc)}</loc>`, `    <lastmod>${lastmod}</lastmod>${images}`, `  </url>`].join(NL);
  });
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries,
    '</urlset>',
    '',
  ].join(NL);
  await writeFile(path.join(DIST, `sitemap-${group}.xml`), xml, 'utf8');
  console.log(`[prerender] sitemap-${group}.xml — ${routes.length} URLs`);
}
const index = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...groups.map((g) => [`  <sitemap>`, `    <loc>${SITE}/sitemap-${g}.xml</loc>`, `    <lastmod>${groupLastmod[g] ?? today}</lastmod>`, `  </sitemap>`].join(NL)),
  '</sitemapindex>',
  '',
].join(NL);
await writeFile(path.join(DIST, 'sitemap.xml'), index, 'utf8');
console.log(`[prerender] sitemap.xml — index of ${groups.length} sitemaps, ${indexable.length} URLs`);

/* ── AI / crawler text files ──────────────────────────────────────────────── */
let mdCount = 0;
for (const route of ROUTES) {
  const md = routeMarkdown(route);
  if (!md) continue;
  const dest = path.join(DIST, markdownFileFor(route));
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, md, 'utf8');
  mdCount++;
}
await writeFile(path.join(DIST, 'llms.txt'), llmsTxt(), 'utf8');
await writeFile(path.join(DIST, 'llms-full.txt'), llmsFullTxt(), 'utf8');
await writeFile(path.join(DIST, 'humans.txt'), humansTxt(), 'utf8');
// RFC 9116: Expires must be < 1 year out; regenerated on every deploy.
const expires = new Date(Date.now() + 364 * 24 * 3600 * 1000).toISOString().slice(0, 19) + 'Z';
await mkdir(path.join(DIST, '.well-known'), { recursive: true });
await writeFile(
  path.join(DIST, '.well-known', 'security.txt'),
  [`Contact: mailto:${SITE_FACTS.email}`, `Expires: ${expires}`, 'Preferred-Languages: en', `Canonical: ${SITE}/.well-known/security.txt`, ''].join(NL),
  'utf8',
);
console.log(`[prerender] llms.txt, llms-full.txt, humans.txt, .well-known/security.txt, ${mdCount} Markdown mirrors`);

await rm(path.join(ROOT, 'dist-server'), { recursive: true, force: true });
console.log('[prerender] ✔ done');
