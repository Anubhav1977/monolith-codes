/**
 * Service landing pages (/services/<slug>).
 *
 * Content rules (AGENTS.md §23–24): no invented clients, metrics or outcomes. Prices and timelines
 * come from the published tiers (src/lib/pricing.ts, PricingSection); related case studies come
 * from src/content/work.ts. Edit copy here — pages, sitemap and structured data follow.
 */

export type PriceTier = 'launch' | 'grow' | 'build';

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceContent {
  slug: string;
  /** Short name used in nav, breadcrumbs and cards. */
  name: string;
  /** schema.org Service.serviceType */
  serviceType: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /** One-sentence answer to "what is this service" — first paragraph, written to be quotable. */
  summary: string;
  intro: string[];
  whoFor: { title: string; text: string }[];
  deliverables: { title: string; text: string }[];
  approach: { title: string; text: string }[];
  stack: string[];
  /** Published tier this service is usually scoped under; `null` = quoted per project. */
  tier: PriceTier | null;
  /** Short timeline for key-facts lines, e.g. "2–4 weeks". */
  timelineShort: string;
  timeline: string;
  pricingNote: string;
  faqs: ServiceFaq[];
  image: { src: string; width: number; height: number; alt: string };
  /** ISO date of the last meaningful content change (sitemap lastmod). */
  updated: string;
}

const UPDATED = '2026-11-15';

export const SERVICES: ServiceContent[] = [
  {
    slug: 'website-development',
    name: 'Website Development',
    serviceType: 'Custom website development',
    metaTitle: 'Website Development Company in India | Monolith Codes',
    metaDescription:
      'Hand-coded React websites that load fast, rank well and are 100% yours. Website development from India for clients worldwide, from $999. Get a fixed quote.',
    eyebrow: 'Service / 01 — Websites',
    h1: 'Custom website development for businesses that need more than a template',
    summary:
      'MONOLITH CODES designs and hand-codes business websites in React and TypeScript — no WordPress, no page builders — so your site loads fast, ranks well and stays fully owned by you.',
    intro: [
      'A website is usually the first system a prospective customer touches. Template sites look acceptable on day one, then slow down as plugins pile up, break on updates and leave you renting a theme you never really own. We build the site from scratch around your offer, your content and the action you want visitors to take.',
      'We are a software engineering studio based in India and work with businesses in India and internationally. Every website ships with clean, documented source code, a Git repository you own, and performance and SEO foundations built in rather than bolted on.',
    ],
    whoFor: [
      { title: 'Businesses outgrowing a template', text: 'Your WordPress or builder site is slow, hard to change, or full of plugins nobody wants to touch.' },
      { title: 'Companies launching a new brand or product', text: 'You need a site that explains a considered offer clearly and turns visitors into qualified enquiries.' },
      { title: 'Teams that care about search visibility', text: 'You want server-rendered pages, clean URLs, structured data and fast load times from the start.' },
    ],
    deliverables: [
      { title: 'Information architecture & copy structure', text: 'Page map, section order and calls to action planned around how your buyers decide.' },
      { title: 'Custom design & component system', text: 'A design built for your brand, implemented as reusable React components with light and dark themes.' },
      { title: 'Technical SEO foundations', text: 'Prerendered HTML, per-page titles and descriptions, canonical URLs, XML sitemap, Open Graph tags and Schema.org markup.' },
      { title: 'Performance engineering', text: 'Optimised images, minimal JavaScript and font loading tuned for good Core Web Vitals (LCP, INP and CLS).' },
      { title: 'Forms & integrations', text: 'Enquiry forms with validation and spam protection, email delivery, analytics, CRM or WhatsApp hand-off where needed.' },
      { title: 'Handover', text: 'Full source code, deployment set-up on your hosting (e.g. Vercel) and documentation for future changes.' },
    ],
    approach: [
      { title: 'Scope', text: 'A short discovery call, an audit of your current site and a written scope with a fixed quote.' },
      { title: 'Design', text: 'Structure and visual direction agreed before development starts, so changes stay cheap.' },
      { title: 'Build', text: 'Hand-coded pages, responsive across mobile, tablet and desktop, reviewed on a staging link.' },
      { title: 'Launch', text: 'Domain and DNS set-up, redirects from old URLs, Search Console submission and a post-launch check.' },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vercel', 'Headless CMS (optional)'],
    tier: 'launch',
    timelineShort: '2–4 weeks',
    timeline: 'Typically 2–4 weeks, depending on the number of pages and how quickly content is ready.',
    pricingNote: 'Website projects usually fall under our Launch tier. The final price depends on page count, content and integrations, and is fixed in a written proposal before work begins.',
    faqs: [
      { q: 'Do you build websites with WordPress?', a: 'No. Every site is hand-coded in React and TypeScript. That removes plugin bloat and theme lock-in, and gives you a codebase any competent developer can maintain.' },
      { q: 'Will I be able to edit content myself?', a: 'Yes, if you need to. We can connect a headless CMS so your team can edit text and images without touching code. Simpler sites can be edited directly in the repository.' },
      { q: 'Is SEO included?', a: 'Technical SEO foundations are included: prerendered pages, titles and meta descriptions, canonical URLs, sitemap, structured data and performance tuning. Ongoing content marketing is not part of a website build.' },
      { q: 'Do you work with clients outside India?', a: 'Yes. We are based in India and work with clients in India and internationally, quoting in INR or USD.' },
      // REVIEW(owner): the two FAQs below were written from published pricing/process content.
      { q: "How long does a custom website take?", a: "Most business websites take 2–4 weeks from approved scope to launch. The main variables are the number of pages and how quickly content and feedback arrive." },
      { q: "What does a custom website cost?", a: "Website projects start from ₹12,999 for clients in India and $999 for international clients under our Launch tier. The exact price is fixed in a written proposal after a short scope call." },
    ],
    image: { src: '/assets/images/services/web-experiences.webp', width: 1000, height: 545, alt: 'Custom website interface designed and built by MONOLITH CODES' },
    updated: UPDATED,
  },
  {
    slug: 'web-application-development',
    name: 'Web Application Development',
    serviceType: 'Custom web application development',
    metaTitle: 'Web Application Development Company | Monolith Codes',
    metaDescription:
      'Custom web apps, portals and dashboards in React and Node.js, with full code ownership. Built in India for clients worldwide from $2,499. Get a quote.',
    eyebrow: 'Service / 02 — Web Applications',
    h1: 'Custom web application development for real business workflows',
    summary:
      'We engineer custom web applications — customer portals, internal tools, dashboards and booking or operations platforms — that model how your business actually works, with secure access control and full source-code ownership.',
    intro: [
      'Spreadsheets, disconnected SaaS tools and manual hand-offs work until the business grows past them. A custom web application replaces that patchwork with one system built around your process: the data you track, the people involved, the approvals and the reports you need.',
      'MONOLITH CODES builds these applications end to end — interface, API, database, authentication and deployment — and hands over the complete codebase. We are based in India and deliver for teams in India and abroad.',
    ],
    whoFor: [
      { title: 'Operations running on spreadsheets', text: 'Your team copies data between sheets, chat and email, and errors or delays are costing you.' },
      { title: 'Businesses with a customer-facing process', text: 'Clients need to log in, submit requests, track status or download documents.' },
      { title: 'Companies replacing an ageing internal tool', text: 'A legacy system is slow, insecure or impossible to extend, and needs a modern rebuild.' },
    ],
    deliverables: [
      { title: 'Process & data modelling', text: 'Workflows, roles and data structures mapped with your team before any screens are built.' },
      { title: 'Role-based access control', text: 'Secure authentication, user roles and permissions, with audit logs for sensitive actions.' },
      { title: 'Dashboards & reporting', text: 'Real-time views of the numbers your team needs, with filters and exports.' },
      { title: 'API & integrations', text: 'REST or GraphQL APIs and connections to payment gateways, email, CRMs, ERPs or existing databases.' },
      { title: 'Cloud deployment', text: 'Automated CI/CD deployment, environment configuration and monitoring hooks.' },
      { title: 'Documentation & handover', text: 'Repository, architecture notes and deployment instructions — the application is yours.' },
    ],
    approach: [
      { title: 'Discovery', text: 'Map users, workflows and data; agree what the first release must do.' },
      { title: 'Architecture', text: 'Choose the data model, API design and hosting before development, so the system scales cleanly.' },
      { title: 'Iterative build', text: 'Working features delivered in milestones you can test on a staging environment.' },
      { title: 'Acceptance & launch', text: 'Testing, data migration where needed, go-live and a post-launch hypercare period.' },
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL / SQL', 'REST & GraphQL', 'AWS / Cloudflare / Vercel'],
    tier: 'grow',
    timelineShort: '6–10 weeks',
    timeline: 'Typically 6–10 weeks for a first production release, depending on scope.',
    pricingNote: 'Web applications are usually scoped under our Grow tier, which includes a full-stack backend, role-based access and a 30-day post-launch hypercare period. Larger systems move to a custom Build quote.',
    faqs: [
      { q: 'What is the difference between a website and a web application?', a: 'A website mainly presents information. A web application lets users log in and do work — create records, process requests, view dashboards — and usually has its own database and API.' },
      { q: 'Can you integrate with the software we already use?', a: 'Yes. We regularly build API bridges to payment gateways, CRMs, ERPs and existing SQL databases so the new application fits into your current stack.' },
      { q: 'Who owns the code?', a: 'You do. You receive the full Git repository, documentation and deployment set-up, with no licence fees or lock-in.' },
      { q: 'Do you offer support after launch?', a: 'Every Grow-tier project includes a 30-day post-launch hypercare period. Ongoing maintenance can be arranged in a separate agreement.' },
      // REVIEW(owner): the two FAQs below were written from published pricing/process content.
      { q: "How long does it take to build a web application?", a: "A first production release typically takes 6–10 weeks, delivered in milestones you can test on a staging environment. Larger systems are planned in phases." },
      { q: "What does a custom web application cost?", a: "Web applications usually start from ₹29,999 in India and $2,499 for international clients under our Grow tier. Larger systems move to a custom Build quote after scoping." },
    ],
    image: { src: '/assets/images/services/web-applications.webp', width: 977, height: 775, alt: 'Custom web application dashboard interface' },
    updated: UPDATED,
  },
  {
    slug: 'saas-development',
    name: 'SaaS Development',
    serviceType: 'SaaS product development',
    metaTitle: 'SaaS Development Company in India | Monolith Codes',
    metaDescription:
      'SaaS development from MVP to production: multi-tenant architecture, billing, roles and analytics. Built in India for founders worldwide, from $2,499.',
    eyebrow: 'Service / 03 — SaaS Platforms',
    h1: 'SaaS development from MVP to a production-ready platform',
    summary:
      'MONOLITH CODES builds SaaS products for founders and companies — starting with a focused MVP and engineering the multi-tenant data, subscription billing, roles and analytics a real product needs to grow.',
    intro: [
      'Most SaaS products do not fail because of the idea; they stall because the first version cannot carry real customers. Tenants leak data into each other, billing is bolted on, and every new feature means a rewrite. We design the foundations properly from the first sprint, then keep the MVP small enough to launch quickly.',
      'We work with founders and product teams in India and internationally, and you keep 100% of the code and intellectual property.',
    ],
    whoFor: [
      { title: 'Founders validating a product', text: 'You need an MVP real customers can sign up for and pay for — not a throwaway prototype.' },
      { title: 'Teams with a working prototype', text: 'A no-code or early build proved demand but cannot scale, and needs to become a maintainable product.' },
      { title: 'Companies productising an internal tool', text: 'A system you built for yourselves could be sold to others as a subscription product.' },
    ],
    deliverables: [
      { title: 'MVP scoping', text: 'The smallest feature set that proves value, written down with clear acceptance criteria.' },
      { title: 'Multi-tenant architecture', text: 'Isolated customer data, organisations and workspaces designed in from day one.' },
      { title: 'Subscriptions & billing', text: 'Plans, trials and recurring payments integrated with a provider such as Stripe or Razorpay.' },
      { title: 'Roles, onboarding & self-serve flows', text: 'Sign-up, invitations, permissions and account settings customers can manage themselves.' },
      { title: 'Usage analytics & admin', text: 'Internal admin tools and product analytics so you can see how customers use the product.' },
      { title: 'Scalable deployment', text: 'CI/CD pipelines, environments and infrastructure that can grow with your customer base.' },
    ],
    approach: [
      { title: 'Product scope', text: 'Define the core job the product does and the MVP boundary.' },
      { title: 'Foundation sprint', text: 'Tenancy, authentication, billing and data model built first, correctly.' },
      { title: 'Feature milestones', text: 'Core product features shipped in reviewable milestones on staging.' },
      { title: 'Launch & iterate', text: 'Production launch, hypercare, then a roadmap for the next releases.' },
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe / Razorpay', 'AWS / Cloudflare / Vercel'],
    tier: 'grow',
    timelineShort: '6–10 weeks (MVP)',
    timeline: 'Typically 6–10 weeks for an MVP that real customers can use; larger platforms are planned in phases.',
    pricingNote: 'SaaS MVPs are usually scoped under our Grow tier, which includes subscription billing, multi-role authentication and real-time dashboards. Complex platforms move to a custom Build quote.',
    faqs: [
      { q: 'How long does it take to build a SaaS MVP?', a: 'A focused MVP typically takes 6–10 weeks. The timeline depends mainly on how many core workflows the first release needs and how quickly decisions are made.' },
      { q: 'Can you take over an existing codebase?', a: 'Yes. We start with a technical audit, then decide with you whether to refactor the existing product or rebuild specific parts.' },
      { q: 'Which payment providers can you integrate?', a: 'Commonly Stripe for international billing and Razorpay for India, but we integrate whichever provider fits your market.' },
      { q: 'Do I own the product and IP?', a: 'Yes — 100% of the source code and intellectual property is transferred to you.' },
      // REVIEW(owner): the two FAQs below were written from published pricing/process content.
      { q: "What does it cost to build a SaaS MVP?", a: "SaaS MVPs usually start from ₹29,999 in India and $2,499 for international clients under our Grow tier. Complex platforms are quoted per project after scoping." },
      { q: "What technology do you use for SaaS products?", a: "Typically React and TypeScript on the front end, Node.js APIs, PostgreSQL, and Stripe or Razorpay for billing, deployed on AWS, Cloudflare or Vercel. The stack is confirmed per project." },
    ],
    image: { src: '/assets/images/services/saas-platforms.webp', width: 1000, height: 558, alt: 'SaaS platform interface with analytics and billing views' },
    updated: UPDATED,
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    serviceType: 'Mobile application development',
    metaTitle: 'Mobile App Development Company in India | Monolith Codes',
    metaDescription:
      'Cross-platform iOS and Android apps in React Native with offline sync, secure APIs and full code ownership. Built in India for clients worldwide. Get a quote.',
    eyebrow: 'Service / 04 — Mobile Apps',
    h1: 'Mobile app development for iOS and Android',
    summary:
      'MONOLITH CODES builds cross-platform mobile apps for iOS and Android — customer apps, companion apps for your web platform and field or service apps — with native-quality interfaces, secure APIs and full source-code ownership.',
    intro: [
      'A mobile app earns its place on a customer\'s phone only if it is fast, reliable and genuinely useful. We focus on the few journeys that matter most to your users, engineer them carefully, and connect the app to the same backend that powers your website or platform.',
      'Building once for both iOS and Android keeps cost and maintenance under control without compromising the experience. We are based in India and build for clients in India and internationally.',
    ],
    whoFor: [
      { title: 'Businesses with repeat customers', text: 'Customers book, order, track or pay regularly and would benefit from an app instead of a browser.' },
      { title: 'Platforms that need a companion app', text: 'You already run a web application and your users want the same data on their phone.' },
      { title: 'Teams working in the field', text: 'Staff need to capture data, photos or signatures on site — sometimes without a connection.' },
    ],
    deliverables: [
      { title: 'UX for the core journeys', text: 'Screens designed around the handful of tasks users open the app for.' },
      { title: 'Cross-platform build', text: 'One codebase for iOS and Android with smooth, native-feeling UI.' },
      { title: 'Offline support & sync', text: 'Local data storage and background sync for unreliable connections, where required.' },
      { title: 'Secure authentication', text: 'Login, biometric unlock and secure token handling.' },
      { title: 'Backend & APIs', text: 'APIs and admin tools for the app, or integration with your existing platform.' },
      { title: 'Store release', text: 'App Store and Google Play submission support, plus release builds and documentation.' },
    ],
    approach: [
      { title: 'Scope', text: 'Agree the user journeys, devices and integrations for the first release.' },
      { title: 'Design', text: 'Clickable flows reviewed before development begins.' },
      { title: 'Build & test', text: 'Milestone builds you can install and test on real devices.' },
      { title: 'Release', text: 'Store submission, launch support and a plan for updates.' },
    ],
    stack: ['React Native', 'TypeScript', 'Node.js APIs', 'Push notifications', 'Offline storage', 'App Store & Google Play'],
    tier: null,
    timelineShort: 'set in the written proposal',
    timeline: 'Depends on the number of journeys and integrations; we give a timeline in the written proposal.',
    pricingNote: 'Mobile apps are quoted per project after a scope call, because cost depends heavily on features, integrations and backend work.',
    faqs: [
      { q: 'Do you build native or cross-platform apps?', a: 'We build cross-platform apps for iOS and Android from one codebase, which keeps cost and maintenance down while delivering a native-quality experience.' },
      { q: 'Can the app share a backend with our website?', a: 'Yes. We often build the app as a companion to an existing web platform, using the same APIs and database.' },
      { q: 'Do you publish the app to the stores?', a: 'We prepare release builds and support the App Store and Google Play submission process using your developer accounts.' },
      { q: 'How much does a mobile app cost?', a: 'It depends on scope. After a short call we provide a written proposal with a fixed price and timeline.' },
      // REVIEW(owner): the two FAQs below were written from published pricing/process content.
      { q: "Which technology do you use for mobile apps?", a: "We build in React Native with TypeScript, so one codebase serves iOS and Android, connected to Node.js APIs or your existing backend." },
      { q: "Do I own the app’s source code?", a: "Yes. You receive the full repository, release builds and documentation, and 100% of the intellectual property is transferred to you." },
    ],
    image: { src: '/assets/images/services/mobile-apps.webp', width: 582, height: 670, alt: 'Cross-platform mobile application screens' },
    updated: UPDATED,
  },
  {
    slug: 'erp-crm-development',
    name: 'ERP & CRM Development',
    serviceType: 'Custom ERP and CRM software development',
    metaTitle: 'Custom ERP & CRM Development Company | Monolith Codes',
    metaDescription:
      'Custom ERP and CRM software built around your operations, with SAP, Oracle or Salesforce integration. Engineered in India for teams worldwide. Book a call.',
    eyebrow: 'Service / 05 — ERP & CRM',
    h1: 'Custom ERP and CRM software development built around your operations',
    summary:
      'MONOLITH CODES builds custom ERP and CRM systems — inventory, orders, sales pipelines, approvals and reporting — designed around how your company operates, and integrated with the tools you already use.',
    intro: [
      'Off-the-shelf ERP and CRM products are built for an average company. If your process is not average, you end up paying per seat for features you do not use while your team works around the ones you need. A custom system fits your workflow instead of forcing your workflow to fit the software.',
      'We design and build ERP and CRM software for businesses in India and internationally, and we can connect it to existing platforms such as SAP, Oracle, NetSuite, Salesforce or your own databases rather than replacing everything at once.',
    ],
    whoFor: [
      { title: 'Operations-heavy businesses', text: 'Manufacturing, trading, distribution or service companies tracking stock, orders and jobs across teams.' },
      { title: 'Sales teams outgrowing spreadsheets', text: 'Leads, quotes and follow-ups are scattered across sheets, email and chat.' },
      { title: 'Companies paying for unused seats', text: 'Licence costs keep rising for an off-the-shelf system that still needs workarounds.' },
    ],
    deliverables: [
      { title: 'Inventory & operations modules', text: 'Stock, purchasing, orders, dispatch and job tracking modelled on your real process.' },
      { title: 'CRM pipelines', text: 'Leads, contacts, quotes and follow-ups with clear ownership and status.' },
      { title: 'Approval workflows', text: 'Multi-step approvals with roles, notifications and an audit trail.' },
      { title: 'Reporting & dashboards', text: 'Management dashboards and exports built from your own data.' },
      { title: 'Integrations & legacy bridges', text: 'API connectors to accounting, payment, e-commerce and existing ERP/CRM platforms.' },
      { title: 'Data migration', text: 'Structured migration of records from spreadsheets or old systems.' },
    ],
    approach: [
      { title: 'Process audit', text: 'Workshops with the people who run the process today; document what must change.' },
      { title: 'Module plan', text: 'Prioritise modules and phase delivery so value arrives early.' },
      { title: 'Phased build', text: 'Each module built, tested and accepted before the next, often running alongside the old system.' },
      { title: 'Rollout', text: 'Data migration, user training material, go-live and support.' },
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL / SQL Server', 'REST & GraphQL APIs', 'SAP / Oracle / Salesforce connectors'],
    tier: 'build',
    timelineShort: '10–16+ weeks, phased',
    timeline: 'Typically 10–16+ weeks, delivered in phases so the first modules go live earlier.',
    pricingNote: 'ERP and CRM systems are scoped under our Build tier and quoted per project after a process audit, because effort depends on modules, integrations and data migration.',
    faqs: [
      { q: 'Should we build a custom ERP or buy an off-the-shelf one?', a: 'If a standard product fits your process with little customisation, buying is usually cheaper. Custom makes sense when your workflow is a competitive advantage, licence costs are high, or you need deep integration. Our guide on custom vs off-the-shelf ERP covers the trade-offs.' },
      { q: 'Can you integrate with SAP, Oracle or Salesforce instead of replacing them?', a: 'Yes. We often build modules or API bridges that sit alongside an existing ERP or CRM, so you can modernise one area at a time.' },
      { q: 'How do you migrate our existing data?', a: 'We map your current data, clean and transform it, run test migrations and reconcile the results before go-live.' },
      { q: 'How long does a custom ERP take?', a: 'Typically 10–16+ weeks, delivered in phases. The first module can go live before the whole system is finished.' },
      // REVIEW(owner): the two FAQs below were written from published pricing/process content.
      { q: "How much does a custom ERP or CRM cost?", a: "ERP and CRM systems fall under our Build tier and are quoted per project after a process audit, because the effort depends on modules, integrations and data migration." },
      { q: "Who owns the ERP once it is built?", a: "You do. You receive the complete source code, database schemas and documentation, with no per-seat licence fees." },
    ],
    image: { src: '/assets/images/services/erp-crm-systems.webp', width: 1000, height: 545, alt: 'Custom ERP and CRM system dashboard' },
    updated: UPDATED,
  },
  {
    slug: 'ai-automation',
    name: 'AI & Automation',
    serviceType: 'AI integration and business process automation',
    metaTitle: 'AI Automation & AI Agent Development | Monolith Codes',
    metaDescription:
      'Practical AI automation: LLM integration, AI agents, document processing and workflow automation between your systems. Built in India for teams worldwide.',
    eyebrow: 'Service / 06 — AI & Automation',
    h1: 'AI integration and business process automation that does real work',
    summary:
      'MONOLITH CODES integrates AI and automation into business workflows — reading documents, classifying requests, drafting responses and moving data between systems — with human review where it matters.',
    intro: [
      'AI is useful when it removes a specific, repetitive task: reading invoices, triaging enquiries, summarising documents or keeping two systems in sync. We start from the task, measure how it is done today, and only then decide whether a language model, a rules-based automation or a simple integration is the right tool.',
      'We build these automations for businesses in India and internationally, with logging, guardrails and review steps so you can trust what the system does.',
    ],
    whoFor: [
      { title: 'Teams drowning in documents', text: 'Invoices, forms, contracts or emails are read and re-typed by hand.' },
      { title: 'Businesses with repetitive hand-offs', text: 'Data is copied between your CRM, ERP, spreadsheets and email every day.' },
      { title: 'Companies exploring AI responsibly', text: 'You want a practical first use case with a clear return, not a demo.' },
    ],
    deliverables: [
      { title: 'Use-case assessment', text: 'Identify the tasks where automation saves the most time, with a realistic plan.' },
      { title: 'LLM integration', text: 'Language-model features such as extraction, classification and drafting, connected to your data.' },
      { title: 'Document processing (RAG)', text: 'Search and question-answering over your own documents with source references.' },
      { title: 'Workflow automation', text: 'Event-driven automations that move data between systems and notify the right people.' },
      { title: 'Human-in-the-loop review', text: 'Approval steps for decisions that should not be fully automated.' },
      { title: 'Monitoring & logging', text: 'Logs and dashboards so you can see what the automation did and why.' },
    ],
    approach: [
      { title: 'Ingest', text: 'Connect to the documents, inboxes or systems the task starts from.' },
      { title: 'Understand', text: 'Extract and classify the information that matters.' },
      { title: 'Decide', text: 'Apply your rules, with human review where needed.' },
      { title: 'Act', text: 'Update systems, send notifications and log every step.' },
    ],
    stack: ['LLM APIs (OpenAI, Anthropic, Google)', 'Retrieval-augmented generation', 'Node.js', 'Python', 'Webhooks & queues', 'Your existing APIs'],
    tier: 'build',
    timelineShort: 'first automation in weeks',
    timeline: 'A first automation is often delivered in a few weeks; broader programmes are planned in phases.',
    pricingNote: 'AI and automation work is scoped under our Build tier and quoted per project, because effort depends on data sources, integrations and review requirements.',
    faqs: [
      { q: 'Which AI models do you use?', a: 'We choose per task — commercial LLM APIs from providers such as OpenAI, Anthropic or Google, or simpler rule-based automation when a model is not needed.' },
      { q: 'Is our data used to train AI models?', a: 'We use provider settings and APIs that do not train on your data where available, and we design access so the system only sees what it needs.' },
      { q: 'Can automation work with our existing software?', a: 'Yes. Most projects connect to tools you already use — email, CRM, ERP, spreadsheets or databases — through their APIs.' },
      { q: 'How do you keep AI output reliable?', a: 'With structured prompts, validation, logging and human review steps for important decisions.' },
      // REVIEW(owner): the two FAQs below were written from published pricing/process content.
      { q: "Do you build AI agents?", a: "Yes, where they fit the task: agent-style workflows that read inputs, call your systems through their APIs and act, with logging and human review for important decisions." },
      { q: "How much does an AI automation project cost?", a: "AI and automation work falls under our Build tier and is quoted per project, because effort depends on data sources, integrations and review requirements." },
    ],
    image: { src: '/assets/images/services/ai-automation.webp', width: 1000, height: 558, alt: 'AI and business automation workflow' },
    updated: UPDATED,
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
