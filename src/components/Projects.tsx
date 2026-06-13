import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Target, Lightbulb, Image as ImageIcon } from 'lucide-react';

interface ProjectsProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Project {
  id: string;
  num: string;
  title: string;
  desc: string;
  impact: string;
  problem: string;
  techs: string[];
  category: 'ai' | 'iot' | 'automation';
  github: string;
  demo: string;
  icon: React.ReactNode;
  gallery: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'hydro',
    num: '01',
    title: 'Smart Hydroponics System',
    desc: 'Automated soil-less farming solution integrating real-time environmental sensors and remote monitoring dashboards.',
    impact: 'Increased crop yield by 30% while reducing water consumption by 85% compared to traditional farming.',
    problem: 'Traditional farming methods consume excessive water and require constant manual monitoring.',
    techs: ['IoT', 'Automation', 'Sensors', 'ESP32'],
    category: 'iot',
    github: 'https://github.com/Aruthra07/Smart-Hydroponics',
    demo: '#',
    gallery: [
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1530836369250-ef71a3f5e4bf?auto=format&fit=crop&q=80&w=800'
    ],
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
    desc: 'Secure access logging system blending physical RFID authentication with biometric verification.',
    impact: 'Enhanced facility security monitoring with 100% accurate tracking of personnel entry and exit times.',
    problem: 'Manual logbooks are prone to errors and physical keys pose security risks when lost.',
    techs: ['RFID', 'Embedded Systems', 'Security', 'C/C++'],
    category: 'iot',
    github: 'https://github.com/Aruthra07',
    demo: '#',
    gallery: [
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
    ],
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
    desc: 'Smart wearable safety prototype embedded with emergency distress triggers and real-time fall detection.',
    impact: 'Provides real-time location tracking and immediate emergency alerts, reducing response times by 60%.',
    problem: 'Vulnerable individuals face significant risks during medical emergencies or when traveling alone.',
    techs: ['IoT', 'Wearables', 'Safety Systems', 'GPS'],
    category: 'iot',
    github: 'https://github.com/Aruthra07',
    demo: '#',
    gallery: [
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1574406280735-351fc1a7c5e0?auto=format&fit=crop&q=80&w=800'
    ],
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
    title: 'AI Career Recommendation',
    desc: 'Intelligent decision engine matching job seekers with tailored career paths based on skill sets.',
    impact: 'Helped 500+ students identify optimal career paths, boasting an 85% relevance satisfaction rate.',
    problem: 'Students often struggle to map their current skills to viable industry career trajectories.',
    techs: ['Python', 'AI/ML', 'Data Analytics', 'Pandas'],
    category: 'ai',
    github: 'https://github.com/Aruthra07/AI-Career-Recommendation',
    demo: '#',
    gallery: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    ],
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
    title: 'Auto Form Filling Workflow',
    desc: 'Workflow script utilizing N8N automations to handle redundant database entries.',
    impact: 'Saved approximately 15 hours of manual data entry per week for administrative teams.',
    problem: 'Repetitive data entry tasks lead to human error and waste valuable operational time.',
    techs: ['Automation', 'N8N', 'Python', 'Web Scrape'],
    category: 'automation',
    github: 'https://github.com/Aruthra07/Automation-Workflows',
    demo: '#',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    ],
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
    desc: 'Interactive enterprise BI dashboard presenting forecasting models and operational trends.',
    impact: 'Improved decision-making speed by 40% through centralized, real-time data visualization.',
    problem: 'Siloed data streams make it difficult for executives to grasp real-time company performance.',
    techs: ['Tableau', 'Python', 'Data Viz', 'SQL'],
    category: 'ai',
    github: 'https://github.com/Aruthra07/AI-Analytics-Dashboard',
    demo: '#',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    ],
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
              Work
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
              Featured <span className="bg-gradient-main bg-clip-text text-transparent">Projects</span>
            </h2>
          </div>
          <div className="flex gap-4 items-center justify-center md:justify-end">
            <div className="px-4 py-2 rounded-2xl bg-bgSecondary border border-glass-border flex flex-col items-center">
              <span className="text-xl font-black text-accentCyan">15+</span>
              <span className="text-[10px] uppercase font-bold text-textSecondary">Projects</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-bgSecondary border border-glass-border flex flex-col items-center">
              <span className="text-xl font-black text-accentPurple">15+</span>
              <span className="text-[10px] uppercase font-bold text-textSecondary">Repositories</span>
            </div>
          </div>
        </div>
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
              onClick={() => {
                playAudio('click');
                setSelectedProject(project);
              }}
              onMouseEnter={() => playAudio('hover')}
              className="glass-card p-7 rounded-3xl border border-glass-border flex flex-col justify-between group relative overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
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
                <p className="text-xs md:text-sm text-textSecondary leading-relaxed mb-6 line-clamp-3">
                  {project.desc}
                </p>
              </div>

              {/* Technologies & Links */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techs.slice(0,3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[10px] md:text-xs font-bold rounded-lg bg-bgSecondary border border-glass-border text-textPrimary uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techs.length > 3 && (
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-bgSecondary border border-glass-border text-textMuted uppercase">
                      +{project.techs.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-glass-border">
                  <button
                    className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-textPrimary transition-colors flex items-center justify-center gap-2"
                  >
                    View Details <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playAudio('click');
                setSelectedProject(null);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-bgPrimary border border-glass-border rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 w-full max-w-4xl max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-glass-border bg-bgSecondary/50">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded-xl border border-glass-border">
                    {selectedProject.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-display text-textPrimary">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    playAudio('click');
                    setSelectedProject(null);
                  }}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-glass-border"
                >
                  <X className="w-5 h-5 text-textPrimary" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                {/* Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {selectedProject.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-glass-border group">
                      <img src={img} alt="Project screenshot" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" /> Screenshot
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Col: Details */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-accentCyan flex items-center gap-2 mb-2 uppercase tracking-wider">
                        <Target className="w-4 h-4" /> The Problem
                      </h4>
                      <p className="text-textSecondary text-sm leading-relaxed">
                        {selectedProject.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-accentPurple flex items-center gap-2 mb-2 uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4" /> Project Impact
                      </h4>
                      <p className="text-textPrimary font-medium text-sm leading-relaxed">
                        {selectedProject.impact}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-textPrimary mb-3 uppercase tracking-wider">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techs.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/5 border border-glass-border text-textPrimary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Col: Actions */}
                  <div className="flex flex-col gap-4">
                    <div className="bg-bgSecondary p-6 rounded-2xl border border-glass-border">
                      <h4 className="text-sm font-bold text-textPrimary mb-4">Project Links</h4>
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-white/5 hover:bg-white/10 border border-glass-border rounded-xl text-sm font-bold text-textPrimary flex items-center justify-center gap-2 transition-all mb-3"
                      >
                      <div className="w-4 h-4 flex items-center justify-center"><i className="fab fa-github text-base" /></div> View Source Code
                      </a>
                      {selectedProject.demo !== '#' && (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-gradient-main text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accentPurple/25 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Demonstration
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
