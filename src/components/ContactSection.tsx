import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';
import { SERVICES_LIST } from '../data/agencyData';
import { ContactFormData } from '../types';

import { Reveal } from './ScrollReveal';

interface ContactSectionProps {
  prefillService?: string;
  onClearPrefill?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefillService,
  onClearPrefill,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    selectedServices: [],
    timeline: 'Within 1-2 months',
    budgetRange: '$10k - $25k',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Handle prefill from other sections
  useEffect(() => {
    if (prefillService) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry: ${prefillService}`,
        selectedServices: prev.selectedServices.includes(prefillService)
          ? prev.selectedServices
          : [...prev.selectedServices, prefillService],
      }));
    }
  }, [prefillService]);

  const toggleService = (title: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(title);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== title)
          : [...prev.selectedServices, title],
      };
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid work email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Project subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please enter at least 15 characters describing your scope';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketId(`ZX-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 800);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      selectedServices: [],
      timeline: 'Within 1-2 months',
      budgetRange: '$10k - $25k',
    });
    setErrors({});
    if (onClearPrefill) onClearPrefill();
  };

  return (
    <section id="contact" className="relative py-28 bg-[#000612] border-t border-[#ece1df]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#ece1df]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
                  <span>Direct Line & Inquiry</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#ece1df] mt-2 tracking-tight">
                  Let's Start Your Next Phase
                </h2>
                <p className="text-sm sm:text-base text-[#ece1df]/65 mt-3 leading-relaxed">
                  Connect directly with our engineering and growth directors. We respond to all qualified briefs within 2 hours.
                </p>
              </div>
            </Reveal>

            {/* Direct Instant Channels */}
            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/1800936936?text=Hi%20Zen%20X%20Solutions!%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#be1920] hover:bg-[#a5151b] border border-[#ece1df]/15 hover:border-[#ece1df]/25 shadow-sm transition-all cursor-pointer"
                data-cursor="WhatsApp"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#ece1df]/15 border border-[#ece1df]/20 flex items-center justify-center text-[#ece1df] group-hover:scale-105 transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#ece1df]">WhatsApp Direct Line</div>
                    <div className="text-xs text-[#ece1df]/65">+1 (800) 936-936 · Instant Chat</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#ece1df]/60 group-hover:text-[#ece1df] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="mailto:hello@zenxsolutions.com?subject=Project%20Inquiry%20-%20Zen%20X%20Solutions"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#be1920] hover:bg-[#a5151b] border border-[#ece1df]/15 hover:border-[#ece1df]/25 shadow-sm transition-all cursor-pointer"
                data-cursor="Gmail"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#ece1df]/15 border border-[#ece1df]/20 flex items-center justify-center text-[#ece1df] group-hover:scale-105 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#ece1df]">Official Email</div>
                    <div className="text-xs text-[#ece1df]/65">hello@zenxsolutions.com</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#ece1df]/60 group-hover:text-[#ece1df] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Office & SLA Details */}
            <div className="p-6 rounded-2xl bg-[#be1920] border border-[#ece1df]/15 space-y-4 text-xs text-[#ece1df]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ece1df] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#ece1df]">Engineering Headquarters</div>
                  <div className="text-[#ece1df]/65 mt-0.5">548 Market Street, Suite 82000, San Francisco, CA</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#ece1df] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#ece1df]">Response SLA</div>
                  <div className="text-[#ece1df]/65 mt-0.5">Under 2 hours during global business hours (24/7 emergency support)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <Reveal delay={0.12} distance={20} className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#ece1df]/06 border border-[#ece1df]/15 shadow-[0_10px_35px_rgba(0,0,0,0.2)] relative overflow-hidden"
              style={{ backgroundColor: 'rgba(236,225,223,0.06)' }}
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#be1920] flex items-center justify-center text-[#ece1df] mx-auto mb-6 shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <span className="text-xs font-mono font-bold text-[#ece1df] bg-[#be1920]/20 border border-[#be1920]/30 px-3 py-1 rounded">
                      Inquiry ID: {ticketId}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#ece1df] mt-4">
                      Brief Received Successfully
                    </h3>

                    <p className="mt-3 text-sm text-[#ece1df]/75 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-[#ece1df] font-bold">{formData.name}</span>. A senior engineering director has been assigned to your brief and will contact you at <span className="text-[#ece1df] font-bold underline">{formData.email}</span> within 2 hours.
                    </p>

                    <div className="mt-8">
                      <button
                        onClick={resetForm}
                        className="px-6 py-3 bg-[#be1920] hover:bg-[#a5151b] text-[#ece1df] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(190,25,32,0.35)] cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#ece1df]">
                        Project Specification Form
                      </h3>
                      <p className="text-xs text-[#ece1df]/60 mt-1">
                        Fill in your parameters and we'll review feasibility and sprint availability.
                      </p>
                    </div>

                    {/* Services Multi-Select Badges */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#ece1df] mb-2.5">
                        Select Relevant Capabilities (Optional)
                      </label>
                      <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                        {SERVICES_LIST.slice(0, 12).map((svc) => {
                          const isSelected = formData.selectedServices.includes(svc.title);
                          return (
                            <button
                              type="button"
                              key={svc.id}
                              onClick={() => toggleService(svc.title)}
                              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#be1920] text-[#ece1df] border-[#be1920] shadow-sm'
                                  : 'bg-[#ece1df]/08 text-[#ece1df]/75 border-[#ece1df]/15 hover:border-[#ece1df]/30 hover:text-[#ece1df]'
                              }`}
                              style={!isSelected ? { backgroundColor: 'rgba(236,225,223,0.08)' } : {}}
                            >
                              {svc.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Two-Column Personal Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#ece1df] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Elena Vance"
                          className={`w-full border ${
                            errors.name ? 'border-[#be1920]' : 'border-[#ece1df]/20 focus:border-[#ece1df]/50'
                          } rounded-xl px-4 py-3 text-sm text-[#ece1df] placeholder-[#ece1df]/35 focus:outline-none focus:ring-1 focus:ring-[#ece1df]/30 transition-all`}
                          style={{ backgroundColor: 'rgba(236,225,223,0.08)' }}
                        />
                        {errors.name && (
                          <p className="text-[11px] text-[#be1920] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#ece1df] mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="elena@company.com"
                          className={`w-full border ${
                            errors.email ? 'border-[#be1920]' : 'border-[#ece1df]/20 focus:border-[#ece1df]/50'
                          } rounded-xl px-4 py-3 text-sm text-[#ece1df] placeholder-[#ece1df]/35 focus:outline-none focus:ring-1 focus:ring-[#ece1df]/30 transition-all`}
                          style={{ backgroundColor: 'rgba(236,225,223,0.08)' }}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-[#be1920] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#ece1df] mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 019-2834"
                          className={`w-full border ${
                            errors.phone ? 'border-[#be1920]' : 'border-[#ece1df]/20 focus:border-[#ece1df]/50'
                          } rounded-xl px-4 py-3 text-sm text-[#ece1df] placeholder-[#ece1df]/35 focus:outline-none focus:ring-1 focus:ring-[#ece1df]/30 transition-all`}
                          style={{ backgroundColor: 'rgba(236,225,223,0.08)' }}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-[#be1920] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#ece1df] mb-1.5">
                          Subject / Objective *
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="e.g. Next.js Web App Redesign"
                          className={`w-full border ${
                            errors.subject ? 'border-[#be1920]' : 'border-[#ece1df]/20 focus:border-[#ece1df]/50'
                          } rounded-xl px-4 py-3 text-sm text-[#ece1df] placeholder-[#ece1df]/35 focus:outline-none focus:ring-1 focus:ring-[#ece1df]/30 transition-all`}
                          style={{ backgroundColor: 'rgba(236,225,223,0.08)' }}
                        />
                        {errors.subject && (
                          <p className="text-[11px] text-[#be1920] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.subject}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Timeline & Budget Range */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#ece1df] mb-1.5">
                          Target Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full border border-[#ece1df]/20 focus:border-[#ece1df]/50 rounded-xl px-4 py-3 text-sm text-[#ece1df] focus:outline-none"
                          style={{ backgroundColor: 'rgba(236,225,223,0.08)' }}
                        >
                          <option value="Urgent (< 3 weeks)" className="bg-[#000612]">Urgent (&lt; 3 weeks)</option>
                          <option value="Within 1-2 months" className="bg-[#000612]">Within 1-2 months</option>
                          <option value="3-6 months" className="bg-[#000612]">3-6 months</option>
                          <option value="Ongoing Retainer" className="bg-[#000612]">Ongoing Retainer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#ece1df] mb-1.5">
                          Anticipated Investment Budget
                        </label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="w-full border border-[#ece1df]/20 focus:border-[#ece1df]/50 rounded-xl px-4 py-3 text-sm text-[#ece1df] focus:outline-none"
                          style={{ backgroundColor: 'rgba(236,225,223,0.08)' }}
                        >
                          <option value="$5k - $10k" className="bg-[#000612]">$5k - $10k</option>
                          <option value="$10k - $25k" className="bg-[#000612]">$10k - $25k</option>
                          <option value="$25k - $50k" className="bg-[#000612]">$25k - $50k</option>
                          <option value="$50k+" className="bg-[#000612]">$50k+ Enterprise</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-bold text-[#ece1df] mb-1.5">
                        Project Scope & Requirements *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your brand, current technology stack, commercial goals, and any specific deadlines..."
                        className={`w-full border ${
                          errors.message ? 'border-[#be1920]' : 'border-[#ece1df]/20 focus:border-[#ece1df]/50'
                        } rounded-xl px-4 py-3 text-sm text-[#ece1df] placeholder-[#ece1df]/35 focus:outline-none focus:ring-1 focus:ring-[#ece1df]/30 transition-all`}
                        style={{ backgroundColor: 'rgba(236,225,223,0.08)' }}
                      />
                      {errors.message && (
                        <p className="text-[11px] text-[#be1920] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#be1920] hover:bg-[#a5151b] disabled:opacity-60 text-[#ece1df] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_6px_25px_rgba(190,25,32,0.35)] hover:shadow-[0_8px_30px_rgba(190,25,32,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                      data-cursor="Submit"
                    >
                      {isSubmitting ? (
                        <span>Encrypting & Dispatching Brief...</span>
                      ) : (
                        <>
                          <span>Submit Project Specification</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
