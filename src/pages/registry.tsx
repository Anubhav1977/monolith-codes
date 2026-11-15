import React from 'react';
import type { PageKey, RouteDef } from '@/lib/routes';
import { navigate } from '@/lib/router';

export interface PageProps {
  route: RouteDef;
}

export type PageComponent = React.ComponentType<PageProps>;

const toHome = () => navigate('/');
const toPrivacy = () => navigate('/privacy');

/**
 * Every page is its own chunk. The build-time prerender injects <link rel="modulepreload"> for the
 * current page's chunk, so there is no request waterfall on first load.
 */
export const PAGE_LOADERS: Record<PageKey, () => Promise<{ default: PageComponent }>> = {
  home: () => import('./HomePage'),
  pricing: () => import('./PricingPage'),
  about: () => import('./AboutUs'),
  services: () => import('./ServicesPage'),
  service: () => import('./ServicePage'),
  guides: () => import('./GuidesPage'),
  guide: () => import('./GuidePage'),
  work: () => import('./WorkPage'),
  caseStudy: () => import('./CaseStudyPage'),
  notFound: () => import('./NotFoundPage'),
  privacy: () =>
    import('./PrivacyPolicy').then((m) => ({
      default: () => <m.PrivacyPolicy onBackToHome={toHome} />,
    })),
  terms: () =>
    import('./TermsOfUse').then((m) => ({
      default: () => <m.TermsOfUse onBackToHome={toHome} onNavigateToPrivacy={toPrivacy} />,
    })),
};

/** Source module per page — used by the prerender script to look up chunks in the Vite manifest. */
export const PAGE_SOURCES: Record<PageKey, string> = {
  home: 'src/pages/HomePage.tsx',
  pricing: 'src/pages/PricingPage.tsx',
  about: 'src/pages/AboutUs.tsx',
  services: 'src/pages/ServicesPage.tsx',
  service: 'src/pages/ServicePage.tsx',
  guides: 'src/pages/GuidesPage.tsx',
  guide: 'src/pages/GuidePage.tsx',
  work: 'src/pages/WorkPage.tsx',
  caseStudy: 'src/pages/CaseStudyPage.tsx',
  notFound: 'src/pages/NotFoundPage.tsx',
  privacy: 'src/pages/PrivacyPolicy.tsx',
  terms: 'src/pages/TermsOfUse.tsx',
};
