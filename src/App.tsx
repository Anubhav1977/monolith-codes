import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { CredibilityRail } from '@/sections/CredibilityRail';
import { WhyCustomSection } from '@/sections/WhyCustomSection';
import { ProductStackSection } from '@/sections/ProductStackSection';
import { SelectedWorkSection } from '@/sections/SelectedWorkSection';
import { CapabilitiesSection } from '@/sections/CapabilitiesSection';
import { TechnicalProofSection } from '@/sections/TechnicalProofSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { PricingSection } from '@/sections/PricingSection';
import { FaqSection } from '@/sections/FaqSection';
import { EditorialSection } from '@/sections/EditorialSection';
import { InquirySection } from '@/sections/InquirySection';
import { Footer } from '@/sections/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-mc-orange focus:text-mc-bg focus:font-mono focus:text-xs focus:rounded-md"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-mc-bg text-mc-text selection:bg-mc-orange selection:text-mc-bg relative">
        <Navigation />

        <main id="main-content">
          {/* 01 Hero */}
          <HeroSection />

          {/* Trust Bar */}
          <CredibilityRail />

          {/* 02 Why Custom Engineering & What We DON'T Build With */}
          <WhyCustomSection />

          {/* Editorial Rhythm 1 */}
          <EditorialSection
            label="MC / CORE USP"
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
            quote="“Serious business software should feel constructed like architecture: structural, precise, quiet, and built to perform for years without breakdown.”"
            author="MONOLITH CODES STUDIO DIRECTIVE"
            subtitle="Production-Grade React • Zero Superficial Hype"
          />

          {/* 05 Technical Capabilities & Integrations */}
          {/* <CapabilitiesSection /> */}

          {/* 06 Technical Proof & Dual Layer Switcher */}
          <TechnicalProofSection />

          {/* 07 Engineering Process */}
          <ProcessSection />

          {/* 08 Pricing & Tiers (Launch, Grow, Build) */}
          <PricingSection />

          {/* 09 Frequently Asked Questions */}
          <FaqSection />

          {/* 10 Start a Project / Inquiry */}
          <InquirySection />
        </main>

        {/* Studio Footer with Giant Wordmark */}
        <Footer />

        {/* Floating WhatsApp Engineering Chat */}
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
};

export default App;
