import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, Shield, Award } from 'lucide-react';
import { ZenXLogo } from './ZenXLogo';
import { Reveal, StaggerGrid, StaggerItem } from './ScrollReveal';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const pillars = [
    {
      icon: Target,
      title: 'Commercial Intent',
      desc: 'Every architecture decision is calibrated directly to revenue impact, customer conversion, and long-term brand equity.',
    },
    {
      icon: Zap,
      title: 'Sub-Second Velocity',
      desc: 'We engineer ultra-lean codebases that pass all Core Web Vitals and load in under 0.8 seconds globally.',
    },
    {
      icon: Shield,
      title: 'Enterprise Resilience',
      desc: 'From PCI-compliant checkouts to 24/7 technical monitoring, our systems are built to withstand mission-critical traffic surges.',
    },
    {
      icon: Award,
      title: 'Bespoke Craftsmanship',
      desc: 'Zero generic templates or repetitive cookie-cutter themes. Every digital experience is designed specifically for your brand identity.',
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#000612] border-t border-[#ece1df]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left text column ── */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-xs font-bold tracking-widest uppercase text-[#ece1df]/70 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
                About Zen X Solutions
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#ece1df] mt-3 tracking-tight leading-tight">
                We bridge high-end creative design with uncompromising technical engineering.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-6 space-y-4 text-base text-[#ece1df]/65 leading-relaxed">
                <p>
                  Founded on the principle that digital excellence demands both aesthetic distinction and engineering precision, Zen X Solutions serves as the dedicated digital engine for industry-leading brands worldwide.
                </p>
                <p>
                  Whether modernizing multi-million-dollar e-commerce pipelines, orchestrating complex mobile applications, or scaling customer support operations 24/7, our multidisciplinary team executes with speed, transparency, and architectural discipline.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 pt-6 border-t border-[#ece1df]/10 flex items-center gap-6">
                <ZenXLogo size="sm" showText={false} variant="dark" />
                <div>
                  <div className="text-sm font-bold text-[#ece1df]">Global Delivery Hub</div>
                  <div className="text-xs text-[#ece1df]/60">Operating across North America, Europe & APAC</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Pillars bento grid ── */}
          <div className="lg:col-span-7">
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4" stagger={0.1} delayChildren={0.1}>
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <StaggerItem key={idx}>
                    <motion.div
                      className="p-6 rounded-xl bg-[#be1920] hover:bg-[#a5151b] border border-[#ece1df]/15 hover:border-[#ece1df]/25 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all group h-full"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#ece1df]/15 border border-[#ece1df]/20 flex items-center justify-center text-[#ece1df] group-hover:scale-105 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#ece1df] mt-4 font-display">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#ece1df]/75 mt-2 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </motion.div>
                  </StaggerItem>
                );
              })}

              {/* Commitment banner */}
              <StaggerItem className="sm:col-span-2">
                <div
                  className="p-6 rounded-xl text-[#ece1df] border border-[#ece1df]/15 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2"
                  style={{ backgroundColor: 'rgba(236,225,223,0.06)' }}
                >
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#ece1df]/70 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
                      Our Commitment
                    </div>
                    <div className="text-base font-bold text-[#ece1df] mt-0.5">
                      100% In-House Senior Talent. Zero Outsources.
                    </div>
                    <div className="text-xs text-[#ece1df]/65 mt-1">
                      Dedicated project managers, senior architects, and continuous milestone visibility.
                    </div>
                  </div>
                  <button
                    onClick={onOpenContact}
                    className="shrink-0 px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#be1920] hover:bg-[#a5151b] text-[#ece1df] rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    Meet The Team
                  </button>
                </div>
              </StaggerItem>
            </StaggerGrid>
          </div>
        </div>
      </div>
    </section>
  );
};
