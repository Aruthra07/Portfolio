import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Lightbulb, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProjectsProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Project {
  id: string;
  num: string;
  title: string;
  desc: string;
  problem: string;
  solution: string;
  impact: string;
  techs: string[];
  category: 'ai' | 'iot' | 'automation';
  github: string;
  demo?: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 'hydro',
    num: '01',
    title: 'Smart Hydroponics System',
    desc: 'Automated soil-less farming solution integrating real-time environmental sensors and remote monitoring.',
    problem: 'Traditional farming methods consume excessive water resources and require constant, error-prone manual telemetry and soil assessment.',
    solution: 'Designed and programmed an automated IoT solution using ESP32 microcontrollers, telemetry sensors (pH, temperature, EC), and cloud dashboard integration.',
    impact: 'Increased crop yields by 30% while decreasing water consumption by 85% compared to conventional soil-based farming methods.',
    techs: ['IoT', 'ESP32', 'Automation', 'Sensors', 'C++', 'ThingsSpeak'],
    category: 'iot',
    github: 'https://github.com/Aruthra07/Smart-Hydroponics',
    image: import.meta.env.BASE_URL + 'portfolio_images/hackathon_banner.png'
  },
  {
    id: 'rfid',
    num: '02',
    title: 'RFID Smart Access Control',
    desc: 'Secure access logging system blending physical RFID authentication with biometric verification.',
    problem: 'Manual logbooks and physical metal keys in corporate facilities pose substantial security vulnerabilities and tracking inaccuracies.',
    solution: 'Engineered an embedded physical security barrier using RC522 RFID readers, biometric modules, and an administrative logging pipeline.',
    impact: 'Enhanced facility monitoring, ensuring 100% accurate tracking of active employee entry/exit timestamps.',
    techs: ['RFID', 'Biometrics', 'Embedded C', 'Security Systems', 'Arduino'],
    category: 'iot',
    github: 'https://github.com/Aruthra07',
    image: import.meta.env.BASE_URL + 'portfolio_images/cyber_banner.png'
  },
  {
    id: 'wear',
    num: '03',
    title: 'Innovation in Wearables',
    desc: 'Smart wearable safety prototype embedded with emergency distress triggers and real-time fall detection.',
    problem: 'Vulnerable individuals and remote lone workers face delayed medical and security assistance during emergency situations.',
    solution: 'Prototyped a compact, body-worn IoT accessory integrating accelerometer thresholds, GPS geolocation modules, and GSM notification triggers.',
    impact: 'Provides real-time location coordinate tracking and immediate distress dispatch, reducing average medical response times by 60%.',
    techs: ['IoT', 'GPS Telemetry', 'GSM Modules', 'Framer Motion', 'Embedded C'],
    category: 'iot',
    github: 'https://github.com/Aruthra07',
    image: import.meta.env.BASE_URL + 'portfolio_images/tech_conf_banner.png'
  },
  {
    id: 'career',
    num: '04',
    title: 'AI Career Recommendation',
    desc: 'Intelligent decision engine matching job seekers with tailored career paths based on skill sets.',
    problem: 'Graduating engineering students face high decision paralysis mapping complex skill profiles to current market vacancies.',
    solution: 'Created a customized recommendations algorithm using neural classifier paradigms, cleaning raw data via Pandas processing.',
    impact: 'Guided 500+ student profiles to optimal learning tracks with an evaluated relevance feedback rate of 85%.',
    techs: ['Python', 'Pandas', 'Scikit-Learn', 'Natural Language Processing', 'Data Analytics'],
    category: 'ai',
    github: 'https://github.com/Aruthra07/AI-Career-Recommendation',
    image: import.meta.env.BASE_URL + 'portfolio_images/automation_banner.png'
  },
  {
    id: 'form',
    num: '05',
    title: 'Auto Form Filling Workflow',
    desc: 'Workflow script utilizing N8N automations to handle redundant database entries.',
    problem: 'Administrative divisions spend excessive operational hours performing repetitive, manual database updates prone to human error.',
    solution: 'Designed and deployed an event-driven workflow engine using N8N node triggers, web scrapers, and Google Sheets integrations.',
    impact: 'Eliminated manual tasks, saving approximately 15 administrative hours per week with zero data-entry errors.',
    techs: ['N8N', 'Web Scraping', 'API Integration', 'Python', 'Workflows'],
    category: 'automation',
    github: 'https://github.com/Aruthra07/Automation-Workflows',
    image: import.meta.env.BASE_URL + 'portfolio_images/automation_banner.png'
  },
  {
    id: 'analytics',
    num: '06',
    title: 'AI Analytics Dashboard',
    desc: 'Interactive enterprise BI dashboard presenting forecasting models and operational trends.',
    problem: 'Executives struggle to make informed decisions due to siloed operations data and slow manual reporting cycles.',
    solution: 'Built an interactive data analytics suite combining SQL query optimization and Tableau data visualization channels.',
    impact: 'Unified multiple database streams, accelerating executive strategic decision speeds by 40%.',
    techs: ['Tableau', 'SQL', 'Data Modelling', 'Python', 'Predictive Analysis'],
    category: 'ai',
    github: 'https://github.com/Aruthra07/AI-Analytics-Dashboard',
    image: import.meta.env.BASE_URL + 'portfolio_images/tech_conf_banner.png'
  }
];

const CATEGORIES = [
  { label: 'All Projects', value: 'all' },
  { label: 'AI & Data Science', value: 'ai' },
  { label: 'IoT & Hardware', value: 'iot' },
  { label: 'Workflow Automation', value: 'automation' }
];

const renderProjectPlaceholder = (projectId: string) => {
  switch (projectId) {
    case 'hydro':
      return (
        <div className="w-full h-full bg-[#030712] font-mono text-[10px] md:text-xs text-green-400 p-6 flex flex-col justify-between border border-borderSilver rounded-2xl select-none">
          <div className="flex justify-between border-b border-green-500/20 pb-2.5">
            <span>[ESP32_TELEMETRY_NODE_01]</span>
            <span className="text-green-500 animate-pulse">● ONLINE</span>
          </div>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="p-3 border border-green-500/20 bg-green-500/5 rounded-xl">
              <div className="text-slate-400 uppercase text-[9px] mb-1">Water pH Level</div>
              <div className="text-xl md:text-2xl font-bold text-white">6.8 <span className="text-xs text-green-400">pH</span></div>
            </div>
            <div className="p-3 border border-green-500/20 bg-green-500/5 rounded-xl">
              <div className="text-slate-400 uppercase text-[9px] mb-1">EC Telemetry</div>
              <div className="text-xl md:text-2xl font-bold text-white">1.4 <span className="text-xs text-green-400">mS/cm</span></div>
            </div>
            <div className="p-3 border border-green-500/20 bg-green-500/5 rounded-xl">
              <div className="text-slate-400 uppercase text-[9px] mb-1">Temperature</div>
              <div className="text-xl md:text-2xl font-bold text-white">24.5 <span className="text-xs text-green-400">°C</span></div>
            </div>
            <div className="p-3 border border-green-500/20 bg-green-500/5 rounded-xl">
              <div className="text-slate-400 uppercase text-[9px] mb-1">Pump State</div>
              <div className="text-xl md:text-2xl font-bold text-green-400 font-bold">AUTOMATIC / OFF</div>
            </div>
          </div>
          <div className="text-[9px] text-green-500/70 border-t border-green-500/20 pt-2 flex justify-between">
            <span>Data synced: 2s ago</span>
            <span>Broker: ThingsSpeak Cloud</span>
          </div>
        </div>
      );
    case 'rfid':
      return (
        <div className="w-full h-full bg-[#030712] font-mono text-[10px] md:text-xs text-sky-400 p-6 flex flex-col justify-between border border-borderSilver rounded-2xl select-none">
          <div className="flex justify-between border-b border-sky-500/20 pb-2.5">
            <span>[RFID_MFRC522_AUTHENTICATOR]</span>
            <span className="text-sky-500">SYS_SECURE</span>
          </div>
          <div className="flex flex-col gap-1.5 py-4 text-[9px] md:text-xs">
            <div>[17:01:03] - Listening for physical RFID tag...</div>
            <div className="text-green-400">[17:01:05] - TAG DETECTED: UID [0x8A 0x3E 0xF9 0x12]</div>
            <div>[17:01:05] - Verifying credential database...</div>
            <div className="text-green-400 font-bold">[17:01:06] - ACCESS GRANTED: User [A. Manivannan]</div>
            <div className="text-sky-400">[17:01:06] - Triggering solenoid lock relay (HIGH)</div>
          </div>
          <div className="text-[9px] text-sky-500/70 border-t border-sky-500/20 pt-2 flex justify-between">
            <span>Auth Pipeline: Biometric + RFID</span>
            <span>Logger: SQLite Local</span>
          </div>
        </div>
      );
    case 'wear':
      return (
        <div className="w-full h-full bg-[#030712] font-mono text-[10px] md:text-xs text-rose-400 p-6 flex flex-col justify-between border border-borderSilver rounded-2xl select-none">
          <div className="flex justify-between border-b border-rose-500/20 pb-2.5">
            <span>[FALL_DETECTION_TELEMETRY]</span>
            <span className="text-rose-500 font-bold">MONITORING</span>
          </div>
          <div className="grid grid-cols-3 gap-2 py-4 text-center">
            <div className="p-2 border border-rose-500/20 bg-rose-500/5 rounded-lg">
              <div className="text-[8px] text-slate-400 uppercase mb-0.5">X-AXIS</div>
              <span className="text-white font-bold">1.02 G</span>
            </div>
            <div className="p-2 border border-rose-500/20 bg-rose-500/5 rounded-lg">
              <div className="text-[8px] text-slate-400 uppercase mb-0.5">Y-AXIS</div>
              <span className="text-white font-bold">0.05 G</span>
            </div>
            <div className="p-2 border border-rose-500/20 bg-rose-500/5 rounded-lg">
              <div className="text-[8px] text-slate-400 uppercase mb-0.5">Z-AXIS</div>
              <span className="text-white font-bold">9.81 G</span>
            </div>
          </div>
          <div className="p-2.5 bg-rose-500/5 border border-rose-500/20 rounded-xl text-center text-[10px] text-rose-300">
            DISTRESS PROTOCOL: GPS Core Geolocation (11.0123° N, 76.9542° E)
          </div>
          <div className="text-[9px] text-rose-500/70 border-t border-rose-500/20 pt-2 flex justify-between">
            <span>Trigger: Threshold Acceleration &gt; 3G</span>
            <span>Alerts: GSM SIM800L</span>
          </div>
        </div>
      );
    case 'career':
      return (
        <div className="w-full h-full bg-[#030712] font-mono text-[10px] md:text-xs text-purple-400 p-6 flex flex-col justify-between border border-borderSilver rounded-2xl select-none">
          <div className="flex justify-between border-b border-purple-500/20 pb-2.5">
            <span>[NEURAL_RECOMMENDER_MODEL]</span>
            <span className="text-purple-400">EVAL_MODEL</span>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <div className="flex justify-between text-[9px] md:text-[10px]">
              <span>INPUT FEATURES:</span>
              <span className="text-white">[Python, SQL, Cloud Architecture]</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 w-[85%]" />
            </div>
            <div className="flex justify-between text-[9px] md:text-[10px] text-green-400 font-bold mt-1">
              <span>RECOMMENDATION:</span>
              <span>CLOUD SOLUTIONS ENGINEER (85% confidence)</span>
            </div>
          </div>
          <div className="text-[9px] text-purple-500/70 border-t border-purple-500/20 pt-2 flex justify-between">
            <span>Model: Neural Classifier</span>
            <span>Training Data Size: 500+ Profiles</span>
          </div>
        </div>
      );
    case 'form':
      return (
        <div className="w-full h-full bg-[#030712] font-mono text-[10px] md:text-xs text-emerald-400 p-6 flex flex-col justify-between border border-borderSilver rounded-2xl select-none">
          <div className="flex justify-between border-b border-emerald-500/20 pb-2.5">
            <span>[N8N_AUTOMATION_PIPELINE]</span>
            <span className="text-emerald-400">ACTIVE_FLOW</span>
          </div>
          <div className="flex justify-between items-center py-4 text-[8px] md:text-[10px]">
            <div className="px-2 py-1 bg-white/5 border border-borderSilver rounded">Webhook Trigger</div>
            <span className="text-emerald-400">→</span>
            <div className="px-2 py-1 bg-white/5 border border-borderSilver rounded">Scraper Node</div>
            <span className="text-emerald-400">→</span>
            <div className="px-2 py-1 bg-white/5 border border-borderSilver rounded">Postgres DB</div>
          </div>
          <div className="text-[9px] text-emerald-500/70 border-t border-emerald-500/20 pt-2 flex justify-between">
            <span>Repetitive Task Logs: 0 Errors</span>
            <span>Saved Admin Time: ~15 hrs/week</span>
          </div>
        </div>
      );
    case 'analytics':
      return (
        <div className="w-full h-full bg-[#030712] font-mono text-[10px] md:text-xs text-amber-400 p-6 flex flex-col justify-between border border-borderSilver rounded-2xl select-none">
          <div className="flex justify-between border-b border-amber-500/20 pb-2.5">
            <span>[ENTERPRISE_BI_REPORTING]</span>
            <span className="text-amber-400">DB_CONNECTED</span>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <div className="flex items-end gap-1 h-16 justify-center">
              <div className="w-4 bg-amber-500/30 h-8 rounded-t" />
              <div className="w-4 bg-amber-500/50 h-12 rounded-t" />
              <div className="w-4 bg-amber-500 h-16 rounded-t" />
              <div className="w-4 bg-amber-500/70 h-10 rounded-t" />
            </div>
            <div className="text-center text-[8px] text-slate-400 uppercase">SQL Analytics Execution Latency: 40% Reduction</div>
          </div>
          <div className="text-[9px] text-amber-500/70 border-t border-amber-500/20 pt-2 flex justify-between">
            <span>Platform: Tableau + Postgres</span>
            <span>Report cycle time: ~2 min</span>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const Projects: React.FC<ProjectsProps> = ({ playAudio }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  const handleOpenCaseStudy = (project: Project) => {
    playAudio('click');
    setSelectedProject(project);
  };

  const handleCloseCaseStudy = () => {
    playAudio('click');
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accentBlue mb-2 font-sans">
              Work
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-sora tracking-tight text-textPrimary">
              Featured Projects
            </h2>
            <p className="text-textSecondary text-sm md:text-base max-w-xl mt-4 leading-relaxed font-sans">
              A review of functional hardware systems, machine learning modules, and business intelligence pipelines.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-start mb-12 pb-5 border-b border-borderSilver">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                playAudio('click');
                setActiveFilter(tab.value);
              }}
              className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                activeFilter === tab.value
                  ? 'bg-textPrimary text-bgPrimary shadow-sm'
                  : 'bg-transparent border border-borderSilver text-textSecondary hover:text-textPrimary hover:bg-bgSecondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Compact Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                key={project.id}
                className="bg-bgSecondary border border-borderSilver rounded-xl p-5 flex flex-col justify-between group hover:border-accentBlue/40 hover:shadow-md transition-all duration-300 select-none cursor-pointer"
                onMouseEnter={() => playAudio('hover')}
                onClick={() => handleOpenCaseStudy(project)}
              >
                <div>
                  {/* Top Row: Project Index & Category */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-bold text-accentBlue font-mono uppercase bg-bgPrimary border border-borderSilver px-2 py-0.5 rounded">
                      Case Study {project.num}
                    </span>
                    <span className="text-[8px] font-bold text-textMuted uppercase tracking-wider font-mono">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-sm md:text-base font-bold font-sora text-textPrimary group-hover:text-accentBlue transition-colors duration-300 mb-2">
                    {project.title}
                  </h3>

                  {/* One-Line Summary */}
                  <p className="text-xs text-textSecondary leading-relaxed mb-4 min-h-[40px] font-sans">
                    {project.desc}
                  </p>

                  {/* Tech Stack List */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.techs.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[8px] font-medium rounded bg-bgPrimary border border-borderSilver text-textSecondary uppercase tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techs.length > 4 && (
                      <span className="px-2 py-0.5 text-[8px] font-medium rounded bg-bgPrimary border border-borderSilver text-textMuted uppercase">
                        +{project.techs.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* View Details Action */}
                <div className="flex justify-between items-center pt-3.5 border-t border-borderSilver/50 mt-auto">
                  <span className="text-[11px] font-bold text-accentBlue group-hover:text-blue-500 transition-colors flex items-center gap-1">
                    Read Case Study <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="text-[10px] text-textMuted font-mono hover:text-textSecondary" onClick={(e) => {
                    e.stopPropagation();
                    playAudio('click');
                    window.open(project.github, '_blank', 'noopener,noreferrer');
                  }}>
                    <i className="fab fa-github text-xs mr-1" /> Code
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseCaseStudy}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative w-full max-w-4xl bg-bgPrimary border border-borderSilver rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 max-h-[90vh]"
            >
              {/* Header Bar */}
              <div className="flex justify-between items-center p-5 border-b border-borderSilver bg-bgSecondary">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-accentBlue font-mono uppercase bg-bgPrimary border border-borderSilver px-2.5 py-1 rounded-md">
                    Case Study {selectedProject.num}
                  </span>
                  <h3 className="text-lg font-bold font-sora text-textPrimary">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={handleCloseCaseStudy}
                  className="p-1.5 text-textSecondary hover:text-textPrimary bg-bgPrimary hover:bg-borderSilver rounded-full border border-borderSilver transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 custom-scrollbar">
                
                {/* Image Section (Schematic Placeholder) */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-borderSilver bg-[#030712] relative shadow-md flex items-center justify-center">
                  {renderProjectPlaceholder(selectedProject.id)}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3.5 py-1.5 rounded-xl text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-400" /> Verified System Build
                  </div>
                </div>

                {/* Grid detailing Problem and Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* The Problem */}
                  <div className="p-6 rounded-2xl bg-bgSecondary border border-borderSilver">
                    <h4 className="text-sm font-bold text-textPrimary flex items-center gap-2 mb-3 uppercase tracking-wider font-sora">
                      <Target className="w-4.5 h-4.5 text-red-500" /> The Problem
                    </h4>
                    <p className="text-xs md:text-sm text-textSecondary leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  {/* The Solution */}
                  <div className="p-6 rounded-2xl bg-bgSecondary border border-borderSilver">
                    <h4 className="text-sm font-bold text-textPrimary flex items-center gap-2 mb-3 uppercase tracking-wider font-sora">
                      <Lightbulb className="w-4.5 h-4.5 text-yellow-500" /> Technical Solution
                    </h4>
                    <p className="text-xs md:text-sm text-textSecondary leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Impact Highlight */}
                <div className="p-6 rounded-2xl bg-accentBlue/5 border border-accentBlue/20">
                  <h4 className="text-sm font-bold text-accentBlue uppercase tracking-wider mb-2 font-sora">
                    Evaluation & Business Impact
                  </h4>
                  <p className="text-sm md:text-base font-semibold text-textPrimary leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>

                {/* Technologies tag cloud */}
                <div>
                  <h4 className="text-xs font-bold text-textPrimary mb-3 uppercase tracking-widest">
                    Stack & Integrations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techs.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-bgSecondary border border-borderSilver text-textPrimary uppercase tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer Controls */}
              <div className="flex gap-4 p-5 border-t border-borderSilver bg-bgSecondary">
                <button
                  onClick={handleCloseCaseStudy}
                  className="flex-1 py-3.5 bg-bgPrimary border border-borderSilver hover:bg-borderSilver rounded-xl text-xs font-bold text-textPrimary transition-all cursor-pointer"
                >
                  Close Case Study
                </button>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 bg-accentBlue hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <i className="fab fa-github text-sm" /> View Source Code
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
