import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, Mic, Star, Award, Sparkles, ShieldCheck } from 'lucide-react';

interface AchievementsProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Achievement {
  id: string;
  title: string;
  category: string;
  organization: string;
  year: string;
  metric: string;
  desc: string;
  icon: React.ReactNode;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'pub',
    title: 'Research Publication',
    category: 'Academic Research',
    organization: 'IJNRD Journal',
    year: '2025',
    metric: '1 Published Paper',
    desc: 'Authored and published ECE technical paper in IJNRD (International Journal of Novel Research and Development), showcasing engineering discovery.',
    icon: <BookOpen className="w-5 h-5 text-yellow-500" />
  },
  {
    id: 'speak',
    title: 'Public Speaking',
    category: 'Communication',
    organization: 'Webinars & Colleges',
    year: '2025',
    metric: '5+ Tech Events',
    desc: 'Invited speaker and workshop host conducting interactive developer webinars and training sessions at regional college meetups.',
    icon: <Mic className="w-5 h-5 text-cyan-500" />
  },
  {
    id: 'ceo',
    title: 'DotEco CEO Execution',
    category: 'Leadership & Business',
    organization: 'DotEco Initiative',
    year: '2024',
    metric: 'Chief Executive Officer',
    desc: 'Coordinating strategic planning, cross-functional engineering teams, and sustainability events for DotEco.',
    icon: <Star className="w-5 h-5 text-purple-500" />
  },
  {
    id: 'ambassador',
    title: 'Microsoft Student Ambassador',
    category: 'Community Leadership',
    organization: 'Microsoft Learn',
    year: '2024',
    metric: 'Beta Tier Lead',
    desc: 'Organized hackathons, hosted training sessions, and promoted Azure cognitive services to the campus student ecosystem.',
    icon: <Award className="w-5 h-5 text-blue-500" />
  },
  {
    id: 'iot_project',
    title: 'Smart IoT Prototyping',
    category: 'Technical Contribution',
    organization: 'Hardware Labs',
    year: '2025',
    metric: '3 Integrated Builds',
    desc: 'Engineered and programmed functional Smart Hydroponics, RFID Smart Access, and GPS Wearable safety prototypes.',
    icon: <Sparkles className="w-5 h-5 text-pink-500" />
  },
  {
    id: 'cloud_cert',
    title: 'Public Cloud Master',
    category: 'Cloud Credentials',
    organization: 'AWS & Azure',
    year: '2026',
    metric: '10+ Certifications',
    desc: 'Earned professional level cloud certifications across public platforms: AWS AI, AWS SA, Azure AI, and OCI GenAI Professional.',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
  }
];

export const Achievements: React.FC<AchievementsProps> = ({ playAudio }) => {
  const [selectedId, setSelectedId] = useState<string | null>(ACHIEVEMENTS[0].id);

  const activeAchievement = ACHIEVEMENTS.find((ach) => ach.id === selectedId) || ACHIEVEMENTS[0];

  const triggerConfetti = (id: string) => {
    playAudio('click');
    setSelectedId(id);

    // Confetti configurations
    if (id === 'pub' || id === 'ceo') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      // Fire quick light burst
      const count = 40;
      const defaults = { origin: { y: 0.7 } };
      confetti({ ...defaults, particleCount: count, angle: 60, spread: 55 });
      confetti({ ...defaults, particleCount: count, angle: 120, spread: 55 });
    }
  };

  return (
    <section id="achievements" className="py-16 px-6 md:px-12 max-w-6xl mx-auto relative z-10 w-full font-sans">
      <div className="flex flex-col gap-2 mb-8 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-accentBlue mb-2">
          Milestones
        </span>
        <h2 className="text-3xl md:text-4xl font-black font-sora tracking-tight text-textPrimary">
          Trophy Room & Recognition
        </h2>
        <p className="text-textSecondary text-xs md:text-sm max-w-2xl mt-2 leading-relaxed">
          Celebrating peer recognition, community impact leadership, and published research. Click any milestone tile to explore and celebrate!
        </p>
      </div>

      {/* Infinite achievement flow track */}
      <div className="relative w-full overflow-hidden py-4 mb-8 border-y border-borderSilver/50 bg-bgSecondary/20">
        {/* Infinite scrolling wrapper */}
        <div className="flex gap-5 w-max animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
          {/* Double achievements to loop seamlessly */}
          {[...ACHIEVEMENTS, ...ACHIEVEMENTS].map((ach, idx) => {
            const isActive = selectedId === ach.id;
            return (
              <div
                key={`${ach.id}-${idx}`}
                onClick={() => triggerConfetti(ach.id)}
                className={`w-[240px] sm:w-[280px] bg-bgSecondary border p-4 rounded-xl flex flex-col justify-between hover:border-accentBlue/50 cursor-pointer select-none shrink-0 transition-all duration-300 ${
                  isActive ? 'border-accentBlue ring-2 ring-accentBlue/10' : 'border-borderSilver'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="p-2 bg-bgPrimary border border-borderSilver rounded-lg">
                      {ach.icon}
                    </div>
                    <span className="text-[8px] text-textMuted font-bold uppercase tracking-wide font-mono bg-bgPrimary border border-borderSilver px-2 py-0.5 rounded">
                      {ach.year}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold font-sora text-textPrimary truncate">
                    {ach.title}
                  </h3>
                  <span className="text-[9px] text-textMuted uppercase font-mono block mt-1">
                    {ach.organization}
                  </span>
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-borderSilver/40 flex justify-between items-center text-[9px] font-mono">
                  <span className="text-textMuted uppercase">Status</span>
                  <span className="text-accentBlue font-bold">{ach.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inject custom marquee animation style directly */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Selected Achievement Details panel */}
      <AnimatePresence mode="wait">
        {activeAchievement && (
          <motion.div
            key={activeAchievement.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-bgSecondary border border-borderSilver p-5 md:p-6 rounded-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-5 items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-bgPrimary border border-borderSilver rounded-2xl shrink-0 text-accentBlue">
                {activeAchievement.icon}
              </div>
              <div>
                <span className="text-[9px] font-bold text-accentBlue uppercase tracking-wider font-mono bg-accentBlue/10 px-2 py-0.5 rounded-full">
                  {activeAchievement.category}
                </span>
                <h3 className="text-base font-bold font-sora text-textPrimary mt-1.5 leading-snug">
                  {activeAchievement.title}
                </h3>
                <span className="text-xs text-textMuted font-medium block">
                  {activeAchievement.organization} &bull; {activeAchievement.year}
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-md w-full border-t md:border-t-0 md:border-l border-borderSilver/50 pt-4 md:pt-0 md:pl-5 text-xs sm:text-sm text-textSecondary leading-relaxed">
              <p>{activeAchievement.desc}</p>
              <div className="mt-2.5 flex justify-between items-center text-[10px] font-mono text-textMuted">
                <span>Verification ID Status:</span>
                <span className="text-green-600 font-bold bg-green-50 dark:text-green-400 dark:bg-green-500/10 px-2 py-0.5 rounded uppercase">
                  {activeAchievement.metric}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
