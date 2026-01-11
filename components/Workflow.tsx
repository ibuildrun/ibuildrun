'use client';

import React, { useState } from 'react';
import { PROCESS_NODES } from '@/lib/constants';
import { Language, translations } from '@/lib/translations';

interface WorkflowProps {
  lang: Language;
}

const Workflow: React.FC<WorkflowProps> = ({ lang }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = translations[lang];

  return (
    <section id="workflow" className="min-h-screen py-24 md:py-48 px-6 md:px-24 z-10 relative overflow-hidden border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <div className="text-[12px] uppercase tracking-[1em] mb-4 font-bold" style={{ color: 'var(--muted)' }}>{t.workflow.pipeline}</div>
          <h2 className="text-4xl md:text-8xl font-bold mb-4 uppercase tracking-tighter" style={{ color: 'var(--fg)' }}>{t.workflow.title}</h2>
          <p className="font-mono text-[12px] md:text-sm tracking-[0.3em] md:tracking-[0.4em] uppercase" style={{ color: 'var(--muted)' }}>
            {lang === 'ru' ? 'ПРОБЛЕМА // ИИ // РЕШЕНИЕ // ЗАПУСК' : 'PROBLEM // AI // SOLUTION // DEPLOY'}
          </p>
        </div>

        <div className="relative">
          {/* Линия теперь находится под кружками благодаря z-0 и фону самих кружков */}
          <div 
            className="absolute top-[32px] left-0 w-full h-[1px] hidden md:block z-0 opacity-30" 
            style={{ backgroundColor: 'var(--fg)' }}
          ></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {PROCESS_NODES.map((node, idx) => (
              <div 
                key={node.id} 
                className="group cursor-default"
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <div className="flex flex-col items-center md:items-start space-y-6 md:space-y-8">
                  <div 
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-10`}
                    style={{ 
                      borderColor: activeIndex === idx ? 'var(--accent)' : 'var(--border)',
                      backgroundColor: activeIndex === idx ? 'var(--accent)' : 'var(--bg)', // Сплошной фон скрывает линию
                      color: activeIndex === idx ? 'var(--bg)' : 'var(--fg)',
                      transform: activeIndex === idx ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <span className="font-bold text-xl relative z-20">{idx + 1}</span>
                    {activeIndex === idx && (
                      <div className="absolute inset-[-8px] border-2 rounded-full animate-ping z-0" style={{ borderColor: 'var(--accent)', opacity: 0.3 }}></div>
                    )}
                  </div>

                  <div className={`space-y-4 transition-opacity duration-300 text-center md:text-left`} style={{ opacity: activeIndex === idx ? 1 : 0.4 }}>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>{node.title[lang]}</h3>
                    <p className="text-[12px] md:text-sm leading-relaxed max-w-[250px] font-bold uppercase tracking-tight mx-auto md:mx-0" style={{ color: 'var(--muted)' }}>
                      {node.description[lang]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 md:mt-32 p-6 md:p-10 border-2 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-8" style={{ backgroundColor: 'rgba(0,0,0,0.03)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-2" style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
                <div className="w-5 h-5 md:w-6 md:h-6 border-2 animate-spin" style={{ borderColor: 'var(--bg)' }}></div>
              </div>
              <div>
                <div className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--muted)' }}>{t.workflow.status}</div>
                <div className="text-base md:text-lg font-bold uppercase tracking-tighter" style={{ color: 'var(--fg)' }}>{t.workflow.optimizing} {activeIndex + 1}</div>
              </div>
            </div>
            <div className="hidden md:flex flex-1 mx-12 h-[2px] relative overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                <div className="absolute inset-0 w-24 blur-sm animate-[flow_2s_linear_infinite]" style={{ backgroundColor: 'var(--accent)', opacity: 0.6 }}></div>
            </div>
            <div className="text-center md:text-right font-bold text-[11px] md:text-sm tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
              {t.workflow.efficiency}: 94.2% // OK
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
      `}</style>
    </section>
  );
};

export default Workflow;
