import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock, BookOpen } from 'lucide-react';

interface ArticlesProps {
  playAudio: (type: 'hover' | 'click') => void;
}

const ARTICLES = [
  {
    id: 'microsoft',
    title: 'A Day at Microsoft: Walking the Dream',
    excerpt: 'An inside look at my incredible visit to the Microsoft Bangalore corporate office. Exploring enterprise cloud architecture, the culture of continuous innovation, and the power of the Microsoft Learn community.',
    date: 'May 2025',
    readTime: '5 min read',
    link: 'https://www.linkedin.com/pulse/day-microsoft-walking-dream-aruthra-manivannan-e9syc',
    image: import.meta.env.BASE_URL + 'portfolio_images/MS.jpg',
    tags: ['Microsoft', 'Cloud', 'Community']
  },
  {
    id: 'solo-ride',
    title: 'How Time Transformed My Solo Ride in Bangalore',
    excerpt: 'Reflections on attending the national level ecological hackathon. A journey of rapid hardware compilation, pitching strategies, and eco-sustainable telemetry networking from a solo perspective.',
    date: 'April 2025',
    readTime: '4 min read',
    link: 'https://www.linkedin.com/pulse/time-transformed-my-solo-ride-bangalore-aruthra-manivannan-qc03c',
    image: import.meta.env.BASE_URL + 'portfolio_images/hackathon_banner.png',
    tags: ['Hackathon', 'IoT', 'Sustainability']
  },
  {
    id: 'hackhustle',
    title: 'Some Journeys Don\'t Change Your Destination, They Change Who You Are',
    excerpt: 'My experience at the HackHustle 2.0 Hackathon. 24 hours of hardware-software integration, high-pressure hardware debugging, and real-time data streaming logic.',
    date: 'June 2025',
    readTime: '6 min read',
    link: 'https://www.linkedin.com/pulse/some-journeys-dont-change-your-destination-who-you-aruthra-manivannan-psufc',
    image: import.meta.env.BASE_URL + 'portfolio_images/tech_conf_banner.png',
    tags: ['Hardware', 'Prototyping', 'Teamwork']
  }
];

export const Articles: React.FC<ArticlesProps> = ({ playAudio }) => {
  return (
    <section id="articles" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Thought Leadership
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
          Featured <span className="bg-gradient-main bg-clip-text text-transparent">Articles</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Sharing my experiences, technical insights, and community journeys through comprehensive articles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ARTICLES.map((article, idx) => (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            key={article.id}
            onMouseEnter={() => playAudio('hover')}
            onClick={() => playAudio('click')}
            className="group glass-card rounded-3xl overflow-hidden border border-glass-border flex flex-col hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(139,92,246,0.15)] block cursor-pointer"
          >
            <div className="w-full h-48 overflow-hidden relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bgPrimary/90 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
                  <BookOpen className="w-3 h-3" /> Article
                </span>
                <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-md text-[10px] font-bold text-white flex items-center gap-1.5 border border-white/10">
                  <Clock className="w-3 h-3 text-accentCyan" /> {article.readTime}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <span className="text-[10px] text-textMuted font-mono mb-3 block">{article.date}</span>
              
              <h3 className="text-lg font-bold font-display text-textPrimary mb-3 group-hover:text-accentPurple transition-colors leading-snug">
                {article.title}
              </h3>
              
              <p className="text-sm text-textSecondary leading-relaxed mb-6 flex-1">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {article.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 border border-glass-border text-textSecondary uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-glass-border flex items-center justify-between">
                <span className="text-xs font-bold text-accentCyan group-hover:text-accentPurple transition-colors flex items-center gap-2">
                  Read on LinkedIn
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accentPurple group-hover:text-white text-textSecondary transition-all">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
