import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Database,
  Mail,
  FileText,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Printer,
  Clock,
  AlertTriangle,
  Layers,
  Globe,
  Server,
  KeyRound,
  EyeOff,
  Search,
  MessageSquare,
  Check,
  ChevronRight,
  UserCheck,
  Building2,
  HardDrive,
  List,
  X,
  ChevronDown
} from 'lucide-react';
import { BrandLockup } from '@/components/BrandLockup';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

interface PrivacyPolicyProps {
  onBackToHome?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToHome }) => {
  const [activeSection, setActiveSection] = useState<string>('section-01');
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const hash = window.location.hash;
    if (hash && hash !== '#privacy') {
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

    const sections = document.querySelectorAll('section[id^="section-"]');
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
    { id: 'section-01', title: '01. Who We Are & Scope', tag: 'Identity' },
    { id: 'section-02', title: '02. Information We Collect', tag: 'Data Fields' },
    { id: 'section-03', title: '03. How We Collect Data', tag: 'Channels' },
    { id: 'section-04', title: '04. Why We Use Information', tag: 'Purposes' },
    { id: 'section-05', title: '05. Service Providers & Sharing', tag: 'Sub-processors' },
    { id: 'section-06', title: '06. Cookies & Search Console', tag: 'Technologies' },
    { id: 'section-07', title: '07. Storage, Security & Retention', tag: '12-Mo Cycle' },
    { id: 'section-08', title: '08. International Processing', tag: 'Cross-Border' },
    { id: 'section-09', title: '09. Privacy Requests & Contact', tag: 'Your Rights' },
    { id: 'section-10', title: '10. External Terms & Updates', tag: 'Governance' },
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
                LEGAL // PRIVACY
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
              href="mailto:studio@monolithcodes.com?subject=Privacy%20Inquiry"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-mc-orange-10 border border-mc-orange-28 text-mc-orange hover:bg-mc-orange hover:text-mc-bg text-xs font-mono font-medium transition-colors"
              title="Contact studio@monolithcodes.com"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>studio@monolithcodes.com</span>
            </a>
            <a
              href="mailto:studio@monolithcodes.com?subject=Privacy%20Inquiry"
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

      {/* Sticky Mobile Sub-Navbar for Quick Section Indicator and Jumping */}
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
                  Table of Contents
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-mc-surface border border-mc-border text-mc-text-tertiary">
                  10 Sections
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
                href="mailto:studio@monolithcodes.com?subject=Privacy%20Inquiry"
                className="px-3 py-1.5 rounded-lg bg-mc-orange text-mc-bg font-sans font-semibold text-xs hover:bg-mc-orange-highlight transition-colors shrink-0"
              >
                Email Studio
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Privacy Layout with Generous Breathing Room */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 md:py-24">
        {/* Document Hero */}
        <div className="mb-20 pb-16 border-b border-mc-border">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-mc-orange-10 border border-mc-orange-28 text-mc-orange text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              DATA GOVERNANCE & PRIVACY POLICY
            </span>
            <span className="text-xs font-mono text-mc-text-tertiary">
              EFFECTIVE: OCTOBER 11, 2026
            </span>
            <span className="text-xs font-mono text-mc-text-tertiary">
              &bull; VERSION 2.1
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-mc-system-green">
              <span className="w-1.5 h-1.5 rounded-full bg-mc-system-green animate-pulse" />
              DPDP ACT (INDIA) ALIGNED
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium text-mc-text-strong tracking-tight leading-[1.18] mb-6 max-w-4xl">
            Privacy Policy &amp; Data Handling Practices
          </h1>

          <p className="text-base sm:text-lg text-mc-text-body font-sans leading-relaxed max-w-3xl mb-12">
            How MONOLITH CODES handles inbound project enquiries, communication metadata, and studio interactions. We build custom software engineering solutions with disciplined data governance, verified service providers, and zero data brokerage.
          </p>

          {/* Clean 4-Pillar Executive Summary (Spacious & Calm) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange font-medium">
                <EyeOff className="w-4 h-4" />
                <span>ZERO AD TRACKING</span>
              </div>
              <div className="text-sm font-sans font-medium text-mc-text-strong">
                No Behavioral Pixels
              </div>
              <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                Zero Meta pixels, ad networks, or invasive session recorders.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange font-medium">
                <Clock className="w-4 h-4" />
                <span>LEAD RETENTION</span>
              </div>
              <div className="text-sm font-sans font-medium text-mc-text-strong">
                12-Month Inactive Audit
              </div>
              <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                Inactive enquiries reviewed and scheduled for deletion or anonymization.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange font-medium">
                <Lock className="w-4 h-4" />
                <span>DATA WALL</span>
              </div>
              <div className="text-sm font-sans font-medium text-mc-text-strong">
                Total Code Isolation
              </div>
              <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                Inquiry records never mix with client repositories or production databases.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange font-medium">
                <KeyRound className="w-4 h-4" />
                <span>SECRETS PROTOCOL</span>
              </div>
              <div className="text-sm font-sans font-medium text-mc-text-strong">
                Vaulted Secret Access
              </div>
              <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                Production credentials are never accepted through public web forms.
              </p>
            </div>
          </div>
        </div>

        {/* Clean System Architecture & Boundary Model */}
        <div className="mb-24 p-6 sm:p-10 rounded-2xl bg-mc-surface-deep border border-mc-border space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-mc-orange uppercase tracking-wider mb-1 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL REFERENCE DIAGRAM</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-sans font-medium text-mc-text-strong">
                Data Boundary &amp; Operational Isolation
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mc-surface border border-mc-border text-xs font-mono text-mc-text-secondary">
              <span className="w-2 h-2 rounded-full bg-mc-system-green" />
              <span>Strict Cryptographic &amp; Operational Demarcation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Domain A: Public Inbound */}
            <div className="p-6 rounded-xl bg-mc-surface border border-mc-border space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-mc-border-soft">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-mc-orange-10 text-mc-orange">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-sans font-semibold text-mc-text-strong">
                      BOUNDARY A: Website Enquiries
                    </h3>
                    <p className="text-xs font-mono text-mc-text-tertiary">
                      Governed by this Privacy Policy
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-mc-surface-deep border border-mc-border text-mc-orange">
                  Public Inbound
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 sm:p-3.5 rounded-lg bg-mc-surface-deep border border-mc-border flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <div className="flex items-center gap-2 text-mc-text-strong">
                    <MessageSquare className="w-3.5 h-3.5 text-mc-orange shrink-0" />
                    <span>Inbound Touchpoints</span>
                  </div>
                  <span className="text-xs text-mc-text-secondary font-sans">
                    Form &bull; WhatsApp &bull; Cal.com &bull; Email
                  </span>
                </div>

                <div className="p-3 sm:p-3.5 rounded-lg bg-mc-surface-deep border border-mc-border flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <div className="flex items-center gap-2 text-mc-text-strong">
                    <Server className="w-3.5 h-3.5 text-mc-orange shrink-0" />
                    <span>Routing &amp; Coordination</span>
                  </div>
                  <span className="text-xs text-mc-text-secondary font-sans">
                    Resend API + Google Sheets
                  </span>
                </div>

                <div className="p-3 sm:p-3.5 rounded-lg bg-mc-surface-deep border border-mc-border flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <div className="flex items-center gap-2 text-mc-text-strong">
                    <UserCheck className="w-3.5 h-3.5 text-mc-system-green shrink-0" />
                    <span>Technical Architecture Cell</span>
                  </div>
                  <span className="text-xs text-mc-text-secondary font-sans">
                    Scope Review &amp; Proposal Formulation
                  </span>
                </div>
              </div>

              <p className="text-xs text-mc-text-secondary font-sans leading-relaxed pt-2">
                Collected strictly for feasibility evaluation, mutual confidentiality (NDA), and milestone proposal preparation.
              </p>
            </div>

            {/* Domain B: Client Software & Repositories */}
            <div className="p-4 sm:p-6 rounded-xl bg-mc-surface border border-mc-border space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-mc-border-soft">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-mc-system-green/10 text-mc-system-green">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-sans font-semibold text-mc-text-strong">
                      BOUNDARY B: Client Services &amp; IP
                    </h3>
                    <p className="text-xs font-mono text-mc-text-tertiary">
                      Governed by Master Services Agreement &amp; NDAs
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-mc-surface-deep border border-mc-border text-mc-system-green">
                  Protected &amp; Isolated
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 sm:p-3.5 rounded-lg bg-mc-surface-deep border border-mc-border flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <div className="flex items-center gap-2 text-mc-text-strong">
                    <HardDrive className="w-3.5 h-3.5 text-mc-system-green shrink-0" />
                    <span>Client Cloud &amp; Repositories</span>
                  </div>
                  <span className="text-xs text-mc-text-secondary font-sans">
                    100% Client-Owned Tenant
                  </span>
                </div>

                <div className="p-3 sm:p-3.5 rounded-lg bg-mc-surface-deep border border-mc-border flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <div className="flex items-center gap-2 text-mc-text-strong">
                    <KeyRound className="w-3.5 h-3.5 text-mc-system-green shrink-0" />
                    <span>Credential Management</span>
                  </div>
                  <span className="text-xs text-mc-text-secondary font-sans">
                    Scoped IAM &amp; Secrets Vaults
                  </span>
                </div>

                <div className="p-3 sm:p-3.5 rounded-lg bg-mc-surface-deep border border-mc-border flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <div className="flex items-center gap-2 text-mc-text-strong">
                    <ShieldCheck className="w-3.5 h-3.5 text-mc-system-green shrink-0" />
                    <span>Enterprise DPA</span>
                  </div>
                  <span className="text-xs text-mc-text-secondary font-sans">
                    Dedicated Data Processing Addendum
                  </span>
                </div>
              </div>

              <p className="text-xs text-mc-text-secondary font-sans leading-relaxed pt-2">
                Engineering standard: Client end-user data processed within custom software projects is never merged with public website enquiry records.
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout with Spacious Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Table of Contents (Desktop Only - hidden on mobile) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6 print:hidden">
            <div className="p-6 rounded-xl bg-mc-surface border border-mc-border space-y-4">
              <div className="font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>TABLE OF CONTENTS</span>
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
                <div>STANDARD: DPDP ACT 2023 / 2026</div>
              </div>
            </div>

            {/* Direct Contact Card (Single Email Address) */}
            <div className="p-6 rounded-xl bg-mc-surface-deep border border-mc-border space-y-3">
              <div className="text-xs font-mono text-mc-text-strong flex items-center gap-2">
                <Mail className="w-4 h-4 text-mc-orange" />
                <span>Privacy Contact</span>
              </div>
              <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                For questions regarding data processing or to request erasure of inquiry records, contact us directly:
              </p>
              <a
                href="mailto:studio@monolithcodes.com?subject=Privacy%20Inquiry"
                className="w-full py-2.5 px-3 rounded-lg bg-mc-surface border border-mc-border hover:border-mc-orange text-xs font-mono text-mc-orange flex items-center justify-center gap-2 transition-colors font-medium"
              >
                <span>studio@monolithcodes.com</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </aside>

          {/* 10 Core Blueprint Content Sections (With Generous Breathing Room & High Readability) */}
          <div className="lg:col-span-8 space-y-20">

            {/* 01 Who We Are and What This Policy Covers */}
            <section id="section-01" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 01</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Who We Are and What This Policy Covers
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  <strong>MONOLITH CODES</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a boutique custom software engineering studio. We engineer production-grade web applications, SaaS platforms, native and cross-platform mobile apps, ERP/CRM systems, and custom workflow automations.
                </p>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
                  <div className="font-mono text-xs text-mc-text-strong flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-mc-orange" />
                    <span>Business Identity &amp; Operating Leadership</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                    MONOLITH CODES is the operating brand led by founder and lead software architect <strong>Anubhav Garg</strong>. Formal legal entity incorporation is being finalized. In accordance with organizational transparency standards, we do not publish an unmonitored physical office address. All client proposals, commercial agreements, and statutory invoices identify the contracting party with complete legal compliance.
                  </p>
                </div>

                <p>
                  <strong>Scope of This Policy:</strong> This document applies exclusively to prospective client interactions, including:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm text-mc-text-body">
                  <li>Inquiries submitted through our website contact and project estimator forms;</li>
                  <li>Direct correspondence sent to <code>studio@monolithcodes.com</code>;</li>
                  <li>WhatsApp project discussions initiated via our engineering chat trigger;</li>
                  <li>Architecture consultation and video discovery meetings scheduled via Cal.com.</li>
                </ul>

                <div className="p-4 rounded-xl bg-mc-surface-deep border border-mc-border text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                  <strong className="text-mc-text-strong">Client Services Separation:</strong> Once a project contract is signed, proprietary software development, source code access, and client end-user records are governed by a separate Master Services Agreement (MSA), mutual Non-Disclosure Agreement (NDA), and dedicated Data Processing Addendum (DPA).
                </div>
              </div>
            </section>

            {/* 02 Information We Collect */}
            <section id="section-02" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 02</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Information We Collect
              </h2>

              <p className="font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                We collect only the technical and commercial parameters necessary to evaluate your engineering requirements and formulate concrete proposals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-3">
                  <div className="font-mono text-xs text-mc-orange uppercase font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Inquiry Form Fields</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm font-sans text-mc-text-body">
                    <li><strong className="text-mc-text-strong">Full Name:</strong> For personalized communication.</li>
                    <li><strong className="text-mc-text-strong">Work Email:</strong> For sending scope briefs and proposals.</li>
                    <li><strong className="text-mc-text-strong">Phone / WhatsApp (Optional):</strong> For rapid direct coordination.</li>
                    <li><strong className="text-mc-text-strong">Company / Project Name:</strong> To understand business context.</li>
                    <li><strong className="text-mc-text-strong">Service Category:</strong> Web app, SaaS, Mobile, or ERP/CRM.</li>
                    <li><strong className="text-mc-text-strong">Budget Range:</strong> In USD or INR to determine architectural scope.</li>
                    <li><strong className="text-mc-text-strong">Project Description:</strong> System goals and requirements.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-3">
                  <div className="font-mono text-xs text-mc-orange uppercase font-semibold flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    <span>Technical &amp; Channel Metadata</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm font-sans text-mc-text-body">
                    <li><strong className="text-mc-text-strong">Email Logs:</strong> Delivery timestamps and status via Resend.</li>
                    <li><strong className="text-mc-text-strong">WhatsApp Data:</strong> Profile name and telephone number transmitted when you initiate chat.</li>
                    <li><strong className="text-mc-text-strong">Meeting Data:</strong> Selected time slot and calendar invites via Cal.com.</li>
                    <li><strong className="text-mc-text-strong">Silent Bot Mitigation:</strong> A hidden honeypot field that catches automated spam without tracking your personal browser footprint.</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-mc-surface border border-mc-border flex items-start gap-3 text-xs sm:text-sm text-mc-text-secondary">
                <AlertTriangle className="w-4 h-4 text-mc-orange shrink-0 mt-0.5" />
                <p>
                  <strong className="text-mc-text-strong">Data Minimization:</strong> We never collect payment card numbers, social security identifiers, or sensitive personal data through our website.
                </p>
              </div>
            </section>

            {/* 03 How We Collect Information */}
            <section id="section-03" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 03</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                How We Collect Information
              </h2>

              <p className="font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                All data is collected through direct, visitor-initiated interactions across four explicit channels:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
                  <span className="w-6 h-6 rounded bg-mc-orange-10 text-mc-orange flex items-center justify-center font-mono font-bold text-xs">
                    01
                  </span>
                  <h3 className="font-sans font-semibold text-sm text-mc-text-strong">Website Project Inquiry Form</h3>
                  <p className="text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                    Voluntarily submitted via our online form over encrypted HTTPS/TLS.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
                  <span className="w-6 h-6 rounded bg-mc-orange-10 text-mc-orange flex items-center justify-center font-mono font-bold text-xs">
                    02
                  </span>
                  <h3 className="font-sans font-semibold text-sm text-mc-text-strong">WhatsApp Click-to-Chat</h3>
                  <p className="text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                    Initiated voluntarily via our WhatsApp button. Conversations are protected by WhatsApp&rsquo;s end-to-end encryption.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
                  <span className="w-6 h-6 rounded bg-mc-orange-10 text-mc-orange flex items-center justify-center font-mono font-bold text-xs">
                    03
                  </span>
                  <h3 className="font-sans font-semibold text-sm text-mc-text-strong">Direct Studio Email</h3>
                  <p className="text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                    Messages sent directly to <code>studio@monolithcodes.com</code> from your email client.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
                  <span className="w-6 h-6 rounded bg-mc-orange-10 text-mc-orange flex items-center justify-center font-mono font-bold text-xs">
                    04
                  </span>
                  <h3 className="font-sans font-semibold text-sm text-mc-text-strong">Cal.com Video Consultations</h3>
                  <p className="text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                    Submitted when booking a 30-minute architecture discovery meeting with our lead engineer.
                  </p>
                </div>
              </div>
            </section>

            {/* 04 Why We Use Information */}
            <section id="section-04" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 04</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Why We Use Information (Processing Purposes)
              </h2>

              <p className="font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                In accordance with strict data protection standards, we use submitted data exclusively for legitimate engineering evaluation:
              </p>

              <div className="space-y-3 font-sans">
                <div className="p-4 rounded-xl bg-mc-surface border border-mc-border flex items-start gap-3">
                  <div className="p-1 rounded bg-mc-orange-10 text-mc-orange shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-mc-text-strong">Evaluating Technical Scope &amp; Viability</h4>
                    <p className="text-xs sm:text-sm text-mc-text-secondary mt-0.5 leading-relaxed">
                      Assessing architecture requirements, performance requirements, and engineering feasibility.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-mc-surface border border-mc-border flex items-start gap-3">
                  <div className="p-1 rounded bg-mc-orange-10 text-mc-orange shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-mc-text-strong">Preparing Structured Proposals &amp; Quotations</h4>
                    <p className="text-xs sm:text-sm text-mc-text-secondary mt-0.5 leading-relaxed">
                      Formulating engineering sprint plans, architecture specifications, and cost breakdowns aligned with your budget.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-mc-surface border border-mc-border flex items-start gap-3">
                  <div className="p-1 rounded bg-mc-orange-10 text-mc-orange shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-mc-text-strong">Mutual Non-Disclosure Agreements (NDAs)</h4>
                    <p className="text-xs sm:text-sm text-mc-text-secondary mt-0.5 leading-relaxed">
                      Executing confidentiality agreements prior to reviewing proprietary logic or system diagrams.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-mc-surface border border-mc-border flex items-start gap-3">
                  <div className="p-1 rounded bg-mc-orange-10 text-mc-orange shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-mc-text-strong">Scheduling Technical Discovery Calls</h4>
                    <p className="text-xs sm:text-sm text-mc-text-secondary mt-0.5 leading-relaxed">
                      Delivering calendar invitations and video conference links via Cal.com.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-mc-surface border border-mc-border text-xs sm:text-sm text-mc-text-secondary">
                <strong className="text-mc-text-strong">Zero Data Brokerage:</strong> We never sell, rent, or trade your contact information. We never add prospective clients to unsolicited promotional email lists.
              </div>
            </section>

            {/* 05 Service Providers and Information Sharing */}
            <section id="section-05" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 05</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Service Providers &amp; Sub-processors
              </h2>

              <p className="font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                We disclose all third-party services that support our studio infrastructure. Sharing data with a service provider solely to fulfill technical delivery is not equivalent to selling data.
              </p>

              {/* Clean Sub-processor Directory */}
              <div className="space-y-3 font-sans">
                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-mc-text-strong text-sm">Resend, Inc.</span>
                      <span className="px-2 py-0.5 rounded bg-mc-orange-10 text-mc-orange font-mono text-[10px]">
                        Email Delivery API
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-mc-text-secondary">
                      Delivers form notification payloads securely to our studio inbox via TLS.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                    <span className="text-mc-system-green">DPA Active</span>
                    <a
                      href="https://resend.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-mc-orange hover:underline"
                    >
                      <span>Policy</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-mc-text-strong text-sm">Google Workspace / Sheets</span>
                      <span className="px-2 py-0.5 rounded bg-mc-surface-deep border border-mc-border text-mc-text-secondary font-mono text-[10px]">
                        Internal Enquiry Triage
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-mc-text-secondary">
                      Internal record-keeping to track inquiry status. Access is strictly restricted to studio founders with 2FA required.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                    <span className="text-mc-system-green">2FA Enforced</span>
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-mc-orange hover:underline"
                    >
                      <span>Policy</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-mc-text-strong text-sm">Cal.com, Inc.</span>
                      <span className="px-2 py-0.5 rounded bg-mc-surface-deep border border-mc-border text-mc-text-secondary font-mono text-[10px]">
                        Scheduling Platform
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-mc-text-secondary">
                      Facilitates booking video discovery sessions with our technical architects.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                    <span className="text-mc-system-green">SOC2 Certified</span>
                    <a
                      href="https://cal.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-mc-orange hover:underline"
                    >
                      <span>Policy</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-mc-text-strong text-sm">WhatsApp (Meta Platforms)</span>
                      <span className="px-2 py-0.5 rounded bg-mc-surface-deep border border-mc-border text-mc-text-secondary font-mono text-[10px]">
                        Direct Messaging
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-mc-text-secondary">
                      Visitor-initiated messaging. Conversations are protected by end-to-end encryption.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                    <span className="text-mc-system-green">E2E Encrypted</span>
                    <a
                      href="https://www.whatsapp.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-mc-orange hover:underline"
                    >
                      <span>Policy</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 06 Cookies, Search Tools and Website Technologies */}
            <section id="section-06" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 06</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Cookies, Search Tools &amp; Website Technologies
              </h2>

              <p className="font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                Many agency websites blur the line between search indexing and on-site tracking. We maintain complete technical transparency regarding our website footprint:
              </p>

              {/* Distinction Box */}
              <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
                <div className="font-mono text-xs text-mc-orange flex items-center gap-2 uppercase tracking-wider">
                  <Search className="w-4 h-4" />
                  <span>Google Search Console vs. On-Site Analytics</span>
                </div>
                <p className="text-xs sm:text-sm text-mc-text-body leading-relaxed font-sans">
                  We use <strong>Google Search Console</strong> exclusively to monitor how our pages appear in Google Search index results, verify sitemaps, and diagnose indexing errors. Search Console operates on Google&rsquo;s search index side. <strong>It is NOT Google Analytics.</strong> Search Console injects zero tracking cookies and does not record visitor behavior on this website.
                </p>
              </div>

              {/* Client Storage Audit */}
              <div className="p-5 rounded-xl bg-mc-surface-deep border border-mc-border space-y-3 font-sans">
                <div className="text-xs font-mono text-mc-text-strong font-semibold flex items-center gap-2">
                  <Database className="w-4 h-4 text-mc-orange" />
                  <span>Website Client Storage Audit</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start justify-between py-2 border-b border-mc-border-soft">
                    <div>
                      <code className="text-mc-orange font-mono text-xs">theme</code> (localStorage)
                      <div className="text-mc-text-secondary text-xs mt-0.5">
                        Stores your selection of Light, Dark, or System mode to prevent theme flash.
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-mc-surface text-mc-text-tertiary text-[10px] font-mono shrink-0">
                      Essential
                    </span>
                  </div>

                  <div className="flex items-start justify-between py-2 border-b border-mc-border-soft">
                    <div>
                      <code className="text-mc-orange font-mono text-xs">mc_intro_played</code> (sessionStorage)
                      <div className="text-mc-text-secondary text-xs mt-0.5">
                        Remembers if you already viewed the initial brand introduction animation in your current session.
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-mc-surface text-mc-text-tertiary text-[10px] font-mono shrink-0">
                      Session Only
                    </span>
                  </div>

                  <div className="flex items-start justify-between py-2">
                    <div>
                      <span className="font-medium text-mc-text-strong">Third-Party Tracking Cookies</span>
                      <div className="text-mc-text-secondary text-xs mt-0.5">
                        Zero advertising networks, zero retargeting tags, zero cross-domain tracking pixels.
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-mc-system-green/10 text-mc-system-green text-[10px] font-mono shrink-0 font-semibold">
                      None Installed (0)
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* 07 Data Storage, Security and Retention */}
            <section id="section-07" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 07</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Data Storage, Security &amp; 12-Month Retention Schedule
              </h2>

              <p className="font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                In accordance with engineering data governance benchmarks, we maintain an operational retention schedule and rigorous credential handling safeguards:
              </p>

              {/* 12-Month Lifecycle Timeline */}
              <div className="p-6 rounded-xl bg-mc-surface border border-mc-border space-y-5">
                <div className="font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Enquiry Data Lifecycle &amp; Retention Schedule</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                  <div className="p-4 rounded-lg bg-mc-surface-deep border border-mc-border space-y-1.5">
                    <div className="font-mono text-xs font-semibold text-mc-text-strong">
                      Stage 1: Active Inbound
                    </div>
                    <div className="text-mc-orange font-mono text-xs">Month 0 – Month 3</div>
                    <p className="text-xs text-mc-text-secondary leading-relaxed">
                      Active technical dialogue, NDA execution, and architectural estimation.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-mc-surface-deep border border-mc-border space-y-1.5">
                    <div className="font-mono text-xs font-semibold text-mc-text-strong">
                      Stage 2: Deferred / On Hold
                    </div>
                    <div className="text-mc-orange font-mono text-xs">Month 4 – Month 12</div>
                    <p className="text-xs text-mc-text-secondary leading-relaxed">
                      Retained for potential re-engagement if project budget cycles are postponed by client.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-mc-surface-deep border border-mc-orange-28 bg-mc-orange-06 space-y-1.5">
                    <div className="font-mono text-xs font-semibold text-mc-text-strong">
                      Stage 3: Review &amp; Purge
                    </div>
                    <div className="text-mc-orange font-mono text-xs">12 Months Post-Contact</div>
                    <p className="text-xs text-mc-text-secondary leading-relaxed">
                      Internal retention target: Inactive leads reviewed and permanently deleted or anonymized.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-mc-text-tertiary font-sans pt-1">
                  *Contractual and accounting records for finalized client engagements are maintained separately under statutory Indian commercial requirements.
                </p>
              </div>

              {/* Client Credentials Protocol Warning */}
              <div className="p-5 rounded-xl bg-mc-surface-deep border border-mc-border space-y-3 font-sans">
                <div className="flex items-center gap-2 font-mono text-xs text-mc-orange uppercase tracking-wider">
                  <KeyRound className="w-4 h-4" />
                  <span>Mandatory Protocol: Client System Credentials</span>
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                  <li><strong className="text-mc-text-strong">Never Submit Production Passwords:</strong> Do not submit server credentials, database passwords, or production API keys in public contact forms or plain email text.</li>
                  <li><strong className="text-mc-text-strong">Test Environments First:</strong> During scoping and proof-of-concept stages, we strictly require sanitized test data and sandbox API keys.</li>
                  <li><strong className="text-mc-text-strong">Vaulted Key Exchange:</strong> Active client engagements exchange secrets exclusively via end-to-end encrypted secret vaults (e.g. 1Password, Doppler, or AWS Secrets Manager) with scoped IAM privileges.</li>
                </ul>
              </div>
            </section>

            {/* 08 International Processing */}
            <section id="section-08" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 08</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Cross-Border &amp; International Processing
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  MONOLITH CODES is based in India and engineers software for clients globally, including the United States, Europe, the United Kingdom, and the United Arab Emirates.
                </p>

                <p>
                  When you submit an inquiry, information may be processed across infrastructure operated by our verified providers (such as Resend or Google), which maintain secure cloud data centers in the United States and the European Union.
                </p>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border space-y-2">
                  <div className="font-mono text-xs text-mc-text-strong flex items-center gap-2">
                    <Globe className="w-4 h-4 text-mc-orange" />
                    <span>Cross-Border Safeguards</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mc-text-secondary leading-relaxed">
                    We do not promise that enquiry data is stored solely in India, as modern cloud email delivery and serverless infrastructure utilize global availability zones. We ensure that our infrastructure providers maintain Standard Contractual Clauses (SCCs) and robust Data Processing Addendums complying with international standards.
                  </p>
                </div>
              </div>
            </section>

            {/* 09 Privacy Requests and Contact (Only studio@monolithcodes.com) */}
            <section id="section-09" className="scroll-mt-28 space-y-6 pb-16 border-b border-mc-border-soft">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 09</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                Privacy Requests &amp; Your Legal Rights
              </h2>

              <p className="font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                Under the Indian Digital Personal Data Protection (DPDP) Act and applicable international frameworks, you have actionable rights over your enquiry information:
              </p>

              {/* Rights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-mc-surface border border-mc-border space-y-1">
                  <strong className="text-mc-text-strong block font-medium">Right to Access &amp; Summary</strong>
                  <span className="text-mc-text-secondary">
                    Request a copy of the inquiry records and communications we hold concerning you.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-mc-surface border border-mc-border space-y-1">
                  <strong className="text-mc-text-strong block font-medium">Right to Correction</strong>
                  <span className="text-mc-text-secondary">
                    Request corrections or updates to inaccurate names, roles, or email addresses.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-mc-surface border border-mc-border space-y-1">
                  <strong className="text-mc-text-strong block font-medium">Right to Erasure</strong>
                  <span className="text-mc-text-secondary">
                    Request premature permanent deletion of your inquiry row and emails if you decide not to proceed.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-mc-surface border border-mc-border space-y-1">
                  <strong className="text-mc-text-strong block font-medium">Grievance Redressal</strong>
                  <span className="text-mc-text-secondary">
                    Direct communication with our designated engineering officer to address concerns.
                  </span>
                </div>
              </div>

              {/* Single Monitored Contact Box */}
              <div className="p-6 rounded-xl bg-mc-surface-deep border border-mc-border space-y-4 font-sans">
                <div className="font-mono text-xs text-mc-text-strong flex items-center gap-2">
                  <Mail className="w-4 h-4 text-mc-orange" />
                  <span>Submitting a Privacy Request</span>
                </div>
                <p className="text-xs sm:text-sm text-mc-text-body leading-relaxed">
                  To exercise any of the above rights, simply send an email from the address associated with your inquiry to our monitored studio inbox:
                </p>
                <div>
                  <a
                    href="mailto:studio@monolithcodes.com?subject=Privacy%20Data%20Request"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-mc-orange text-mc-bg font-sans font-semibold text-xs sm:text-sm hover:bg-mc-orange-highlight transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>studio@monolithcodes.com</span>
                  </a>
                </div>
                <p className="text-xs text-mc-text-secondary">
                  We verify requester identity via confirmation email and respond promptly without fee.
                </p>
              </div>
            </section>

            {/* 10 External Services, Policy Updates and Effective Date */}
            <section id="section-10" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                <span>SECTION 10</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                External Services, Policy Updates &amp; Effective Date
              </h2>

              <div className="space-y-4 font-sans text-[15px] sm:text-base text-mc-text-body leading-relaxed">
                <p>
                  <strong>External Platforms:</strong> When you navigate to third-party services—such as clicking our WhatsApp button or scheduling a consultation via Cal.com—those interactions are also governed by the independent privacy policies of those platforms.
                </p>

                <p>
                  <strong>Policy Amendments:</strong> As MONOLITH CODES formalizes entity structures or updates technology infrastructure, we will update this document accordingly. The latest version will always be accessible at <code>monolithcodes.com#privacy</code>.
                </p>

                <div className="p-5 rounded-xl bg-mc-surface border border-mc-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                  <div>
                    <span className="text-mc-text-tertiary block">DOCUMENT REVISION</span>
                    <span className="text-mc-text-strong font-semibold">VERSION 2.1</span>
                  </div>
                  <div>
                    <span className="text-mc-text-tertiary block">EFFECTIVE DATE</span>
                    <span className="text-mc-orange font-semibold">OCTOBER 11, 2026</span>
                  </div>
                  <div>
                    <span className="text-mc-text-tertiary block">PRIVACY CONTACT</span>
                    <span className="text-mc-text-secondary">studio@monolithcodes.com</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Mobile Dedicated Contact & Governance Card (Visible on mobile only) */}
            <div className="lg:hidden p-5 rounded-xl bg-mc-surface border border-mc-border space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-orange font-medium">
                <Mail className="w-4 h-4" />
                <span>PRIVACY CONTACT & INQUIRIES</span>
              </div>
              <p className="text-xs sm:text-sm text-mc-text-secondary font-sans leading-relaxed">
                For questions regarding data processing, confidentiality under NDA, or to exercise your rights under the DPDP Act 2023, contact our engineering studio directly:
              </p>
              <a
                href="mailto:studio@monolithcodes.com?subject=Privacy%20Inquiry"
                className="w-full py-2.5 px-3 rounded-lg bg-mc-surface-deep border border-mc-border hover:border-mc-orange text-xs font-mono text-mc-orange flex items-center justify-center gap-2 transition-colors font-medium"
              >
                <span>studio@monolithcodes.com</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <div className="pt-2 border-t border-mc-border/60 flex items-center justify-between text-[11px] font-mono text-mc-text-tertiary">
                <span>STANDARD: DPDP ACT 2023</span>
                <span>DOC: MC-LEG-PRIV-2026.2</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Handoff / Navigation Back */}
        <div className="mt-24 pt-12 border-t border-mc-border flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-sans font-medium text-base text-mc-text-strong">
              Ready to discuss an engineering engagement?
            </h3>
            <p className="text-xs sm:text-sm text-mc-text-secondary font-sans">
              Experience custom software engineered with structural discipline and zero compromise.
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
        <div className="max-w-[1280px] mx-auto px-6 flex flex-wrap items-center justify-center gap-3">
          <span>MONOLITH CODES DATA GOVERNANCE</span>
          <span>&bull;</span>
          <a href="#terms" className="hover:text-mc-orange transition-colors underline-offset-4 hover:underline">
            WEBSITE TERMS OF USE
          </a>
          <span>&bull;</span>
          <span>STUDIO@MONOLITHCODES.COM</span>
        </div>
      </footer>
    </div>
  );
};
