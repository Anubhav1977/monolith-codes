import { SERVICES, getService } from '@/content/services';
import { GUIDES, getGuide } from '@/content/guides';
import { HOME_FAQS } from '@/content/faqs';
import { STARTING_PRICES } from '@/lib/pricing';
import {
  AREA_SERVED,
  ORG_ID,
  SITE,
  absoluteUrl,
  breadcrumbLd,
  webPageLd,
} from '@/lib/site';
import { normalizePath } from '@/lib/router';

/**
 * Route table — drives client routing, build-time prerendering, the XML sitemap and per-page
 * metadata/structured data. Add a page here and it is rendered, indexed and listed automatically.
 */

export type PageKey =
  | 'home'
  | 'pricing'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'services'
  | 'service'
  | 'guides'
  | 'guide'
  | 'notFound';

export interface RouteMeta {
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  /** Defaults to true; the 404 page is the only non-indexable route. */
  indexable?: boolean;
}

export interface RouteDef {
  path: string;
  page: PageKey;
  /** Slug for service / guide pages. */
  slug?: string;
  meta: RouteMeta;
  jsonLd: Record<string, unknown>[];
  /** ISO date of last meaningful content change (sitemap lastmod). */
  lastmod: string;
}

const HOME_UPDATED = '2026-11-14';
const LEGAL_UPDATED = '2026-10-11';

const crumbHome = { name: 'Home', path: '/' };

const priceSpec = (tier: keyof typeof STARTING_PRICES | null) => {
  const p = tier ? STARTING_PRICES[tier] : null;
  if (!p) return undefined;
  const num = (s: string) => s.replace(/[^\d.]/g, '');
  return [
    { '@type': 'Offer', priceCurrency: 'INR', price: num(p.INR), eligibleRegion: { '@type': 'Country', name: 'India' }, description: 'Starting price' },
    { '@type': 'Offer', priceCurrency: 'USD', price: num(p.USD), description: 'Starting price for international clients' },
  ];
};

const homeRoute: RouteDef = {
  path: '/',
  page: 'home',
  lastmod: HOME_UPDATED,
  meta: {
    title: 'MONOLITH CODES | Custom Software Development Company in India',
    description:
      'Custom software development studio based in India. We hand-code websites, web apps, SaaS platforms, mobile apps and ERP/CRM systems for clients in India and worldwide — with 100% IP ownership.',
  },
  jsonLd: [
    webPageLd('/', 'MONOLITH CODES | Custom Software Development Company in India', 'Custom software development studio based in India, building websites, web apps, SaaS, mobile apps and ERP/CRM systems for clients in India and worldwide.'),
    {
      '@type': 'FAQPage',
      '@id': `${SITE.url}/#faq`,
      mainEntity: HOME_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
};

const staticRoutes: RouteDef[] = [
  homeRoute,
  {
    path: '/services',
    page: 'services',
    lastmod: HOME_UPDATED,
    meta: {
      title: 'Custom Software Development Services in India | MONOLITH CODES',
      description:
        'Custom software development services from an India-based engineering studio: websites, web applications, SaaS, mobile apps, ERP/CRM and AI automation for clients in India and worldwide.',
    },
    jsonLd: [
      webPageLd('/services', 'Custom Software Development Services', 'Software engineering services offered by MONOLITH CODES.', 'CollectionPage', {
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: SERVICES.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(`/services/${s.slug}`),
            name: s.name,
          })),
        },
      }),
      breadcrumbLd([crumbHome, { name: 'Services', path: '/services' }]),
    ],
  },
  {
    path: '/pricing',
    page: 'pricing',
    lastmod: HOME_UPDATED,
    meta: {
      title: 'Pricing & Process — Custom Software from ₹12,999 / $999 | MONOLITH CODES',
      description:
        'Transparent starting prices in INR and USD for custom websites, web apps, SaaS and enterprise systems, plus our 7-stage delivery process, payment and warranty terms.',
    },
    jsonLd: [
      webPageLd('/pricing', 'Pricing & Process', 'Starting prices, delivery process and commercial terms for MONOLITH CODES projects.'),
      breadcrumbLd([crumbHome, { name: 'Pricing', path: '/pricing' }]),
    ],
  },
  {
    path: '/about',
    page: 'about',
    lastmod: HOME_UPDATED,
    meta: {
      title: 'About MONOLITH CODES | Founder-Led Software Studio in India',
      description:
        'MONOLITH CODES is a founder-led custom software engineering studio based in India, led by Anubhav Garg and Ankit Kumar, building for clients in India and worldwide.',
    },
    jsonLd: [
      webPageLd('/about', 'About MONOLITH CODES', 'Who we are, how we work and the founders behind MONOLITH CODES.', 'AboutPage', {
        mainEntity: { '@id': ORG_ID },
      }),
      breadcrumbLd([crumbHome, { name: 'About', path: '/about' }]),
    ],
  },
  {
    path: '/guides',
    page: 'guides',
    lastmod: HOME_UPDATED,
    meta: {
      title: 'Guides for Buying Custom Software | MONOLITH CODES',
      description:
        'Practical guides on custom software cost, ERP choices and planning a software project — written by the engineers at MONOLITH CODES.',
    },
    jsonLd: [
      webPageLd('/guides', 'Guides', 'Guides for planning and buying custom software.', 'CollectionPage'),
      breadcrumbLd([crumbHome, { name: 'Guides', path: '/guides' }]),
    ],
  },
  {
    path: '/privacy',
    page: 'privacy',
    lastmod: LEGAL_UPDATED,
    meta: {
      title: 'Privacy Policy | MONOLITH CODES',
      description:
        'How MONOLITH CODES collects, uses and protects personal data submitted through this website, and the choices and rights you have over that data.',
    },
    jsonLd: [
      webPageLd('/privacy', 'Privacy Policy', 'Privacy policy for the MONOLITH CODES website.'),
      breadcrumbLd([crumbHome, { name: 'Privacy Policy', path: '/privacy' }]),
    ],
  },
  {
    path: '/terms',
    page: 'terms',
    lastmod: LEGAL_UPDATED,
    meta: {
      title: 'Terms of Use | MONOLITH CODES',
      description: 'The terms that govern access to and use of the MONOLITH CODES website and its project inquiry tools.',
    },
    jsonLd: [
      webPageLd('/terms', 'Terms of Use', 'Terms of use for the MONOLITH CODES website.'),
      breadcrumbLd([crumbHome, { name: 'Terms of Use', path: '/terms' }]),
    ],
  },
];

const serviceRoutes: RouteDef[] = SERVICES.map((s) => {
  const path = `/services/${s.slug}`;
  const offers = priceSpec(s.tier);
  return {
    path,
    page: 'service',
    slug: s.slug,
    lastmod: s.updated,
    meta: { title: s.metaTitle, description: s.metaDescription },
    jsonLd: [
      webPageLd(path, s.h1, s.metaDescription, 'WebPage', { mainEntity: { '@id': `${absoluteUrl(path)}#service` } }),
      {
        '@type': 'Service',
        '@id': `${absoluteUrl(path)}#service`,
        name: s.name,
        serviceType: s.serviceType,
        description: s.summary,
        url: absoluteUrl(path),
        image: absoluteUrl(s.image.src),
        provider: { '@id': ORG_ID },
        areaServed: AREA_SERVED,
        ...(offers ? { offers } : {}),
      },
      breadcrumbLd([crumbHome, { name: 'Services', path: '/services' }, { name: s.name, path }]),
    ],
  };
});

const guideRoutes: RouteDef[] = GUIDES.map((g) => {
  const path = `/guides/${g.slug}`;
  return {
    path,
    page: 'guide',
    slug: g.slug,
    lastmod: g.updated,
    meta: { title: g.metaTitle, description: g.metaDescription, ogType: 'article' },
    jsonLd: [
      webPageLd(path, g.h1, g.metaDescription),
      {
        '@type': 'Article',
        '@id': `${absoluteUrl(path)}#article`,
        headline: g.h1,
        description: g.metaDescription,
        url: absoluteUrl(path),
        mainEntityOfPage: { '@id': `${absoluteUrl(path)}#webpage` },
        image: SITE.ogImage,
        datePublished: g.published,
        dateModified: g.updated,
        inLanguage: 'en',
        author: { '@type': 'Organization', '@id': ORG_ID, name: SITE.name },
        publisher: { '@id': ORG_ID },
      },
      breadcrumbLd([crumbHome, { name: 'Guides', path: '/guides' }, { name: g.name, path }]),
    ],
  };
});

export const ROUTES: RouteDef[] = [...staticRoutes, ...serviceRoutes, ...guideRoutes];

export const NOT_FOUND_ROUTE: RouteDef = {
  path: '/404',
  page: 'notFound',
  lastmod: HOME_UPDATED,
  meta: {
    title: 'Page not found | MONOLITH CODES',
    description: 'The page you were looking for does not exist. Explore our custom software development services or start a project.',
    indexable: false,
  },
  jsonLd: [],
};

const BY_PATH = new Map(ROUTES.map((r) => [r.path, r]));

export const matchRoute = (pathname: string): RouteDef => BY_PATH.get(normalizePath(pathname)) ?? NOT_FOUND_ROUTE;

export { getService, getGuide };
