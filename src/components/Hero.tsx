import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Code, Send, Download, Award, Users, Calendar, FileText } from 'lucide-react';

interface HeroProps {
  playAudio: (type: 'hover' | 'click') => void;
}

const STATS = [
  { label: 'Certifications', value: 10, icon: <Award className="w-5 h-5 text-accentCyan" /> },
  { label: 'Projects', value: 6, icon: <Code className="w-5 h-5 text-accentPurple" /> },
  { label: 'Communities', value: 5, icon: <Users className="w-5 h-5 text-accentBlue" /> },
  { label: 'Tech Events', value: 11, icon: <Calendar className="w-5 h-5 text-accentPink" /> },
  { label: 'Research Pub', value: 1, icon: <FileText className="w-5 h-5 text-green-400" /> }
];

export const Hero: React.FC<HeroProps> = ({ playAudio }) => {
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Building Solutions.",
    "Inspiring People.",
    "Exploring Possibilities.",
    "Creating Impact."
  ];

  // Typing effect
  useEffect(() => {
    let timer: any;
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
      }, 75);

      if (typedText === currentPhrase) {
        timer = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
      }, 45);

      if (typedText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  // Stat Counter Animation
  const [animatedStats, setAnimatedStats] = useState(STATS.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 50;
    const steps = duration / interval;

    const timer = setInterval(() => {
      setAnimatedStats((prev) =>
        prev.map((val, idx) => {
          const target = STATS[idx].value;
          if (val >= target) return target;
          const increment = Math.ceil(target / steps);
          return Math.min(val + increment, target);
        })
      );
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="min-height-screen flex flex-col items-center justify-center text-center relative overflow-hidden py-32 px-6 md:px-12 w-full min-h-screen">
      {/* Floating Space-Tech Background layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-30 z-0">
        {[
          {
            svg: (
              <svg className="w-8 h-8 text-accentCyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="4" height="4" rx="1" />
                <rect x="17" y="11" width="4" height="4" rx="1" />
                <rect x="10" y="3" width="4" height="4" rx="1" />
                <rect x="10" y="17" width="4" height="4" rx="1" />
                <path d="M7 13h3M14 13h3M12 7v3M12 14v3" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            ),
            x: '8%',
            y: '15%',
            delay: 0
          },
          {
            svg: (
              <svg className="w-8 h-8 text-accentPurple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="9" y="9" width="6" height="6" rx="1" />
                <path d="M9 12H5M15 12h4M12 9V5M12 15v4M2 10h3v4H2zm17 0h3v4h-3zM10 2h4v3h-4zm0 17h4v3h-4z" />
              </svg>
            ),
            x: '88%',
            y: '25%',
            delay: 1.5
          },
          {
            svg: (
              <svg className="w-8 h-8 text-accentBlue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12h5l2-3 3 6 2-3h8M5 12l2-4M17 12l2 4M9 9l1-3M13 15l1 3" />
                <circle cx="2" cy="12" r="1.5" fill="currentColor" />
                <circle cx="22" cy="12" r="1.5" fill="currentColor" />
              </svg>
            ),
            x: '5%',
            y: '65%',
            delay: 3
          },
          {
            svg: (
              <svg className="w-8 h-8 text-accentPink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="5" r="2.5" />
                <circle cx="5" cy="12" r="2.5" />
                <circle cx="19" cy="12" r="2.5" />
                <circle cx="12" cy="19" r="2.5" />
                <path d="M7 10.5l3.5-3M13.5 7.5l3.5 3M7 13.5l3.5 3M13.5 16.5l3.5-3M5 12h14M12 5v14" />
              </svg>
            ),
            x: '90%',
            y: '70%',
            delay: 0.8
          },
          {
            svg: (
              <svg className="w-8 h-8 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l4 2 2 5-1 6-5 4-5-1-4-5 1-7zM8 7a1 1 0 100-2 1 1 0 000 2zm6 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-5 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm8-8a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            ),
            x: '3%',
            y: '40%',
            delay: 2.2
          },
          {
            svg: (
              <svg className="w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2s4 4 4 10c0 3-1.5 5-4 7-2.5-2-4-4-4-7 0-6 4-10 4-10zM9 15l-3 4v-2M15 15l3 4v-2M12 8v4M10 10h4" />
              </svg>
            ),
            x: '80%',
            y: '80%',
            delay: 1.8
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            {item.svg}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Glow badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-glass-border shadow-lg text-accentCyan font-sans text-xs md:text-sm font-semibold mb-8 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-accentCyan animate-ping" />
          ✦ ECE Student &middot; AI Explorer &middot; Community Leader
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-8xl font-black font-display tracking-tight text-textPrimary mb-6 leading-none"
        >
          <span className="bg-gradient-glow bg-clip-text text-transparent glow-text">Aruthra</span> S M
        </motion.h1>

        {/* Subtitle / Roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs md:text-base font-bold font-sans tracking-[0.25em] text-textSecondary uppercase mb-6"
        >
          Technology &bull; Leadership &bull; Innovation &bull; Communication
        </motion.div>

        {/* Typing Headline */}
        <div className="min-h-[2.5rem] md:min-h-[3rem] mb-6 flex justify-center items-center">
          <span className="text-xl md:text-3xl font-display font-bold text-textPrimary">
            {typedText}
          </span>
          <span className="w-0.5 h-6 md:h-8 bg-accentCyan ml-1.5 animate-[blink_1s_infinite] inline-block" />
        </div>

        {/* Quote Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-panel border-l-4 border-accentPurple rounded-r-2xl py-4 px-6 md:px-8 italic text-textSecondary text-sm md:text-base mb-10 max-w-xl shadow-lg font-sans"
        >
          "Every new day is a new opportunity that life gives you."
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center items-center mb-16"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              playAudio('click');
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => playAudio('hover')}
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-main text-white text-sm font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(139,92,246,0.4)]"
          >
            <Compass className="w-4 h-4" /> Explore My Journey
          </a>

          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              playAudio('click');
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => playAudio('hover')}
            className="flex items-center gap-2 px-6 py-3.5 glass-panel border border-glass-border text-textPrimary hover:border-accentPurple hover:bg-white/5 text-sm font-bold rounded-full transition-all duration-300 hover:scale-105"
          >
            <Code className="w-4 h-4" /> View Projects
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              playAudio('click');
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => playAudio('hover')}
            className="flex items-center gap-2 px-6 py-3.5 glass-panel border border-glass-border text-textPrimary hover:border-accentCyan hover:bg-white/5 text-sm font-bold rounded-full transition-all duration-300 hover:scale-105"
          >
            <Send className="w-4 h-4" /> Let's Connect
          </a>

          <a
            href="https://drive.google.com/file/d/1RN87HSbJbbLVsGDfqpd0RxK0JllZZrYx/view"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playAudio('click')}
            onMouseEnter={() => playAudio('hover')}
            className="flex items-center gap-2 px-6 py-3.5 border border-accentPurple/30 bg-accentPurple/5 text-accentPurple hover:bg-accentPurple/10 text-sm font-bold rounded-full transition-all duration-300 hover:scale-105"
          >
            <Download className="w-4 h-4" /> Resume
          </a>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full"
        >
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card flex flex-col items-center justify-center p-5 rounded-2xl relative overflow-hidden group border border-glass-border"
            >
              <div className="mb-2.5 p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-black font-display bg-gradient-main bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {animatedStats[idx]}+
              </div>
              <div className="text-[10px] md:text-xs text-textMuted tracking-wider font-semibold uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
