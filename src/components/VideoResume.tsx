import React, { useState } from 'react';
import { Play, Sparkles, Clock, Target, Users, BookOpen } from 'lucide-react';

interface VideoResumeProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface SpotlightSegment {
  timeLabel: string;
  seconds: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const SPOTLIGHTS: SpotlightSegment[] = [
  {
    timeLabel: '0:00',
    seconds: 0,
    title: 'Introduction & Profile',
    desc: 'Brief overview of my student profile at SNS College and core focus areas in engineering.',
    icon: <Target className="w-4 h-4 text-accentCyan" />
  },
  {
    timeLabel: '0:42',
    seconds: 42,
    title: 'CEO Leadership at DotEco',
    desc: 'A summary of my chief corporate actions, team size, and environmental tech meetups.',
    icon: <Users className="w-4 h-4 text-accentPurple" />
  },
  {
    timeLabel: '1:24',
    seconds: 84,
    title: 'Global Communities Advocate',
    desc: 'Detailing Microsoft Learn, AWS, and CDAC digital forensics bootcamp contributions.',
    icon: <Sparkles className="w-4 h-4 text-accentPink" />
  },
  {
    timeLabel: '2:05',
    seconds: 125,
    title: 'Academic & Research Work',
    desc: 'Highlighting my 8.8 CGPA academic record and published research paper details.',
    icon: <BookOpen className="w-4 h-4 text-green-400" />
  }
];

export const VideoResume: React.FC<VideoResumeProps> = ({ playAudio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const handlePlay = (seconds: number = 0) => {
    playAudio('click');
    setStartTime(seconds);
    setIsPlaying(true);
  };

  const videoUrl = isPlaying 
    ? `https://www.youtube.com/embed/G2XvSvX4CMI?autoplay=1&start=${startTime}&rel=0&modestbranding=1&controls=1`
    : '';

  return (
    <section id="video-resume" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Presentation
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
          Video <span className="bg-gradient-main bg-clip-text text-transparent">Resume Spotlight</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Watch my brief 3-minute technical elevator pitch summarizing my engineering journey. Click the interactive chapters on the right to jump directly to specific segments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Video Player (7 columns) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div
            className="glass-card border border-glass-border p-3 md:p-4 rounded-3xl relative overflow-hidden shadow-2xl h-full flex flex-col justify-between"
            onMouseEnter={() => playAudio('hover')}
          >
            {/* Top Bar simulating device window */}
            <div className="flex justify-between items-center mb-4 px-2 text-textMuted font-mono text-[10px] md:text-xs border-b border-glass-border pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="ml-2 uppercase tracking-wider text-textSecondary flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accentCyan animate-ping" />
                  Stream: {isPlaying ? 'Active Playing' : 'Ready'}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accentPurple animate-pulse" />
                <span>Verifiable Link // YT-G2XvSvX4CMI</span>
              </div>
            </div>

            {/* Video IFrame / Lazy Thumbnail */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/90 relative shadow-inner border border-glass-border flex-1 flex items-center justify-center">
              {isPlaying ? (
                <iframe
                  src={videoUrl}
                  title="Aruthra S M - Video Resume"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full group cursor-pointer" onClick={() => handlePlay(0)}>
                  {/* YouTube high-res thumbnail */}
                  <img
                    src="https://img.youtube.com/vi/G2XvSvX4CMI/maxresdefault.jpg"
                    alt="Video Resume Thumbnail"
                    className="w-full h-full object-cover select-none filter brightness-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Glassmorphic Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <div className="w-16 h-16 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white shadow-2xl group-hover:scale-115 transition-all duration-300 group-hover:bg-gradient-main group-hover:border-transparent group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>
                  {/* Watermark badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-mono text-white flex items-center gap-1.5 backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5 text-accentCyan" /> 3 Min Pitch
                  </div>
                </div>
              )}
            </div>

            {/* Player Footer Bar */}
            <div className="mt-4 px-2 flex justify-between items-center text-[10px] font-mono text-textMuted select-none">
              <span>Source: YouTube Feed</span>
              <span>1080p Stream &middot; Fullscreen Enabled</span>
            </div>
          </div>
        </div>

        {/* Right Column: Featured Spotlight (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="glass-card border border-glass-border p-6 md:p-7 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-accentPurple/20 blur-[30px] rounded-full pointer-events-none" />

            <div>
              <span className="text-[10px] text-textMuted uppercase font-mono tracking-widest font-bold">Interactive Deck</span>
              <h3 className="text-xl font-bold font-display text-textPrimary mt-1 mb-6">
                Featured Chapters
              </h3>

              <div className="flex flex-col gap-3">
                {SPOTLIGHTS.map((spot, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePlay(spot.seconds)}
                    className={`text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer group ${
                      isPlaying && startTime === spot.seconds
                        ? 'bg-gradient-main/10 border-accentPurple/40'
                        : 'bg-white/5 border-glass-border hover:border-accentCyan/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="p-2.5 bg-white/5 border border-glass-border rounded-xl group-hover:scale-105 transition-transform">
                      {spot.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h4 className="text-xs md:text-sm font-bold text-textPrimary leading-none group-hover:text-accentCyan transition-colors">
                          {spot.title}
                        </h4>
                        <span className="text-[10px] font-mono text-accentPurple font-bold bg-white/5 px-2 py-0.5 rounded-md border border-glass-border">
                          {spot.timeLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-textSecondary leading-relaxed">
                        {spot.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Pitch Note */}
            <div className="mt-8 pt-5 border-t border-glass-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accentCyan/10 border border-accentCyan/20 flex items-center justify-center text-accentCyan flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <p className="text-[11px] leading-relaxed text-textSecondary">
                This presentation details my academic research, technical cloud projects, leadership as DotEco CEO, and my upcoming Higher Studies plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
