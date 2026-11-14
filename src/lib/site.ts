/** Single source of truth for business facts used in copy, metadata and structured data. */
export const SITE = {
  name: 'MONOLITH CODES',
  url: 'https://monolithcodes.com',
  email: 'studio@monolithcodes.com',
  phoneDisplay: '+91 92172 47687',
  phoneE164: '+919217247687',
  phoneSchema: '+91-92172-47687',
  whatsapp: 'https://wa.me/919217247687',
  linkedin: 'https://www.linkedin.com/company/monolith-codes/',
  instagram: 'https://www.instagram.com/monolithcodes_/',
  calendar: 'https://cal.com/monolithcodes/project-discussion',
  ogImage: 'https://monolithcodes.com/og-image.jpg',
  /** Location statement: India-based, serving India and international clients. No street address is published. */
  locationLine: 'Based in India · Working with clients in India and worldwide',
} as const;

export const absoluteUrl = (path: string) => `${SITE.url}${path === '/' ? '/' : path}`;

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const FOUNDER_ID = `${SITE.url}/#anubhav-garg`;
export const COFOUNDER_ID = `${SITE.url}/#ankit-kumar`;

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
) => ({
  '@type': type,
  '@id': `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
  inLanguage: 'en',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    contentUrl: SITE.ogImage,
    url: SITE.ogImage,
    width: 1200,
    height: 630,
  },
  ...extra,
});

export const AREA_SERVED = [
  { '@type': 'Country', name: 'India' },
  { '@type': 'Place', name: 'Worldwide' },
];
