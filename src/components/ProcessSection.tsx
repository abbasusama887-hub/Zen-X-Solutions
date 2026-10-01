import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass, Map, Palette, Terminal, CheckCircle2, Rocket, LifeBuoy, ArrowRight, Clock, Check,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/agencyData';
import { Reveal } from './ScrollReveal';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Compass,
  Map,
  Palette,
  Terminal,
  CheckCircle2,
  Rocket,
  LifeBuoy,
};

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = PROCESS_STEPS[activeStepIndex];
  const CurrentIcon = iconMap[currentStep.iconName] || Compass;

  return (
    <section id="process" className="relative py-28 bg-[#000612] border-t border-[#ece1df]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#ece1df]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
              <span>Methodology & Execution</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#ece1df] mt-3 tracking-tight">
              The 7-Stage Delivery Framework
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-sm sm:text-base text-[#ece1df]/65 mt-3 leading-relaxed">
              A battle-tested engineering pipeline that guarantees predictable milestones, rigorous quality assurance, and zero launch anxiety.
            </p>
          </Reveal>
        </div>

        {/* 7-Step Navigation Bar / Connected Line */}
        <div className="relative mb-12">
          {/* Background Track Line */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-[2px] bg-[#ece1df]/10 -translate-y-1/2 z-0" />
          {/* Active Track Fill in #be1920 */}
          <div
            className="hidden lg:block absolute top-1/2 left-4 h-[2px] bg-[#be1920] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(activeStepIndex / (PROCESS_STEPS.length - 1)) * 95}%` }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = iconMap[step.iconName] || Compass;
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`group p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#be1920] border-[#be1920] shadow-md'
                      : isPast
                      ? 'bg-[#be1920]/60 border-[#be1920]/50'
                      : 'bg-[#ece1df]/08 border-[#ece1df]/15 hover:bg-[#ece1df]/12'
                  }`}
                  style={
                    !isActive && !isPast
                      ? { backgroundColor: 'rgba(236,225,223,0.08)' }
                      : {}
                  }
                  data-cursor={`Step 0${step.step}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono font-bold ${isActive || isPast ? 'text-[#ece1df]' : 'text-[#ece1df]/60'}`}>
                      {step.number}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${
                        isActive
                          ? 'bg-[#ece1df]/20 text-[#ece1df]'
                          : isPast
                          ? 'bg-[#ece1df]/15 text-[#ece1df]'
                          : 'bg-[#ece1df]/08 text-[#ece1df]/50'
                      }`}
                      style={!isActive && !isPast ? { backgroundColor: 'rgba(236,225,223,0.08)' } : {}}
                    >
                      <StepIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className={`text-xs font-bold tracking-tight ${isActive || isPast ? 'text-[#ece1df]' : 'text-[#ece1df]/60'}`}>
                      {step.title}
                    </div>
                    <div className={`text-[10px] font-semibold mt-0.5 ${isActive || isPast ? 'text-[#ece1df]/70' : 'text-[#ece1df]/40'}`}>
                      {step.duration}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Spotlight on Active Step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-8 sm:p-12 rounded-2xl bg-[#be1920] border border-[#ece1df]/15 shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#be1920] bg-[#ece1df] px-3 py-1 rounded">
                    Phase {currentStep.number} of 07
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#ece1df]/70 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Typical Duration: {currentStep.duration}</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-[#ece1df] mt-4">
                  {currentStep.title} — <span className="text-[#ece1df]/70">{currentStep.tagline}</span>
                </h3>

                <p className="mt-4 text-sm sm:text-base text-[#ece1df]/80 leading-relaxed">
                  {currentStep.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : prev))}
                    disabled={activeStepIndex === 0}
                    className="px-4 py-2 text-xs font-semibold text-[#ece1df]/70 hover:text-[#ece1df] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    ← Previous Step
                  </button>
                  <button
                    onClick={() => setActiveStepIndex((prev) => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : prev))}
                    disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                    className="px-5 py-2.5 bg-[#ece1df] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed text-[#be1920] font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Deliverables Checklist for Current Step */}
              <div className="lg:col-span-5 bg-[#000612] p-6 rounded-xl border border-[#ece1df]/10 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#ece1df]/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ece1df]">
                    Phase Deliverables & Verification
                  </h4>
                  <span className="text-[10px] text-[#ece1df]/50 font-mono">
                    Signed Off
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {currentStep.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#ece1df]">
                      <div className="w-5 h-5 rounded-full bg-[#be1920]/20 border border-[#be1920]/40 flex items-center justify-center text-[#ece1df] shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
