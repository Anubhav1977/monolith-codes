import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/** Video "All in one place": content rises from below, tilts flat and sharpens as it scrolls into view, under a spotlight cone. */
export const ScrollStage: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 35%'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const rotateX = useTransform(p, [0, 1], [26, 0]);
  const scale = useTransform(p, [0, 1], [0.88, 1]);
  const y = useTransform(p, [0, 1], [140, 0]);
  const opacity = useTransform(p, [0, 0.5], [0, 1]);
  const blur = useTransform(p, [0, 0.7], ['blur(12px)', 'blur(0px)']);
  const glow = useTransform(p, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`vt-stage ${className ?? ''}`}>
      <motion.div className="vt-stage__glow" aria-hidden="true" style={reduce ? undefined : { opacity: glow }} />
      <motion.div className="vt-stage__body" style={reduce ? undefined : { rotateX, scale, y, opacity, filter: blur }}>
        {children}
      </motion.div>
    </div>
  );
};

/** Orange spotlight cone behind a section header. */
export const SectionSpotlight: React.FC = () => <div className="vt-spot" aria-hidden="true" />;
