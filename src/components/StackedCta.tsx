import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const LINES = 6;

const Helix: React.FC = () => {
  const pts = (phase: number) => Array.from({ length: 41 }, (_, i) => `${i ? 'L' : 'M'}${100 + 46 * Math.sin(i * 0.5 + phase)},${i * 10}`).join(' ');
  return (
    <div className="vt-helix">
      <svg viewBox="0 0 200 400" fill="none">
        <defs>
          <linearGradient id="vt-hx" x1="0" x2="1"><stop offset="0" stopColor="#FFB066" /><stop offset="1" stopColor="#F4F3EE" /></linearGradient>
        </defs>
        {Array.from({ length: 20 }, (_, i) => {
          const y = i * 20;
          const a = 100 + 46 * Math.sin((y / 10) * 0.5), b = 100 + 46 * Math.sin((y / 10) * 0.5 + Math.PI);
          return <line key={i} x1={a} y1={y} x2={b} y2={y} stroke="rgba(244,243,238,.35)" strokeWidth="3" />;
        })}
        <path d={pts(0)} stroke="url(#vt-hx)" strokeWidth="16" strokeLinecap="round" opacity=".92" />
        <path d={pts(Math.PI)} stroke="rgba(255,107,0,.9)" strokeWidth="16" strokeLinecap="round" />
      </svg>
    </div>
  );
};

const StackLine: React.FC<{ i: number; p: MotionValue<number>; reduce: boolean }> = ({ i, p, reduce }) => {
  const dir = i % 2 ? 1 : -1;
  const amount = 4 * (i + 1);
  const x = useTransform(p, [0, 0.8], [`${-dir * amount * 2}%`, `${dir * amount}%`]);
  return <motion.span className="vt-stack__line" style={{ x: reduce ? '0%' : x }}>START BUILDING</motion.span>;
};

/** Repeated giant text staggered by scroll + orbiting ring, with the primary CTA. */
export const StackedCta: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 110%', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const scrollTo = () => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="vt-stack" aria-label="Start a project">
      <div className="vt-stack__copy">
        <h2 className="vt-title vt-title--left">Stop renting templates.<br />Own your <em>software.</em></h2>
        <p>Hand-coded systems built around your workflows — with full IP ownership from day one.</p>
        <button onClick={scrollTo} className="gateway-hero__button gateway-hero__button--primary">
          Start a Project <ArrowUpRight aria-hidden="true" />
        </button>
      </div>
      <div className="vt-stack__art" aria-hidden="true">
        {Array.from({ length: LINES }, (_, i) => <StackLine key={i} i={i} p={p} reduce={!!reduce} />)}
        <Helix />
      </div>
    </section>
  );
};
