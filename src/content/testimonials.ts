/**
 * Client quotes — confirmed real and approved for publication by the studio (Nov 2026).
 * Shown as visible content only: no Review / AggregateRating structured data (self-serving
 * reviews are not eligible for rich results and risk a manual action).
 *
 * TODO(owner): add the quoted person's name and role to each entry (with their permission);
 * named attribution is a strong trust / E-E-A-T signal.
 */
export interface TestimonialContent {
  id: string;
  quote: string;
  company: string;
  tagline: string;
  /** TODO(owner): person's name and role. */
  person: string | null;
}

export const TESTIMONIALS: TestimonialContent[] = [
  {
    id: 'niketana',
    quote:
      '“Monolith Codes rebuilt our entire online presence from scratch. The site finally feels as premium as our furniture, and the custom enquiry flow has brought in far more serious business leads than our old website ever did.”',
    company: 'Niketana',
    tagline: 'Modular Furniture Systems',
    person: null,
  },
  {
    id: 'fintech',
    quote:
      '“Our dashboard used to freeze at market open. The new telemetry pipeline handles thousands of live updates without a hiccup, and the team communicated clearly through every sprint.”',
    company: 'Fintech Startup',
    tagline: 'Financial Telemetry & Billing',
    person: null,
  },
  {
    id: 'estatepro',
    quote:
      '“They turned a rough idea into a polished mobile app. The property search, virtual tours and recommendations feel effortless — our early users keep praising how smooth the experience is.”',
    company: 'EstatePro',
    tagline: 'Real Estate Mobile App',
    person: null,
  },
  {
    id: 'renteasee',
    quote:
      '“RentEasee needed a platform that owners and tenants would both actually enjoy using. Monolith delivered dashboards, verified listings and direct owner contact exactly as we pictured — on time and rock solid.”',
    company: 'RentEasee',
    tagline: 'Rental Property Platform',
    person: null,
  },
  {
    id: 'hartwell',
    quote:
      '“The interactive 3D property experience set us apart overnight. Clients stay longer, explore every room and come to consultations already in love with the homes. Truly a premium result.”',
    company: 'Hartwell & Co.',
    tagline: 'Luxury Real Estate',
    person: null,
  },
];

export const getTestimonial = (id: string) => TESTIMONIALS.find((t) => t.id === id);
