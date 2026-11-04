import React from 'react';
import { ScrollMarquee } from '@/components/ScrollMarquee';

interface EditorialSectionProps {
  label?: string;
  quote?: string;
  author?: string;
  subtitle?: string;
  headline?: string;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  label = 'MC / OUR ENGINEERING THESIS',
  quote = '“Serious business software should feel constructed like architecture: structural, precise, quiet, and built to perform for years without breakdown.”',
  author = 'MONOLITH CODES STUDIO DIRECTIVE',
  subtitle = 'Production-Grade React • Ground-up Custom Engineering',
  headline = 'Custom engineered. Never templated.',
}) => (
  <ScrollMarquee
    text={headline}
    label={label}
    caption={quote}
    byline={`${author} — ${subtitle}`}
  />
);
