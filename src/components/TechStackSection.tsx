import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TECH_CATEGORIES } from '../data/agencyData';
import { ShieldCheck, Zap, Layers, Cpu } from 'lucide-react';
import { Reveal, StaggerGrid, StaggerItem } from './ScrollReveal';

export const TechStackSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = TECH_CATEGORIES[activeTab];

  return (
    <section id="tech" className="relative py-28 bg-[#000612] border-t border-[#ece1df]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#ece1df]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
              <span>Engineering Standards & Tooling</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#ece1df] mt-3 tracking-tight">
              Built On Modern Enterprise Technology
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-sm sm:text-base text-[#ece1df]/65 mt-3 leading-relaxed">
              We avoid outdated legacy frameworks. Our engineering stack is chosen strictly for type safety, sub-second latency, and horizontal scalability.
            </p>
          </Reveal>
        </div>

        {/* ── Tab Selector ── */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {TECH_CATEGORIES.map((cat, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveTab(idx)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-[#be1920] text-[#ece1df]'
                      : 'bg-[#ece1df]/08 hover:bg-[#ece1df]/15 text-[#ece1df]/70 hover:text-[#ece1df] border border-[#ece1df]/15'
                  }`}
                  style={!isActive ? { backgroundColor: 'rgba(236,225,223,0.08)' } : {}}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Active Technology Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.items.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-[#be1920] hover:bg-[#a5151b] border border-[#ece1df]/15 hover:border-[#ece1df]/25 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#ece1df]/60 font-semibold">
                    {tech.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#ece1df] tabular-nums">
                    {tech.proficiency}% Fluency
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#ece1df] font-display mt-3">
                  {tech.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#ece1df]/75 leading-relaxed">
                  {tech.description}
                </p>
              </div>
              {/* Proficiency bar */}
              <div className="mt-6 pt-4 border-t border-[#ece1df]/15">
                <div className="w-full h-1.5 bg-[#ece1df]/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ece1df] rounded-full transition-all duration-700"
                    style={{ width: `${tech.proficiency}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Enterprise Badges ── */}
        <Reveal delay={0.1} distance={16}>
          <div className="mt-14 pt-8 border-t border-[#ece1df]/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-[#be1920] border border-[#ece1df]/15 shadow-sm">
              <Cpu className="w-5 h-5 text-[#ece1df] mx-auto mb-2" />
              <div className="text-xs font-bold text-[#ece1df]">100% Strict TypeScript</div>
              <div className="text-[11px] text-[#ece1df]/65 mt-0.5">Zero runtime typing leaks</div>
            </div>
            <div className="p-4 rounded-xl bg-[#be1920] border border-[#ece1df]/15 shadow-sm">
              <Zap className="w-5 h-5 text-[#ece1df] mx-auto mb-2" />
              <div className="text-xs font-bold text-[#ece1df]">100 Lighthouse Target</div>
              <div className="text-[11px] text-[#ece1df]/65 mt-0.5">Core Web Vitals certified</div>
            </div>
            <div className="p-4 rounded-xl bg-[#be1920] border border-[#ece1df]/15 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#ece1df] mx-auto mb-2" />
              <div className="text-xs font-bold text-[#ece1df]">PCI-DSS & SOC-2 Ready</div>
              <div className="text-[11px] text-[#ece1df]/65 mt-0.5">End-to-end security compliance</div>
            </div>
            <div className="p-4 rounded-xl bg-[#be1920] border border-[#ece1df]/15 shadow-sm">
              <Layers className="w-5 h-5 text-[#ece1df] mx-auto mb-2" />
              <div className="text-xs font-bold text-[#ece1df]">Zero Vendor Lock-in</div>
              <div className="text-[11px] text-[#ece1df]/65 mt-0.5">Clean exportable repositories</div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
