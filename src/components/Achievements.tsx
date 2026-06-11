import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Star, Mic, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface AchievementsProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Achievement {
  id: string;
  title: string;
  category: string;
  metric: string;
  desc: string;
  icon: React.ReactNode;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'pub',
    title: 'Research Publication',
    category: 'Academic Research',
    metric: '1 Published Paper',
    desc: 'Authored and published ECE technical paper in IJNRD (International Journal of Novel Research and Development), showcasing engineering discovery.',
    icon: <BookOpen className="w-6 h-6 text-yellow-400" />
  },
  {
    id: 'speak',
    title: 'Public Speaking',
    category: 'Communication',
    metric: '5+ Tech Events',
    desc: 'Invited speaker and workshop host conducting interactive developer webinars and training sessions at regional college meetups.',
    icon: <Mic className="w-6 h-6 text-accentCyan" />
  },
  {
    id: 'ceo',
    title: 'DotEco CEO Execution',
    category: 'Leadership & Business',
    metric: 'Chief Executive Officer',
    desc: 'Coordinating strategic planning, cross-functional engineering teams, and sustainability events for DotEco.',
    icon: <Star className="w-6 h-6 text-accentPurple" />
  },
  {
    id: 'ambassador',
    title: 'Microsoft Student Ambassador',
    category: 'Community Leadership',
    metric: 'Beta Tier Lead',
    desc: 'Organized hackathons, hosted training sessions, and promoted Azure cognitive services to the campus student ecosystem.',
    icon: <Award className="w-6 h-6 text-accentBlue" />
  },
  {
    id: 'iot_project',
    title: 'Smart IoT Prototyping',
    category: 'Technical Contribution',
    metric: '3 Integrated Builds',
    desc: 'Engineered and programmed functional Smart Hydroponics, RFID Smart Access, and GPS Wearable safety prototypes.',
    icon: <Sparkles className="w-6 h-6 text-accentPink" />
  },
  {
    id: 'cloud_cert',
    title: 'Public Cloud Master',
    category: 'Cloud Credentials',
    metric: '10+ Certifications',
    desc: 'Earned professional level cloud certifications across public platforms: AWS AI, AWS SA, Azure AI, and OCI GenAI Professional.',
    icon: <ShieldAlert className="w-6 h-6 text-green-400 animate-pulse-slow" />
  }
];

export const Achievements: React.FC<AchievementsProps> = ({ playAudio }) => {
  const triggerConfetti = (id: string) => {
    playAudio('click');

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
    <section id="achievements" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Milestones
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white">
          Trophy Room & <span className="bg-gradient-main bg-clip-text text-transparent">Recognition</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Celebrating peer recognition, community impact leadership, and published research. Click on any trophy card to celebrate!
        </p>
      </div>

      {/* Grid of Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((ach, idx) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => triggerConfetti(ach.id)}
            onMouseEnter={() => playAudio('hover')}
            className="glass-card p-6 md:p-8 rounded-3xl border border-glass-border hover:border-accentCyan/30 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
          >
            {/* Holographic background circle */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-glow opacity-5 blur-[25px] rounded-full group-hover:scale-125 transition-transform duration-500" />

            <div>
              {/* Icon & Category Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="p-3 bg-white/5 border border-glass-border rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {ach.icon}
                </div>
                <span className="text-[10px] text-textMuted font-bold uppercase font-mono tracking-widest bg-white/5 border border-glass-border px-3 py-1 rounded-full">
                  {ach.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold font-display text-white mb-2 leading-tight">
                {ach.title}
              </h3>
              <p className="text-xs md:text-sm text-textSecondary leading-relaxed mb-6">
                {ach.desc}
              </p>
            </div>

            {/* Achievement Metric Footer */}
            <div className="pt-4 border-t border-glass-border flex justify-between items-center text-xs font-mono">
              <span className="text-textMuted">RECORDED STATUS</span>
              <span className="text-accentCyan font-bold tracking-wider uppercase">
                {ach.metric}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
