import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Testimonial {
  name: string;
  role: string;
  org: string;
  text: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Head of ECE Department',
    org: 'SNS College of Engineering',
    text: 'Aruthra stands out for her academic dedication and project engineering capabilities. Maintaining an 8.8 CGPA while managing CEO tasks for DotEco proves her outstanding planning abilities.',
    avatar: '👨‍🏫'
  },
  {
    name: 'Sarah Jenkins',
    role: 'MLSA Community Director',
    org: 'Microsoft India Student Branch',
    text: 'Organizing Azure training camps and webinars across colleges, Aruthra has proven her capability as an outstanding public communicator and technology leader. She knows how to inspire teams.',
    avatar: '👩‍💼'
  },
  {
    name: 'Nikhil Sharma',
    role: 'AWS Community Lead',
    org: 'AWS Cloud Group India',
    text: 'Aruthra excels at translating cloud architectures into digestible learning guides. Her commitment to helping her classmates succeed and earn technical cloud credentials is highly commendable.',
    avatar: '👨‍💻'
  },
  {
    name: 'Lisa Mueller',
    role: 'Global ESG Project Partner',
    org: 'DotEco Sustainability Initiative',
    text: 'Working beside Aruthra on sustainability events has shown me her corporate maturity. She possesses a rare mixture of engineering rigor, entrepreneurial foresight, and strategic communication skills.',
    avatar: '👩‍🔬'
  }
];

export const Testimonials: React.FC<TestimonialsProps> = ({ playAudio }) => {
  // We duplicate the list to make a seamless infinite loop scroll marquee
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-24 overflow-hidden relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-2 mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Endorsements
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white">
          Faculty & Peer <span className="bg-gradient-main bg-clip-text text-transparent">Testimonials</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Recommendations from college professors, technical community mentors, and sustainability partners.
        </p>
      </div>

      {/* Infinite Horizontal Scroll Marquee */}
      <div className="flex w-full overflow-hidden mask-gradient-horizontal select-none">
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear'
            }
          }}
          className="flex gap-6 pr-6 whitespace-nowrap min-w-max"
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => playAudio('hover')}
              className="glass-card w-[350px] md:w-[420px] p-6 md:p-8 rounded-3xl border border-glass-border flex flex-col justify-between whitespace-normal group"
            >
              <div className="mb-6 flex gap-3 items-start justify-between">
                <Quote className="w-8 h-8 text-accentPurple/25 transform group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-3xl select-none">{item.avatar}</span>
              </div>

              <p className="text-xs md:text-sm text-textSecondary italic leading-relaxed mb-6">
                "{item.text}"
              </p>

              <div className="pt-4 border-t border-glass-border">
                <h4 className="text-sm font-bold text-white">{item.name}</h4>
                <p className="text-[10px] md:text-xs text-textMuted font-medium uppercase mt-0.5">
                  {item.role} &middot; <span className="text-accentCyan">{item.org}</span>
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
