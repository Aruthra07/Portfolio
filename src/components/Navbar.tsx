import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  playAudio: (type: 'hover' | 'click') => void;
}

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Events', href: '#events' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  isMuted,
  toggleMute,
  playAudio,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background opacity scroll threshold
      setIsScrolled(window.scrollY > 50);

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    playAudio('click');
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] z-[999] bg-gradient-glow transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:px-12 flex justify-between items-center transition-all duration-300 ${
          isScrolled
            ? 'background-blur-md bg-[#030612]/75 light:bg-[#f4f6fc]/80 border-b border-glass-border shadow-xl backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
          onMouseEnter={() => playAudio('hover')}
          className="text-xl font-bold tracking-tight font-display bg-gradient-main bg-clip-text text-transparent"
        >
          AS
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-1 items-center bg-white/5 light:bg-black/5 p-1 rounded-full border border-glass-border">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                onMouseEnter={() => playAudio('hover')}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-textSecondary hover:text-textPrimary hover:bg-white/10 light:hover:bg-black/5 transition-all duration-200 block"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Interactive Controls & Hamburger */}
        <div className="flex items-center gap-3">
          {/* Audio Mute Toggle */}
          <button
            onClick={() => {
              playAudio('click');
              toggleMute();
            }}
            onMouseEnter={() => playAudio('hover')}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-glass-border bg-white/5 hover:bg-gradient-main text-textPrimary hover:text-white transition-all duration-300 cursor-pointer"
            title={isMuted ? 'Unmute UI Sounds' : 'Mute UI Sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              playAudio('click');
              toggleTheme();
            }}
            onMouseEnter={() => playAudio('hover')}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-glass-border bg-white/5 hover:bg-gradient-main text-textPrimary hover:text-white transition-all duration-300 cursor-pointer"
            title={theme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume Download (Desktop) */}
          <a
            href="https://drive.google.com/file/d/1RN87HSbJbbLVsGDfqpd0RxK0JllZZrYx/view"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playAudio('click')}
            onMouseEnter={() => playAudio('hover')}
            className="hidden md:flex items-center gap-1 px-4 py-2 border border-accentPurple/30 bg-accentPurple/5 text-accentPurple hover:bg-accentPurple/10 text-xs font-bold rounded-full transition-all duration-300"
          >
            Resume
          </a>

          {/* Hire Me CTA (Desktop) */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#contact');
            }}
            onMouseEnter={() => playAudio('hover')}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-gradient-main hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] text-white text-xs font-bold rounded-full transition-all duration-300"
          >
            Hire Me
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => {
              playAudio('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            onMouseEnter={() => playAudio('hover')}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-glass-border bg-white/5 text-textPrimary cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-[90] p-6 bg-[#030612]/95 light:bg-[#f4f6fc]/95 border-b border-glass-border backdrop-blur-xl flex flex-col gap-3 md:hidden shadow-2xl"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                onMouseEnter={() => playAudio('hover')}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-textSecondary hover:text-textPrimary hover:bg-white/5 light:hover:bg-black/5 transition-all duration-200 block"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1RN87HSbJbbLVsGDfqpd0RxK0JllZZrYx/view"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playAudio('click');
                setMobileMenuOpen(false);
              }}
              onMouseEnter={() => playAudio('hover')}
              className="mt-2 text-center py-3 border border-accentPurple/30 bg-accentPurple/5 text-accentPurple hover:bg-accentPurple/10 font-bold rounded-xl text-sm block"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
              onMouseEnter={() => playAudio('hover')}
              className="text-center py-3 bg-gradient-main text-white font-bold rounded-xl text-sm block"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
