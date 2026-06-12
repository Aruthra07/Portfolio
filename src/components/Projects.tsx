import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectsProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Project {
  id: string;
  num: string;
  title: string;
  desc: string;
  techs: string[];
  category: 'ai' | 'iot' | 'automation';
  github: string;
  demo: string;
  icon: React.ReactNode;
}

const PROJECTS: Project[] = [
  {
    id: 'hydro',
    num: '01',
    title: 'Smart Hydroponics System',
    desc: 'Automated soil-less farming solution integrating real-time environmental sensors and remote monitoring dashboards to optimize plant growth cycles — bridging environmental sustainability and smart IoT.',
    techs: ['IoT', 'Automation', 'Sensors', 'ESP32'],
    category: 'iot',
    github: 'https://github.com/Aruthra07/Smart-Hydroponics',
    demo: '#',
    icon: (
      <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M12 10a6 6 0 016-6M12 14a6 6 0 00-6-6M6 16a4 4 0 004 4M18 10a4 4 0 01-4 4" />
        <circle cx="12" cy="2" r="1.5" fill="currentColor" />
        <circle cx="6" cy="8" r="1.5" fill="currentColor" />
        <circle cx="18" cy="14" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'rfid',
    num: '02',
    title: 'RFID Smart Access Control',
    desc: 'Secure access logging system blending physical RFID authentication with biometric verification to manage security clearance thresholds for institutional environments.',
    techs: ['RFID', 'Embedded Systems', 'Security', 'C/C++'],
    category: 'iot',
    github: 'https://github.com/Aruthra07',
    demo: '#',
    icon: (
      <svg className="w-8 h-8 text-accentCyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <circle cx="12" cy="16" r="2" />
        <path d="M8 11V7a4 4 0 018 0v4M12 18v1" />
      </svg>
    )
  },
  {
    id: 'wear',
    num: '03',
    title: 'Innovation in Wearables',
    desc: 'Smart wearable safety prototype embedded with emergency distress triggers, real-time fall detection, and GPS tracing designed for vulnerable individuals.',
    techs: ['IoT', 'Wearables', 'Safety Systems', 'GPS'],
    category: 'iot',
    github: 'https://github.com/Aruthra07',
    demo: '#',
    icon: (
      <svg className="w-8 h-8 text-accentPurple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5.5 5.5l4.5 4.5M14 14l4.5 4.5" />
      </svg>
    )
  },
  {
    id: 'career',
    num: '04',
    title: 'AI Career Recommendation System',
    desc: 'Intelligent decision engine matching job seekers with tailored career paths based on their skill sets, baseline profiles, and historical corporate data metrics.',
    techs: ['Python', 'AI/ML', 'Data Analytics', 'Pandas'],
    category: 'ai',
    github: 'https://github.com/Aruthra07/AI-Career-Recommendation',
    demo: '#',
    icon: (
      <svg className="w-8 h-8 text-accentPink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 3a3 3 0 00-3 3c0 .8.3 1.5.8 2L11 11.8c-.5-.5-1.2-.8-2-.8a3 3 0 00-3 3c0 .8.3 1.5.8 2L3 21" />
        <circle cx="18" cy="4" r="2" fill="currentColor" />
        <circle cx="9" cy="12" r="2" fill="currentColor" />
        <circle cx="3" cy="21" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'form',
    num: '05',
    title: 'Automatic Form Filling Solution',
    desc: 'Workflow script utilizing browser orchestration models and N8N workflow automations to handle redundant database entries, saving manual efforts.',
    techs: ['Automation', 'N8N', 'Python', 'Web Scrape'],
    category: 'automation',
    github: 'https://github.com/Aruthra07/Automation-Workflows',
    demo: '#',
    icon: (
      <svg className="w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    )
  },
  {
    id: 'analytics',
    num: '06',
    title: 'AI Analytics Dashboard',
    desc: 'Interactive enterprise Business Intelligence dashboard presenting forecasting models, client trends, and real-time operations performance.',
    techs: ['Tableau', 'Python', 'Data Viz', 'SQL'],
    category: 'ai',
    github: 'https://github.com/Aruthra07/AI-Analytics-Dashboard',
    demo: '#',
    icon: (
      <svg className="w-8 h-8 text-accentBlue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6M3 20h18" />
        <circle cx="6" cy="14" r="1.5" fill="currentColor" />
        <circle cx="12" cy="4" r="1.5" fill="currentColor" />
        <circle cx="18" cy="10" r="1.5" fill="currentColor" />
      </svg>
    )
  }
];

const CATEGORIES = [
  { label: 'All Projects', value: 'all' },
  { label: 'AI & Data Science', value: 'ai' },
  { label: 'IoT & Hardware', value: 'iot' },
  { label: 'Workflow Automation', value: 'automation' }
];

export const Projects: React.FC<ProjectsProps> = ({ playAudio }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Work
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
          Featured <span className="bg-gradient-main bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Explore a curated selection of systems bridging physical engineering (IoT), data analytics dashboards, and neural network automations.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-10 border-b border-glass-border pb-5">
        {CATEGORIES.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              playAudio('click');
              setActiveFilter(tab.value);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeFilter === tab.value
                ? 'bg-gradient-main text-white shadow-lg'
                : 'bg-white/5 border border-glass-border text-textSecondary hover:text-textPrimary hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={project.id}
              onMouseEnter={() => playAudio('hover')}
              className="glass-card p-7 rounded-3xl border border-glass-border flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Bottom accent glow strip */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-glow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div>
                {/* Number & Big Icon */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl md:text-5xl font-black font-display text-accentCyan/15 select-none font-mono">
                    {project.num}
                  </span>
                  <span className="p-2 bg-white/5 rounded-2xl border border-glass-border select-none flex items-center justify-center">
                    {project.icon}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold font-display text-textPrimary mb-3 group-hover:text-accentCyan transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-textSecondary leading-relaxed mb-6">
                  {project.desc}
                </p>
              </div>

              {/* Technologies & Links */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techs.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[10px] md:text-xs font-bold rounded-lg bg-accentCyan/10 border border-accentCyan/20 text-accentCyan uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-glass-border">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-textSecondary hover:text-textPrimary transition-colors"
                  >
                    <i className="fab fa-github" /> Codebase
                  </a>
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-textSecondary hover:text-textPrimary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
