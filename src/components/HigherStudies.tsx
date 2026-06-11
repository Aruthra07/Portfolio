import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Languages, BookOpen, Search, Send, ShieldCheck } from 'lucide-react';

interface HigherStudiesProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface RoadmapStep {
  step: string;
  title: string;
  desc: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: React.ReactNode;
  tag: string;
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    step: '01',
    title: 'German Language Acquisition',
    desc: 'Actively preparing for A1/A2 level proficiency certification to enable smooth integration into German academic and professional cultures.',
    status: 'in-progress',
    icon: <Languages className="w-5 h-5 text-accentCyan" />,
    tag: 'A1/A2 Level'
  },
  {
    step: '02',
    title: 'IELTS Academic Preparation',
    desc: 'Targeting a band score of 7.5+ to satisfy language requirements for English-taught graduate business programmes.',
    status: 'in-progress',
    icon: <BookOpen className="w-5 h-5 text-accentPurple" />,
    tag: 'Target 7.5+'
  },
  {
    step: '03',
    title: 'Scholarship & Funding Research',
    desc: 'Shortlisting DAAD scholarship opportunities, regional sponsorships, and university-specific funding structures.',
    status: 'in-progress',
    icon: <Search className="w-5 h-5 text-accentBlue" />,
    tag: 'DAAD Opportunities'
  },
  {
    step: '04',
    title: 'SOP & LOR Portfolio Preparation',
    desc: 'Drafting Statements of Purpose and securing Letters of Recommendation highlighting ECE research publications and CEO leadership roles at DotEco.',
    status: 'upcoming',
    icon: <Send className="w-5 h-5 text-accentPink" />,
    tag: 'In Progress'
  },
  {
    step: '05',
    title: 'German University Applications',
    desc: 'Targeting public business universities offering MSc/MBA in Finance & Data Analytics (winter/summer intakes).',
    status: 'upcoming',
    icon: <GraduationCap className="w-5 h-5 text-yellow-400" />,
    tag: 'Target Intakes'
  },
  {
    step: '06',
    title: 'Visa Processing & Enrollment',
    desc: 'Opening blocked account, completing health insurance validations, and executing the final enrollment checklist.',
    status: 'upcoming',
    icon: <ShieldCheck className="w-5 h-5 text-green-400" />,
    tag: 'Final Milestone'
  }
];

export const HigherStudies: React.FC<HigherStudiesProps> = ({ playAudio }) => {
  return (
    <section id="higher-studies" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Future Vision
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
          MBA Roadmap &middot; <span className="bg-gradient-main bg-clip-text text-transparent">Germany</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Bridging East and West, business and engineering. Detail tracking of my roadmap to pursue an MBA in Finance & Data Analytics in Germany.
        </p>
      </div>

      {/* Target Goal Panel */}
      <div className="glass-card border border-glass-border p-6 md:p-8 rounded-3xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -left-10 -top-10 w-28 h-28 bg-accentPurple/20 blur-[30px] rounded-full" />
        
        <div>
          <span className="text-[10px] text-textMuted uppercase font-mono tracking-widest font-bold">Academic Objective</span>
          <h3 className="text-xl md:text-2xl font-black font-display text-textPrimary mt-1">
            MBA in Finance & Data Analytics
          </h3>
          <p className="text-xs md:text-sm text-textSecondary mt-1 leading-relaxed max-w-xl">
            Aiming to merge my solid foundational electronics engineering skills with corporate finance paradigms and big data statistical methodologies.
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-[#007b5b]/10 border border-[#007b5b]/30 text-green-400 font-display font-bold text-sm md:text-base flex items-center gap-2 select-none shadow-[0_0_15px_rgba(0,123,91,0.1)]">
          <svg className="w-5 h-3.5 rounded-sm flex-shrink-0" viewBox="0 0 5 3">
            <rect width="5" height="1" fill="#000" />
            <rect y="1" width="5" height="1" fill="#D00" />
            <rect y="2" width="5" height="1" fill="#FFCE00" />
          </svg>
          <span>Target Destination: Germany</span>
        </div>
      </div>

      {/* Steps Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROADMAP_STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onMouseEnter={() => playAudio('hover')}
            className={`glass-card p-6 md:p-7 rounded-3xl border flex flex-col justify-between group relative overflow-hidden ${
              step.status === 'in-progress'
                ? 'border-accentCyan/30 hover:border-accentCyan/50'
                : 'border-glass-border hover:border-glass-border'
            }`}
          >
            {/* Status bar marker */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 transition-transform duration-500 origin-left ${
                step.status === 'in-progress'
                  ? 'bg-accentCyan'
                  : 'bg-glass-border'
              }`}
            />

            <div>
              {/* Header: Step Number & Icon */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-3xl font-black font-mono text-textPrimary/10 group-hover:text-textPrimary/20 transition-colors">
                  {step.step}
                </span>
                <div className="p-2.5 bg-white/5 border border-glass-border rounded-xl">
                  {step.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold font-display text-textPrimary mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="text-xs text-textSecondary leading-relaxed mb-6">
                {step.desc}
              </p>
            </div>

            {/* Step Status Badge */}
            <div className="pt-4 border-t border-glass-border flex justify-between items-center text-[10px] font-mono">
              <span className="text-textMuted uppercase font-bold">STATUS</span>
              <span
                className={`px-2.5 py-0.5 rounded-full uppercase font-bold text-[9px] ${
                  step.status === 'completed'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : step.status === 'in-progress'
                    ? 'bg-accentCyan/10 text-accentCyan border border-accentCyan/20 animate-pulse'
                    : 'bg-white/5 text-textMuted border border-glass-border'
                }`}
              >
                {step.status.replace('-', ' ')}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
