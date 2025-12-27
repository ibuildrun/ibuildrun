'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';

interface AchievementToastProps {
  achievement: string | null;
  onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed bottom-12 right-12 z-[2000] p-6 border-2 flex items-center gap-4"
          style={{
            backgroundColor: 'var(--fg)',
            color: 'var(--bg)',
            borderColor: 'var(--accent)',
            boxShadow: '0 20px 50px rgba(var(--accent), 0.2)',
          }}
        >
          <div 
            className="w-10 h-10 flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
          >
            <Award size={20} />
          </div>
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 mb-1">Achievement_Unlocked</div>
            <div className="text-[11px] font-bold uppercase tracking-[0.1em]">{achievement}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;
