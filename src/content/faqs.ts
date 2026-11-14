/** Home-page FAQ — rendered by FaqSection and emitted as FAQPage JSON-LD in the prerendered HTML. */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'architecture' | 'process' | 'ownership' | 'pricing';
}

export const HOME_FAQS: FaqItem[] = [
  {
    id: 'diff',
    question: 'How is MONOLITH CODES different from traditional digital agencies?',
    answer: 'Traditional agencies frequently re-sell pre-made templates, bloated WordPress themes, or offshore cookie-cutter workflows. MONOLITH CODES operates strictly as a custom software engineering studio. Every web application, SaaS platform, and internal system is custom engineered from first principles by senior engineers using production-grade React, TypeScript, and modern cloud architecture.',
    category: 'architecture',
  },
  {
    id: 'why-custom',
    question: 'Why do you build everything custom instead of using templates or drag-and-drop builders?',
    answer: 'Templates and page builders force your business logic into rigid pre-made boxes, tend to accumulate plugin bloat that slows pages down, and need constant plugin updates to stay secure. Custom engineering lets us build only what your business needs, tune performance against Google’s Core Web Vitals (LCP, INP and CLS), avoid third-party plugin dependencies, and design the software around your exact operational workflows.',
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
    question: 'What is your typical delivery timeline and how are estimates established?',
    answer: 'Estimated delivery timelines are provided with each package or proposal (e.g., 2–4 weeks for Launch web experiences; 6–10 weeks for Grow SaaS platforms; 10–16+ weeks for Build enterprise systems). The schedule depends on agreed scope, timely receipt of content and access, client feedback, approvals, and any third-party dependencies. Changes to scope may affect the timeline and will be communicated before proceeding.',
    category: 'process',
  },
  {
    id: 'payment-terms',
    question: 'How are payment arrangements and milestones structured?',
    answer: 'Payment terms are defined in your project proposal before work begins. Depending on the project, payments may be structured around an initial payment and agreed delivery milestones. The proposal will outline the applicable amounts, payment dates, and conditions. Development begins after the scope is approved and the agreed initial payment is received.',
    category: 'pricing',
  },
  {
    id: 'revisions-scope',
    question: 'How are revisions and scope changes managed during a project?',
    answer: 'Your proposal specifies the deliverables, included revisions, and project boundaries. Requests outside the agreed scope are assessed for their cost and timeline impact and approved before the additional work begins. Revisions to delivered work are defined separately from new features, new pages, or third-party integrations.',
    category: 'process',
  },
  {
    id: 'warranty-vs-maintenance',
    question: 'What is the distinction between warranty, maintenance, and new development?',
    answer: 'We maintain clear operational boundaries: Warranty covers the correction of covered defects in delivered work during the agreed post-launch period. Maintenance covers ongoing updates, uptime monitoring, security patches, and technical assistance explicitly included in a separate agreement. Additional development covers new features, enhancements, or modules outside the initial scope.',
    category: 'process',
  },
  {
    id: 'cancellations',
    question: 'How are cancellations and project adjustments handled?',
    answer: 'Cancellation terms are governed by your written client agreement. In the event of project termination, accounting covers completed work milestones and committed third-party expenses up to the termination date. Public website terms remain separate from the specific commercial terms in your proposal and SOW.',
    category: 'pricing',
  },
  {
    id: 'integrations',
    question: 'Can MONOLITH integrate with our existing legacy ERP, CRM, or custom database?',
    answer: 'Yes. A major part of our engineering practice involves building custom REST/GraphQL API bridges and middleware connectors between modern React frontends and legacy backends like SAP, NetSuite, Oracle, Salesforce, or proprietary SQL/NoSQL databases.',
    category: 'architecture',
  },
  {
    id: 'location',
    question: 'Where is MONOLITH CODES based, and do you work with international clients?',
    answer: 'MONOLITH CODES is a software engineering studio based in India. We work with clients across India and internationally, quoting in INR for Indian clients and USD for international clients, with the same engineering process, code quality and IP ownership terms for both.',
    category: 'process',
  },
];
