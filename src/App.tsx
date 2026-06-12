import { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { ThreeBackground } from './components/ThreeBackground';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillsUniverse } from './components/SkillsUniverse';
import { Projects } from './components/Projects';
import { CertVault } from './components/CertVault';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { SocialShowcase } from './components/SocialShowcase';
import { Contact } from './components/Contact';
import { AIAssistant } from './components/AIAssistant';
import { VideoResume } from './components/VideoResume';
import { EventsJourney } from './components/EventsJourney';
import { LeadershipHighlights } from './components/LeadershipHighlights';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMuted, setIsMuted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // Handle document theme classes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Capture mouse coordinates for custom cursor trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // Web Audio Synthesis Sound Effects (pure client-side, zero assets needed)
  const playAudio = (type: 'hover' | 'click') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.008, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (err) {
      console.warn('AudioContext inactive or blocked:', err);
    }
  };

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen text-textPrimary select-none">
      {/* Custom Cursor Followers (hidden on mobile) */}
      <div
        className="hidden md:block custom-cursor"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      <div
        className="hidden md:block custom-cursor-dot"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* Floating Header Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        toggleMute={toggleMute}
        playAudio={playAudio}
      />

      {/* Interactive 3D Particles */}
      <ThreeBackground />

      {/* Main Pages content stack */}
      <main className="flex flex-col items-center">
        <Hero playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <About playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <VideoResume playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <SkillsUniverse playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <Projects playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <CertVault playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <Experience playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <EventsJourney playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <LeadershipHighlights playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <Achievements playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <SocialShowcase playAudio={playAudio} />
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-accentPurple/25 to-transparent my-6" />

        <Contact playAudio={playAudio} />
      </main>

      {/* Main footer info */}
      <footer className="py-10 border-t border-glass-border text-center text-textMuted text-xs font-sans relative z-10 w-full bg-[#030612]/40">
        <div className="flex justify-center gap-6 mb-4 text-base">
          <a
            href="https://www.linkedin.com/in/aruthra-sm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-textSecondary hover:text-accentPurple transition-colors"
          >
            <i className="fab fa-linkedin-in" />
          </a>
          <a
            href="https://github.com/Aruthra07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-textSecondary hover:text-accentPurple transition-colors"
          >
            <i className="fab fa-github" />
          </a>
          <a
            href="mailto:aruthramani785@gmail.com"
            className="text-textSecondary hover:text-accentPurple transition-colors"
          >
            <i className="fas fa-envelope" />
          </a>
        </div>
        <p className="font-semibold text-textSecondary">
          Technology &bull; Leadership &bull; Innovation
        </p>
        <p className="mt-2 text-[10px] text-textMuted">
          &copy; 2026 Aruthra S M. All rights reserved.
        </p>
      </footer>

      {/* Chat Assistant */}
      <AIAssistant playAudio={playAudio} />
    </div>
  );
}

export default App;
