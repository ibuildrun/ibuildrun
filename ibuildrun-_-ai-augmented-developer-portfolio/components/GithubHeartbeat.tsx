
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Clock, Activity } from 'lucide-react';
import { Language, translations } from '../translations';
import ScrambleText from './ScrambleText';

interface Commit {
  id: string;
  repo: string;
  message: string;
  time: string;
  hash: string;
}

interface GithubHeartbeatProps {
  lang: Language;
}

const GithubHeartbeat: React.FC<GithubHeartbeatProps> = ({ lang }) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const t = translations[lang];

  const fetchCommits = async () => {
    try {
      const response = await fetch('https://api.github.com/users/ibuildrun/events/public');
      if (!response.ok) throw new Error();
      const data = await response.json();
      
      const pushEvents = data
        .filter((event: any) => event.type === 'PushEvent')
        .slice(0, 5)
        .map((event: any) => ({
          id: event.id,
          repo: event.repo.name.replace('ibuildrun/', ''),
          message: event.payload.commits[0]?.message || 'Routine update',
          time: new Date(event.created_at).toLocaleTimeString(),
          hash: event.payload.head.substring(0, 7)
        }));

      setCommits(pushEvents);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();
    const interval = setInterval(fetchCommits, 60000); // Обновление раз в минуту
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6 border-t bg-transparent relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Activity size={32} className="text-[var(--accent)] animate-pulse" />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full border-2 border-[var(--accent)]"
              />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: 'var(--muted)' }}>{t.heartbeat.subtitle}</div>
              <h2 className="text-3xl font-bold uppercase tracking-tighter">{t.heartbeat.title}</h2>
            </div>
          </div>
          
          <div className="px-6 py-2 border-2 text-[9px] font-bold uppercase tracking-[0.4em] flex items-center gap-3" style={{ borderColor: 'var(--border)' }}>
            <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
            {error ? t.heartbeat.offline : t.heartbeat.status}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px border-2" style={{ backgroundColor: 'var(--border)', borderColor: 'var(--border)' }}>
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="p-20 text-center bg-[var(--bg)]">
                <span className="text-[10px] uppercase tracking-[1em] animate-pulse">{t.heartbeat.loading}</span>
              </div>
            ) : error ? (
              <div className="p-20 text-center bg-[var(--bg)] opacity-40 italic">
                {t.heartbeat.offline}
              </div>
            ) : (
              commits.map((commit, idx) => (
                <motion.div 
                  key={commit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group hover:invert transition-all"
                  style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
                >
                  <div className="flex items-center gap-8 flex-1">
                    <span className="text-[10px] opacity-30 font-bold font-mono">[{commit.hash}]</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <GitBranch size={12} className="opacity-40" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--accent)]">{commit.repo}</span>
                      </div>
                      <div className="text-sm md:text-lg font-bold uppercase tracking-tight max-w-xl group-hover:scale-105 transition-transform origin-left">
                        <ScrambleText text={commit.message} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 opacity-40 text-[10px] font-bold">
                    <Clock size={12} />
                    <span>{commit.time}</span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Декоративная линия пульса на фоне */}
      <div className="absolute inset-x-0 bottom-0 h-32 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M0,50 L200,50 L220,20 L240,80 L260,50 L500,50 L520,10 L540,90 L560,50 L1000,50" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
};

export default GithubHeartbeat;
