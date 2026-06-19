import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Users, Mic, Terminal, ChartLine } from 'lucide-react';

interface SkillsExpertiseProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface ExpertiseCard {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  technologies: string[];
  achievements: string[];
}

const EXPERTISE_CARDS: ExpertiseCard[] = [
  {
    id: 'tech_ai',
    title: 'Technology & AI',
    desc: 'Architecting neural networks, building large language model pipelines, and deploying interactive AI agents.',
    icon: <Cpu className="w-6 h-6 text-purple-500" />,
    technologies: ['Python', 'Generative AI', 'TensorFlow', 'OpenAI API', 'HuggingFace', 'Machine Learning'],
    achievements: [
      'Built intelligent semantic search algorithms and customized vector embedding search engines.',
      'Developed autonomous multi-agent workflows using LLM orchestration APIs.',
      'Published ECE technical research on AI and smart telemetry systems.'
    ]
  },
  {
    id: 'cloud_auto',
    title: 'Cloud & Automation',
    desc: 'Designing highly scalable cloud infrastructure and serverless workflow automation pipelines.',
    icon: <Cloud className="w-6 h-6 text-blue-500" />,
    technologies: ['AWS Cloud', 'Microsoft Azure', 'Oracle Cloud', 'N8N', 'Docker', 'Vite'],
    achievements: [
      'Architected secure OCI and AWS serverless infrastructures saving 15+ hours weekly.',
      'Deployed automated API integrations and webhook listeners with N8N.',
      'Facilitated cloud workshops helping peers prepare for AWS Cloud Practitioner credentials.'
    ]
  },
  {
    id: 'lead_comm',
    title: 'Leadership & Community',
    desc: 'Orchestrating organizational development, community events, and cross-functional student engineering teams.',
    icon: <Users className="w-6 h-6 text-emerald-500" />,
    technologies: ['Team Building', 'Strategic Operations', 'Event Coordination', 'Agile Operations', 'Mentorship'],
    achievements: [
      'Served as Chief Executive Officer (CEO) of DotEco sustainability initiative.',
      'Led local developer groups as Beta-tier Microsoft Learn Student Ambassador.',
      'Coordinated security bootcamps and Figma DesignSprint workshops for 100+ students.'
    ]
  },
  {
    id: 'public_speak',
    title: 'Public Speaking',
    desc: 'Evangelizing cutting-edge technologies, presenting keynotes, and hosting technical bootcamps.',
    icon: <Mic className="w-6 h-6 text-orange-500" />,
    technologies: ['Technical Presentations', 'Keynote Delivery', 'Webinar Hosting', 'Peer Tutoring', 'Communications'],
    achievements: [
      'Invited speaker and workshop host across 5+ regional technology events.',
      'Delivered Azure AI and cloud infrastructure webinars to large student cohorts.',
      'Fostered peer training structures for electronics and system engineering.'
    ]
  },
  {
    id: 'content_creation',
    title: 'Content Creation',
    desc: 'Writing comprehensive developer guides, technical documentation, and translating complex concepts.',
    icon: <Terminal className="w-6 h-6 text-pink-500" />,
    technologies: ['Technical Writing', 'Documentation', 'Figma Prototyping', 'Markdown Systems', 'Canva'],
    achievements: [
      'Authored instructional tutorials and cheatsheets for cloud engineering study tracks.',
      'Documented complete API specifications and architecture diagrams for open-source builds.',
      'Designed executive visual layouts, slide decks, and digital newsletters.'
    ]
  },
  {
    id: 'data_analytics',
    title: 'Data & Analytics',
    desc: 'Transforming database queries into interactive dashboards and predictive business intelligence.',
    icon: <ChartLine className="w-6 h-6 text-cyan-500" />,
    technologies: ['SQL', 'MySQL', 'Pandas', 'Tableau', 'Excel Data Modelling', 'NumPy'],
    achievements: [
      'Designed interactive enterprise BI dashboards, improving decision-making speed by 40%.',
      'Orchestrated data sanitization and database normalization pipelines for analytics.',
      'Conducted telemetry signal analyses for embedded IoT systems.'
    ]
  }
];

export const SkillsExpertise: React.FC<SkillsExpertiseProps> = ({ playAudio }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    playAudio('click');
    if (containerRef.current) {
      const scrollAmount = 360;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="skills" className="py-16 px-6 md:px-12 max-w-6xl mx-auto relative z-10 w-full font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-accentBlue mb-2">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-sora tracking-tight text-textPrimary">
            Professional Expertise
          </h2>
          <p className="text-textSecondary text-xs md:text-sm max-w-xl mt-2 leading-relaxed">
            Interactive swipe panels showcasing technical, leadership, and analytical domains. Swipe horizontally or use arrow buttons to browse.
          </p>
        </div>

        {/* Scroll Arrows */}
        <div className="flex gap-2 self-end">
          <button
            onClick={() => scroll('left')}
            onMouseEnter={() => playAudio('hover')}
            className="w-10 h-10 rounded-full border border-borderSilver bg-bgSecondary text-textPrimary flex items-center justify-center hover:bg-accentBlue hover:text-white hover:border-accentBlue transition-all shadow-sm cursor-pointer"
            title="Previous Category"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            onMouseEnter={() => playAudio('hover')}
            className="w-10 h-10 rounded-full border border-borderSilver bg-bgSecondary text-textPrimary flex items-center justify-center hover:bg-accentBlue hover:text-white hover:border-accentBlue transition-all shadow-sm cursor-pointer"
            title="Next Category"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swipeable Container */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-6 pb-6 w-full cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {EXPERTISE_CARDS.map((card) => (
          <motion.div
            key={card.id}
            className="snap-start shrink-0 w-[290px] sm:w-[330px] md:w-[360px] bg-bgSecondary border border-borderSilver rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:border-accentBlue/40 hover:shadow-lg transition-all duration-300 select-none group relative overflow-hidden"
            whileHover={{ y: -6 }}
            onMouseEnter={() => playAudio('hover')}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accentBlue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-borderSilver/40">
                <div className="p-2.5 bg-bgPrimary border border-borderSilver rounded-xl shrink-0 group-hover:scale-105 group-hover:border-accentBlue/30 transition-all duration-300">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold font-sora text-textPrimary leading-snug group-hover:text-accentBlue transition-colors duration-300">
                    {card.title}
                  </h3>
                  <span className="text-[9px] text-textMuted uppercase tracking-wider font-mono">Expertise Domain</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] md:text-xs text-textSecondary leading-relaxed min-h-[40px]">
                {card.desc}
              </p>

              {/* Technologies */}
              <div className="pt-2">
                <h4 className="text-[9px] font-bold text-textPrimary uppercase tracking-widest mb-2 font-sora">
                  Technologies & Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {card.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 rounded bg-bgPrimary border border-borderSilver text-[9px] font-medium text-textPrimary hover:border-accentBlue/30 hover:text-accentBlue transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accomplishments */}
              <div className="pt-2">
                <h4 className="text-[9px] font-bold text-textPrimary uppercase tracking-widest mb-2.5 font-sora">
                  Key Accomplishments
                </h4>
                <ul className="flex flex-col gap-2">
                  {card.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] md:text-xs text-textSecondary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-accentBlue shrink-0 mt-1.5 group-hover:scale-110 transition-transform" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Infinite scrolling marquee of technology ecosystem */}
      <div className="relative w-full overflow-hidden py-5 mt-10 border-y border-borderSilver/50 bg-bgSecondary/20 rounded-2xl">
        <div className="text-[9px] font-bold text-textMuted uppercase tracking-widest text-center mb-3.5 font-mono select-none">
          Ecosystem & Tools Marquee Loop
        </div>
        <div className="flex gap-4 w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
          {[
            'Python', 'Generative AI', 'AWS Cloud', 'Microsoft Azure', 'Oracle Cloud', 'N8N Automation', 
            'SQL Databases', 'MySQL', 'Figma Wireframing', 'Docker Containers', 'React', 'Tableau BI', 
            'NumPy / Pandas', 'LLM Prompting', 'IoT Prototyping', 'Volatility Forensics', 'Git & GitHub'
          ].concat([
            'Python', 'Generative AI', 'AWS Cloud', 'Microsoft Azure', 'Oracle Cloud', 'N8N Automation', 
            'SQL Databases', 'MySQL', 'Figma Wireframing', 'Docker Containers', 'React', 'Tableau BI', 
            'NumPy / Pandas', 'LLM Prompting', 'IoT Prototyping', 'Volatility Forensics', 'Git & GitHub'
          ]).map((tech, idx) => (
            <span
              key={`${tech}-${idx}`}
              className="px-4 py-2 rounded-xl bg-bgSecondary border border-borderSilver hover:border-accentBlue text-xs font-bold text-textPrimary shadow-sm hover:bg-bgPrimary transition-colors duration-300 select-none shrink-0"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
