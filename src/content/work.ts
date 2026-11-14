/**
 * Case studies — one record per approved project. Drives the homepage "Selected work" carousel,
 * /work, /work/<slug>, the sitemap, structured data, llms.txt and the Markdown mirrors.
 *
 * Content rules: only facts the studio has published or confirmed. The fintech client stays
 * unnamed. Items marked TODO(owner) need a fact from the studio; REVIEW(owner) marks copy written
 * from existing site content that the owner should proof-read.
 */

export interface CaseStudy {
  slug: string;
  /** Carousel label, e.g. "CASE / 01". */
  index: string;
  category: string;
  title: string;
  /** Short name for breadcrumbs, links and cards. */
  name: string;
  client: string;
  /** Client named publicly? (fintech client is not). */
  clientNamed: boolean;
  sector: string;
  /** Problem statement, when the studio has published one. */
  problem: string;
  /** Project description as published on the homepage. */
  solution: string;
  /** Feature list taken from the published description. */
  features: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  image?: { src: string; width: number; height: number; alt: string };
  /** Service pages this project demonstrates (slugs from src/content/services.ts). */
  services: string[];
  testimonialId: string;
  metaTitle: string;
  metaDescription: string;
  /** Facts the owner still has to confirm before they are treated as final. */
  ownerNotes: string[];
  updated: string;
}

const UPDATED = '2026-11-15';

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'niketana-modular-furniture-website',
    index: 'CASE / 01',
    // TODO(owner): the card says "E-COMMERCE" but no cart/checkout is described — confirm the label.
    category: 'CORPORATE WEBSITE & E-COMMERCE',
    title: 'Niketana Modular Furniture Website',
    name: 'Niketana',
    client: 'Niketana Furniture',
    clientNamed: true,
    sector: 'Modular office furniture',
    problem: '',
    solution:
      'A modern and premium website designed for Niketana Furniture, showcasing modular office furniture, workstations, and workspace solutions. Features an elegant UI, product categories, interactive project galleries, custom enquiry functionality, and a responsive browsing experience tailored for businesses.',
    features: [
      'Product categories for modular office furniture, workstations and workspace solutions',
      'Interactive project galleries',
      'Custom enquiry functionality for business buyers',
      'Responsive browsing experience across mobile, tablet and desktop',
    ],
    metrics: [],
    stack: ['React.js', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Cloudinary', 'REST API', 'Vercel'],
    image: { src: '/assets/work/niketana.webp', width: 960, height: 540, alt: 'Niketana modular furniture website — homepage design' },
    services: ['website-development'],
    testimonialId: 'niketana',
    metaTitle: 'Niketana Furniture Website Case Study | Monolith Codes',
    metaDescription:
      'How Monolith Codes built a custom React website for Niketana modular office furniture: product categories, project galleries and an enquiry flow. See the build.',
    ownerNotes: ['Confirm whether the project included e-commerce (cart/checkout) or a catalogue with enquiries.'],
    updated: UPDATED,
  },
  {
    slug: 'fintech-telemetry-billing-dashboard',
    index: 'CASE / 02',
    category: 'PRODUCT & SAAS ENGINEERING',
    title: 'High-Throughput Financial Telemetry & Billing Dashboard',
    name: 'Fintech telemetry dashboard',
    client: 'Fintech software startup (name withheld)',
    clientNamed: false,
    sector: 'Financial technology',
    problem:
      'Existing dashboard crashed under high concurrency during market open, causing customer churn and delayed metric updates.',
    solution:
      'Re-architected the frontend telemetry streaming pipeline using WebSockets and virtualized data tables capable of rendering 10,000+ live transactions per second.',
    features: [
      'Telemetry streaming pipeline re-architected around WebSockets',
      'Virtualised data tables that render 10,000+ live transactions per second',
      'Billing and metrics views that stay responsive at market open',
    ],
    metrics: [
      { label: 'Concurrency', value: '10k/sec' },
      { label: 'Latency', value: '18ms' },
      { label: 'Uptime', value: '99.99%' },
    ],
    stack: ['React', 'WebSockets', 'Tailwind v4', 'Node.js Gateway', 'TimescaleDB'],
    services: ['web-application-development', 'saas-development', 'erp-crm-development'],
    testimonialId: 'fintech',
    metaTitle: 'Fintech Telemetry Dashboard Case Study | Monolith Codes',
    metaDescription:
      'A fintech dashboard that froze at market open, rebuilt with WebSockets and virtualised tables: 10k transactions/sec, 18 ms latency, 99.99% uptime. Read more.',
    ownerNotes: ['TODO(owner): add a project image (anonymised screenshot) — currently a gradient placeholder.'],
    updated: UPDATED,
  },
  {
    slug: 'estatepro-real-estate-app',
    index: 'CASE / 03',
    category: 'MOBILE APP & REAL ESTATE',
    title: 'EstatePro Real Estate Mobile App',
    name: 'EstatePro',
    client: 'EstatePro',
    clientNamed: true,
    sector: 'Real estate',
    problem: '',
    // TODO(owner): confirm the listed features (virtual tours, AI recommendations, investment tools) shipped in the app.
    solution:
      'A modern real estate mobile application UI designed to simplify property buying, renting, and investment. Features include premium property listings, advanced search filters, detailed property views, virtual tours, AI-powered property recommendations, and investment tools, delivering a seamless property discovery experience.',
    features: [
      'Premium property listings with detailed property views',
      'Advanced search filters for buying, renting and investment',
      'Virtual tours',
      'AI-powered property recommendations',
      'Investment tools',
    ],
    metrics: [],
    stack: ['React Native', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Firebase Auth'],
    image: { src: '/assets/work/estatepro.webp', width: 960, height: 640, alt: 'EstatePro real estate mobile app — property listing screens' },
    services: ['mobile-app-development'],
    testimonialId: 'estatepro',
    metaTitle: 'EstatePro Real Estate App Case Study | Monolith Codes',
    metaDescription:
      'EstatePro: a cross-platform React Native real estate app with property listings, advanced search filters, virtual tours and recommendations. See the case study.',
    ownerNotes: ['Confirm virtual tours, AI recommendations and investment tools are live features, not design concepts.'],
    updated: UPDATED,
  },
  {
    slug: 'renteasee-rental-platform',
    index: 'CASE / 04',
    category: 'RENTAL PLATFORM & REAL ESTATE',
    title: 'RentEasee Rental Property Platform',
    name: 'RentEasee',
    client: 'RentEasee',
    clientNamed: true,
    sector: 'Property rentals',
    problem: '',
    solution:
      'A modern rental property platform designed to simplify the process of finding and renting homes. Features verified property listings, advanced search filters, tenant and owner dashboards, zero-brokerage options, direct owner communication, property management, and digital rental support with a seamless user experience.',
    features: [
      'Verified property listings with advanced search filters',
      'Separate tenant and owner dashboards',
      'Zero-brokerage options and direct owner communication',
      'Property management and digital rental support',
    ],
    metrics: [],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'JWT Auth', 'Tailwind CSS', 'Vercel'],
    image: { src: '/assets/work/renteasee.webp', width: 960, height: 540, alt: 'RentEasee rental property platform — listings and search' },
    services: ['web-application-development'],
    testimonialId: 'renteasee',
    metaTitle: 'RentEasee Rental Platform Case Study | Monolith Codes',
    metaDescription:
      'RentEasee: a rental property web platform with verified listings, tenant and owner dashboards and direct owner contact, built in React and Node.js. Read more.',
    ownerNotes: [],
    updated: UPDATED,
  },
  {
    slug: 'hartwell-3d-real-estate-website',
    index: 'CASE / 05',
    category: 'REAL ESTATE & 3D EXPERIENCE',
    title: 'Immersive 3D Real Estate Website',
    name: 'Hartwell & Co.',
    client: 'Hartwell & Co.',
    clientNamed: true,
    sector: 'Luxury real estate',
    problem: '',
    solution:
      'An immersive 3D real estate website featuring interactive property visualization, modern architectural design, and elegant UI/UX. Built to deliver a premium property browsing experience with detailed layouts, lifestyle-focused sections, and smooth navigation.',
    features: [
      'Interactive 3D property visualisation',
      'Detailed property layouts and lifestyle-focused sections',
      'Premium, architectural visual design with smooth navigation',
    ],
    metrics: [],
    // TODO(owner): stack lists PostgreSQL but no 3D library — confirm (e.g. Three.js / React Three Fiber).
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    image: { src: '/assets/work/hartwell.webp', width: 960, height: 540, alt: 'Hartwell & Co. immersive 3D real estate website' },
    services: ['website-development'],
    testimonialId: 'hartwell',
    metaTitle: 'Hartwell & Co. 3D Real Estate Website | Monolith Codes',
    metaDescription:
      'Hartwell & Co.: an immersive 3D real estate website with interactive property visualisation and detailed layouts, hand-coded in React. See the case study.',
    ownerNotes: ['Confirm the technology stack (3D library used).'],
    updated: UPDATED,
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
export const caseStudiesForService = (serviceSlug: string) => CASE_STUDIES.filter((c) => c.services.includes(serviceSlug));
