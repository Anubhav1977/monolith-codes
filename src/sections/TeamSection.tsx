import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Code2,
  GitMerge,
  ShieldCheck,
  Users,
  Target,
  TrendingUp,
  Award,
  Zap,
  Handshake,
  HeartHandshake,
  ArrowUpRight,
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  competencies: {
    icon: React.ReactNode;
    title: string;
  }[];
}

const TEAM: TeamMember[] = [
  {
    id: 'anubhav',
    name: 'ANUBHAV GARG',
    role: 'FOUNDER & LEAD TECHNICAL ENGINEER',
    photo: '/assets/faces/founder_pp.png',
    bio: 'I lead architecture, engineering, and technical direction—turning complex ideas into scalable, high-performance software systems.',
    competencies: [
      {
        icon: <Cpu className="w-4 h-4 text-mc-orange" />,
        title: 'System Architecture',
      },
      {
        icon: <Code2 className="w-4 h-4 text-mc-orange" />,
        title: 'Product Engineering',
      },
      {
        icon: <GitMerge className="w-4 h-4 text-mc-orange" />,
        title: 'Technical Strategy',
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-mc-orange" />,
        title: 'Quality & Reliability',
      },
    ],
  },
  {
    id: 'ankit',
    name: 'ANKIT KUMAR',
    role: 'CO-FOUNDER & BUSINESS DIRECTOR',
    photo: '/assets/faces/cofounder_pp.png',
    bio: 'I connect business needs with the right technical solutions, manage client relationships, and ensure smooth project delivery from start to finish.',
    competencies: [
      {
        icon: <Users className="w-4 h-4 text-mc-orange" />,
        title: 'Client Relationships',
      },
      {
        icon: <Target className="w-4 h-4 text-mc-orange" />,
        title: 'Business Strategy',
      },
      {
        icon: <TrendingUp className="w-4 h-4 text-mc-orange" />,
        title: 'Growth & Partnerships',
      },
      {
        icon: <Award className="w-4 h-4 text-mc-orange" />,
        title: 'Project Success',
      },
    ],
  },
];

export const TeamSection: React.FC = () => {
  const scrollToInquiry = () => {
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="team" className="py-24 border-b border-mc-border bg-mc-bg relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-mc-orange-06 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 md:px-10 relative z-10">
        {/* Leadership overview: copy and both directors share one desktop row. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-16 items-stretch">
          <div className="md:col-span-2 lg:col-span-4 flex flex-col justify-between py-1 lg:pr-4">
            <div className="font-mono text-xs text-mc-orange uppercase tracking-wider flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-mc-orange" />
              <span>08 / THE PEOPLE BEHIND THE SYSTEMS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-sans font-medium text-mc-text-strong tracking-tight leading-[1.05]">
              THE PEOPLE <br className="hidden sm:block" />
              BEHIND <span className="text-mc-orange">THE SYSTEMS.</span>
            </h2>

            <p className="text-mc-text-body text-base lg:text-lg max-w-md mt-4 font-sans leading-relaxed">
              We&apos;re a founder-led studio. You work directly with the leaders who architect, build, and drive your software project forward.
            </p>
          </div>

          {TEAM.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 h-full rounded-lg border border-mc-border bg-mc-surface overflow-hidden shadow-xl hover:border-mc-border-strong transition-all duration-300 flex flex-col group"
            >
              {/* Photo Frame */}
              <div className="relative h-56 lg:h-48 xl:h-56 overflow-hidden bg-mc-surface-deep shrink-0">
                <img
                  src={member.photo}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-full object-cover object-[center_15%] filter contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Subtle dark vignette overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-mc-surface via-transparent to-transparent opacity-90" />

                {/* Badge Tag on Photo */}
                <div className="absolute top-4 left-4 bg-mc-bg/85 backdrop-blur-md border border-mc-border px-3 py-1.5 rounded-md font-mono text-[11px] text-mc-text-strong flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-mc-orange animate-pulse" />
                  <span>MONOLITH DIRECTORS</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  {/* Name & Role Header */}
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-mc-orange font-mono text-sm leading-none mt-1">•</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-sans font-medium text-mc-text-strong tracking-tight">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs text-mc-orange font-semibold tracking-wider uppercase mt-1">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <hr className="border-mc-border-soft my-3" />

                  {/* <p className="font-sans text-sm md:text-base text-mc-text-body leading-relaxed">
                    {member.bio}
                  </p> */}
                </div>

                {/* 4 Pillars / Competencies Grid */}
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-mc-text-tertiary mb-3">
                    Core Focus & Ownership
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {member.competencies.map((comp, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-md bg-mc-surface-deep border border-mc-border-soft hover:border-mc-border flex items-center gap-2 transition-colors"
                      >
                        {comp.icon}
                        <span className="font-sans font-medium text-xs text-mc-text-strong">
                          {comp.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner Card: ONE TEAM. ONE MISSION. YOUR SUCCESS. */}
        <div className="rounded-2xl border border-mc-border bg-mc-surface p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle Corner Markers */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-mc-orange/60 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-mc-orange/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-mc-orange/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-mc-orange/60 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-mc-border-soft pb-6 lg:pb-0 lg:pr-8">
              <div className="font-mono text-xs uppercase tracking-widest text-mc-text-tertiary">
                OUR COMMITMENT
              </div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-mc-text-strong tracking-tight">
                ONE TEAM. ONE MISSION. <br />
                <span className="text-mc-orange">YOUR SUCCESS.</span>
              </h3>
            </div>

            {/* Middle 3 Pillars */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-sans font-semibold text-mc-text-strong">
                  <Handshake className="w-4 h-4 text-mc-orange shrink-0" />
                  <span>Direct Access</span>
                </div>
                <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                  No layers. No handoffs. Just direct communication with the decision-makers.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-sans font-semibold text-mc-text-strong">
                  <HeartHandshake className="w-4 h-4 text-mc-orange shrink-0" />
                  <span>Aligned Ownership</span>
                </div>
                <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                  We treat your product with the exact same rigor as if it were our own.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-sans font-semibold text-mc-text-strong">
                  <Zap className="w-4 h-4 text-mc-orange shrink-0" />
                  <span>Fast & Focused</span>
                </div>
                <p className="text-xs font-sans text-mc-text-secondary leading-relaxed">
                  Small senior team. Sharp focus. Better decisions, faster results.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Ribbon inside the card */}
          <div className="mt-8 pt-6 border-t border-mc-border-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-mc-text-tertiary">
            <div className="flex items-center gap-2">
              <img
                src="/assets/brand/monolith-mark.png"
                alt="MONOLITH CODES"
                className="h-4 w-auto object-contain opacity-80"
              />
              <span className="font-semibold text-mc-text-secondary">MONOLITH CODES</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-mc-orange font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />
                FOUNDER-LED. BUILT TO LAST.
              </span>
              <button
                onClick={scrollToInquiry}
                className="hover:text-mc-orange flex items-center gap-1 cursor-pointer font-sans transition-colors"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
