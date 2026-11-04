import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SectionSpotlight } from '@/components/ScrollStage';

interface Testimonial {
  id: string;
  quote: string;
  company: string;
  tagline: string;
  tone: 'warm' | 'cool';
  /** Pile (stacked) pose */
  pile: { x: number; y: number; r: number };
}

const CARD_H = 440;
const MH = 380; // card height on phones/tablets
const MG = 16; // gap between cards on phones/tablets

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'niketana',
    quote:
      '“Monolith Codes rebuilt our entire online presence from scratch. The site finally feels as premium as our furniture, and the custom enquiry flow has brought in far more serious business leads than our old website ever did.”',
    company: 'Niketana',
    tagline: 'Modular Furniture Systems',
    tone: 'warm',
    pile: { x: -70, y: 70, r: -8 },
  },
  {
    id: 'fintech',
    quote:
      '“Our dashboard used to freeze at market open. The new telemetry pipeline handles thousands of live updates without a hiccup, and the team communicated clearly through every sprint.”',
    company: 'Fintech Startup',
    tagline: 'Financial Telemetry & Billing',
    tone: 'cool',
    pile: { x: 0, y: 0, r: 2 },
  },
  {
    id: 'estatepro',
    quote:
      '“They turned a rough idea into a polished mobile app. The property search, virtual tours and recommendations feel effortless — our early users keep praising how smooth the experience is.”',
    company: 'EstatePro',
    tagline: 'Real Estate Mobile App',
    tone: 'warm',
    pile: { x: 70, y: 40, r: 7 },
  },
  {
    id: 'renteasee',
    quote:
      '“RentEasee needed a platform that owners and tenants would both actually enjoy using. Monolith delivered dashboards, verified listings and direct owner contact exactly as we pictured — on time and rock solid.”',
    company: 'RentEasee',
    tagline: 'Rental Property Platform',
    tone: 'cool',
    pile: { x: -40, y: 150, r: -5 },
  },
  {
    id: 'hartwell',
    quote:
      '“The interactive 3D property experience set us apart overnight. Clients stay longer, explore every room and come to consultations already in love with the homes. Truly a premium result.”',
    company: 'Hartwell & Co.',
    tagline: 'Luxury Real Estate',
    tone: 'warm',
    pile: { x: 50, y: 170, r: 10 },
  },
];

const QuoteMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 48 36" aria-hidden="true" className={className} fill="currentColor">
    <path d="M0 36V21.6C0 9.6 6.8 2.4 19.2 0l2.4 5.4C14.4 7.2 11.4 11.4 11.4 16.2H21V36H0Zm27 0V21.6C27 9.6 33.8 2.4 46.2 0l2.4 5.4C41.4 7.2 38.4 11.4 38.4 16.2H48V36H27Z" />
  </svg>
);

const CardBody: React.FC<{ t: Testimonial; compact?: boolean }> = ({ t, compact }) => (
  <>
    <QuoteMark className="h-8 w-10 text-mc-orange/70" />
    <p className={cn('mt-6 font-sans leading-[1.55] text-mc-text-strong', compact ? 'text-[15px]' : 'mt-7 text-[17px]')}>{t.quote}</p>
    <div className="mt-auto pt-6">
      <div className="h-px w-16 bg-mc-orange/50" />
      <div className="mt-4 font-sans text-2xl font-semibold tracking-tight text-mc-text-strong">{t.company}</div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-mc-text-tertiary">{t.tagline}</div>
    </div>
  </>
);

const toneClass = (tone: Testimonial['tone']) =>
  tone === 'warm'
    ? 'bg-[#1d1611] border-[#ff6b00]/20'
    : 'bg-[#13191d] border-[#7fb3c8]/20';

export const TestimonialsSection: React.FC = () => {
  const [spread, setSpread] = useState(false);
  const [wide, setWide] = useState(true);
  const [cardW, setCardW] = useState(290);
  const spacing = Math.round(cardW * 0.94);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const onResize = () => {
      setWide(window.innerWidth >= 1360);
      // size the fan so all 5 cards fit on screen with only a sliver of overlap
      setCardW(Math.round(Math.max(255, Math.min(310, (window.innerWidth - 270) / 4.84))));
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 md:py-28 bg-mc-bg border-b border-mc-border">
      <SectionSpotlight />
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="vt-head text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mc-orange mb-5">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight text-mc-text-strong">
            Trusted by our clients
          </h2>
        </div>

        {wide ? (
          <div
            className="relative mx-auto h-[700px] w-full"
            onMouseEnter={() => setSpread(true)}
            onMouseLeave={() => { setSpread(false); setHovered(null); }}
          >
            <motion.div
              className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest text-mc-text-tertiary"
              animate={{ opacity: spread ? 0 : 1 }}
            >
              Hover to open
            </motion.div>

            {TESTIMONIALS.map((t, i) => {
              // Curved fan: centre card on top, neighbours swing down and tilt outward along an arc
              const o = i - (TESTIMONIALS.length - 1) / 2;
              const lift = hovered === i ? -16 : 0;
              const pose = spread
                ? { x: o * spacing, y: 30 + o * o * 46 + lift, rotate: o * 6.5 }
                : { x: t.pile.x, y: t.pile.y + 60, rotate: t.pile.r };
              return (
                <motion.article
                  key={t.id}
                  onMouseEnter={() => setHovered(i)}
                  initial={false}
                  animate={pose}
                  transition={{ type: 'spring', stiffness: 120, damping: 17, delay: spread ? i * 0.04 : 0 }}
                  style={{
                    width: cardW,
                    height: CARD_H,
                    left: '50%',
                    marginLeft: -cardW / 2,
                    transformOrigin: '50% 120%',
                    zIndex: spread ? (hovered === i ? 20 : 10 - Math.round(Math.abs(o))) : i + 1,
                  }}
                  className={cn(
                    'absolute top-0 flex flex-col rounded-[6px] border p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,.8)]',
                    toneClass(t.tone)
                  )}
                >
                  <CardBody t={t} compact />
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto w-full max-w-[420px]">
            <motion.div
              className="relative"
              initial={false}
              animate={{ height: spread ? TESTIMONIALS.length * MH + (TESTIMONIALS.length - 1) * MG : MH + 70 }}
              transition={{ type: 'spring', stiffness: 110, damping: 20 }}
            >
              {TESTIMONIALS.map((t, i) => (
                <motion.article
                  key={t.id}
                  onClick={() => !spread && setSpread(true)}
                  initial={false}
                  animate={
                    spread
                      ? { y: 0, x: 0, rotate: 0 }
                      : { y: -i * (MH + MG) + 30 + t.pile.y * 0.25, x: t.pile.x * 0.35, rotate: t.pile.r }
                  }
                  transition={{ type: 'spring', stiffness: 110, damping: 17, delay: spread ? i * 0.05 : 0 }}
                  style={{ height: MH, marginBottom: i === TESTIMONIALS.length - 1 ? 0 : MG, zIndex: spread ? 1 : i + 1 }}
                  className={cn('relative flex flex-col rounded-[6px] border p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,.8)]', toneClass(t.tone))}
                >
                  <CardBody t={t} compact />
                </motion.article>
              ))}
            </motion.div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setSpread((v) => !v)}
                className="rounded-full border border-mc-border bg-mc-surface px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-mc-text-secondary hover:border-mc-orange hover:text-mc-orange transition-colors cursor-pointer"
              >
                {spread ? 'Stack cards' : 'Tap to open'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
