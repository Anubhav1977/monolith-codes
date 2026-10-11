import React, { useState, useEffect } from 'react';
import {
  FileText,
  Shield,
  ArrowLeft,
  Printer,
  Mail,
  ChevronRight,
  Lock,
  Scale,
  Ban,
  Layers,
  Globe,
  List,
  X,
  ChevronDown
} from 'lucide-react';
import { BrandLockup } from '@/components/BrandLockup';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

interface TermsOfUseProps {
  onBackToHome?: () => void;

  onNavigateToPrivacy?: () => void;
}

export const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBackToHome, onNavigateToPrivacy }) => {
  const [activeSection, setActiveSection] = useState<string>('terms-01');
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const hash = window.location.hash;
    if (hash && hash !== '#terms' && hash !== '#terms-of-use') {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -65% 0px' }
    );

    const sections = document.querySelectorAll('section[id^="terms-"]');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // Lock background scrolling when mobile TOC is open
  useEffect(() => {
    if (mobileTocOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileTocOpen]);

  // Handle Escape key to close mobile TOC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileTocOpen) {
        setMobileTocOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileTocOpen]);

  const handlePrint = () => {
    window.print();
  };

  const navItems = [
    { id: 'terms-01', title: '01. Scope & Website Use', tag: 'Scope' },
    { id: 'terms-02', title: '02. Operator & Contact', tag: 'Identity' },
    { id: 'terms-03', title: '03. Acceptance & Updates', tag: 'Revisions' },
    { id: 'terms-04', title: '04. Permitted & Prohibited Use', tag: 'Rules' },
    { id: 'terms-05', title: '05. Studio Intellectual Property', tag: 'IP Rights' },
    { id: 'terms-06', title: '06. Inquiries & NDA Protocol', tag: 'Submissions' },
    { id: 'terms-07', title: '07. Informational Content & Scope', tag: 'Non-Binding' },
    { id: 'terms-08', title: '08. Availability & External Links', tag: 'Uptime' },
    { id: 'terms-09', title: '09. Business Outcomes Disclaimer', tag: 'Outcomes' },
    { id: 'terms-10', title: '10. Warranties & Liability', tag: 'Limitation' },
    { id: 'terms-11', title: '11. Access Suspension', tag: 'Termination' },
    { id: 'terms-12', title: '12. Governing Law & General', tag: 'Jurisdiction' },
    { id: 'terms-13', title: '13. Related Policies & Contact', tag: 'Contact' },
  ];

  const currentNav = navItems.find((item) => item.id === activeSection) || navItems[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileTocOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-mc-bg text-mc-text selection:bg-mc-orange selection:text-mc-bg">
      {/* Top Utility Header — Fully Mobile Responsive */}
      <header className="sticky top-0 z-50 bg-mc-bg/95 backdrop-blur-md border-b border-mc-border print:hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-6 min-w-0">
            <button
              onClick={() => {
                if (onBackToHome) {
                  onBackToHome();
                } else {
                  window.location.hash = '';
                }
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-mc-border bg-mc-surface hover:bg-mc-surface-hover text-mc-text-body hover:text-mc-text-strong text-xs font-mono transition-colors cursor-pointer group shrink-0"
              aria-label="Return to Monolith Codes Homepage"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-mc-orange shrink-0" />
              <span className="hidden sm:inline">Back to Studio</span>
              <span className="sm:hidden text-xs">Back</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onBackToHome) {
                    onBackToHome();
                  } else {
                    window.location.hash = '';
                  }
                }}
                className="flex items-center cursor-pointer group shrink-0"
                aria-label="MONOLITH CODES — Return to Homepage"
              >
                <BrandLockup variant="horizontal" size="sm" interactiveHover />
              </a>
              <span className="hidden md:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-mc-surface border border-mc-border text-mc-text-tertiary shrink-0">
                LEGAL // TERMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mobile TOC Button */}
            <button
              onClick={() => setMobileTocOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-mc-border bg-mc-surface hover:bg-mc-surface-hover text-mc-text-strong text-xs font-mono transition-colors cursor-pointer"
              aria-label={mobileTocOpen ? 'Close Table of Contents' : 'Open Table of Contents'}
              aria-expanded={mobileTocOpen}
            >
              <List className="w-3.5 h-3.5 text-mc-orange" />
              <span className="text-[11px] font-medium hidden xs:inline">Index</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-mc-border bg-mc-surface hover:bg-mc-surface-hover text-mc-text-body text-xs font-mono transition-colors cursor-pointer"
              title="Print document or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-mc-text-secondary" />
              <span>Print / PDF</span>
            </button>

            {/* Email link: Full text on sm+, icon button on mobile */}
            <a
              href="mailto:studio@monolithcodes.com?subject=Terms%20of%20Use%20Inquiry"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-mc-orange-10 border border-mc-orange-28 text-mc-orange hover:bg-mc-orange hover:text-mc-bg text-xs font-mono font-medium transition-colors"
              title="Contact studio@monolithcodes.com"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>studio@monolithcodes.com</span>
            </a>
            <a
              href="mailto:studio@monolithcodes.com?subject=Terms%20of%20Use%20Inquiry"
              className="sm:hidden p-2 rounded-lg bg-mc-orange-10 border border-mc-orange-28 text-mc-orange hover:bg-mc-orange hover:text-mc-bg transition-colors"
              aria-label="Email studio@monolithcodes.com"
              title="studio@monolithcodes.com"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Sticky Mobile Sub-Navbar for Quick Section Navigation */}
      <div className="lg:hidden sticky top-16 z-30 bg-mc-bg/95 backdrop-blur-md border-b border-mc-border px-4 py-2.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <span className="w-2 h-2 rounded-full bg-mc-orange shrink-0 animate-pulse" />
          <span className="truncate text-mc-text-strong font-medium text-[11px] sm:text-xs">
            {currentNav.title}
          </span>
        </div>
        <button
          onClick={() => setMobileTocOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-mc-surface border border-mc-border text-mc-orange hover:bg-mc-surface-hover transition-colors shrink-0 cursor-pointer"
        >
          <List className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Sections</span>
          <ChevronDown className="w-3 h-3 text-mc-text-tertiary" />
        </button>
      </div>

      {/* Mobile Table of Contents Modal Drawer */}
      {mobileTocOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileTocOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="relative w-full max-h-[85vh] bg-mc-surface-deep border-t border-mc-border rounded-t-2xl shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-mc-border">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-mc-orange" />
                <span className="font-mono text-xs font-semibold text-mc-text-strong uppercase tracking-wider">
                  Terms Navigation
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-mc-surface border border-mc-border text-mc-text-tertiary">
                  13 Sections
                </span>
              </div>
              <button
                onClick={() => setMobileTocOpen(false)}
                className="p-1.5 rounded-lg border border-mc-border bg-mc-surface hover:bg-mc-surface-hover text-mc-text-secondary hover:text-mc-text-strong transition-colors cursor-pointer"
                aria-label="Close Table of Contents"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Section Links */}
            <div className="overflow-y-auto px-4 py-3 space-y-1 divide-y divide-mc-border/30 max-h-[55vh]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    'w-full text-left flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer pt-3',
                    activeSection === item.id
                      ? 'bg-mc-orange-10 text-mc-orange font-semibold border border-mc-orange-28'
                      : 'text-mc-text-secondary hover:text-mc-text-strong hover:bg-mc-surface'
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full shrink-0',
                        activeSection === item.id ? 'bg-mc-orange' : 'bg-mc-text-tertiary'
                      )}
                    />
                    <span className="text-xs font-sans truncate">{item.title}</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-mc-surface border border-mc-border text-mc-text-tertiary shrink-0">
                    {item.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Drawer Footer Contact Bar */}
            <div className="p-4 border-t border-mc-border bg-mc-surface flex items-center justify-between gap-3 text-xs font-mono">
              <div className="truncate">
                <span className="text-mc-text-tertiary text-[10px] block">DIRECT INQUIRIES</span>
                <span className="text-mc-text-strong font-medium truncate">studio@monolithcodes.com</span>
              </div>
              <a
                href="mailto:studio@monolithcodes.com?subject=Website%20Terms%20Inquiry"
                className="px-3 py-1.5 rounded-lg bg-mc-orange text-mc-bg font-sans font-semibold text-xs hover:bg-mc-orange-highlight transition-colors shrink-0"
              >
                Email Studio
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Terms Layout */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 md:py-24">
        {/* Document Hero */}
        <div className="mb-20 pb-16 border-b border-mc-border">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-mc-orange-10 border border-mc-orange-28 text-mc-orange text-xs font-mono font-semibold">
              <Scale className="w-3.5 h-3.5" />
              WEBSITE TERMS OF USE
            </span>
            <span className="text-xs font-mono text-mc-text-tertiary">
              EFFECTIVE: OCTOBER 11, 2026
            </span>
            <span className="text-xs font-mono text-mc-text-tertiary">
              &bull; VERSION 2.1
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-mc-system-green">
              <span className="w-1.5 h-1.5 rounded-full bg-mc-system-green" />
              PUBLIC WEBSITE ACCESS ONLY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium text-mc-text-strong tracking-tight leading-[1.18] mb-6 max-w-4xl">
            Website Terms of Use
          </h1>

          <p className="text-base sm:text-lg text-mc-text-body font-sans leading-relaxed max-w-3xl mb-12">
            These Terms of Use govern access to and use of the public MONOLITH CODES website (<code>monolithcodes.com</code>). Paid custom software development, engineering sprints, and maintenance engagements are governed by separate, signed client agreements.
          </p>

          {/* Quick Demarcation Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange font-medium">
                <Globe className="w-4 h-4" />
                <span>WEBSITE ACCESS</span>
              </div>
              <div className="text-sm font-sans font-medium text-mc-text-strong">
                Informational Browsing
              </div>
              <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                Governs public exploration, portfolio viewing, and enquiry submissions.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange font-medium">
                <Layers className="w-4 h-4" />
                <span>SEPARATE CONTRACTS</span>
              </div>
              <div className="text-sm font-sans font-medium text-mc-text-strong">
                Client Project SOWs
              </div>
              <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                Development work, milestones, code delivery, and IP handoff are governed by signed agreements.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange font-medium">
                <Lock className="w-4 h-4" />
                <span>CONFIDENTIALITY</span>
              </div>
              <div className="text-sm font-sans font-medium text-mc-text-strong">
                Dedicated NDAs
              </div>
              <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                Confidential project parameters and credentials must be shared under executed mutual NDAs.
              </p>
            </div>
          </div>
        </div>

        {/* Layout Grid with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Table of Contents (Desktop Only - hidden on mobile) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6 print:hidden">
            <div className="p-6 rounded-xl bg-mc-surface border border-mc-border space-y-4">
              <div className="font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>TERMS NAVIGATION</span>
              </div>

              <nav className="space-y-1 font-sans text-xs">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection(item.id);
                      }
                    }}
                    className={cn(
                      'flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group',
                      activeSection === item.id
                        ? 'bg-mc-orange-10 text-mc-orange font-medium border border-mc-orange-28'
                        : 'text-mc-text-secondary hover:text-mc-text-strong hover:bg-mc-surface-hover'
                    )}
                  >
                    <span className="truncate">{item.title}</span>
                    <span className="font-mono text-[10px] text-mc-text-tertiary group-hover:text-mc-text-secondary ml-2 shrink-0">
                      {item.tag}
                    </span>
                  </a>
                ))}
              </nav>

              <hr className="border-mc-border my-2" />

              <div className="font-mono text-xs text-mc-text-tertiary space-y-1">
                <div>INQUIRIES: studio@monolithcodes.com</div>
                <div>DOC: MC-LEG-TERMS-2026.2</div>
              </div>
            </div>

            {/* Quick Link to Privacy Policy */}
            <div className="p-6 rounded-xl bg-mc-surface-deep border border-mc-border space-y-3">
              <div className="text-xs font-mono text-mc-text-strong flex items-center gap-2">
                <Shield className="w-4 h-4 text-mc-orange" />
                <span>Looking for Privacy Info?</span>
              </div>
              <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                For information on data collection, 12-month inquiry retention, and sub-processors, view our Data Governance Policy.
              </p>
              <button
                onClick={() => {
                  if (onNavigateToPrivacy) {
                    onNavigateToPrivacy();
                  } else {
                    window.location.hash = '#privacy';
                  }
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-mc-surface border border-mc-border hover:border-mc-orange text-xs font-mono text-mc-orange flex items-center justify-center gap-2 transition-colors font-medium cursor-pointer"
              >
                <span>View Privacy Policy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>

          {/* Document Content Sections */}
          <div className="lg:col-span-8 space-y-20">

            {/* 01. Introduction and Scope */}
            <section id="terms-01" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 01</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Introduction and Scope
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  These Website Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of the website located at <code>monolithcodes.com</code>, including all content, visual interfaces, documentation, and inquiry mechanisms published on it (collectively, the &ldquo;Website&rdquo;).
                </p>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
                  <div className="font-mono text-xs text-mc-text-strong flex items-center gap-2">
                    <Layers className="w-4 h-4 text-mc-orange" />
                    <span>Fundamental Distinction: Website Use vs. Client Engagements</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                    These Terms govern <strong>only public browsing and inquiry submission</strong>. Any commercial custom software development, engineering sprints, dedicated retainer cells, or consulting services provided by MONOLITH CODES are governed exclusively by a separate, bilateral written agreement—such as a Master Services Agreement (MSA), Statement of Work (SOW), or signed project proposal.
                  </p>
                </div>
              </div>
            </section>

            {/* 02. Website Operator and Contact */}
            <section id="terms-02" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 02</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Website Operator and Contact
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  The Website is operated under the commercial brand name <strong>MONOLITH CODES</strong>, led by founder and lead software architect <strong>Anubhav Garg</strong>. Formal corporate registration and entity formalization are currently underway.
                </p>

                <p>
                  In accordance with genuine organizational transparency, we do not publish an unmonitored physical office address. For all contractual engagements, formal quotations, invoices, and legal correspondence, the contracting party will be explicitly identified in the applicable agreement.
                </p>

                <div className="p-4 rounded-xl bg-mc-surface-deep border border-mc-border flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-mc-text-secondary">Official Studio Inquiry Address:</span>
                  <a href="mailto:studio@monolithcodes.com" className="font-mono text-mc-orange hover:underline font-medium">
                    studio@monolithcodes.com
                  </a>
                </div>
              </div>
            </section>

            {/* 03. Acceptance and Updates */}
            <section id="terms-03" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 03</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Acceptance and Updates
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  By accessing or browsing this Website, you acknowledge that you have read, understood, and agree to comply with these Terms. If you do not agree with any part of these Terms, your sole recourse is to discontinue using the Website.
                </p>

                <p>
                  We reserve the right to modify these Terms at any time to reflect operational, legal, or infrastructural changes. When changes occur, the updated Terms will be published on this page with an updated &ldquo;Effective Date.&rdquo; Your continued use of the Website after amendments are posted signifies acceptance of the revised Terms.
                </p>
              </div>
            </section>

            {/* 04. Permitted Use and Prohibited Activities */}
            <section id="terms-04" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 04</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Permitted Use and Prohibited Activities
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  You are permitted to access and view the Website solely for legitimate business information, evaluating our engineering capabilities, reviewing technical case studies, and submitting project inquiries.
                </p>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-3">
                  <div className="font-mono text-xs text-mc-orange uppercase font-semibold flex items-center gap-2">
                    <Ban className="w-4 h-4" />
                    <span>Explicitly Prohibited Activities</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-mc-text-body list-disc pl-5">
                    <li>Using automated crawlers, scrapers, bots, or extraction scripts to harvest proprietary case study text, graphics, or code snippets without written permission;</li>
                    <li>Attempting unauthorized access to the Website hosting infrastructure, serverless endpoints, or private administration portals;</li>
                    <li>Submitting fraudulent, deceptive, or abusive messages through our project inquiry forms or communication channels;</li>
                    <li>Injecting malicious software, automated exploits, denial-of-service traffic, or cross-site scripting payloads;</li>
                    <li>Misrepresenting your identity or affiliation with an organization when booking discovery consultations.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 05. Website Content and Intellectual Property */}
            <section id="terms-05" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 05</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Website Content and Intellectual Property
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  All content published on this Website—including the MONOLITH CODES brandmark, typography arrangements, UI layouts, interactive diagrams, architectural documentation, and custom CSS design tokens—is protected by applicable copyright, trademark, and intellectual property laws.
                </p>

                <p>
                  Accessing the Website does not grant you any license, assignment, or ownership of our brand assets or website design system. You may not reproduce, modify, mirror, or commercially redistribute our materials without prior written authorization.
                </p>

                <div className="p-4 rounded-xl bg-mc-surface-deep border border-mc-border text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                  <strong className="text-mc-text-strong">Client Deliverables Distinction:</strong> The studio&rsquo;s website intellectual property is completely distinct from the custom software, applications, and source code we engineer for paying clients. Ownership of client project deliverables is governed by the applicable project contract, which provides 100% IP ownership to the client upon full payment.
                </div>
              </div>
            </section>

            {/* 06. Enquiries and Submitted Information */}
            <section id="terms-06" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 06</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Inquiries &amp; Confidentiality Protocol
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  When submitting inquiries through our contact forms, WhatsApp, or Cal.com, you agree to provide accurate and truthful information. Details on how we process and retain your inquiry data are set out in our <a href="#privacy" className="text-mc-orange hover:underline font-medium">Privacy Policy</a>.
                </p>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
                  <div className="font-mono text-xs text-mc-orange uppercase font-semibold flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Confidentiality &amp; NDA Notice</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                    Submitting an inquiry through a public web form does not automatically establish an attorney-client or fiduciary relationship, nor does it automatically create a binding Non-Disclosure Agreement. If your project involves highly sensitive proprietary algorithms, patent-pending architectures, or regulated data, <strong>request a bilateral NDA before transmitting sensitive materials</strong>. We routinely execute NDAs with prospective clients prior to deep architectural scoping.
                  </p>
                </div>
              </div>
            </section>

            {/* 07. Website Information and Service Descriptions */}
            <section id="terms-07" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 07</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Website Information &amp; Non-Binding Estimates
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  The content published on this Website—including capability descriptions, technical proof benchmarks, illustrative pricing ranges, and sprint durations—is provided solely for general informational and orientation purposes.
                </p>

                <p>
                  Website descriptions do not constitute an unconditional, binding commercial offer or fixed-price quotation. Exact engineering deliverables, architecture specifications, sprint milestones, warranty periods, and commercial terms are established exclusively in an individualized written proposal and Statement of Work.
                </p>
              </div>
            </section>

            {/* 08. Availability, Accuracy and External Links */}
            <section id="terms-08" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 08</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Availability, Accuracy and External Links
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  While we strive to keep our Website operational and updated, we do not warrant that access will be completely uninterrupted, timely, secure, or free from typographical or technical errors. We may update, suspend, or modify portions of the Website at our discretion.
                </p>

                <p>
                  The Website may contain links to third-party services (such as Cal.com, WhatsApp, or external developer documentation). These links are provided solely for convenience. We do not control, endorse, or assume responsibility for the content, security, or terms of third-party platforms.
                </p>
              </div>
            </section>

            {/* 09. No Guaranteed Business Outcomes */}
            <section id="terms-09" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 09</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                No Guaranteed Business Outcomes
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  Case studies, performance metrics, and technical demonstrations showcased on the Website illustrate our past engineering craftsmanship and architectural standards.
                </p>

                <p>
                  They do not constitute a guarantee of specific commercial outcomes, search engine rankings, visitor traffic volumes, conversion rates, or business revenue for your particular application. Ultimate business results depend on multiple market factors, customer acquisition strategies, business models, and operational execution outside the scope of software development.
                </p>
              </div>
            </section>

            {/* 10. Warranties and Limitation of Liability */}
            <section id="terms-10" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 10</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Warranties and Limitation of Liability
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  The Website and its contents are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express, statutory, or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>

                <p>
                  To the maximum extent permitted by applicable law, MONOLITH CODES and its team shall not be liable for any indirect, incidental, consequential, special, or punitive damages—including loss of profits, loss of data, business interruption, or technological downtime—arising out of or relating to your use of, or inability to use, this public Website.
                </p>

                <div className="p-4 rounded-xl bg-mc-surface border border-mc-border text-xs text-mc-text-secondary">
                  *Nothing in these Terms limits liability for fraud, gross negligence, intentional misconduct, or any other liability that cannot be lawfully excluded under applicable law.
                </div>
              </div>
            </section>

            {/* 11. Suspension and Termination of Website Access */}
            <section id="terms-11" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 11</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Suspension and Termination of Website Access
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  We reserve the right to restrict, suspend, or terminate your access to the Website or our inquiry endpoints at our discretion, without prior notice, if we reasonably determine that you have violated these Terms, engaged in automated abuse, or posed a security risk to our infrastructure.
                </p>

                <p>
                  Suspension of public website browsing has no bearing on existing client project agreements, which maintain their own termination, dispute, and handover clauses.
                </p>
              </div>
            </section>

            {/* 12. Governing Law and General Provisions */}
            <section id="terms-12" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 12</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Governing Law and General Provisions
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with the use of this public Website shall be subject to the appropriate courts having jurisdiction, subject to preliminary amicable dispute resolution.
                </p>

                <p>
                  <strong>Severability:</strong> If any provision of these Terms is found to be unlawful or unenforceable, that provision will be severed without affecting the validity of the remaining provisions.
                </p>

                <p>
                  <strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and MONOLITH CODES regarding public Website use, superseding prior understandings regarding website browsing.
                </p>
              </div>
            </section>

            {/* 13. Related Policies and Contact */}
            <section id="terms-13" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 13</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Related Policies and Studio Contact
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  For details regarding our data collection standards, 12-month inquiry retention schedules, and verified third-party sub-processors, please consult our <a href="#privacy" className="text-mc-orange hover:underline font-medium">Privacy Policy</a>.
                </p>

                <div className="p-6 rounded-xl bg-mc-surface-deep border border-mc-border space-y-3">
                  <div className="font-mono text-xs text-mc-text-strong flex items-center gap-2">
                    <Mail className="w-4 h-4 text-mc-orange" />
                    <span>Inquiries Regarding Terms</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                    If you have questions regarding these Website Terms of Use, contact our studio administration directly:
                  </p>
                  <a
                    href="mailto:studio@monolithcodes.com?subject=Website%20Terms%20Inquiry"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-mc-orange text-mc-bg font-sans font-semibold text-xs sm:text-sm hover:bg-mc-orange-highlight transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>studio@monolithcodes.com</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Mobile Privacy Policy Cross-Link Card (Visible on mobile only) */}
            <div className="lg:hidden p-5 rounded-xl bg-mc-surface border border-mc-border space-y-3">
              <div className="text-xs font-mono text-mc-text-strong flex items-center gap-2">
                <Shield className="w-4 h-4 text-mc-orange" />
                <span>Looking for Privacy &amp; Data Governance?</span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-mc-text-secondary leading-relaxed">
                For information regarding data collection standards, 12-month lead retention, and our sub-processors, view our Data Governance Policy.
              </p>
              <button
                onClick={() => {
                  if (onNavigateToPrivacy) {
                    onNavigateToPrivacy();
                  } else {
                    window.location.hash = '#privacy';
                  }
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-mc-surface-deep border border-mc-border hover:border-mc-orange text-xs font-mono text-mc-orange flex items-center justify-center gap-2 transition-colors font-medium cursor-pointer"
              >
                <span>View Privacy Policy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Handoff */}
        <div className="mt-24 pt-12 border-t border-mc-border flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-sans font-medium text-base text-mc-text-strong">
              Ready to engineer your custom software platform?
            </h3>
            <p className="text-xs sm:text-sm text-mc-text-secondary font-sans">
              Connect directly with our senior software architects to review your technical scope.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onBackToHome) {
                  onBackToHome();
                } else {
                  window.location.hash = '';
                }
              }}
              className="px-4 py-2.5 rounded-lg border border-mc-border bg-mc-surface hover:bg-mc-surface-hover text-xs font-mono text-mc-text-strong transition-colors cursor-pointer"
            >
              Back to Home
            </button>

            <button
              onClick={() => {
                if (onBackToHome) {
                  onBackToHome();
                  setTimeout(() => {
                    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  window.location.hash = '#inquiry';
                }
              }}
              className="px-4 py-2.5 rounded-lg bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight font-sans font-semibold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
            >
              Start a Project
            </button>
          </div>
        </div>
      </main>

      {/* Simplified Legal Footer */}
      <footer className="py-8 border-t border-mc-border bg-mc-surface-deep text-center font-mono text-xs text-mc-text-tertiary">
        <div className="max-w-[1280px] mx-auto px-6">
          MONOLITH CODES &bull; WEBSITE TERMS OF USE &bull; STUDIO@MONOLITHCODES.COM
        </div>
      </footer>
    </div>
  );
};
