import React from 'react';
import { ZenXLogo } from './ZenXLogo';
import { SERVICES_LIST } from '../data/agencyData';

interface FooterProps {
  onOpenContact: (prefillService?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="relative bg-[#000612] border-t border-[#ece1df]/10 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#ece1df]/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <ZenXLogo size="xl" variant="dark" />
            <p className="text-xs sm:text-sm text-[#ece1df]/65 leading-relaxed max-w-sm pt-2">
              Zen X Solutions is a premier digital agency engineering high-performance web applications, bespoke Shopify architectures, cross-platform mobile ecosystems, and full-funnel digital growth engines.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ece1df] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
                Direct Contacts:
              </span>
              <div className="text-xs text-[#ece1df]/70 mt-1 space-y-1">
                <div>hello@zenxsolutions.com</div>
                <div>+1 (800) 936-936</div>
                <div>San Francisco · London · Singapore</div>
              </div>
            </div>
          </div>

          {/* Navigation Mirrors */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ece1df]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-[#ece1df]/65">
              <li>
                <a href="#about" className="hover:text-[#be1920] font-medium transition-colors">
                  About Agency
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#be1920] font-medium transition-colors">
                  Core Capabilities
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#be1920] font-medium transition-colors">
                  Why Zen X
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#be1920] font-medium transition-colors">
                  7-Stage Delivery
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-[#be1920] font-medium transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#tech" className="hover:text-[#be1920] font-medium transition-colors">
                  Technology Stack
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#be1920] font-medium transition-colors">
                  Contact & Inquiry
                </a>
              </li>
            </ul>
          </div>

          {/* All 20 Services Directory (Columns 1 & 2) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ece1df]">
              Engineering & Commerce
            </div>
            <ul className="space-y-1.5 text-[11px] text-[#ece1df]/60">
              {SERVICES_LIST.slice(0, 10).map((svc) => (
                <li key={svc.id}>
                  <button
                    onClick={() => onOpenContact(svc.title)}
                    className="hover:text-[#be1920] font-medium text-left transition-colors cursor-pointer"
                  >
                    {svc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ece1df]">
              Creative & Operations
            </div>
            <ul className="space-y-1.5 text-[11px] text-[#ece1df]/60">
              {SERVICES_LIST.slice(10, 20).map((svc) => (
                <li key={svc.id}>
                  <button
                    onClick={() => onOpenContact(svc.title)}
                    className="hover:text-[#be1920] font-medium text-left transition-colors cursor-pointer"
                  >
                    {svc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quiet Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ece1df]/40">
          <div>
            © {new Date().getFullYear()} Zen X Solutions Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#ece1df] transition-colors">
              Privacy Notice
            </a>
            <a href="#" className="hover:text-[#ece1df] transition-colors">
              Service Terms
            </a>
            <a href="#" className="hover:text-[#ece1df] transition-colors">
              Security SLA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
