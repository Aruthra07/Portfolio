import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, Star, MessageSquare, Award } from 'lucide-react';

interface SocialShowcaseProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Repo {
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  tag: string;
  stars: number;
}

const REPOS: Repo[] = [
  {
    name: 'AI-Career-Recommendation',
    desc: 'Personalized career guidance modeling suite utilizing machine learning regressions and analytics structures.',
    lang: 'Python',
    langColor: '#3572A5',
    tag: 'AI/ML',
    stars: 3
  },
  {
    name: 'Automation-Workflows',
    desc: 'Repository containing customized N8N connectors, web scrapers, and automation scripts.',
    lang: 'Python',
    langColor: '#3572A5',
    tag: 'Automation',
    stars: 2
  },
  {
    name: 'AI-Analytics-Dashboard',
    desc: 'Web interface presenting predictive insights and operation metrics using beautiful graph visualizations.',
    lang: 'HTML/CSS',
    langColor: '#e34c26',
    tag: 'Data Viz',
    stars: 4
  },
  {
    name: 'Smart-Hydroponics',
    desc: 'IoT telemetry scripts monitoring water pH, temperature, and atmospheric humidity of hydroponics modules.',
    lang: 'Python',
    langColor: '#3572A5',
    tag: 'IoT',
    stars: 5
  }
];

export const SocialShowcase: React.FC<SocialShowcaseProps> = ({ playAudio }) => {
  return (
    <section id="social-showcase" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: GitHub Showcase (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
              Open Source
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
              GitHub <span className="bg-gradient-main bg-clip-text text-transparent">Showcase</span>
            </h2>
            <p className="text-xs md:text-sm text-textSecondary max-w-lg mt-1 leading-relaxed">
              Explore active repositories and codebases on my GitHub profile (<strong className="text-textPrimary">@Aruthra07</strong>) focusing on AI systems, data visualizers, and automation scripts.
            </p>
          </div>

          {/* GitHub Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: '6+', label: 'Repositories' },
              { num: 'AI/ML', label: 'Primary Focus' },
              { num: 'Active', label: 'Projects Status' },
              { num: '150+', label: 'Commits Done' }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 rounded-2xl text-center border border-glass-border">
                <div className="text-xl md:text-2xl font-black font-display bg-gradient-main bg-clip-text text-transparent">
                  {stat.num}
                </div>
                <div className="text-[9px] md:text-[10px] text-textMuted tracking-wider font-semibold uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Repository Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REPOS.map((repo, idx) => (
              <motion.a
                key={idx}
                href="https://github.com/Aruthra07"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playAudio('hover')}
                onClick={() => playAudio('click')}
                className="glass-card p-5 rounded-2xl border border-glass-border hover:border-accentCyan/30 group block"
              >
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="text-sm md:text-base font-bold font-display text-accentCyan group-hover:underline">
                    {repo.name}
                  </h3>
                  <GitBranch className="w-4 h-4 text-textMuted" />
                </div>
                <p className="text-[11px] md:text-xs text-textSecondary leading-relaxed mb-4 h-12 overflow-hidden">
                  {repo.desc}
                </p>
                <div className="flex justify-between items-center text-[10px] text-textMuted font-mono">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                    {repo.lang}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500/20" /> {repo.stars} Stars
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="self-center lg:self-start mt-2">
            <a
              href="https://github.com/Aruthra07"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playAudio('hover')}
              onClick={() => playAudio('click')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-glass-border hover:border-accentPurple hover:bg-white/5 text-textPrimary text-xs font-bold rounded-full transition-all"
            >
              <i className="fab fa-github" /> View Full GitHub Profile
            </a>
          </div>
        </div>

        {/* Right Side: LinkedIn Showcase Dashboard (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
              Professional Networking
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
              LinkedIn <span className="bg-gradient-main bg-clip-text text-transparent">Showcase</span>
            </h2>
            <p className="text-xs md:text-sm text-textSecondary max-w-sm mt-1 leading-relaxed">
              Explore key community contributions, leadership updates, and certificates shared on my professional feed.
            </p>
          </div>

          {/* LinkedIn Glass Widget */}
          <div className="glass-card border border-glass-border rounded-3xl p-6 relative overflow-hidden">
            {/* Corner glowing strip */}
            <div className="absolute top-0 right-0 w-2 h-full bg-[#0077b5]" />

            {/* Profile Info Header */}
            <div className="flex gap-4 items-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-glass-border shadow-md flex-shrink-0 bg-gradient-main p-0.5">
                <img
                  src="/poftfolio images/my_photo[1].jpg"
                  alt="Aruthra S M"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-textPrimary flex items-center gap-1">
                  Aruthra S M <i className="fab fa-linkedin-in text-[#0077b5] text-xs ml-1" />
                </h3>
                <p className="text-[10px] md:text-xs text-textSecondary leading-none">
                  CEO at DotEco | Microsoft Ambassador | ECE student
                </p>
              </div>
            </div>

            {/* Updates / Posts list */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: <Star className="w-4 h-4 text-accentPurple" />,
                  title: 'Appointed CEO at DotEco',
                  desc: 'Thrilled to share my appointment as Chief Executive Officer at DotEco! Driving technical strategy and eco-sustainability meetups.'
                },
                {
                  icon: <Award className="w-4 h-4 text-accentCyan" />,
                  title: 'Azure AI Fundamentals Earned',
                  desc: 'Successfully certified in Azure AI Fundamentals (AI-900)! Expanding my public cloud architecture competencies.'
                },
                {
                  icon: <MessageSquare className="w-4 h-4 text-green-400" />,
                  title: 'Databricks Meetup Guest',
                  desc: 'Attended the regional Databricks ecosystem conference. Discussed large-scale delta lake pipelines and prompt frameworks.'
                }
              ].map((update, i) => (
                <div key={i} className="bg-white/5 border border-glass-border rounded-2xl p-4 flex gap-3 items-start">
                  <div className="p-2 bg-white/5 rounded-xl border border-glass-border mt-0.5">
                    {update.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-textPrimary leading-tight mb-1">
                      {update.title}
                    </h4>
                    <p className="text-[10px] md:text-xs text-textSecondary leading-relaxed">
                      {update.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-glass-border text-center">
              <a
                href="https://www.linkedin.com/in/aruthra-sm"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playAudio('hover')}
                onClick={() => playAudio('click')}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#0077b5] hover:bg-[#0077b5]/80 text-white text-xs font-bold rounded-2xl transition-all shadow-[0_4px_15px_rgba(0,119,181,0.3)]"
              >
                Connect on LinkedIn <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
