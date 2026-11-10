import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ScrollMarqueeProps {
  text: string;
  label?: string;
  caption?: string;
  byline?: string;
}

/** Scroll distance (px) spent per px of horizontal text travel while pinned. */
const SCROLL_PER_PX = 0.85;

/**
 * Giant headline that pins to the viewport and slides horizontally until the
 * whole line has been read — only then does the page continue scrolling.
 * The section's height is extended by exactly the distance the text must travel,
 * so the text can never be skipped. Reduced motion: no pin, the line wraps.
 */
export const ScrollMarquee: React.FC<ScrollMarqueeProps> = ({ text, label, caption, byline }) => {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [travel, setTravel] = useState(0);

  // 0 → 1 only while the stage is pinned (section top at viewport top → section bottom at viewport bottom).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -travel]);

  useLayoutEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    const el = textRef.current;
    if (!track || !el) return;
    const measure = () => {
      const cs = getComputedStyle(track);
      const inner = track.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      // offsetWidth ignores the transform, so this is the true line length
      setTravel(Math.max(0, Math.round(el.offsetWidth - inner)));
    };
    measure();
    const ro = new ResizeObserver(measure); // viewport changes + late web-font swap
    ro.observe(track);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, reduce]);

  const pinned = !reduce && travel > 0;

  return (
    <section
      ref={ref}
      className="vt-marquee"
      aria-label={label}
      data-pinned={pinned || undefined}
      data-reduce={reduce || undefined}
      style={pinned ? ({ '--mq-scroll': `${Math.round(travel * SCROLL_PER_PX)}px` } as React.CSSProperties) : undefined}
    >
      <div className="vt-marquee__pin">
        <div className="vt-marquee__glow" aria-hidden="true" />
        {label && <p className="vt-eyebrow vt-marquee__label">{label}</p>}
        <div ref={trackRef} className="vt-marquee__track" aria-hidden="true">
          <motion.div ref={textRef} className="vt-marquee__text" style={{ x: pinned ? x : 0 }}>
            {text}
          </motion.div>
        </div>
        <span className="sr-only">{text}</span>
        {caption && <p className="vt-marquee__caption">{caption}</p>}
        {byline && <p className="vt-marquee__byline">{byline}</p>}
      </div>
    </section>
  );
};
