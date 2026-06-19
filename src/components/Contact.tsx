import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

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
      
      const subject = encodeURIComponent(formState.subject || 'Contact from Portfolio');
      const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
      window.location.href = `mailto:aruthramani785@gmail.com?subject=${subject}&body=${body}`;

      setFormState({ name: '', email: '', subject: '', message: '' });

      // Reset status back to idle after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-16 px-6 md:px-12 max-w-6xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-accentBlue mb-2">
          Get In Touch
        </span>
        <h2 className="text-3xl md:text-4xl font-black font-sora tracking-tight text-textPrimary">
          Let's Connect
        </h2>
        <p className="text-textSecondary text-xs md:text-sm max-w-2xl mt-2 leading-relaxed">
          Open to collaborations, cloud education events, speaking invitations, or general tech discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Contact details cards (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex items-center gap-5 mb-2">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-borderSilver shrink-0">
              <img
                src={import.meta.env.BASE_URL + "portfolio_images/aruthra_photo.jpg"}
                alt="Aruthra S M"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold font-sora text-textPrimary mb-1">
                Let's build something great.
              </h3>
              <p className="text-xs text-textSecondary leading-relaxed">
                Feel free to reach out. I typically respond within a few hours to emails and LinkedIn messages.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                icon: <Mail className="w-4.5 h-4.5" />,
                label: 'Email Address',
                value: 'aruthramani785@gmail.com',
                href: 'mailto:aruthramani785@gmail.com',
                color: '#0071E3'
              },
              {
                icon: <i className="fab fa-linkedin-in text-sm w-4.5 h-4.5 flex items-center justify-center" />,
                label: 'LinkedIn Profile',
                value: 'linkedin.com/in/aruthra-sm',
                href: 'https://www.linkedin.com/in/aruthra-sm',
                color: '#0077b5'
              },
              {
                icon: <i className="fab fa-github text-sm w-4.5 h-4.5 flex items-center justify-center" />,
                label: 'GitHub Account',
                value: 'github.com/Aruthra07',
                href: 'https://github.com/Aruthra07',
                color: '#181717'
              }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playAudio('hover')}
                onClick={() => playAudio('click')}
                className="bg-bgSecondary p-3.5 rounded-xl border border-borderSilver hover:border-accentBlue/40 hover:shadow-sm flex gap-4 items-center group transition-all duration-300"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: link.color }}
                >
                  {link.icon}
                </div>
                <div>
                  <div className="text-[9px] text-textMuted uppercase tracking-wider font-semibold">
                    {link.label}
                  </div>
                  <div className="text-xs font-bold text-textPrimary group-hover:text-accentBlue transition-colors duration-300">
                    {link.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Non-clickable Location Card */}
            <div className="bg-bgSecondary p-3.5 rounded-xl border border-borderSilver flex gap-4 items-center">
              <div className="w-9 h-9 rounded-lg bg-accentBlue flex items-center justify-center text-white shrink-0">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[9px] text-textMuted uppercase tracking-wider font-semibold">
                  Primary Location
                </div>
                <div className="text-xs font-bold text-textPrimary">
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
            className="bg-bgSecondary border border-borderSilver p-5 md:p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden shadow-sm"
          >
            {/* Top decorative accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-accentBlue" />

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-textSecondary uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="bg-bgPrimary border border-borderSilver focus:border-accentBlue focus:ring-1 focus:ring-accentBlue/20 rounded-xl p-3 text-xs md:text-sm text-textPrimary outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-textSecondary uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
                className="bg-bgPrimary border border-borderSilver focus:border-accentBlue focus:ring-1 focus:ring-accentBlue/20 rounded-xl p-3 text-xs md:text-sm text-textPrimary outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-textSecondary uppercase tracking-wider">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                placeholder="Speaking Invitation / Work Collaboration"
                className="bg-bgPrimary border border-borderSilver focus:border-accentBlue focus:ring-1 focus:ring-accentBlue/20 rounded-xl p-3 text-xs md:text-sm text-textPrimary outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-textSecondary uppercase tracking-wider">
                Message Body
              </label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                placeholder="Tell me about your idea or opportunity..."
                required
                rows={4}
                className="bg-bgPrimary border border-borderSilver focus:border-accentBlue focus:ring-1 focus:ring-accentBlue/20 rounded-xl p-3 text-xs md:text-sm text-textPrimary outline-none transition-colors resize-none"
              />
            </div>

            {/* Submission Button */}
            <button
              type="submit"
              disabled={status !== 'idle'}
              onMouseEnter={() => playAudio('hover')}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider ${
                status === 'success'
                  ? 'bg-green-600 text-white'
                  : 'bg-accentBlue hover:bg-blue-600 text-white shadow-sm hover:scale-[1.005]'
              }`}
            >
              {status === 'idle' && (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
              {status === 'sending' && (
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              )}
              {status === 'success' && (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Message Sent!
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
