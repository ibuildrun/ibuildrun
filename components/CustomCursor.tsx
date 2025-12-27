'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Прямое манипулирование DOM для нулевой задержки (без React state)
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a');
      
      setIsPointer(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'transform' }}
    >
      <motion.div
        animate={{
          scale: isPointer ? 1.2 : 1,
          rotate: isPointer ? 45 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
        className="relative flex items-center justify-center"
      >
        {/* Центральная точка */}
        <div 
          className="w-1.5 h-1.5 rounded-full absolute" 
          style={{ backgroundColor: 'var(--accent)' }} 
        />
        
        {/* Рамка [ ] */}
        <motion.div 
          animate={{
            width: isPointer ? 40 : 24,
            height: isPointer ? 40 : 24,
            borderWidth: isPointer ? 2 : 1,
            borderRadius: isPointer ? '2px' : '0px'
          }}
          className="border flex items-center justify-center transition-colors"
          style={{ borderColor: 'var(--accent)' }}
        >
          {/* Декоративные уголки */}
          {!isPointer && (
            <>
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r" style={{ borderColor: 'var(--accent)' }} />
            </>
          )}
        </motion.div>

        {/* Индикатор клика */}
        <AnimatePresence>
          {isPointer && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.2, scale: 1.5 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CustomCursor;
