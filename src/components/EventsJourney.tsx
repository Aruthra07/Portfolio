import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, BookOpen, ExternalLink, Activity } from 'lucide-react';

interface EventsJourneyProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface EventItem {
  id: string;
  name: string;
  location: string;
  type: 'conference' | 'meetup' | 'workshop' | 'hackathon' | 'campus-visit';
  typeLabel: string;
  date: string;
  desc: string;
  learnings: string;
  skills: string[];
  proof: string;
  link: string;
  linkText: 'View LinkedIn Post' | 'Read Experience' | 'View Article';
  color: string;
  iconClass: string;
  image: string;
}

const EVENTS: EventItem[] = [
  {
    id: 'techx',
    name: 'TechX Conference',
    location: 'Chennai, India',
    type: 'conference',
    typeLabel: 'Conference',
    date: 'Nov 2024',
    desc: 'Participated in the premier Chennai Cloud & AI summit covering enterprise architectural paradigms, large-scale automation frameworks, and distributed pipeline integrations.',
    learnings: 'AWS and Azure enterprise scale pipelines, DevOps automation strategies, and LLM production deployments.',
    skills: ['Cloud Computing', 'AI Architectures', 'DevOps'],
    proof: 'LinkedIn Post Verified',
    link: 'https://www.linkedin.com/posts/aruthra-sm_techxconf-ai-cloudcomputing-activity-7263856949098627072-8-xO',
    linkText: 'View LinkedIn Post',
    color: '#3b82f6',
    iconClass: 'fas fa-microphone-alt',
    image: '/poftfolio images/tech_conf_banner.png'
  },
  {
    id: 'cdac',
    name: 'CDAC Memory & Malware Forensic Bootcamp',
    location: 'Online / CDAC',
    type: 'workshop',
    typeLabel: 'Bootcamp',
    date: 'Dec 2024',
    desc: 'Intensive digital forensics bootcamp examining kernel-level RAM dumps, forensic volatility extraction, and automated malicious script tracking workflows.',
    learnings: 'Advanced memory acquisition, process injection auditing, and volatility framework forensic scripts.',
    skills: ['Cybersecurity', 'Digital Forensics', 'Memory Auditing'],
    proof: 'LinkedIn Post Verified',
    link: 'https://www.linkedin.com/posts/aruthra-sm_cybersecurity-digitalforensics-memoryforensics-activity-7311772796945055745-MYl9',
    linkText: 'View LinkedIn Post',
    color: '#06b6d4',
    iconClass: 'fas fa-shield-alt',
    image: '/poftfolio images/cyber_banner.png'
  },
  {
    id: 'cause',
    name: 'CAUSE 2025 Hackathon',
    location: 'CMR Bangalore, India',
    type: 'hackathon',
    typeLabel: 'Hackathon',
    date: 'Jan 2025',
    desc: 'Collaborated in a high-pressure 24-hour sprint developing green smart city telemetry interfaces, biomass sensing triggers, and automated alert nodes.',
    learnings: 'Rapid microcontroller prototyping, sensor threshold calibration, and environmental metrics visualization.',
    skills: ['IoT', 'Embedded Systems', 'Rapid Prototyping'],
    proof: 'LinkedIn Post Verified',
    link: 'https://www.linkedin.com/posts/aruthra-sm_the-journey-activity-7319381930657886209-N3wt',
    linkText: 'View LinkedIn Post',
    color: '#ec4899',
    iconClass: 'fas fa-trophy',
    image: '/poftfolio images/hackathon_banner.png'
  },
  {
    id: 'prompt',
    name: 'Prompt to Production Meetup',
    location: 'Coimbatore, India',
    type: 'meetup',
    typeLabel: 'AI Meetup',
    date: 'Jan 2025',
    desc: 'Attended the community developer meetup outlining robust prompt engineering, LLM parameters optimization, and GitHub Copilot workflows.',
    learnings: 'Advanced prompting templates, context window optimization, and AI-accelerated programming models.',
    skills: ['Generative AI', 'GitHub Copilot', 'Prompt Engineering'],
    proof: 'LinkedIn Post Verified',
    link: 'https://www.linkedin.com/posts/aruthra-sm_ai-githubcopilot-techjourney-activity-7347239876007772160-tTCe',
    linkText: 'View LinkedIn Post',
    color: '#8b5cf6',
    iconClass: 'fas fa-handshake',
    image: '/poftfolio images/automation_banner.png'
  },
  {
    id: 'figma',
    name: 'DesignSprint Figma Bootcamp',
    location: 'SNS College of Engineering',
    type: 'workshop',
    typeLabel: 'UX Bootcamp',
    date: 'Feb 2025',
    desc: 'Sprint-based design workshop mapping user journeys, creating complex design tokens, and wireframing responsive glassmorphic web dashboards.',
    learnings: 'Interactive wireframing, UX logic, design system tokens, and advanced figma components.',
    skills: ['UI/UX Design', 'Figma', 'Product Design'],
    proof: 'LinkedIn Post Verified',
    link: 'https://www.linkedin.com/posts/aruthra-sm_uiuxdesign-creativebootcamp-designthinking-activity-7353812593477668870-Bzpg',
    linkText: 'View LinkedIn Post',
    color: '#06b6d4',
    iconClass: 'fas fa-paint-brush',
    image: '/poftfolio images/hackathon_banner.png'
  },
  {
    id: 'n8n',
    name: 'N8N Meetup Coimbatore',
    location: 'Coimbatore, India',
    type: 'meetup',
    typeLabel: 'Automation Meetup',
    date: 'Feb 2025',
    desc: 'Participated in Coimbatore\'s automation meetup, demonstrating multi-node N8N automation pipelines connected to OCI databases and Snowflake.',
    learnings: 'No-code workflow structures, webhook triggers, OCI data connectors, and Snowflake integration.',
    skills: ['N8N', 'Workflow Automation', 'API Webhooks'],
    proof: 'LinkedIn Post Verified',
    link: 'https://www.linkedin.com/posts/aruthra-sm_n8n-snowflake-nocodetools-activity-7355582416150818816-rEPr',
    linkText: 'View LinkedIn Post',
    color: '#8b5cf6',
    iconClass: 'fas fa-cogs',
    image: '/poftfolio images/automation_banner.png'
  },
  {
    id: 'fetna',
    name: 'FeTNA International Conference',
    location: 'USA / Online',
    type: 'conference',
    typeLabel: 'Conference',
    date: 'Mar 2025',
    desc: 'Participated in global business forums detailing international technology entrepreneurship, operational growth, and sustainable ecosystems.',
    learnings: 'Operational scaling, venture funding parameters, global networking, and technology leadership strategy.',
    skills: ['Leadership', 'Business Growth', 'Strategy'],
    proof: 'LinkedIn Post Verified',
    link: 'https://www.linkedin.com/posts/aruthra-sm_entrepreneurship-leadership-businessgrowth-activity-7419571306318389248-uXsm',
    linkText: 'View LinkedIn Post',
    color: '#3b82f6',
    iconClass: 'fas fa-globe',
    image: '/poftfolio images/tech_conf_banner.png'
  },
  {
    id: 'smarteco',
    name: 'SmartEcoSign Hackathon',
    location: 'Bangalore Institute of Technology',
    type: 'hackathon',
    typeLabel: 'Hackathon',
    date: 'Apr 2025',
    desc: 'National level ecological hackathon. Conducted a solo presentation demonstrating a smart eco-sign signaling IoT module.',
    learnings: 'Solo rapid hardware compilation, pitching strategies, and eco-sustainable telemetry networking.',
    skills: ['IoT Telemetry', 'Sustainability', 'Technical Pitching'],
    proof: 'LinkedIn Article Published',
    link: 'https://www.linkedin.com/pulse/time-transformed-my-solo-ride-bangalore-aruthra-manivannan-qc03c',
    linkText: 'Read Experience',
    color: '#ec4899',
    iconClass: 'fas fa-seedling',
    image: '/poftfolio images/hackathon_banner.png'
  },
  {
    id: 'microsoft',
    name: 'Microsoft Campus Visit',
    location: 'Bangalore, India',
    type: 'campus-visit',
    typeLabel: 'Campus Visit',
    date: 'May 2025',
    desc: 'Special invitation-based visit to Microsoft Bangalore corporate offices. Explored modern cloud infrastructures, Azure datacenters, and Microsoft Learn communities.',
    learnings: 'Microsoft Learn Student Ambassador goals, enterprise cloud scaling, and AI co-engineering models.',
    skills: ['Azure Cloud', 'Community Leadership', 'Enterprise Systems'],
    proof: 'LinkedIn Article Published',
    link: 'https://www.linkedin.com/pulse/day-microsoft-walking-dream-aruthra-manivannan-e9syc',
    linkText: 'Read Experience',
    color: '#eab308',
    iconClass: 'fas fa-building',
    image: '/poftfolio images/MS.jpg'
  },
  {
    id: 'hackhustle',
    name: 'HackHustle 2.0 Hackathon',
    location: 'Saveetha Engineering College',
    type: 'hackathon',
    typeLabel: 'Hackathon',
    date: 'Jun 2025',
    desc: '24-hour hardware-software integration marathon building an automated real-time diagnostics monitoring node.',
    learnings: 'High-pressure hardware debugging, real-time data streaming logic, and teamwork under strict timelines.',
    skills: ['IoT Systems', 'Python Development', 'Rapid Prototyping'],
    proof: 'LinkedIn Article Published',
    link: 'https://www.linkedin.com/pulse/some-journeys-dont-change-your-destination-who-you-aruthra-manivannan-psufc',
    linkText: 'Read Experience',
    color: '#ec4899',
    iconClass: 'fas fa-laptop-code',
    image: '/poftfolio images/hackathon_banner.png'
  }
];

const FILTERS = [
  { label: 'All Activities', value: 'all' },
  { label: 'Conferences', value: 'conference' },
  { label: 'Meetups', value: 'meetup' },
  { label: 'Workshops & Bootcamps', value: 'workshop' },
  { label: 'Hackathons', value: 'hackathon' },
  { label: 'Campus Visits', value: 'campus-visit' }
];

export const EventsJourney: React.FC<EventsJourneyProps> = ({ playAudio }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = EVENTS.filter((e) => {
    if (activeFilter === 'all') return true;
    return e.type === activeFilter;
  });

  return (
    <section id="events" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Learning Beyond The Classroom
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
          Event & Conference <span className="bg-gradient-main bg-clip-text text-transparent">Journey</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Explore my professional roadmap showing bootcamps, campus visits, conferences, and hackathons. Click the links on the cards or timeline to verify proof of participation directly.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 justify-center md:justify-start mb-10 border-b border-glass-border pb-5">
        {FILTERS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              playAudio('click');
              setActiveFilter(tab.value);
            }}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeFilter === tab.value
                ? 'bg-gradient-main text-white shadow-lg shadow-accentPurple/20'
                : 'bg-white/5 border border-glass-border text-textSecondary hover:text-textPrimary hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid containing Events Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              key={event.id}
              onMouseEnter={() => playAudio('hover')}
              className="glass-card rounded-3xl border border-glass-border flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Event Banner */}
              <div className="w-full h-36 md:h-40 overflow-hidden relative border-b border-glass-border">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                />
                {/* Colored top indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 origin-left"
                  style={{ backgroundColor: event.color }}
                />
                {/* Floating Date Badge */}
                <div className="absolute top-4 left-4 bg-black/60 border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-mono text-white backdrop-blur-md uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-accentCyan" /> {event.date}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Header: Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono text-textMuted uppercase flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {event.location}
                    </span>
                    <span
                      className="text-[9px] font-bold font-mono px-2.5 py-1 rounded-md uppercase border"
                      style={{
                        color: event.color,
                        borderColor: `${event.color}30`,
                        backgroundColor: `${event.color}08`
                      }}
                    >
                      {event.typeLabel}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-display text-textPrimary mb-2 group-hover:text-accentCyan transition-colors">
                    {event.name}
                  </h3>

                  <p className="text-xs text-textSecondary leading-relaxed mb-5">
                    {event.desc}
                  </p>

                  {/* Key learnings block */}
                  <div className="bg-white/5 border border-glass-border rounded-xl p-3 mb-5 flex flex-col gap-1">
                    <span className="text-[9px] font-bold font-mono text-textMuted tracking-wider uppercase flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-accentCyan" /> Key Learnings
                    </span>
                    <p className="text-[10px] text-textSecondary leading-relaxed">
                      {event.learnings}
                    </p>
                  </div>
                </div>

                {/* Skills and Link Footer */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-5">
                    {event.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[9px] font-bold rounded bg-white/5 border border-glass-border text-textSecondary uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-glass-border flex justify-between items-center text-[10px] font-mono">
                    <span className="text-textMuted flex items-center gap-1">
                      <Activity className="w-3 h-3" /> {event.proof}
                    </span>
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playAudio('click')}
                      className="px-3 py-1.5 bg-white/5 hover:bg-gradient-main hover:text-white border border-glass-border hover:border-transparent rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {event.linkText} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Horizontal timeline panel (Learning Beyond the Classroom) */}
      <div className="glass-card border border-glass-border rounded-3xl p-6 md:p-8 relative overflow-hidden">
        {/* Core background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accentPurple/5 blur-[50px] rounded-full pointer-events-none" />

        <h3 className="text-base md:text-lg font-bold font-display text-textPrimary mb-8 text-center md:text-left">
          Roadmap Timeline: Learning Beyond the Classroom
        </h3>

        {/* Timeline Line Container */}
        <div className="relative flex flex-col md:flex-row justify-between items-stretch md:items-center gap-8 md:gap-4 md:before:absolute md:before:left-4 md:before:right-4 md:before:h-0.5 md:before:bg-glass-border md:before:z-0 md:pt-4">
          {EVENTS.map((ev) => (
            <motion.a
              key={ev.id}
              href={ev.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playAudio('hover')}
              onClick={() => playAudio('click')}
              className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2 group text-left md:text-center flex-1 cursor-pointer"
              whileHover={{ y: -4 }}
            >
              {/* Event node dot indicator */}
              <div
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center bg-bgPrimary group-hover:scale-115 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                style={{
                  borderColor: ev.color,
                  boxShadow: `0 0 10px ${ev.color}20`
                }}
              >
                <i className={`${ev.iconClass} text-[10px]`} style={{ color: ev.color }} />
              </div>

              {/* Event Text Info */}
              <div className="flex flex-col md:items-center">
                <span className="text-[9px] font-mono text-textMuted uppercase font-bold">
                  {ev.date}
                </span>
                <span className="text-[11px] font-bold text-textPrimary group-hover:text-accentCyan transition-colors max-w-[120px] md:truncate leading-tight mt-0.5">
                  {ev.name}
                </span>
                <span
                  className="text-[8px] font-mono font-bold uppercase tracking-wider mt-0.5"
                  style={{ color: ev.color }}
                >
                  {ev.typeLabel}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
