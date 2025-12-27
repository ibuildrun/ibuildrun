'use client';

import React, { useState, useEffect } from 'react';

const DebugOverlay: React.FC = () => {
  const [stats, setStats] = useState({
    x: 0,
    y: 0,
    scroll: 0,
    fps: 60,
    mem: '124MB'
  });

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;

    const handleMove = (e: MouseEvent) => {
      setStats(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
    };

    const handleScroll = () => {
      setStats(prev => ({ ...prev, scroll: window.scrollY }));
    };

    const updateFPS = (time: number) => {
      frames++;
      if (time > lastTime + 1000) {
        setStats(prev => ({ ...prev, fps: Math.round((frames * 1000) / (time - lastTime)) }));
        lastTime = time;
        frames = 0;
      }
      requestAnimationFrame(updateFPS);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('scroll', handleScroll);
    const animId = requestAnimationFrame(updateFPS);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-[150] font-mono text-[9px] uppercase tracking-tighter text-white/20 pointer-events-none hidden lg:block">
      <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
        <div>LOC_X: {stats.x.toString().padStart(4, '0')}</div>
        <div>LOC_Y: {stats.y.toString().padStart(4, '0')}</div>
        <div>SCRL_P: {Math.floor(stats.scroll).toString().padStart(4, '0')}</div>
        <div>RNDR_FPS: {stats.fps}</div>
        <div>MEM_USE: {stats.mem}</div>
        <div className="text-white/40 mt-2">STATUS: STABLE_RELEASE</div>
      </div>
    </div>
  );
};

export default DebugOverlay;
