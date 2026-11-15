/**
 * Generates committed SEO assets with the locally installed Chrome (no npm dependencies — talks to
 * Chrome over the DevTools protocol with Node's built-in WebSocket):
 *
 *   public/og/<page>.jpg           1200×630 Open Graph / Twitter image per route
 *   public/favicon.ico             16/32/48 px icons (PNG-in-ICO) from the official brandmark
 *
 * Run after changing page titles or adding pages:  npm run seo:assets
 * Chrome path: CHROME_PATH env, else the default Windows / macOS / Linux locations.
 */
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createServer } from 'vite';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');

/* ── content (loaded from the TS sources through Vite) ───────────────────── */
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { ROUTES, ogImageFor } = await vite.ssrLoadModule('/src/lib/routes.ts');
const { getService } = await vite.ssrLoadModule('/src/content/services.ts');
const { getGuide } = await vite.ssrLoadModule('/src/content/guides.ts');
const { getCaseStudy } = await vite.ssrLoadModule('/src/content/work.ts');
const { STARTING_PRICES } = await vite.ssrLoadModule('/src/lib/pricing.ts');
await vite.close();

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fileUrl = (p) => pathToFileURL(path.join(ROOT, p)).href;

const cardFor = (route) => {
  const base = { eyebrow: 'Software engineering studio', headline: route.meta.title.split(' | ')[0], facts: 'Based in India · Serving clients worldwide', image: null };
  switch (route.page) {
    case 'home':
      return { ...base, eyebrow: 'Custom software development · India', headline: 'Custom software, built to outgrow templates.', facts: 'Websites from $999 · Web apps & SaaS from $2,499 · 100% IP ownership' };
    case 'services':
      return { ...base, eyebrow: 'Services', headline: 'Websites, web apps, SaaS, mobile, ERP/CRM and AI — hand-coded.' };
    case 'service': {
      const s = getService(route.slug);
      const p = s.tier ? STARTING_PRICES[s.tier] : null;
      return { ...base, eyebrow: `Service · ${s.name}`, headline: s.h1, facts: `${p ? `From ${p.USD}` : 'Quoted per project'} · ${s.timelineShort} · Based in India` };
    }
    case 'pricing':
      return { ...base, eyebrow: 'Pricing & process', headline: 'Fixed-price proposals. Websites from $999, apps from $2,499.', facts: 'Launch · Grow · Build — INR for India, USD worldwide' };
    case 'about':
      return { ...base, eyebrow: 'About', headline: 'A founder-led software engineering studio in India.', facts: 'Anubhav Garg · Ankit Kumar' };
    case 'work':
      return { ...base, eyebrow: 'Selected work', headline: 'Case studies: custom software we have built.' };
    case 'caseStudy': {
      const c = getCaseStudy(route.slug);
      return { ...base, eyebrow: `Case study · ${c.category}`, headline: c.title, facts: c.stack.slice(0, 4).join(' · '), image: c.image ? c.image.src : null };
    }
    case 'guides':
      return { ...base, eyebrow: 'Guides', headline: 'Guides for planning and buying custom software.' };
    case 'guide': {
      const g = getGuide(route.slug);
      return { ...base, eyebrow: `Guide · ${g.readingMinutes} min read`, headline: g.h1 };
    }
    default:
      return base;
  }
};

const ogHtml = ({ eyebrow, headline, facts, image }) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Geist;src:url(${fileUrl('public/fonts/geist-latin.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:GeistMono;src:url(${fileUrl('public/fonts/geist-mono-latin.woff2')}) format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{background:#080A0C;color:#F4F3EE;font-family:Geist,system-ui,sans-serif;position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(244,243,238,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(244,243,238,.045) 1px,transparent 1px);background-size:60px 60px}
.glow{position:absolute;right:-220px;bottom:-260px;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,0,.32),transparent 65%)}
.bar{position:absolute;left:0;top:0;bottom:0;width:10px;background:#FF6B00}
.wrap{position:absolute;inset:0;padding:64px 72px 56px 82px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:18px}
.brand img{width:58px;height:auto}
.brand b{font-weight:600;font-size:26px;letter-spacing:.14em}
.eyebrow{max-width:${image ? 580 : 1000}px;margin-top:56px;font-family:GeistMono,monospace;font-size:20px;letter-spacing:.12em;text-transform:uppercase;color:#FF9A1F}
h1{margin-top:18px;font-weight:500;font-size:${image ? 50 : 60}px;line-height:1.06;letter-spacing:-.035em;max-width:${image ? 600 : 1000}px;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:32px;font-family:GeistMono,monospace;font-size:19px;color:#C4C3BE}
.foot span:last-child{color:#F4F3EE}
.shot{position:absolute;right:64px;top:150px;width:440px;border-radius:18px;overflow:hidden;border:1px solid #2B323C;box-shadow:0 40px 90px rgba(0,0,0,.6)}
.shot img{display:block;width:100%;height:auto}
</style></head><body><div class="grid"></div><div class="glow"></div><div class="bar"></div>
${image ? `<div class="shot"><img src="${fileUrl(`public${image}`)}"></div>` : ''}
<div class="wrap"><div class="brand"><img src="${fileUrl('assets-src/brand/monolith-mark.png')}"><b>MONOLITH CODES</b></div>
<div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(headline)}</h1>
<div class="foot"><span>${esc(facts)}</span><span>monolithcodes.com</span></div></div></body></html>`;

/* ── minimal Chrome DevTools Protocol client ───────────────────────────────── */
const chromePath =
  process.env.CHROME_PATH ||
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find((p) => existsSync(p));

const profile = await mkdtemp(path.join(os.tmpdir(), 'mc-assets-'));
const PORT = 9333;
const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--allow-file-access-from-files',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  'about:blank',
]);

let target;
for (let i = 0; i < 50 && !target; i++) {
  await new Promise((r) => setTimeout(r, 200));
  target = await fetch(`http://127.0.0.1:${PORT}/json/list`)
    .then((r) => r.json())
    .then((list) => list.find((t) => t.type === 'page'))
    .catch(() => undefined);
}
if (!target) throw new Error(`Could not start Chrome at ${chromePath}`);

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let seq = 0;
const pending = new Map();
const waiters = [];
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method) {
    for (const w of waiters.filter((w) => w.method === msg.method)) {
      waiters.splice(waiters.indexOf(w), 1);
      w.resolve(msg.params);
    }
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const once = (method) => new Promise((resolve) => waiters.push({ method, resolve }));

await send('Page.enable');
const load = async (html, width, height) => {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  const file = path.join(profile, 'card.html');
  await writeFile(file, html, 'utf8');
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url: pathToFileURL(file).href });
  await loaded;
  await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true });
};
const evalValue = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;

/* ── OG images ─────────────────────────────────────────────────────────────── */
await mkdir(path.join(PUBLIC, 'og'), { recursive: true });
for (const route of ROUTES) {
  await load(ogHtml(cardFor(route)), 1200, 630);
  const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 86, clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
  const out = path.join(PUBLIC, ogImageFor(route.path));
  await writeFile(out, Buffer.from(data, 'base64'));
  console.log(`[assets] ${path.relative(ROOT, out)}`);
}

/* ── resized images via canvas (favicon PNGs) ───────────── */
const resize = async (src, width, type, quality = 0.9) => {
  await load('<!doctype html><body></body>', 800, 600);
  const dataUrl = await evalValue(`new Promise((res, rej) => { const i = new Image(); i.onload = () => {
    const w = ${width}, h = Math.round(i.naturalHeight * w / i.naturalWidth);
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(i, 0, 0, w, h);
    res(c.toDataURL('${type}', ${quality})); }; i.onerror = rej; i.src = ${JSON.stringify(fileUrl(src))}; })`);
  return Buffer.from(dataUrl.split(',')[1], 'base64');
};

const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) pngs.push(await resize('public/icon-512.png', s, 'image/png'));
// ICO container with embedded PNGs.
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(sizes[i], e);
  header.writeUInt8(sizes[i], e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(png.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += png.length;
});
await writeFile(path.join(PUBLIC, 'favicon.ico'), Buffer.concat([header, ...pngs]));
console.log('[assets] public/favicon.ico (16, 32, 48)');


ws.close();
chrome.kill();
await new Promise((r) => setTimeout(r, 300));
await rm(profile, { recursive: true, force: true }).catch(() => {});
console.log('[assets] ✔ done');
