import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "Initializing quantum core...",
  "Loading technical skills universe...",
  "Spinning orbital systems...",
  "Accessing certification vault...",
  "Indexing leadership timeline...",
  "Deploying neural assistant chatbot...",
  "Aruthra S M Portfolio Active."
];

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental steps for high-tech feeling
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const logIndex = Math.min(
    Math.floor((progress / 100) * BOOT_LOGS.length),
    BOOT_LOGS.length - 1
  );

  useEffect(() => {
    if (progress === 100) {
      const delay = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(delay);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#030612] flex flex-col items-center justify-center p-6 select-none font-display">
      <div className="w-full max-w-lg flex flex-col gap-8">
        {/* Cinematic Glowing Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black tracking-tight text-white">
            ARUTHRA<span className="bg-gradient-glow bg-clip-text text-transparent ml-2">S M</span>
          </h1>
          <p className="text-xs text-accentCyan tracking-[0.3em] uppercase mt-2 font-sans font-semibold">
            Technology · Leadership · Innovation
          </p>
        </motion.div>

        {/* Boot System Terminal Logs */}
        <div className="bg-[#070b1d] border border-glass-border rounded-xl p-5 h-40 font-mono text-[11px] md:text-xs text-textSecondary flex flex-col gap-2 shadow-2xl relative overflow-hidden neumorphic-inset">
          <div className="absolute top-2 right-3 flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></span>
          </div>

          <div className="flex-1 flex flex-col justify-end gap-1">
            <AnimatePresence mode="popLayout">
              {BOOT_LOGS.slice(0, logIndex + 1).map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-2 ${
                    index === logIndex ? 'text-accentCyan' : 'text-textMuted'
                  }`}
                >
                  <span className="text-[#8b5cf6] font-bold">&gt;</span>
                  <span>{log}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs font-semibold tracking-wider font-sans">
            <span className="text-accentPurple uppercase">Core Initializing</span>
            <span className="text-accentCyan">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-gradient-glow rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Secondary Info */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center text-[10px] text-textMuted font-mono tracking-widest"
        >
          SECURE PROTOCOL // ARUTHRA07.GITHUB.IO
        </motion.div>
      </div>
    </div>
  );
};
