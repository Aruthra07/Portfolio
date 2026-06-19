import React, { useState } from 'react';


interface EventsProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface EventItem {
  id: string;
  year: string;
  title: string;
  location: string;
  category: string;
  learning: string;
  skills: string[];
  image: string;
  gallery: string[];
  link?: string;
  articleLink?: string;
  experienceLink?: string;
  proof?: string;
}

const TIMELINE_EVENTS: EventItem[] = [
  {
    id: 'e1',
    year: '2026',
    title: 'A Day at Microsoft : Walking Into a Dream',
    location: 'Microsoft Campus, Bangalore',
    category: 'Corporate Summit',
    learning: 'Engaged with Microsoft engineering leaders to evaluate Graph integrations, cloud fundamentals, and enterprise workspace automation strategies.',
    skills: ['Azure', 'Microsoft Graph', 'Enterprise Automation'],
    image: 'portfolio_images/events/Microsoft_.jpg',
    gallery: [
      'portfolio_images/events/Microsoft_.jpg',
      'portfolio_images/events/ms_campus.jpg'
    ],
    link: 'https://www.linkedin.com/pulse/day-microsoft-walking-dream-aruthra-manivannan-e9syc?utm_source=share&utm_medium=member_android&utm_campaign=share_via',
    experienceLink: 'https://www.linkedin.com/pulse/day-microsoft-walking-dream-aruthra-manivannan-e9syc?utm_source=share&utm_medium=member_android&utm_campaign=share_via',
    articleLink: 'https://www.linkedin.com/pulse/time-transformed-my-solo-ride-bangalore-aruthra-manivannan-qc03c?utm_source=share&utm_medium=member_android&utm_campaign=share_via'
  },
  {
    id: 'e2',
    year: '2025',
    title: 'SmartEcoSign Hackathon',
    location: 'Bangalore Institute of Technology',
    category: 'Competitive Hackathon',
    learning: 'Designed and pitched SmartEcoSign, an ecological sustainability and hardware prototyping solution, securing recognition.',
    skills: ['IoT Prototyping', 'Business Pitching', 'Agile Operations'],
    image: 'portfolio_images/events/SmartEcoSign.jpg',
    gallery: [
      'portfolio_images/events/SmartEcoSign.jpg'
    ],
    link: 'https://www.linkedin.com/pulse/time-transformed-my-solo-ride-bangalore-aruthra-manivannan-qc03c?utm_source=share&utm_medium=member_android&utm_campaign=share_via'
  },
  {
    id: 'e3',
    year: '2025',
    title: 'CMR, Cause 2025 Hackathon',
    location: 'CMR, Bangalore',
    category: 'Competitive Hackathon',
    learning: 'Spearheaded rapid hardware/software prototyping of an IoT environment tracking device under a strict 36-hour schedule.',
    skills: ['IoT Prototyping', 'Embedded Systems', 'Agile Leadership'],
    image: 'portfolio_images/events/CMR_.jpg',
    gallery: [
      'portfolio_images/events/CMR_.jpg',
      'portfolio_images/events/cause_2025.jpg'
    ],
    link: 'https://www.linkedin.com/posts/aruthra-sm_the-journey-activity-7319381930657886209-N3wt?utm_source=share&utm_medium=member_android&rcm=ACoAAEVTo0kBn2Ff2_vDMJvzWNUqqHGgFZ1i-3k'
  },
  {
    id: 'e5',
    year: '2025',
    title: 'N8N Webinar',
    location: 'Coimbatore, India',
    category: 'Automation Webinar',
    learning: 'Instructed students on N8N integration, triggers, API endpoints, and workflow logic.',
    skills: ['N8N', 'API Triggers', 'Workflows'],
    image: 'portfolio_images/events/n8n.jpg',
    gallery: [
      'portfolio_images/events/n8n.jpg'
    ],
    link: 'https://www.linkedin.com/posts/aruthra-sm_n8n-snowflake-nocodetools-activity-7355582416150818816-rEPr?utm_source=share&utm_medium=member_android&rcm=ACoAAEVTo0kBn2Ff2_vDMJvzWNUqqHGgFZ1i-3k'
  },
  {
    id: 'e6',
    year: '2025',
    title: 'DeSignSprint Figma Bootcamp',
    location: 'SNS College',
    category: 'UI/UX Bootcamp',
    learning: 'Organized Figma UI/UX wireframing bootcamp teaching design tokens and component systems.',
    skills: ['UI/UX Design', 'Figma Prototyping', 'Design Tokens'],
    image: 'portfolio_images/events/designsprint.jpg',
    gallery: [
      'portfolio_images/events/designsprint.jpg'
    ],
    link: 'https://www.linkedin.com/posts/aruthra-sm_uiuxdesign-creativebootcamp-designthinking-activity-7353812593477668870-Bzpg?utm_source=share&utm_medium=member_android&rcm=ACoAAEVTo0kBn2Ff2_vDMJvzWNUqqHGgFZ1i-3k'
  },
  {
    id: 'e7',
    year: '2025',
    title: 'Prompt to Production Meetup',
    location: 'Coimbatore, India',
    category: 'Meetups',
    learning: 'Hosted developer discussions evaluating LLM prompting techniques and prototype pipelines.',
    skills: ['AI/ML Prompting', 'Github Copilot', 'Tech Journey'],
    image: 'portfolio_images/events/prompt_to_ai.jpg',
    gallery: [
      'portfolio_images/events/prompt_to_ai.jpg'
    ],
    link: 'https://www.linkedin.com/posts/aruthra-sm_ai-githubcopilot-techjourney-activity-7347239876007772160-tTCe?utm_source=share&utm_medium=member_android&rcm=ACoAAEVTo0kBn2Ff2_vDMJvzWNUqqHGgFZ1i-3k'
  },
  {
    id: 'e8',
    year: '2024',
    title: 'CDAC Memory & Malware Forensic Bootcamp',
    location: 'Kerala, India',
    category: 'Security Bootcamp',
    learning: 'Completed hands-on forensics labs analyzing malware memory dumps and network security audit structures.',
    skills: ['Malware Forensics', 'Cryptography', 'Vulnerability Auditing'],
    image: 'portfolio_images/events/Kerala, CDAC bootcamp_.jpg',
    gallery: [
      'portfolio_images/events/Kerala, CDAC bootcamp_.jpg'
    ],
    link: 'https://www.linkedin.com/posts/aruthra-sm_cybersecurity-digitalforensics-memoryforensics-activity-7311772796945055745-MYl9?utm_source=share&utm_medium=member_android&rcm=ACoAAEVTo0kBn2Ff2_vDMJvzWNUqqHGgFZ1i-3k'
  },
  {
    id: 'e9',
    year: '2024',
    title: 'TechX Conference',
    location: 'Chennai, India',
    category: 'Technology Summit',
    learning: 'Analyzed future edge hardware designs, telemetry protocols, and IoT integration setups.',
    skills: ['Edge Computing', 'IoT Standards', 'Hardware Architecture'],
    image: 'portfolio_images/events/techx.jpg',
    gallery: [
      'portfolio_images/events/techx.jpg'
    ],
    link: 'https://www.linkedin.com/posts/aruthra-sm_techxconf-ai-cloudcomputing-activity-7263856949098627072-8-xO?utm_source=share&utm_medium=member_android&rcm=ACoAAEVTo0kBn2Ff2_vDMJvzWNUqqHGgFZ1i-3k'
  },
  {
    id: 'e10',
    year: '2025',
    title: 'HackHustle 2.0 Hackathon',
    location: 'Coimbatore, India',
    category: 'Competitive Hackathon',
    learning: 'Designed real-time data streaming pipelines and resolved hardware debugging challenges during a high-pressure 24-hour sprint.',
    skills: ['Hardware Integration', 'Data Streaming', 'System Debugging'],
    image: 'portfolio_images/events/hackhustel.jpg',
    gallery: [
      'portfolio_images/events/hackhustel.jpg'
    ],
    link: 'https://www.linkedin.com/pulse/some-journeys-dont-change-your-destination-who-you-aruthra-manivannan-psufc',
    articleLink: 'https://www.linkedin.com/pulse/some-journeys-dont-change-your-destination-who-you-aruthra-manivannan-psufc'
  }
];

export const EventsShowcase: React.FC<EventsProps> = ({ playAudio }) => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleCardClick = (id: string) => {
    playAudio('click');
    setFlippedCardId((prev) => (prev === id ? null : id));
  };

  const scroll = (direction: 'left' | 'right') => {
    playAudio('click');
    if (containerRef.current) {
      const scrollAmount = 320;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="events" className="py-16 px-6 md:px-12 max-w-6xl mx-auto relative z-10 w-full overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-accentBlue mb-2 font-sans">
            Professional Exposure
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-sora tracking-tight text-textPrimary">
            Events & Conferences
          </h2>
          <p className="text-textSecondary text-xs md:text-sm max-w-xl mt-2 leading-relaxed font-sans">
            Interactive flash cards of key tech summits, community hackathons, and webinars. Click any card to flip and explore details.
          </p>
        </div>

        {/* Scroll Arrows */}
        <div className="flex gap-2 self-end">
          <button
            onClick={() => scroll('left')}
            onMouseEnter={() => playAudio('hover')}
            className="w-10 h-10 rounded-full border border-borderSilver bg-bgSecondary text-textPrimary flex items-center justify-center hover:bg-accentBlue hover:text-white hover:border-accentBlue transition-all shadow-sm cursor-pointer"
            title="Previous Event"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            onMouseEnter={() => playAudio('hover')}
            className="w-10 h-10 rounded-full border border-borderSilver bg-bgSecondary text-textPrimary flex items-center justify-center hover:bg-accentBlue hover:text-white hover:border-accentBlue transition-all shadow-sm cursor-pointer"
            title="Next Event"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Flash Card Deck Carousel */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-6 pb-6 w-full cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TIMELINE_EVENTS.map((event) => {
          const isFlipped = flippedCardId === event.id;

          return (
            <div
              key={event.id}
              onClick={() => handleCardClick(event.id)}
              className="snap-start shrink-0 w-[260px] sm:w-[290px] h-[280px] [perspective:1000px] cursor-pointer"
            >
              {/* Inner flippable card */}
              <div
                className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] shadow-sm hover:shadow-md rounded-2xl"
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : 'none'
                }}
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 w-full h-full rounded-2xl border border-borderSilver bg-bgSecondary overflow-hidden flex flex-col justify-between [backface-visibility:hidden]">
                  <div className="w-full flex-1 flex flex-col">
                    {/* Image */}
                    <div className="w-full h-[120px] overflow-hidden bg-black/5 relative shrink-0">
                      <img
                        src={import.meta.env.BASE_URL + event.image}
                        alt={event.title}
                        className="w-full h-full object-cover pointer-events-none select-none"
                      />
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[8px] font-bold text-white uppercase tracking-wider font-mono">
                        {event.category}
                      </span>
                    </div>

                    {/* Text content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-bold text-accentBlue uppercase tracking-wider font-mono">
                          {event.year} &bull; {event.location}
                        </span>
                        <h3 className="text-sm font-bold font-sora text-textPrimary leading-snug mt-1.5 line-clamp-2">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Front Footer hint */}
                  <div className="p-3 border-t border-borderSilver/50 flex justify-between items-center text-[10px] text-textMuted bg-bgPrimary/50">
                    <span>Click to Flip Details</span>
                    <svg className="w-3.5 h-3.5 text-accentBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L20 6" />
                    </svg>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl border border-borderSilver bg-bgSecondary p-3.5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto custom-scrollbar"
                  onClick={(e) => {
                    // prevent flipping back when clicking details links
                    if ((e.target as HTMLElement).closest('a')) {
                      e.stopPropagation();
                    }
                  }}
                >
                  <div className="flex flex-col gap-2">
                    {/* Category Title */}
                    <div className="flex justify-between items-center pb-2 border-b border-borderSilver/50">
                      <span className="text-[9px] font-bold text-accentBlue uppercase tracking-wider font-mono">
                        {event.year} &bull; {event.category}
                      </span>
                      <span className="text-[8px] text-textMuted uppercase font-mono">{event.location}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xs font-bold font-sora text-textPrimary">
                      {event.title}
                    </h4>

                    {/* Description */}
                    <p className="text-[10px] text-textSecondary leading-snug">
                      {event.learning}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {event.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded bg-bgPrimary border border-borderSilver text-[7.5px] font-bold text-textMuted uppercase tracking-wide"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Redirection Links */}
                  <div className="flex flex-col gap-1 pt-2 border-t border-borderSilver/50 mt-2">
                    {event.proof && (
                      <a
                        href={import.meta.env.BASE_URL + event.proof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1 bg-bgPrimary border border-borderSilver hover:bg-borderSilver rounded-lg text-[8px] font-bold text-textPrimary flex items-center justify-center gap-1.5 transition-all"
                      >
                        View Verification Proof
                      </a>
                    )}
                    {event.experienceLink && (
                      <a
                        href={event.experienceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1 bg-bgPrimary border border-borderSilver hover:bg-borderSilver rounded-lg text-[8px] font-bold text-textPrimary flex items-center justify-center gap-1.5 transition-all"
                      >
                        Read Experience
                      </a>
                    )}
                    {event.articleLink && (
                      <a
                        href={event.articleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1 bg-bgPrimary border border-borderSilver hover:bg-borderSilver rounded-lg text-[8px] font-bold text-textPrimary flex items-center justify-center gap-1.5 transition-all"
                      >
                        Read Article
                      </a>
                    )}
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 bg-accentBlue hover:bg-blue-600 text-white rounded-lg text-[8px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        Open LinkedIn Post
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
