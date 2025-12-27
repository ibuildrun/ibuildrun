
import React, { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (mode === 'INSERT' && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [mode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mode === 'NORMAL') {
      if (e.key === 'i') {
        e.preventDefault();
        setMode('INSERT');
      } else if (e.key === ':') {
        e.preventDefault();
        setMode('COMMAND');
        setCommand(':');
      } else if (e.key === 'h') setCursorPos(p => ({ ...p, x: Math.max(0, p.x - 1) }));
      else if (e.key === 'l') setCursorPos(p => ({ ...p, x: p.x + 1 }));
      else if (e.key === 'j') setCursorPos(p => ({ ...p, y: p.y + 1 }));
      else if (e.key === 'k') setCursorPos(p => ({ ...p, y: Math.max(0, p.y - 1) }));
    } else if (mode === 'INSERT') {
      if (e.key === 'Escape') {
        setMode('NORMAL');
      }
    } else if (mode === 'COMMAND') {
      if (e.key === 'Escape') {
        setMode('NORMAL');
        setCommand('');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleVimCommand();
      }
    }
  };

  const handleVimCommand = () => {
    const cmd = command.slice(1);
    if (cmd === 'q') onExit();
    else if (cmd === 'wq') onExit(content);
    else if (cmd === 'q!') onExit();
    else {
      setMode('NORMAL');
      setCommand('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#050505] text-white font-mono p-4 flex flex-col cursor-default"
      onKeyDown={handleKeyDown}
      onClick={() => {
        if (mode === 'INSERT') {
          textareaRef.current?.focus();
        } else {
          (document.activeElement as HTMLElement)?.blur();
        }
      }}
      tabIndex={0}
    >
      <div className="flex-1 overflow-hidden relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full h-full bg-transparent outline-none resize-none border-none p-0 m-0 ${mode !== 'INSERT' ? 'pointer-events-none' : ''}`}
          spellCheck={false}
        />
        {mode === 'NORMAL' && (
          <div 
            className="absolute w-2 h-4 bg-white/50 animate-pulse pointer-events-none"
            style={{ 
              left: `${cursorPos.x * 8}px`, 
              top: `${cursorPos.y * 16}px` 
            }}
          />
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-2">
        <div className="flex justify-between text-[10px] text-white/40 font-bold">
          <span>{filename}</span>
          <span>{content.length} characters</span>
        </div>
        <div className="h-6 flex items-center">
          {mode === 'COMMAND' ? (
            <input
              autoFocus
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVimCommand()}
              className="bg-transparent border-none outline-none text-white w-full h-full"
            />
          ) : (
            <span className="text-[11px] font-bold tracking-widest uppercase">
              {mode === 'INSERT' ? '-- INSERT --' : `-- ${mode} --`}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VimEditor;
