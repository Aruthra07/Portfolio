import React, { useState } from 'react';
import { Mail, Globe, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  playAudio: (type: 'hover' | 'click') => void;
}

export const Contact: React.FC<ContactProps> = ({ playAudio }) => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playAudio('click');
    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });

      // Reset status back to idle after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Get In Touch
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white">
          Let's <span className="bg-gradient-main bg-clip-text text-transparent">Connect</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Open to collaborations, cloud advocacy events, speaking invitations, or general chats.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Contact details cards (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h3 className="text-xl md:text-2xl font-bold font-display text-white">
            Let's build something great together.
          </h3>
          <p className="text-xs md:text-sm text-textSecondary leading-relaxed mb-4">
            Feel free to ping me. I generally respond within a few hours to emails and LinkedIn messages.
          </p>

          <div className="flex flex-col gap-3">
            {[
              {
                icon: <Mail className="w-5 h-5" />,
                label: 'Email Address',
                value: 'aruthramani785@gmail.com',
                href: 'mailto:aruthramani785@gmail.com',
                color: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
              },
              {
                icon: <i className="fab fa-linkedin-in text-base w-5 h-5 flex items-center justify-center" />,
                label: 'LinkedIn Profile',
                value: 'linkedin.com/in/aruthra-sm',
                href: 'https://www.linkedin.com/in/aruthra-sm',
                color: 'linear-gradient(135deg, #0077b5, #005582)'
              },
              {
                icon: <i className="fab fa-github text-base w-5 h-5 flex items-center justify-center" />,
                label: 'GitHub Account',
                value: 'github.com/Aruthra07',
                href: 'https://github.com/Aruthra07',
                color: 'linear-gradient(135deg, #333333, #111111)'
              },
              {
                icon: <Globe className="w-5 h-5" />,
                label: 'Canva Portfolio',
                value: 'aruthra785portfolio.my.canva.site',
                href: 'https://aruthra785portfolio.my.canva.site',
                color: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
              }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playAudio('hover')}
                onClick={() => playAudio('click')}
                className="glass-card p-4 rounded-2xl border border-glass-border hover:border-accentCyan/30 flex gap-4 items-center group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ background: link.color }}
                >
                  {link.icon}
                </div>
                <div>
                  <div className="text-[10px] text-textMuted uppercase tracking-wider font-semibold">
                    {link.label}
                  </div>
                  <div className="text-xs md:text-sm font-bold text-textPrimary group-hover:text-accentCyan transition-colors duration-300">
                    {link.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Non-clickable Location Card */}
            <div className="glass-card p-4 rounded-2xl border border-glass-border flex gap-4 items-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-main flex items-center justify-center text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-textMuted uppercase tracking-wider font-semibold">
                  Primary Location
                </div>
                <div className="text-xs md:text-sm font-bold text-textPrimary">
                  Coimbatore, Tamil Nadu, India
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Message Submission Form (7 columns) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glass-card border border-glass-border p-6 md:p-8 rounded-3xl flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Top decorative glow strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-glow" />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-textSecondary uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="bg-[#030612]/30 border border-glass-border focus:border-accentPurple rounded-xl p-3 text-xs md:text-sm text-textPrimary outline-none transition-colors backdrop-blur-md"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-textSecondary uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
                className="bg-[#030612]/30 border border-glass-border focus:border-accentPurple rounded-xl p-3 text-xs md:text-sm text-textPrimary outline-none transition-colors backdrop-blur-md"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-textSecondary uppercase tracking-wider">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                placeholder="Speaking Invitation / Work Collaboration"
                className="bg-[#030612]/30 border border-glass-border focus:border-accentPurple rounded-xl p-3 text-xs md:text-sm text-textPrimary outline-none transition-colors backdrop-blur-md"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-textSecondary uppercase tracking-wider">
                Message Body
              </label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                placeholder="Tell me about your idea or opportunity..."
                required
                rows={5}
                className="bg-[#030612]/30 border border-glass-border focus:border-accentPurple rounded-xl p-3 text-xs md:text-sm text-textPrimary outline-none transition-colors resize-none backdrop-blur-md"
              />
            </div>

            {/* Submission Button */}
            <button
              type="submit"
              disabled={status !== 'idle'}
              onMouseEnter={() => playAudio('hover')}
              className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                status === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-main hover:shadow-[0_4px_20px_rgba(139,92,246,0.4)] text-white hover:scale-[1.01]'
              }`}
            >
              {status === 'idle' && (
                <>
                  <Send className="w-4 h-4" /> Send Secure Message
                </>
              )}
              {status === 'sending' && (
                <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              )}
              {status === 'success' && (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Message Sent Successfully!
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
