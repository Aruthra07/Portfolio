import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Code, Download, FileText, X, Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  playAudio: (type: 'hover' | 'click') => void;
}

const DESIGNATIONS = [
  "Technology Enthusiast",
  "AI Explorer",
  "Community Leader",
  "Public Speaker",
  "Content Writer",
  "Problem Solver"
];

export const Hero: React.FC<HeroProps> = ({ playAudio }) => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [designIndex, setDesignIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Rotate through professional designations
  useEffect(() => {
    const timer = setInterval(() => {
      setDesignIndex((prev) => (prev + 1) % DESIGNATIONS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // IntersectionObserver to pause video when offscreen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((err) => console.log('Video autoplay prevented:', err));
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="hero" className="w-full min-h-screen flex flex-col justify-center relative px-6 md:px-12 py-16 overflow-hidden bg-bgPrimary transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: Professional Introduction (7 columns) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Executive Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-borderSilver bg-bgSecondary text-textPrimary text-xs font-semibold tracking-wide mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accentBlue animate-ping" /> Technology Leader & Innovator
          </motion.div>

          {/* Name Header */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black font-sora tracking-tight text-textPrimary mb-3 leading-none"
          >
            Aruthra S M
          </motion.h1>
          
          {/* Rotating Designations */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="h-10 md:h-12 overflow-hidden relative mb-5 w-full"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={designIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-4xl font-bold font-sora bg-gradient-main bg-clip-text text-transparent block"
              >
                {DESIGNATIONS[designIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Short Bio */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-sm md:text-base text-textSecondary mb-8 max-w-xl leading-relaxed font-sans"
          >
            I am passionate about technology, leadership, innovation, and creating impact through meaningful communities and projects. I specialize in orchestrating cloud environments, workflow automations, and driving tech initiatives.
          </motion.p>

          {/* Action Call-To-Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex flex-wrap gap-3.5 items-center mb-6"
          >
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                playAudio('click');
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => playAudio('hover')}
              className="flex items-center gap-2 px-5 py-3 bg-accentBlue text-white text-xs font-bold rounded-xl transition-all hover:bg-blue-600 shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <Compass className="w-4 h-4" /> Explore Journey
            </a>

            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                playAudio('click');
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => playAudio('hover')}
              className="flex items-center gap-2 px-5 py-3 border border-borderSilver bg-bgSecondary text-textPrimary text-xs font-bold rounded-xl transition-all hover:bg-borderSilver hover:-translate-y-0.5 cursor-pointer"
            >
              <Code className="w-4 h-4" /> View Projects
            </a>

            <button
              onClick={(e) => {
                e.preventDefault();
                playAudio('click');
                setShowResumeModal(true);
              }}
              onMouseEnter={() => playAudio('hover')}
              className="flex items-center gap-2 px-5 py-3 border border-borderSilver bg-transparent text-textPrimary text-xs font-bold rounded-xl transition-all hover:bg-bgSecondary hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" /> Resume
            </button>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-5 text-textSecondary"
          >
            <a
              href="https://www.linkedin.com/in/aruthra-sm"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playAudio('hover')}
              onClick={() => playAudio('click')}
              className="hover:text-accentBlue transition-colors p-1"
            >
              <i className="fab fa-linkedin-in text-lg" />
            </a>
            <a
              href="https://github.com/Aruthra07"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playAudio('hover')}
              onClick={() => playAudio('click')}
              className="hover:text-accentBlue transition-colors p-1"
            >
              <i className="fab fa-github text-lg" />
            </a>
            <a
              href="mailto:aruthramani785@gmail.com"
              onMouseEnter={() => playAudio('hover')}
              onClick={() => playAudio('click')}
              className="hover:text-accentBlue transition-colors p-1"
            >
              <i className="fas fa-envelope text-lg" />
            </a>
          </motion.div>
        </div>

        {/* Right Side: AI Video Resume Frame (5 columns) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center w-full"
        >
          <div 
            className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden bg-black border border-borderSilver shadow-2xl group"
          >
            {/* The HTML5 Video Element (Cropped, autoplay, muted, loop, no controls) */}
            <video
              ref={videoRef}
              src={import.meta.env.BASE_URL + "portfolio_images/portfolio_hero.mp4"}
              className="w-full h-full object-cover object-center"
              loop
              muted={isMuted}
              autoPlay
              playsInline
            />
            {/* Overlay Gradient shadow for premium look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Mute/Unmute Overlay Toggle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playAudio('click');
                if (videoRef.current) {
                  const newMuted = !videoRef.current.muted;
                  videoRef.current.muted = newMuted;
                  setIsMuted(newMuted);
                }
              }}
              onMouseEnter={() => playAudio('hover')}
              className="absolute bottom-4 right-4 p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all border border-white/20 z-20 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>
          </div>
        </motion.div>

      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                playAudio('click');
                setShowResumeModal(false);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-bgSecondary border border-borderSilver rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 w-full max-w-5xl h-[85vh]"
            >
              <div className="flex justify-between items-center p-5 border-b border-borderSilver bg-bgPrimary">
                <h3 className="text-xl font-bold font-sora text-textPrimary flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accentBlue" /> Executive Resume
                </h3>
                <div className="flex items-center gap-4">
                  <a
                    href={import.meta.env.BASE_URL + "portfolio_images/updated_resume.jpg"}
                    download="Aruthra_Resume.jpg"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-textPrimary text-bgPrimary text-sm font-bold rounded-lg transition-all hover:bg-gray-200"
                  >
                    <Download className="w-4 h-4" /> Download Resume
                  </a>
                  <button
                    onClick={() => {
                      playAudio('click');
                      setShowResumeModal(false);
                    }}
                    className="p-2.5 bg-bgPrimary hover:bg-borderSilver rounded-xl transition-colors border border-borderSilver text-textSecondary hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full bg-[#111111] relative overflow-y-auto custom-scrollbar p-4 md:p-8 flex justify-center">
                <img
                  src={import.meta.env.BASE_URL + "portfolio_images/updated_resume.jpg"}
                  alt="Aruthra S M Resume"
                  className="w-full max-w-3xl h-auto object-contain rounded-lg shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
