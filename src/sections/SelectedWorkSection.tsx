import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollStage, SectionSpotlight } from '@/components/ScrollStage';

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
  /** Project picture, e.g. '/assets/work/erp.jpg'. Falls back to a gradient if omitted. */
  image?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'niketana-furniture',
    index: 'CASE / 01',
    category: 'CORPORATE WEBSITE & E-COMMERCE',
    title: 'Niketana Modular Furniture Website',
    clientContext: 'Niketana Furniture',
    problem: '',
    solution: 'A modern and premium website designed for Niketana Furniture, showcasing modular office furniture, workstations, and workspace solutions. Features an elegant UI, product categories, interactive project galleries, custom enquiry functionality, and a responsive browsing experience tailored for businesses.',
    metrics: [],
    stack: ['React.js', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Cloudinary', 'REST API', 'Vercel'],
    image: '/assets/work/niketana.webp',
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
      { label: 'Concurrency', value: '10k/sec' },
      { label: 'Latency', value: '18ms' },
      { label: 'Uptime', value: '99.99%' },
    ],
    stack: ['React', 'WebSockets', 'Tailwind v4', 'Node.js Gateway', 'TimescaleDB'],
  },
  {
    id: 'estatepro-app',
    index: 'CASE / 03',
    category: 'MOBILE APP & REAL ESTATE',
    title: 'EstatePro Real Estate Mobile App',
    clientContext: 'EstatePro',
    problem: '',
    solution: 'A modern real estate mobile application UI designed to simplify property buying, renting, and investment. Features include premium property listings, advanced search filters, detailed property views, virtual tours, AI-powered property recommendations, and investment tools, delivering a seamless property discovery experience.',
    metrics: [],
    stack: ['React Native', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Firebase Auth'],
    image: '/assets/work/estatepro.webp',
  },
  {
    id: 'renteasee',
    index: 'CASE / 04',
    category: 'RENTAL PLATFORM & REAL ESTATE',
    title: 'RentEasee Rental Property Platform',
    clientContext: 'RentEasee',
    problem: '',
    solution: 'A modern rental property platform designed to simplify the process of finding and renting homes. Features verified property listings, advanced search filters, tenant and owner dashboards, zero-brokerage options, direct owner communication, property management, and digital rental support with a seamless user experience.',
    metrics: [],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'JWT Auth', 'Tailwind CSS', 'Vercel'],
    image: '/assets/work/renteasee.webp',
  },
  {
    id: 'hartwell-3d',
    index: 'CASE / 05',
    category: 'REAL ESTATE & 3D EXPERIENCE',
    title: 'Immersive 3D Real Estate Website',
    clientContext: 'Hartwell & Co.',
    problem: '',
    solution: 'An immersive 3D real estate website featuring interactive property visualization, modern architectural design, and elegant UI/UX. Built to deliver a premium property browsing experience with detailed layouts, lifestyle-focused sections, and smooth navigation.',
    metrics: [],
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    image: '/assets/work/hartwell.webp',
  },
];

const GRADIENTS = [
  'from-[#3b1d0a] via-[#7a3410] to-[#ff6b00]',
  'from-[#0b1f2a] via-[#124a63] to-[#2bb4d6]',
  'from-[#1a1330] via-[#3d2a78] to-[#d97757]',
  'from-[#0d2418] via-[#1f6b45] to-[#ffb066]',
  'from-[#2a0f1a] via-[#7a2342] to-[#ff8a1f]',
];

const CARD_W = 290;

export const SelectedWorkSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const [spacing, setSpacing] = useState(250);
  const total = CASE_STUDIES.length;

  useEffect(() => {
    const onResize = () => setSpacing(window.innerWidth < 640 ? 185 : window.innerWidth < 1024 ? 230 : 270);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Auto-advance: cards travel left -> right
  useEffect(() => {
    if (paused || open) return;
    const t = window.setInterval(() => setActive((a) => (a - 1 + total) % total), 4200);
    return () => window.clearInterval(t);
  }, [paused, open, total]);

  // Esc closes the expanded view, page scroll locked while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + total) % total);
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % total);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, total]);

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  return (
    <section id="work" className="relative overflow-hidden py-14 md:py-16 bg-mc-surface-deep/40 border-b border-mc-border">
      <SectionSpotlight />
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="vt-head grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>04 / SELECTED WORK & PROOF</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="text-2xl md:text-4xl font-sans font-medium text-mc-text-strong tracking-tight mb-2">
              ENGINEERING PROOF IN PRODUCTION
            </h2>
            <p className="text-mc-text-body text-sm md:text-base max-w-2xl">
              Visual evidence of custom software systems, platforms, and applications we have designed and built for serious business operations.
            </p>
          </div>
        </div>

        <ScrollStage>
          <div
            className="relative mx-auto h-[540px] select-none"
            style={{ perspective: 1400 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {CASE_STUDIES.map((item, i) => {
              let o = i - active;
              if (o > total / 2) o -= total;
              if (o < -total / 2) o += total;
              const abs = Math.abs(o);
              const isActive = o === 0;
              return (
                <motion.article
                  key={item.id}
                  onClick={() => (isActive ? setOpen(true) : setActive(i))}
                  whileHover={isActive ? { y: -14 } : undefined}
                  initial={false}
                  animate={{
                    x: o * spacing,
                    y: abs * abs * 14,
                    scale: 1 - abs * 0.1,
                    rotateY: -o * 16,
                    opacity: abs > 2 ? 0 : 1 - abs * 0.18,
                  }}
                  transition={{ type: 'spring', stiffness: 130, damping: 20 }}
                  style={{ zIndex: 10 - abs, left: '50%', marginLeft: -CARD_W / 2, width: CARD_W, transformStyle: 'preserve-3d' }}
                  className={cn(
                    'absolute top-0 rounded-[22px] bg-mc-surface border border-mc-border text-mc-text overflow-hidden shadow-[0_30px_70px_-20px_rgba(0,0,0,.75)]',
                    'cursor-pointer',
                    abs > 2 && 'pointer-events-none'
                  )}
                >
                  <div className={cn('relative h-[150px] overflow-hidden border-b border-mc-border bg-gradient-to-br', GRADIENTS[i % GRADIENTS.length])}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center font-mono text-5xl font-semibold text-white/25">
                        {item.index.split('/ ')[1]}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="truncate font-mono text-[10px] uppercase tracking-wide text-mc-orange">
                      {item.index} • {item.category}
                    </div>
                    <h3 className="mt-1.5 font-sans text-[18px] font-medium leading-[1.25] tracking-tight text-mc-text-strong line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="mt-1 font-mono text-[11px] text-mc-text-tertiary">Client: {item.clientContext}</div>

                    <h4 className="mt-3 font-mono text-[10px] uppercase text-mc-orange">About the project:</h4>
                    <p className="mt-1 font-sans text-[12px] leading-snug text-mc-text-body line-clamp-2">{item.solution}</p>

                    <h4 className="mt-3 font-mono text-[10px] uppercase text-mc-text-secondary">Technology stack:</h4>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {item.stack.slice(0, 5).map((s) => (
                        <span key={s} className="rounded bg-mc-surface-deep border border-mc-border px-2 py-0.5 font-mono text-[10px] text-mc-text-secondary">
                          {s}
                        </span>
                      ))}
                      {item.stack.length > 5 && (
                        <span className="rounded border border-mc-border px-2 py-0.5 font-mono text-[10px] text-mc-orange">+{item.stack.length - 5}</span>
                      )}
                    </div>

                    <a
                      href="#inquiry"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-[6px] border border-mc-border bg-mc-surface-deep font-sans text-[13px] font-medium text-mc-text-strong hover:border-mc-orange hover:text-mc-orange transition-colors"
                    >
                      <span>Request Similar Architecture</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              onClick={prev}
              aria-label="Previous project"
              className="grid h-10 w-10 place-items-center rounded-full border border-mc-border bg-mc-surface text-mc-text hover:border-mc-orange hover:text-mc-orange transition-all cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {CASE_STUDIES.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={cn('h-2 rounded-full transition-all cursor-pointer', i === active ? 'w-6 bg-mc-orange' : 'w-2 bg-mc-border-strong')}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next project"
              className="grid h-10 w-10 place-items-center rounded-full border border-mc-border bg-mc-surface text-mc-text hover:border-mc-orange hover:text-mc-orange transition-all cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </ScrollStage>
      </div>

      <AnimatePresence>
        {open && (() => {
          const c = CASE_STUDIES[active];
          return (
            <motion.div
              key="work-modal"
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={c.title}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 60, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 160, damping: 22 }}
                className="relative grid w-full max-w-[1100px] max-h-[90vh] overflow-y-auto rounded-[28px] bg-mc-surface border border-mc-border shadow-[0_40px_120px_-20px_rgba(0,0,0,.8)] lg:grid-cols-[1.15fr_1fr]"
              >
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white hover:bg-mc-orange transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className={cn('relative min-h-[260px] lg:min-h-[520px] bg-gradient-to-br', GRADIENTS[active % GRADIENTS.length])}>
                  {c.image ? (
                    <img src={c.image} alt={c.title} decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center font-mono text-7xl font-semibold text-white/25">
                      {c.index.split('/ ')[1]}
                    </span>
                  )}
                </div>

                <div className="flex flex-col p-7 md:p-10">
                  <div className="font-mono text-xs uppercase text-mc-orange">{c.index} • {c.category}</div>
                  <h3 className="mt-3 text-2xl md:text-3xl font-sans font-medium text-mc-text-strong leading-tight">{c.title}</h3>
                  <div className="mt-2 font-mono text-xs text-mc-text-tertiary">Client: {c.clientContext}</div>

                  <h4 className="mt-7 font-mono text-xs uppercase text-mc-orange">About the project</h4>
                  <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-mc-text-body">{c.solution}</p>

                  {c.problem && (
                    <>
                      <h4 className="mt-6 font-mono text-xs uppercase text-mc-orange">The challenge</h4>
                      <p className="mt-2 text-sm leading-relaxed text-mc-text-body">{c.problem}</p>
                    </>
                  )}

                  {c.metrics.length > 0 && (
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {c.metrics.map((m) => (
                        <div key={m.label} className="rounded border border-mc-border bg-mc-surface-deep p-3">
                          <div className="font-mono text-[10px] uppercase text-mc-text-tertiary">{m.label}</div>
                          <div className="font-mono text-lg font-semibold text-mc-orange">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <h4 className="mt-6 font-mono text-xs uppercase text-mc-text-secondary">Tech stack</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {c.stack.map((t) => (
                      <span key={t} className="rounded bg-mc-surface-deep border border-mc-border px-2.5 py-1 font-mono text-[11px] text-mc-text-secondary">{t}</span>
                    ))}
                  </div>

                  <a
                    href="#inquiry"
                    onClick={() => setOpen(false)}
                    className="mt-8 flex h-12 items-center justify-center gap-2 rounded-md bg-mc-orange text-sm font-medium text-black hover:opacity-90 transition-opacity"
                  >
                    <span>Request Similar Architecture</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};
