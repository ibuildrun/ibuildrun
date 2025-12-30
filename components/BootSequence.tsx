'use client';

import { useEffect, useState } from 'react';

const BOOT_LINES = [
  { text: 'IBUILDRUN SYSTEM v3.3.0', delay: 0 },
  { text: '─────────────────────────────────────────', delay: 100 },
  { text: '', delay: 150 },
  { text: '[BIOS] Initializing system...', delay: 200 },
  { text: '[BIOS] CPU: Neural Processing Unit @ 3.5GHz', delay: 400 },
  { text: '[BIOS] RAM: 32GB DDR5 Creative Memory', delay: 600 },
  { text: '[BIOS] GPU: Imagination Accelerator v2.0', delay: 800 },
  { text: '[OK] Hardware check passed', delay: 1000 },
  { text: '', delay: 1050 },
  { text: '[BOOT] Loading kernel modules...', delay: 1100 },
  { text: '[BOOT] react.ko loaded', delay: 1300 },
  { text: '[BOOT] nextjs.ko loaded', delay: 1450 },
  { text: '[BOOT] typescript.ko loaded', delay: 1600 },
  { text: '[BOOT] creativity.ko loaded', delay: 1750 },
  { text: '[OK] Kernel ready', delay: 1900 },
  { text: '', delay: 1950 },
  { text: '[INIT] Starting services...', delay: 2000 },
  { text: '[INIT] portfolio.service    [ACTIVE]', delay: 2200 },
  { text: '[INIT] skills.service       [ACTIVE]', delay: 2350 },
  { text: '[INIT] projects.service     [ACTIVE]', delay: 2500 },
  { text: '[INIT] contact.service      [ACTIVE]', delay: 2650 },
  { text: '[OK] All services running', delay: 2800 },
  { text: '', delay: 2850 },
  { text: '[SECURITY] Firewall enabled', delay: 2900 },
  { text: '[SECURITY] CSP headers active', delay: 3000 },
  { text: '[SECURITY] Rate limiting enabled', delay: 3100 },
  { text: '[OK] Security protocols engaged', delay: 3200 },
  { text: '', delay: 3250 },
  { text: '─────────────────────────────────────────', delay: 3300 },
  { text: '[SYSTEM] Boot complete. Welcome.', delay: 3400 },
  { text: '', delay: 3500 },
];

const STORAGE_KEY = 'ibuildrun_visited';

export default function BootSequence() {
  const [isBooting, setIsBooting] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem(STORAGE_KEY);
    
    if (!hasVisited) {
      setIsBooting(true);
      
      // Show boot lines progressively
      BOOT_LINES.forEach(({ text, delay }) => {
        setTimeout(() => {
          setVisibleLines(prev => [...prev, text]);
        }, delay);
      });

      // End boot sequence
      setTimeout(() => {
        setBootComplete(true);
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
        
        // Fade out after showing complete message
        setTimeout(() => {
          setIsBooting(false);
        }, 800);
      }, 3800);
    }
  }, []);

  if (!isBooting) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '40px',
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#fff',
        overflow: 'hidden',
        opacity: bootComplete ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%' }}>
        {visibleLines.map((line, index) => (
          <div
            key={index}
            style={{
              marginBottom: '2px',
              whiteSpace: 'pre',
              color: line.startsWith('[OK]') 
                ? '#888' 
                : line.startsWith('[SECURITY]')
                ? '#888'
                : '#fff',
              opacity: line === '' ? 0 : 1,
              minHeight: '18px',
            }}
          >
            {line}
            {index === visibleLines.length - 1 && !bootComplete && (
              <span style={{ animation: 'blink 1s infinite' }}>_</span>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
