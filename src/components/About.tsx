import React from 'react';
import { Cpu, Mic, Users, Terminal, Sparkles, BookOpen, Database, Satellite } from 'lucide-react';

interface AboutProps {
  playAudio: (type: 'hover' | 'click') => void;
}

const TRAITS_DATA = [
  { label: "Problem Solver", icon: <Cpu className="w-3.5 h-3.5" /> },
  { label: "Public Speaker", icon: <Mic className="w-3.5 h-3.5" /> },
  { label: "Community Builder", icon: <Users className="w-3.5 h-3.5" /> },
  { label: "Content Writer", icon: <Terminal className="w-3.5 h-3.5" /> },
  { label: "Innovator", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { label: "Passionate Learner", icon: <BookOpen className="w-3.5 h-3.5" /> },
  { label: "Data Analyst", icon: <Database className="w-3.5 h-3.5" /> },
  { label: "Tech Explorer", icon: <Satellite className="w-3.5 h-3.5" /> }
];

export const About: React.FC<AboutProps> = ({ playAudio: _playAudio }) => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10 w-full">
      <div className="flex flex-col mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-accentBlue mb-4 font-sans">
          Who I Am
        </span>
        <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
          Building Tomorrow's Technology Leader
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait & Traits */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center flex-shrink-0 group">
            <div className="absolute inset-0 rounded-full bg-bgSecondary border border-borderSilver shadow-xl overflow-hidden z-10">
              <img
                src={import.meta.env.BASE_URL + "portfolio_images/aruthra_photo.jpg"}
                alt="Aruthra S M Portrait"
                className="w-full h-full object-cover object-center select-none transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Subtle decorative ring */}
            <div className="absolute -inset-4 border border-borderSilver rounded-full z-0 pointer-events-none opacity-50" />
          </div>

          {/* Traits Tag Cloud */}
          <div className="flex flex-wrap gap-2 justify-center mt-10 max-w-sm">
            {TRAITS_DATA.map((trait, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-textSecondary bg-bgSecondary border border-borderSilver hover:border-accentBlue hover:text-accentBlue transition-colors flex items-center gap-1.5"
              >
                {trait.icon}
                {trait.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Bio Story & Strengths */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-textSecondary font-sans">
          <p className="text-sm md:text-base leading-relaxed">
            I believe that true innovation happens at the intersection of technology and human connection. As an Electronics & Communication Engineering student with an <strong className="text-textPrimary font-semibold">8.8 CGPA</strong>, my focus extends far beyond writing code—I am driven by a passion to build communities, lead teams, and communicate complex ideas effectively.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            My expertise lies in blending <strong className="text-textPrimary font-semibold">technical exploration</strong> with <strong className="text-textPrimary font-semibold">leadership</strong>. Whether I'm diving into AI and cloud architectures, managing technical events, or delivering a public speech, my goal is always to empower others and create meaningful, scalable solutions. Continuous learning is not just a habit for me; it's the foundation of my journey.
          </p>

          {/* Current Positions */}
          <div className="mt-6 p-6 rounded-2xl bg-bgSecondary border border-borderSilver">
            <h3 className="text-xs font-bold text-textPrimary uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accentBlue" /> Current Roles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { role: "CEO", org: "DotEco", color: "text-textPrimary" },
                { role: "Student Ambassador", org: "Microsoft Learn", color: "text-textPrimary" },
                { role: "Community Member", org: "AWS", color: "text-textPrimary" },
                { role: "Community Participant", org: "Oracle", color: "text-textPrimary" },
                { role: "Content Writer", org: "Freelance", color: "text-textPrimary" },
                { role: "Public Speaker", org: "Events & Conferences", color: "text-textPrimary" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-0.5">
                  <span className={`text-sm font-semibold ${item.color}`}>{item.role}</span>
                  <span className="text-xs font-medium text-textMuted">{item.org}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
