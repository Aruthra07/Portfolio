import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Star, Users, Radio, Compass } from 'lucide-react';

interface ExperienceProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface TimelineItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

const EXPERIENCE_ITEMS: TimelineItem[] = [
  {
    id: 'ceo',
    role: 'Chief Executive Officer (CEO)',
    organization: 'DotEco',
    period: '2024 - Present',
    desc: "Leading DotEco's corporate roadmap, managing cross-functional student engineering teams, and hosting sustainable technology meetups.",
    icon: Star,
    tags: ['Leadership', 'Strategic Operations', 'Team Building', 'Sustainability']
  },
  {
    id: 'mlsa',
    role: 'Microsoft Learn Student Ambassador',
    organization: 'Microsoft Community',
    period: '2024 - Present',
    desc: 'Conducting campus webinars and hackathons, promoting Azure integrations, and tutoring peers on cloud fundamentals.',
    icon: Users,
    tags: ['Azure Cloud', 'Technical Speaking', 'Community Organizing']
  },
  {
    id: 'aws',
    role: 'AWS Community Advocate & Educator',
    organization: 'AWS Learning Community',
    period: '2024 - Present',
    desc: 'Fostering AWS Cloud advocacy, authoring instructional cheatsheets, and facilitating AWS certification study tracks.',
    icon: Compass,
    tags: ['AWS Cloud', 'Mentorship', 'Technical Content']
  },
  {
    id: 'oracle',
    role: 'Oracle Cloud & GenAI Member',
    organization: 'Oracle Community Ecosystem',
    period: '2024 - Present',
    desc: 'Contributing to OCI architecture forums and deploying serverless generative AI prototype pipelines.',
    icon: Radio,
    tags: ['OCI Cloud', 'Generative AI', 'System Pilots']
  },
  {
    id: 'academic',
    role: 'Academic Timeline (ECE Student)',
    organization: 'SNS College of Engineering',
    period: '2022 - Present',
    desc: 'Pursuing BE in Electronics & Communication. Fostering IoT systems, telemetry protocols, and database structures. CGPA: 8.8 / 10.',
    icon: Award,
    tags: ['ECE Core', 'IoT Sensors', '8.8 CGPA']
  }
];

export const Experience: React.FC<ExperienceProps> = ({ playAudio }) => {
  return (
    <section id="experience" className="py-16 px-6 md:px-12 max-w-5xl mx-auto relative z-10 w-full">
      <div className="flex flex-col mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accentBlue mb-2 font-sans">
          Professional Experience
        </span>
        <h2 className="text-3xl md:text-4xl font-black font-sora tracking-tight text-textPrimary">
          Leadership & Journey
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-3 leading-relaxed font-sans">
          Milestones across academic research, public cloud advocacy programs, and execution as DotEco CEO.
        </p>
      </div>

      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-8 md:pl-10 ml-4 md:ml-6 flex flex-col gap-8">
        {EXPERIENCE_ITEMS.map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
            key={item.id}
            onMouseEnter={() => playAudio('hover')}
            className="relative group cursor-default"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[45px] md:-left-[57px] top-1.5 w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 group-hover:border-accentBlue group-hover:bg-accentBlue flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-white transition-all duration-300 shadow-sm z-10">
              <item.icon className="w-3.5 h-3.5" />
            </div>

            {/* Timeline Content Card */}
            <div className="bg-bgSecondary p-5 rounded-2xl border border-borderSilver hover:shadow-md transition-all duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-2.5">
                <div>
                  <h3 className="text-base font-bold text-textPrimary group-hover:text-accentBlue transition-colors duration-300 tracking-tight font-sora">
                    {item.role}
                  </h3>
                  <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider mt-0.5 block">
                    {item.organization}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-bgPrimary border border-borderSilver text-[10px] font-bold text-textSecondary self-start md:self-auto font-mono">
                  <Calendar className="w-3 h-3 text-accentBlue" />
                  {item.period}
                </div>
              </div>

              <p className="text-xs md:text-sm text-textSecondary leading-relaxed mb-4 font-sans">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-bgPrimary border border-borderSilver text-[9px] font-bold text-textMuted tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
