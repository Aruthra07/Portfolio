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
  icon: React.ReactNode;
  tags: string[];
}

const EXPERIENCE_ITEMS: TimelineItem[] = [
  {
    id: 'ceo',
    role: 'Chief Executive Officer (CEO)',
    organization: 'DotEco',
    period: '2024 - Present',
    desc: 'Leading DotEco, orchestrating overall organization strategy, managing cross-functional technical teams, coordinating environmental sustainability projects, and hosting networking workshops.',
    icon: <Star className="w-5 h-5" />,
    tags: ['Leadership', 'Strategic Vision', 'Team Building', 'Event Coordination', 'Sustainability']
  },
  {
    id: 'mlsa',
    role: 'Microsoft Learn Student Ambassador',
    organization: 'Microsoft Community',
    period: '2024 - Present',
    desc: 'Conducting campus webinars and hackathons, promoting Microsoft Azure technologies, and tutoring student peers on cloud fundamentals and software development integrations.',
    icon: <Users className="w-5 h-5" />,
    tags: ['Azure Cloud', 'Technical Speaking', 'Community Organizing', 'Webinars']
  },
  {
    id: 'aws',
    role: 'AWS Community Advocate & Educator',
    organization: 'AWS Learning Community',
    period: '2024 - Present',
    desc: 'Actively participating in AWS Cloud advocacy events, writing instructional material for peers, and facilitating study tracks for Solutions Architect certifications.',
    icon: <Compass className="w-5 h-5" />,
    tags: ['AWS Cloud', 'Mentorship', 'Technical Content', 'AWS Architectures']
  },
  {
    id: 'oracle',
    role: 'Oracle Cloud & GenAI Member',
    organization: 'Oracle Community Ecosystem',
    period: '2024 - Present',
    desc: 'Contributing to technical discussions surrounding Oracle Cloud Infrastructure (OCI) architectures, and deploying pilot enterprise pipelines using OCI Generative AI PROFESSIONAL suites.',
    icon: <Radio className="w-5 h-5" />,
    tags: ['OCI Cloud', 'Generative AI Professional', 'Enterprise DB', 'System Pilots']
  },
  {
    id: 'academic',
    role: 'Academic Timeline (ECE Student)',
    organization: 'SNS College of Engineering',
    period: '2022 - Present',
    desc: 'Pursuing Bachelor of Engineering in Electronics & Communication. Fostered deep understanding of circuit design, IoT systems, telemetry protocols, and data structures. Maintaining a CGPA of 8.8 / 10.',
    icon: <Award className="w-5 h-5" />,
    tags: ['ECE Core', 'Signal Telemetry', 'IoT Sensors', '8.8 CGPA']
  }
];

export const Experience: React.FC<ExperienceProps> = ({ playAudio }) => {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-14 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Professional Experience
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white">
          Leadership & <span className="bg-gradient-main bg-clip-text text-transparent">Journey</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Tracking major academic milestones, global cloud advocate programs, and corporate execution as DotEco CEO.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative border-l border-glass-border pl-6 md:pl-10 ml-4 md:ml-8 flex flex-col gap-12">
        {EXPERIENCE_ITEMS.map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            key={item.id}
            onMouseEnter={() => playAudio('hover')}
            className="relative"
          >
            {/* Pulsing Timeline Node Dot */}
            <div className="absolute -left-[39px] md:-left-[55px] top-1.5 w-6 h-6 rounded-full bg-gradient-main border border-bgPrimary flex items-center justify-center text-white text-[10px] shadow-[0_0_15px_rgba(139,92,246,0.6)]">
              {item.icon}
            </div>

            {/* Content Glass Card */}
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-glass-border hover:border-accentPurple/40 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-display text-white">
                    {item.role}
                  </h3>
                  <span className="text-xs md:text-sm font-bold text-accentCyan uppercase tracking-widest font-sans mt-0.5 block">
                    {item.organization}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-glass-border text-xs text-textSecondary font-mono self-start md:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-accentPurple" />
                  {item.period}
                </div>
              </div>

              <p className="text-xs md:text-sm text-textSecondary leading-relaxed mb-5">
                {item.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-glass-border text-[10px] md:text-xs font-semibold text-textSecondary"
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
