# monolithcodes.com SEO report (branch `seo-fixes`)

Date: 2026-11-15. The audit and baseline are in `seo/AUDIT.md`. The URL inventory is in `seo/url-inventory.csv` (`npm run seo:crawl`).

## 1. Scores

Lighthouse 12, mobile, simulated throttling. "Local" runs build each branch and serve it from the same local static server (clean URLs, real 404), so the before and after numbers are directly comparable. The live column is production before this work.

| Page | Live before (main) | Local before (main) | **Local after (seo-fixes)** |
|---|---|---|---|
| `/` | 61 / 96 / 100 / 100 · TBT 980 ms · LCP 3.7 s | 61 / 96 / 96 / 100 · TBT 470 ms · LCP 5.0 s | **71 / 100 / 96* / 100 · TBT 270 ms · LCP 4.7 s** |
| `/services/website-development` | 91 / 92 / 100 / 100 | 89 / 92 / 100 / 100 · TBT 90 ms | **89 / 100 / 100 / 100 · TBT 0 ms** |
| `/pricing` | 91 / 95 / 100 / 100 | 85 / 95 / 96 / 100 · TBT 160 ms | **88 / 100 / 96* / 100 · TBT 10 ms** |
| `/about` | 95 / 96 / 100 / 100 | 90 / 96 / 100 / 100 · TBT 100 ms | **90 / 100 / 100 / 100 · TBT 0 ms** |
| `/guides/custom-software-development-cost-india` | 96 / 96 / 100 / 100 | 92 / 96 / 100 / 100 · TBT 90 ms | **94 / 100 / 100 / 100 · TBT 0 ms** |
| `/work` (new) | — | — | 92 / 100 / 100 / 100 |
| `/work/estatepro-real-estate-app` (new) | — | — | 90 / 100 / 100 / 100 |

Scores are Performance / Accessibility / Best Practices / SEO. \* Locally, `/api/geo` returns 404 because the static server has no serverless functions, and that console error costs 4 Best Practices points. On Vercel the endpoint works (live Best Practices was 100). Local FCP/LCP are about 0.5 s slower than on Vercel's CDN (no HTTP/2, no Brotli), so expect live scores to be higher than the local column. Re-run Lighthouse on the live URLs after merging.

**Remaining performance gap on the homepage** (target 95+). The rest of the delay comes from design elements, which I didn't change, as you instructed:

1. **Intro screen.** On a first visit `#root` is hidden until JavaScript has loaded and the intro has played (about 1.6 s). The LCP element can't paint before that.
2. **Hero reveal.** The headline and bullets start off-screen or transparent and animate in after a 0.62 s delay. The LCP element is a hero bullet that appears at the end of that sequence.
3. **Heavy blurred layers** in the hero (`blur(50px)` glow, `blur(34px)` cone, a drop-shadowed 900 px logo) create a ~900 ms paint/raster task on a throttled mobile CPU.
4. **DOM size** (about 2,000 elements on home): the first style and layout pass takes about 500 ms.

Options that need your approval (each one changes something visible): (a) skip the intro for first-time mobile visitors, or show it only after the hero has painted; (b) render the hero copy visible at first paint and keep the animation for the logo only; (c) replace the CSS blur filters with pre-blurred images that look the same; (d) add `content-visibility: auto` to the below-the-fold homepage sections. With (a) and (b), I'd expect home to reach about 90–95.

**Bundle impact.** The entry chunk grew from 20.2 to 26.1 KB gzipped, because the route table now carries the case-study and pricing data used for client-side head updates. `HomePage` shrank from 27.8 to 26.5 KB gzipped. Three.js (122 KB gzipped) is still lazy-loaded only near the 3D section. Analytics is loaded on idle and only when enabled. Net first-load JavaScript on home is about +5 KB gzipped.

## 2. Changes by file

| Area | Files | Change |
|---|---|---|
| Single source of truth | `src/lib/site.ts` | Business facts, founders, social profiles and the site-wide Organization/Person/WebSite JSON-LD graph. Read by the footer, contact links, metadata, schema, llms/humans files and Markdown mirrors. |
| Content modules | `src/content/work.ts` (new), `testimonials.ts` (new), `pricing.ts` (new), `services.ts`, `guides.ts` | Case-study and testimonial data moved out of components. Pricing tiers are shared with the schema. 2 new FAQs per service. Guide authors added. New titles and descriptions. |
| Route table | `src/lib/routes.ts` | `/work` and `/work/<slug>` added. Per-route OG image, sitemap group, git sources for lastmod, image entries, Markdown flag. Structured data per page type (see §3). |
| Head | `src/components/Seo.tsx`, `index.html` | One connected `@graph` per page. `og:image`/`twitter:image` per page. `<link rel="alternate" type="text/markdown">`. `lang="en-IN"`, `og:locale:alternate en_GB`, favicon sizes. The hand-written JSON-LD was removed from `index.html`. |
| New pages | `src/pages/WorkPage.tsx`, `CaseStudyPage.tsx`, `registry.tsx` | Case-study index and detail pages (challenge, what we built, stack, metrics, testimonial, related services, more work, CTA), built from the existing design blocks. |
| Crawlable content | `src/sections/FaqSection.tsx`, `ProcessSection.tsx` | All 10 FAQ answers are in the HTML (collapsed with height/`inert`, so it looks the same). All 7 process stages are in the HTML as hidden ARIA tabpanels. |
| Internal links | `SelectedWorkSection.tsx`, `ServicePage.tsx`, `Navigation.tsx`, `Footer.tsx`, `GuidesPage.tsx` | Homepage case-study cards and modal link to `/work/<slug>`. Services link to their case studies. Nav "Work" and footer go to `/work`. The guides hub links to pricing, services and work. |
| Answer-first copy | `IntroSplit.tsx` (home), `PricingSection.tsx`, `ServicePage.tsx` (key-facts line) | Quotable summary with price-from, timeline and location. |
| Thin pages | `AboutUs.tsx`, `GuidesPage.tsx`, `WorkPage.tsx` | Factual copy built from existing site content (REVIEW). |
| Contact | `WhatsAppButton.tsx`, `InquirySection.tsx`, `WorkTogetherSection.tsx`, `InquiryForm.tsx` | **Bug fix:** the floating WhatsApp button opened `wa.me/9560693524` (no country code, and a different number from the one used everywhere else). It's now a real `<a>` to +91 92172 47687. All contacts come from config. |
| Build outputs | `scripts/prerender.mjs`, `src/lib/markdown.ts`, `src/entry-server.tsx` | Sitemap index + `sitemap-{pages,services,work,guides}.xml`, with lastmod from git history (declared dates on shallow clones) and image entries. `llms.txt`, `llms-full.txt`, 19 `.md` mirrors, `humans.txt`, `.well-known/security.txt` (Expires is regenerated on every deploy). Missing OG images fall back to the default image. |
| Crawl files | `public/robots.txt`, `public/manifest.webmanifest`, `public/llms.txt` (removed: now generated) | Named search and AI crawler groups. Training bots allowed. `/api/` disallowed. Manifest icon purposes and `lang` fixed. |
| Assets | `scripts/generate-seo-assets.mjs`, `public/og/*.jpg` (21), `public/favicon.ico` | Per-page 1200×630 OG cards and a 16/32/48 favicon, rendered with your local Chrome (`npm run seo:assets`, no new dependencies). |
| Hosting | `vercel.json` | `X-Robots-Tag: noindex, nofollow` on `*.vercel.app` hosts. The `/work` → `/#work` redirect was removed. `/case-studies` and `/portfolio` redirect to `/work`. Content types and cache headers for `.md`, llms, security, sitemaps and `/og`. |
| Performance | `src/main.tsx`, `src/video-theme-v2.css`, `index.html` | The first render is time-sliced (`startTransition`) instead of a single `flushSync` task. The hero shine and how-it-works shimmer now animate `transform` instead of `background-position`/`left`. Geist Mono is preloaded. |
| Accessibility | `src/index.css`, `src/video-theme-v3.css`, `ProcessSection.tsx`, `PricingSection.tsx`, `ServicePage.tsx`, `Footer.tsx` | AA text tokens (dark tertiary `#868A90`, light secondary `#5A5E62`, light tertiary `#5E6266`). `sr-only` h2 for pricing heading order. Underlined in-text link. Footer and FAQ text is selectable again. |
| Analytics | `src/lib/analytics.ts`, `App.tsx`, `InquiryForm.tsx`, `package.json` | `@vercel/analytics` and `@vercel/speed-insights`, loaded on idle behind env flags. Events: `generate_lead` {service, budget, currency}, `book_call`, `contact_email`, `contact_phone`, `contact_whatsapp`. No personal data is sent. |
| Tooling | `scripts/seo-crawl.mjs`, `scripts/indexnow.mjs`, `package.json` | `npm run seo:crawl` (offline crawl: titles, h1, canonical, JSON-LD validity, no Review markup, broken links, orphans, sitemap coverage). `npm run seo:indexnow` (follows the sitemap index). `npm run seo:assets`. |

**Visible changes** (all small, listed for your review): the case-study card titles are now links (orange on hover); the case-study modal has a "Read the full case study" link; nav "Work" opens `/work`; the footer link reads "Case Studies & Work"; the home "What is Monolith Codes?" paragraph and the pricing intro paragraph are longer (answer-first copy); the service hero line now shows price · timeline · location; there's one underlined link in the service process section; guide bylines name the author; the About and Guides hub pages have extra paragraphs; tertiary/secondary grey text is slightly lighter (dark theme) or darker (light theme) for contrast; the About tagline uses the secondary grey.

## 3. Structured data per page type

Every page carries one `@graph` with **Organization + ProfessionalService** (a single entity: country-only address, `areaServed` India + Worldwide, sales `contactPoint`, `sameAs`, `knowsAbout`, `hasOfferCatalog`), **Person** ×2 (founders) and **WebSite**, plus:

| Page type | Page nodes |
|---|---|
| Home | WebPage, FAQPage (10 Q&As matching the visible text) |
| Services hub | CollectionPage + ItemList, BreadcrumbList |
| Service | WebPage, Service (provider, areaServed, USD `Offer` with `priceSpecification.minPrice` where a tier price exists), FAQPage (6), BreadcrumbList |
| Pricing | WebPage, OfferCatalog (Launch from $999, Grow from $2,499, Build quoted), BreadcrumbList |
| About | AboutPage (mainEntity → Organization), BreadcrumbList |
| Work hub | CollectionPage + ItemList, BreadcrumbList |
| Case study | WebPage, CreativeWork (creator → Org, `sourceOrganization` = named client, `about` → related Service), BreadcrumbList |
| Guides hub | CollectionPage + ItemList, BreadcrumbList |
| Guide | WebPage, Article (author → Person, datePublished/Modified, image, publisher), BreadcrumbList |

There's no Review or AggregateRating markup; `seo:crawl` fails the build check if any appears. All JSON-LD parses, and the crawl reports 0 errors across 21 URLs. Please still run the Rich Results Test on the live URLs after deploying.

## 4. Keyword-to-page map (final)

| Page | Primary | Secondary |
|---|---|---|
| `/` | custom software development company in India | software development studio India; hire Indian software development studio; offshore custom software development India |
| `/services` | custom software development services | software development services India; React / Next.js development agency |
| `/services/website-development` | website development company in India | custom website development; React website development; hand-coded website |
| `/services/web-application-development` | web application development company | custom web app development India; customer portal / dashboard development |
| `/services/saas-development` | SaaS development company India | SaaS MVP development; multi-tenant SaaS; SaaS MVP cost |
| `/services/mobile-app-development` | mobile app development company India | iOS and Android app development; React Native development |
| `/services/erp-crm-development` | custom ERP development | custom CRM development; SAP / Salesforce integration |
| `/services/ai-automation` | AI automation services | AI agent development; LLM integration; document processing AI |
| `/pricing` | custom website cost India | SaaS development cost; software development pricing; fixed-price software project |
| `/about` | founder-led software studio India | Monolith Codes founders |
| `/work` + case studies | custom software case studies | real estate app development; fintech dashboard development; furniture website design |
| `/guides/custom-software-development-cost-india` | custom software development cost India | how much does a website cost India; SaaS MVP cost |
| `/guides/custom-erp-vs-off-the-shelf` | custom ERP vs off-the-shelf ERP | build vs buy ERP; Odoo vs custom ERP |

## 5. TODO(owner): facts I couldn't find in the code

1. **Founding date**: `src/lib/site.ts` → `foundingDate` (added to Organization schema once set).
2. **Legal entity name**: `site.ts` → `legalName`.
3. **Founder LinkedIn URLs**: `site.ts` → `FOUNDERS[].linkedin`. These feed Person `sameAs`, the About page links and guide author credibility.
4. **Extra profiles** (GitHub org, Clutch, GoodFirms, Crunchbase, X): `site.ts` → `extraProfiles`.
5. **Hindi support**: confirm before adding it to `ContactPoint.availableLanguage` (`site.ts` → `languages`).
6. **Testimonial attribution**: the name and role of each quoted person (`src/content/testimonials.ts` → `person`).
7. **Niketana**: the card says "E-COMMERCE", but no cart or checkout is described. Confirm the label (`src/content/work.ts`).
8. **EstatePro**: confirm that virtual tours, AI recommendations and investment tools are shipped features, not design concepts.
9. **Hartwell & Co.**: the stack lists PostgreSQL but no 3D library. Confirm the stack.
10. **Fintech case study**: add an anonymised project screenshot (it currently shows a "02" gradient placeholder).
11. **Footer "DPDP V2.1 ALIGNED"**: confirm this compliance claim or remove it (`src/sections/Footer.tsx`).
12. **WhatsApp number**: the floating button used `9560693524`. I changed it to +91 92172 47687 to match the brief. If 95606 93524 was deliberate, put it in `site.ts` with its `+91` prefix.

## 6. REVIEW(owner): copy I wrote (please proof-read)

- `src/content/services.ts`: 2 new FAQs per service (12 in total), built from published prices, timelines and stack.
- `src/content/guides.ts`: guide author set to Anubhav Garg on both guides. Confirm the author for each.
- `src/content/work.ts`: case-study feature bullets (taken from the published descriptions) and meta descriptions.
- `src/components/IntroSplit.tsx`: homepage answer-first paragraph.
- `src/sections/PricingSection.tsx`: pricing intro paragraph.
- `src/pages/AboutUs.tsx`: two new paragraphs (scope of work and prices, technology and integrations).
- `src/pages/WorkPage.tsx` and `src/pages/GuidesPage.tsx`: intro paragraphs.
- New titles and meta descriptions for every page (`src/lib/routes.ts`, `services.ts`, `guides.ts`, `work.ts`).

## 7. Content plan

**Guide topics** (one per buyer question, each linking to its service page):
1. Custom website vs WordPress: real costs over 3 years (→ website development)
2. How much does a SaaS MVP cost, and what's included? (→ SaaS)
3. Hiring an Indian software development studio: a checklist for founders abroad (→ home, about)
4. Fixed-price vs time-and-materials software contracts (→ pricing)
5. React Native vs native iOS/Android for a business app (→ mobile)
6. When to replace spreadsheets with a custom web app (→ web apps, ERP)
7. Integrating with SAP / Salesforce without replacing them (→ ERP & CRM)
8. Practical AI automation use cases for small and mid-sized businesses (→ AI & automation)
9. What a website handover should include: code, IP, hosting and documentation (→ about, pricing)
10. Core Web Vitals for business owners: why site speed affects leads (→ website development)

**Case studies to expand:** add measurable outcomes where clients approve them (leads, conversion, load time), a project timeline, before/after screenshots, and a named quote for each. The fintech study needs an anonymised screenshot.

## 8. Manual steps for you

**Vercel** (Project → Settings):
1. **Domains:** set `www.monolithcodes.com` to **redirect to `monolithcodes.com` with 308 (permanent)**. It currently returns a 307 (temporary), and `http://www` takes two hops.
2. **Analytics:** enable *Web Analytics* and *Speed Insights*, then add the environment variables **`VITE_VERCEL_ANALYTICS=true`** and **`VITE_VERCEL_SPEED_INSIGHTS=true`** (Production only). Leave them unset until the products are enabled, otherwise `/_vercel/*` returns 404. Custom events (`generate_lead` etc.) need a plan that supports them.
3. Merge `seo-fixes` into `main` (Vercel deploys it), or check the preview deployment first:
   - `curl -sI https://<preview>.vercel.app/ | grep -i x-robots` should show `noindex, nofollow`.
   - `curl -sI https://monolithcodes.com/ | grep -i x-robots` should show nothing.
   - `/work`, `/llms.txt`, `/sitemap.xml`, `/index.md` and `/.well-known/security.txt` should all return 200.
4. After the production deploy, run **`npm run seo:indexnow`**, then re-run Lighthouse and the Rich Results Test on `/`, a service page, `/pricing`, a guide and a case study.

**Google Search Console:**
1. Add a **Domain** property for `monolithcodes.com` and verify it with the **DNS TXT** record at GoDaddy (it currently shows "Not verified"). The existing HTML-file verification (`google1757f6c586a2a625.html`) stays deployed.
2. Submit `https://monolithcodes.com/sitemap.xml` (the index; the child sitemaps are discovered automatically).
3. URL-inspect and request indexing for: `/`, `/services`, the 6 service pages, `/pricing`, `/about`, `/work` and the 5 case studies.

**Bing Webmaster Tools:** import the site from Search Console and run `npm run seo:indexnow` after each deploy.

**Off-site:**
- Set up a Google Business Profile as a **service-area business** with the address hidden, category "Software company", service areas India plus your main export markets.
- Create or align profiles with the same name, description and URL: LinkedIn company page (exists), Clutch, GoodFirms, DesignRush, Crunchbase, GitHub org, Behance/Dribbble. Then add the URLs to `SITE.extraProfiles`.
- Ask the approved clients for reviews on Clutch and Google. Keep testimonials on the site as visible content only.

**Optional:**
- Add `includeSubDomains` to HSTS only once every subdomain (including any mail/GoDaddy subdomains) serves HTTPS.
- When adding or renaming pages, run `npm run seo:assets` (needs Chrome locally) and commit the new `public/og/*.jpg`.
