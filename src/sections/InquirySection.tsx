import React from 'react';
import { InquiryForm } from '@/components/InquiryForm';
import { CheckSquare, Calendar, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';

export const InquirySection: React.FC = () => {
  return (
    <section id="inquiry" className="py-20 md:py-28 bg-mc-surface-deep/40 border-b border-mc-border relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-mc-orange/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Direct Founder Value Prop & Call Booking */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-mc-orange animate-pulse" />
                <span>09 / START A PROJECT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium text-mc-text-strong tracking-tight leading-[1.15] mb-4">
                HAVE A PROJECT?<br />
                <span className="text-mc-text-body font-normal">LET'S TALK!</span>
              </h2>
              <p className="text-mc-text-body text-base leading-relaxed">
                Send us your system parameters or operational requirements. Our senior technical team will evaluate your scope and respond with a structured technical proposal.
              </p>
            </div>

            {/* Value Proposition Checklists */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-sm font-sans text-mc-text-strong">
                <div className="p-1 rounded bg-mc-orange-10 text-mc-orange shrink-0">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <span><strong>NDA?</strong> Absolutely. Just ask.</span>
              </div>

              <div className="flex items-center gap-3 text-sm font-sans text-mc-text-strong">
                <div className="p-1 rounded bg-mc-orange-10 text-mc-orange shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>We'll respond within <strong>24 hours</strong> fast & focused.</span>
              </div>

              <div className="flex items-center gap-3 text-sm font-sans text-mc-text-strong">
                <div className="p-1 rounded bg-mc-orange-10 text-mc-orange shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <span>Work directly with <strong>senior software architects</strong>, not juniors.</span>
              </div>
            </div>

            <hr className="border-mc-border my-6" />

            {/* Founder Call Booking Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-mc-surface border border-mc-border shadow-lg space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-mc-text-tertiary">
                Schedule a Direct Architecture Call:
              </div>

              <div className="flex items-center gap-4">
                {/* Founder Photo */}
                <div className="relative shrink-0">
                  <img
                    src="/assets/faces/founder_pp.png"
                    alt="Founder & Lead Architect"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-[center_12%] border border-mc-border shadow-md"
                    onError={(e) => {
                      // Fallback avatar if image loading encounters path issue
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-mc-surface shadow-sm" title="Online for inquiries" />
                </div>

                {/* Founder Details */}
                <div>
                  <h4 className="text-base font-sans font-semibold text-mc-text-strong leading-tight">
                    Anubhav Garg (Lead Software Architect)
                  </h4>
                  <p className="text-xs font-mono text-mc-text-secondary mt-0.5">
                    Founder & Engineering Director
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-mc-orange">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Direct Technical Consultation</span>
                  </div>
                </div>
              </div>

              {/* Call Booking Button */}
              <a
                href="mailto:studio@monolithcodes.com?subject=Schedule%2030-Min%20Architecture%20Call"
                className="w-full py-3 px-4 rounded-lg bg-mc-orange text-mc-bg font-sans font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-mc-orange-highlight active:bg-mc-orange-dark transition-all shadow-md group"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a 30-min Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

          </div>

          {/* Right Column: High-Conversion Instant Inquiry Form Component */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>

        </div>
      </div>
    </section>
  );
};
