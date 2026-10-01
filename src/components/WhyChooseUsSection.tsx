import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Binary, Sparkles, Maximize2, BarChart3, Clock, Server, CheckCircle2,
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/agencyData';
import { Reveal, StaggerGrid, StaggerItem } from './ScrollReveal';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Binary, Sparkles, Maximize2, BarChart3, Clock, Server,
};

export const WhyChooseUsSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="why-us" className="relative py-28 bg-[#000612] border-t border-[#ece1df]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#ece1df]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
              <span>Engineered For Impact</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#ece1df] mt-3 tracking-tight">
              Why Leading Brands Choose Zen X Solutions
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-sm sm:text-base text-[#ece1df]/65 mt-3 leading-relaxed">
              We reject the bloated timelines, opaque billing, and fragile codebases typical of traditional agencies. Our delivery model is engineered for certainty.
            </p>
          </Reveal>
        </div>

        {/* ── Feature cards ── */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Binary;
            const isSelected = activeFeature === idx;
            return (
              <StaggerItem key={item.id}>
                <motion.div
                  onClick={() => setActiveFeature(idx)}
                  className={`group relative p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer h-full ${
                    isSelected
                      ? 'border-[#ece1df]/30 bg-[#be1920] shadow-md'
                      : 'border-[#ece1df]/15 bg-[#be1920]/80 hover:border-[#ece1df]/25 hover:bg-[#be1920] shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
                  }`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  data-cursor="Feature"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#ece1df]/70">{item.number}</span>
                      <span className="text-xs font-bold text-[#ece1df] tabular-nums bg-[#ece1df]/15 px-2.5 py-0.5 rounded border border-[#ece1df]/20">
                        {item.metric}
                      </span>
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#ece1df]/15 border border-[#ece1df]/20 flex items-center justify-center text-[#ece1df] group-hover:scale-105 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#ece1df] font-display">{item.title}</h3>
                        <p className="text-xs text-[#ece1df]/70 font-semibold mt-0.5">{item.highlight}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-xs sm:text-sm text-[#ece1df]/75 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#ece1df]/15 flex items-center justify-between text-xs text-[#ece1df]/60">
                    <span className="font-medium">{item.metricLabel}</span>
                    <div className="w-2 h-2 rounded-full bg-[#ece1df]" />
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        {/* ── Comparison strip ── */}
        <Reveal delay={0.1} distance={20}>
          <div
            className="mt-12 p-8 rounded-2xl text-[#ece1df] border border-[#ece1df]/15 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6"
            style={{ backgroundColor: 'rgba(236,225,223,0.06)' }}
          >
            {[
              { title: 'Sub-Second Global CDN Delivery', body: 'Multi-region edge networks ensure immediate response times across all continents.' },
              { title: '100% Transparent Milestone Sprints', body: 'Direct Slack/Teams channel with your dedicated lead engineer and weekly sprint demos.' },
              { title: 'Guaranteed Post-Launch SLA', body: 'Immediate bug triaging, proactive security patches, and zero unexpected maintenance costs.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#be1920] border border-[#ece1df]/20 flex items-center justify-center text-[#ece1df] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#ece1df]">{item.title}</div>
                  <div className="text-xs text-[#ece1df]/65 mt-1">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
