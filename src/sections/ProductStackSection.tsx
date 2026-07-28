import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Smartphone, LayoutDashboard, Cpu, Bot, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StackItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  systemStatus: string;
  deliverables: string[];
  stack: string[];
  codePreview: string;
}

const STACK_ITEMS: StackItem[] = [
  {
    id: 'web',
    index: '01 / STACK',
    title: 'Web Experiences',
    tagline: 'High-conversion marketing engines, sub-second landing pages & bespoke digital frontends',
    icon: <Globe className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Live Engine • Sub-200ms TBT',
    deliverables: [
      'Sub-second initial paint & optimal Core Web Vitals',
      'Headless CMS & custom component architecture',
      'SEO-structured semantic HTML & dynamic OG images',
      'Interactive motion & 3D WebGL Monolith Field elements',
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite / Next.js'],
    codePreview: `const webEngine = createExperience({
  target: 'high-conversion-landing',
  performance: { ttfb: '<100ms', cwv: 99 },
  security: { headers: 'strict-csp' }
});`,
  },
  {
    id: 'web-apps',
    index: '02 / STACK',
    title: 'Web Applications',
    tagline: 'Bespoke web platforms engineered for high traffic, real-time data & complex logic',
    icon: <Server className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Active Queue • Real-time Sync',
    deliverables: [
      'Real-time WebSocket & event-driven dashboard state',
      'Multi-role authentication, RBAC & audit logging',
      'High-concurrency database queries & Redis caching',
      'Sub-millisecond API endpoints & GraphQL gateways',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
    codePreview: `const appGateway = new EventGateway({
  webSockets: true,
  concurrency: 50000,
  cacheStrategy: 'stale-while-revalidate'
});`,
  },
  {
    id: 'mobile',
    index: '03 / STACK',
    title: 'Mobile Applications',
    tagline: 'Native-feel iOS & Android mobile platforms for field teams and customer access',
    icon: <Smartphone className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Cross-Platform • 60 FPS',
    deliverables: [
      'React Native cross-platform iOS & Android apps',
      'Offline-first local SQLite sync & conflict resolution',
      'Biometric authentication & native push notifications',
      'Hardware integration (Bluetooth, Camera, GPS)',
    ],
    stack: ['React Native', 'TypeScript', 'SQLite', 'Expo / Swift'],
    codePreview: `const mobileNode = initMobileSync({
  storage: 'sqlite-encrypted',
  offlineFallback: true,
  biometrics: 'enabled'
});`,
  },
  {
    id: 'saas',
    index: '04 / STACK',
    title: 'SaaS Platforms',
    tagline: 'Multi-tenant cloud products, subscription engines & telemetry dashboards',
    icon: <LayoutDashboard className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Multi-Tenant • 99.99% Uptime',
    deliverables: [
      'Isolated multi-tenant data schemas & security wells',
      'Stripe / Merchant subscription & tiering engines',
      'Self-serve onboarding flows & team workspaces',
      'Automated usage metrics & invoice generation',
    ],
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Stripe API', 'Docker'],
    codePreview: `const saasTenant = await tenantEngine.provision({
  tier: 'enterprise',
  isolation: 'schema-per-tenant',
  billingSync: true
});`,
  },
  {
    id: 'erp-crm',
    index: '05 / STACK',
    title: 'ERP & CRM Systems',
    tagline: 'Custom operational software tailored strictly to your internal business rules',
    icon: <Cpu className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Verified Engine • Zero Bottleneck',
    deliverables: [
      'Bespoke inventory, warehouse & fulfillment tracking',
      'Custom CRM pipeline & lead allocation algorithms',
      'Automated multi-level approval & invoice workflows',
      'Legacy SAP / Oracle database bridges & data cleanup',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'REST / gRPC'],
    codePreview: `const erpWorkflow = compileBusinessRules({
  approvalChain: ['manager', 'finance_vp'],
  auditLog: true,
  legacyBridge: 'sap-rfc-connector'
});`,
  },
  {
    id: 'ai',
    index: '06 / STACK',
    title: 'AI & Automation Solutions',
    tagline: 'Pragmatic LLM integration, automated document triage & smart agentic workflows',
    icon: <Bot className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Agentic Pipeline • Active LLM',
    deliverables: [
      'Document analysis, PDF parsing & automated extraction',
      'Custom RAG vector search & knowledge bases',
      'Automated customer support & triage agent pipelines',
      'Smart load dispatch & decision-support software',
    ],
    stack: ['Python', 'Node.js', 'OpenAI / Anthropic APIs', 'Pinecone / PgVector'],
    codePreview: `const aiPipeline = new AgenticPipeline({
  model: 'claude-3-5-sonnet',
  tools: [vectorSearch, documentParser],
  evalGuardrails: true
});`,
  },
];

export const ProductStackSection: React.FC = () => {
  const scrollToInquiry = () => {
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="product-stack" className="py-24 border-b border-mc-border bg-mc-bg relative">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16"
        >
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>03 / WHAT WE BUILD</span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-mc-text-strong tracking-tight mb-4">
              PRODUCT STACK & SERVICES
            </h2>
            <p className="text-mc-text-body text-base md:text-lg max-w-2xl leading-relaxed">
              Scroll down or swipe to stack our custom software engineering pillars. Each card highlights deliverables, stack technologies, and production code architecture.
            </p>
          </div>
        </motion.div>

        {/* Sticky Stacking Cards Container */}
        <div className="space-y-12 pb-16 relative">
          {STACK_ITEMS.map((item, index) => (
            <div
              key={item.id}
              style={{
                // Sticky top position offsets each card slightly as user scrolls
                top: `calc(88px + ${index * 16}px)`,
              }}
              className="sticky z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  'rounded-xl border border-mc-border bg-mc-surface p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl',
                  'transition-all duration-300 hover:border-mc-border-strong',
                  'relative overflow-hidden'
                )}
              >
                {/* Top Architectural Rail */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-mc-border">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-mono text-xs text-mc-orange font-medium px-2.5 py-1 rounded bg-mc-surface-deep border border-mc-border">
                      {item.index}
                    </span>
                    <div className="p-2.5 rounded-md bg-mc-surface-deep border border-mc-border shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-sans font-medium text-mc-text-strong tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* System Green Health Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-mc-surface-deep border border-mc-border font-mono text-[11px] text-mc-text-body">
                    <span className="w-2 h-2 rounded-full bg-mc-system-green animate-pulse" />
                    <span>{item.systemStatus}</span>
                  </div>
                </div>

                {/* Subtitle Tagline */}
                <p className="text-base sm:text-lg font-sans text-mc-text-strong font-medium mb-8 max-w-3xl">
                  {item.tagline}
                </p>

                {/* Main Content Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                  {/* Left Column: Deliverables & Tech Stack */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h4 className="font-mono text-xs text-mc-orange uppercase tracking-wider mb-3">
                        CORE ENGINEERING DELIVERABLES:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.deliverables.map((del, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-lg bg-mc-surface-deep border border-mc-border-soft flex items-start gap-2.5 text-xs font-sans text-mc-text-body"
                          >
                            <CheckCircle2 className="w-4 h-4 text-mc-system-green shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div>
                      <h4 className="font-mono text-xs text-mc-text-tertiary uppercase tracking-wider mb-2">
                        TECHNOLOGY STACK:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.stack.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-md bg-mc-surface-deep border border-mc-border font-mono text-xs text-mc-text-secondary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Code Terminal Preview */}
                  <div className="lg:col-span-5 rounded-lg border border-mc-border bg-mc-surface-deep overflow-hidden shadow-inner">
                    <div className="px-4 py-2.5 bg-mc-surface border-b border-mc-border flex items-center justify-between font-mono text-xs text-mc-text-tertiary">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-mc-orange" />
                        <span>{item.id}-architecture.ts</span>
                      </div>
                      <span className="text-mc-system-green font-medium">Verified</span>
                    </div>
                    <pre className="p-4 font-mono text-xs text-mc-text-body overflow-x-auto leading-relaxed">
                      <code>{item.codePreview}</code>
                    </pre>
                  </div>
                </div>

                {/* Footer Action Rail inside Card */}
                <div className="pt-6 border-t border-mc-border flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-mc-text-tertiary">
                    Target Sprint: 4 – 12 Weeks • 100% IP Handoff
                  </span>
                  <button
                    onClick={scrollToInquiry}
                    className="h-11 px-6 text-xs font-sans font-medium rounded-md bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Inquire About {item.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
