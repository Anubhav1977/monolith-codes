import React, { Suspense, lazy, useRef, useSyncExternalStore } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Three.js is split into its own chunk and only fetched when the section nears the viewport.
const PillarField3D = lazy(() => import('@/components/PillarField3D'));

const DESKTOP = '(min-width: 1024px)';
const subscribeDesktop = (cb: () => void) => {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const getDesktop = () => window.matchMedia(DESKTOP).matches;

/**
 * "Own your software" — short copy + CTA beside an interactive 3D field of
 * monolith pillars. On scroll, a uniform template grid becomes a custom system
 * while "templates." is struck through in the headline.
 */
export const OwnershipSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktop, () => true);
  const reduce = useReducedMotion();
  const near = useInView(sectionRef, { once: true, margin: '400px 0px' });

  // One progress value drives both the scene and the headline so they stay in sync.
  // Desktop: scene sits beside the copy → track the section. Mobile: scene sits
  // below the copy → track the stage, finishing while the headline is still on screen.
  const sectionScroll = useScroll({ target: sectionRef, offset: ['start end', 'center center'] });
  const stageScroll = useScroll({ target: stageRef, offset: ['start 95%', 'start 30%'] });
  const scrollYProgress = isDesktop ? sectionScroll.scrollYProgress : stageScroll.scrollYProgress;
  const copyY = useTransform(sectionScroll.scrollYProgress, [0, 1], [48, 0]);
  const copyOpacity = useTransform(sectionScroll.scrollYProgress, [0.05, 0.35], [0, 1]);
  // Text follows the scene: "templates." gets struck through and the first line
  // steps back exactly while the 3D grid turns from template into custom system.
  const strike = useTransform(scrollYProgress, [0.32, 0.55], [0, 1]);
  const oldLine = useTransform(scrollYProgress, [0.4, 0.7], [1, 0.4]);
  const getProgress = () => scrollYProgress.get();

  return (
    <section ref={sectionRef} className="own" aria-labelledby="own-title">
      <div ref={stageRef} className="own__stage">
        {near && (
          <Suspense fallback={null}>
            <PillarField3D getProgress={getProgress} />
          </Suspense>
        )}
        <p className="own__hint" aria-hidden="true">
          <span className="own__hint--fine">Hover to raise · Drag to rotate</span>
          <span className="own__hint--touch">Touch to raise · Swipe to rotate</span>
        </p>
      </div>

      <div className="own__inner">
        <motion.div className="own__copy" style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
          <p className="own__eyebrow">MC / Ownership</p>
          <h2 id="own-title" className="own__title">
            <motion.span className="own__old" style={reduce ? { opacity: 0.4 } : { opacity: oldLine }}>
              Stop renting{' '}
              <span className="own__struck">
                templates.
                <motion.span
                  className="own__strike"
                  aria-hidden="true"
                  style={reduce ? { scaleX: 1 } : { scaleX: strike }}
                />
              </span>
            </motion.span>
            <br />
            Own your <span className="own__accent">software.</span>
          </h2>
          <p className="own__lede">
            Hand-coded systems built around your workflows, with full IP ownership from day one.
          </p>
          <a href="#inquiry" className="own__cta">
            Start a Project
            <ArrowUpRight aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
