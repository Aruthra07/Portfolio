import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, ShieldCheck } from 'lucide-react';

interface TestimonialsProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Milestone {
  title: string;
  org: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

const MILESTONES: Milestone[] = [
  {
    title: 'CEO & Founder',
    org: 'DotEco',
    desc: 'Leading a green technology initiative focused on sustainable solutions, driving enterprise growth, managing strategic partnerships, and overseeing technical product development from ideation to launch.',
    icon: <Target className="w-8 h-8" />,
    color: 'text-green-400'
  },
  {
    title: 'Microsoft Learn Student Ambassador',
    org: 'Microsoft',
    desc: 'Empowering fellow students through technical workshops, Azure training sessions, and AI/ML seminars. Fostering a continuous learning environment within the campus ecosystem.',
    icon: <Star className="w-8 h-8" />,
    color: 'text-blue-400'
  },
  {
    title: 'AWS Cloud Community Member',
    org: 'Amazon Web Services',
    desc: 'Actively participating in AWS community programs. Mentoring peers in cloud architecture fundamentals and guiding them toward achieving foundational cloud certifications.',
    icon: <ShieldCheck className="w-8 h-8" />,
    color: 'text-orange-400'
  },
  {
    title: 'Oracle Community Participant',
    org: 'Oracle',
    desc: 'Engaged with Oracle technical forums, participating in discussions around enterprise cloud scaling, database management, and implementing Generative AI within business models.',
    icon: <Trophy className="w-8 h-8" />,
    color: 'text-red-400'
  }
];

export const Testimonials: React.FC<TestimonialsProps> = ({ playAudio }) => {
  return (
    <section id="leadership" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Professional Impact
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
          Leadership <span className="bg-gradient-main bg-clip-text text-transparent">Milestones</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Highlighting key community contributions, leadership roles, and ecosystem engagements across global tech networks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MILESTONES.map((milestone, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            key={idx}
            onMouseEnter={() => playAudio('hover')}
            className="glass-card p-8 rounded-3xl border border-glass-border flex flex-col group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className={`mb-6 flex gap-4 items-center ${milestone.color}`}>
              <div className="p-3 bg-white/5 rounded-2xl border border-glass-border group-hover:scale-110 transition-transform duration-300">
                {milestone.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-textPrimary">{milestone.title}</h3>
                <span className="text-xs font-bold uppercase tracking-wider">{milestone.org}</span>
              </div>
            </div>

            <p className="text-sm text-textSecondary leading-relaxed flex-1">
              {milestone.desc}
            </p>

            <div className="mt-6 pt-4 border-t border-glass-border">
              <span className="text-[10px] text-textMuted uppercase font-mono font-bold tracking-widest group-hover:text-accentCyan transition-colors">
                Verified Engagement
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
