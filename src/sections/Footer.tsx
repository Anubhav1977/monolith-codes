import React from 'react';
import { BrandLockup } from '@/components/BrandLockup';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-0 bg-mc-bg border-t border-mc-border overflow-hidden select-none">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1 & 2: Brand Lockup & Studio Directive */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLockup variant="horizontal" size="lg" />
            <p className="text-sm text-mc-text-secondary max-w-sm leading-relaxed font-sans">
              MONOLITH CODES is a software engineering studio. We engineer custom web applications, SaaS platforms, mobile apps, ERP/CRM systems, and business workflow automation.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-mc-surface border border-mc-border text-xs font-mono text-mc-text-body">
              <span className="w-2 h-2 rounded-full bg-mc-system-green animate-pulse" />
              <span>Available for Q3/Q4 Projects • WhatsApp Direct Support</span>
            </div>
          </div>

          {/* Column 3: Capabilities */}
          <div className="space-y-3 font-sans text-sm">
            <div className="font-mono text-xs text-mc-orange uppercase tracking-wider mb-2">
              CAPABILITIES
            </div>
            <ul className="space-y-2 text-mc-text-secondary">
              <li><a href="#product-stack" className="hover:text-mc-text-strong transition-colors">Web Experiences</a></li>
              <li><a href="#product-stack" className="hover:text-mc-text-strong transition-colors">Custom Web Apps</a></li>
              <li><a href="#product-stack" className="hover:text-mc-text-strong transition-colors">SaaS Platforms</a></li>
              <li><a href="#product-stack" className="hover:text-mc-text-strong transition-colors">Mobile Applications</a></li>
              <li><a href="#product-stack" className="hover:text-mc-text-strong transition-colors">ERP & CRM Systems</a></li>
              <li><a href="#product-stack" className="hover:text-mc-text-strong transition-colors">AI & Automation Solutions</a></li>
            </ul>
          </div>

          {/* Column 4: Navigation & Method */}
          <div className="space-y-3 font-sans text-sm">
            <div className="font-mono text-xs text-mc-orange uppercase tracking-wider mb-2">
              STUDIO NAV
            </div>
            <ul className="space-y-2 text-mc-text-secondary">
              <li><a href="#why-custom" className="hover:text-mc-text-strong transition-colors">Why Custom Engineering</a></li>
              <li><a href="#work" className="hover:text-mc-text-strong transition-colors">Selected Work & Proof</a></li>
              <li><a href="#proof" className="hover:text-mc-text-strong transition-colors">Technical Proof</a></li>
              <li><a href="#process" className="hover:text-mc-text-strong transition-colors">Engineering Process</a></li>
              <li><a href="#pricing" className="hover:text-mc-text-strong transition-colors">Pricing & Tiers</a></li>
              <li><a href="#faq" className="hover:text-mc-text-strong transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Column 5: Studio Metadata */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-mc-orange uppercase tracking-wider mb-2">
              SYSTEM METADATA
            </div>
            <div className="text-mc-text-secondary space-y-1.5">
              <div>STACK: React 19 + TypeScript</div>
              <div>DESIGN: MONOLITH V2.1</div>
              <div>IP HANDOFF: 100% Client Owned</div>
              <div>QUALITY: Zero Template Bloat</div>
              <div className="text-mc-system-green pt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-system-green" />
                <span>SYSTEM STATUS: OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Explore Services Bar (Inspired by image) */}
        <a
          href="#product-stack"
          className="mb-12 p-4 sm:p-5 rounded-lg border border-mc-border bg-mc-surface hover:bg-mc-surface-hover transition-colors flex items-center justify-between group cursor-pointer"
        >
          <span className="font-sans font-medium text-base text-mc-text-strong group-hover:text-mc-orange transition-colors">
            Show all software engineering services & capabilities
          </span>
          <ArrowUpRight className="w-5 h-5 text-mc-text-tertiary group-hover:text-mc-orange transition-colors" />
        </a>

        {/* Legal & Studio Avatar Trust Bar (Inspired by image) */}
        <div className="pt-8 pb-10 border-t border-mc-border-soft flex flex-col lg:flex-row items-center justify-between gap-6 font-mono text-xs text-mc-text-tertiary">
          <div>
            MONOLITH CODES STUDIO LLC © {currentYear}. ALL RIGHTS RESERVED.
          </div>

          <div className="text-center">
            MONOLITH CODES IS A PREMIUM CUSTOM SOFTWARE ENGINEERING STUDIO.
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
        <h1
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
      text-[clamp(1.5rem,3vw,4rem)]
      text-mc-text-strong/10 dark:text-white/10
      transition-all
      duration-500
      group-hover:text-mc-orange/15
      group-hover:scale-[1.015]
    "
        >
          MONOLITHCODES
        </h1>
      </div>
    </footer>
  );
};
