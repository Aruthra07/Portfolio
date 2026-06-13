import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Calendar, Bookmark, Maximize2, Search, ArrowUpDown } from 'lucide-react';

interface CertVaultProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Certificate {
  id: string;
  name: string;
  provider: string;
  category: 'cloud' | 'db' | 'programming' | 'other';
  date: string; // YYYY-MM
  displayDate: string;
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
    category: 'cloud',
    date: '2025-01',
    displayDate: 'January 2025',
    iconClass: 'fab fa-aws text-orange-400',
    image: import.meta.env.BASE_URL + 'poftfolio images/AWS_Cert.png',
    link: import.meta.env.BASE_URL + 'poftfolio images/AWS_Cert.pdf',
    credentialId: 'AWS-CCP-2025-9981'
  },
  {
    id: 'snowflake_core',
    name: 'Snowflake SnowPro Core Certification',
    provider: 'Snowflake',
    category: 'db',
    date: '2025-02',
    displayDate: 'February 2025',
    iconClass: 'fas fa-snowflake text-sky-400',
    image: import.meta.env.BASE_URL + 'poftfolio images/Snowflake_Cert.png',
    link: import.meta.env.BASE_URL + 'poftfolio images/Snowflake_Cert.pdf',
    credentialId: 'SF-SNOWPRO-CORE-1025'
  },
  {
    id: 'sf_agentforce',
    name: 'Salesforce Certified Agentforce Specialist',
    provider: 'Salesforce',
    category: 'db',
    date: '2025-03',
    displayDate: 'March 2025',
    iconClass: 'fas fa-cloud text-blue-400',
    image: import.meta.env.BASE_URL + 'poftfolio images/Salesforce_Cert.png',
    link: import.meta.env.BASE_URL + 'poftfolio images/Salesforce_Cert.pdf',
    credentialId: 'SF-AG-SPECIALIST-3849'
  },
  {
    id: 'servicenow_csa',
    name: 'ServiceNow Certified System Administrator',
    provider: 'ServiceNow',
    category: 'db',
    date: '2025-04',
    displayDate: 'April 2025',
    iconClass: 'fas fa-cogs text-green-500',
    image: import.meta.env.BASE_URL + 'poftfolio images/ServiceNow_Cert.png',
    link: import.meta.env.BASE_URL + 'poftfolio images/ServiceNow_Cert.pdf',
    credentialId: 'SN-CSA-2025-0982'
  },
  {
    id: 'oracle_oci',
    name: 'Oracle Cloud Infrastructure Certified Associate',
    provider: 'Oracle',
    category: 'cloud',
    date: '2025-05',
    displayDate: 'May 2025',
    iconClass: 'fas fa-database text-red-500',
    image: import.meta.env.BASE_URL + 'poftfolio images/Oracle_Cert.png',
    link: import.meta.env.BASE_URL + 'poftfolio images/Oracle_Cert.pdf',
    credentialId: 'OCI-ASSOCIATE-2025-7763'
  },
  {
    id: 'oracle_genai',
    name: 'OCI Generative AI Professional',
    provider: 'Oracle',
    category: 'cloud',
    date: '2025-06',
    displayDate: 'June 2025',
    iconClass: 'fas fa-brain text-purple-400',
    image: import.meta.env.BASE_URL + 'poftfolio images/oracle/eCertificate.png',
    link: import.meta.env.BASE_URL + 'poftfolio images/oracle/eCertificate.pdf',
    credentialId: 'OCI-GENAI-PRO-1102'
  },
  {
    id: 'azure_placeholder',
    name: 'Microsoft Azure Fundamentals',
    provider: 'Microsoft',
    category: 'cloud',
    date: '2024-10',
    displayDate: 'October 2024',
    iconClass: 'fab fa-microsoft text-blue-500',
    image: import.meta.env.BASE_URL + 'poftfolio images/MS.jpg',
    link: '#',
    credentialId: 'MS-AZ-900-PENDING'
  },
  {
    id: 'python_placeholder',
    name: 'Python Programming Certification',
    provider: 'Python Institute',
    category: 'programming',
    date: '2024-05',
    displayDate: 'May 2024',
    iconClass: 'fab fa-python text-yellow-500',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=600',
    link: '#',
    credentialId: 'PY-INST-PENDING'
  },
  {
    id: 'iot_placeholder',
    name: 'Industrial IoT Specialist',
    provider: 'IoT Consortium',
    category: 'other',
    date: '2024-08',
    displayDate: 'August 2024',
    iconClass: 'fas fa-network-wired text-emerald-500',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    link: '#',
    credentialId: 'IIOT-SPEC-PENDING'
  },
  {
    id: 'databricks_placeholder',
    name: 'Databricks Certified Data Engineer',
    provider: 'Databricks',
    category: 'db',
    date: '2024-11',
    displayDate: 'November 2024',
    iconClass: 'fas fa-cube text-red-600',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    link: '#',
    credentialId: 'DB-ENG-PENDING'
  }
];

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Cloud & AI', value: 'cloud' },
  { label: 'Database & Data', value: 'db' },
  { label: 'Programming', value: 'programming' },
  { label: 'Other', value: 'other' }
];

type SortOption = 'date-desc' | 'date-asc' | 'org-asc' | 'org-desc';

export const CertVault: React.FC<CertVaultProps> = ({ playAudio }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredAndSortedCerts = useMemo(() => {
    let result = CERTIFICATES;

    // Filter by category
    if (activeFilter !== 'all') {
      result = result.filter(c => c.category === activeFilter);
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.provider.toLowerCase().includes(q) ||
        c.credentialId.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return b.date.localeCompare(a.date);
        case 'date-asc':
          return a.date.localeCompare(b.date);
        case 'org-asc':
          return a.provider.localeCompare(b.provider);
        case 'org-desc':
          return b.provider.localeCompare(a.provider);
        default:
          return 0;
      }
    });

    return result;
  }, [activeFilter, searchQuery, sortBy]);

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
          Access verified credentials from global technology leaders. Use the tools below to search, filter, and view full-screen verifiable certificates.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between mb-10 border-b border-glass-border pb-5">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                playAudio('click');
                setActiveFilter(tab.value);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeFilter === tab.value
                  ? 'bg-gradient-main text-white shadow-[0_4px_15px_rgba(139,92,246,0.3)]'
                  : 'bg-bgSecondary border border-glass-border text-textSecondary hover:text-textPrimary hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 bg-bgSecondary border border-glass-border text-textPrimary text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-accentCyan/50 focus:ring-1 focus:ring-accentCyan/50 transition-all"
            />
          </div>
          
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full sm:w-auto appearance-none bg-bgSecondary border border-glass-border text-textPrimary text-sm rounded-xl pl-10 pr-8 py-2.5 focus:outline-none focus:border-accentPurple/50 focus:ring-1 focus:ring-accentPurple/50 transition-all cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="org-asc">Organization (A-Z)</option>
              <option value="org-desc">Organization (Z-A)</option>
            </select>
            {/* Custom dropdown arrow to replace native one */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <i className="fas fa-chevron-down text-[10px] text-textMuted" />
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Deck Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredAndSortedCerts.map((cert) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={cert.id}
              onClick={() => handleCardClick(cert)}
              onMouseEnter={() => playAudio('hover')}
              className="glass-card p-5 rounded-[24px] border border-glass-border cursor-pointer flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] hover:-translate-y-2 style-3d"
            >
              {/* 3D Spotlight overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-[14px] bg-bgSecondary border border-glass-border flex items-center justify-center text-xl shadow-inner">
                    <i className={cert.iconClass} />
                  </div>
                  <span className="text-[10px] text-textMuted font-mono bg-bgSecondary px-2.5 py-1 rounded-md border border-glass-border uppercase shadow-sm">
                    {cert.category}
                  </span>
                </div>

                <h3 className="text-sm md:text-base font-bold font-display text-textPrimary mb-1 group-hover:text-accentCyan transition-colors leading-tight">
                  {cert.name}
                </h3>
                <p className="text-xs text-textSecondary font-medium">
                  {cert.provider}
                </p>
                
                <div className="mt-auto pt-6 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-textMuted">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {cert.displayDate}</span>
                  </div>
                  <div className="w-full h-[1px] bg-glass-border my-1" />
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-textMuted truncate pr-2 max-w-[120px]">{cert.credentialId}</span>
                    <span className="flex items-center gap-1 text-accentPurple font-bold group-hover:translate-x-1 transition-transform">
                      View <i className="fas fa-arrow-right text-[8px]" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredAndSortedCerts.length === 0 && (
          <div className="col-span-full py-12 text-center text-textSecondary bg-bgSecondary/50 rounded-3xl border border-glass-border border-dashed">
            <i className="fas fa-search text-2xl mb-3 text-textMuted" />
            <p>No certificates found matching your criteria.</p>
          </div>
        )}
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
              className={`relative bg-bgPrimary border border-glass-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 w-full max-w-5xl max-h-[90vh] transition-all duration-500`}
            >
              {/* Image Preview Container */}
              <div
                className={`relative bg-[#050814] flex items-center justify-center overflow-hidden p-4 md:p-8 border-b md:border-b-0 md:border-r border-glass-border transition-all duration-300 ${
                  isFullscreen ? 'md:w-full h-[85vh]' : 'md:w-3/5 h-[45vh] md:h-auto'
                }`}
              >
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className={`max-w-full max-h-full object-contain rounded-xl transition-all duration-500 select-none shadow-2xl ${
                    isFullscreen ? 'scale-100' : 'hover:scale-105'
                  }`}
                />
                
                {/* Fullscreen toggle button */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="absolute bottom-6 right-6 bg-black/70 hover:bg-gradient-main text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-white/20 hover:border-transparent backdrop-blur-md transition-all cursor-pointer z-20 shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </button>
              </div>

              {/* Text metadata block */}
              <div
                className={`p-6 md:p-8 flex flex-col justify-between transition-all duration-500 bg-bgSecondary ${
                  isFullscreen ? 'hidden' : 'md:w-2/5'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1.5 rounded-lg bg-accentCyan/10 border border-accentCyan/20 text-accentCyan text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      Verified Credential
                    </span>
                    <button
                      onClick={handleClose}
                      className="p-1.5 text-textSecondary hover:text-textPrimary bg-white/5 hover:bg-white/10 rounded-full border border-glass-border transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black font-display text-textPrimary mb-3 leading-tight">
                    {selectedCert.name}
                  </h3>
                  <p className="text-sm text-accentPurple font-semibold mb-8 flex items-center gap-2">
                    <i className={selectedCert.iconClass} /> {selectedCert.provider}
                  </p>

                  <div className="flex flex-col gap-5 text-xs font-mono border-t border-glass-border pt-6">
                    <div className="flex justify-between items-center gap-4 bg-white/5 p-3 rounded-xl border border-glass-border">
                      <span className="text-textMuted uppercase flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-textSecondary" /> Issue Date
                      </span>
                      <span className="text-textPrimary font-semibold">{selectedCert.displayDate}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 bg-white/5 p-3 rounded-xl border border-glass-border">
                      <span className="text-textMuted uppercase flex items-center gap-2">
                        <Bookmark className="w-4 h-4 text-textSecondary" /> Credential ID
                      </span>
                      <span className="text-textPrimary font-semibold text-right break-all">{selectedCert.credentialId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full mt-8 pt-6 border-t border-glass-border">
                  <button
                    onClick={handleClose}
                    className="flex-1 py-3.5 bg-bgPrimary border border-glass-border hover:bg-white/5 rounded-xl text-xs font-bold text-textPrimary transition-all cursor-pointer shadow-sm"
                  >
                    Close
                  </button>
                  {selectedCert.link !== '#' && (
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-[1.5] py-3.5 bg-gradient-main text-white hover:shadow-[0_8px_25px_rgba(139,92,246,0.5)] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      View Full Certificate <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <style>{`
        .style-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};
