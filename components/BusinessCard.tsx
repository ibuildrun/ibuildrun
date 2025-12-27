'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Globe } from 'lucide-react';
import { Language } from '@/lib/translations';

interface BusinessCardProps {
  lang: Language;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ lang }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full max-w-md h-72 perspective-1000 cursor-pointer mx-auto group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-1000 rounded-sm overflow-hidden"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ border: '2px solid var(--border)', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
      >
        <div className="absolute inset-0 w-full h-full backface-hidden bg-[#050505] p-12 flex flex-col justify-between overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <path d="M 0,0 L 100,100 M 0,100 L 100,0" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>
          
          <div className="flex justify-between items-start">
            <div className="text-white">
              <div className="text-3xl font-bold tracking-tighter uppercase mb-1">IBUILDRUN</div>
              <div className="text-[8px] text-white/30 uppercase tracking-[0.6em]">Core_Software_Layer</div>
            </div>
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center bg-white/5">
              <div className="w-2 h-2 bg-white animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="h-[2px] w-12 bg-white" />
            <div className="text-white">
              <div className="text-[11px] font-bold uppercase tracking-[0.4em] mb-1">Lead_Software_Engineer</div>
              <div className="text-[9px] text-white/20 uppercase tracking-widest">ID_HASH: 0x9924-IBR-001</div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full backface-hidden bg-white text-black rotate-y-180 p-8 md:p-12 flex flex-col justify-between shadow-2xl overflow-hidden border-2 border-black">
          <div className="space-y-4 md:space-y-6 relative z-10">
            <div className="flex items-center gap-4 md:gap-6 border-b border-black pb-3 md:pb-4">
              <Send size={16} className="opacity-80 flex-shrink-0" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em]">T.ME/IBUILDRUN</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6 border-b border-black pb-3 md:pb-4">
              <Github size={16} className="opacity-80 flex-shrink-0" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em]">GITHUB.COM/IBUILDRUN</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end relative z-10">
            <div>
              <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-1">System_Status: ACTIVE</div>
              <div className="text-[7px] md:text-[8px] opacity-80 font-bold tracking-widest uppercase">{lang === 'ru' ? 'ВРЕМЯ_UTC' : 'EST_UTC'}: 2025.Q1</div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black flex items-center justify-center">
              <Globe size={20} className="text-white animate-spin-slow md:w-6 md:h-6" />
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-6 md:mt-10 text-center text-[8px] md:text-[9px] font-bold uppercase tracking-[0.6em] md:tracking-[0.8em] animate-pulse" style={{ color: 'var(--muted)' }}>
        {isFlipped ? 'CLOSE_ENVELOPE()' : 'ACCESS_ID_CARD()'}
      </div>
    </div>
  );
};

export default BusinessCard;
