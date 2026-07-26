import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { CredibilityRail } from '@/sections/CredibilityRail';
import { CapabilitiesSection } from '@/sections/CapabilitiesSection';
import { SelectedWorkSection } from '@/sections/SelectedWorkSection';
import { ServiceSystemsSection } from '@/sections/ServiceSystemsSection';
import { TechnicalProofSection } from '@/sections/TechnicalProofSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { EditorialSection } from '@/sections/EditorialSection';
import { EngagementSection } from '@/sections/EngagementSection';
import { InquirySection } from '@/sections/InquirySection';
import { Footer } from '@/sections/Footer';

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

      <div className="min-h-screen bg-mc-bg text-mc-text selection:bg-mc-orange selection:text-mc-bg">
        <Navigation />

        <main id="main-content">
          <HeroSection />
          <CredibilityRail />
          <CapabilitiesSection />
          <SelectedWorkSection />
          <ServiceSystemsSection />
          <TechnicalProofSection />
          <ProcessSection />
          <EditorialSection />
          <EngagementSection />
          <InquirySection />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
