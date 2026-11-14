import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowUpRight, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HOME_FAQS as FAQS } from '@/content/faqs';

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
      <div className="max-w-340 mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="vt-head grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-3 font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mc-orange" />
            <span>09 / FREQUENTLY ASKED QUESTIONS</span>
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
