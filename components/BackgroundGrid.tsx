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

    const fontSize = isMatrixMode ? 16 : 10;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    
    // Matrix characters
    const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

    // Delta-time based animation for consistent speed across all refresh rates
    let lastFrameTime = 0;
    
    // Speed constants (pixels per second at base)
    const matrixSpeed = 20; // drops per second in matrix mode
    const binarySpeed = 30; // drops per second in normal mode

    const draw = (currentTime: number = 0) => {
      animationFrame = requestAnimationFrame(draw);
      
      // Calculate delta time in seconds
      if (lastFrameTime === 0) lastFrameTime = currentTime;
      const deltaTime = (currentTime - lastFrameTime) / 1000;
      lastFrameTime = currentTime;
      
      // Cap delta to prevent huge jumps (e.g., when tab is inactive)
      const cappedDelta = Math.min(deltaTime, 0.1);

      if (isMatrixMode) {
        // Matrix mode - dark fade for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        // Green matrix rain
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Draw character with glow effect
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#0f0';
          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0;

          // Reset drop randomly after passing screen
          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          // Delta-time based movement - consistent speed regardless of refresh rate
          drops[i] += matrixSpeed * cappedDelta;
        }
      } else {
        // Normal mode - subtle grid
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        // Draw grid
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

        // Subtle binary rain
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.font = '10px monospace';
        
        for (let i = 0; i < drops.length; i++) {
          if (Math.random() > 0.97) {
            const text = Math.random() > 0.5 ? '0' : '1';
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            ctx.fillText(text, x, y);
          }

          if (drops[i] * fontSize > height && Math.random() > 0.99) {
            drops[i] = 0;
          }
          
          // Delta-time based movement
          drops[i] += binarySpeed * cappedDelta;
        }
      }

    };

    animationFrame = requestAnimationFrame(draw);

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

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: isMatrixMode ? 5 : -10,
        opacity: isMatrixMode ? 0.6 : 0.5,
      }}
    />
  );
};

export default BackgroundGrid;