# monolithcodes.com SEO, AI-search and performance audit

Audit date: 2026-11-15 · Branch: `seo-fixes` · Sources: the repository at `main` (f48456a), its production build, and the live site (https://monolithcodes.com).

## 0. Baseline scores (Lighthouse 12, mobile, live production)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS | FCP |
|---|---|---|---|---|---|---|---|---|
| `/` | **61** | 96 | 100 | 100 | 3.7 s | **980 ms** | 0 | 2.6 s |
| `/services/website-development` | 91 | 92 | 100 | 100 | 2.7 s | 220 ms | 0 | 2.0 s |
| `/pricing` | 91 | 95 | 100 | 100 | 2.6 s | 250 ms | 0 | 2.0 s |
| `/about` | 95 | 96 | 100 | 100 | 2.3 s | 140 ms | 0.006 | 2.0 s |
| `/guides/custom-software-development-cost-india` | 96 | 96 | 100 | 100 | 2.1 s | 110 ms | 0 | 2.0 s |

The site publicly promises a "99+ Lighthouse performance target" (`src/components/StatsScatter.tsx:8`, `src/sections/WhyCustomSection.tsx:20`) and a "Sub-200ms TBT target" (`src/sections/ProductStackSection.tsx:77`). The homepage misses both.

## 1. Stack and rendering

- React 19 + Vite 6 + Tailwind 4. A custom path router (`src/lib/router.ts`) works from a route table (`src/lib/routes.ts`).
- **Rendering: build-time prerender (SSG) for every route.** `scripts/prerender.mjs` renders each route with `renderToString` into `dist/<path>.html` and writes `dist/sitemap.xml`. Vercel serves the files with `cleanUrls`. In the browser, `createRoot` re-renders the page and replaces the prerendered markup; it does not hydrate it.
- `curl` without JavaScript: every route returns its full copy, headings, footer and JSON-LD, **except the homepage FAQ answers** (see C1).
- 3D: `three` (478 KB, 122 KB gzipped) is already split out and loaded only when `OwnershipSection` comes near the viewport. Motion: `framer-motion` is loaded on every page (139 KB, 46 KB gzipped). There's no GSAP or Lenis.
- Third parties: none. There's no analytics, and cal.com is only linked, not embedded.
- Fonts: self-hosted woff2 for Geist, Geist Mono and Lora Italic (3 families). Only `geist-latin` is preloaded.

## 2. Facts found in code (vs the brief)

| Fact | Found | Source |
|---|---|---|
| Brand, email, phone, WhatsApp, booking, LinkedIn, Instagram | match the brief | `src/lib/site.ts:2-16`, `src/sections/InquirySection.tsx:95` |
| Founders and titles | match | `index.html` JSON-LD, `src/pages/AboutUs.tsx:18-31` |
| Prices | Launch ₹12,999 / $999, Grow ₹29,999 / $2,499, Build quoted | `src/lib/pricing.ts:7-11` |
| Location | India, no street address | `src/lib/site.ts:14` |
| Founding year | **not found** → TODO(owner) | — |
| GitHub org, X/Twitter, Clutch, etc. | **not found** → TODO(owner) | — |
| Founder LinkedIn profiles | **not found** → TODO(owner) | — |
| Legal entity name | **not found** → TODO(owner) | — |
| Analytics IDs | none | — |
| Search Console verification file | `public/google1757f6c586a2a625.html` | — |
| IndexNow key | `public/1fc61e64e5f97ce7d44617ef492ac278.txt` | `scripts/indexnow.mjs` |
| Logo files | `assets-src/brand/monolith-mark.png`, `public/assets/brand/monolith-mark.webp`, `monolith-3d-logo.webp`, `icon-512.png` | — |
| Existing schema | Organization, 2× Person, WebSite, ProfessionalService (separate node), WebPage per route, Service, Article (Organization author), BreadcrumbList, FAQPage (home) | `index.html:54-176`, `src/lib/routes.ts` |

Mismatches to confirm:

- **Niketana** is labelled "CORPORATE WEBSITE & E-COMMERCE" (`SelectedWorkSection.tsx:24`), but the description only mentions product categories, galleries and an enquiry flow. It doesn't mention a cart or checkout. → TODO(owner): confirm whether it is e-commerce.
- **Hartwell & Co.** is described as an "immersive 3D" site, but its stack lists `PostgreSQL` and no 3D library (`SelectedWorkSection.tsx:73`). → TODO(owner): confirm the stack.
- **EstatePro** is described as a "mobile application **UI** designed to…" and lists "AI-powered recommendations, virtual tours, investment tools". → TODO(owner): confirm these were built and shipped, not only designed.
- The footer badge "DPDP V2.1 ALIGNED" (`Footer.tsx:162`) is a compliance claim with a version number that isn't sourced anywhere in the code. → TODO(owner): confirm it, or remove it.

## 3. Findings

### Critical

| # | Page | Evidence | Fix |
|---|---|---|---|
| C1 | `/` | The FAQ accordion renders an answer only while it's open (`FaqSection.tsx:73`, `AnimatePresence`). In the live HTML, 9 of the 10 answers appear only inside the FAQPage JSON-LD, so the markup doesn't match the visible content and non-JS crawlers can't see the answers. | Keep every answer in the DOM and collapse it with height/visibility. The JSON-LD then matches the visible text. |
| C2 | `/work`, case studies | `/work` returns 307 → `/#work`. The five case studies exist only inside a homepage carousel and modal, so the proof has no URLs and can't rank or be cited. | Add a `/work` index and `/work/<slug>` pages built from one content module, link to them from the homepage cards, services and the footer, and remove the redirect. |
| C3 | `/` | Performance 61, TBT 980 ms (one 998 ms document task, plus a 727 ms task when `createRoot` re-renders the whole page synchronously inside `flushSync`), LCP 3.7 s (1.66 s render delay), main-thread work 8.8 s. Infinite animations of non-composited properties (`background-position`, `left`, `box-shadow`) repaint every frame. | Render on boot in a transition so React yields to input. Make the shine/shimmer animations composited. Add a mobile-sized hero image via `srcset`. Load analytics on idle. The remaining LCP gap comes from the intro screen and the hero fade-in, which is a design decision (see report). |
| C4 | all, non-canonical hosts | `*.vercel.app` and preview deployments don't send `X-Robots-Tag: noindex`, so duplicate copies of the site can be indexed. | Add a host-matched `X-Robots-Tag: noindex, nofollow` header in `vercel.json`. |

### High

| # | Page | Evidence | Fix |
|---|---|---|---|
| H1 | 12 pages | Titles over 60 characters (up to 83) and 14 meta descriptions over 160 characters (up to 195). See `seo/url-inventory.csv`. | Rewrite titles to ≤ 60 and descriptions to 140–160, each with a CTA. |
| H2 | host | `https://www.` returns **307** (temporary), and `http://www.` takes 2 hops (`http://www` → `https://www` → apex). | Vercel dashboard: set the www domain to a 308 permanent redirect to the apex (manual step). |
| H3 | all | `<html lang="en">` and `inLanguage: "en"`. | Use `en-IN` everywhere (no hreflang, since there's a single English version). |
| H4 | all | Contrast fails on every page: tertiary text `#70747A` on `#080A0C` is 4.21:1 (needs 4.5). The light theme tertiary `#7D8185` is 3.0–3.6:1. A link inside body text is distinguished by colour only (`ServicePage.tsx:95`). Heading order on `/pricing` skips h2. | Adjust the tertiary/secondary tokens centrally, underline the inline link, add an `sr-only` h2 on pricing. |
| H5 | root | `/llms-full.txt`, `.md` mirrors, `/humans.txt` and `/.well-known/security.txt` all return 404. `llms.txt` is hand-written and already drifts from the content. | Generate all of them at build time from the content modules. |
| H6 | guides | Articles are authored by the Organization with a generic byline "By the MONOLITH CODES engineering team". Person entities have no `sameAs`. | Use a Person author with a visible byline and published/updated dates. Founder LinkedIn URLs: TODO(owner). |
| H7 | all | Every page shares one `og-image.jpg`. | Generate a 1200×630 OG image per page. |
| H8 | `/pricing`, services | There's no Offer schema for the Launch and Grow tiers. Service offers mix INR and USD (the brief says USD). | Add an `OfferCatalog` with USD `priceSpecification.minPrice` on `/pricing`, and USD offers on services. |
| H9 | `/`, `/pricing` | There's no quotable answer-first summary with prices, timelines and location. | Add short factual summary copy at the top of each. |
| H10 | site | There's no analytics or conversion tracking. | Add Vercel Web Analytics and Speed Insights (loaded on idle) with `generate_lead`, `book_call`, `contact_email`, `contact_phone` and `contact_whatsapp` events. |

### Medium

| # | Page | Evidence | Fix |
|---|---|---|---|
| M1 | sitemap | `lastmod` is a hard-coded constant, there are no image entries except home, and it's one flat file. | Use git last-commit dates per source file, add image entries, and split into a sitemap index (pages, services, guides, work). |
| M2 | robots.txt | A generic `*` group only. AI crawlers aren't named. | Name the search and AI user agents explicitly (allow), allow training bots (owner default), and disallow `/api/`. |
| M3 | IndexNow | The script exists, but the npm script is `indexnow` (not `seo:indexnow`), and it only reads a flat sitemap. | Rename the script and follow the sitemap index. |
| M4 | code | Business facts are duplicated in `index.html` JSON-LD, `Footer.tsx`, `InquirySection.tsx`, `WorkTogetherSection.tsx` and `public/llms.txt`. | Make `src/lib/site.ts` the single source and generate the site-wide JSON-LD from it. |
| M5 | all | `select-none` on the whole `<footer>` blocks copying the contact details and studio description. FAQ question buttons are also `select-none`. | Remove it from text, and keep it only on decorative type. |
| M6 | `/about`, `/guides` | Thin: about 80 and 20 words of unique copy beyond navigation and footer. | Add factual copy (REVIEW(owner)). |
| M7 | `/` | Testimonials have no named person or role. | TODO(owner): names and roles with permission. Keep them as visible content only, with no Review markup. |
| M8 | schema | Organization and ProfessionalService are two nodes. There's no `legalName` or `foundingDate`. | Merge into one entity, `["Organization","ProfessionalService"]`. Mark unknown fields TODO(owner). |
| M9 | manifest | `apple-touch-icon.png` is declared `maskable` (it isn't padded for that), and `lang` is `en`. | Fix the purposes and set `lang` to `en-IN`. |
| M10 | services | 4 FAQs each (the brief asks for 4–6), and related work links to `/#work` instead of the projects. | Add service-specific FAQs (REVIEW(owner)) and link to `/work/<slug>`. |
| M11 | images | The hero logo is 900 px wide but shown at about 380 px on mobile (Lighthouse: 75 KiB wasted). Case-study `<img>` elements have no width/height. | Add a responsive `srcset` and explicit dimensions. |

### Low

| # | Evidence | Fix |
|---|---|---|
| L1 | Fonts: 3 families (the brief says ≤ 2). Lora Italic is a design font. | Kept to avoid a visual change; flagged in the report. |
| L2 | HSTS is Vercel's default (`max-age=63072000`, no `includeSubDomains`). | Left as is, because preload/includeSubDomains can break any non-HTTPS subdomain at GoDaddy. Optional manual step. |
| L3 | `/contact` → `/#inquiry` (307). | Kept. It's a convenience redirect, not an indexable page. |
| L4 | `og:locale:alternate` lists only `en_US`. | Add `en_GB`. |

## 4. URL inventory (baseline)

See `seo/url-inventory.csv` (regenerate with `npm run seo:crawl`). Baseline: 15 indexable URLs, all 200, all in the sitemap, one h1 each, self-canonical. The weakest internal linking is to guides (5–6 inlinks each). Content that lived only in homepage sections with no URL of its own: case studies (`/#work`), testimonials, the technical-proof section and the FAQ (`/#faq`).

## 5. Keyword-to-page map (proposal)

| Page | Primary | Secondary |
|---|---|---|
| `/` | custom software development company in India | software development studio India; hire Indian software development studio; offshore custom software development India; custom web app development |
| `/services` | custom software development services | software development services India; custom software company; React / Next.js development agency |
| `/services/website-development` | website development company in India | custom website development; React website development; business website design India; hand-coded website |
| `/services/web-application-development` | web application development company | custom web app development India; customer portal development; internal tools development; dashboard development |
| `/services/saas-development` | SaaS development company India | SaaS MVP development; multi-tenant SaaS; SaaS product development; hire SaaS developers |
| `/services/mobile-app-development` | mobile app development company India | iOS and Android app development; React Native development; cross-platform app development |
| `/services/erp-crm-development` | custom ERP development | custom CRM development; ERP software development India; SAP / Salesforce integration |
| `/services/ai-automation` | AI automation services | AI agent development; LLM integration; business process automation; document processing AI |
| `/pricing` | custom website cost India | SaaS development cost; software development pricing; web app development cost; fixed-price software project |
| `/about` | founder-led software studio India | Monolith Codes founders; software engineering studio |
| `/work` | custom software case studies | web development portfolio India; SaaS dashboard case study; real estate app development |
| `/guides` | custom software buying guide | software development guides; build vs buy software |
| `/guides/custom-software-development-cost-india` | custom software development cost India | software development cost; how much does a website cost India; SaaS MVP cost |
| `/guides/custom-erp-vs-off-the-shelf` | custom ERP vs off-the-shelf ERP | custom ERP vs SAP; build vs buy ERP; Odoo vs custom ERP |

Cannibalisation risk: `/services` vs `/` (both "custom software development … India"). Mitigation: home targets the *company* intent and `/services` targets the *services list* intent, with distinct titles.

## 6. Accessibility quick pass

- Skip link, landmarks and one h1 per page: present. Keyboard: the FAQ uses real `<button aria-expanded>`, service FAQs use `<details>`, and the carousel has labelled prev/next/dot buttons. The case-study modal has `role="dialog"` and closes on Escape.
- `prefers-reduced-motion`: respected in the hero, intro and 3D (`useReducedMotion`).
- Failures: the contrast and link-in-text issues (H4), and text selection blocked in the footer and on the FAQ questions (M5).
- Light theme: orange `#E85D00` text on light surfaces is 2.7–3.2:1. It's used for small mono labels. → This is a brand colour decision, so it's flagged in the report and not changed.
