import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data/agencyData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Reveal } from './ScrollReveal';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrentIndex((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="relative py-28 bg-[#000612] border-t border-[#ece1df]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#ece1df]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
              <span>Client Endorsements</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#ece1df] mt-3 tracking-tight">
              Trusted By Engineering & Business Leaders
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-sm sm:text-base text-[#ece1df]/65 mt-3 leading-relaxed">
              Real outcomes from verified enterprise clients and high-growth brands who entrust their digital ecosystems to Zen X Solutions.
            </p>
          </Reveal>
        </div>

        {/* ── Featured Testimonial Card ── */}
        <Reveal delay={0.1} distance={20}>
          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-12 rounded-3xl bg-[#be1920] border border-[#ece1df]/15 shadow-lg relative"
              >
                <Quote className="w-12 h-12 text-[#ece1df]/15 absolute top-8 right-8" />

                <div className="flex items-center gap-1.5 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ece1df] text-[#ece1df]" />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-2xl font-display font-semibold text-[#ece1df] leading-relaxed">
                  "{current.quote}"
                </blockquote>

                <div className="mt-8 pt-6 border-t border-[#ece1df]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-base font-bold text-[#ece1df]">{current.author}</div>
                    <div className="text-xs text-[#ece1df]/70 mt-0.5">
                      {current.role} · <span className="text-[#ece1df]/90 font-semibold">{current.company}</span>
                    </div>
                    <div className="text-[11px] text-[#ece1df]/50 mt-0.5">Sector: {current.industry}</div>
                  </div>
                  <div className="sm:text-right bg-[#000612] px-4 py-2.5 rounded-xl border border-[#ece1df]/10 shadow-sm">
                    <div className="text-xl sm:text-2xl font-display font-black text-[#ece1df] tabular-nums">
                      {current.impactMetric}
                    </div>
                    <div className="text-[11px] font-semibold text-[#ece1df]/70">{current.impactLabel}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex items-center justify-between mt-8 px-2">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === i ? 'w-8 bg-[#be1920]' : 'w-2 bg-[#ece1df]/20 hover:bg-[#ece1df]/40'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-xl border border-[#ece1df]/15 text-[#ece1df] flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  style={{ backgroundColor: 'rgba(236,225,223,0.08)' }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-xl border border-[#ece1df]/15 text-[#ece1df] flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  style={{ backgroundColor: 'rgba(236,225,223,0.08)' }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
