import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Layout,
  Smartphone,
  Layers,
  ShoppingBag,
  Store,
  TrendingUp,
  Search,
  MapPin,
  Share2,
  MessageCircle,
  FileText,
  Palette,
  Video,
  Sparkles,
  Headphones,
  Cpu,
  PhoneCall,
  ShieldCheck,
  CreditCard,
  ArrowUpRight,
  Check,
  X,
  Play,
  Film,
} from 'lucide-react';
import { SERVICES_LIST } from '../data/agencyData';
import { ServiceItem, ServiceCategory } from '../types';
import { ServiceVideoPlayer } from './ServiceVideoPlayer';

import { Reveal } from './ScrollReveal';

interface ServicesSectionProps {
  onOpenContact: (prefillService?: string) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Layout,
  Smartphone,
  Layers,
  ShoppingBag,
  Store,
  TrendingUp,
  Search,
  MapPin,
  Share2,
  MessageCircle,
  FileText,
  Palette,
  Video,
  Sparkles,
  Headphones,
  Cpu,
  PhoneCall,
  ShieldCheck,
  CreditCard,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [spotlightService, setSpotlightService] = useState<ServiceItem>(SERVICES_LIST[0]);
  const [showVideoSpotlight, setShowVideoSpotlight] = useState(false);

  const categories: { key: ServiceCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All 20 Capabilities', count: 20 },
    { key: 'engineering', label: 'Engineering & Web', count: 6 },
    { key: 'design', label: 'Design & Creative', count: 5 },
    { key: 'marketing', label: 'Growth & Marketing', count: 5 },
    { key: 'operations', label: 'Support & Operations', count: 4 },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_LIST.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="services" className="relative py-28 bg-[#000612] border-t border-[#ece1df]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#ece1df]/10">
          <Reveal>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#ece1df]/70">
                <Film className="w-3.5 h-3.5 text-[#ece1df]/70" />
                <span>Core Capabilities & Video Showcases</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#ece1df] mt-2 tracking-tight">
                Comprehensive Full-Cycle Services
              </h2>
              <p className="text-sm sm:text-base text-[#ece1df]/65 mt-2 max-w-xl">
                From bespoke full-stack engineering and custom Shopify architectures to 24/7 technical support and high-ROAS acquisition funnels.
              </p>
            </div>
          </Reveal>

          {/* Search Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setShowVideoSpotlight(!showVideoSpotlight)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                showVideoSpotlight
                  ? 'bg-[#be1920] text-[#ece1df]'
                  : 'bg-[#ece1df]/10 hover:bg-[#ece1df]/15 text-[#ece1df] border border-[#ece1df]/15'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{showVideoSpotlight ? 'Hide Spotlight' : 'Featured Video Screen'}</span>
            </button>

            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-[#ece1df]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 20 services..."
                className="w-full bg-[#ece1df]/08 border border-[#ece1df]/15 focus:border-[#ece1df]/40 text-xs sm:text-sm text-[#ece1df] placeholder-[#ece1df]/40 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none transition-all shadow-sm"
                style={{ backgroundColor: 'rgba(236,225,223,0.08)' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#ece1df]/60 hover:text-[#ece1df]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Video Screen (Accordion / Toggleable Spotlight) */}
        <AnimatePresence>
          {showVideoSpotlight && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8 mb-12 overflow-hidden"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-[#be1920] border border-[#ece1df]/15 shadow-md">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#ece1df]/15">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ece1df]">
                      <span>Service Video Showcase: {spotlightService.title}</span>
                      <span>·</span>
                      <span className="text-[#ece1df]/70">{spotlightService.videoBadge}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#ece1df] mt-1">
                      {spotlightService.videoTitle || spotlightService.title}
                    </h3>
                  </div>

                  {/* Quick Service Switcher Tabs for Video Showcase */}
                  <div className="flex flex-wrap items-center gap-1.5 max-w-xl">
                    {SERVICES_LIST.filter((s) => s.videoKey).slice(0, 8).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSpotlightService(s)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                          spotlightService.id === s.id
                            ? 'bg-[#ece1df] text-[#be1920] font-bold shadow-sm'
                            : 'bg-[#ece1df]/15 text-[#ece1df] hover:bg-[#ece1df]/25 border border-[#ece1df]/20'
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <ServiceVideoPlayer service={spotlightService} autoPlay={true} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-sm ${
                  isActive
                    ? 'bg-[#be1920] text-[#ece1df] font-bold'
                    : 'bg-[#ece1df]/08 hover:bg-[#ece1df]/15 text-[#ece1df]/70 hover:text-[#ece1df] border border-[#ece1df]/15'
                }`}
                style={!isActive ? { backgroundColor: 'rgba(236,225,223,0.08)' } : {}}
                data-cursor="Filter"
              >
                <span>{cat.label}</span>
                <span className={`ml-2 text-[10px] ${isActive ? 'text-[#ece1df]/80 font-bold' : 'text-[#ece1df]/50'}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || Code2;
            const hasVideo = Boolean(service.videoKey || service.videoUrl);

            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.4) }}
                onClick={() => setSelectedService(service)}
                className="group relative p-6 rounded-xl bg-[#be1920] hover:bg-[#a5151b] border border-[#ece1df]/15 hover:border-[#ece1df]/25 transition-all duration-300 flex flex-col justify-between cursor-pointer interactive-card shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                data-cursor="Inspect"
              >
                <div>
                  {/* Top card metadata row */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#ece1df]/70">
                      {service.number}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {hasVideo && (
                        <span className="text-[10px] font-bold text-[#be1920] bg-[#ece1df] px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>Video</span>
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-[#ece1df] bg-[#ece1df]/15 px-2.5 py-0.5 rounded border border-[#ece1df]/20">
                        {service.impactMetric}
                      </span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#ece1df]/15 flex items-center justify-center text-[#ece1df] group-hover:scale-105 transition-all duration-300 border border-[#ece1df]/20">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#ece1df] font-display">
                      {service.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className="mt-3 text-xs sm:text-sm text-[#ece1df]/75 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Key Deliverables */}
                  <div className="mt-4 pt-4 border-t border-[#ece1df]/15 space-y-1.5">
                    {service.deliverables.slice(0, 2).map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-[#ece1df]/80">
                        <Check className="w-3.5 h-3.5 text-[#ece1df] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer link trigger */}
                <div className="mt-5 pt-3 border-t border-[#ece1df]/15 flex items-center justify-between text-xs font-semibold text-[#ece1df]/70 group-hover:text-[#ece1df] transition-colors">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    {service.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[11px] text-[#ece1df]/50">
                        {tech}{tIdx < 2 ? '·' : ''}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold text-[#ece1df]">
                    <span>{hasVideo ? 'Video & Details' : 'Details'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state when search matches nothing */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-[#be1920] rounded-xl border border-[#ece1df]/15 mt-4">
            <p className="text-base text-[#ece1df]">No capabilities match "{searchQuery}"</p>
            <p className="text-xs text-[#ece1df]/70 mt-1">Try searching for keywords like "Shopify", "Mobile", "SEO", or "Support".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-[#be1920] bg-[#ece1df] rounded-lg cursor-pointer shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Interactive Service Detail & Video Showcase Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#000612]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl bg-[#000612] border border-[#ece1df]/15 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[92vh]"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-[#ece1df]/60 hover:text-[#ece1df] hover:bg-[#ece1df]/10 transition-colors cursor-pointer z-30"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#be1920] bg-[#be1920]/15 border border-[#be1920]/30 px-2 py-0.5 rounded">
                  Service #{selectedService.number}
                </span>
                <span className="text-xs text-[#ece1df]/70 font-semibold">
                  {selectedService.categoryLabel}
                </span>
                {selectedService.videoBadge && (
                  <span className="text-xs text-[#ece1df]/50 font-mono">
                    · {selectedService.videoBadge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#ece1df] mt-2">
                {selectedService.title}
              </h3>

              <div className="mt-1.5 inline-flex items-center gap-2 text-xs font-bold text-[#ece1df]/80">
                <span>Proven Target Impact:</span>
                <span className="text-[#ece1df] font-black">{selectedService.impactMetric}</span>
              </div>

              {/* Service Video Player Section */}
              <div className="mt-5 mb-6">
                <ServiceVideoPlayer service={selectedService} autoPlay={true} />
              </div>

              <p className="text-sm sm:text-base text-[#ece1df]/75 leading-relaxed">
                {selectedService.fullDesc}
              </p>

              {/* Complete Deliverables Checklist */}
              <div className="mt-6 pt-6 border-t border-[#ece1df]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ece1df] mb-3">
                  Scope of Deliverables & Output
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#ece1df] bg-[#be1920] p-2.5 rounded-lg border border-[#ece1df]/15">
                      <Check className="w-4 h-4 text-[#ece1df] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack & Tools */}
              <div className="mt-6 pt-4 border-t border-[#ece1df]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ece1df] mb-2">
                  Integrated Technologies & Tooling
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 text-xs bg-[#ece1df]/10 text-[#ece1df] rounded-md border border-[#ece1df]/15 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 pt-6 border-t border-[#ece1df]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#ece1df]/70 hover:text-[#ece1df] cursor-pointer"
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    const svcName = selectedService.title;
                    setSelectedService(null);
                    onOpenContact(svcName);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#be1920] hover:bg-[#a5151b] text-[#ece1df] font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-[0_4px_20px_rgba(190,25,32,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inquire About {selectedService.title}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
