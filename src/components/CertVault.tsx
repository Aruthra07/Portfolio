import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpDown, X, ExternalLink } from 'lucide-react';

interface CertVaultProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface Certificate {
  id: string;
  name: string;
  provider: string;
  category: 'cloud' | 'db';
  date: string;
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
    iconClass: 'fab fa-aws text-orange-500',
    image: import.meta.env.BASE_URL + 'portfolio_images/aws_cloud_practitioner.jpg',
    link: import.meta.env.BASE_URL + 'portfolio_images/aws_cloud_practitioner.jpg',
    credentialId: 'AWS-CCP-2025-9981'
  },
  {
    id: 'aws_sa',
    name: 'AWS Certified Solutions Architect - Associate',
    provider: 'Amazon Web Services',
    category: 'cloud',
    date: '2025-06',
    displayDate: 'June 2025',
    iconClass: 'fab fa-aws text-orange-400',
    image: import.meta.env.BASE_URL + 'portfolio_images/aws_solution_architect.jpg',
    link: import.meta.env.BASE_URL + 'portfolio_images/aws_solution_architect.jpg',
    credentialId: 'AWS-SAA-2025-7729'
  },
  {
    id: 'snowflake_core',
    name: 'Snowflake SnowPro Core Certification',
    provider: 'Snowflake',
    category: 'db',
    date: '2025-02',
    displayDate: 'February 2025',
    iconClass: 'fas fa-snowflake text-sky-400',
    image: import.meta.env.BASE_URL + 'portfolio_images/Snowflake_Cert.png',
    link: import.meta.env.BASE_URL + 'portfolio_images/Snowflake_Cert.pdf',
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
    image: import.meta.env.BASE_URL + 'portfolio_images/Salesforce_Cert.png',
    link: import.meta.env.BASE_URL + 'portfolio_images/Salesforce_Cert.pdf',
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
    image: import.meta.env.BASE_URL + 'portfolio_images/ServiceNow_Cert.png',
    link: import.meta.env.BASE_URL + 'portfolio_images/ServiceNow_Cert.pdf',
    credentialId: 'SN-CSA-2025-0982'
  },
  {
    id: 'oracle_oci',
    name: 'Oracle Cloud Infrastructure Associate',
    provider: 'Oracle',
    category: 'cloud',
    date: '2025-05',
    displayDate: 'May 2025',
    iconClass: 'fas fa-database text-red-500',
    image: import.meta.env.BASE_URL + 'portfolio_images/Oracle_Cert.png',
    link: import.meta.env.BASE_URL + 'portfolio_images/Oracle_Cert.pdf',
    credentialId: 'OCI-ASSOCIATE-2025-7763'
  },
  {
    id: 'oracle_genai',
    name: 'OCI Generative AI Professional',
    provider: 'Oracle',
    category: 'cloud',
    date: '2026-03',
    displayDate: 'March 2026',
    iconClass: 'fas fa-brain text-purple-400',
    image: import.meta.env.BASE_URL + 'portfolio_images/oracle/eCertificate.png',
    link: import.meta.env.BASE_URL + 'portfolio_images/oracle/eCertificate.pdf',
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
    image: import.meta.env.BASE_URL + 'portfolio_images/MS.jpg',
    link: import.meta.env.BASE_URL + 'portfolio_images/MS.jpg',
    credentialId: 'MS-AZ-900-VERIFIED'
  }
];

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Cloud & AI', value: 'cloud' },
  { label: 'Database & Data', value: 'db' }
];

type SortOption = 'date-desc' | 'date-asc' | 'org-asc' | 'org-desc';

export const CertVault: React.FC<CertVaultProps> = ({ playAudio }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);


  const filteredAndSortedCerts = useMemo(() => {
    let result = CERTIFICATES;

    if (activeFilter !== 'all') {
      result = result.filter(c => c.category === activeFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.provider.toLowerCase().includes(q) ||
        c.credentialId.toLowerCase().includes(q)
      );
    }

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
  };

  const handleClose = () => {
    playAudio('click');
    setSelectedCert(null);
  };

  return (
    <>
      <section id="certifications" className="py-16 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col gap-2 mb-8 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-accentBlue mb-2 font-sans">
            Verifications
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-sora tracking-tight text-textPrimary">
            Certification Vault
          </h2>
          <p className="text-textSecondary text-xs md:text-sm max-w-2xl leading-relaxed">
            Access verified credentials from global technology leaders. Click a card to preview certificates and review metadata details.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8 border-b border-glass-border pb-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  playAudio('click');
                  setActiveFilter(tab.value);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeFilter === tab.value
                    ? 'bg-textPrimary text-bgPrimary shadow-sm'
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
                className="w-full sm:w-56 bg-bgSecondary border border-glass-border text-textPrimary text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-accentBlue/55 transition-all"
              />
            </div>
            
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-auto appearance-none bg-bgSecondary border border-glass-border text-textPrimary text-xs rounded-xl pl-9 pr-7 py-2 focus:outline-none focus:border-accentBlue/55 transition-all cursor-pointer font-sans"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="org-asc">Issuer (A-Z)</option>
                <option value="org-desc">Issuer (Z-A)</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-textMuted text-[10px]">
                <i className="fas fa-chevron-down" />
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredAndSortedCerts.map((cert) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={cert.id}
                onClick={() => handleCardClick(cert)}
                onMouseEnter={() => playAudio('hover')}
                className="bg-bgSecondary border border-borderSilver hover:border-accentBlue/40 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col justify-between select-none shadow-sm"
              >
                {/* Certificate Image Thumbnail Preview */}
                <div className="w-full aspect-[1.4] overflow-hidden bg-black/5 border-b border-borderSilver relative">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102 pointer-events-none select-none"
                  />
                </div>

                {/* Card Content details */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Top Row: Provider Info */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[8px] text-textMuted uppercase font-mono tracking-wider flex items-center gap-1">
                        <i className={cert.iconClass} /> {cert.provider}
                      </span>
                      <span className="text-[8px] text-textMuted font-mono bg-bgPrimary border border-borderSilver px-1.5 py-0.5 rounded">
                        {cert.displayDate}
                      </span>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="text-xs font-bold font-sora text-textPrimary leading-snug group-hover:text-accentBlue transition-colors duration-300 line-clamp-2 h-8">
                      {cert.name}
                    </h3>
                  </div>

                  {/* Card Footer Info */}
                  <div className="pt-2.5 mt-2.5 border-t border-borderSilver/50 flex justify-between items-center">
                    <span className="text-[8px] text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-500/10 font-bold px-1.5 py-0.5 rounded">
                      ✓ Verified
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accentBlue group-hover:text-blue-500 transition-colors font-mono">
                      Verify
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredAndSortedCerts.length === 0 && (
          <div className="py-16 text-center text-textSecondary bg-bgSecondary/10 rounded-2xl border border-glass-border border-dashed">
            <i className="fas fa-search text-xl mb-2 text-textMuted" />
            <p className="text-xs">No credentials found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* Verification Centered Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-bgSecondary border border-borderSilver rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-borderSilver/50 bg-bgPrimary">
                <span className="px-2.5 py-0.5 rounded bg-accentBlue/10 border border-accentBlue/20 text-accentBlue text-[9px] font-bold uppercase tracking-wider font-mono">
                  Verified Credential
                </span>
                <button
                  onClick={handleClose}
                  className="p-1.5 text-textSecondary hover:text-textPrimary bg-bgSecondary hover:bg-borderSilver rounded-full border border-borderSilver transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-4">
                {/* Certificate Image Preview Box */}
                <div className="w-full aspect-[1.6] rounded-xl overflow-hidden border border-borderSilver/60 bg-[#050814] flex items-center justify-center relative shadow-inner shrink-0">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.name}
                    className="max-w-[95%] max-h-[95%] object-contain rounded p-1"
                  />
                </div>

                {/* Info Details */}
                <div>
                  <h3 className="text-sm md:text-base font-bold font-sora text-textPrimary leading-snug mb-1">
                    {selectedCert.name}
                  </h3>
                  <span className="text-xs text-accentBlue font-bold flex items-center gap-1.5 font-mono">
                    <i className={selectedCert.iconClass} /> {selectedCert.provider}
                  </span>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-3 border-t border-borderSilver/40">
                  <div className="bg-bgPrimary p-2.5 rounded-lg border border-borderSilver/50">
                    <div className="text-[9px] text-textMuted uppercase mb-0.5">Issue Date</div>
                    <div className="text-textPrimary font-semibold">{selectedCert.displayDate}</div>
                  </div>
                  <div className="bg-bgPrimary p-2.5 rounded-lg border border-borderSilver/50">
                    <div className="text-[9px] text-textMuted uppercase mb-0.5">Credential ID</div>
                    <div className="text-textPrimary font-semibold truncate" title={selectedCert.credentialId}>
                      {selectedCert.credentialId}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex gap-3 p-4 border-t border-borderSilver bg-bgPrimary">
                <button
                  onClick={handleClose}
                  className="flex-1 py-2 bg-bgSecondary border border-borderSilver hover:bg-borderSilver rounded-xl text-xs font-bold text-textPrimary transition-all cursor-pointer"
                >
                  Close Preview
                </button>
                {selectedCert.link !== '#' && (
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-accentBlue hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    Verify Credential <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
