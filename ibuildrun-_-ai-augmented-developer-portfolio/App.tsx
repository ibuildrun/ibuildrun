
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Terminal as TerminalIcon, ArrowRight, Languages
} from 'lucide-react';
import BackgroundGrid from './components/BackgroundGrid';
import Terminal from './components/Terminal';
import BusinessCard from './components/BusinessCard';
import ScrambleText from './components/ScrambleText';
import DebugOverlay from './components/DebugOverlay';
import Portfolio from './components/Portfolio';
import Philosophy from './components/Philosophy';
import Workflow from './components/Workflow';
import AchievementToast from './components/AchievementToast';
import ResumePrintView from './components/ResumePrintView';
import GithubHeartbeat from './components/GithubHeartbeat';
import { TECH_STACK } from './constants';
import { useKonami } from './hooks/useKonami';
import { translations, Language } from './translations';

const THEMES: Record<string, any> = {
  default: {
    '--bg': '#000000',
    '--fg': '#ffffff',
    '--accent': '#ffffff',
    '--border': 'rgba(255, 255, 255, 0.15)',
    '--muted': 'rgba(255, 255, 255, 0.5)',
  },
  hacker: {
    '--bg': '#000000',
    '--fg': '#00ff00',
    '--accent': '#00ff00',
    '--border': 'rgba(0, 255, 0, 0.3)',
    '--muted': 'rgba(0, 255, 0, 0.7)',
  },
  paper: {
    '--bg': '#ffffff',
    '--fg': '#000000',
    '--accent': '#000000',
    '--border': '#000000',
    '--muted': '#333333',
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ru');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isCrtOn, setIsCrtOn] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [achievement, setAchievement] = useState<string | null>(null);

  const t = translations[lang];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useKonami(() => {
    setIsTerminalOpen(true);
    setAchievement(lang === 'ru' ? 'Введен код Конами' : 'Konami Code Entered');
  });

  useEffect(() => {
    const themeData = THEMES[currentTheme] || THEMES.default;
    Object.entries(themeData).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value as string);
    });
    document.body.style.backgroundColor = themeData['--bg'];
    document.body.style.color = themeData['--fg'];
  }, [currentTheme]);

  useEffect(() => {
    const timer = setTimeout(() => setShowNav(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-mono text-xs md:text-sm transition-colors duration-500 ${isCrtOn ? 'crt-effect' : ''}`}>
      <ResumePrintView lang={lang} />
      
      <div className="no-print">
        <BackgroundGrid isMatrixMode={isMatrixMode} />
        <DebugOverlay />
        <AchievementToast achievement={achievement} onClose={() => setAchievement(null)} />
        
        <Terminal 
          lang={lang}
          isOpen={isTerminalOpen} 
          onClose={() => setIsTerminalOpen(false)}
          onMatrixToggle={() => setIsMatrixMode(!isMatrixMode)}
          onCrtToggle={() => setIsCrtOn(!isCrtOn)}
          onThemeChange={(t) => setCurrentTheme(t)}
          onLangChange={(l) => setLang(l as Language)}
          onAchievement={(title) => setAchievement(title)}
        />

        <div className="fixed left-4 top-0 h-full w-8 pointer-events-none z-40 hidden lg:flex flex-col text-[10px] select-none pt-32" style={{ color: 'var(--muted)', opacity: 0.4 }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="h-12 flex items-center justify-center">{(i + 1).toString().padStart(2, '0')}</div>
          ))}
        </div>

        <motion.div className="fixed top-0 left-0 right-0 h-1 z-[200] origin-left" style={{ scaleX, backgroundColor: 'var(--accent)' }} />

        <AnimatePresence>
          {showNav && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-[150] backdrop-blur-md border-b"
              style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(var(--bg), 0.8)' }}
            >
              <div className="flex items-center gap-6">
                <a href="#" className="text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity uppercase" style={{ color: 'var(--fg)' }}>IBUILDRUN</a>
                <span className="hidden md:block w-px h-6" style={{ backgroundColor: 'var(--border)' }} />
                <div className="hidden md:flex items-center gap-2 text-[9px] uppercase tracking-[0.3em]" style={{ color: 'var(--muted)' }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
                  {t.nav.system_stable}: v2.4.0
                </div>
              </div>
              
              <div className="hidden lg:flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: 'var(--fg)' }}>
                <a href="#projects" className="hover:opacity-50 transition-opacity">{t.nav.works}</a>
                <a href="#manifesto" className="hover:opacity-50 transition-opacity">{t.nav.manifesto}</a>
                <a href="#stack" className="hover:opacity-50 transition-opacity">{t.nav.stack}</a>
                <a href="#workflow" className="hover:opacity-50 transition-opacity">{t.nav.workflow}</a>
                <a href="#contact" className="hover:opacity-50 transition-opacity">{t.nav.contact}</a>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
                  className="px-4 border-2 flex items-center gap-2 font-bold hover:invert transition-all"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  <Languages size={14} />
                  <span className="uppercase">{lang}</span>
                </button>
                <button 
                  onClick={() => setIsTerminalOpen(true)}
                  className="p-3 border-2 transition-all relative group overflow-hidden"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ backgroundColor: 'var(--accent)' }} />
                  <TerminalIcon size={20} className="relative z-10 transition-colors group-hover:text-[var(--bg)]" style={{ color: 'var(--fg)' }} />
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        <section id="home" className="h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-transparent border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="absolute top-32 left-12 text-[8px] hidden xl:block pointer-events-none text-left leading-relaxed font-bold opacity-20" style={{ color: 'var(--fg)' }}>
            {`[ OK ] BOOTSTRAPPING_IBUILDRUN...\n[ OK ] ATTACHING_NEURAL_MODELS...\n[ OK ] MOUNTING_REPOS...\n[ OK ] HANDSHAKE_COMPLETE.`}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <pre className="text-[6px] md:text-[8px] mb-12 select-none leading-none font-bold opacity-30" style={{ color: 'var(--fg)' }}>
              {`
    ___  ___  _   _  ___  _      ___   ____  _   _  _   _ 
   |_ _|| __|| | | ||_ _|| |    | _ \\ | __ || | | || \\ | |
    | | | __|| |_| | | | | |__  | v / |  _|| |_| ||  \\| |
   |___||___| \\___/ |___||____| |_|_\\ |__|  \\___/ |_|\\__|
              `}
            </pre>

            <h1 className="text-7xl md:text-[12rem] font-bold mb-6 tracking-tighter leading-none select-none uppercase">
              <ScrambleText text="ibuildrun" />
            </h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-[10px] md:text-xs mb-16 tracking-[0.6em] uppercase flex items-center justify-center gap-4 font-bold"
              style={{ color: 'var(--muted)' }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: 'var(--border)' }} />
              {t.hero.subtitle}
              <span className="w-8 h-px" style={{ backgroundColor: 'var(--border)' }} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-center"
            >
              <a href="#projects" className="px-12 py-6 font-bold border-2 uppercase tracking-[0.4em] text-[11px] hover:invert transition-all" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', borderColor: 'var(--accent)' }}>
                {t.hero.cta}
              </a>
            </motion.div>
          </motion.div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] select-none">
            <span className="text-[35vw] font-bold" style={{ color: 'var(--fg)' }}>CORE</span>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-16 flex flex-col items-center gap-4 group opacity-40 hover:opacity-100 transition-opacity"
          >
            <span className="text-[9px] uppercase tracking-[0.5em] font-bold" style={{ color: 'var(--fg)' }}>{t.hero.trace}</span>
            <div className="w-[1px] h-16" style={{ backgroundColor: 'var(--fg)' }} />
          </motion.div>
        </section>

        <Portfolio lang={lang} />
        <Philosophy lang={lang} />

        <section id="stack" className="py-24 md:py-48 px-4 md:px-6 bg-transparent border-t overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-6 md:gap-12">
              <div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 font-bold" style={{ color: 'var(--muted)' }}>{t.stack.inventory}</div>
                <h2 className="text-4xl sm:text-6xl md:text-9xl font-bold tracking-tighter leading-none uppercase break-words">{t.stack.title}</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px border-2 shadow-xl" style={{ backgroundColor: 'var(--border)', borderColor: 'var(--border)' }}>
              {TECH_STACK.map((tech) => (
                <div key={tech.name} className="p-8 md:p-14 transition-all flex flex-col items-center justify-center text-center hover:opacity-80 border" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
                  <span className="text-[7px] md:text-[8px] mb-4 md:mb-8 opacity-60 uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold" style={{ color: 'var(--fg)' }}>{tech.category}</span>
                  <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em]" style={{ color: 'var(--fg)' }}>{tech.name}</h3>
                  <div className="mt-4 md:mt-8 w-1.5 h-1.5 md:w-2 md:h-2" style={{ backgroundColor: 'var(--accent)' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <GithubHeartbeat lang={lang} />
        
        <Workflow lang={lang} />

        <section id="contact" className="py-48 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div>
                <div className="text-[10px] uppercase tracking-[1em] mb-12 font-bold" style={{ color: 'var(--muted)' }}>{t.contact.interface}</div>
                <h2 className="text-7xl md:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85] uppercase" style={{ color: 'var(--fg)' }}>
                  {t.contact.title}
                </h2>
                <p className="text-xl mb-20 uppercase tracking-tighter leading-relaxed max-w-lg font-bold" style={{ color: 'var(--muted)' }}>
                  {t.contact.desc}
                </p>
                
                <div className="flex flex-col gap-4 max-w-xl">
                  <a href="mailto:hi@ibuildrun.com" className="group flex items-center justify-between p-12 border-2 hover:invert transition-all" style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}>
                      <span className="text-[9px] font-bold uppercase tracking-[0.6em]">Network_ID: hi@ibuildrun.com</span>
                      <ArrowRight size={22} className="group-hover:translate-x-4 transition-transform" />
                  </a>
                  <div className="grid grid-cols-1 gap-4">
                    <a href="https://github.com/ibuildrun" target="_blank" className="p-12 border-2 hover:invert transition-all text-center group font-bold uppercase text-[9px] tracking-[0.4em]" style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}>
                        GITHUB
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <BusinessCard lang={lang} />
              </div>
            </div>
          </div>
        </section>

        <footer className="py-32 border-t text-center px-6 relative" style={{ borderColor: 'var(--border)' }}>
          <div className="absolute bottom-12 right-12 text-[7px] text-right hidden lg:block select-none pointer-events-none uppercase tracking-[0.3em] font-bold leading-loose opacity-30" style={{ color: 'var(--fg)' }}>
            {`BUILD: 7f8e9a1b // RUNTIME: v2.4.0\nCOMPILED: ${new Date().toISOString()}`}
          </div>
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center mb-16 group cursor-pointer"
          >
            <div className="text-[10px] font-bold uppercase tracking-[1.2em] transition-colors mb-8" style={{ color: 'var(--muted)' }}>{t.contact.reload}</div>
            <div className="w-20 h-20 border-2 flex items-center justify-center rounded-full hover:invert transition-all" style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}>
              <ArrowRight className="-rotate-90" size={24} />
            </div>
          </div>
          <div className="text-[9px] uppercase tracking-[0.6em] font-bold" style={{ color: 'var(--muted)' }}>
            &copy; {new Date().getFullYear()} IBUILDRUN — ARCH_BY_DESIGN // SHIP_BY_CODE
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
