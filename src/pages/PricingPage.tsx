import React from 'react';
import { Navigation } from '@/components/Navigation';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PricingSection } from '@/sections/PricingSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { WorkTogetherSection } from '@/sections/WorkTogetherSection';
import { Footer } from '@/sections/Footer';

/**
 * Pricing page (#pricing, #process): tiers first, then how we work and the
 * commercial terms, closing with the shared "Let's work together" CTA + footer.
 * Sections are moved from home unchanged.
 */
export const PricingPage: React.FC = () => (
  <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-mc-orange focus:text-mc-bg focus:font-mono focus:text-xs focus:rounded-md"
    >
      Skip to main content
    </a>
    <div className="min-h-screen bg-mc-bg text-mc-text selection:bg-mc-orange selection:text-mc-bg relative">
      <Navigation />
      <main id="main-content" className="pt-16">
        <PricingSection />
        <ProcessSection />
        <WorkTogetherSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  </>
);
