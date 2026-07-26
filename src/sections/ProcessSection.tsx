import React, { useState } from 'react';
import { ArtifactFrame } from '@/components/ArtifactFrame';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessStage {
  step: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  artifactSnippet: {
    header: string;
    lines: string[];
  };
}

const STAGES: ProcessStage[] = [
  {
    step: '01',
    number: '01 / 06',
    title: 'UNDERSTAND',
    summary: 'Deep-dive audit into your business processes, user personas, operational bottlenecks, and ROI goals.',
    details: [
      'Workflow mapping & bottleneck analysis',
      'Technical constraint & integration audit',
      'Project scope & milestone definition',
    ],
    artifactSnippet: {
      header: 'DISCOVERY_SPEC.md',
      lines: [
        'REQ.01: Unify warehouse inventory across 4 sites',
        'REQ.02: Sub-100ms API response target',
        'REQ.03: Single Sign-On integration with Azure AD',
      ],
    },
  },
  {
    step: '02',
    number: '02 / 06',
    title: 'ARCHITECT',
    summary: 'Designing data schemas, API gateways, component structures, and cloud infrastructure pipelines.',
    details: [
      'Database schema & relationship design',
      'API gateway & middleware routing',
      'Security, authentication & audit logging strategy',
    ],
    artifactSnippet: {
      header: 'SYSTEM_ARCHITECTURE.graph',
      lines: [
        '[Client React Frontend] → [Vite / CDN Edge]',
        '                    ↳ [FastAPI / Node API Gateway]',
        '                          ↳ [PostgreSQL + Redis Queue]',
      ],
    },
  },
  {
    step: '03',
    number: '03 / 06',
    title: 'DESIGN',
    summary: 'Engineering intuitive visual design systems, UI components, responsive layouts, and interactive prototypes.',
    details: [
      'Design tokens (Dark, Light, System support)',
      'High-fidelity interactive UI design',
      'Accessibility (WCAG 2.2 AA) compliance',
    ],
    artifactSnippet: {
      header: 'DESIGN_SYSTEM_TOKENS.css',
      lines: [
        ':root { --mc-bg: #080A0C; --mc-orange: #FF6B00; }',
        '[data-theme="light"] { --mc-bg: #F4F3EE; }',
        '--font-sans: "Geist", sans-serif;',
      ],
    },
  },
  {
    step: '04',
    number: '04 / 06',
    title: 'ENGINEER',
    summary: 'Production coding with strict TypeScript, clean component architecture, and automated test coverage.',
    details: [
      '100% typed React & TypeScript codebase',
      'Optimized state management & data fetching',
      'Clean modular primitives & component structure',
    ],
    artifactSnippet: {
      header: 'src/components/WorkflowQueue.tsx',
      lines: [
        'export const QueueItem: React.FC<Props> = ({ data }) => {',
        '  const { status, dispatch } = useQueueState(data.id);',
        '  return <Surface active={status === "PENDING"}>...</Surface>;',
        '};',
      ],
    },
  },
  {
    step: '05',
    number: '05 / 06',
    title: 'VALIDATE',
    summary: 'Comprehensive automated unit testing, end-to-end user testing, performance profiling, and security auditing.',
    details: [
      'Lighthouse & Core Web Vitals audit',
      'Cross-browser & responsive mobile verification',
      'OWASP security & vulnerability scanning',
    ],
    artifactSnippet: {
      header: 'TEST_MATRIX_REPORT.log',
      lines: [
        '✓ Core Web Vitals: LCP 0.8s, CLS 0.00, INP 42ms',
        '✓ Accessibility Audit: 100% Pass (WCAG 2.2 AA)',
        '✓ 142 Unit Tests Passed (0 Failures)',
      ],
    },
  },
  {
    step: '06',
    number: '06 / 06',
    title: 'SHIP + EVOLVE',
    summary: 'Zero-downtime deployment, continuous monitoring, and ongoing optimization based on real user feedback.',
    details: [
      'Automated CI/CD deployment pipelines',
      'Real-time error & telemetry logging',
      'Iterative feature updates & long-term maintenance',
    ],
    artifactSnippet: {
      header: 'PRODUCTION_RELEASE.env',
      lines: [
        'STATUS: PRODUCTION_LIVE (v1.0.0)',
        'DEPLOYMENT: Edge Global CDN',
        'HEALTH: 100% Operational',
      ],
    },
  },
];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const currentStage = STAGES[activeStep];

  return (
    <section id="process" className="py-24 border-b border-mc-border">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>06 / DELIVERY PROCESS</span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-mc-text-strong tracking-tight mb-4">
              THE SIGNAL PIPELINE — HOW WE WORK
            </h2>
            <p className="text-mc-text-body text-base max-w-2xl">
              A structured, transparent 6-stage engineering process designed to eliminate project surprises and deliver software that performs reliably beyond launch.
            </p>
          </div>
        </div>

        {/* Signal Line Progress Bar */}
        <div className="relative mb-12 hidden md:block">
          {/* Base Neutral Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-mc-border -translate-y-1/2" />
          {/* Active Orange Signal Segment */}
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-mc-orange -translate-y-1/2 transition-all duration-300"
            style={{ width: `${(activeStep / (STAGES.length - 1)) * 100}%` }}
          />

          <div className="relative z-10 flex items-center justify-between">
            {STAGES.map((s, idx) => {
              const isPast = idx < activeStep;
              const isCurrent = idx === activeStep;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-2 rounded transition-all group',
                    isCurrent ? 'scale-105' : 'opacity-80 hover:opacity-100'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full font-mono text-xs flex items-center justify-center border transition-all',
                      isCurrent
                        ? 'bg-mc-orange text-mc-bg font-bold border-mc-orange shadow-lg'
                        : isPast
                        ? 'bg-mc-surface-deep text-mc-orange border-mc-orange'
                        : 'bg-mc-surface text-mc-text-tertiary border-mc-border'
                    )}
                  >
                    {s.step}
                  </div>
                  <span
                    className={cn(
                      'font-mono text-xs uppercase transition-colors',
                      isCurrent ? 'text-mc-orange font-semibold' : 'text-mc-text-secondary'
                    )}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Details & Visual Artifact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Stage Copy & Deliverables */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-lg border border-mc-border bg-mc-surface flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-mc-orange">{currentStage.number}</span>
                <span className="px-2.5 py-1 rounded bg-mc-orange-10 border border-mc-orange text-mc-orange font-mono text-xs uppercase">
                  STAGE {currentStage.step} OF 06
                </span>
              </div>

              <h3 className="text-3xl font-sans font-medium text-mc-text-strong mb-4">
                {currentStage.title}
              </h3>
              <p className="text-base font-sans text-mc-text-body leading-relaxed mb-6">
                {currentStage.summary}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="font-mono text-xs text-mc-text-secondary uppercase">
                  STAGE DELIVERABLES:
                </h4>
                {currentStage.details.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-mc-text">
                    <CheckCircle2 className="w-4 h-4 text-mc-orange shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stepper Navigation Controls */}
            <div className="pt-6 border-t border-mc-border flex items-center justify-between">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                className="px-4 py-2 text-xs font-mono rounded bg-mc-surface-deep border border-mc-border text-mc-text disabled:opacity-40 disabled:cursor-not-allowed hover:border-mc-border-strong transition-colors"
              >
                ← Previous Stage
              </button>

              <button
                disabled={activeStep === STAGES.length - 1}
                onClick={() => setActiveStep(Math.min(STAGES.length - 1, activeStep + 1))}
                className="px-4 py-2 text-xs font-mono rounded bg-mc-orange text-mc-bg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-mc-orange-highlight transition-colors flex items-center gap-1"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Stage Visual Artifact */}
          <div className="lg:col-span-6">
            <ArtifactFrame
              title={currentStage.artifactSnippet.header}
              category={`STAGE ${currentStage.step} ARTIFACT`}
              className="h-full min-h-[360px]"
            >
              <div className="p-6 font-mono text-xs space-y-4">
                <div className="text-mc-text-tertiary">
                  // MONOLITH PIPELINE OUTPUT — {currentStage.title}
                </div>

                <div className="p-4 rounded bg-mc-surface-deep border border-mc-border space-y-2">
                  {currentStage.artifactSnippet.lines.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-mc-orange font-bold">›</span>
                      <span className="text-mc-text-strong">{line}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded bg-mc-surface border border-mc-border space-y-2 text-mc-text-secondary text-[11px]">
                  <div>Pipeline Status: VALIDATED</div>
                  <div>Gate Quality: 100%</div>
                  <div>Execution Trace: OK</div>
                </div>
              </div>
            </ArtifactFrame>
          </div>
        </div>
      </div>
    </section>
  );
};
