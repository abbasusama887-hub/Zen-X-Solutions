import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/agencyData';
import { ProjectItem } from '../types';

import { Reveal } from './ScrollReveal';

interface PortfolioSectionProps {
  onOpenContact: (prefillService?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenContact }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'E-Commerce', 'Fintech', 'Mobile App', 'Growth'];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'E-Commerce') return project.category.includes('Shopify');
    if (activeFilter === 'Fintech') return project.category.includes('Fintech');
    if (activeFilter === 'Mobile App') return project.category.includes('Mobile');
    if (activeFilter === 'Growth') return project.category.includes('Marketing');
    return true;
  });

  return (
    <section id="work" className="relative py-28 bg-[#000612] border-t border-[#ece1df]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#ece1df]/10">
          <Reveal>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#ece1df]/70">
                <span>Featured Engagements</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#ece1df] mt-2 tracking-tight">
                Selected Client Case Studies
              </h2>
              <p className="text-sm sm:text-base text-[#ece1df]/65 mt-2 max-w-xl">
                Concrete commercial outcomes delivered for enterprise brands, high-growth venture-backed startups, and global merchants.
              </p>
            </div>
          </Reveal>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-sm ${
                  activeFilter === filter
                    ? 'bg-[#be1920] text-[#ece1df] font-bold'
                    : 'bg-[#ece1df]/08 hover:bg-[#ece1df]/15 text-[#ece1df]/70 hover:text-[#ece1df] border border-[#ece1df]/15'
                }`}
                style={activeFilter !== filter ? { backgroundColor: 'rgba(236,225,223,0.08)' } : {}}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-2xl bg-[#be1920] hover:bg-[#a5151b] border border-[#ece1df]/15 hover:border-[#ece1df]/25 overflow-hidden cursor-pointer flex flex-col transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
              data-cursor="View Case"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#000612]">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000612] via-[#000612]/45 to-transparent" />

                {/* Overlaid Client & Year Metadata */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-semibold">
                  <span className="px-3 py-1 rounded bg-[#000612]/85 text-[#ece1df] backdrop-blur-md border border-white/10 shadow-sm">
                    {project.client}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#000612]/85 text-[#ece1df]/80 backdrop-blur-md border border-white/10 font-mono">
                    {project.year}
                  </span>
                </div>

                {/* Key Result Banner */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-[#000612]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 shadow-md">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-display font-black text-[#ece1df] tabular-nums">
                      {project.results[0].metric}
                    </span>
                    <span className="text-xs text-[#ece1df]/80 font-medium">
                      {project.results[0].label}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#be1920] flex items-center justify-center text-[#ece1df] group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#ece1df]/60">
                    {project.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#ece1df] mt-1 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#ece1df]/70 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#ece1df]/15 flex items-center justify-between text-xs text-[#ece1df]/50">
                  <div className="flex items-center gap-2">
                    {project.techStack.slice(0, 3).map((t, tIdx) => (
                      <span key={tIdx} className="text-[11px] text-[#ece1df]/60 font-medium">
                        {t}{tIdx < 2 ? '·' : ''}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#ece1df] font-bold group-hover:underline">
                    Read Breakdown →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Deep Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#000612]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#000612] border border-[#ece1df]/15 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-[#ece1df]/60 hover:text-[#ece1df] hover:bg-[#ece1df]/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#be1920] bg-[#be1920]/15 border border-[#be1920]/30 px-2.5 py-0.5 rounded">
                  {selectedProject.client}
                </span>
                <span className="text-xs text-[#ece1df]/70 font-semibold">
                  {selectedProject.category} · {selectedProject.year}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#ece1df] mt-3">
                {selectedProject.title}
              </h3>

              {/* Quantified Results Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 p-4 rounded-xl bg-[#be1920] border border-[#ece1df]/15">
                {selectedProject.results.map((res, rIdx) => (
                  <div key={rIdx} className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-display font-black text-[#ece1df] tabular-nums">
                      {res.metric}
                    </div>
                    <div className="text-xs text-[#ece1df]/70 font-semibold mt-0.5">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm text-[#ece1df]/75 leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ece1df] mb-1">
                    The Challenge
                  </h4>
                  <p>{selectedProject.challenge}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ece1df] mb-1">
                    The Architecture & Engineering Solution
                  </h4>
                  <p>{selectedProject.solution}</p>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-6 pt-4 border-t border-[#ece1df]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ece1df] mb-2">
                  Engineered With
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 text-xs bg-[#ece1df]/10 text-[#ece1df] rounded-md border border-[#ece1df]/15 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 pt-6 border-t border-[#ece1df]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#ece1df]/70 hover:text-[#ece1df] cursor-pointer"
                >
                  Back to Showcase
                </button>
                <button
                  onClick={() => {
                    const clientName = selectedProject.client;
                    setSelectedProject(null);
                    onOpenContact(`Project similar to ${clientName}`);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#be1920] hover:bg-[#a5151b] text-[#ece1df] font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-[0_4px_20px_rgba(190,25,32,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Build A Similar Solution</span>
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
