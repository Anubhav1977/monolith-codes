import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowUpRight, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'architecture' | 'process' | 'ownership' | 'pricing';
}

const FAQS: FaqItem[] = [
  {
    id: 'diff',
    question: 'How is MONOLITH CODES different from traditional digital agencies?',
    answer: 'Traditional agencies frequently re-sell pre-made templates, bloated WordPress themes, or offshore cookie-cutter workflows. MONOLITH CODES operates strictly as a custom software engineering studio. Every web application, SaaS platform, and internal system is custom engineered from first principles by senior engineers using production-grade React, TypeScript, and modern cloud architecture.',
    category: 'architecture',
  },
  {
    id: 'why-custom',
    question: 'Why do you build everything custom instead of using templates or drag-and-drop builders?',
    answer: 'Templates and page builders force your business logic into rigid pre-made boxes, suffer from heavy plugin bloat, slow 3-6 second page load times, and present recurring security vulnerabilities. Custom engineering gives you sub-second performance, total architectural flexibility, 99+ Core Web Vitals, zero third-party plugin vulnerabilities, and software built around your exact operational workflows.',
    category: 'architecture',
  },
  {
    id: 'ip-ownership',
    question: 'Who owns the intellectual property and source code after launch?',
    answer: 'You own 100% of the source code, design assets, database schemas, and intellectual property. Upon project completion, we hand off the full Git repository with clean documentation. There are zero recurring theme licenses, zero proprietary framework lock-in, and no hidden ongoing fees.',
    category: 'ownership',
  },
  {
    id: 'timeline',
    question: 'What is your typical delivery timeline for custom software projects?',
    answer: 'Project timelines depend on scope: bespoke web experiences take 2 to 4 weeks; full custom web apps and SaaS platforms take 6 to 10 weeks; complex enterprise ERP/CRM systems take 10 to 16+ weeks. We run fixed-scope, 2-week development sprints with weekly live staging deployments.',
    category: 'process',
  },
  {
    id: 'maintenance',
    question: 'How do you handle maintenance, security updates, and post-launch support?',
    answer: 'Every engagement includes 30 days of post-launch hypercare and bug guarantee. Afterwards, we offer optional monthly retainer cells for active feature development, performance monitoring, infrastructure management, and security audits.',
    category: 'process',
  },
  {
    id: 'integrations',
    question: 'Can MONOLITH integrate with our existing legacy ERP, CRM, or custom database?',
    answer: 'Yes. A major part of our engineering practice involves building custom REST/GraphQL API bridges and middleware connectors between modern React frontends and legacy backends like SAP, NetSuite, Oracle, Salesforce, or proprietary SQL/NoSQL databases.',
    category: 'architecture',
  },
];

export const FaqSection: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<string | null>(FAQS[0].id);

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const scrollToInquiry = () => {
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="py-24 border-b border-mc-border bg-mc-bg">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>08 / FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-mc-text-strong tracking-tight mb-4">
              EVERYTHING YOU NEED TO KNOW
            </h2>
            <p className="text-mc-text-body text-base md:text-lg max-w-2xl">
              Transparent answers regarding custom engineering, IP ownership, project timelines, and our software studio delivery methodology.
            </p>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className={cn(
                  'rounded-lg border transition-colors overflow-hidden',
                  isOpen
                    ? 'bg-mc-surface border-mc-orange shadow-lg'
                    : 'bg-mc-surface-deep/70 border-mc-border hover:border-mc-border-strong hover:bg-mc-surface/60'
                )}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-mc-orange shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-sans font-medium text-base md:text-lg text-mc-text-strong">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-mc-text-tertiary transition-transform duration-200 shrink-0',
                      isOpen && 'rotate-180 text-mc-orange'
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.24, ease: 'easeInOut' }}
                      className="border-t border-mc-border-soft px-6 pb-6 pt-4"
                    >
                      <p className="font-sans text-sm md:text-base text-mc-text-body leading-relaxed pl-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Have More Questions CTA Card */}
        <div className="p-8 rounded-lg border border-mc-border bg-mc-surface flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-md bg-mc-surface-deep border border-mc-border text-mc-orange">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-sans font-medium text-mc-text-strong mb-1">
                Have a specific technical question or project requirement?
              </h3>
              <p className="text-xs font-sans text-mc-text-secondary">
                Speak directly with our senior software engineering leads.
              </p>
            </div>
          </div>

          <button
            onClick={scrollToInquiry}
            className="h-11 px-6 rounded-md bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight text-xs font-sans font-medium flex items-center gap-2 shrink-0 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask Our Engineers</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
