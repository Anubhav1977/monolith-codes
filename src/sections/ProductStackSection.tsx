import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Server,
  Smartphone,
  LayoutDashboard,
  Cpu,
  Bot,
  ArrowRight,
  Zap,
  RefreshCw,
  ShieldCheck,
  Layers,
  Lock,
  Database,
  Activity,
  Box,
  ArrowUpRight,
  Upload,
  Brain,
  GitFork,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StackFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StackItem {
  id: string;
  index: string;
  titleMain: string;
  titleOrange: string;
  fullTitle: string;
  tagline: string;
  icon: React.ReactNode;
  systemStatus: string;
  image: string;
  features: StackFeature[];
  isFlow?: boolean;
  stackItems: string[];
}

const STACK_ITEMS: StackItem[] = [
  {
    id: 'web',
    index: '01 / STACK',
    titleMain: 'WEB',
    titleOrange: 'EXPERIENCES',
    fullTitle: 'Web Experiences',
    tagline: 'High-conversion marketing engines, sub-second landing pages & bespoke digital frontends.',
    icon: <Globe className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Verified Engine • Sub-200ms TBT',
    image: '/assets/images/services/Modern web Experience.png',
    features: [
      {
        icon: <Zap className="w-4 h-4" />,
        title: 'Sub-second Paint',
        description: 'Optimal Core Web Vitals & ultra-fast LCP',
      },
      {
        icon: <Layers className="w-4 h-4" />,
        title: 'Headless CMS',
        description: 'Custom component library & architecture',
      },
      {
        icon: <ShieldCheck className="w-4 h-4" />,
        title: 'SEO & OG Engine',
        description: 'Structured semantic HTML & dynamic meta',
      },
      {
        icon: <RefreshCw className="w-4 h-4" />,
        title: '3D & Motion',
        description: 'WebGL Monolith Field & fluid animations',
      },
    ],
    stackItems: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite / Next.js', 'Framer Motion'],
  },
  {
    id: 'web-apps',
    index: '02 / STACK',
    titleMain: 'WEB',
    titleOrange: 'APPLICATIONS',
    fullTitle: 'Web Applications',
    tagline: 'Bespoke web platforms engineered for high traffic, real-time data & complex logic.',
    icon: <Server className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Active Queue • Real-time Sync',
    image: '/assets/images/services/complex web applications.png',
    features: [
      {
        icon: <Zap className="w-4 h-4" />,
        title: 'High Performance',
        description: 'Optimized for speed and reliability',
      },
      {
        icon: <RefreshCw className="w-4 h-4" />,
        title: 'Real-time Sync',
        description: 'Active queues and live data updates',
      },
      {
        icon: <Lock className="w-4 h-4" />,
        title: 'Secure by Design',
        description: 'Built with security from the ground up',
      },
      {
        icon: <Layers className="w-4 h-4" />,
        title: 'Scalable Architecture',
        description: 'Ready to grow with your business',
      },
    ],
    stackItems: ['Next.js / React', 'TypeScript', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
  },
  {
    id: 'mobile',
    index: '03 / STACK',
    titleMain: 'MOBILE',
    titleOrange: 'APPLICATIONS',
    fullTitle: 'Mobile Applications',
    tagline: 'Native-feel iOS & Android mobile platforms for field teams and customer access.',
    icon: <Smartphone className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Cross-Platform • 60 FPS',
    image: '/assets/images/services/Mobile Application System.png',
    features: [
      {
        icon: <Smartphone className="w-4 h-4" />,
        title: '60 FPS Native UI',
        description: 'Smooth animations on iOS & Android',
      },
      {
        icon: <Database className="w-4 h-4" />,
        title: 'Offline Sync',
        description: 'Local SQLite storage & conflict resolution',
      },
      {
        icon: <Lock className="w-4 h-4" />,
        title: 'Biometric Auth',
        description: 'FaceID/TouchID & native push alerts',
      },
      {
        icon: <Cpu className="w-4 h-4" />,
        title: 'Hardware Access',
        description: 'Bluetooth, Camera & GPS integration',
      },
    ],
    stackItems: ['React Native', 'TypeScript', 'SQLite', 'Expo / Swift', 'Tailwind CSS'],
  },
  {
    id: 'saas',
    index: '04 / STACK',
    titleMain: 'SAAS',
    titleOrange: 'PLATFORMS',
    fullTitle: 'SaaS Platforms',
    tagline: 'Multi-tenant cloud products, subscription engines & telemetry dashboards.',
    icon: <LayoutDashboard className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Multi-Tenant • 99.99% Uptime',
    image: '/assets/images/services/Saas platform.png',
    features: [
      {
        icon: <Layers className="w-4 h-4" />,
        title: 'Multi-Tenant Data',
        description: 'Isolated schemas & strict data security',
      },
      {
        icon: <Zap className="w-4 h-4" />,
        title: 'Stripe Billing',
        description: 'Subscription tiers & merchant engines',
      },
      {
        icon: <ShieldCheck className="w-4 h-4" />,
        title: 'Self-Serve Flows',
        description: 'Team workspaces & RBAC permissions',
      },
      {
        icon: <Activity className="w-4 h-4" />,
        title: 'Usage Telemetry',
        description: 'Automated metrics & invoice generation',
      },
    ],
    stackItems: ['React / Next.js', 'TypeScript', 'PostgreSQL', 'Stripe API', 'Docker'],
  },
  {
    id: 'erp-crm',
    index: '05 / STACK',
    titleMain: 'ERP & CRM',
    titleOrange: 'SYSTEMS',
    fullTitle: 'ERP & CRM Systems',
    tagline: 'Custom operational software tailored strictly to your internal business rules.',
    icon: <Cpu className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Verified Engine • Zero Bottleneck',
    image: '/assets/images/services/ERP systems.png',
    features: [
      {
        icon: <Box className="w-4 h-4" />,
        title: 'Inventory & Ops',
        description: 'Custom warehouse & fulfillment logic',
      },
      {
        icon: <Activity className="w-4 h-4" />,
        title: 'CRM Pipelines',
        description: 'Lead allocation & sales automation',
      },
      {
        icon: <ShieldCheck className="w-4 h-4" />,
        title: 'Approvals Engine',
        description: 'Multi-level financial approval chains',
      },
      {
        icon: <RefreshCw className="w-4 h-4" />,
        title: 'Legacy Bridges',
        description: 'Oracle / SAP connectors & cleanup',
      },
    ],
    stackItems: ['React', 'Node.js', 'PostgreSQL', 'REST / gRPC', 'Tailwind CSS'],
  },
  {
    id: 'ai',
    index: '06 / STACK',
    titleMain: 'AI & AUTOMATION',
    titleOrange: 'SOLUTIONS',
    fullTitle: 'AI & Automation',
    tagline: 'Pragmatic LLM integration, automated document triage & smart agentic workflows.',
    icon: <Bot className="w-5 h-5 text-mc-orange" />,
    systemStatus: 'Agentic Pipeline • Active LLM',
    image: '/assets/images/services/AI and Business Automation.png',
    isFlow: true,
    features: [
      {
        icon: <Upload className="w-4 h-4" />,
        title: 'Ingest',
        description: 'Documents, emails, files & requests',
      },
      {
        icon: <Brain className="w-4 h-4" />,
        title: 'Understand',
        description: 'Parse, classify & extract intelligence',
      },
      {
        icon: <GitFork className="w-4 h-4" />,
        title: 'Decide',
        description: 'AI reasoning with business rules',
      },
      {
        icon: <Zap className="w-4 h-4" />,
        title: 'Act',
        description: 'Automate, notify & update systems',
      },
    ],
    stackItems: ['Python', 'Node.js', 'OpenAI / Anthropic APIs', 'Pinecone / PgVector'],
  },
];

export const ProductStackSection: React.FC = () => {
  const scrollToInquiry = () => {
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProcess = () => {
    document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="space-y-24 sm:space-y-32 lg:space-y-40 pb-14 relative">
          {STACK_ITEMS.map((item, index) => (
            <div
              key={item.id}
              style={{
                top: `calc(72px + ${index * 12}px)`,
              }}
              className="sticky z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className={cn(
                  'rounded-2xl border border-mc-border/80 bg-mc-surface/95 p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl',
                  'transition-all duration-300 hover:border-mc-orange/40',
                  'relative overflow-hidden group'
                )}
              >
                {/* 4 Corner Accent Reticles */}
                <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-mc-orange/70 pointer-events-none" />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-mc-orange/70 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-mc-orange/70 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-mc-orange/70 pointer-events-none" />

                {/* 3-Column Main Content Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: Index, Split Title, Subtitle, Features & Sprint Footer */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Index Badge */}
                      <div className="font-mono text-xs text-mc-orange tracking-wider font-semibold mb-3">
                        {item.index}
                      </div>

                      {/* Split Two-Toned Headline */}
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight uppercase leading-[0.95] mb-4">
                        <span className="text-mc-text-strong block">{item.titleMain}</span>
                        <span className="text-mc-orange block">{item.titleOrange}</span>
                      </h3>

                      {/* Subtitle Tagline */}
                      <p className="text-sm sm:text-base font-sans text-mc-text-body leading-relaxed max-w-md">
                        {item.tagline}
                      </p>
                    </div>

                    {/* Features Row / Pipeline Flow */}
                    <div className="pt-2">
                      {item.isFlow ? (
                        <div className="grid grid-cols-4 gap-2 items-start relative">
                          {item.features.map((feat, idx) => (
                            <div key={idx} className="space-y-1.5 text-left relative group/step">
                              <div className="flex items-center gap-1.5">
                                <div className="p-2 rounded-lg bg-mc-surface-deep border border-mc-border text-mc-orange shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.15)]">
                                  {feat.icon}
                                </div>
                                {idx < item.features.length - 1 && (
                                  <ArrowRight className="w-3.5 h-3.5 text-mc-text-tertiary shrink-0 hidden sm:block" />
                                )}
                              </div>
                              <h5 className="font-sans text-xs font-semibold text-mc-text-strong leading-snug">
                                {feat.title}
                              </h5>
                              <p className="font-sans text-[11px] text-mc-text-tertiary leading-tight line-clamp-2">
                                {feat.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {item.features.map((feat, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <div className="p-2 w-fit rounded-lg bg-mc-surface-deep border border-mc-border text-mc-orange shadow-[0_0_10px_rgba(249,115,22,0.12)]">
                                {feat.icon}
                              </div>
                              <h5 className="font-sans text-xs font-semibold text-mc-text-strong leading-snug">
                                {feat.title}
                              </h5>
                              <p className="font-sans text-[11px] text-mc-text-tertiary leading-tight line-clamp-2">
                                {feat.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Left Bottom Target Sprint / Ownership Metadata */}
                    <div className="pt-6 border-t border-mc-border/60 flex items-center gap-6 font-mono text-[11px] uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <span className="text-mc-text-tertiary">TARGET SPRINT</span>
                        <span className="text-mc-text-strong font-semibold">4 – 12 WEEKS</span>
                      </div>
                      <span className="text-mc-border">|</span>
                      <div className="flex items-center gap-2">
                        <span className="text-mc-text-tertiary">OWNERSHIP</span>
                        <span className="text-mc-text-strong font-semibold">100% IP HANDOFF</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Service Preview Mockup Image */}
                  <div className="lg:col-span-4 flex items-center justify-center py-2 relative">
                    <div className="relative w-full max-w-[460px] flex items-center justify-center group/img">
                      <img
                        src={item.image}
                        alt={item.fullTitle}
                        className="w-full h-auto max-h-[300px] object-contain transition-transform duration-500 group-hover/img:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
                      />
                    </div>
                  </div>

                  {/* Right Column: Status Badge, Engineering Stack & Action Link */}
                  <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
                    {/* Status Pill Badge (Top Right) */}
                    <div className="flex items-center justify-start lg:justify-end">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-mc-surface-deep/80 border border-mc-border font-mono text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-mc-system-green animate-pulse" />
                        <span className="text-mc-text-secondary">{item.systemStatus}</span>
                      </div>
                    </div>

                    {/* Stack Code Box */}
                    <div className="space-y-2">
                      <div className="font-mono text-[11px] text-mc-text-tertiary uppercase tracking-wider font-medium px-0.5">
                        ENGINEERING STACK
                      </div>
                      <div className="rounded-xl border border-mc-border/80 bg-mc-surface-deep/90 p-4 space-y-3 shadow-inner backdrop-blur-md">
                        <div className="flex items-center justify-between font-mono text-xs pb-2.5 border-b border-mc-border/60">
                          <span className="text-mc-text-tertiary">stack.{item.id}.ts</span>
                          <span className="text-mc-system-green font-medium">Verified</span>
                        </div>

                        {/* Tech Stack List Items with Orange Diamond Bullet */}
                        <div className="space-y-2.5">
                          {item.stackItems.map((tech, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded bg-mc-surface border border-mc-orange/30 flex items-center justify-center shrink-0 text-mc-orange shadow-[0_0_8px_rgba(249,115,22,0.2)]">
                                <span className="w-1.5 h-1.5 rotate-45 bg-mc-orange rounded-[1px]" />
                              </div>
                              <span className="text-mc-text-strong text-xs font-sans font-semibold">
                                {tech}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Bottom Action Link */}
                    <div className="pt-2 flex justify-start lg:justify-end">
                      <button
                        onClick={scrollToInquiry}
                        className="group inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-medium text-mc-text-strong hover:text-mc-orange transition-colors cursor-pointer"
                      >
                        <span>Inquire About {item.fullTitle}</span>
                        <ArrowRight className="w-4 h-4 text-mc-orange transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Process Link Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-mc-border bg-mc-surface p-5 sm:p-6 backdrop-blur-xl shadow-xl hover:border-mc-border-strong transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-mc-surface-deep border border-mc-border text-mc-orange shrink-0">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-sans text-mc-text-body">
                Every solution is engineered from scratch — no templates, no shortcuts.
              </p>
              <p className="text-sm sm:text-base font-sans font-medium text-mc-orange mt-0.5">
                Just software that works the way your business works.
              </p>
            </div>
          </div>

          <button
            onClick={scrollToProcess}
            className="h-10 px-5 text-xs sm:text-sm font-sans font-medium rounded-md bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
          >
            <span>Explore Our Process</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};



