import React from 'react';
import { ArrowUpRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { ZenXLogo } from './ZenXLogo';
import { Reveal } from './ScrollReveal';

interface CtaSectionProps {
  onOpenContact: (prefillService?: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="relative py-28 bg-[#000612] border-t border-[#ece1df]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal distance={28}>
          <div className="relative rounded-3xl bg-[#be1920] text-[#ece1df] border border-[#ece1df]/15 p-8 sm:p-16 lg:p-20 shadow-[0_25px_60px_rgba(0,0,0,0.3)] text-center overflow-hidden">

            <div className="flex justify-center mb-6">
              <ZenXLogo size="lg" showText={false} variant="dark" />
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ece1df]/80 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ece1df] animate-pulse" />
              <span>Accepting Select Q2 & Q3 Engagements</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#ece1df] max-w-3xl mx-auto tracking-tight leading-tight">
              Have an ambitious project in mind? Let's build something extraordinary.
            </h2>

            <p className="mt-6 text-sm sm:text-lg text-[#ece1df]/75 max-w-2xl mx-auto leading-relaxed">
              Schedule an architectural discovery session with our technical leads. We'll analyze your requirements, outline system scope, and provide a clear milestone roadmap.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenContact()}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#ece1df] hover:bg-white text-[#be1920] font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_6px_25px_rgba(236,225,223,0.2)] hover:-translate-y-0.5 cursor-pointer"
                data-cursor="Start Now"
              >
                <span>Initiate Project Inquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/1800936936?text=Hello%20Zen%20X%20Solutions,%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 bg-[#ece1df]/10 hover:bg-[#ece1df]/20 text-[#ece1df] border border-[#ece1df]/25 font-semibold text-sm rounded-xl transition-all cursor-pointer"
                data-cursor="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#ece1df]" />
                <span>Direct WhatsApp Chat</span>
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-[#ece1df]/15 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#ece1df]/70">
              {['NDA signed within 2 hours', 'Fixed-cost & milestone billing', 'Dedicated senior technical team'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ece1df]" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
