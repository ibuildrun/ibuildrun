'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '@/lib/translations';

interface PhilosophyProps {
  lang: Language;
}

const Philosophy: React.FC<PhilosophyProps> = ({ lang }) => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const t = translations[lang];

  const tools = [
    { name: 'Kiro', desc: lang === 'ru' ? 'Ускоренный процесс разработки // Нейронный рычаг' : 'Accelerated dev workflow // Neural leverage' },
    { name: 'Cursor', desc: lang === 'ru' ? 'AI-first IDE оптимизация // Буферная эффективность' : 'AI-first IDE optimization // Buffer efficiency' },
    { name: 'Claude', desc: lang === 'ru' ? 'Глубокие архитектурные рассуждения // Логическое картирование' : 'Deep architectural reasoning // Logic mapping' }
  ];

  return (
    <section id="manifesto" className="min-h-screen py-24 md:py-48 px-6 md:px-24 flex items-center z-10 relative border-t bg-transparent" style={{ borderColor: 'var(--border)' }}>
      <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center max-w-[1400px] mx-auto">
        <div className="space-y-8 md:space-y-12 order-2 lg:order-1">
          <div className="text-[9px] md:text-[10px] uppercase tracking-[0.8em] md:tracking-[1em] mb-4 md:mb-8 font-bold" style={{ color: 'var(--muted)' }}>{t.philosophy.log}</div>
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold leading-[1.1] md:leading-[0.9] tracking-tighter uppercase" style={{ color: 'var(--fg)' }}>
            <span className="whitespace-pre-line">{t.philosophy.title}</span>
            <span style={{ color: 'var(--muted)', opacity: 0.6 }}>{t.philosophy.subtitle}</span>
          </h2>
          <p className="text-base md:text-xl leading-relaxed max-w-xl uppercase tracking-tighter font-bold" style={{ color: 'var(--muted)' }}>
            {t.philosophy.desc}
          </p>
          
          <div className="grid grid-cols-1 gap-3 md:gap-4 pt-8 md:pt-12">
            {tools.map((tool) => (
              <motion.div 
                key={tool.name}
                onMouseEnter={() => setIsHovered(tool.name)}
                onMouseLeave={() => setIsHovered(null)}
                className={`p-6 md:p-8 border-2 transition-all duration-300 cursor-default group`}
                style={{ 
                  borderColor: isHovered === tool.name ? 'var(--fg)' : 'var(--border)',
                  backgroundColor: isHovered === tool.name ? 'var(--fg)' : 'transparent',
                  color: isHovered === tool.name ? 'var(--bg)' : 'var(--fg)'
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg md:text-xl font-bold uppercase tracking-[0.3em]">{tool.name}</span>
                  <span className={`text-[8px] md:text-[9px] font-bold tracking-widest ${isHovered === tool.name ? '' : 'text-green-600 animate-pulse'}`}>
                    ACTIVE
                  </span>
                </div>
                <p className={`mt-2 md:mt-4 text-[9px] md:text-[10px] uppercase tracking-widest font-bold`} style={{ opacity: isHovered === tool.name ? 1 : 0.6 }}>
                  {tool.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square flex items-center justify-center order-1 lg:order-2 scale-75 md:scale-100">
          <div className="absolute inset-0 border-2 rounded-full animate-spin-slow" style={{ borderColor: 'var(--border)', opacity: 0.3 }}></div>
          <div className="absolute inset-10 border-2 rounded-full animate-reverse-spin-slow" style={{ borderColor: 'var(--border)', opacity: 0.5 }}></div>
          <div className="absolute inset-20 border-2 rounded-full animate-spin-slow" style={{ borderColor: 'var(--border)', opacity: 0.7 }}></div>
          
          <div className="z-10 text-center backdrop-blur-md p-6 md:p-10 border-2 shadow-2xl" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--fg)' }}>
            <div className="text-[9px] md:text-[10px] font-bold mb-3 md:mb-4 uppercase tracking-[0.4em] md:tracking-[0.6em]" style={{ color: 'var(--muted)' }}>{t.philosophy.symbiosis}</div>
            <div className="flex items-center gap-4 md:gap-8 text-2xl md:text-4xl font-bold tracking-tighter uppercase">
              <span style={{ opacity: 0.5 }}>{lang === 'ru' ? 'ЧЕЛОВЕК' : 'HUMAN'}</span>
              <div className="w-8 md:w-12 h-px" style={{ backgroundColor: 'var(--muted)' }}></div>
              <span className="animate-pulse" style={{ color: 'var(--accent)' }}>A.I.</span>
            </div>
            <div className="mt-4 md:mt-6 text-[7px] md:text-[8px] uppercase tracking-[0.8em] md:tracking-[1em]" style={{ color: 'var(--muted)' }}>{t.philosophy.handshake}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
