import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Award, Star, BookOpen, Compass, Shield, Calendar, MapPin, Sparkles } from 'lucide-react';

interface LeadershipHighlightsProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface HighlightItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  date: string;
  location: string;
  tags: string[];
  icon: React.ReactNode;
  metric?: string;
}

const COMMUNITY_ITEMS: HighlightItem[] = [
  {
    id: 'mlsa-lead',
    title: 'Microsoft Learn Student Ambassador',
    subtitle: 'Beta Tier Community Lead',
    desc: 'Led local Microsoft Learn chapters by hosting interactive workshops on Azure cloud infrastructures and Generative AI tools. Tutored peer groups on cloud fundamentals.',
    date: '2024 - Present',
    location: 'SNS College of Engineering',
    tags: ['Azure Cloud', 'Azure AI', 'Peer Tutoring', 'Community Organizing'],
    icon: <Users className="w-5 h-5 text-accentCyan" />,
    metric: 'Beta Lead'
  },
  {
    id: 'aws-advocate',
    title: 'AWS Cloud Community & Educator',
    subtitle: 'Developer Community Group',
    desc: 'Conducted study tracks helping over 50+ students achieve AWS Cloud Practitioner credentials. Created detailed architecture review cheatsheets for developer peers.',
    date: '2024 - Present',
    location: 'Coimbatore, India',
    tags: ['AWS Cloud', 'AWS Academy', 'Mentorship', 'Tutorial Writing'],
    icon: <Compass className="w-5 h-5 text-accentPurple" />,
    metric: '50+ Guided'
  },
  {
    id: 'oracle-evangelist',
    title: 'Oracle Cloud & GenAI Member',
    subtitle: 'OCI Technical Evangelist',
    desc: 'Contributed to Oracle developer forums, focusing on Enterprise databases and deploying serverless applications using OCI Generative AI suites.',
    date: '2024 - Present',
    location: 'Online Ecosystem',
    tags: ['OCI Developer', 'Generative AI Pro', 'DB Administration'],
    icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
    metric: 'Active Contributor'
  }
];

const LEADERSHIP_ITEMS: HighlightItem[] = [
  {
    id: 'doteco-ceo',
    title: 'Chief Executive Officer (CEO)',
    subtitle: 'DotEco Sustainability Initiative',
    desc: 'Coordinating strategic roadmap planning, leading 15+ cross-functional student engineers, and orchestrating regional environmental technology meetups.',
    date: '2024 - Present',
    location: 'SNS College of Engineering',
    tags: ['Strategic Planning', 'Team Management', 'Sustainability Tech', 'Public Relations'],
    icon: <Star className="w-5 h-5 text-accentPink" />,
    metric: '15+ Team Size'
  },
  {
    id: 'design-lead',
    title: 'DesignSprint UI/UX Coordinator',
    subtitle: 'Figma Design Bootcamp Organiser',
    desc: 'Led and organized multi-day wireframing bootcamps, instructing peers on design token creation, glassmorphism UI styles, and responsive layout guidelines.',
    date: 'Feb 2025',
    location: 'SNS College of Engineering',
    tags: ['UI/UX Design', 'Figma Wireframing', 'Design Tokens', 'Event Hosting'],
    icon: <BookOpen className="w-5 h-5 text-green-400" />,
    metric: 'Bootcamp Host'
  },
  {
    id: 'forensics-lead',
    title: 'CDAC Volatility Forensics Host',
    subtitle: 'Bootcamp Coordinator & Tutor',
    desc: 'Coordinated security study groups analyzing malware memory dumps, utilizing volatility scripts, and tutoring students in basic network forensic strategies.',
    date: 'Dec 2024',
    location: 'Coimbatore Regional Division',
    tags: ['Malware Auditing', 'Volatility Scripting', 'Security Forensics'],
    icon: <Shield className="w-5 h-5 text-accentBlue" />,
    metric: 'Security Tutor'
  }
];

const MILESTONE_ITEMS: HighlightItem[] = [
  {
    id: 'academic-ece',
    title: 'Electronics & Communication Engineering',
    subtitle: 'SNS College of Engineering',
    desc: 'Maintaining a highly competitive academic record of 8.8 CGPA out of 10. Focusing heavily on IoT systems, telemetry sensors, and embedded systems.',
    date: '2022 - Present',
    location: 'SNS College of Engineering',
    tags: ['ECE Core', 'Signal Telemetry', '8.8 CGPA', 'Academic Top 10%'],
    icon: <Award className="w-5 h-5 text-yellow-400" />,
    metric: '8.8 CGPA'
  },
  {
    id: 'research-pub',
    title: 'ECE Research Publication',
    subtitle: 'IJNRD Journal Author',
    desc: 'Authored and successfully published a technical research paper in the International Journal of Novel Research and Development (IJNRD), highlighting IoT engineering developments.',
    date: 'Nov 2024',
    location: 'IJNRD Publisher',
    tags: ['Academic Research', 'Technical Writing', 'IoT Architecture'],
    icon: <BookOpen className="w-5 h-5 text-accentCyan" />,
    metric: '1 Published Paper'
  },
  {
    id: 'cert-multi',
    title: 'Cloud Certification Master',
    subtitle: '10+ Professional Credentials',
    desc: 'Earned 10+ cloud and database credentials spanning public platforms: AWS Certified AI Practitioner, AWS Solutions Architect, Azure AI, ServiceNow CSA, and SnowPro Core.',
    date: '2024 - 2025',
    location: 'Verified Issuers',
    tags: ['AWS SA', 'SnowPro Core', 'ServiceNow CSA', 'OCI GenAI Pro'],
    icon: <Award className="w-5 h-5 text-accentPurple" />,
    metric: '10+ Credentials'
  }
];

const TABS = [
  { label: 'Community Contributions', value: 'community', items: COMMUNITY_ITEMS },
  { label: 'Leadership Highlights', value: 'leadership', items: LEADERSHIP_ITEMS },
  { label: 'Professional Milestones', value: 'milestones', items: MILESTONE_ITEMS }
];

export const LeadershipHighlights: React.FC<LeadershipHighlightsProps> = ({ playAudio }) => {
  const [activeTab, setActiveTab] = useState('community');

  const selectedCategory = TABS.find((t) => t.value === activeTab) || TABS[0];

  return (
    <section id="leadership-highlights" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Endorsements & Impact
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
          Leadership & <span className="bg-gradient-main bg-clip-text text-transparent">Key Highlights</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Showcasing authentic community leadership roles, student organization management, and verified academic milestones.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap gap-2.5 justify-center md:justify-start mb-10 border-b border-glass-border pb-5">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              playAudio('click');
              setActiveTab(tab.value);
            }}
            onMouseEnter={() => playAudio('hover')}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeTab === tab.value
                ? 'bg-gradient-main text-white shadow-lg shadow-accentPurple/25'
                : 'bg-white/5 border border-glass-border text-textSecondary hover:text-textPrimary hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Highlights Grid with Framer Motion stagger */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {selectedCategory.items.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              key={item.id}
              onMouseEnter={() => playAudio('hover')}
              className="glass-card p-6 md:p-7 rounded-3xl border border-glass-border flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Corner Glow overlay */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-glow opacity-5 blur-[25px] rounded-full group-hover:scale-125 transition-transform duration-500" />
              
              <div>
                {/* Header: Icon and Metric */}
                <div className="flex justify-between items-start mb-5">
                  <div className="p-3 bg-white/5 border border-glass-border rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  {item.metric && (
                    <span className="text-[10px] text-accentCyan font-bold uppercase font-mono tracking-widest bg-white/5 border border-glass-border px-3 py-1 rounded-full">
                      {item.metric}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold font-display text-textPrimary mb-1.5 leading-tight group-hover:text-accentCyan transition-colors">
                  {item.title}
                </h3>
                <span className="text-[11px] font-bold text-accentPurple uppercase tracking-wider block mb-3">
                  {item.subtitle}
                </span>

                <p className="text-xs text-textSecondary leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Card Footer Details */}
              <div className="pt-4 border-t border-glass-border flex justify-between items-center text-[10px] font-mono text-textMuted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-accentPurple/70" /> {item.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accentCyan/70" /> {item.location}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
