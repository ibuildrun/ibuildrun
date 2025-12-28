'use client';

import React from 'react';
import { PROJECTS, TECH_STACK } from '@/lib/constants';
import { translations, Language } from '@/lib/translations';

interface ResumePrintViewProps {
  lang: Language;
}

const ResumePrintView: React.FC<ResumePrintViewProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="hidden print:block bg-white text-black p-8 font-mono text-[9pt] leading-snug max-w-4xl mx-auto" style={{ minHeight: '297mm', maxHeight: '297mm' }}>
      <header className="border-b-4 border-black pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold tracking-tighter uppercase mb-2">IBUILDRUN</h1>
          <p className="text-sm font-bold tracking-[0.3em] uppercase opacity-70">LEAD SOFTWARE ENGINEER / ARCHITECT</p>
        </div>
        <div className="text-right text-[9pt] font-bold uppercase tracking-widest leading-relaxed">
          <p>t.me/ibuildrun</p>
          <p>github.com/ibuildrun</p>
          <p>{new Date().getFullYear()}.Q4_ARCH_CORE</p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] border-b-2 border-black mb-4 pb-1">MANIFESTO // EXEC_SUMMARY</h2>
            <p className="uppercase tracking-tight leading-relaxed font-bold">
              {t.philosophy.desc}
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] border-b-2 border-black mb-4 pb-1">EXPERIENCE // SELECTED_SYSTEMS</h2>
            <div className="space-y-6">
              {PROJECTS.map(project => (
                <div key={project.id} className="relative pl-6 border-l-2 border-black">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-bold uppercase tracking-tighter">{project.title}</h3>
                    <span className="text-[9pt] opacity-60 font-bold">{project.year}</span>
                  </div>
                  <p className="text-[9pt] font-bold uppercase tracking-widest opacity-40 mb-2">{project.category[lang]}</p>
                  <p className="text-[9.5pt] uppercase tracking-tight leading-tight mb-3">
                    {project.detailedDescription[lang]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(s => (
                      <span key={s} className="text-[8pt] border border-black px-2 py-0.5 font-bold uppercase tracking-widest">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] border-b-2 border-black mb-4 pb-1">STACK // CORE</h2>
            <div className="space-y-4">
              {['Web', 'Backend', 'Bots', 'DevOps'].map(cat => (
                <div key={cat}>
                  <p className="text-[8pt] font-bold uppercase tracking-widest opacity-40 mb-1">{cat}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {TECH_STACK.filter(t => t.category === cat).map(t => (
                      <span key={t.name} className="text-[9pt] font-bold uppercase tracking-tighter">{t.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] border-b-2 border-black mb-4 pb-1">AI_AUGMENTATION</h2>
            <ul className="space-y-3 text-[9pt] font-bold uppercase tracking-tight">
              <li>- CLAUDE_LOGIC_MAPPING</li>
              <li>- CURSOR_IDE_ORCHESTRATION</li>
              <li>- NEURAL_FLOW_PROTOTYPING</li>
            </ul>
          </section>

          <section className="bg-black text-white p-4">
            <p className="text-[8pt] font-bold uppercase tracking-[0.4em] mb-2">SYSTEM_CHECKS</p>
            <div className="text-[7pt] font-bold leading-relaxed opacity-80">
              [ OK ] COMPILE_SUCCESS<br/>
              [ OK ] ZERO_DEPENDENCY<br/>
              [ OK ] HIGH_PERF_READY<br/>
              [ OK ] ARCH_CORE_v2.4.0
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-12 pt-6 border-t border-black text-center text-[8pt] font-bold uppercase tracking-[1em] opacity-40">
        IBUILDRUN // ARCH_BY_DESIGN
      </footer>
    </div>
  );
};

export default ResumePrintView;
