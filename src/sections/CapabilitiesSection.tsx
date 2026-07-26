import React, { useState } from 'react';
import { Globe, Layers, LayoutDashboard, Smartphone, Network, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CapabilityCategory {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  forWho: string;
  deliverables: string[];
  stack: string[];
}

const CAPABILITIES: CapabilityCategory[] = [
  {
    id: 'web',
    index: '01 / 05',
    title: 'Web & Digital Experiences',
    subtitle: 'High-conversion business websites, web applications, and customer portals',
    icon: <Globe className="w-5 h-5" />,
    forWho: 'Businesses replacing slow templates, launching new digital footprints, or needing high-performance web frontends.',
    deliverables: [
      'High-conversion marketing & corporate websites',
      'Interactive customer & vendor portals',
      'Headless CMS & custom frontend architecture',
      'Sub-second page loading & SEO optimization',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite / Next.js', 'GraphQL / REST'],
  },
  {
    id: 'software',
    index: '02 / 05',
    title: 'Custom Software & Platforms',
    subtitle: 'Bespoke business software built around your exact operational workflows',
    icon: <Layers className="w-5 h-5" />,
    forWho: 'Established companies, manufacturers, and service teams replacing fragmented spreadsheets with unified internal software.',
    deliverables: [
      'Operational management platforms',
      'Employee workflow & approval engines',
      'Inventory, logistics & order tracking software',
      'Role-based access & audit-logged systems',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 'saas',
    index: '03 / 05',
    title: 'Product & SaaS Engineering',
    subtitle: 'From initial MVP architecture to high-scale production SaaS platforms',
    icon: <LayoutDashboard className="w-5 h-5" />,
    forWho: 'Founders and product teams building multi-tenant SaaS products, analytics dashboards, and subscription platforms.',
    deliverables: [
      'Multi-tenant SaaS application architecture',
      'Real-time analytics & telemetry dashboards',
      'Billing, subscription & user tiering engines',
      'Automated onboarding & self-serve portals',
    ],
    stack: ['React', 'TypeScript', 'Tailwind v4', 'WebSockets', 'AWS / Cloudflare'],
  },
  {
    id: 'mobile',
    index: '04 / 05',
    title: 'Mobile & Cross-Platform Apps',
    subtitle: 'Native-feel iOS and Android applications for field teams and customers',
    icon: <Smartphone className="w-5 h-5" />,
    forWho: 'Companies needing mobile extensions for field operations, customer engagement, or companion device control.',
    deliverables: [
      'Cross-platform iOS & Android applications',
      'Offline-first data sync & local caching',
      'Push notification & real-time messaging',
      'Hardware & camera API integration',
    ],
    stack: ['React Native', 'TypeScript', 'SQLite', 'Firebase / Supabase'],
  },
  {
    id: 'integrations',
    index: '05 / 05',
    title: 'Systems, Integrations & Automation',
    subtitle: 'Connecting fragmented software, ERPs, CRMs, APIs, and data routes',
    icon: <Network className="w-5 h-5" />,
    forWho: 'Businesses struggling with disconnected software tools, manual data entry, or legacy database systems.',
    deliverables: [
      'Custom REST & GraphQL API gateway development',
      'ERP (SAP/NetSuite) & CRM (Salesforce/HubSpot) bridges',
      'Automated webhook & queue processing pipelines',
      'AI & LLM workflow integration',
    ],
    stack: ['Node.js', 'Python', 'Kafka / RabbitMQ', 'PostgreSQL', 'OpenAI / Anthropic APIs'],
  },
];

export const CapabilitiesSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(CAPABILITIES[0].id);

  const activeCap = CAPABILITIES.find((c) => c.id === activeId) || CAPABILITIES[0];

  return (
    <section id="capabilities" className="py-24 border-b border-mc-border">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Grammar Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>02 / CAPABILITY ARCHITECTURE</span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-mc-text-strong tracking-tight mb-4">
              WHAT WE ENGINEER FOR YOUR BUSINESS
            </h2>
            <p className="text-mc-text-body text-base max-w-2xl">
              We translate complex business requirements into high-performance software systems. Select a capability pillar to explore architecture deliverables and engineering stacks.
            </p>
          </div>
        </div>

        {/* Interactive Capability Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Navigation Rail */}
          <div className="lg:col-span-5 space-y-3">
            {CAPABILITIES.map((cap) => {
              const isActive = cap.id === activeId;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveId(cap.id)}
                  className={cn(
                    'w-full text-left p-5 rounded-lg border transition-all duration-200 flex items-start justify-between group',
                    isActive
                      ? 'bg-mc-surface border-mc-orange shadow-lg'
                      : 'bg-mc-surface-deep/60 border-mc-border hover:bg-mc-surface hover:border-mc-border-strong'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'p-2.5 rounded-md transition-colors mt-0.5',
                        isActive
                          ? 'bg-mc-orange text-mc-bg'
                          : 'bg-mc-surface border border-mc-border text-mc-text-secondary group-hover:text-mc-text'
                      )}
                    >
                      {cap.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[11px] text-mc-text-tertiary mb-1">
                        {cap.index}
                      </div>
                      <div
                        className={cn(
                          'font-sans font-medium text-base transition-colors',
                          isActive ? 'text-mc-text-strong' : 'text-mc-text-body group-hover:text-mc-text-strong'
                        )}
                      >
                        {cap.title}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={cn(
                      'w-4 h-4 mt-2 transition-transform duration-200',
                      isActive ? 'text-mc-orange translate-x-1' : 'text-mc-text-tertiary opacity-0 group-hover:opacity-100'
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Capability Architectural Dossier */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-lg border border-mc-border bg-mc-surface flex flex-col justify-between shadow-xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-mc-border">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-md bg-mc-orange-10 border border-mc-orange text-mc-orange">
                    {activeCap.icon}
                  </div>
                  <div>
                    <span className="font-mono text-xs text-mc-orange uppercase">{activeCap.index}</span>
                    <h3 className="text-2xl font-sans font-medium text-mc-text-strong">
                      {activeCap.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Subtitle & Target Visitor */}
              <p className="text-mc-text-strong font-medium text-base mb-4">
                {activeCap.subtitle}
              </p>
              <div className="p-4 rounded-md bg-mc-surface-deep border border-mc-border text-xs font-sans text-mc-text-body mb-6">
                <span className="font-mono text-mc-orange uppercase block mb-1">Target Context:</span>
                {activeCap.forWho}
              </div>

              {/* Deliverables List */}
              <div className="space-y-3 mb-8">
                <h4 className="font-mono text-xs text-mc-text-secondary uppercase">
                  ENGINEERING DELIVERABLES:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCap.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded bg-mc-surface-deep/80 border border-mc-border-soft flex items-start gap-2.5 text-xs text-mc-text"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-mc-orange mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Stack Rail */}
            <div className="pt-6 border-t border-mc-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-mc-text-tertiary mr-2">TECH STACK:</span>
                {activeCap.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-mc-surface-deep border border-mc-border font-mono text-[11px] text-mc-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href="#inquiry"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-mc-orange hover:underline"
              >
                Inquire about this capability →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
