'use client';

import React, { useEffect, useRef } from 'react';

interface BackgroundGridProps {
  isMatrixMode?: boolean;
}

const BackgroundGrid: React.FC<BackgroundGridProps> = ({ isMatrixMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const columns = Math.floor(width / 20);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      // Fade effect
      ctx.fillStyle = isMatrixMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid (Subtle if not matrix)
      if (!isMatrixMode) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        const step = 60;
        for (let x = 0; x < width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Binary Rain / Matrix
      ctx.fillStyle = isMatrixMode ? 'rgba(0, 255, 70, 0.5)' : 'rgba(255, 255, 255, 0.15)';
      ctx.font = isMatrixMode ? '14px monospace' : '10px Space Mono';
      
      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '0' : '1';
        const x = i * 20;
        const y = drops[i] * 20;

        // Density check
        if (isMatrixMode || Math.random() > 0.95) {
          ctx.fillText(text, x, y);
        }

        if (y > height && Math.random() > (isMatrixMode ? 0.95 : 0.975)) {
          drops[i] = 0;
        }
        
        // Speed
        drops[i] += isMatrixMode ? 1.5 : 1;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMatrixMode]);

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 transition-opacity duration-1000 ${isMatrixMode ? 'opacity-80' : 'opacity-40'}`} />;
};

export default BackgroundGrid;
