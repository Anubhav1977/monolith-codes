import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Smartphone, Layers, Database, Cpu, Globe } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { FOUNDERS, SITE } from '@/lib/site';

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CAPABILITIES = [
  { icon: Globe, label: 'Websites', href: '/services/website-development' },
  { icon: Code2, label: 'Web Applications', href: '/services/web-application-development' },
  { icon: Layers, label: 'SaaS Platforms', href: '/services/saas-development' },
  { icon: Smartphone, label: 'Mobile Apps', href: '/services/mobile-app-development' },
  { icon: Database, label: 'ERP & CRM', href: '/services/erp-crm-development' },
  { icon: Cpu, label: 'AI & Automation', href: '/services/ai-automation' },
];


const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 36, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease: EXPO },
});

const B: React.FC<{ children: React.ReactNode }> = ({ children }) => <strong className="about__hl">{children}</strong>;

const AboutUs: React.FC = () => (
  <PageShell mainClassName="">
    <div className="about">
      <div className="about__glow about__glow--a" aria-hidden="true" />
      <div className="about__glow about__glow--b" aria-hidden="true" />

      <div className="about__main">
        <motion.div className="about__top" {...reveal()}>
          <p className="about__tag">{SITE.locationLine}</p>
          <ul className="about__motto" aria-label="Code, Innovate, Build, Grow">
            {['Code', 'Innovate', 'Build', 'Grow'].map((w) => <li key={w}>{w}</li>)}
          </ul>
        </motion.div>

        <motion.h1 className="about__title" {...reveal(0.05)}>About <em>Us</em></motion.h1>

        <div className="about__copy">
          <motion.p {...reveal()}>
            <B>MONOLITH CODES</B> is a founder-led custom software development studio <B>based in India.</B> We design and hand-code websites, web applications, SaaS platforms, mobile apps, ERP/CRM systems and AI automation for businesses in <B>India and around the world.</B>
          </motion.p>
          <motion.p {...reveal()}>
            Many businesses end up with software that does not fit them — template websites that slow down with every plugin, and off-the-shelf tools their teams have to work around. We build the opposite: <B>software designed around how your business actually works,</B> with clean code you fully own.
          </motion.p>
          <motion.p {...reveal()}>
            Every project starts with a <B>written scope and a fixed quote</B> before development begins. We deliver in milestones you can review on a staging link, document decisions in writing, and hand over the <B>complete source code, documentation and intellectual property</B> at the end — no licence fees and no lock-in.
          </motion.p>
          {/* REVIEW(owner): the two paragraphs below were written from existing service/pricing content. */}
          <motion.p {...reveal()}>
            Our work spans <B>marketing websites, customer portals, SaaS products, mobile apps, ERP/CRM systems and AI automation.</B> Websites start from $999 (₹12,999 in India) and typically take 2–4 weeks; web applications and SaaS MVPs start from $2,499 (₹29,999) and typically take 6–10 weeks; larger ERP, CRM and AI systems are quoted per project and delivered in phases.
          </motion.p>
          <motion.p {...reveal()}>
            We build with <B>React, TypeScript and Node.js,</B> PostgreSQL and the cloud platforms your team already uses, and we tune every public page for search visibility and Core Web Vitals. Where you already run SAP, Oracle, Salesforce or your own databases, we integrate with them instead of forcing a rip-and-replace.
          </motion.p>
          <motion.p {...reveal()}>
            You work directly with the founders: the people who scope, architect and build your system. Indian clients are quoted in rupees and international clients in US dollars, with the <B>same process, quality and ownership terms</B> for both.
          </motion.p>
        </div>

        <motion.section className="mt-16" aria-labelledby="founders-title" {...reveal()}>
          <h2 id="founders-title" className="text-2xl md:text-3xl font-sans font-medium text-mc-text-strong tracking-tight mb-6">
            The founders
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FOUNDERS.map((f) => (
              <li key={f.id} id={f.id} className="rounded-lg border border-mc-border bg-mc-surface overflow-hidden">
                <img
                  src={f.photo}
                  width={900}
                  height={599}
                  loading="lazy"
                  decoding="async"
                  alt={`${f.name}, ${f.jobTitle} at MONOLITH CODES`}
                  className="w-full h-48 object-cover object-[center_15%]"
                />
                <div className="p-5">
                  <h3 className="text-xl font-sans font-medium text-mc-text-strong">{f.name}</h3>
                  <p className="mt-1 font-mono text-xs text-mc-orange uppercase tracking-wider">{f.jobTitle}</p>
                  <p className="mt-3 text-sm text-mc-text-body leading-relaxed">{f.bio}</p>
                  {f.linkedin && (
                    <a href={f.linkedin} target="_blank" rel="noopener noreferrer me" className="mt-3 inline-flex min-h-11 items-center text-sm text-mc-orange underline underline-offset-4">
                      {f.name} on LinkedIn
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.nav className="about__grid" aria-label="Services" {...reveal()}>
          {CAPABILITIES.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} className="about__cap vt-glow">
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </motion.nav>

        <motion.div className="about__cta" {...reveal()}>
          <a href="/#inquiry" className="vt-btn vt-btn--light">
            Start a Project <i><ArrowUpRight aria-hidden="true" /></i>
          </a>
          <a href="/services" className="vt-btn vt-btn--ghost">Explore our services</a>
        </motion.div>
      </div>
    </div>
  </PageShell>
);

export { AboutUs };
export default AboutUs;
