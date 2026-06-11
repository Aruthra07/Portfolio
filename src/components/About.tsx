import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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

const SKILL_BARS = [
  { name: "Technical Expertise", percentage: 88 },
  { name: "Leadership & Communication", percentage: 92 },
  { name: "Community Building", percentage: 85 },
  { name: "AI & Cloud Fluency", percentage: 80 }
];

export const About: React.FC<AboutProps> = ({ playAudio }) => {
  // 3D Portrait Tilt Animation Values
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Who I Am
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
          Building Tomorrow's <br />
          <span className="bg-gradient-main bg-clip-text text-transparent">Technology Leader</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Interactive 3D Frame & Traits */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* 3D Frame Container */}
          <div
            className="perspective-[1000px] w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center cursor-pointer aspect-square flex-shrink-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => playAudio('hover')}
            ref={cardRef}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="w-full h-full glass-card rounded-[2.5rem] flex flex-col items-center justify-center relative shadow-2xl overflow-hidden border border-glass-border group aspect-square flex-shrink-0"
            >
              {/* Outer Orbit Rings (spinning rounded halos) */}
              <div className="absolute inset-2 border border-dashed border-accentPurple/30 rounded-[2.2rem] animate-spin-clockwise pointer-events-none" />
              <div className="absolute inset-4 border border-dashed border-accentCyan/20 rounded-[2.0rem] animate-spin-counterclockwise pointer-events-none" />

              {/* Glowing backlights */}
              <div className="absolute w-32 h-32 bg-accentBlue/20 blur-[40px] rounded-full top-1/4 left-1/4 group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute w-32 h-32 bg-accentPurple/20 blur-[40px] rounded-full bottom-1/4 right-1/4 group-hover:scale-125 transition-transform duration-500" />

              {/* Profile Photo */}
              <div className="absolute inset-3.5 z-10 rounded-[2rem] overflow-hidden aspect-square flex-shrink-0 bg-[#070b1a]/20 border border-white/5 group-hover:border-accentCyan/20 transition-all duration-300">
                <img
                  src="/poftfolio images/my_photo[1].jpg"
                  alt="Aruthra S M Portrait"
                  className="w-full h-full object-cover select-none transform group-hover:scale-105 transition-transform duration-500 aspect-square flex-shrink-0"
                />
              </div>
            </motion.div>
          </div>

          {/* Traits Tag Cloud */}
          <div className="flex flex-wrap gap-2 justify-center mt-10 max-w-sm">
            {TRAITS_DATA.map((trait, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-textSecondary bg-white/5 border border-glass-border hover:border-accentCyan hover:text-accentCyan hover:bg-accentCyan/5 transition-all duration-300 flex items-center gap-1.5"
              >
                {trait.icon}
                {trait.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Bio Story & Performance Bars */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-textSecondary font-sans">
          <p className="text-sm md:text-base leading-relaxed">
            I'm <strong className="text-textPrimary">Aruthra S M</strong>, an Electronics & Communication Engineering student at SNS College of Engineering with an <strong className="text-accentCyan">8.8 CGPA</strong>. I am passionate about transforming ideas into impact through technology, leadership, and communication.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            My journey blends <strong className="text-textPrimary">technical depth</strong> with <strong className="text-textPrimary">human connection</strong> — from exploring AI, cloud platforms, and automation tools to building communities, hosting events, and empowering others through public speaking and content creation.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            As CEO of <strong className="text-textPrimary">DotEco</strong> and an active participant in Microsoft, AWS, and Oracle communities, I bring a rare combination of engineering rigor, entrepreneurial mindset, and communication prowess — bridging business management and technology across global ecosystems.
          </p>

          {/* Competency Bars */}
          <div className="flex flex-col gap-4 mt-4">
            {SKILL_BARS.map((bar, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-textPrimary">{bar.name}</span>
                  <span className="text-accentCyan">{bar.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: idx * 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-main rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
