
import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, translations } from '../translations';

interface PortfolioProps {
  lang: Language;
}

const Portfolio: React.FC<PortfolioProps> = ({ lang }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const t = translations[lang];

  return (
    <section id="projects" className="min-h-screen py-24 md:py-48 px-4 md:px-24 z-10 relative border-t bg-transparent" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <div className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 font-bold" style={{ color: 'var(--muted)' }}>{t.portfolio.storage}</div>
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.9] md:leading-none" style={{ color: 'var(--fg)' }}>
            {t.portfolio.title}<br/>
            <span style={{ color: 'var(--muted)' }}>{t.portfolio.subtitle}</span>
          </h2>
          <div className="w-16 md:w-24 h-px mt-8 md:mt-12 opacity-40" style={{ backgroundColor: 'var(--fg)' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px border-2 shadow-2xl" style={{ backgroundColor: 'var(--border)', borderColor: 'var(--border)' }}>
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative aspect-square sm:aspect-video md:aspect-[16/9] p-6 md:p-12 cursor-pointer overflow-hidden flex flex-col justify-between transition-all hover:bg-[var(--fg)] hover:text-[var(--bg)] border"
              style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)', borderColor: 'var(--border)' }}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <span className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] md:tracking-[0.5em] opacity-60 uppercase font-bold">{project.category[lang]}</span>
                  <span className="text-[9px] md:text-[10px] font-mono opacity-60 tracking-widest font-bold">{project.year}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase transition-colors break-words">
                  {project.title}
                </h3>
              </div>

              <div className="relative z-10 space-y-4 md:space-y-6">
                <p className="text-[10px] md:text-sm opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-tight leading-relaxed font-bold line-clamp-3 md:line-clamp-none">
                  {project.description[lang]}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {project.stack.slice(0, 3).map(s => (
                    <span key={s} className="text-[8px] md:text-[9px] border px-2 md:px-3 py-1 font-mono opacity-80 font-bold tracking-widest" style={{ borderColor: 'var(--border)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-5 md:group-hover:opacity-10 transition-opacity text-[40px] md:text-[60px] font-bold pointer-events-none">
                {project.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              onClick={() => setSelectedProject(null)}
            ></motion.div>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl border-2 md:border-4 max-h-[90vh] overflow-y-auto shadow-2xl"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              <div className="sticky top-0 bg-transparent backdrop-blur-md border-b-2 p-4 md:p-8 flex justify-between items-center z-20" style={{ borderColor: 'var(--border)' }}>
                <span className="font-mono text-[8px] md:text-[9px] opacity-60 uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold">{t.portfolio.readout} // {selectedProject.id}</span>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 md:w-12 md:h-12 border-2 flex items-center justify-center hover:invert transition-all group"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span className="text-lg group-hover:rotate-90 transition-transform">✕</span>
                </button>
              </div>

              <div className="p-6 md:p-20 space-y-10 md:space-y-16">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-3xl md:text-8xl font-bold tracking-tighter uppercase leading-tight md:leading-none break-words">{selectedProject.title}</h2>
                  <div className="flex flex-wrap gap-4 md:gap-6 text-[9px] md:text-[10px] font-mono opacity-60 uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold">
                    <span>{selectedProject.category[lang]}</span>
                    <span>/</span>
                    <span>{selectedProject.year}</span>
                    <span>/</span>
                    <span className="text-green-600">DEPLO_OK</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
                  <div className="md:col-span-2 space-y-6 md:space-y-8">
                    <h4 className="text-[9px] md:text-[10px] font-mono uppercase opacity-60 tracking-[0.5em] md:tracking-[0.6em] border-l-4 pl-4 font-bold" style={{ borderColor: 'var(--border)' }}>{t.portfolio.case_study}</h4>
                    <p className="text-base md:text-2xl leading-relaxed opacity-80 uppercase tracking-tighter font-bold">
                      {selectedProject.detailedDescription[lang]}
                    </p>
                  </div>
                  <div className="space-y-8 md:space-y-12">
                    <div className="space-y-4 md:space-y-6">
                      <h4 className="text-[9px] md:text-[10px] font-mono uppercase opacity-60 tracking-[0.5em] md:tracking-[0.6em] font-bold">{t.portfolio.dependencies}</h4>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {selectedProject.stack.map(s => (
                          <span key={s} className="px-3 py-1 md:px-4 md:py-2 border-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest" style={{ borderColor: 'var(--border)' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedProject.link && (
                      <div className="space-y-4 md:space-y-6">
                        <h4 className="text-[9px] md:text-[10px] font-mono uppercase opacity-60 tracking-[0.5em] md:tracking-[0.6em] font-bold">{t.portfolio.access_point}</h4>
                        <a 
                          href={selectedProject.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full px-6 py-4 md:px-8 md:py-5 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] hover:invert border-2 transition-all"
                          style={{ backgroundColor: 'var(--fg)', color: 'var(--bg)', borderColor: 'var(--fg)' }}
                        >
                          {t.portfolio.open_source}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
