import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, MessageCircle, Mail, X, ArrowUpRight } from 'lucide-react';

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Action Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3.5 w-72 rounded-2xl bg-[#000612] backdrop-blur-xl border border-[#ece1df]/15 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#ece1df]/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#be1920] animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#ece1df]">
                  Direct Agency Connect
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#ece1df]/60 hover:text-[#ece1df] p-1 rounded-md transition-colors"
                aria-label="Close chat menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {/* WhatsApp Item */}
              <a
                href="https://wa.me/1800936936?text=Hello%20Zen%20X%20Solutions!%20I'd%20like%20to%20discuss%20a%20project%20scope."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2.5 rounded-xl bg-[#be1920] hover:bg-[#a5151b] border border-[#ece1df]/15 shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#ece1df]/15 border border-[#ece1df]/20 flex items-center justify-center text-[#ece1df] group-hover:scale-105 transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#ece1df]">WhatsApp Chat</div>
                    <div className="text-[10px] text-[#ece1df]/65">Direct Technical Lead</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#ece1df]/60 group-hover:text-[#ece1df] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Gmail / Official Email Item */}
              <a
                href="mailto:hello@zenxsolutions.com?subject=Project%20Inquiry%20-%20Zen%20X%20Solutions&body=Hi%20Zen%20X%20Solutions%20Team%2C%0A%0AI%20would%20like%20to%20discuss%20a%20new%20project%20regarding..."
                className="group flex items-center justify-between p-2.5 rounded-xl bg-[#be1920] hover:bg-[#a5151b] border border-[#ece1df]/15 shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#ece1df]/15 border border-[#ece1df]/20 flex items-center justify-center text-[#ece1df] group-hover:scale-105 transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#ece1df]">Send via Gmail</div>
                    <div className="text-[10px] text-[#ece1df]/65">hello@zenxsolutions.com</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#ece1df]/60 group-hover:text-[#ece1df] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#ece1df]/10 text-[10px] text-center text-[#ece1df]/50">
              Typical reply time: <span className="text-[#ece1df] font-bold">&lt; 15 mins</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-14 h-14 rounded-full bg-[#be1920] hover:bg-[#a5151b] text-[#ece1df] flex items-center justify-center shadow-[0_6px_25px_rgba(190,25,32,0.35)] hover:shadow-[0_8px_35px_rgba(190,25,32,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Toggle contact channels"
        data-cursor="Connect"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              {/* Ping notification dot */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ece1df] border-2 border-[#be1920] rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};
