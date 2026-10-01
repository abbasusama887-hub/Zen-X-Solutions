import React from 'react';
import { motion } from 'motion/react';
import { HeroVideoBackground } from './HeroVideoBackground';
import { Hero3DCanvas } from './Hero3DCanvas';
import { AGENCY_STATS } from '../data/agencyData';
import { ArrowDown, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#000612]">
      {/* Background Video Stream (Network Ecosystem) with deep obsidian scrim */}
      <HeroVideoBackground defaultVideoUrl="/videos/hero-network.mp4" />

      {/* Subtle Three.js 3D Spatial Canvas for depth */}
      <div className="absolute inset-0 pointer-events-none opacity-60 z-0">
        <Hero3DCanvas />
      </div>

      {/* Atmospheric Soft Neutral Radiance */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#be1920]/[0.05] rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
        <div className="max-w-4xl">
          {/* Unboxed editorial lead kicker */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#ece1df] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#be1920] animate-pulse" />
            <span>Digital Systems & Scalable Product Engineering</span>
            <span className="text-[#ece1df]/30">/</span>
            <span className="text-[#ece1df]/60">Bespoke Full-Cycle Agency</span>
          </motion.div>

          {/* Primary High-Impact Headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.05 }}
            className="hero-headline-breathe mt-2 font-['Space_Grotesk',_'Manrope',_sans-serif] font-semibold tracking-[-0.025em] text-[#ece1df] [text-wrap:balance]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', lineHeight: 1.12 }}
          >
            {/* Line 1 */}
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Engineering{' '}
              <span className="relative inline-block">
                high-performance
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#be1920] rounded-full" />
              </span>
            </motion.span>

            {/* Line 2 */}
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              digital systems and scalable
            </motion.span>

            {/* Line 3 */}
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            >
              revenue engines.
            </motion.span>
          </motion.h1>

          {/* Concrete Value Narrative in rgba(236, 225, 223, 0.65) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-xl text-[#ece1df]/65 max-w-2xl leading-relaxed font-normal"
          >
            Zen X Solutions partners with ambitious brands to build enterprise-grade web applications, custom Shopify architectures, iOS & Android ecosystems, and high-converting acquisition channels.
          </motion.p>

          {/* CTA Group with outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            {/* Primary button: Background #be1920, Text #ece1df */}
            <button
              onClick={() => onOpenContact()}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#be1920] hover:bg-[#a5151b] text-[#ece1df] font-bold text-sm uppercase tracking-wider rounded-lg transition-all shadow-[0_4px_20px_rgba(190,25,32,0.35)] hover:shadow-[0_6px_25px_rgba(190,25,32,0.5)] hover:-translate-y-0.5 cursor-pointer"
              data-cursor="Consult"
            >
              <span>Schedule Discovery Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Secondary button: Background transparent, Border #ece1df, Text #ece1df, Hover: #ece1df bg, #000612 text */}
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-[#ece1df] text-[#ece1df] hover:text-[#000612] border border-[#ece1df] font-semibold text-sm rounded-lg transition-all cursor-pointer"
              data-cursor="Explore"
            >
              <span>Explore 20 Services</span>
            </a>

            <a
              href="#work"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-[#ece1df]/75 hover:text-[#ece1df] transition-colors"
            >
              <span>View Case Studies</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Quantified Rigor Proof Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-8 border-t border-[#ece1df]/10 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {AGENCY_STATS.map((stat, idx) => (
            <div key={idx} className="group">
              <div className="text-2xl sm:text-4xl font-display font-black text-[#ece1df] tracking-tight tabular-nums transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#ece1df]/80 mt-1 flex items-center gap-1.5">
                <span>{stat.label}</span>
                <span className="w-1 h-1 rounded-full bg-[#be1920]" />
              </div>
              <div className="text-[11px] text-[#ece1df]/45 mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trust Ticker / Live Invariant Strip */}
      <div className="relative z-10 border-t border-[#ece1df]/10 pt-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#ece1df]/60 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#be1920]" />
            <span className="text-[#ece1df] font-semibold">Zen X Global SLA:</span>
            <span>24/7 Monitored Systems</span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ece1df]/80" />
              <span>SOC-2 & GDPR Architecture</span>
            </span>
            <span>·</span>
            <span>Strict TypeScript Invariant</span>
            <span>·</span>
            <span>Zero Unscheduled Downtime</span>
          </div>

          <div className="text-[11px] text-[#ece1df]/50">
            SFO · LDN · SGP
          </div>
        </div>
      </div>
    </section>
  );
};
