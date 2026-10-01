import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ProcessSection } from './components/ProcessSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TechStackSection } from './components/TechStackSection';
import { PlatformShowcaseCarousel } from './components/PlatformShowcaseCarousel';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaSection } from './components/CtaSection';
import { ContactSection } from './components/ContactSection';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { Footer } from './components/Footer';
import { ArrowLeft, Sparkles, MessageCircle, Mail } from 'lucide-react';
import { ZenXLogo } from './components/ZenXLogo';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [prefillService, setPrefillService] = useState<string | undefined>(undefined);
  const [isDedicatedContactView, setIsDedicatedContactView] = useState(false);

  // Monitor URL hash for dedicated route #contact-view
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#contact-view') {
        setIsDedicatedContactView(true);
      } else {
        setIsDedicatedContactView(false);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Track active section for top bar indicator
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'services', 'why-us', 'process', 'work', 'tech', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenContact = (service?: string) => {
    if (service) {
      setPrefillService(service);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#000612] text-[#ece1df] relative selection:bg-[#be1920] selection:text-[#ece1df]">
      {/* Desktop Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Dedicated Contact View Route (when activated via #contact-view) */}
      {isDedicatedContactView ? (
        <main className="min-h-screen bg-[#000612] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-[#ece1df]/10">
              <a href="#" onClick={() => { setIsDedicatedContactView(false); window.location.hash = ''; }}>
                <ZenXLogo size="md" variant="dark" />
              </a>
              <button
                onClick={() => {
                  setIsDedicatedContactView(false);
                  window.location.hash = '';
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#be1920] hover:bg-[#a5151b] border border-[#ece1df]/15 text-xs font-semibold text-[#ece1df] shadow-sm transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Agency Overview</span>
              </button>
            </div>

            <div className="mt-8">
              <ContactSection
                prefillService={prefillService}
                onClearPrefill={() => setPrefillService(undefined)}
              />
            </div>
          </div>
        </main>
      ) : (
        /* Single-Page Experience with all premium sections */
        <>
          {/* Top Bar Navigation */}
          <Navbar
            onOpenContact={handleOpenContact}
            activeSection={activeSection}
          />

          <main id="hero">
            {/* 1. Hero Section */}
            <HeroSection onOpenContact={handleOpenContact} />

            {/* 2. About Section */}
            <AboutSection onOpenContact={handleOpenContact} />

            {/* 3. Services Section (All 20 services) */}
            <ServicesSection onOpenContact={handleOpenContact} />

            {/* 4. Why Choose Us / Features Section */}
            <WhyChooseUsSection />

            {/* 5. Process Section (7 steps) */}
            <ProcessSection />

            {/* 6. Portfolio / Case Studies Section */}
            <PortfolioSection onOpenContact={handleOpenContact} />

            {/* 7. Technologies & Expertise Section */}
            <TechStackSection />

            {/* 8. Platform Showcase Carousel */}
            <PlatformShowcaseCarousel />

            {/* 9. Testimonials Section */}
            <TestimonialsSection />

            {/* 9. Pre-Footer Call to Action */}
            <CtaSection onOpenContact={handleOpenContact} />

            {/* 10. Contact Us Section */}
            <ContactSection
              prefillService={prefillService}
              onClearPrefill={() => setPrefillService(undefined)}
            />
          </main>

          {/* Floating WhatsApp + Gmail Widget */}
          <FloatingChatWidget />

          {/* Footer with full directory */}
          <Footer onOpenContact={handleOpenContact} />
        </>
      )}
    </div>
  );
}
