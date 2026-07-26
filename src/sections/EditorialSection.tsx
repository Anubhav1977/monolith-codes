import React from 'react';

export const EditorialSection: React.FC = () => {
  return (
    <section className="py-24 bg-mc-surface-deep/40 border-b border-mc-border text-center">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="font-mono text-xs text-mc-orange uppercase tracking-widest mb-6">
          MC / OUR ENGINEERING THESIS
        </div>

        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-editorial italic text-mc-text-strong leading-snug mb-8">
          “Serious business software should feel constructed like architecture: structural, precise, quiet, and built to perform for years without breakdown.”
        </blockquote>

        <div className="flex flex-col items-center justify-center space-y-1 font-mono text-xs text-mc-text-secondary">
          <span className="text-mc-text-strong font-medium">MONOLITH CODES STUDIO DIRECTIVE</span>
          <span className="text-mc-text-tertiary">Production-Grade React • Zero Superficial Hype</span>
        </div>
      </div>
    </section>
  );
};
