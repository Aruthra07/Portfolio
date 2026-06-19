import React, { useState, useRef } from 'react';
import { Star, Users, Compass, BookOpen, Calendar, MapPin } from 'lucide-react';

interface LeadershipHighlightsProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface JourneyNode {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  desc: string;
  tags: string[];
  icon: React.ReactNode;
  color: string;
  // Navigator node position relative to the 120x40 viewBox
  navX: number;
  navY: number;
}

const JOURNEY_NODES: JourneyNode[] = [
  {
    id: 'doteco-ceo',
    role: 'Chief Executive Officer (CEO)',
    organization: 'DOTECO',
    period: '2024 - Present',
    location: 'SNS College of Engineering',
    desc: "Leading DotEco's corporate roadmap, directing cross-functional student engineering teams, and hosting sustainable technology meetups.",
    tags: ['LEADERSHIP', 'STRATEGIC OPERATIONS', 'TEAM BUILDING', 'SUSTAINABILITY'],
    icon: <Star className="w-4 h-4" />,
    color: 'pink',
    navX: 30,
    navY: 35
  },
  {
    id: 'mlsa-lead',
    role: 'Microsoft Learn Enthusiast',
    organization: 'MICROSOFT COMMUNITY',
    period: '2024 - Present',
    location: 'SNS College of Engineering',
    desc: 'Conducting campus webinars and hackathons, promoting Azure integrations, and tutoring peers on cloud fundamentals.',
    tags: ['AZURE CLOUD', 'TECHNICAL SPEAKING', 'COMMUNITY ORGANIZING'],
    icon: <Users className="w-4 h-4" />,
    color: 'cyan',
    navX: 70,
    navY: 50
  },
  {
    id: 'aws-community',
    role: 'AWS Learning Community Participant',
    organization: 'AWS COMMUNITY & ORACLE',
    period: '2024 - Present',
    location: 'Coimbatore, India',
    desc: 'Fostering AWS Cloud advocacy, authoring instructional cheatsheets, deploying serverless GenAI prototype pipelines, and facilitating public cloud study tracks.',
    tags: ['AWS CLOUD', 'OCI CLOUD', 'MENTORSHIP', 'SYSTEM PILOTS'],
    icon: <Compass className="w-4 h-4" />,
    color: 'purple',
    navX: 190,
    navY: 35
  },
  {
    id: 'ece-learning',
    role: 'ECE Student & Security Host',
    organization: 'SNS COLLEGE OF ENGINEERING',
    period: '2022 - Present',
    location: 'Coimbatore, India',
    desc: 'Pursuing BE in Electronics & Communication. Fostering IoT systems, telemetry protocols, database structures, and hosting CDAC Volatility forensics workshops for 100+ peers (8.8 CGPA).',
    tags: ['ECE CORE', 'IoT SENSORS', 'MALWARE FORENSICS', '8.8 CGPA'],
    icon: <BookOpen className="w-4 h-4" />,
    color: 'blue',
    navX: 150,
    navY: 20
  }
];

export const LeadershipHighlights: React.FC<LeadershipHighlightsProps> = ({ playAudio }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleNavigatorClick = (id: string) => {
    playAudio('click');
    setActiveCardId(id);
    
    // Smooth scroll to the target card
    const targetElement = cardRefs.current[id];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Clear highlight after 1.8s
      setTimeout(() => {
        setActiveCardId((current) => (current === id ? null : current));
      }, 1800);
    }
  };

  const getDotGlow = (color: string) => {
    switch (color) {
      case 'pink': return 'fill-pink-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]';
      case 'cyan': return 'fill-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]';
      case 'purple': return 'fill-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]';
      case 'blue': return 'fill-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]';
      default: return 'fill-accentBlue';
    }
  };

  const getCardBorder = (nodeId: string, color: string) => {
    const isHighlighted = activeCardId === nodeId;
    if (isHighlighted) {
      switch (color) {
        case 'pink': return 'border-pink-500 shadow-lg shadow-pink-500/10 ring-2 ring-pink-500/15';
        case 'cyan': return 'border-cyan-400 shadow-lg shadow-cyan-400/10 ring-2 ring-cyan-400/15';
        case 'purple': return 'border-purple-500 shadow-lg shadow-purple-500/10 ring-2 ring-purple-500/15';
        case 'blue': return 'border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/15';
        default: return 'border-accentBlue shadow-lg shadow-accentBlue/10 ring-2 ring-accentBlue/15';
      }
    }
    return 'border-borderSilver dark:border-slate-800/80';
  };

  return (
    <section id="leadership" className="py-16 px-6 md:px-12 max-w-5xl mx-auto relative z-10 w-full font-sans">
      
      {/* Header Container with Title, Subtitle and Journey Navigator */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-borderSilver/40 dark:border-slate-800/60 pb-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-accentBlue mb-2">
            Professional Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-sora tracking-tight text-textPrimary">
            Leadership & Journey
          </h2>
          <p className="text-textSecondary text-xs md:text-sm max-w-xl mt-2 leading-relaxed">
            Milestones across academic research, public cloud advocacy programs, and execution as DotEco CEO.
          </p>
        </div>

        {/* Mini Journey Navigator (220px x 70px) */}
        <div className="flex flex-col items-center md:items-end gap-1.5 p-3 rounded-2xl bg-bgSecondary border border-borderSilver select-none shrink-0">
          <span className="text-[8px] font-bold text-textMuted uppercase tracking-wider font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accentBlue animate-pulse" />
            Journey Navigator
          </span>
          
          <div className="relative w-[220px] h-[70px] flex items-center justify-center">
            <svg viewBox="0 0 220 70" className="w-full h-full text-borderSilver/50 dark:text-slate-800/40 pointer-events-none">
              {/* The Infinity Path */}
              <path
                d="M 110,35 C 75,5 30,5 30,35 C 30,65 75,65 110,35 C 145,5 190,5 190,35 C 190,65 145,65 110,35 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              
              {/* Glowing Indicator Loop */}
              <circle r="3.5" className="fill-accentBlue">
                <animateMotion
                  dur="10s"
                  repeatCount="indefinite"
                  path="M 110,35 C 75,5 30,5 30,35 C 30,65 75,65 110,35 C 145,5 190,5 190,35 C 190,65 145,65 110,35 Z"
                />
              </circle>
            </svg>

            {/* Clickable node buttons overlays */}
            {JOURNEY_NODES.map((node) => (
              <button
                key={node.id}
                onClick={() => handleNavigatorClick(node.id)}
                className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full hover:scale-135 transition-transform duration-300 flex items-center justify-center cursor-pointer group"
                style={{ left: `${node.navX}px`, top: `${node.navY}px` }}
                title={node.role}
              >
                <div className={`w-2.5 h-2.5 rounded-full border border-white/20 transition-all ${
                  activeCardId === node.id ? 'bg-accentBlue scale-125' : 'bg-textSecondary/60 group-hover:bg-accentBlue'
                } ${getDotGlow(node.color)}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical Timeline Card Stack */}
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-8 md:pl-10 ml-4 md:ml-6 flex flex-col gap-8">
        {JOURNEY_NODES.map((item) => (
          <div
            ref={(el) => { cardRefs.current[item.id] = el; }}
            key={item.id}
            onMouseEnter={() => playAudio('hover')}
            className={`relative group transition-all duration-500 rounded-3xl border ${getCardBorder(item.id, item.color)}`}
          >
            {/* Timeline Node Dot Circle Overlay */}
            <div className={`absolute -left-[49px] md:-left-[61px] top-5 w-8 h-8 rounded-full bg-bgPrimary border-2 flex items-center justify-center text-textSecondary group-hover:text-white transition-all duration-300 shadow-sm z-10 ${
              activeCardId === item.id 
                ? 'border-accentBlue bg-accentBlue text-white scale-110 shadow-md' 
                : 'border-borderSilver dark:border-slate-800/80 group-hover:border-accentBlue group-hover:bg-accentBlue'
            }`}>
              {item.icon}
            </div>

            {/* Content Card container */}
            <div className="bg-bgSecondary p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-textPrimary group-hover:text-accentBlue transition-colors duration-300 tracking-tight font-sora">
                    {item.role}
                  </h3>
                  <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider mt-0.5 block font-mono">
                    {item.organization}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-bgPrimary border border-borderSilver text-[10px] font-bold text-textSecondary self-start md:self-auto font-mono">
                  <Calendar className="w-3.5 h-3.5 text-accentBlue" />
                  {item.period}
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-textMuted font-mono mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {item.location}
              </div>

              <p className="text-xs md:text-sm text-textSecondary leading-relaxed mb-5">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-bgPrimary border border-borderSilver text-[9px] font-bold text-textMuted tracking-wider uppercase font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
