import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (prefillService?: string) => void;
  activeSection: string;
}

const HEADER_H_NORMAL   = 80;   // px — top of page
const HEADER_H_SCROLLED = 68;   // px — after user scrolls

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, activeSection }) => {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [isHidden,   setIsHidden]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const ticking     = useRef(false);

  /* ── Scroll-direction hide/show — unchanged from previous version ── */
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta    = currentY - lastScrollY.current;

        if (currentY <= 10) {
          setIsHidden(false);
          setIsScrolled(false);
          lastScrollY.current = currentY;
          ticking.current = false;
          return;
        }

        setIsScrolled(true);

        if (Math.abs(delta) > 6) {
          if (delta > 0) {
            setIsHidden(true);
            setIsMobileMenuOpen(false);
          } else {
            setIsHidden(false);
          }
          lastScrollY.current = currentY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About',      href: '#about',    id: 'about'    },
    { label: 'Services',   href: '#services', id: 'services' },
    { label: 'Why Us',     href: '#why-us',   id: 'why-us'   },
    { label: 'Process',    href: '#process',  id: 'process'  },
    { label: 'Work',       href: '#work',     id: 'work'     },
    { label: 'Tech Stack', href: '#tech',     id: 'tech'     },
    { label: 'Contact',    href: '#contact',  id: 'contact'  },
  ];

  const headerH = isScrolled ? HEADER_H_SCROLLED : HEADER_H_NORMAL;

  return (
    <>
      {/* ════════════════════════════════════════
          HEADER
      ════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 ${
          isScrolled
            ? 'bg-[#000612]/92 backdrop-blur-lg border-b border-[#ece1df]/10 shadow-[0_4px_32px_rgba(0,0,0,0.5)]'
            : 'bg-gradient-to-b from-[#000612]/80 to-transparent backdrop-blur-sm'
        }`}
        style={{
          height: headerH,
          transform:  isHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: [
            'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
            'height 0.3s ease',
            'background-color 0.3s ease',
            'backdrop-filter 0.3s ease',
            'box-shadow 0.3s ease',
            'border-color 0.3s ease',
          ].join(', '),
          willChange: 'transform',
        }}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex items-center justify-between gap-6">

            {/* ── LOGO ────────────────────────────────────── */}
            <a
              href="#"
              aria-label="Zen X Solutions — Home"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be1920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000612] rounded-md"
              style={{ lineHeight: 0, flexShrink: 0, paddingTop: 5 }}
            >
              <img
                src="/Zen%20X%20Solutions%20Logo%20Reveal%20(2x).gif"
                alt="Zen X Solutions"
                draggable={false}
                className="h-[60px] w-auto max-w-full rounded-xl object-contain"
              />
            </a>

            {/* ── DESKTOP NAV ─────────────────────────────── */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-1"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`
                      relative px-3 py-1.5 rounded-md text-base font-bold tracking-wide
                      transition-colors duration-200
                      ${isActive
                        ? 'text-[#ece1df]'
                        : 'text-[#ece1df]/65 hover:text-[#ece1df] hover:bg-[#ece1df]/05'
                      }
                    `}
                    style={!isActive ? undefined : undefined}
                  >
                    {link.label}

                    {/* Active underline indicator */}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#be1920]"
                        style={{ bottom: 2 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* ── RIGHT ACTIONS ───────────────────────────── */}
            <div className="hidden sm:flex items-center gap-3 ml-auto lg:ml-0 shrink-0">
              {/* Subtle divider only on large screens */}
              <div className="hidden lg:block w-px h-5 bg-[#ece1df]/15" />

              <button
                onClick={() => onOpenContact()}
                data-cursor="Start"
                className="
                  group inline-flex items-center gap-2
                  px-5 py-2.5
                  text-xs font-bold tracking-widest uppercase
                  text-[#ece1df] bg-[#be1920]
                  hover:bg-[#a5151b] active:scale-[0.98]
                  rounded-lg
                  shadow-[0_4px_16px_rgba(190,25,32,0.35)]
                  hover:shadow-[0_6px_22px_rgba(190,25,32,0.5)]
                  hover:-translate-y-0.5
                  transition-all duration-200
                  cursor-pointer
                "
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* ── MOBILE CONTROLS ─────────────────────────── */}
            <div className="flex items-center gap-2 lg:hidden ml-auto">
              {/* Small inline CTA — sm and up, hidden on xs */}
              <button
                onClick={() => onOpenContact()}
                className="hidden sm:inline-flex px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#ece1df] bg-[#be1920] rounded-md shadow-sm cursor-pointer"
              >
                Get a Quote
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
                className="
                  p-2 rounded-md
                  text-[#ece1df]/80 hover:text-[#ece1df]
                  hover:bg-[#ece1df]/08
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#be1920]
                  transition-colors duration-200
                  cursor-pointer
                "
                style={undefined}
              >
                {isMobileMenuOpen
                  ? <X     className="w-5 h-5" />
                  : <Menu  className="w-5 h-5" />
                }
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          MOBILE MENU OVERLAY
      ════════════════════════════════════════ */}
      {isMobileMenuOpen && (
        <div
          className="
            fixed inset-0 z-30 lg:hidden
            bg-[#000612]/98 backdrop-blur-xl
            flex flex-col justify-between
            overflow-y-auto
            animate-in fade-in duration-200
          "
          style={{ paddingTop: headerH + 8 }}
        >
          {/* Top: branding + nav links */}
          <div className="px-6 py-6 space-y-6">
            {/* Brand strip */}
            <div className="flex items-center gap-4 pb-5 border-b border-[#ece1df]/10">
              <img
                src="/Zen%20X%20Solutions%20Logo%20Reveal%20(2x).gif"
                alt="Zen X Solutions"
                draggable={false}
                className="h-12 w-auto max-w-full rounded-xl object-contain"
              />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#be1920]">
                  Zen X Solutions
                </div>
                <div className="text-[11px] text-[#ece1df]/50 mt-0.5">
                  Premium Digital Agency
                </div>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center justify-between
                      py-3.5 border-b border-[#ece1df]/08
                      text-base font-semibold
                      transition-colors duration-150
                      ${isActive
                        ? 'text-[#ece1df]'
                        : 'text-[#ece1df]/70 hover:text-[#ece1df]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#be1920] shrink-0" />
                      )}
                      {!isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0" />
                      )}
                      <span>{link.label}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#ece1df]/30" />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Bottom: CTA + contact info */}
          <div className="px-6 py-6 space-y-4 border-t border-[#ece1df]/08">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className="
                w-full py-3.5 px-4
                bg-[#be1920] hover:bg-[#a5151b]
                text-[#ece1df] font-bold text-sm uppercase tracking-wider
                rounded-lg
                flex items-center justify-center gap-2
                shadow-[0_4px_20px_rgba(190,25,32,0.4)]
                cursor-pointer
                transition-colors duration-200
              "
            >
              <span>Schedule a Discovery Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-1 text-xs text-[#ece1df]/45 px-1">
              <span>📞 +1 (800) 936-936</span>
              <span>✉  hello@zenxsolutions.com</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
