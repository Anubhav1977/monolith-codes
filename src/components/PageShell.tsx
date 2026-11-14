import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/sections/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

/** Shared chrome for content pages: skip link, navigation, <main>, footer and WhatsApp CTA. */
export const PageShell: React.FC<{ children: React.ReactNode; mainClassName?: string }> = ({
  children,
  mainClassName = 'pt-18',
}) => (
  <>
    <a
      href="#main-content"
      data-native
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-mc-orange focus:text-mc-bg focus:font-mono focus:text-xs focus:rounded-md"
    >
      Skip to main content
    </a>
    <div className="min-h-screen bg-mc-bg text-mc-text selection:bg-mc-orange selection:text-mc-bg relative">
      <Navigation />
      <main id="main-content" className={mainClassName}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  </>
);

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail (mirrors the BreadcrumbList structured data). */
export const Breadcrumbs: React.FC<{ items: Crumb[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="font-mono text-xs text-mc-text-tertiary">
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <li key={c.path} className="flex items-center gap-2">
            {last ? (
              <span aria-current="page" className="text-mc-text-secondary">
                {c.name}
              </span>
            ) : (
              <>
                <a href={c.path} className="inline-flex min-h-6 items-center hover:text-mc-orange transition-colors">
                  {c.name}
                </a>
                <span aria-hidden="true">/</span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
