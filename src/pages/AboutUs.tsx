import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Smartphone, PenTool, ShoppingCart, Layers, Cpu } from 'lucide-react';
import { Navigation } from '@/components/Navigation';

interface AboutUsProps { onBackToHome?: () => void; }

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CAPABILITIES = [
  { icon: Code2, label: 'Web Development' },
  { icon: Smartphone, label: 'Mobile Applications' },
  { icon: PenTool, label: 'UI/UX Design' },
  { icon: ShoppingCart, label: 'E-Commerce Platforms' },
  { icon: Layers, label: 'SaaS Products' },
  { icon: Cpu, label: 'AI Automation' },
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 36, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease: EXPO },
});

const B: React.FC<{ children: React.ReactNode }> = ({ children }) => <strong className="about__hl">{children}</strong>;

export const AboutUs: React.FC<AboutUsProps> = ({ onBackToHome }) => {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const startProject = () => {
    window.location.hash = '';
    window.setTimeout(() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' }), 150);
  };

  return (
    <div className="about">
      <div className="about__glow about__glow--a" aria-hidden="true" />
      <div className="about__glow about__glow--b" aria-hidden="true" />

      <Navigation />

      <main className="about__main">
        <motion.div className="about__top" {...reveal()}>
          <p className="about__tag">Custom Software · Engineered for Business</p>
          <ul className="about__motto" aria-label="Code, Innovate, Build, Grow">
            {['Code', 'Innovate', 'Build', 'Grow'].map((w) => <li key={w}>{w}</li>)}
          </ul>
        </motion.div>

        <motion.h1 className="about__title" {...reveal(0.05)}>About <em>Us</em></motion.h1>

        <div className="about__copy">
          <motion.p {...reveal()}>
            <B>MONOLITH CODES</B> is a technology-driven software development company dedicated to helping businesses transform their ideas into powerful <B>digital solutions.</B> We specialize in custom web development, mobile applications, UI/UX design, e-commerce platforms, SaaS products, and AI-powered automation.
          </motion.p>
          <motion.p {...reveal()}>
            We work with startups, small and medium-sized businesses, entrepreneurs, and established organizations to understand their challenges and deliver technology solutions tailored to their goals. From building a strong digital presence to developing complex business applications, we focus on creating solutions that are <B>reliable, scalable, user-friendly,</B> and built for <B>long-term success.</B>
          </motion.p>
          <motion.p {...reveal()}>
            Our approach combines <B>innovative thinking, modern technologies,</B> and a <B>commitment to quality.</B> We believe every business has unique requirements, which is why we focus on understanding each project before turning ideas into practical digital products.
          </motion.p>
          <motion.p {...reveal()}>
            At <B>MONOLITH CODES,</B> our mission is to make technology more accessible, simplify business operations, and help organizations grow through <B>meaningful digital innovation.</B> We aim to build lasting partnerships by delivering solutions that create real value and make a difference.
          </motion.p>
        </div>

        <motion.div className="about__grid" {...reveal()}>
          {CAPABILITIES.map(({ icon: Icon, label }) => (
            <div key={label} className="about__cap vt-glow">
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div className="about__cta" {...reveal()}>
          <button onClick={startProject} className="vt-btn vt-btn--light">
            Start a Project <i><ArrowUpRight aria-hidden="true" /></i>
          </button>
          <button onClick={onBackToHome} className="vt-btn vt-btn--ghost">Back to Home</button>
        </motion.div>
      </main>
    </div>
  );
};

export default AboutUs;
