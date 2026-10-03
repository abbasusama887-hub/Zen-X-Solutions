import React, { useEffect, useRef, useState } from 'react';
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const canScroll = carousel.scrollWidth > carousel.clientWidth;
      const canMoveInDirection = event.deltaY > 0
        ? carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth
        : carousel.scrollLeft > 0;
      if (canScroll && canMoveInDirection) {
        event.preventDefault();
        carousel.scrollLeft += event.deltaY;
      }
    };

    carousel.addEventListener('wheel', handleWheel, { passive: false });
    return () => carousel.removeEventListener('wheel', handleWheel);
  }, []);

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
        <div
          ref={carouselRef}
          className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
          onPointerDown={(event) => {
            if (event.pointerType !== 'mouse' || event.button !== 0) return;
            dragState.current = {
              pointerId: event.pointerId,
              startX: event.clientX,
              scrollLeft: event.currentTarget.scrollLeft,
            };
            dragged.current = false;
          }}
          onPointerMove={(event) => {
            const drag = dragState.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            const distance = event.clientX - drag.startX;
            if (Math.abs(distance) > 5) dragged.current = true;
            if (dragged.current) event.currentTarget.scrollLeft = drag.scrollLeft - distance;
          }}
          onPointerUp={() => { dragState.current = null; }}
          onPointerCancel={() => { dragState.current = null; }}
          aria-label="Why choose us features, horizontally scrollable"
          role="region"
          tabIndex={0}
        >
        <StaggerGrid className="flex w-full gap-6" stagger={0.08}>
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Binary;
            const isSelected = activeFeature === idx;
            return (
              <StaggerItem key={item.id} className="w-[82%] flex-none snap-start sm:w-[44%] lg:w-[30%]">
                <motion.div
                  onClick={() => {
                    if (dragged.current) {
                      dragged.current = false;
                      return;
                    }
                    setActiveFeature(idx);
                  }}
                  className={`why-feature-card group relative p-7 rounded-2xl flex flex-col justify-between cursor-pointer h-full ${
                    isSelected ? 'is-selected' : ''
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
        </div>

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
