import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MonolithPillars } from '@/components/MonolithPillars';
import { cn } from '@/lib/utils';

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cascade: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.62 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EXPO } },
};

const line: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 1.18, ease: EXPO } },
};

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const mouseX = useSpring(useMotionValue(0), { stiffness: 70, damping: 22, mass: 0.5 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 70, damping: 22, mass: 0.5 });

  const copyY = useTransform(scrollYProgress, [0, 0.7], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0.38, 0.78], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const sceneOpacity = useTransform(scrollYProgress, [0.62, 1], [1, 0]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    mouseY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const initial = reduceMotion ? 'visible' : 'hidden';

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="gateway-hero"
    >
      <motion.div aria-hidden="true" className="gateway-hero__scene" style={{ opacity: sceneOpacity, scale: sceneScale }}>
        <div className="gateway-hero__haze" />
        <motion.div className="gateway-hero__grid" style={{ y: gridY }} />
        <div className="gateway-hero__embers">
          {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--ember-index': index } as React.CSSProperties} />)}
        </div>
        <MonolithPillars mouseX={mouseX} mouseY={mouseY} />
      </motion.div>

      <motion.div className="gateway-hero__content" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.div variants={cascade} initial={initial} animate="visible" className="gateway-hero__copy">
          <motion.p variants={rise} className="gateway-hero__eyebrow">MONOLITH CODES / CUSTOM SOFTWARE STUDIO</motion.p>
          <h1 className="gateway-hero__headline" aria-label="We build software for companies that outgrew templates.">
            <span className="gateway-hero__line"><motion.span variants={line} initial={initial} animate="visible">WE BUILD SOFTWARE</motion.span></span>
            <span className="gateway-hero__line"><motion.span variants={line} initial={initial} animate="visible" transition={{ delay: reduceMotion ? 0 : 0.1 }}>FOR COMPANIES THAT</motion.span></span>
            <span className="gateway-hero__line gateway-hero__line--signal"><motion.span variants={line} initial={initial} animate="visible" transition={{ delay: reduceMotion ? 0 : 0.2 }}>OUTGREW TEMPLATES.</motion.span></span>
          </h1>
          <motion.p variants={rise} className="gateway-hero__subhead">
            Bespoke web platforms, custom ERPs, and high-performance mobile systems—hand-coded down to the byte. <strong>Zero WordPress, zero bloat, pure execution.</strong>
          </motion.p>
          <motion.div variants={rise} className="gateway-hero__actions">
            <button onClick={() => scrollTo('inquiry')} className={cn('gateway-hero__button gateway-hero__button--primary')}>
              Start a Project <ArrowUpRight aria-hidden="true" />
            </button>
            <button onClick={() => scrollTo('work')} className="gateway-hero__button gateway-hero__button--secondary">
              Explore Our Work <ArrowUpRight aria-hidden="true" />
            </button>
          </motion.div>
          <motion.p variants={rise} className="gateway-hero__proof"><span /> Custom-built for your business <b>·</b> Clear scope before development</motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};
