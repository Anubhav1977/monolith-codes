import React from 'react';
import { PageShell } from '@/components/PageShell';
import { PricingSection } from '@/sections/PricingSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { WorkTogetherSection } from '@/sections/WorkTogetherSection';

/**
 * Pricing page (/pricing, /pricing#process): tiers first, then how we work and the
 * commercial terms, closing with the shared "Let's work together" CTA + footer.
 */
const PricingPage: React.FC = () => (
  <PageShell mainClassName="pt-16">
    <PricingSection />
    <ProcessSection />
    <WorkTogetherSection />
  </PageShell>
);

export { PricingPage };
export default PricingPage;
