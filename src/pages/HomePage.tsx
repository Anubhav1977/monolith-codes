import React from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HeroSection } from '@/sections/HeroSection';
import { CredibilityRail } from '@/sections/CredibilityRail';
import { WhyCustomSection } from '@/sections/WhyCustomSection';
import { ProductStackSection } from '@/sections/ProductStackSection';
import { SelectedWorkSection } from '@/sections/SelectedWorkSection';
import { TechnicalProofSection } from '@/sections/TechnicalProofSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { PricingTeaser } from '@/sections/PricingTeaser';
import { TeamSection } from '@/sections/TeamSection';
import { FaqSection } from '@/sections/FaqSection';
import { EditorialSection } from '@/sections/EditorialSection';
import { InquirySection } from '@/sections/InquirySection';
import { WorkTogetherSection } from '@/sections/WorkTogetherSection';
import { OwnershipSection } from '@/sections/OwnershipSection';
import { StatsScatter } from '@/components/StatsScatter';
import { IntroSplit } from '@/components/IntroSplit';
import { PageShell } from '@/components/PageShell';
import { IS_SERVER } from '@/lib/env';

/** Home ("/"). The intro screen is client-only so prerendered HTML always contains the real content. */
const HomePage: React.FC = () => (
  <>
    {!IS_SERVER && <LoadingScreen />}
    <PageShell mainClassName="">
      {/* 01 Hero */}
      <HeroSection />

      <StatsScatter />

      <IntroSplit />

      {/* Trust Bar */}
      <CredibilityRail />

      {/* 02 Why Custom Engineering & What We DON'T Build With */}
      <WhyCustomSection />

      {/* Editorial Rhythm 1 */}
      <EditorialSection
        label="MC / CORE USP"
        headline="Zero templates. Zero lock-in."
        quote="“Every solution is custom engineered for your business. Never built from templates. Never assembled from pre-made themes.”"
        author="MONOLITH CODES POSITIONING"
        subtitle="Ground-Up Custom Architecture • Zero Vendor Lock-in"
      />

      {/* 03 Product Stack (Sticky Interactive) */}
      <ProductStackSection />

      {/* 04 Selected Work & Visual Proof */}
      <SelectedWorkSection />

      {/* Editorial Rhythm 2 */}
      <EditorialSection
        label="MC / OUR ENGINEERING THESIS"
        headline="Built like architecture."
        quote="“Serious business software should feel constructed like architecture: structural, precise, quiet, and built to perform for years without breakdown.”"
        author="MONOLITH CODES STUDIO DIRECTIVE"
        subtitle="Production-Grade React • Zero Superficial Hype"
      />

      {/* 06 Technical Proof & Dual Layer Switcher */}
      <TechnicalProofSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* 07 Pricing teaser — full tiers, process and terms live on /pricing */}
      <PricingTeaser />

      {/* 08 The People Behind The Systems */}
      <TeamSection />

      {/* 09 Frequently Asked Questions */}
      <FaqSection />

      <OwnershipSection />

      {/* 10 Start a Project / Inquiry */}
      <InquirySection />

      {/* 11 Closing CTA — Let's work together */}
      <WorkTogetherSection />
    </PageShell>
  </>
);

export default HomePage;
