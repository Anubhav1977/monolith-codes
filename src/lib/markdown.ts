/**
 * Build-time text outputs generated from the same content modules as the pages, so they never
 * drift: /llms.txt, /llms-full.txt, /humans.txt and a Markdown mirror (<path>.md) per key page.
 * Called from scripts/prerender.mjs via src/entry-server.tsx.
 */
import { SERVICES, getService } from '@/content/services';
import { GUIDES, type GuideBlock } from '@/content/guides';
import { CASE_STUDIES } from '@/content/work';
import { HOME_FAQS } from '@/content/faqs';
import { PRICING_TIERS } from '@/content/pricing';
import { getTestimonial } from '@/content/testimonials';
import { STAGES } from '@/sections/ProcessSection';
import { STARTING_PRICES } from '@/lib/pricing';
import { FOUNDERS, SITE, absoluteUrl, getFounder } from '@/lib/site';
import { ROUTES, getCaseStudy, getGuide, markdownPathFor, type RouteDef } from '@/lib/routes';

const url = (path: string) => absoluteUrl(path);
const priceLine = (tier: keyof typeof STARTING_PRICES | null) => {
  const p = tier ? STARTING_PRICES[tier] : null;
  return p ? `from ${p.USD} (${p.INR} in India)` : 'quoted per project';
};


const SUMMARY = `${SITE.displayName} is a founder-led custom software development studio based in India, working with clients in India and worldwide. It designs and hand-codes websites, web applications, SaaS platforms, mobile apps, ERP/CRM systems and AI automation — no templates, no WordPress or page builders — and hands over 100% of the source code and intellectual property. Websites start from $999 (₹12,999 in India) and take 2–4 weeks; web applications and SaaS MVPs start from $2,499 (₹29,999) and take 6–10 weeks; ERP/CRM and AI systems are quoted per project. Every project starts with a written scope and fixed quote.`;

const contactMd = () =>
  [
    `- Email: [${SITE.email}](mailto:${SITE.email})`,
    `- Phone / WhatsApp: [${SITE.phoneDisplay}](${SITE.whatsapp})`,
    `- Book a call: [${SITE.calendar}](${SITE.calendar})`,
    `- Project inquiry form: [${url('/')}#inquiry](${url('/')}#inquiry)`,
    `- LinkedIn: ${SITE.linkedin}`,
    `- Instagram: ${SITE.instagram}`,
    `- Location: ${SITE.footerLocationLine} (no public street address)`,
  ].join('\n');

const blockMd = (b: GuideBlock) => {
  if (typeof b === 'string') return b;
  if ('list' in b) return b.list.map((i) => `- ${i}`).join('\n');
  const { caption, head, rows } = b.table;
  return [`Table: ${caption}`, '', `| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n');
};

const frontMatter = (route: RouteDef) =>
  [`---`, `title: ${JSON.stringify(route.meta.title)}`, `description: ${JSON.stringify(route.meta.description)}`, `canonical: ${url(route.path)}`, `last_modified: ${route.lastmod}`, `---`, ''].join('\n');

/* ── Page bodies ───────────────────────────────────────────────────────────── */

const homeMd = () =>
  [
    `# ${SITE.name} — custom software development company in India`,
    '',
    SUMMARY,
    '',
    '## Services',
    ...SERVICES.map((s) => `- [${s.name}](${url(`/services/${s.slug}`)}) — ${priceLine(s.tier)}; ${s.timelineShort}. ${s.summary}`),
    '',
    '## Selected work',
    ...CASE_STUDIES.map((c) => `- [${c.title}](${url(`/work/${c.slug}`)}) — client: ${c.client}. ${c.problem ? `${c.problem} ` : ''}${c.solution}`),
    '',
    '## Founders',
    ...FOUNDERS.map((f) => `- ${f.name}, ${f.jobTitle}. ${f.bio}`),
    '',
    '## Frequently asked questions',
    ...HOME_FAQS.flatMap((f) => [`### ${f.question}`, '', f.answer, '']),
    '## Contact',
    contactMd(),
  ].join('\n');

const servicesMd = () =>
  [
    '# Custom software development services',
    '',
    `${SITE.displayName} designs and hand-codes websites, web applications, SaaS platforms, mobile apps, ERP/CRM systems and AI automation for businesses in India and internationally, and hands over 100% of the source code.`,
    '',
    ...SERVICES.flatMap((s) => [`## [${s.name}](${url(`/services/${s.slug}`)})`, '', s.summary, '', `- Price: ${priceLine(s.tier)}`, `- Timeline: ${s.timeline}`, '']),
  ].join('\n');

const serviceMd = (slug: string) => {
  const s = getService(slug)!;
  const work = CASE_STUDIES.filter((c) => c.services.includes(slug));
  return [
    `# ${s.h1}`,
    '',
    s.summary,
    '',
    `- Price: ${priceLine(s.tier)}`,
    `- Timeline: ${s.timeline}`,
    `- Location: ${SITE.footerLocationLine}`,
    '',
    '## Overview',
    '',
    ...s.intro.flatMap((p) => [p, '']),
    "## Who it's for",
    '',
    ...s.whoFor.map((w) => `- **${w.title}** — ${w.text}`),
    '',
    '## What you get',
    '',
    ...s.deliverables.map((d) => `- **${d.title}** — ${d.text}`),
    '',
    '## How the project runs',
    '',
    ...s.approach.map((a, i) => `${i + 1}. **${a.title}** — ${a.text}`),
    '',
    '## Technology',
    '',
    s.stack.join(', '),
    '',
    '## Price and timeline',
    '',
    s.pricingNote,
    '',
    ...(work.length ? ['## Related case studies', '', ...work.map((c) => `- [${c.title}](${url(`/work/${c.slug}`)})`), ''] : []),
    '## Frequently asked questions',
    '',
    ...s.faqs.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    '## Contact',
    '',
    contactMd(),
  ].join('\n');
};

const pricingMd = () =>
  [
    '# Pricing and process',
    '',
    'Custom websites start from $999 (₹12,999 in India) and take 2–4 weeks; web applications and SaaS MVPs start from $2,499 (₹29,999) and take 6–10 weeks; ERP/CRM and AI systems are quoted per project. Indian clients are quoted in INR and international clients in USD, with the same process and ownership terms. Every price is fixed in a written proposal before development begins.',
    '',
    '## Tiers',
    '',
    ...PRICING_TIERS.flatMap((t) => [
      `### ${t.name} — ${priceLine(t.id)}`,
      '',
      t.tagline,
      '',
      `- Timeline: ${t.sprintTimeline.replace(/\s+/g, ' ')}`,
      `- Ideal for: ${t.idealFor}`,
      ...t.features.map((f) => `- ${f}`),
      '',
    ]),
    '## 7-stage delivery process',
    '',
    ...STAGES.map((st, i) => `${i + 1}. **${st.title.charAt(0) + st.title.slice(1).toLowerCase()}** — ${st.summary} (${st.details.join('; ')})`),
    '',
    '## Terms',
    '',
    '- Payment: the proposal sets out the initial payment, milestones and due dates.',
    '- Delivery: deliverables and target timelines are agreed before development.',
    '- Scope & revisions: the proposal defines what is included; extra work is approved before it starts.',
    '- Post-launch support: agreed defect-fix support after launch; maintenance is scoped separately.',
  ].join('\n');

const aboutMd = () =>
  [
    `# About ${SITE.name}`,
    '',
    SITE.description,
    '',
    'Every project starts with a written scope and a fixed quote. Delivery is milestone-based on a staging link, decisions are documented in writing, and the complete source code, documentation and IP are handed over at the end — no licence fees and no lock-in.',
    '',
    '## Founders',
    '',
    ...FOUNDERS.flatMap((f) => [`### ${f.name} — ${f.jobTitle}`, '', f.bio, ...(f.linkedin ? ['', `LinkedIn: ${f.linkedin}`] : []), '']),
    '## Contact',
    '',
    contactMd(),
  ].join('\n');

const workMd = () =>
  [
    '# Case studies',
    '',
    ...CASE_STUDIES.flatMap((c) => [`## [${c.title}](${url(`/work/${c.slug}`)})`, '', `Client: ${c.client} · ${c.category}`, '', c.problem || c.solution, '']),
  ].join('\n');

const caseStudyMd = (slug: string) => {
  const c = getCaseStudy(slug)!;
  const t = getTestimonial(c.testimonialId);
  return [
    `# ${c.title}`,
    '',
    `- Client: ${c.client}`,
    `- Sector: ${c.sector}`,
    `- Category: ${c.category}`,
    '',
    ...(c.problem ? ['## The challenge', '', c.problem, ''] : []),
    '## What we built',
    '',
    c.solution,
    '',
    ...c.features.map((f) => `- ${f}`),
    '',
    ...(c.metrics.length ? ['## Results', '', ...c.metrics.map((m) => `- ${m.label}: ${m.value}`), ''] : []),
    '## Technology stack',
    '',
    c.stack.join(', '),
    '',
    ...(t ? ['## What the client said', '', `> ${t.quote}`, '', `— ${t.person ? `${t.person}, ` : ''}${t.company}, ${t.tagline}`, ''] : []),
    '## Related services',
    '',
    ...c.services.map((s) => `- [${getService(s)?.name}](${url(`/services/${s}`)})`),
  ].join('\n');
};

const guidesMd = () =>
  ['# Guides', '', ...GUIDES.flatMap((g) => [`## [${g.h1}](${url(`/guides/${g.slug}`)})`, '', g.summary, ''])].join('\n');

const guideMd = (slug: string) => {
  const g = getGuide(slug)!;
  const author = getFounder(g.author);
  return [
    `# ${g.h1}`,
    '',
    `By ${author ? `${author.name}, ${author.jobTitle}` : SITE.name} · Published ${g.published} · Updated ${g.updated}`,
    '',
    g.summary,
    '',
    ...g.sections.flatMap((sec) => [`## ${sec.heading}`, '', ...sec.blocks.flatMap((b) => [blockMd(b), ''])]),
    '## Related services',
    '',
    ...g.relatedServices.map((s) => `- [${getService(s)?.name}](${url(`/services/${s}`)})`),
  ].join('\n');
};

/** Markdown mirror of a route, or null when the route has none. */
export const routeMarkdown = (route: RouteDef): string | null => {
  if (!route.markdown) return null;
  const body = (() => {
    switch (route.page) {
      case 'home':
        return homeMd();
      case 'services':
        return servicesMd();
      case 'service':
        return serviceMd(route.slug!);
      case 'pricing':
        return pricingMd();
      case 'about':
        return aboutMd();
      case 'work':
        return workMd();
      case 'caseStudy':
        return caseStudyMd(route.slug!);
      case 'guides':
        return guidesMd();
      case 'guide':
        return guideMd(route.slug!);
      default:
        return null;
    }
  })();
  return body ? `${frontMatter(route)}${body}\n` : null;
};

export const markdownFileFor = (route: RouteDef) => markdownPathFor(route.path).slice(1);

/* ── llms.txt / llms-full.txt / humans.txt ────────────────────────────────── */

export const llmsTxt = () =>
  [
    `# ${SITE.name}`,
    '',
    `> ${SUMMARY}`,
    '',
    `Founders: ${FOUNDERS.map((f) => `${f.name} (${f.jobTitle})`).join(' and ')}. Every page below also has a Markdown version at the same URL with ".md" appended (home: /index.md).`,
    '',
    '## Services',
    `- [All services](${url('/services')}): overview, starting prices and timelines`,
    ...SERVICES.map((s) => `- [${s.name}](${url(`/services/${s.slug}`)}): ${priceLine(s.tier)}; timeline ${s.timelineShort}`),
    '',
    '## Work',
    `- [All case studies](${url('/work')})`,
    ...CASE_STUDIES.map((c) => `- [${c.title}](${url(`/work/${c.slug}`)}): ${c.client}, ${c.category.toLowerCase()}`),
    '',
    '## Process',
    `- [7-stage delivery process](${url('/pricing')}#process): written scope and fixed quote, milestone delivery on staging, full source-code handover`,
    '',
    '## Pricing',
    ...PRICING_TIERS.map((t) => `- ${t.name}: ${priceLine(t.id)} — ${t.tagline}`),
    `- [Pricing page](${url('/pricing')})`,
    '',
    '## Guides',
    ...GUIDES.map((g) => `- [${g.h1}](${url(`/guides/${g.slug}`)})`),
    '',
    '## Contact',
    contactMd(),
    '',
    '## Optional',
    `- [About ${SITE.name}](${url('/about')})`,
    `- [Full text of key pages](${url('/llms-full.txt')})`,
    `- [Privacy policy](${url('/privacy')})`,
    `- [Terms of use](${url('/terms')})`,
    '',
  ].join('\n');

export const llmsFullTxt = () =>
  [
    `# ${SITE.name} — full text of key pages`,
    '',
    `> ${SUMMARY}`,
    '',
    ...ROUTES.filter((r) => r.markdown).flatMap((r) => [`<!-- ${url(r.path)} -->`, '', (routeMarkdown(r) ?? '').replace(/^---[\s\S]*?---\n/, '').replace(/^# /m, '# ').trim(), '', '---', '']),
  ].join('\n');

export const humansTxt = () =>
  [
    '/* TEAM */',
    ...FOUNDERS.flatMap((f) => [`  ${f.jobTitle}: ${f.name}`, `  Site: ${url('/about')}`, ...(f.linkedin ? [`  LinkedIn: ${f.linkedin}`] : []), '']),
    `  Contact: ${SITE.email}`,
    `  Location: ${SITE.footerLocationLine}`,
    '',
    '/* SITE */',
    `  Last update: ${ROUTES.map((r) => r.lastmod).sort().pop()}`,
    '  Language: English (en-IN)',
    '  Standards: HTML5, CSS3, WAI-ARIA, Schema.org JSON-LD',
    '  Components: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Three.js',
    '  Hosting: Vercel',
    '  Software: hand-coded — no templates, no page builders',
    '',
  ].join('\n');
