/**
 * Offline SEO crawl of the production build (run after `npm run build`):  npm run seo:crawl
 *
 * Reads every prerendered page in dist/, follows internal links from "/", and checks:
 *   title / description length, single <h1>, canonical, robots, JSON-LD validity,
 *   forbidden Review/AggregateRating markup, broken internal links, orphan pages and
 *   sitemap coverage. Writes seo/url-inventory.csv and exits non-zero on hard errors.
 */
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://monolithcodes.com';

const walk = async (dir) => {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'assets' && e.name !== 'fonts' && e.name !== '.vite') out.push(...(await walk(p)));
    } else if (e.name.endsWith('.html') && !e.name.startsWith('google')) out.push(p);
  }
  return out;
};

const fileToPath = (file) => {
  const rel = path.relative(DIST, file).replace(/\\/g, '/').replace(/\.html$/, '');
  return rel === 'index' ? '/' : `/${rel}`;
};

const pick = (html, re) => (html.match(re) || [])[1];
const decode = (s = '') =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");

const files = await walk(DIST);
const pages = new Map();
for (const f of files) {
  const p = fileToPath(f);
  if (p === '/404') continue;
  pages.set(p, await readFile(f, 'utf8'));
}

const sitemapXml = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8').catch(() => '');
const sitemapFiles = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let sitemapUrls = [];
for (const loc of sitemapFiles) {
  if (loc.endsWith('.xml')) {
    const child = await readFile(path.join(DIST, loc.replace(SITE, '')), 'utf8').catch(() => '');
    sitemapUrls.push(...[...child.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  } else sitemapUrls.push(loc);
}
sitemapUrls = sitemapUrls.map((u) => u.replace(SITE, '') || '/');

const errors = [];
const warn = [];
const inlinks = new Map([...pages.keys()].map((k) => [k, 0]));
const rows = [];

for (const [p, html] of pages) {
  const title = decode(pick(html, /<title>([^<]*)<\/title>/));
  const desc = decode(pick(html, /<meta name="description" content="([^"]*)"/));
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const robots = pick(html, /<meta name="robots" content="([^"]*)"/) || '';
  const lang = pick(html, /<html lang="([^"]*)"/);
  const root = html.slice(html.indexOf('<div id="root"'));
  const h1s = (root.match(/<h1[\s>]/g) || []).length;
  const text = root
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const imgs = [...root.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((i) => !/\balt="/.test(i)).length;

  const links = [...root.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((m) => decode(m[1]));
  const internal = new Set();
  for (const href of links) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const target = href.split(/[?#]/)[0] || '/';
    if (/\.(xml|txt|md|pdf|png|jpe?g|webp|svg|ico|json|webmanifest)$/.test(target)) continue;
    internal.add(target);
  }
  for (const t of internal) {
    if (t === p) continue;
    if (!pages.has(t)) errors.push(`${p}: broken internal link → ${t}`);
    else inlinks.set(t, inlinks.get(t) + 1);
  }

  // JSON-LD
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = [];
  for (const block of ld) {
    try {
      const data = JSON.parse(block);
      const graph = data['@graph'] ?? [data];
      for (const n of graph) types.push([].concat(n['@type']).join('+'));
      if (/"@type":"(Review|AggregateRating)"/.test(JSON.stringify(data))) errors.push(`${p}: Review/AggregateRating markup present`);
    } catch (e) {
      errors.push(`${p}: invalid JSON-LD (${e.message})`);
    }
  }

  const indexable = !/noindex/.test(robots);
  if (!title) errors.push(`${p}: missing <title>`);
  else if (title.length > 60) warn.push(`${p}: title ${title.length} chars`);
  if (!desc) errors.push(`${p}: missing meta description`);
  else if (desc.length < 120 || desc.length > 160) warn.push(`${p}: description ${desc.length} chars`);
  if (h1s !== 1) errors.push(`${p}: ${h1s} <h1> elements`);
  if (indexable && canonical !== `${SITE}${p === '/' ? '/' : p}`) errors.push(`${p}: canonical ${canonical}`);
  if (indexable && !sitemapUrls.includes(p)) errors.push(`${p}: indexable but missing from sitemap`);
  if (noAlt) errors.push(`${p}: ${noAlt} <img> without alt`);

  rows.push({ p, status: 200, title, tl: title?.length ?? 0, dl: desc?.length ?? 0, canonical, robots, lang, h1s, words, ld: types.join(' '), out: internal.size });
}

for (const u of sitemapUrls) if (!pages.has(u)) errors.push(`sitemap lists ${u} but no page was built`);
for (const [p, n] of inlinks) if (p !== '/' && n === 0) errors.push(`${p}: orphan page (no internal inlinks)`);

const csvEsc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const header = 'url,status,title,title_len,desc_len,canonical,robots,lang,h1_count,words,in_sitemap,inlinks,outlinks,jsonld_types';
const csv = [header]
  .concat(
    rows
      .sort((a, b) => a.p.localeCompare(b.p))
      .map((r) =>
        [SITE + (r.p === '/' ? '/' : r.p), r.status, r.title, r.tl, r.dl, r.canonical, r.robots, r.lang, r.h1s, r.words, sitemapUrls.includes(r.p) ? 'yes' : 'no', inlinks.get(r.p), r.out, r.ld]
          .map(csvEsc)
          .join(','),
      ),
  )
  .join('\n');
await mkdir(path.join(ROOT, 'seo'), { recursive: true });
await writeFile(path.join(ROOT, 'seo', 'url-inventory.csv'), `${csv}\n`, 'utf8');

console.log(`[seo-crawl] ${pages.size} pages · ${sitemapUrls.length} sitemap URLs → seo/url-inventory.csv`);
for (const r of rows.sort((a, b) => a.p.localeCompare(b.p)))
  console.log(`  ${r.p.padEnd(50)} t${String(r.tl).padStart(3)} d${String(r.dl).padStart(4)} h1:${r.h1s} ${String(r.words).padStart(5)}w in:${String(inlinks.get(r.p)).padStart(2)} out:${String(r.out).padStart(2)}  ${r.ld}`);
warn.forEach((w) => console.log(`  ⚠ ${w}`));
errors.forEach((e) => console.log(`  ✖ ${e}`));
if (errors.length) process.exit(1);
console.log('[seo-crawl] ✔ no errors');
