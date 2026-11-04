import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ScrollMarqueeProps {
  text: string;
  label?: string;
  caption?: string;
  byline?: string;
}

/** Giant headline that slides horizontally as the section scrolls through the viewport. */
export const ScrollMarquee: React.FC<ScrollMarqueeProps> = ({ text, label, caption, byline }) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const textRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState({ from: 600, to: -2400 });
  // Starts as soon as the section peeks in, and finishes (fully off-screen) well before it leaves
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 100%', 'end 25%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [range.from, range.to]);

  useEffect(() => {
    const measure = () => {
      const w = textRef.current?.scrollWidth ?? 0;
      // enter from just past the right edge, exit fully past the left edge
      setRange({ from: window.innerWidth * 0.92, to: -(w - window.innerWidth * 0.5) });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [text]);

  return (
    <section ref={ref} className="vt-marquee" aria-label={label}>
      <div className="vt-marquee__glow" aria-hidden="true" />
      {label && <p className="vt-eyebrow vt-marquee__label">{label}</p>}
      <div className="vt-marquee__track" aria-hidden="true">
        <motion.div ref={textRef} className="vt-marquee__text" style={{ x: reduce ? 0 : x }}>{text}</motion.div>
      </div>
      <span className="sr-only">{text}</span>
      {caption && <p className="vt-marquee__caption">{caption}</p>}
      {byline && <p className="vt-marquee__byline">{byline}</p>}
    </section>
  );
};
