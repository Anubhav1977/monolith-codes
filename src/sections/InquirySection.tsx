import React from 'react';
import { InquiryForm } from '@/components/InquiryForm';
import { Mail, Clock, ShieldCheck, MessageSquare } from 'lucide-react';

export const InquirySection: React.FC = () => {
  return (
    <section id="inquiry" className="py-24 bg-mc-surface-deep/40 border-b border-mc-border">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Inquiry Promise & Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-mc-orange" />
                <span>08 / START A PROJECT</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-medium text-mc-text-strong tracking-tight mb-4">
                LET'S BUILD YOUR SOFTWARE SYSTEM.
              </h2>
              <p className="text-mc-text-body text-base leading-relaxed">
                Send us your project parameters or operational requirements. Our senior technical team will evaluate your scope and respond with a structured technical proposal.
              </p>
            </div>

            {/* Direct Studio Commitments */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-mc-surface border border-mc-border">
                <div className="p-2.5 rounded bg-mc-orange-10 border border-mc-orange text-mc-orange shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-medium text-mc-text-strong">
                    24-Hour Architect Response
                  </h4>
                  <p className="text-xs font-sans text-mc-text-secondary mt-0.5">
                    Your inquiry goes directly to lead software architects, not junior sales representatives.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-mc-surface border border-mc-border">
                <div className="p-2.5 rounded bg-mc-orange-10 border border-mc-orange text-mc-orange shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-medium text-mc-text-strong">
                    Guaranteed NDA & Confidentiality
                  </h4>
                  <p className="text-xs font-sans text-mc-text-secondary mt-0.5">
                    All submitted workflows, ideas, and data references are strictly confidential.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-mc-surface border border-mc-border">
                <div className="p-2.5 rounded bg-mc-orange-10 border border-mc-orange text-mc-orange shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-medium text-mc-text-strong">
                    Direct Email Contact
                  </h4>
                  <p className="text-xs font-mono text-mc-text-secondary mt-0.5">
                    inquiry@monolithcodes.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Component */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};
