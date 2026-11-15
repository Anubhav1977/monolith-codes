import React from 'react';
import { motion } from 'framer-motion';

const TICKER = [
  'React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite / Next.js', 'Framer Motion', 'PostgreSQL', 'Redis',
  'Node.js', 'AWS / Cloudflare', 'Stripe Billing', 'WebSockets', 'CI/CD',
];

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom'];
const Cube: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`vt-cube ${className ?? ''}`}>{FACES.map((f) => <i key={f} className={`vt-cube__face vt-cube__face--${f}`} />)}</div>
);
const Wire: React.FC = () => (
  <div className="vt-wire" aria-hidden="true">
    <Cube />
    <Cube className="vt-cube--inner" />
  </div>
);

/** "Our Code / Your Success" + what-we-are block + tech ticker (video section 3). */
export const IntroSplit: React.FC = () => (
  <section className="vt-intro" aria-label="About Monolith Codes">
    <div className="vt-intro__row">
      <motion.div className="vt-intro__left" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1, ease: EXPO }}>
        <Wire />
        <h2>Our Code,{' '}<br />Your Success</h2>
      </motion.div>
      <motion.div className="vt-intro__right" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1, delay: 0.15, ease: EXPO }}>
        <span className="vt-chip">What is Monolith Codes?</span>
        <p className="vt-intro__lead">We engineer custom web applications, SaaS platforms, mobile apps, ERP systems and AI automation.</p>
        {/* Answer-first summary (quotable by search and AI engines). REVIEW(owner): built from published prices/timelines. */}
        <p className="vt-intro__body">Monolith Codes is a founder-led custom software development studio based in India, working with clients in India and worldwide. Websites start from $999 (₹12,999) and take 2–4 weeks; web apps and SaaS MVPs start from $2,499 (₹29,999) and take 6–10 weeks; ERP/CRM and AI systems are quoted per project. Every solution is custom engineered — never built from templates — and you own 100% of the code.</p>
      </motion.div>
    </div>
    <div className="vt-ticker" aria-hidden="true">
      <div className="vt-ticker__track">
        {[...TICKER, ...TICKER].map((t, i) => (
          <span key={i}><i />{t}<em>Production-ready</em></span>
        ))}
      </div>
    </div>
  </section>
);
