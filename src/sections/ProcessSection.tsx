import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  CreditCard,
  RefreshCw,
  Search,
  FileText,
  KeyRound,
  Code2,
  BadgeCheck,
  Rocket,
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
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

const STEP_META = [
  { short: 'Enquiry', Icon: Search },
  { short: 'Scope', Icon: FileText },
  { short: 'Approval', Icon: KeyRound },
  { short: 'Build', Icon: Code2 },
  { short: 'Test', Icon: BadgeCheck },
  { short: 'Deploy', Icon: Rocket },
  { short: 'Support', Icon: LifeBuoy },
];

export const ProcessSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const stage = STAGES[active];
  const total = STAGES.length;

  const go = (i: number) => setActive((i + total) % total);

  // keep the active chip in view on small screens without ever moving the page itself
  useEffect(() => {
    const rail = railRef.current;
    const btn = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !btn) return;
    rail.scrollTo({ left: btn.offsetLeft - (rail.clientWidth - btn.clientWidth) / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <section id="process" className="py-20 md:py-28 border-b border-mc-border bg-mc-bg">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="vt-title">How does it <em>work</em>?</h2>
          <p className="mt-5 text-mc-text-secondary">The 7-stage delivery pipeline — from first enquiry to launch.</p>
        </div>

        <div className="mb-20 md:mb-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Stepper */}
          <div
            ref={railRef}
            role="tablist"
            aria-label="Delivery stages"
            className="flex lg:grid lg:grid-cols-7 gap-2.5 overflow-x-auto no-scrollbar pb-3 -mx-1 px-1"
          >
            {STAGES.map((st, i) => {
              const { short, Icon } = STEP_META[i];
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button
                  key={st.step}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => go(i)}
                  className={cn(
                    'relative shrink-0 min-w-[128px] lg:min-w-0 overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-all duration-300 cursor-pointer',
                    isActive
                      ? 'border-mc-orange/60 bg-mc-orange/10 shadow-[0_0_30px_-8px_rgba(255,107,0,.45)]'
                      : 'border-mc-border bg-mc-surface hover:border-mc-border-strong'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn('font-mono text-[11px] tracking-wider', isActive || isPast ? 'text-mc-orange' : 'text-mc-text-tertiary')}>
                      {st.step}
                    </span>
                    <Icon className={cn('h-4 w-4 transition-colors', isActive || isPast ? 'text-mc-orange' : 'text-mc-text-tertiary')} />
                  </div>
                  <div className={cn('mt-2 text-sm font-medium', isActive ? 'text-mc-text-strong' : 'text-mc-text-secondary')}>{short}</div>

                  <span className="absolute inset-x-0 bottom-0 h-[3px] bg-mc-border/60" aria-hidden="true" />
                  {isPast && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-mc-orange/70" aria-hidden="true" />}
                  {isActive && (
                    <span
                      key={active}
                      aria-hidden="true"
                      className="hw-fill absolute inset-x-0 bottom-0 h-[3px] bg-mc-orange"
                      style={{ animationPlayState: paused ? 'paused' : 'running' }}
                      onAnimationEnd={() => go(active + 1)}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-mc-border bg-mc-surface">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-mc-orange/10 blur-3xl"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-[minmax(0,1fr)] gap-8 p-6 sm:p-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14 lg:p-12"
              >
                {/* Left: story */}
                <div className="flex min-w-0 flex-col">
                  <div className="flex items-end gap-4">
                    <span className="bg-gradient-to-b from-mc-orange to-mc-orange/20 bg-clip-text font-sans text-[72px] font-semibold leading-[0.85] tracking-tighter text-transparent sm:text-[88px]">
                      {stage.step}
                    </span>
                    <span className="mb-1 font-mono text-xs uppercase tracking-wider text-mc-text-tertiary">Stage {stage.number}</span>
                  </div>
                  <h3 className="mt-5 font-sans text-2xl font-medium leading-[1.1] tracking-tight text-mc-text-strong sm:text-3xl lg:text-4xl">
                    {stage.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mc-text-body sm:text-base">{stage.summary}</p>

                  <ul className="mt-7 divide-y divide-mc-border-soft border-y border-mc-border-soft">
                    {stage.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 py-3.5 text-sm text-mc-text-strong/90 sm:text-[15px]">
                        <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-mc-orange" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: terminal artifact */}
                <div className="flex min-w-0 flex-col justify-center">
                  <div className="min-w-0 overflow-hidden rounded-xl border border-mc-border bg-[#0a0b0d] shadow-[0_30px_70px_-30px_rgba(0,0,0,.9)]">
                    <div className="flex items-center justify-between gap-3 border-b border-mc-border px-4 py-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                        <span className="ml-3 truncate font-mono text-xs text-mc-text-secondary">{stage.artifactSnippet.header}</span>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-mc-orange">Stage {stage.step}/07</span>
                    </div>
                    <div className="space-y-1.5 px-5 py-6 font-mono text-[12.5px] leading-6 text-mc-text-strong sm:text-[13px]">
                      {stage.artifactSnippet.lines.map((l) => (
                        <p key={l} className="flex gap-3">
                          <span className="select-none text-mc-orange">›</span>
                          <span className="min-w-0 break-words">{l}</span>
                        </p>
                      ))}
                      <p className="flex gap-3">
                        <span className="select-none text-mc-orange">›</span>
                        <span className="hw-caret inline-block h-4 w-2 translate-y-1 bg-mc-orange/80" />
                      </p>
                    </div>
                    <div className="flex items-center gap-2 border-t border-mc-border px-5 py-3 font-mono text-[11px] text-mc-text-tertiary">
                      <span className="h-1.5 w-1.5 rounded-full bg-mc-system-green" />
                      Quality Gate: 100% Pass • Trace Execution: OK
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="relative flex items-center justify-between border-t border-mc-border px-6 py-4 sm:px-9 lg:px-12">
              <span className="font-mono text-[11px] uppercase tracking-wider text-mc-text-tertiary">
                {paused ? 'Paused' : 'Auto-playing'} • {stage.step} / 0{total}
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => go(active - 1)}
                  aria-label="Previous stage"
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-mc-border bg-mc-surface-deep text-mc-text transition-colors hover:border-mc-orange hover:text-mc-orange"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => go(active + 1)}
                  aria-label="Next stage"
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-mc-border bg-mc-surface-deep text-mc-text transition-colors hover:border-mc-orange hover:text-mc-orange"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
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
