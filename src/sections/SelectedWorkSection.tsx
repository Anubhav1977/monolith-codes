import React, { useState } from 'react';
import { ArtifactFrame } from '@/components/ArtifactFrame';
import { ExternalLink, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseStudy {
  id: string;
  index: string;
  category: string;
  title: string;
  clientContext: string;
  problem: string;
  solution: string;
  metrics: { label: string; value: string }[];
  stack: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'erp-platform',
    index: 'CASE / 01',
    category: 'ENTERPRISE ERP & OPERATIONS',
    title: 'Multi-Facility Workflow & Inventory Management Engine',
    clientContext: 'Regional Industrial Equipment Supplier',
    problem: 'Operations relied on fragmented manual spreadsheets and paper logs across 4 warehouses, resulting in order delays and inventory inaccuracies.',
    solution: 'Designed and engineered a centralized operational portal featuring real-time inventory tracking, automated dispatch routing, and role-based worker queues.',
    metrics: [
      { label: 'Fulfillment Speed', value: '+42%' },
      { label: 'Inventory Errors', value: '-88%' },
      { label: 'Data Sync Time', value: '<50ms' },
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind v4', 'PostgreSQL', 'Redis Queue'],
  },
  {
    id: 'saas-analytics',
    index: 'CASE / 02',
    category: 'PRODUCT & SAAS ENGINEERING',
    title: 'High-Throughput Financial Telemetry & Billing Dashboard',
    clientContext: 'Fintech Software Startup',
    problem: 'Existing dashboard crashed under high concurrency during market open, causing customer churn and delayed metric updates.',
    solution: 'Re-architected the frontend telemetry streaming pipeline using WebSockets and virtualized data tables capable of rendering 10,000+ live transactions per second.',
    metrics: [
      { label: 'Render Concurrency', value: '10k/sec' },
      { label: 'Dashboard Latency', value: '18ms' },
      { label: 'Uptime Score', value: '99.99%' },
    ],
    stack: ['React', 'WebSockets', 'Tailwind v4', 'Node.js Gateway', 'TimescaleDB'],
  },
  {
    id: 'healthcare-portal',
    index: 'CASE / 03',
    category: 'CUSTOM PORTALS & MOBILE',
    title: 'HIPAA-Compliant Patient & Clinical Provider Web/Mobile Portal',
    clientContext: 'Specialty Telehealth Provider',
    problem: 'Patients faced fragmented scheduling across legacy phone systems while doctors lacked mobile access to clinical charts.',
    solution: 'Engineered a unified HIPAA-compliant web portal and mobile app with end-to-end encrypted messaging, automated scheduling, and EHR integration.',
    metrics: [
      { label: 'Patient Adoption', value: '78%' },
      { label: 'No-Show Rate', value: '-35%' },
      { label: 'Compliance Audit', value: 'Passed 100%' },
    ],
    stack: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'AWS KMS'],
  },
  {
    id: 'ai-logistics',
    index: 'CASE / 04',
    category: 'SYSTEMS & AUTOMATION',
    title: 'AI-Powered Automated Freight & Route Dispatch System',
    clientContext: 'Logistics & Fleet Operator',
    problem: 'Dispatchers spent 4+ hours daily manually matching driver shifts to carrier loads and legacy SAP ERP data.',
    solution: 'Built an automated decision engine and custom API bridge connecting legacy SAP systems with an intelligent load dispatch interface.',
    metrics: [
      { label: 'Manual Dispatch Time', value: '-85%' },
      { label: 'Carrier Utilization', value: '+24%' },
      { label: 'SAP API Sync', value: 'Sub-second' },
    ],
    stack: ['React', 'TypeScript', 'Python FastAPI', 'SAP Gateway', 'OpenAI API'],
  },
];

export const SelectedWorkSection: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);
  const [showAll, setShowAll] = useState<boolean>(false);

  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  // Progressive reveal density: Desktop max 2-4 visible, Mobile max 1-2
  const visibleCases = showAll ? CASE_STUDIES : CASE_STUDIES.slice(0, 3);

  return (
    <section id="work" className="py-24 bg-mc-surface-deep/40 border-b border-mc-border">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>04 / SELECTED WORK & PROOF</span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-mc-text-strong tracking-tight mb-4">
              ENGINEERING PROOF IN PRODUCTION
            </h2>
            <p className="text-mc-text-body text-base md:text-lg max-w-2xl">
              Visual evidence of custom software systems, platforms, and applications we have designed and built for serious business operations.
            </p>
          </div>
        </div>

        {/* Case Selector Tabs (Progressively Filtered) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {visibleCases.map((item) => {
            const isSelected = item.id === selectedCaseId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCaseId(item.id)}
                className={cn(
                  'px-4 py-2.5 rounded-md text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer',
                  isSelected
                    ? 'bg-mc-surface border-mc-orange text-mc-text-strong font-medium shadow-md'
                    : 'bg-mc-surface-deep border-mc-border text-mc-text-secondary hover:border-mc-border-strong hover:text-mc-text'
                )}
              >
                <span className={cn('text-[10px]', isSelected ? 'text-mc-orange' : 'text-mc-text-tertiary')}>
                  {item.index}
                </span>
                <span>{item.title.substring(0, 30)}...</span>
              </button>
            );
          })}
        </div>

        {/* Case Showcase Grid - Larger Proof Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Visual Proof Artifact Frame */}
          <div className="lg:col-span-7">
            <ArtifactFrame
              title={activeCase.title}
              category={activeCase.category}
              className="w-full"
            >
              {/* Simulated UI Artifact Composition */}
              <div className="p-6 md:p-8 space-y-6 font-sans">
                {/* Artifact Top Status Bar with System Green */}
                <div className="flex items-center justify-between p-3.5 rounded bg-mc-surface-deep border border-mc-border text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-mc-system-green animate-pulse" />
                    <span className="text-mc-text-strong font-medium">LIVE SYSTEM NODE • VERIFIED</span>
                  </div>
                  <span className="text-mc-text-tertiary">{activeCase.index}</span>
                </div>

                {/* Dashboard Metrics Surface */}
                <div className="grid grid-cols-3 gap-4">
                  {activeCase.metrics.map((m, i) => (
                    <div key={i} className="p-4 rounded bg-mc-surface border border-mc-border">
                      <div className="text-[11px] font-mono text-mc-text-tertiary mb-1 uppercase">{m.label}</div>
                      <div className="text-xl md:text-2xl font-mono font-semibold text-mc-orange">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Operational Pipeline Diagram */}
                <div className="p-4 rounded bg-mc-surface border border-mc-border space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-mc-text-secondary pb-2 border-b border-mc-border-soft">
                    <span>ARCHITECTURAL DATA ROUTE</span>
                    <span className="text-mc-system-green flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      HEALTHY
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="p-2 rounded bg-mc-surface-deep border border-mc-border text-mc-text">
                      [Client Request]
                    </div>
                    <span className="text-mc-orange">→</span>
                    <div className="p-2 rounded bg-mc-surface-deep border border-mc-orange/40 text-mc-orange font-medium">
                      [Monolith Custom Engine]
                    </div>
                    <span className="text-mc-orange">→</span>
                    <div className="p-2 rounded bg-mc-surface-deep border border-mc-border text-mc-text">
                      [Sub-second Response]
                    </div>
                  </div>
                </div>
              </div>
            </ArtifactFrame>
          </div>

          {/* Right Column: Case Story Details */}
          <div className="lg:col-span-5 p-6 md:p-8 rounded-lg border border-mc-border bg-mc-surface flex flex-col justify-between h-full">
            <div>
              <div className="font-mono text-xs text-mc-orange uppercase mb-2">
                {activeCase.index} • {activeCase.category}
              </div>
              <h3 className="text-2xl font-sans font-medium text-mc-text-strong mb-2">
                {activeCase.title}
              </h3>
              <div className="text-xs font-mono text-mc-text-tertiary mb-6">
                Client Domain: {activeCase.clientContext}
              </div>

              {/* Problem Section */}
              <div className="mb-6">
                <h4 className="font-mono text-xs text-mc-orange uppercase mb-2">
                  THE BUSINESS PROBLEM:
                </h4>
                <p className="text-sm font-sans text-mc-text-body leading-relaxed">
                  {activeCase.problem}
                </p>
              </div>

              {/* Solution Section */}
              <div className="mb-6">
                <h4 className="font-mono text-xs text-mc-orange uppercase mb-2">
                  WHAT MONOLITH ENGINEERED:
                </h4>
                <p className="text-sm font-sans text-mc-text-body leading-relaxed">
                  {activeCase.solution}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="mb-8">
                <h4 className="font-mono text-xs text-mc-text-secondary uppercase mb-2">
                  TECHNOLOGY STACK:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeCase.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded bg-mc-surface-deep border border-mc-border font-mono text-[11px] text-mc-text-secondary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <a
              href="#inquiry"
              className="w-full h-12 rounded-[6px] bg-mc-surface-deep border border-mc-border text-mc-text hover:border-mc-border-strong hover:text-mc-orange flex items-center justify-center gap-2 font-sans font-medium text-sm transition-all"
            >
              <span>Request Similar Architecture</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Progressive Reveal Toggle Button */}
        {CASE_STUDIES.length > 3 && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="h-11 px-6 rounded-md bg-mc-surface border border-mc-border text-xs font-mono text-mc-text hover:border-mc-orange hover:text-mc-orange flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>{showAll ? 'Collapse Case Studies' : 'View All Case Studies'}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
