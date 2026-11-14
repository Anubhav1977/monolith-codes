/**
 * Single source of truth for business facts. Copy, <head> metadata, JSON-LD, the footer, contact
 * links, llms.txt / llms-full.txt / humans.txt and the Markdown mirrors all read from here.
 * Change a fact once, here.
 */
export const SITE = {
  name: 'MONOLITH CODES',
  /** Running-text spelling. */
  displayName: 'Monolith Codes',
  /** TODO(owner): registered legal entity name (e.g. "Monolith Codes Private Limited"), if any. */
  legalName: null as string | null,
  /** TODO(owner): founding date (YYYY or YYYY-MM-DD). Not found anywhere in the code. */
  foundingDate: null as string | null,
  url: 'https://monolithcodes.com',
  host: 'monolithcodes.com',
  locale: 'en-IN',
  ogLocale: 'en_IN',
  email: 'studio@monolithcodes.com',
  phoneDisplay: '+91 92172 47687',
  phoneE164: '+919217247687',
  phoneSchema: '+91-92172-47687',
  whatsapp: 'https://wa.me/919217247687',
  whatsappWithText: `https://wa.me/919217247687?text=${encodeURIComponent("Hello MONOLITH CODES, I'd like to discuss a custom software project.")}`,
  linkedin: 'https://www.linkedin.com/company/monolith-codes/',
  instagram: 'https://www.instagram.com/monolithcodes_/',
  /** TODO(owner): add GitHub org, Clutch, GoodFirms, Crunchbase … URLs once the profiles exist. */
  extraProfiles: [] as string[],
  calendar: 'https://cal.com/monolithcodes/project-discussion',
  ogImage: 'https://monolithcodes.com/og-image.jpg',
  logo: 'https://monolithcodes.com/icon-512.png',
  slogan: 'Custom software, built to outgrow templates.',
  description:
    'Monolith Codes is a founder-led custom software development studio based in India. We hand-code websites, web applications, SaaS platforms, mobile apps, ERP/CRM systems and AI automation for clients in India and worldwide, and hand over 100% of the source code and IP.',
  /** Location statement: India-based, serving India and international clients. No street address is published. */
  locationLine: 'Based in India · Working with clients in India and worldwide',
  footerLocationLine: 'Based in India · Serving clients worldwide',
  /** TODO(owner): confirm Hindi before adding it to ContactPoint.availableLanguage. */
  languages: ['English'],
} as const;

export const SOCIAL_PROFILES = [SITE.linkedin, SITE.instagram, ...SITE.extraProfiles];

export interface Founder {
  id: string;
  name: string;
  jobTitle: string;
  photo: string;
  /** Short third-person bio (about page, author boxes). */
  bio: string;
  /** TODO(owner): personal LinkedIn profile URL — strongest author/E-E-A-T signal for guides. */
  linkedin: string | null;
  knowsAbout: string[];
}

export const FOUNDERS: Founder[] = [
  {
    id: 'anubhav-garg',
    name: 'Anubhav Garg',
    jobTitle: 'Founder & Lead Technical Engineer',
    photo: '/assets/faces/founder_pp.webp',
    bio: 'Leads architecture, engineering and technical direction — turning complex requirements into scalable, high-performance software systems.',
    linkedin: null,
    knowsAbout: ['Software architecture', 'React', 'TypeScript', 'Node.js', 'SaaS engineering', 'Web performance'],
  },
  {
    id: 'ankit-kumar',
    name: 'Ankit Kumar',
    jobTitle: 'Co-Founder & Business Director',
    photo: '/assets/faces/cofounder_pp.webp',
    bio: 'Connects business needs with the right technical solution, manages client relationships and keeps delivery on track from first call to handover.',
    linkedin: null,
    knowsAbout: ['Software project delivery', 'Business strategy', 'Client relationships'],
  },
];

export const getFounder = (id: string) => FOUNDERS.find((f) => f.id === id);

export const absoluteUrl = (path: string) => `${SITE.url}${path === '/' ? '/' : path}`;

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const LOGO_ID = `${SITE.url}/#logo`;
export const personId = (id: string) => `${SITE.url}/#${id}`;
export const FOUNDER_ID = personId('anubhav-garg');
export const COFOUNDER_ID = personId('ankit-kumar');

type Crumb = { name: string; path: string };

export const breadcrumbLd = (crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  '@id': `${absoluteUrl(crumbs[crumbs.length - 1].path)}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const webPageLd = (
  path: string,
  name: string,
  description: string,
  type: 'WebPage' | 'AboutPage' | 'CollectionPage' | 'ContactPage' = 'WebPage',
  extra: Record<string, unknown> = {},
  image: string = SITE.ogImage,
) => ({
  '@type': type,
  '@id': `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  inLanguage: SITE.locale,
  ...(path === '/' ? {} : { breadcrumb: { '@id': `${absoluteUrl(path)}#breadcrumb` } }),
  primaryImageOfPage: {
    '@type': 'ImageObject',
    contentUrl: image,
    url: image,
    width: 1200,
    height: 630,
  },
  ...extra,
});

export const AREA_SERVED = [
  { '@type': 'Country', name: 'India' },
  { '@type': 'Place', name: 'Worldwide' },
];

export const KNOWS_ABOUT = [
  'Custom software development',
  'Website development',
  'Web application development',
  'SaaS development',
  'Mobile app development',
  'ERP software development',
  'CRM software development',
  'AI integration',
  'Business process automation',
  'React',
  'TypeScript',
  'Node.js',
  'React Native',
  'PostgreSQL',
  'Technical SEO',
  'Core Web Vitals',
];

const personLd = (f: Founder) => ({
  '@type': 'Person',
  '@id': personId(f.id),
  name: f.name,
  jobTitle: f.jobTitle,
  url: `${SITE.url}/about`,
  image: absoluteUrl(f.photo),
  description: f.bio,
  knowsAbout: f.knowsAbout,
  worksFor: { '@id': ORG_ID },
  ...(f.linkedin ? { sameAs: [f.linkedin] } : {}),
});

/** Site-wide graph (Organization + founders + WebSite), emitted on every page. */
export const siteGraphLd = (serviceCatalog: { name: string; path: string }[]) => [
  {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: SITE.displayName,
    ...(SITE.legalName ? { legalName: SITE.legalName } : {}),
    url: `${SITE.url}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: SITE.logo,
      contentUrl: SITE.logo,
      width: 512,
      height: 512,
      caption: SITE.name,
    },
    image: SITE.ogImage,
    description: SITE.description,
    slogan: SITE.slogan,
    email: SITE.email,
    telephone: SITE.phoneSchema,
    ...(SITE.foundingDate ? { foundingDate: SITE.foundingDate } : {}),
    // Country only — no street address is published (service-area business).
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    areaServed: AREA_SERVED,
    currenciesAccepted: 'INR, USD',
    priceRange: '$999+',
    knowsAbout: KNOWS_ABOUT,
    founder: FOUNDERS.map((f) => ({ '@id': personId(f.id) })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE.email,
        telephone: SITE.phoneSchema,
        url: `${SITE.url}/#inquiry`,
        areaServed: ['IN', 'Worldwide'],
        availableLanguage: [...SITE.languages],
      },
    ],
    sameAs: SOCIAL_PROFILES,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software development services',
      url: `${SITE.url}/services`,
      itemListElement: serviceCatalog.map((s) => ({
        '@type': 'Offer',
        url: absoluteUrl(s.path),
        itemOffered: { '@type': 'Service', '@id': `${absoluteUrl(s.path)}#service`, name: s.name },
      })),
    },
  },
  ...FOUNDERS.map(personLd),
  {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    alternateName: SITE.displayName,
    description: 'Custom software development studio based in India',
    inLanguage: SITE.locale,
    publisher: { '@id': ORG_ID },
  },
];
