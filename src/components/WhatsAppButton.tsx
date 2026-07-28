import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const openWhatsApp = () => {
    const phoneNumber = '9560693524'; // 
    const text = encodeURIComponent("Hello MONOLITH CODES, I'd like to discuss a custom software project.");
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto select-none">
      {/* Interactive Tooltip Popover */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            className="relative p-3.5 rounded-lg bg-mc-surface border border-mc-border text-xs font-sans text-mc-text-strong shadow-2xl backdrop-blur-md max-w-[220px]"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="absolute -top-1.5 -right-1.5 p-0.5 rounded-full bg-mc-surface-deep border border-mc-border text-mc-text-tertiary hover:text-mc-text"
              aria-label="Close message"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="font-mono text-[10px] text-mc-orange uppercase font-semibold">
                ENGINEERING DIRECT CHAT
              </span>
            </div>
            <p className="text-[11px] text-mc-text-body leading-snug">
              Have a quick question? Chat directly with our engineering team on WhatsApp.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={openWhatsApp}
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.92 }}
        className="relative group p-4 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center cursor-pointer transition-shadow hover:shadow-[#25D366]/40"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulse Aura */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />

        <MessageCircle className="w-6 h-6 fill-current relative z-10" />

        {/* Hover Label Badge */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-md bg-mc-surface border border-mc-border text-mc-text-strong font-mono text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
          Start WhatsApp Chat ↗
        </span>
      </motion.button>
    </div>
  );
};
