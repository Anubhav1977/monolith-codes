import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ShapeField } from '@/components/ShapeField';

const HEADLINE = ['Let’s work', 'together!'];
const EMAIL = 'studio@monolithcodes.com';

/** Splits the headline into masked characters; words stay unbreakable. */
const Headline: React.FC = () => {
  let i = 0;
  return (
    <>
      <span className="sr-only">{HEADLINE.join(' ')}</span>
      {HEADLINE.map((line) => (
        <span key={line} className="wt__line" aria-hidden="true">
          {line.split(' ').map((word, wi) => (
            <React.Fragment key={word}>
              {wi > 0 && ' '}
              <span className="wt__word">
                {Array.from(word).map((ch, ci) => (
                  <span
                    key={ci}
                    className={ch === '!' ? 'wt__char wt__accent' : 'wt__char'}
                    style={{ '--i': i++ } as React.CSSProperties}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </React.Fragment>
          ))}
        </span>
      ))}
    </>
  );
};

/**
 * Closing call-to-action: giant masked headline over an interactive pile of
 * shapes that rises in on scroll, gets pushed by pointer / touch and warms to
 * orange where it is touched.
 */
export const WorkTogetherSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(contentRef, { once: true, amount: 0.45 });

  // Headline drifts up slightly slower than the page as the section arrives.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], [72, 0]);

  return (
    <section ref={sectionRef} id="work-together" className="wt" aria-labelledby="wt-title">
      <ShapeField hostRef={sectionRef} contentRef={contentRef} />

      <motion.div
        ref={contentRef}
        className="wt__content"
        style={reduce ? undefined : { y }}
        data-in={inView || reduce ? 'true' : 'false'}
      >
        <p className="wt__eyebrow">
          <span className="wt__plus" aria-hidden="true" />
          <span>Have a system in mind?</span>
          <span className="wt__plus" aria-hidden="true" />
        </p>

        <h2 id="wt-title" className="wt__title">
          <Headline />
        </h2>

        <p className="wt__note">
          Or write to us directly at{' '}
          <a href={`mailto:${EMAIL}`} className="wt__mail">
            {EMAIL}
          </a>
        </p>
      </motion.div>

      <a href="#inquiry" className="wt__cta">
        <span className="wt__cta-dot" aria-hidden="true" />
        Start a Project
        <ArrowUpRight className="wt__cta-icon" aria-hidden="true" />
      </a>
    </section>
  );
};
