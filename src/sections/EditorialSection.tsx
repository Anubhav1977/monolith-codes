import React from 'react';

interface EditorialSectionProps {
  label?: string;
  quote?: string;
  author?: string;
  subtitle?: string;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  label = 'MC / OUR ENGINEERING THESIS',
  quote = '“Serious business software should feel constructed like architecture: structural, precise, quiet, and built to perform for years without breakdown.”',
  author = 'MONOLITH CODES STUDIO DIRECTIVE',
  subtitle = 'Production-Grade React • Ground-up Custom Engineering',
}) => {
  return (
    <section className="py-28 bg-mc-surface-deep/40 border-b border-mc-border text-center">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="font-mono text-xs text-mc-orange uppercase tracking-widest mb-6">
          {label}
        </div>

        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-editorial italic text-mc-text-strong leading-snug mb-8">
          {quote}
        </blockquote>

        <div className="flex flex-col items-center justify-center space-y-1 font-mono text-xs text-mc-text-secondary">
          <span className="text-mc-text-strong font-medium">{author}</span>
          <span className="text-mc-text-tertiary">{subtitle}</span>
        </div>
      </div>
    </section>
  );
};
