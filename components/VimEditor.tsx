'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface VimEditorProps {
  filename: string;
  initialContent: string;
  onExit: (content?: string) => void;
}

type Mode = 'NORMAL' | 'INSERT' | 'COMMAND';

const VimEditor: React.FC<VimEditorProps> = ({ filename, initialContent, onExit }) => {
  const [content, setContent] = useState(initialContent);
  const [mode, setMode] = useState<Mode>('NORMAL');
  const [command, setCommand] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const commandRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'INSERT' && textareaRef.current) {
      textareaRef.current.focus();
    } else if (mode === 'COMMAND' && commandRef.current) {
      commandRef.current.focus();
    } else if (mode === 'NORMAL' && containerRef.current) {
      containerRef.current.focus();
    }
  }, [mode]);

  // Focus container on mount
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleVimCommand = useCallback(() => {
    const cmd = command.slice(1);
    if (cmd === 'q' || cmd === 'q!') {
      onExit();
    } else if (cmd === 'wq' || cmd === 'w') {
      onExit(content);
    } else {
      setMode('NORMAL');
      setCommand('');
    }
  }, [command, content, onExit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (mode === 'NORMAL') {
      if (e.key === 'i') {
        e.preventDefault();
        setMode('INSERT');
      } else if (e.key === ':') {
        e.preventDefault();
        setMode('COMMAND');
        setCommand(':');
      } else if (e.key === 'h') {
        e.preventDefault();
        setCursorPos(p => ({ ...p, x: Math.max(0, p.x - 1) }));
      } else if (e.key === 'l') {
        e.preventDefault();
        setCursorPos(p => ({ ...p, x: p.x + 1 }));
      } else if (e.key === 'j') {
        e.preventDefault();
        setCursorPos(p => ({ ...p, y: p.y + 1 }));
      } else if (e.key === 'k') {
        e.preventDefault();
        setCursorPos(p => ({ ...p, y: Math.max(0, p.y - 1) }));
      }
    } else if (mode === 'INSERT') {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMode('NORMAL');
      }
    } else if (mode === 'COMMAND') {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMode('NORMAL');
        setCommand('');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleVimCommand();
      }
    }
  }, [mode, handleVimCommand]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 font-mono p-4 flex flex-col cursor-default outline-none"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex-1 overflow-hidden relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full h-full bg-transparent outline-none resize-none border-none p-0 m-0 ${mode !== 'INSERT' ? 'pointer-events-none opacity-70' : ''}`}
          style={{ color: 'var(--fg)' }}
          spellCheck={false}
          readOnly={mode !== 'INSERT'}
        />
        {mode === 'NORMAL' && (
          <div 
            className="absolute w-2 h-4 animate-pulse pointer-events-none"
            style={{ 
              left: `${cursorPos.x * 8}px`, 
              top: `${cursorPos.y * 16}px`,
              backgroundColor: 'var(--accent)',
              opacity: 0.5
            }}
          />
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1 border-t pt-2" style={{ borderColor: 'var(--border)' }}>
        <div className="flex justify-between text-[10px] font-bold" style={{ color: 'var(--muted)' }}>
          <span>{filename}</span>
          <span>{content.length} characters</span>
        </div>
        <div className="h-6 flex items-center">
          {mode === 'COMMAND' ? (
            <input
              ref={commandRef}
              autoFocus
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleVimCommand();
                } else if (e.key === 'Escape') {
                  e.preventDefault();
                  setMode('NORMAL');
                  setCommand('');
                }
              }}
              className="bg-transparent border-none outline-none w-full h-full"
              style={{ color: 'var(--fg)' }}
            />
          ) : (
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
              {mode === 'INSERT' ? '-- INSERT --' : '-- NORMAL --'}
            </span>
          )}
        </div>
        <div className="text-[9px] mt-1" style={{ color: 'var(--muted)' }}>
          {mode === 'NORMAL' && 'Press i to insert, : for commands, :q to quit'}
          {mode === 'INSERT' && 'Press ESC to exit insert mode'}
          {mode === 'COMMAND' && 'Commands: :q (quit), :wq (save & quit), :q! (force quit)'}
        </div>
      </div>
    </motion.div>
  );
};

export default VimEditor;
