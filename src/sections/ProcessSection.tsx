import React, { useState } from 'react';
import { ArtifactFrame } from '@/components/ArtifactFrame';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, CreditCard, RefreshCw, Layers } from 'lucide-react';
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
    number: '01 / 07',
    title: 'ENQUIRY & AUDIT',
    summary: 'Initial enquiry review, requirements discussion, and operational bottleneck evaluation with senior architects.',
    details: [
      'Requirements discovery & business process audit',
      'Technical constraint & integration evaluation',
      'Initial feasibility & architecture discussion',
    ],
    artifactSnippet: {
      header: 'DISCOVERY_SPEC.md',
      lines: [
        'STAGE: 01_REQUIREMENTS_DISCOVERY',
        'AUDIT: Multi-location ERP & API latency audit',
        'TARGET: Sub-100ms response & responsive React UI',
      ],
    },
  },
  {
    step: '02',
    number: '02 / 07',
    title: 'SCOPE & QUOTE',
    summary: 'Formulating explicit project boundaries, architectural deliverables, milestone roadmaps, and structured quotation.',
    details: [
      'Granular Statement of Work (SOW) specification',
      'Architecture blueprints & milestone deliverables',
      'Applicable quotation & commercial conditions',
    ],
    artifactSnippet: {
      header: 'PROPOSAL_SCOPE.json',
      lines: [
        'SOW_SPEC: Web Application & Data Gateway',
        'DELIVERABLES: [Frontend UI, Auth, API, DB Schema]',
        'MILESTONES: Phase 1 (Core), Phase 2 (Telemetry)',
      ],
    },
  },
  {
    step: '03',
    number: '03 / 07',
    title: 'APPROVAL & INITIAL PAYMENT',
    summary: 'Written approval of the project scope and receipt of the agreed initial payment. Development officially begins once both are secured.',
    details: [
      'Written scope approval & mutual agreement execution',
      'Agreed initial payment receipt & sprint scheduling',
      'Direct communication channel & staging environment setup',
    ],
    artifactSnippet: {
      header: 'KICKOFF_CONFIRMATION.log',
      lines: [
        'STATUS: SCOPE_APPROVED_AND_DEPOSIT_CLEARED',
        'NOTE: Development begins upon agreed initial payment',
        'SPRINT_CELL: Senior Engineer Pod Activated',
      ],
    },
  },
  {
    step: '04',
    number: '04 / 07',
    title: 'DESIGN & BUILD',
    summary: 'Engineering custom UI component systems and production React/TypeScript code with agreed weekly sprint reviews.',
    details: [
      'Bespoke design systems & responsive components',
      'Production React 19, TypeScript & clean backend logic',
      'Agreed milestone reviews & live staging previews',
    ],
    artifactSnippet: {
      header: 'src/components/DataGrid.tsx',
      lines: [
        'export const DataGrid: React.FC<Props> = ({ stream }) => {',
        '  const { data } = useTelemetry(stream.endpoint);',
        '  return <Surface elevation="panel">{data}</Surface>;',
        '};',
      ],
    },
  },
  {
    step: '05',
    number: '05 / 07',
    title: 'TEST & ACCEPT',
    summary: 'Rigorous unit testing, Core Web Vitals profiling, security scans, client review, and formal milestone acceptance.',
    details: [
      'Automated unit & end-to-end test verification',
      'Cross-browser & mobile responsive audit',
      'Client review, user acceptance testing & sign-off',
    ],
    artifactSnippet: {
      header: 'ACCEPTANCE_MATRIX.log',
      lines: [
        '✓ Core Web Vitals: LCP 0.8s, CLS 0.00, INP 38ms',
        '✓ WCAG 2.2 AA Accessibility: Verified 100%',
        '✓ Client UAT Review: Milestone Accepted',
      ],
    },
  },
  {
    step: '06',
    number: '06 / 07',
    title: 'DEPLOY & HANDOVER',
    summary: 'Zero-downtime production deployment, domain go-live, and 100% intellectual property & Git repository transfer.',
    details: [
      'Automated CI/CD deployment & CDN edge provisioning',
      '100% IP ownership & Git repository transfer',
      'Comprehensive system documentation & operational handoff',
    ],
    artifactSnippet: {
      header: 'PRODUCTION_RELEASE.env',
      lines: [
        'STATUS: PRODUCTION_LIVE_STABLE',
        'IP_OWNERSHIP: 100% Transferred to Client',
        'HANDOVER: Git Repo + Env Docs Released',
      ],
    },
  },
  {
    step: '07',
    number: '07 / 07',
    title: 'WARRANTY & SUPPORT',
    summary: 'Agreed post-launch defect warranty period, optional ongoing maintenance retainers, and infrastructure telemetry.',
    details: [
      'Covered defect correction during agreed warranty period',
      'Optional monthly maintenance retainers for continuous monitoring',
      'Infrastructure updates, security patches & telemetry',
    ],
    artifactSnippet: {
      header: 'SUPPORT_AGREEMENT.spec',
      lines: [
        'WARRANTY: 30-Day Defect Correction Coverage',
        'MAINTENANCE: Optional Monthly Service Retainer',
        'NEW_FEATURES: Evaluated via Separate SOW',
      ],
    },
  },
];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const currentStage = STAGES[activeStep];

  return (
    <section id="process" className="py-24 border-b border-mc-border bg-mc-bg">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>06 / HOW WE WORK</span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-mc-text-strong tracking-tight mb-4">
              THE 7-STAGE DELIVERY PIPELINE
            </h2>
            <p className="text-mc-text-body text-base md:text-lg max-w-3xl leading-relaxed">
              A structured, transparent engineering process designed to eliminate project ambiguity. Development officially begins after the scope is approved and the agreed initial payment is received.
            </p>
          </div>
        </div>

        {/* Signal Stepper Progress Bar */}
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
                    'flex flex-col items-center gap-2 p-2 rounded transition-all group cursor-pointer',
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Left Column: Stage Copy & Deliverables */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl border border-mc-border bg-mc-surface flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-mc-orange font-medium">{currentStage.number}</span>
                <span className="px-2.5 py-1 rounded bg-mc-orange-10 border border-mc-orange-28 text-mc-orange font-mono text-xs uppercase font-semibold">
                  STAGE {currentStage.step} OF 07
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong mb-4">
                {currentStage.title}
              </h3>
              <p className="text-sm sm:text-base font-sans text-mc-text-body leading-relaxed mb-6">
                {currentStage.summary}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="font-mono text-xs text-mc-text-secondary uppercase tracking-wider">
                  STAGE DELIVERABLES:
                </h4>
                {currentStage.details.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-sans text-mc-text">
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
                className="px-4 py-2 text-xs font-mono rounded-lg bg-mc-surface-deep border border-mc-border text-mc-text disabled:opacity-40 disabled:cursor-not-allowed hover:border-mc-border-strong transition-colors cursor-pointer"
              >
                &larr; Previous Stage
              </button>

              <button
                disabled={activeStep === STAGES.length - 1}
                onClick={() => setActiveStep(Math.min(STAGES.length - 1, activeStep + 1))}
                className="px-4 py-2 text-xs font-mono rounded-lg bg-mc-orange text-mc-bg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-mc-orange-highlight transition-colors flex items-center gap-1 cursor-pointer"
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
                  // MONOLITH PIPELINE TRACE &bull; {currentStage.title}
                </div>

                <div className="p-4 rounded-lg bg-mc-surface-deep border border-mc-border space-y-2">
                  {currentStage.artifactSnippet.lines.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-mc-orange font-bold">&rsaquo;</span>
                      <span className="text-mc-text-strong font-mono">{line}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-mc-surface border border-mc-border space-y-1.5 text-mc-text-secondary text-xs">
                  <div>Pipeline Status: VERIFIED SPECIFICATION</div>
                  <div>Quality Gate: 100% Pass</div>
                  <div>Trace Execution: OK</div>
                </div>
              </div>
            </ArtifactFrame>
          </div>
        </div>

        {/* Clear Terms. No Surprises. — Transparent 2x2 Commercial Overview */}
        <div className="p-6 sm:p-8 rounded-2xl bg-mc-surface border border-mc-border space-y-6">
          <div>
            <div className="font-mono text-xs text-mc-orange uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>TRANSPARENCY</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
              Clear Terms. No Surprises.
            </h3>
            <p className="text-sm sm:text-base text-mc-text-body font-sans mt-1.5 max-w-2xl leading-relaxed">
              Scope, pricing, timelines and support are agreed before your project begins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Card 1 — PAYMENT */}
            <div className="p-5 sm:p-6 rounded-xl bg-mc-surface-deep border border-mc-border space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-xs text-mc-orange font-semibold tracking-wider">
                <CreditCard className="w-4 h-4" />
                <span>PAYMENT</span>
              </div>
              <p className="text-sm font-sans text-mc-text-body leading-relaxed">
                Your proposal clearly outlines the initial payment, milestones and due dates. Work begins once the scope is approved and the agreed initial payment is received.
              </p>
            </div>

            {/* Card 2 — DELIVERY */}
            <div className="p-5 sm:p-6 rounded-xl bg-mc-surface-deep border border-mc-border space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-xs text-mc-orange font-semibold tracking-wider">
                <Clock className="w-4 h-4" />
                <span>DELIVERY</span>
              </div>
              <p className="text-sm font-sans text-mc-text-body leading-relaxed">
                We agree on deliverables and target timelines before development. Milestones may be adjusted if requirements, client inputs or external dependencies change.
              </p>
            </div>

            {/* Card 3 — SCOPE & REVISIONS */}
            <div className="p-5 sm:p-6 rounded-xl bg-mc-surface-deep border border-mc-border space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-xs text-mc-orange font-semibold tracking-wider">
                <RefreshCw className="w-4 h-4" />
                <span>SCOPE &amp; REVISIONS</span>
              </div>
              <p className="text-sm font-sans text-mc-text-body leading-relaxed">
                Your proposal defines what's included and the revisions available. Additional requirements are discussed and approved before any extra work begins.
              </p>
            </div>

            {/* Card 4 — POST-LAUNCH SUPPORT */}
            <div className="p-5 sm:p-6 rounded-xl bg-mc-surface-deep border border-mc-border space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-xs text-mc-orange font-semibold tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>POST-LAUNCH SUPPORT</span>
              </div>
              <p className="text-sm font-sans text-mc-text-body leading-relaxed">
                We provide the agreed defect-fix support after launch. Ongoing maintenance, updates and new features are scoped separately when needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
