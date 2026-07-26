import React from 'react';
import { BrandLockup } from '@/components/BrandLockup';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 bg-mc-bg border-t border-mc-border select-none">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1 & 2: Brand Lockup & Studio Directive */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLockup variant="horizontal" size="lg" />
            <p className="text-sm text-mc-text-secondary max-w-sm leading-relaxed font-sans">
              MONOLITH CODES is a software engineering studio. We engineer custom web applications, SaaS platforms, mobile apps, ERP/CRM systems, and business workflow automation.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-mc-surface border border-mc-border text-xs font-mono text-mc-text-body">
              <span className="w-2 h-2 rounded-full bg-mc-orange animate-pulse" />
              <span>Available for Q3/Q4 Projects</span>
            </div>
          </div>

          {/* Column 3: Capabilities */}
          <div className="space-y-3 font-sans text-sm">
            <div className="font-mono text-xs text-mc-orange uppercase tracking-wider mb-2">
              CAPABILITIES
            </div>
            <ul className="space-y-2 text-mc-text-secondary">
              <li><a href="#capabilities" className="hover:text-mc-text-strong transition-colors">Web Experiences</a></li>
              <li><a href="#capabilities" className="hover:text-mc-text-strong transition-colors">Custom Software</a></li>
              <li><a href="#capabilities" className="hover:text-mc-text-strong transition-colors">SaaS Engineering</a></li>
              <li><a href="#capabilities" className="hover:text-mc-text-strong transition-colors">Mobile Applications</a></li>
              <li><a href="#capabilities" className="hover:text-mc-text-strong transition-colors">System Integrations</a></li>
            </ul>
          </div>

          {/* Column 4: Process & Proof */}
          <div className="space-y-3 font-sans text-sm">
            <div className="font-mono text-xs text-mc-orange uppercase tracking-wider mb-2">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-mc-text-secondary">
              <li><a href="#work" className="hover:text-mc-text-strong transition-colors">Selected Work</a></li>
              <li><a href="#services" className="hover:text-mc-text-strong transition-colors">Service Systems</a></li>
              <li><a href="#proof" className="hover:text-mc-text-strong transition-colors">Technical Proof</a></li>
              <li><a href="#process" className="hover:text-mc-text-strong transition-colors">Signal Pipeline</a></li>
              <li><a href="#inquiry" className="hover:text-mc-text-strong transition-colors">Start a Project</a></li>
            </ul>
          </div>

          {/* Column 5: Studio Metadata */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-mc-orange uppercase tracking-wider mb-2">
              STUDIO METADATA
            </div>
            <div className="text-mc-text-secondary space-y-1">
              <div>STACK: React 19 + TypeScript</div>
              <div>DESIGN: MONOLITH V2.1</div>
              <div>STATION: Software Studio</div>
              <div>STATUS: Operational</div>
            </div>
          </div>
        </div>

        {/* Bottom Rail: Copyright & Legal */}
        <div className="pt-8 border-t border-mc-border-soft flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-mc-text-tertiary">
          <div>
            © {new Date().getFullYear()} MONOLITH CODES STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="#inquiry" className="hover:text-mc-text transition-colors">Inquiry Policy</a>
            <span>•</span>
            <a href="#inquiry" className="hover:text-mc-text transition-colors">Confidentiality (NDA)</a>
            <span>•</span>
            <a href="#" className="hover:text-mc-text transition-colors">WCAG 2.2 AA Compliant</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
