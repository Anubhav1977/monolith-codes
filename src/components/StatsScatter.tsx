import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';

interface Stat { prefix?: string; value: number; suffix: string; label: string; }

const STATS: Stat[] = [
  { value: 99, suffix: '+', label: 'Core Web Vitals score' },
  { prefix: '<', value: 200, suffix: 'ms', label: 'Total blocking time' },
  { value: 100, suffix: '%', label: 'IP ownership — code is yours' },
  { value: 0, suffix: '', label: 'Templates or pre-made themes' },
];

// Scroll-linked parallax per cell: [start offset, end offset] in px, and reveal window.
const MOTION: { y: [number, number]; reveal: [number, number] }[] = [
  { y: [120, -40], reveal: [0.12, 0.3] },
  { y: [220, -20], reveal: [0.2, 0.38] },
  { y: [320, 0], reveal: [0.28, 0.46] },
  { y: [420, 20], reveal: [0.36, 0.54] },
];

const Counter: React.FC<{ stat: Stat; active: boolean }> = ({ stat, active }) => {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? stat.value : 0);
  useEffect(() => {
    if (reduce) { setN(stat.value); return; }
    if (!active) return;
    let raf = 0; const t0 = performance.now(); const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(stat.value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce, stat.value]);
  return <span>{stat.prefix}{n}<em>{stat.suffix}</em></span>;
};

const Cell: React.FC<{ stat: Stat; i: number; p: MotionValue<number>; reduce: boolean; active: boolean }> = ({ stat, i, p, reduce, active }) => {
  const m = MOTION[i];
  const y = useTransform(p, [0, 0.8], m.y);
  const opacity = useTransform(p, m.reveal, [0, 1]);
  const blur = useTransform(p, m.reveal, ['blur(14px)', 'blur(0px)']);
  const line = useTransform(p, [m.reveal[0], m.reveal[1] + 0.1], [0, 1]);
  return (
    <motion.div className={`vt-stat vt-stat--${i + 1}`} style={reduce ? undefined : { y, opacity, filter: blur }}>
      <motion.span className="vt-stat__edge" style={{ scaleY: reduce ? 1 : line }} />
      <strong><Counter stat={stat} active={active} /></strong>
      <small>{stat.label}</small>
    </motion.div>
  );
};

export const StatsScatter: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 30%'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const headY = useTransform(p, [0, 1], [60, -50]);
  const headOpacity = useTransform(p, [0, 0.12, 0.8, 1], [0, 1, 1, 0.35]);
  const flare = useTransform(p, [0.4, 0.75, 1], [0, 1, 0.4]);
  const sweep = useTransform(p, [0.45, 0.85], ['-30%', '130%']);

  // Hover: soft spotlight + cell borders that light up near the cursor (as in the reference video)
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const grid = e.currentTarget;
    const g = grid.getBoundingClientRect();
    grid.style.setProperty('--gx', `${e.clientX - g.left}px`);
    grid.style.setProperty('--gy', `${e.clientY - g.top}px`);
    grid.querySelectorAll<HTMLElement>('.vt-stat').forEach((cell) => {
      const c = cell.getBoundingClientRect();
      cell.style.setProperty('--mx', `${e.clientX - c.left}px`);
      cell.style.setProperty('--my', `${e.clientY - c.top}px`);
    });
  };

  return (
    <section ref={ref} className="vt-stats" aria-label="Engineering benchmarks">
      <motion.div className="vt-stats__head" style={reduce ? undefined : { y: headY, opacity: headOpacity }}>
        <h2 className="vt-title">Engineered to <em>measurable</em> standards</h2>
        <p>Every Monolith build is held to numbers we can show you — not adjectives.</p>
      </motion.div>

      <div className="vt-stats__grid" onPointerMove={onMove}>
        {STATS.map((s, i) => <Cell key={s.label} stat={s} i={i} p={p} reduce={reduce} active={inView} />)}
        <motion.div className="vt-stats__flare" aria-hidden="true" style={reduce ? { opacity: 1 } : { opacity: flare }}>
          <i className="vt-stats__vline" />
          <motion.i className="vt-stats__hline" style={reduce ? undefined : { left: sweep }} />
        </motion.div>
      </div>
    </section>
  );
};
