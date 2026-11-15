import React, { useState, useEffect } from 'react';
import { BrandLockup } from './BrandLockup';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { goToSection } from '@/lib/router';

interface SubNavItem {
  label: string;
  href: string;
  desc?: string;
}

interface NavGroup {
  label: string;
  href?: string;
  children?: SubNavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Work',
    href: '/work',
  },
  {
    label: 'Services',
    children: [
      { label: 'Websites', href: '/services/website-development', desc: 'Hand-coded, SEO-ready business websites' },
      { label: 'Web Apps', href: '/services/web-application-development', desc: 'Portals, dashboards and internal tools' },
      { label: 'SaaS Platforms', href: '/services/saas-development', desc: 'From MVP to multi-tenant production' },
      { label: 'Mobile Apps', href: '/services/mobile-app-development', desc: 'Cross-platform iOS & Android apps' },
      { label: 'ERP & CRM', href: '/services/erp-crm-development', desc: 'Custom operations & sales systems' },
      { label: 'AI & Automation', href: '/services/ai-automation', desc: 'Practical LLM & workflow automation' },
      { label: 'All services', href: '/services', desc: 'Every service, capability and starting price' },
    ],
  },
  {
    label: 'How We Work',
    children: [
      { label: 'Process', href: '/pricing#process', desc: 'Our 7-stage delivery process' },
      { label: 'Technical Quality', href: '/#proof', desc: 'Architecture, performance & security standards' },
      { label: 'Integrations', href: '/services#capabilities', desc: 'API bridges, legacy migration & workflows' },
      { label: 'Guides', href: '/guides', desc: 'Cost, build-vs-buy and project planning' },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'About',
    href: '/about',
  },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToInquiry = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    goToSection('inquiry');
  };

  const toggleMobileGroup = (label: string) => {
    setExpandedMobileGroup(expandedMobileGroup === label ? null : label);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-18 transition-all duration-240 border-b border-transparent',
        isScrolled
          ? 'bg-mc-bg/90 backdrop-blur-md border-mc-border shadow-lg'
          : 'bg-transparent',
        isScrolled && 'is-glass'
      )}
    >
      <div className="max-w-340 mx-auto h-full px-4 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a href="/" className="flex items-center" aria-label="MONOLITH CODES — home">
          <BrandLockup variant="horizontal" size="md" interactiveHover />
        </a>

        {/* Center: Desktop Nav Links with Dropdowns */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          {NAV_GROUPS.map((group) => {
            if (group.children) {
              const isOpen = activeDropdown === group.label;
              return (
                <div
                  key={group.label}
                  className="relative group py-3"
                  onMouseEnter={() => setActiveDropdown(group.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    aria-expanded={isOpen}
                    onClick={() => setActiveDropdown(isOpen ? null : group.label)}
                    className="flex min-h-11 items-center gap-1.5 text-sm font-sans font-medium text-mc-text-secondary hover:text-mc-text-strong transition-colors cursor-pointer"
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200 text-mc-text-tertiary',
                        isOpen && 'rotate-180 text-mc-orange'
                      )}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 p-2 rounded-lg bg-mc-surface border border-mc-border shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-160 z-50">
                      {group.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className="block p-2.5 rounded-md hover:bg-mc-surface-hover transition-colors group/item"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-sans font-medium text-mc-text group-hover/item:text-mc-orange transition-colors">
                              {child.label}
                            </span>
                            <span className="text-xs font-mono text-mc-text-tertiary opacity-0 group-hover/item:opacity-100 transition-opacity">
                              ↗
                            </span>
                          </div>
                          {child.desc && (
                            <p className="text-xs font-sans text-mc-text-secondary mt-0.5 leading-snug">
                              {child.desc}
                            </p>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={group.label}
                href={group.href}
                className="inline-flex min-h-11 items-center text-sm font-sans font-medium text-mc-text-secondary hover:text-mc-text-strong transition-colors"
              >
                {group.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & Primary CTA */}
        <div className="hidden lg:flex items-center gap-5">
          <ThemeToggle />
          <button
            onClick={scrollToInquiry}
            className={cn(
              'h-11 px-5 text-sm font-sans font-medium rounded-md',
              'bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight active:bg-mc-orange-dark',
              'flex items-center gap-2 shadow-sm transition-all duration-160 hover:-translate-y-px cursor-pointer'
            )}
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Trigger & Theme Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-drawer"
            className="grid h-11 w-11 place-items-center rounded-md bg-mc-surface border border-mc-border text-mc-text hover:text-mc-orange transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden fixed inset-x-0 top-18 h-[calc(100dvh-72px)] bg-mc-bg/98 backdrop-blur-xl border-t border-mc-border flex flex-col p-5 sm:p-6 overflow-y-auto overscroll-contain z-50"
        >
          <nav className="flex flex-col gap-2 py-2 flex-1">
            {NAV_GROUPS.map((group, idx) => {
              if (group.children) {
                const isExpanded = expandedMobileGroup === group.label;
                return (
                  <div key={group.label} className="border-b border-mc-border-soft pb-2">
                    <button
                      onClick={() => toggleMobileGroup(group.label)}
                      className="w-full flex items-center justify-between py-3 text-lg font-sans font-medium text-mc-text hover:text-mc-orange transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-mc-orange">0{idx + 1}</span>
                        {group.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-mc-text-tertiary transition-transform duration-200',
                          isExpanded && 'rotate-180 text-mc-orange'
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-6 space-y-2 pb-2">
                        {group.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex min-h-11 items-center text-sm font-sans text-mc-text-secondary hover:text-mc-orange transition-colors"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={group.label}
                  href={group.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 border-b border-mc-border-soft text-lg font-sans font-medium text-mc-text hover:text-mc-orange transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-mc-orange">0{idx + 1}</span>
                    {group.label}
                  </span>
                  <span className="text-mc-text-tertiary">↗</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-mc-border flex flex-col gap-4">
            <button
              onClick={scrollToInquiry}
              className="w-full h-12 text-base font-sans font-semibold rounded-md bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <div className="text-center font-mono text-[11px] text-mc-text-tertiary">
              MONOLITH CODES — SOFTWARE ENGINEERING STUDIO
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
