import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EngagementModel {
  index: string;
  title: string;
  subtitle: string;
  deliverables: string[];
  timeline: string;
  idealFor: string;
  ctaText: string;
}

const MODELS: EngagementModel[] = [
  {
    index: 'BUILD / 01',
    title: 'Bespoke Product & System Build',
    subtitle: 'End-to-end architecture, interface design, and full-stack software development.',
    deliverables: [
      'Complete discovery & workflow architecture',
      'Production React frontend & backend API gateway',
      'Automated testing, security audit & deployment',
      '100% IP ownership & code handoff',
    ],
    timeline: '6 - 16 Weeks',
    idealFor: 'Founders & businesses launching a new digital product or replacing core operational software.',
    ctaText: 'Inquire About Product Build',
  },
  {
    index: 'BUILD / 02',
    title: 'Systems Architecture & Modernization',
    subtitle: 'Refactoring legacy code, performance optimization, and custom API integrations.',
    deliverables: [
      'Codebase & database performance profiling',
      'Legacy SAP / ERP custom API bridge',
      'Cloud migration & infrastructure hardening',
      'Core Web Vitals & sub-second API tuning',
    ],
    timeline: '4 - 10 Weeks',
    idealFor: 'Established companies with slow legacy tools needing modern speed, API bridges, or security updates.',
    ctaText: 'Inquire About Modernization',
  },
  {
    index: 'BUILD / 03',
    title: 'Dedicated Studio Engineering Cell',
    subtitle: 'Senior full-stack engineering team embedded directly into your development sprints.',
    deliverables: [
      'Dedicated Senior React & Node/Python engineers',
      'Daily async updates & direct Slack/GitHub access',
      'Flexible sprint scaling based on product roadmap',
      'Zero onboarding or management overhead',
    ],
    timeline: 'Quarterly / Annual',
    idealFor: 'Teams needing immediate senior engineering bandwidth to ship high-priority features.',
    ctaText: 'Inquire About Studio Cell',
  },
];

export const EngagementSection: React.FC = () => {
  const scrollToInquiry = () => {
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 border-b border-mc-border">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>07 / ENGAGEMENT MODELS</span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-mc-text-strong tracking-tight mb-4">
              CLEAR COLLABORATION FRAMEWORKS
            </h2>
            <p className="text-mc-text-body text-base max-w-2xl">
              Transparent engagement structures tailored to your project scope, technical urgency, and operational setup.
            </p>
          </div>
        </div>

        {/* 3-Column Engagement Models */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MODELS.map((model) => (
            <div
              key={model.index}
              className="p-6 sm:p-8 rounded-lg border border-mc-border bg-mc-surface flex flex-col justify-between hover:border-mc-border-strong transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-mc-orange">{model.index}</span>
                  <span className="px-2.5 py-1 rounded bg-mc-surface-deep border border-mc-border font-mono text-xs text-mc-text-secondary">
                    {model.timeline}
                  </span>
                </div>

                <h3 className="text-2xl font-sans font-medium text-mc-text-strong mb-2">
                  {model.title}
                </h3>
                <p className="text-sm font-sans text-mc-text-body leading-relaxed mb-6">
                  {model.subtitle}
                </p>

                <div className="p-4 rounded bg-mc-surface-deep border border-mc-border text-xs font-sans text-mc-text-body mb-6">
                  <span className="font-mono text-mc-orange uppercase block mb-1">BEST FIT FOR:</span>
                  {model.idealFor}
                </div>

                <div className="space-y-3 mb-8">
                  <h4 className="font-mono text-xs text-mc-text-secondary uppercase">
                    KEY SCOPE & DELIVERABLES:
                  </h4>
                  {model.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-mc-text">
                      <CheckCircle2 className="w-4 h-4 text-mc-orange shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollToInquiry}
                className={cn(
                  'w-full h-12 rounded-[6px] text-sm font-sans font-medium',
                  'bg-mc-surface-deep border border-mc-border text-mc-text hover:border-mc-border-strong hover:text-mc-orange',
                  'flex items-center justify-center gap-2 transition-all'
                )}
              >
                <span>{model.ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
