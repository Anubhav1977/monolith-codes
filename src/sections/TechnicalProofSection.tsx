import React, { useState } from 'react';
import { CodeWindow } from '@/components/CodeWindow';
import { Eye, Code2, Cpu, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TechnicalProofSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'inspect'>('scan');

  const sampleCode = [
    { num: 1, content: '// Monolith Core Architecture: Typed System Router' },
    { num: 2, content: 'import { createSystemRouter, validateSchema } from "@monolith/core";' },
    { num: 3, content: '' },
    { num: 4, content: 'export const workflowEngine = createSystemRouter({' },
    { num: 5, content: '  concurrencyLimit: 500,', highlighted: true },
    { num: 6, content: '  strictValidation: true,' },
    { num: 7, content: '  middleware: [authGuard, auditLogger],' },
    { num: 8, content: '});' },
    { num: 9, content: '' },
    { num: 10, content: 'workflowEngine.onDispatch(async (payload, ctx) => {' },
    { num: 11, content: '  const validated = await validateSchema(payload, OrderSchema);', highlighted: true },
    { num: 12, content: '  const result = fontProcessingQueue.enqueue(validated);' },
    { num: 13, content: '  return { status: 200, latencyMs: ctx.elapsedMs(), result };' },
    { num: 14, content: '});' },
  ];

  return (
    <section id="proof" className="py-24 bg-mc-surface-deep/40 border-b border-mc-border">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>05 / TECHNICAL PROOF</span>
          </div>

          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-mc-text-strong tracking-tight mb-2">
                CLEAR FOR FOUNDERS, RIGOROUS FOR ENGINEERS
              </h2>
              <p className="text-mc-text-body text-base max-w-xl">
                Switch between the Scan Layer (business overview) and the Inspect Layer (code implementation details).
              </p>
            </div>

            {/* Dual Layer Switcher */}
            <div className="inline-flex p-1 rounded-lg bg-mc-surface border border-mc-border shrink-0 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('scan')}
                className={cn(
                  'px-4 py-2 text-xs font-mono rounded-md flex items-center gap-2 transition-all cursor-pointer',
                  activeTab === 'scan'
                    ? 'bg-mc-orange text-mc-bg font-semibold shadow-md'
                    : 'text-mc-text-secondary hover:text-mc-text'
                )}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Scan Layer (Business)</span>
              </button>

              <button
                onClick={() => setActiveTab('inspect')}
                className={cn(
                  'px-4 py-2 text-xs font-mono rounded-md flex items-center gap-2 transition-all cursor-pointer',
                  activeTab === 'inspect'
                    ? 'bg-mc-orange text-mc-bg font-semibold shadow-md'
                    : 'text-mc-text-secondary hover:text-mc-text'
                )}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Inspect Layer (Code)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Layer Content */}
        {activeTab === 'scan' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-200">
            <div className="p-6 md:p-8 rounded-lg border border-mc-border bg-mc-surface">
              <div className="font-mono text-xs text-mc-orange mb-3">01 / ARCHITECTURE</div>
              <h3 className="text-xl font-sans font-medium text-mc-text-strong mb-2">
                Type-Safe System Boundaries
              </h3>
              <p className="text-sm text-mc-text-body leading-relaxed mb-4">
                Every request entering the application is strictly validated at runtime to eliminate invalid input bugs before hitting your database.
              </p>
              <div className="p-3 rounded bg-mc-surface-deep border border-mc-border font-mono text-xs text-mc-text-secondary flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-mc-system-green shrink-0" />
                <span>Zero runtime schema mismatch errors</span>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-lg border border-mc-border bg-mc-surface">
              <div className="font-mono text-xs text-mc-orange mb-3">02 / PERFORMANCE</div>
              <h3 className="text-xl font-sans font-medium text-mc-text-strong mb-2">
                Sub-100ms API Execution
              </h3>
              <p className="text-sm text-mc-text-body leading-relaxed mb-4">
                Optimized database indexes and asynchronous worker queues keep core user workflows fast and responsive even during high usage.
              </p>
              <div className="p-3 rounded bg-mc-surface-deep border border-mc-border font-mono text-xs text-mc-text-secondary flex items-center gap-2">
                <Cpu className="w-4 h-4 text-mc-system-green shrink-0" />
                <span>Sub-second API target verified</span>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-lg border border-mc-border bg-mc-surface">
              <div className="font-mono text-xs text-mc-orange mb-3">03 / MAINTAINABILITY</div>
              <h3 className="text-xl font-sans font-medium text-mc-text-strong mb-2">
                Modular React Composition
              </h3>
              <p className="text-sm text-mc-text-body leading-relaxed mb-4">
                Clean, documented, component-driven codebase built to be handed over or scaled seamlessly by your internal engineering team.
              </p>
              <div className="p-3 rounded bg-mc-surface-deep border border-mc-border font-mono text-xs text-mc-text-secondary flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-mc-system-green shrink-0" />
                <span>100% Typed TypeScript & clean APIs</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            <div className="lg:col-span-7">
              <CodeWindow
                filename="src/server/workflowEngine.ts"
                language="typescript"
                lines={sampleCode}
              />
            </div>

            <div className="lg:col-span-5 p-6 md:p-8 rounded-lg border border-mc-border bg-mc-surface space-y-6">
              <div>
                <span className="font-mono text-xs text-mc-orange uppercase">SPECIFICATION SUMMARY:</span>
                <h3 className="text-xl font-sans font-medium text-mc-text-strong mt-1 mb-2">
                  System Queue & Schema Validation
                </h3>
                <p className="text-sm text-mc-text-body leading-relaxed">
                  Demonstration of our production middleware architecture handling request sanitization, concurrency throttling, and typed error handling.
                </p>
              </div>

              <div className="p-4 rounded bg-mc-surface-deep border border-mc-border font-mono text-xs space-y-2">
                <div className="text-mc-system-green font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>BENCHMARK METRICS (HEALTHY):</span>
                </div>
                <div className="text-mc-text-secondary">Concurrency Limit: 500 req/sec</div>
                <div className="text-mc-text-secondary">Avg Latency: 14.2ms</div>
                <div className="text-mc-text-secondary">Memory Footprint: 32MB</div>
                <div className="text-mc-text-secondary">TypeScript Strict Mode: Enabled</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
