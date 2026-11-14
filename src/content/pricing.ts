import type { STARTING_PRICES } from '@/lib/pricing';

/**
 * Published pricing tiers (rendered by PricingSection; also used for Offer structured data,
 * llms.txt and the Markdown mirror of /pricing). Prices themselves live in src/lib/pricing.ts.
 */
export interface PricingTier {
  id: keyof typeof STARTING_PRICES;
  name: string;
  /** What the tier covers, used in structured data (e.g. "custom websites"). */
  schemaName: string;
  badge?: string;
  tagline: string;
  sprintTimeline: string;
  retainerTimeline: string;
  idealFor: string;
  features: string[];
  expandableDetails: string;
  ctaText: string;
  featured?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'launch',
    name: 'Launch',
    schemaName: 'custom websites and web frontends',
    tagline: 'High-conversion, bespoke web frontends & digital product foundations.',
    sprintTimeline: '2 – 4 Weeks Scope',
    retainerTimeline: 'Dedicated Sprint Cell',
    idealFor: 'Businesses replacing slow templates with production-grade web experiences.',
    features: [
      '100% Custom React 19 & Tailwind v4 architecture',
      'Performance tuned for good Core Web Vitals (LCP, INP, CLS)',
      'Headless CMS or static data integration',
      'Full responsive design & dark/light theme support',
      '100% IP ownership & Git repository handoff',
    ],
    expandableDetails: 'Includes complete UX architecture, custom component library, SEO optimization, and sub-second performance tuning for high-converting marketing sites.',
    ctaText: 'Start Launch Project',
    featured: false,
  },
  {
    id: 'grow',
    name: 'Grow',
    schemaName: 'custom web applications and SaaS platforms',
    badge: 'MOST POPULAR',
    tagline: 'Custom web applications, multi-tenant SaaS platforms & customer portals.',
    sprintTimeline: '6 - 10 Weeks Scope',
    retainerTimeline: 'Embedded Senior Team',
    idealFor: 'Founders & growing companies building scalable custom software platforms.',
    features: [
      'Everything in Launch plus full-stack backend API',
      'Multi-role auth, RBAC & audit-logged workflows',
      'Real-time WebSocket telemetry & analytics dashboards',
      'Stripe subscription & automated billing engine',
      'AWS / Cloudflare CI/CD automated deployment',
      '30-day post-launch hypercare & bug guarantee',
    ],
    expandableDetails: 'Designed for production applications handling live user accounts, subscription billing, real-time telemetry dashboards, and multi-tenant data security.',
    ctaText: 'Start Grow Platform',
    featured: true,
  },
  {
    id: 'build',
    name: 'Build',
    schemaName: 'ERP/CRM systems, AI pipelines and dedicated teams',
    tagline: 'Enterprise ERP/CRM systems, AI agent pipelines & studio cell teams.',
    sprintTimeline: '10 - 16+ Weeks Scope',
    retainerTimeline: 'Quarterly Dedicated Studio',
    idealFor: 'Established enterprises requiring complex operational systems or dedicated sprint cells.',
    features: [
      'Bespoke ERP, CRM & inventory management engines',
      'Custom REST/GraphQL API bridges & legacy SAP/Oracle sync',
      'Pragmatic AI / LLM workflow & RAG document triage',
      'Dedicated Senior React/Node studio engineering cell',
      'Custom SLA, infrastructure hardening & security audit',
    ],
    expandableDetails: 'Bespoke enterprise engineering cell tailored to complex operational workflows, high-concurrency database queries, and legacy database migration.',
    ctaText: 'Inquire for Enterprise Build',
    featured: false,
  },
];

