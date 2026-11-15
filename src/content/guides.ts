/**
 * Long-form guides (/guides/<slug>) answering high-intent buyer questions.
 * Figures quoted are MONOLITH CODES' own published starting prices (src/lib/pricing.ts);
 * no third-party market statistics are asserted. Update `updated` when content changes.
 */

export type GuideBlock =
  | string
  | { list: string[] }
  | { table: { caption: string; head: string[]; rows: string[][] } };

export interface GuideSection {
  id: string;
  heading: string;
  blocks: GuideBlock[];
}

export interface GuideContent {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  summary: string;
  published: string;
  updated: string;
  readingMinutes: number;
  /** Founder id from src/lib/site.ts (FOUNDERS) shown in the byline and Article.author. */
  author: string;
  sections: GuideSection[];
  relatedServices: string[];
}

export const GUIDES: GuideContent[] = [
  {
    slug: 'custom-software-development-cost-india',
    name: 'Custom software development cost',
    metaTitle: 'Custom Software Development Cost in India: 2026 Guide',
    metaDescription:
      'What websites, web apps, SaaS MVPs and ERP systems cost in India and abroad: real starting prices in INR and USD, timelines and what drives the price.',
    eyebrow: 'Guide / Pricing',
    h1: 'How much does custom software development cost in India?',
    summary:
      'At MONOLITH CODES, custom websites start from ₹12,999 ($999 for international clients), custom web applications and SaaS MVPs start from ₹29,999 ($2,499), and ERP, CRM and AI systems are quoted per project. The final price depends mainly on scope, integrations, data migration and timeline.',
    published: '2026-11-14',
    updated: '2026-11-14',
    readingMinutes: 7,
    // REVIEW(owner): confirm the author of this guide.
    author: 'anubhav-garg',
    relatedServices: ['website-development', 'web-application-development', 'saas-development', 'erp-crm-development'],
    sections: [
      {
        id: 'short-answer',
        heading: 'The short answer',
        blocks: [
          'There is no single price for "custom software", because a five-page business website and a multi-module ERP are very different amounts of engineering. What you can do is understand the starting point for each type of project and the factors that move the price up or down.',
          'These are the starting prices MONOLITH CODES publishes. Indian clients are quoted in rupees; international clients are quoted in US dollars for the same scope.',
          {
            table: {
              caption: 'MONOLITH CODES starting prices by project type',
              head: ['Project type', 'Tier', 'Starts from (India)', 'Starts from (international)', 'Typical timeline'],
              rows: [
                ['Custom business website', 'Launch', '₹12,999', '$999', '2–4 weeks'],
                ['Custom web application / portal', 'Grow', '₹29,999', '$2,499', '6–10 weeks'],
                ['SaaS MVP', 'Grow', '₹29,999', '$2,499', '6–10 weeks'],
                ['ERP / CRM system', 'Build', 'Quoted per project', 'Quoted per project', '10–16+ weeks'],
                ['AI & automation', 'Build', 'Quoted per project', 'Quoted per project', 'Phased'],
                ['Mobile app (iOS & Android)', '—', 'Quoted per project', 'Quoted per project', 'Per proposal'],
              ],
            },
          },
          '"Starts from" means the price for a well-defined, modest scope in that tier. Every project receives a written proposal with a fixed price before development begins.',
        ],
      },
      {
        id: 'what-drives-cost',
        heading: 'What actually drives the cost',
        blocks: [
          'Across hundreds of possible features, a handful of factors account for most of the difference between a small quote and a large one:',
          {
            list: [
              'Number of distinct user roles and workflows — every role (customer, staff, manager, admin) needs its own screens and permissions.',
              'Integrations — payment gateways, accounting software, CRMs, ERPs, government or logistics APIs each add design, build and testing work.',
              'Data migration — moving years of records out of spreadsheets or an old system is often underestimated.',
              'Real-time and scale requirements — live dashboards, high concurrency or strict uptime targets need more engineering.',
              'Content and design readiness — projects move faster and cost less when copy, brand assets and decisions are ready.',
              'Compliance and security — audit logs, data residency and formal security reviews add scope.',
            ],
          },
        ],
      },
      {
        id: 'india-vs-international',
        heading: 'Why prices differ between India and international clients',
        blocks: [
          'We are a studio based in India. Clients in India are quoted in INR at local market rates; international clients are quoted in USD at international market rates for the same scope of work. The engineering, process, code quality and ownership terms are identical — the difference reflects the market, not a different level of service.',
          'For international clients, working with an India-based studio usually means overlapping working hours for part of the day, written documentation of decisions, and milestone-based reviews on a staging link so progress is visible regardless of time zone.',
        ],
      },
      {
        id: 'custom-vs-template',
        heading: 'Custom build vs templates and off-the-shelf tools',
        blocks: [
          'A template website or an off-the-shelf SaaS tool is cheaper on day one. The costs appear later: monthly per-seat licences, plugins that need constant updates, workarounds for processes the tool does not support, and the cost of migrating away when you outgrow it.',
          'A custom build costs more upfront but you own it outright. There are no theme or seat licences, the software matches your process, and any competent developer can extend the codebase. It makes most sense when the software is central to how you sell or operate.',
        ],
      },
      {
        id: 'hidden-costs',
        heading: 'Costs to plan for beyond the build',
        blocks: [
          {
            list: [
              'Hosting and infrastructure — usually modest for websites; scales with users and data for applications.',
              'Third-party services — payment gateway fees, email sending, maps, SMS or AI model usage are billed by those providers.',
              'Domain and email — renewed annually with your registrar (for example GoDaddy).',
              'Maintenance — security updates, dependency upgrades and small improvements after the warranty period, arranged separately.',
              'New features — anything beyond the agreed scope is quoted and approved before work starts.',
            ],
          },
        ],
      },
      {
        id: 'how-to-get-accurate-quote',
        heading: 'How to get an accurate quote',
        blocks: [
          'The fastest route to a reliable number is a short written brief: what the software must do, who uses it, what it needs to connect to, and when you need it. From there we run a scope call, identify unknowns, and send a proposal with fixed deliverables, price, timeline and payment milestones.',
          'You can see our full tier breakdown on the pricing page, or start a project and we will reply with next steps.',
        ],
      },
    ],
  },
  {
    slug: 'custom-erp-vs-off-the-shelf',
    name: 'Custom ERP vs off-the-shelf ERP',
    metaTitle: 'Custom ERP vs Off-the-Shelf ERP: Which to Choose?',
    metaDescription:
      'Custom ERP or SAP, NetSuite, Odoo or Zoho? Compare cost, fit, ownership, integration and time to value, and see when a hybrid approach works best.',
    eyebrow: 'Guide / ERP',
    h1: 'Custom ERP vs off-the-shelf ERP: how to choose',
    summary:
      'Off-the-shelf ERP is usually the better choice when your processes are standard and you can adapt to the software. Custom ERP is worth it when your workflow is a competitive advantage, licence costs keep growing, or you need deep integration — and many businesses get the best result from a hybrid of both.',
    published: '2026-11-14',
    updated: '2026-11-14',
    readingMinutes: 6,
    // REVIEW(owner): confirm the author of this guide.
    author: 'anubhav-garg',
    relatedServices: ['erp-crm-development', 'web-application-development', 'ai-automation'],
    sections: [
      {
        id: 'definitions',
        heading: 'What we mean by custom and off-the-shelf ERP',
        blocks: [
          'Off-the-shelf ERP is a packaged product — for example SAP, Oracle NetSuite, Microsoft Dynamics, Odoo or Zoho — that you license and configure. Custom ERP is software designed and built for your company, which you own outright.',
          'Neither is automatically better. The right choice depends on how standard your processes are, how much you are willing to change them, and how important the software is to the way you compete.',
        ],
      },
      {
        id: 'comparison',
        heading: 'Side-by-side comparison',
        blocks: [
          {
            table: {
              caption: 'Custom ERP compared with off-the-shelf ERP',
              head: ['Factor', 'Off-the-shelf ERP', 'Custom ERP'],
              rows: [
                ['Upfront cost', 'Lower to start; implementation and configuration still cost money', 'Higher; you pay for design and development'],
                ['Ongoing cost', 'Recurring licence or per-seat fees that grow with headcount', 'Hosting and maintenance only; no seat licences'],
                ['Fit to your process', 'You adapt your process to the product', 'The software is built around your process'],
                ['Time to first value', 'Fast for standard modules', 'Phased; first modules can go live in weeks'],
                ['Integration', 'Depends on the vendor’s APIs and connectors', 'Designed around the systems you already use'],
                ['Ownership', 'You license the software', 'You own the code and IP'],
                ['Vendor lock-in', 'High — data and workflows live in the vendor’s platform', 'Low — any capable team can maintain the code'],
              ],
            },
          },
        ],
      },
      {
        id: 'when-off-the-shelf',
        heading: 'When off-the-shelf ERP is the right choice',
        blocks: [
          {
            list: [
              'Your accounting, inventory and HR processes are close to industry standard.',
              'You need a proven compliance or statutory reporting module immediately.',
              'Your team is small and licence costs are manageable.',
              'You are willing to change internal processes to match the software.',
            ],
          },
        ],
      },
      {
        id: 'when-custom',
        heading: 'When a custom ERP is worth it',
        blocks: [
          {
            list: [
              'Your workflow — how you quote, produce, dispatch or service — is part of what makes you competitive.',
              'You are paying for many seats and modules but still running key processes in spreadsheets.',
              'You need tight integration between operations, a customer portal and existing systems.',
              'You want to own the system and avoid long-term dependence on one vendor.',
            ],
          },
        ],
      },
      {
        id: 'hybrid',
        heading: 'The hybrid approach most growing companies end up with',
        blocks: [
          'You rarely have to choose all-or-nothing. A common pattern is to keep a packaged system for accounting and statutory compliance, and build custom modules for the operational workflows that the package handles poorly — connected through APIs so data stays consistent.',
          'This lets you modernise one area at a time, limit risk, and only pay for custom engineering where it creates real value.',
        ],
      },
      {
        id: 'questions-to-ask',
        heading: 'Questions to answer before you decide',
        blocks: [
          {
            list: [
              'Which processes are genuinely unique to us, and which are standard?',
              'What will licences cost in three years at our expected headcount?',
              'Which systems must the ERP integrate with, and do they have usable APIs?',
              'How much existing data needs to be migrated, and how clean is it?',
              'Who will own and maintain the system after launch?',
            ],
          },
          'If you would like a second opinion, we can review your current setup and recommend whether to buy, build or combine both — including when building is not the right answer.',
        ],
      },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
