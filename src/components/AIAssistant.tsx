import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles } from 'lucide-react';

interface AIAssistantProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

const AI_KNOWLEDGE: { [key: string]: string } = {
  skills: "Aruthra is highly skilled in Programming (Python, C, SQL, HTML), Cloud & AI (AWS Solutions Architect/AI Practitioner, Azure AI, OCI GenAI Professional), Workflow Automation (N8N), Analytics (Tableau, Excel, MySQL), and Professional Skills (CEO leadership, public speaking, technical content writing).",
  projects: "Aruthra has built 6 major projects: Smart Hydroponics System (IoT sustainability), RFID Smart Access Control (embedded security), Innovation in Wearables (safety tracking), AI Career Recommendation Engine (ML pathfinding), Automatic Form Filling script (N8N browser automation), and AI Analytics Dashboard (Tableau reporting).",
  certs: "Aruthra holds 9+ certifications including AWS AI Practitioner, AWS Solutions Architect, Azure AI Fundamentals, OCI Generative AI Professional, Salesforce Agentforce Specialist, and SnowPro Core Associate.",
  contact: "You can reach Aruthra via email at aruthramani785@gmail.com, connect with her on LinkedIn (linkedin.com/in/aruthra-sm), or view her projects on GitHub (github.com/Aruthra07).",
  education: "Aruthra is pursuing a BE in ECE at SNS College of Engineering with an 8.8 CGPA. She completed SSLC with 94% and HSC with 78% from Navabharath International School.",
  ceo: "Aruthra serves as CEO of DotEco, leading environmental sustainability events, managing cross-functional student engineering teams, and outlining strategy.",
  events: "Aruthra is highly active in the community, attending Microsoft 365, Databricks, N8N, Nvidia, and CDAC Cybersecurity conferences, along with organizing workshops and hackathons.",
  publication: "Aruthra has a published technical research paper in the International Journal of Novel Research and Development (IJNRD).",
  hello: "Hello! I am Aruthra's AI assistant. Ask me about her skills, projects, certifications, or leadership roles!",
  default: "That's an interesting question! Aruthra is an ECE engineer, AI Explorer, and CEO of DotEco. Feel free to ask about her projects, cloud certifications, or contact details, or email her directly at aruthramani785@gmail.com!"
};

export const AIAssistant: React.FC<AIAssistantProps> = ({ playAudio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hi! I'm Aruthra's AI assistant. Ask me anything about her cloud certifications, CEO role, or engineering projects!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const msgEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    playAudio('click');
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and typing delay
    setTimeout(() => {
      const query = text.toLowerCase();
      let reply = AI_KNOWLEDGE.default;

      if (query.includes('skill') || query.includes('expert') || query.includes('language') || query.includes('stack')) {
        reply = AI_KNOWLEDGE.skills;
      } else if (query.includes('project') || query.includes('code') || query.includes('build')) {
        reply = AI_KNOWLEDGE.projects;
      } else if (query.includes('cert') || query.includes('credentials') || query.includes('aws') || query.includes('azure') || query.includes('oracle')) {
        reply = AI_KNOWLEDGE.certs;
      } else if (query.includes('contact') || query.includes('reach') || query.includes('email') || query.includes('linkedin')) {
        reply = AI_KNOWLEDGE.contact;
      } else if (query.includes('education') || query.includes('college') || query.includes('cgpa')) {
        reply = AI_KNOWLEDGE.education;
      } else if (query.includes('ceo') || query.includes('doteco') || query.includes('work') || query.includes('job')) {
        reply = AI_KNOWLEDGE.ceo;
      } else if (query.includes('event') || query.includes('conference') || query.includes('meetup')) {
        reply = AI_KNOWLEDGE.events;
      } else if (query.includes('paper') || query.includes('publish') || query.includes('research')) {
        reply = AI_KNOWLEDGE.publication;
      } else if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('help')) {
        reply = AI_KNOWLEDGE.hello;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            className="w-[320px] md:w-[360px] h-[450px] bg-[#070b1a]/95 border border-glass-border rounded-3xl overflow-hidden shadow-2xl flex flex-col mb-4 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-main px-5 py-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <div>
                  <h3 className="text-sm font-bold font-display leading-none">Ask Aruthra AI</h3>
                  <span className="text-[10px] text-white/80 leading-none">Online &middot; Smart Assistant</span>
                </div>
              </div>
              <button
                onClick={() => {
                  playAudio('click');
                  setIsOpen(false);
                }}
                className="p-1 hover:bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-none bg-[#030612]/30">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col max-w-[85%] rounded-2xl p-3.5 text-xs md:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-main text-white ml-auto rounded-tr-none'
                      : 'bg-white/5 border border-glass-border text-textSecondary mr-auto rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-white/5 border border-glass-border text-textMuted rounded-2xl rounded-tl-none p-3.5 mr-auto text-xs flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-textMuted animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-textMuted animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 rounded-full bg-textMuted animate-bounce delay-150" />
                </div>
              )}
              <div ref={msgEndRef} />
            </div>

            {/* Input Row */}
            <div className="p-3 border-t border-glass-border flex gap-2 bg-[#030612]/70">
              <input
                type="text"
                placeholder="Ask about skills, projects, Germany plans..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-white/5 border border-glass-border rounded-xl px-4 py-2.5 text-xs text-textPrimary outline-none focus:border-accentPurple"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-xl bg-gradient-main flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Toggle Button */}
      <button
        onClick={() => {
          playAudio('click');
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => playAudio('hover')}
        className="w-14 h-14 rounded-full bg-gradient-main shadow-[0_8px_30px_rgba(139,92,246,0.5)] flex items-center justify-center text-white cursor-pointer relative hover:scale-110 transition-transform group"
        title="Ask AI Assistant"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accentCyan flex items-center justify-center border-2 border-bgPrimary">
          <Sparkles className="w-2.5 h-2.5 text-white animate-pulse" />
        </span>
      </button>
    </div>
  );
};
