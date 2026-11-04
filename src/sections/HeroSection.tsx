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
import { ArrowUpRight, Code2, Zap, ShieldCheck, Layers } from 'lucide-react';

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

  const logoX = useTransform(mouseX, [-0.5, 0.5], [-24, 24]);
  const logoY = useTransform(mouseY, [-0.5, 0.5], [-16, 16]);
  const logoRotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const logoRotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const copyY =useTransform(scrollYProgress, [0, 0.7], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0.38, 0.78], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const sceneOpacity = useTransform(scrollYProgress, [0.62, 1], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 200]);

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
        <div className="gateway-hero__cone" />
        <motion.div className="gateway-hero__grid" style={{ y: gridY }} />
        <motion.div
          className="gateway-hero__logo"
          style={{ x: logoX, y: logoY, rotateY: logoRotateY, rotateX: logoRotateX }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.7, filter: 'blur(18px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, ease: EXPO }}
        >
          <span className="gateway-hero__logo-glow" />
          <img src="/assets/brand/monolith-3d-logo.webp" alt="" width={900} height={827} fetchPriority="high" decoding="async" draggable={false} />
          <span className="gateway-hero__logo-shine" />
        </motion.div>
        <div className="gateway-hero__embers">
          {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--ember-index': index } as React.CSSProperties} />)}
        </div>
      </motion.div>

      <motion.div className="gateway-hero__content" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.div variants={cascade} initial={initial} animate="visible" className="gateway-hero__copy">
          <motion.p variants={rise} className="gateway-hero__chip">Our Code, Your <b>Success</b></motion.p>
          <h1 className="gateway-hero__headline" aria-label="We build software for companies that outgrew templates.">
            <span className="gateway-hero__line"><motion.span variants={line} initial={initial} animate="visible">We build software for companies</motion.span></span>
            <span className="gateway-hero__line"><motion.span variants={line} initial={initial} animate="visible" transition={{ delay: reduceMotion ? 0 : 0.12 }}>that outgrew templates.</motion.span></span>
          </h1>
          <motion.ul variants={rise} className="gateway-hero__points">
            <li><Code2 aria-hidden="true" />Hand-coded, zero WordPress</li>
            <li><Zap aria-hidden="true" />Zero bloat, pure execution</li>
            <li><ShieldCheck aria-hidden="true" />Clear scope before development</li>
            <li><Layers aria-hidden="true" />Custom-built for your business</li>
          </motion.ul>
          <motion.div variants={rise} className="gateway-hero__actions">
            <button onClick={() => scrollTo('inquiry')} className="vt-btn vt-btn--light">
              Start a Project <i><ArrowUpRight aria-hidden="true" /></i>
            </button>
            <button onClick={() => scrollTo('work')} className="vt-btn vt-btn--ghost">Explore Our Work</button>
          </motion.div>
        </motion.div>
      </motion.div>
      <span className="gateway-hero__status"><i /> Available for Q3/Q4 projects</span>
      <span className="gateway-hero__scroll">Scroll to explore ↓</span>
    </section>
  );
};
