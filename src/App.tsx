import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { CredibilityRail } from '@/sections/CredibilityRail';
import { WhyCustomSection } from '@/sections/WhyCustomSection';
import { ProductStackSection } from '@/sections/ProductStackSection';
import { SelectedWorkSection } from '@/sections/SelectedWorkSection';
import { CapabilitiesSection } from '@/sections/CapabilitiesSection';
import { TechnicalProofSection } from '@/sections/TechnicalProofSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { PricingSection } from '@/sections/PricingSection';
import { TeamSection } from '@/sections/TeamSection';
import { FaqSection } from '@/sections/FaqSection';
import { EditorialSection } from '@/sections/EditorialSection';
import { InquirySection } from '@/sections/InquirySection';
import { Footer } from '@/sections/Footer';
import { StatsScatter } from '@/components/StatsScatter';
import { IntroSplit } from '@/components/IntroSplit';
import { StackedCta } from '@/components/StackedCta';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { AboutUs } from '@/pages/AboutUs';
import { TermsOfUse } from '@/pages/TermsOfUse';
import { applyPageMeta, PAGE_META } from '@/components/Seo';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'privacy' | 'terms' | 'about'>(() => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash;
    if (hash.startsWith('#privacy')) return 'privacy';
    if (hash.startsWith('#terms')) return 'terms';
    if (hash.startsWith('#about')) return 'about';
    return 'home';
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#privacy')) {
        setCurrentRoute('privacy');
      } else if (hash.startsWith('#terms')) {
        setCurrentRoute('terms');
      } else if (hash.startsWith('#about')) {
        setCurrentRoute('about');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keep <title> / description / social tags in sync with the hash "page" being shown
  useEffect(() => {
    applyPageMeta(PAGE_META[currentRoute]);
  }, [currentRoute]);

  // On desktop, mailto: links open Gmail compose in a new tab (works without a mail app installed).
  // On touch devices the native mail app is the better target, so the link is left alone.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="mailto:"]');
      if (!a) return;
      e.preventDefault();
      const url = new URL(a.getAttribute('href') as string);
      const params = new URLSearchParams({ view: 'cm', fs: '1', to: decodeURIComponent(url.pathname) });
      const subject = url.searchParams.get('subject');
      const body = url.searchParams.get('body');
      if (subject) params.set('su', subject);
      if (body) params.set('body', body);
      window.open(`https://mail.google.com/mail/?${params.toString()}`, '_blank', 'noopener,noreferrer');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('.cred-card, .vt-glow');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPrivacy = () => {
    window.location.hash = '#privacy';
    setCurrentRoute('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTerms = () => {
    window.location.hash = '#terms';
    setCurrentRoute('terms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      {/* First-load brand introduction (only on home) */}
      {currentRoute === 'home' && <LoadingScreen />}

      {currentRoute === 'privacy' && (
        <PrivacyPolicy onBackToHome={navigateToHome} />
      )}

      {currentRoute === 'about' && <AboutUs onBackToHome={navigateToHome} />}

      {currentRoute === 'terms' && (
        <TermsOfUse
          onBackToHome={navigateToHome}
          onNavigateToPrivacy={navigateToPrivacy}
        />
      )}

      {currentRoute === 'home' && (
        <>
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

          {/* 05 Technical Capabilities & Integrations */}
          {/* <CapabilitiesSection /> */}

          {/* 06 Technical Proof & Dual Layer Switcher */}
          <TechnicalProofSection />

          {/* Client Testimonials */}
          <TestimonialsSection />

          {/* 07 Engineering Process */}
          <ProcessSection />

          {/* 08 Pricing & Tiers (Launch, Grow, Build) */}
          <PricingSection />

          {/* 08 The People Behind The Systems */}
          <TeamSection />

          {/* 09 Frequently Asked Questions */}
          <FaqSection />

          <StackedCta />

          {/* 10 Start a Project / Inquiry */}
          <InquirySection />
        </main>

        {/* Studio Footer with Giant Wordmark */}
        <Footer />

        {/* Floating WhatsApp Engineering Chat */}
        <WhatsAppButton />
      </div>
    </>
  )}
</ThemeProvider>
);
};

export default App;
