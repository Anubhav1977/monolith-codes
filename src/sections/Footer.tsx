import React from 'react';
import { BrandLockup } from '@/components/BrandLockup';
import { ArrowUpRight, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { SITE } from '@/lib/site';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-0 bg-mc-bg border-t border-mc-border overflow-hidden">
      <div className="max-w-340 mx-auto px-6 md:px-10">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1 & 2: Brand Lockup & Studio Directive */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              className="inline-block cursor-pointer group"
              aria-label="MONOLITH CODES — home"
            >
              <BrandLockup variant="horizontal" size="lg" interactiveHover />
            </a>
            <p className="text-sm text-mc-text-secondary max-w-sm leading-relaxed font-sans">
              MONOLITH CODES is a custom software development studio based in India. We engineer websites, web applications, SaaS platforms, mobile apps, ERP/CRM systems and business automation for clients in India and worldwide.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-mc-surface border border-mc-border text-xs font-mono text-mc-text-body">
              <span className="w-2 h-2 rounded-full bg-mc-system-green animate-pulse" />
              <span>Accepting new projects · India &amp; worldwide · WhatsApp direct support</span>
            </div>

            {/* Contact */}
            <ul className="space-y-2.5 pt-2 font-sans text-sm">
              <li>
                <a
                  href={`tel:${SITE.phoneE164}`}
                  className="inline-flex items-center gap-3 text-mc-text-strong transition-colors hover:text-mc-orange"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-mc-border bg-mc-surface text-mc-orange">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>{SITE.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-3 text-mc-text-strong transition-colors hover:text-mc-orange"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-mc-border bg-mc-surface text-mc-orange">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>{SITE.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Capabilities */}
          <div className="space-y-3 font-sans text-sm">
            <div className="font-mono text-xs text-mc-orange uppercase tracking-wider mb-2">
              SERVICES
            </div>
            <ul className="text-mc-text-secondary">
              <li><a href="/services/website-development" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">Website Development</a></li>
              <li><a href="/services/web-application-development" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">Web Application Development</a></li>
              <li><a href="/services/saas-development" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">SaaS Development</a></li>
              <li><a href="/services/mobile-app-development" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">Mobile App Development</a></li>
              <li><a href="/services/erp-crm-development" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">ERP & CRM Development</a></li>
              <li><a href="/services/ai-automation" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">AI & Automation</a></li>
            </ul>
          </div>

          {/* Column 4: Studio Navigation */}
          <div className="space-y-3 font-sans text-sm">
            <div className="font-mono text-xs text-mc-orange uppercase tracking-wider mb-2">
              STUDIO NAV
            </div>
            <ul className="text-mc-text-secondary">
              <li><a href="/#why-custom" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">Why Custom Engineering</a></li>
              <li><a href="/work" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">Case Studies & Work</a></li>
              <li><a href="/#proof" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">Technical Proof</a></li>
              <li><a href="/pricing#process" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">How We Work (7-Stage)</a></li>
              <li><a href="/pricing" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">Pricing & Tiers</a></li>
              <li><a href="/guides" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">Guides</a></li>
              <li><a href="/about" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">About the Studio</a></li>
              <li><a href="/#faq" className="inline-flex min-h-11 items-center hover:text-mc-text-strong transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Column 5: Legal & System Metadata */}
          <div className="space-y-5 font-mono text-xs">
            {/* Approved Legal Group */}
            <div className="space-y-2.5">
              <div className="text-mc-orange uppercase tracking-wider">
                LEGAL &amp; GOVERNANCE
              </div>
              <ul className="font-sans text-sm text-mc-text-secondary">
                <li>
                  <a href="/privacy" className="hover:text-mc-orange transition-colors flex min-h-11 items-center gap-1 group">
                    <span>Privacy Policy</span>
                    <span className="text-[10px] text-mc-orange font-mono opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-mc-orange transition-colors flex min-h-11 items-center gap-1 group">
                    <span>Terms of Use</span>
                    <span className="text-[10px] text-mc-orange font-mono opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-3 border-t border-mc-border-soft">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MONOLITH CODES on LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full border border-mc-border text-mc-text-strong transition-colors hover:border-mc-orange hover:text-mc-orange"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MONOLITH CODES on Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-mc-border text-mc-text-strong transition-colors hover:border-mc-orange hover:text-mc-orange"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Explore Services Bar (Inspired by image) */}
        <a
          href="/services"
          className="mb-12 p-4 sm:p-5 rounded-lg border border-mc-border bg-mc-surface hover:bg-mc-surface-hover transition-colors flex items-center justify-between group cursor-pointer"
        >
          <span className="font-sans font-medium text-base text-mc-text-strong group-hover:text-mc-orange transition-colors">
            Show all software engineering services & capabilities
          </span>
          <ArrowUpRight className="w-5 h-5 text-mc-text-tertiary group-hover:text-mc-orange transition-colors" />
        </a>

        {/* Legal & Studio Avatar Trust Bar (Inspired by image) */}
        <div className="pt-8 pb-10 border-t border-mc-border-soft flex flex-col lg:flex-row items-center justify-between gap-6 font-mono text-xs text-mc-text-tertiary">
          <div className="flex flex-wrap items-center gap-2.5">
            <span>{SITE.name} © {currentYear}. ALL RIGHTS RESERVED.</span>
            <span>&bull;</span>
            <a
              href="/privacy"
              className="inline-flex min-h-11 items-center text-mc-text-secondary hover:text-mc-orange transition-colors underline-offset-4 hover:underline"
            >
              PRIVACY POLICY
            </a>
            <span>&bull;</span>
            <a
              href="/terms"
              className="inline-flex min-h-11 items-center text-mc-text-secondary hover:text-mc-orange transition-colors underline-offset-4 hover:underline"
            >
              TERMS OF USE
            </a>
            <span>&bull;</span>
            {/* TODO(owner): confirm this compliance claim (no source in the codebase) or remove it. */}
            <span className="text-mc-system-green">DPDP V2.1 ALIGNED</span>
          </div>

          <div className="text-center">
            CUSTOM SOFTWARE ENGINEERING STUDIO · BASED IN INDIA · SERVING CLIENTS WORLDWIDE
          </div>

          {/* Team Avatar Stack & Status */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-grid h-7 w-7 place-items-center rounded-full ring-2 ring-mc-bg bg-mc-surface border border-mc-border">
                <span className="font-mono text-[10px] leading-none font-bold text-mc-orange">
                  SE
                </span>
              </div>

              <div className="inline-grid h-7 w-7 place-items-center rounded-full ring-2 ring-mc-bg bg-mc-surface border border-mc-border">
                <span className="font-mono text-[10px] leading-none font-bold text-mc-text-strong">
                  TS
                </span>
              </div>

              <div className="inline-grid h-7 w-7 place-items-center rounded-full ring-2 ring-mc-bg bg-mc-surface border border-mc-border">
                <span className="font-mono text-[10px] leading-none font-bold text-mc-text-strong">
                  AI
                </span>
              </div>

              <div className="inline-grid h-7 w-7 place-items-center rounded-full ring-2 ring-mc-bg bg-mc-surface border border-mc-border">
                <span className="font-mono text-[10px] leading-none font-bold text-mc-text-strong">
                  DB
                </span>
              </div>
            </div>
            <span className="text-[11px] text-mc-text-secondary font-sans font-medium">
              Senior Studio Cell
            </span>
          </div>
        </div>
      </div>

      {/* Massive Architectural Bottom Display Typography */}
      <div className="group relative w-full h-[clamp(70px,9vw,150px)] overflow-hidden border-t border-mc-border/40 bg-mc-surface-deep/30">
        <p aria-hidden="true"
          className="
      absolute
      left-1/2
      bottom-[-35%]
      -translate-x-1/2
      whitespace-nowrap
      select-none
      leading-[0.82]
      uppercase
      font-sans
      font-black
      tracking-[-0.08em]
      text-[clamp(4.5rem,13vw,13rem)]
      footer-monolith-display
      transition-all
      duration-500
      group-hover:text-mc-orange/15
      group-hover:scale-[1.015]
    "
        >
          MONOLITHCODES
        </p>
      </div>
    </footer>
  );
};
