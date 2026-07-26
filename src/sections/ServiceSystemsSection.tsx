import React from 'react';
import { Cpu, Server, Lock, Bot, Code, RefreshCw } from 'lucide-react';

interface ServiceItem {
  index: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  capabilities: string[];
}

const SERVICES: ServiceItem[] = [
  {
    index: 'SYS.01',
    title: 'Custom Web Applications',
    icon: <Server className="w-5 h-5" />,
    description: 'Bespoke web applications built for heavy user traffic, high concurrency, and complex business logic.',
    capabilities: ['Dynamic Web Apps', 'Real-time Dashboards', 'Headless Frontends', 'Sub-second API Speeds'],
  },
  {
    index: 'SYS.02',
    title: 'ERP & CRM Systems',
    icon: <Cpu className="w-5 h-5" />,
    description: 'Tailored enterprise resource planning and customer relationship tools aligned with your exact operational rules.',
    capabilities: ['Custom ERP Engines', 'CRM & Pipeline Trackers', 'Inventory & Warehouse Systems', 'Order Fulfillment Rules'],
  },
  {
    index: 'SYS.03',
    title: 'Customer & Vendor Portals',
    icon: <Lock className="w-5 h-5" />,
    description: 'Secure multi-role portals empowering customers, vendors, and employees with self-serve access.',
    capabilities: ['Multi-Role Permissions', 'Document & Billing Vaults', 'Audit-Logged Workflows', 'Single Sign-On (SSO)'],
  },
  {
    index: 'SYS.04',
    title: 'AI & Automation Solutions',
    icon: <Bot className="w-5 h-5" />,
    description: 'Pragmatic artificial intelligence integration to automate repetitive manual tasks and speed up decisions.',
    capabilities: ['Document Analysis LLMs', 'Automated Triage Pipelines', 'Smart Load Dispatch', 'Custom Agentic Workflows'],
  },
  {
    index: 'SYS.05',
    title: 'APIs & System Integrations',
    icon: <Code className="w-5 h-5" />,
    description: 'Connecting fragmented software systems, legacy databases, and third-party SaaS tools into unified data pipelines.',
    capabilities: ['Custom REST/GraphQL APIs', 'Legacy SAP/Oracle Bridges', 'Webhook Queues & Workers', 'Real-time Event Streaming'],
  },
  {
    index: 'SYS.06',
    title: 'Software Modernization',
    icon: <RefreshCw className="w-5 h-5" />,
    description: 'Refactoring outdated codebases, migrating legacy databases to modern cloud stacks with zero downtime.',
    capabilities: ['Legacy Code Refactoring', 'Cloud Migration (AWS/Cloudflare)', 'Database Schema Optimization', 'Security Hardening'],
  },
];

export const ServiceSystemsSection: React.FC = () => {
  return (
    <section id="services" className="py-24 border-b border-mc-border">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>04 / SERVICE SYSTEMS</span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-mc-text-strong tracking-tight mb-4">
              SPECIALIZED SOFTWARE ENGINEERING DOMAINS
            </h2>
            <p className="text-mc-text-body text-base max-w-2xl">
              We focus exclusively on software domains where architecture, performance, security, and user experience directly impact business profitability.
            </p>
          </div>
        </div>

        {/* 6-Grid Structured Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.index}
              className="p-6 md:p-8 rounded-lg border border-mc-border bg-mc-surface hover:border-mc-border-strong hover:bg-mc-surface-hover transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-mc-orange">{service.index}</span>
                  <div className="p-2 rounded bg-mc-surface-deep border border-mc-border text-mc-text-secondary group-hover:text-mc-orange transition-colors">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-xl font-sans font-medium text-mc-text-strong mb-3">
                  {service.title}
                </h3>
                <p className="text-sm font-sans text-mc-text-body leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-mc-border-soft space-y-2">
                {service.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-xs font-mono text-mc-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-mc-orange shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
