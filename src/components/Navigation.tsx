import React, { useState, useEffect } from 'react';
import { BrandLockup } from './BrandLockup';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Services', href: '#services' },
  { label: 'Technical Proof', href: '#proof' },
  { label: 'Process', href: '#process' },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Section observer highlight
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToInquiry = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 h-[72px] transition-all duration-240 border-b border-transparent',
        isScrolled
          ? 'bg-mc-bg/90 backdrop-blur-md border-mc-border-default shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-[1360px] mx-auto h-full px-6 md:px-10 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a href="#" className="flex items-center hover:opacity-90 transition-opacity">
          <BrandLockup variant="horizontal" size="md" />
        </a>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'relative text-sm font-sans font-medium transition-colors py-1',
                  isActive
                    ? 'text-mc-text-strong'
                    : 'text-mc-text-secondary hover:text-mc-text-strong'
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-mc-orange animate-in fade-in duration-160" />
                )}
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
              'h-[44px] px-5 text-sm font-sans font-medium rounded-[6px]',
              'bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight active:bg-mc-orange-dark',
              'flex items-center gap-2 shadow-sm transition-all duration-160 hover:-translate-y-[1px]'
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
            className="p-2 rounded-md bg-mc-surface border border-mc-border text-mc-text hover:text-mc-orange transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Architectural Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-mc-bg/98 backdrop-blur-xl border-t border-mc-border flex flex-col p-6 overflow-y-auto animate-in slide-in-from-top-2 duration-200 z-50">
          <nav className="flex flex-col gap-2 my-auto">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-4 border-b border-mc-border-soft text-lg font-sans font-medium text-mc-text hover:text-mc-orange transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-mc-orange">0{idx + 1}</span>
                  {item.label}
                </span>
                <span className="text-mc-text-tertiary">↗</span>
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-mc-border flex flex-col gap-4">
            <button
              onClick={scrollToInquiry}
              className="w-full h-12 text-base font-sans font-semibold rounded-[6px] bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight flex items-center justify-center gap-2"
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
