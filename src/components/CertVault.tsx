import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Calendar, Bookmark, Maximize2 } from 'lucide-react';

interface CertVaultProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Certificate {
  id: string;
  name: string;
  provider: string;
  providerCode: 'aws' | 'azure' | 'oracle' | 'salesforce' | 'snowflake' | 'servicenow' | 'others';
  date: string;
  iconClass: string;
  image: string;
  link: string;
  credentialId: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'aws_cp',
    name: 'AWS Certified Cloud Practitioner',
    provider: 'Amazon Web Services',
    providerCode: 'aws',
    date: 'Earned 2025',
    iconClass: 'fab fa-aws text-orange-400',
    image: '/poftfolio images/AWS_Cert.png',
    link: 'https://drive.google.com/file/d/1L8xuoN8dVhhzxFm3b7bDjfFQGKXBkDj-/view',
    credentialId: 'AWS-CCP-2025-9981'
  },
  {
    id: 'snowflake_core',
    name: 'Snowflake SnowPro Core Certification',
    provider: 'Snowflake',
    providerCode: 'snowflake',
    date: 'Earned 2025',
    iconClass: 'fas fa-snowflake text-sky-400',
    image: '/poftfolio images/Snowflake_Cert.png',
    link: 'https://drive.google.com/file/d/1RH_zjvVQDkDaGCOUnpq28PO7KlWgYfk4/view',
    credentialId: 'SF-SNOWPRO-CORE-1025'
  },
  {
    id: 'sf_agentforce',
    name: 'Salesforce Certified Agentforce Specialist',
    provider: 'Salesforce',
    providerCode: 'salesforce',
    date: 'Earned 2025',
    iconClass: 'fas fa-cloud text-blue-400',
    image: '/poftfolio images/Salesforce_Cert.png',
    link: 'https://drive.google.com/file/d/1Ohqh3oWiKBrpl9dsy0NavxYIuNbCQciA/view',
    credentialId: 'SF-AG-SPECIALIST-3849'
  },
  {
    id: 'servicenow_csa',
    name: 'ServiceNow Certified System Administrator',
    provider: 'ServiceNow',
    providerCode: 'servicenow',
    date: 'Earned 2025',
    iconClass: 'fas fa-cogs text-green-500',
    image: '/poftfolio images/ServiceNow_Cert.png',
    link: 'https://drive.google.com/file/d/1xje33FYZ4tHF8cH-fS92ILkwheV9xu9O/view',
    credentialId: 'SN-CSA-2025-0982'
  },
  {
    id: 'oracle_oci',
    name: 'Oracle Cloud Infrastructure Certified Associate',
    provider: 'Oracle Cloud Infrastructure',
    providerCode: 'oracle',
    date: 'Earned 2025',
    iconClass: 'fas fa-database text-red-500',
    image: '/poftfolio images/Oracle_Cert.png',
    link: 'https://drive.google.com/file/d/1qLRRkv32_hn_U-KghWkgFvaoaCX3qfF-/view',
    credentialId: 'OCI-ASSOCIATE-2025-7763'
  },
  {
    id: 'oracle_genai',
    name: 'OCI Generative AI Professional',
    provider: 'Oracle Cloud Infrastructure',
    providerCode: 'oracle',
    date: 'Earned 2025',
    iconClass: 'fas fa-brain text-purple-400',
    image: '/poftfolio images/oracle/eCertificate.png',
    link: 'https://drive.google.com/file/d/1qLRRkv32_hn_U-KghWkgFvaoaCX3qfF-/view',
    credentialId: 'OCI-GENAI-PRO-1102'
  },
  {
    id: 'google_cloud_bootcamp',
    name: 'Google Cloud Practitioner Bootcamp',
    provider: 'Google Cloud',
    providerCode: 'others',
    date: 'Earned 2024',
    iconClass: 'fab fa-google text-red-400',
    image: '/poftfolio images/Bootcamp.png',
    link: 'https://www.linkedin.com/posts/aruthra-sm_cybersecurity-digitalforensics-memoryforensics-activity-7311772796945055745-MYl9',
    credentialId: 'GCP-BOOTCAMP-2024'
  },
  {
    id: 'coursera_analytics',
    name: 'Data Analytics Foundations',
    provider: 'Coursera (Google)',
    providerCode: 'others',
    date: 'Earned 2024',
    iconClass: 'fas fa-chart-line text-blue-500',
    image: '/poftfolio images/course era.png',
    link: 'https://www.linkedin.com/posts/aruthra-sm_uiuxdesign-creativebootcamp-designthinking-activity-7353812593477668870-Bzpg',
    credentialId: 'COURSERA-DA-FOUND'
  }
];

const CATEGORIES = [
  { label: 'All Credentials', value: 'all' },
  { label: 'Cloud & AI', value: 'cloud' },
  { label: 'Automation & DB', value: 'db' }
];

export const CertVault: React.FC<CertVaultProps> = ({ playAudio }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredCerts = CERTIFICATES.filter((cert) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'cloud') {
      return cert.providerCode === 'aws' || cert.providerCode === 'azure' || cert.providerCode === 'oracle';
    }
    if (activeFilter === 'db') {
      return cert.providerCode === 'snowflake' || cert.providerCode === 'salesforce' || cert.providerCode === 'servicenow';
    }
    return true;
  });

  const handleCardClick = (cert: Certificate) => {
    playAudio('click');
    setSelectedCert(cert);
    setIsFullscreen(false);
  };

  const handleClose = () => {
    playAudio('click');
    setSelectedCert(null);
    setIsFullscreen(false);
  };

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Verifications
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-textPrimary">
          Certification <span className="bg-gradient-main bg-clip-text text-transparent">Vault</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Access verified cloud, database, automation, and system administration credentials. Click any certificate card to view issuer details and full-screen previews.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 justify-center md:justify-start mb-10 border-b border-glass-border pb-5">
        {CATEGORIES.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              playAudio('click');
              setActiveFilter(tab.value);
            }}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeFilter === tab.value
                ? 'bg-gradient-main text-white shadow-lg shadow-accentPurple/20'
                : 'bg-white/5 border border-glass-border text-textSecondary hover:text-textPrimary hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Certificates Deck Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCerts.map((cert) => (
          <motion.div
            layout
            key={cert.id}
            onClick={() => handleCardClick(cert)}
            onMouseEnter={() => playAudio('hover')}
            className="glass-card p-5 rounded-3xl border border-glass-border cursor-pointer flex flex-col justify-between group relative overflow-hidden hover:scale-[1.02] transition-all duration-300"
          >
            {/* Spotlight overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accentPurple/10 to-accentCyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-glass-border flex items-center justify-center text-lg">
                  <i className={cert.iconClass} />
                </div>
                <span className="text-[10px] text-textMuted font-mono bg-white/5 px-2.5 py-1 rounded-md border border-glass-border uppercase">
                  {cert.providerCode}
                </span>
              </div>

              <h3 className="text-sm md:text-base font-bold font-display text-textPrimary mb-2 group-hover:text-accentCyan transition-colors">
                {cert.name}
              </h3>
              <p className="text-xs text-textSecondary">
                {cert.provider}
              </p>
            </div>

            <div className="relative z-10 pt-4 mt-6 border-t border-glass-border flex justify-between items-center text-[10px] font-mono text-textMuted">
              <span>{cert.date}</span>
              <span className="flex items-center gap-1 text-accentCyan font-bold group-hover:underline">
                View Proof <i className="fas fa-chevron-right text-[8px]" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Zoomable Details & Fullscreen Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative bg-[#070b1a] border border-glass-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 w-full max-w-4xl max-h-[85vh] ${
                isFullscreen ? 'md:max-w-5xl' : ''
              }`}
            >
              {/* Image Preview Container (60% width) */}
              <div
                className={`relative bg-black flex items-center justify-center overflow-hidden p-4 border-b md:border-b-0 md:border-r border-glass-border transition-all duration-300 ${
                  isFullscreen ? 'md:w-full h-[70vh]' : 'md:w-3/5 h-[40vh] md:h-auto'
                }`}
              >
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className={`max-w-full max-h-full object-contain rounded-lg transition-transform duration-300 select-none shadow-md ${
                    isFullscreen ? 'scale-100' : 'hover:scale-105'
                  }`}
                />
                
                {/* Fullscreen toggle button */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="absolute bottom-4 right-4 bg-black/60 hover:bg-gradient-main text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-white/10 hover:border-transparent transition-all cursor-pointer z-20"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  {isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
                </button>
              </div>

              {/* Text metadata block (40% width, hidden if fullscreen layout chosen on wide desktop) */}
              <div
                className={`p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFullscreen ? 'hidden md:flex md:w-80 border-l border-glass-border bg-[#030612]/95' : 'md:w-2/5'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-lg bg-accentCyan/10 border border-accentCyan/20 text-accentCyan text-[10px] font-bold uppercase tracking-wider">
                      Verified Credentials
                    </span>
                    <button
                      onClick={handleClose}
                      className="p-1 text-textSecondary hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold font-display text-textPrimary mb-2 leading-snug">
                    {selectedCert.name}
                  </h3>
                  <p className="text-sm text-textSecondary mb-6">
                    {selectedCert.provider}
                  </p>

                  <div className="flex flex-col gap-4 text-xs font-mono border-t border-glass-border pt-6">
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-textMuted uppercase flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Date Earned
                      </span>
                      <span className="text-textPrimary">{selectedCert.date}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-textMuted uppercase flex items-center gap-1">
                        <Bookmark className="w-3.5 h-3.5" /> Credential ID
                      </span>
                      <span className="text-textPrimary text-right break-all">{selectedCert.credentialId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full mt-8">
                  {isFullscreen && (
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="px-4 py-3 border border-glass-border hover:bg-white/5 rounded-2xl text-xs font-bold text-textPrimary transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      Show Info
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    className="flex-1 py-3 border border-glass-border hover:bg-white/5 rounded-2xl text-xs font-bold text-textPrimary transition-all cursor-pointer"
                  >
                    Close
                  </button>
                  {selectedCert.link !== '#' && (
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-gradient-main text-white hover:shadow-[0_4px_20px_rgba(139,92,246,0.4)] rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      Verify Link <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
