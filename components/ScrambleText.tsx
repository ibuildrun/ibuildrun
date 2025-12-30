'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className, trigger = true }) => {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number>(0);
  const iterations = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!trigger || !mounted) return;

    // FPS throttling - lock to 60 FPS for high refresh rate monitors
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const scramble = (currentTime: number = 0) => {
      // Skip frame if not enough time has passed
      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime < frameInterval) {
        frameRef.current = requestAnimationFrame(scramble);
        return;
      }
      lastFrameTime = currentTime - (deltaTime % frameInterval);

      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations.current) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iterations.current < text.length) {
        iterations.current += 1/3;
        frameRef.current = requestAnimationFrame(scramble);
      }
    };

    iterations.current = 0;
    frameRef.current = requestAnimationFrame(scramble);

    return () => cancelAnimationFrame(frameRef.current);
  }, [text, trigger, mounted]);

  return <span className={className}>{displayText}</span>;
};

export default ScrambleText;
