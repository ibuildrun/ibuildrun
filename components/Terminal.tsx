'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PROJECTS, TECH_STACK } from '@/lib/constants';
import { translations, Language } from '@/lib/translations';
import VimEditor from './VimEditor';

interface TerminalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onMatrixToggle: () => void;
  onCrtToggle: () => void;
  onThemeChange: (theme: string) => void;
  onLangChange: (lang: string) => void;
  onAchievement: (title: string) => void;
}

const MOCK_FILES = {
  'bio.txt': 'I am ibuildrun. Full-stack engineer with a passion for high-performance systems and AI-augmented workflows.',
  'config.sys': 'MODE=OPTIMIZED\nAI_LEVEL=AUGMENTED\nCOFFEE_LEVEL=CRITICAL\nUPTIME=99.99%',
  'contact.json': '{\n  "email": "hi@ibuildrun.com",\n  "status": "Available"\n}',
  'secrets.log': 'Nice try, user. The real secrets are hidden in the code.'
};

const AVAILABLE_COMMANDS = [
  'help', 'whoami', 'ls', 'cat', 'neofetch', 'projects', 'stack', 'socials', 'sudo', 'date', 'clear', 'exit', 'vim', 'git', 'matrix', 'crt', 'theme', 'lang', 'print-pdf'
];

const AVAILABLE_THEMES = ['hacker', 'paper', 'default'];
const AVAILABLE_LANGS = ['ru', 'en'];

const Terminal: React.FC<TerminalProps> = ({ 
  lang,
  isOpen, 
  onClose, 
  onMatrixToggle, 
  onCrtToggle, 
  onThemeChange, 
  onLangChange,
  onAchievement 
}) => {
  const [input, setInput] = useState('');
  const t = translations[lang];
  const [history, setHistory] = useState<string[]>([t.terminal.welcome, t.terminal.help_hint]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [vimFile, setVimFile] = useState<{ name: string; content: string } | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && !vimFile) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, vimFile]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.trim().split(' ');
      
      if (parts.length === 1 && parts[0] !== '') {
        const matches = AVAILABLE_COMMANDS.filter(cmd => cmd.startsWith(parts[0]));
        if (matches.length === 1) {
          setInput(matches[0] + ' ');
        } else if (matches.length > 1) {
          setHistory(prev => [...prev, `> ${input}`, matches.join('    ')]);
        }
      } else if (parts.length === 2) {
        let matches: string[] = [];
        if (parts[0] === 'theme') matches = AVAILABLE_THEMES.filter(t => t.startsWith(parts[1]));
        if (parts[0] === 'lang') matches = AVAILABLE_LANGS.filter(l => l.startsWith(parts[1]));
        if (parts[0] === 'cat' || parts[0] === 'vim') matches = Object.keys(MOCK_FILES).filter(f => f.startsWith(parts[1]));

        if (matches.length === 1) {
          setInput(`${parts[0]} ${matches[0]}`);
        } else if (matches.length > 1) {
          setHistory(prev => [...prev, `> ${input}`, matches.join('    ')]);
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCommand = input.trim();
    if (!fullCommand) {
      setHistory(prev => [...prev, '> ']);
      return;
    }

    setCommandHistory(prev => [...prev, fullCommand]);
    setHistoryIndex(-1);

    const parts = fullCommand.toLowerCase().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    
    let responses: string[] = [];

    switch (cmd) {
      case 'help':
        responses = [
          lang === 'ru' ? 'Доступные команды:' : 'Available commands:',
          '  lang [ru|en]- Переключение языка / Change language',
          '  theme [t]   - hacker, paper, default',
          '  vim [file]  - Edit/view a file',
          '  ls          - List files',
          '  cat [file]  - Read file',
          '  print-pdf   - Generate minimalist resume PDF',
          '  matrix      - Toggle Matrix effect',
          '  crt         - Toggle CRT effect',
          '  clear       - Clear terminal',
          '  exit        - Close terminal'
        ];
        break;

      case 'print-pdf':
        responses = [
          lang === 'ru' ? '[OK] Инициализация последовательности печати...' : '[OK] Initializing print sequence...',
          lang === 'ru' ? '[OK] Генерация монохромного резюме...' : '[OK] Generating monochrome resume...',
          lang === 'ru' ? 'Подготовьтесь к сохранению файла.' : 'Prepare to save file.'
        ];
        setTimeout(() => window.print(), 1000);
        onAchievement(lang === 'ru' ? 'Секретарь' : 'The Archivist');
        break;

      case 'lang':
        if (AVAILABLE_LANGS.includes(args[0])) {
          onLangChange(args[0]);
          responses = [args[0] === 'ru' ? '[OK] Язык изменен на Русский' : '[OK] Language changed to English'];
        } else {
          responses = ['Available languages: ru, en'];
        }
        break;

      case 'theme':
        if (AVAILABLE_THEMES.includes(args[0])) {
          onThemeChange(args[0]);
          responses = [`[OK] Interface theme set to ${args[0]}`];
          onAchievement(lang === 'ru' ? 'Стилист' : 'Customizer');
        } else {
          responses = ['Available themes: hacker, paper, default'];
        }
        break;

      case 'ls':
        responses = [Object.keys(MOCK_FILES).join('    ')];
        break;

      case 'cat':
        if (args.length === 0) responses = ['Usage: cat [filename]'];
        else if (MOCK_FILES[args[0] as keyof typeof MOCK_FILES]) responses = MOCK_FILES[args[0] as keyof typeof MOCK_FILES].split('\n');
        else responses = [`cat: ${args[0]}: No such file`];
        break;

      case 'vim':
        if (args.length === 0) {
          responses = ['Usage: vim [filename]'];
        } else {
          const fileName = args[0];
          const fileContent = MOCK_FILES[fileName as keyof typeof MOCK_FILES] || '';
          setHistory([...history, `> ${fullCommand}`, `Opening ${fileName} in vim...`]);
          setInput('');
          setTimeout(() => {
            setVimFile({ name: fileName, content: fileContent });
          }, 100);
          return;
        }
        break;

      case 'whoami':
        responses = ['ibuildrun // System Architect'];
        break;

      case 'matrix':
        onMatrixToggle();
        responses = [lang === 'ru' ? '[OK] Matrix эффект переключен' : '[OK] Matrix effect toggled'];
        onAchievement(lang === 'ru' ? 'Нео' : 'The One');
        break;

      case 'crt':
        onCrtToggle();
        responses = [lang === 'ru' ? '[OK] CRT эффект переключен' : '[OK] CRT effect toggled'];
        onAchievement(lang === 'ru' ? 'Ретро' : 'Retro Vibes');
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        responses = [`Command not found: ${cmd}. Type "help" for options.`];
    }

    setHistory([...history, `> ${fullCommand}`, ...responses]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md no-print"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl border-2 rounded-sm overflow-hidden shadow-2xl font-mono text-xs md:text-sm relative h-[500px] transition-colors duration-500 cursor-default"
        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--fg)' }}
        onClick={e => { e.stopPropagation(); inputRef.current?.focus(); }}
      >
        <AnimatePresence mode="wait">
          {vimFile ? (
            <VimEditor 
              key="vim"
              filename={vimFile.name} 
              initialContent={vimFile.content} 
              onExit={() => setVimFile(null)} 
            />
          ) : (
            <motion.div 
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              <div className="p-4 flex justify-between items-center border-b" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
                  <span className="opacity-40 uppercase tracking-widest text-[10px] font-bold">{t.terminal.active}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-8 h-8 flex items-center justify-center hover:opacity-100 opacity-40 transition-all">
                  <X size={14} />
                </button>
              </div>
              <div ref={scrollRef} className="p-6 flex-1 overflow-y-auto flex flex-col gap-2 bg-transparent scrollbar-thin">
                {history.map((line, i) => (
                  <div key={i} className={`whitespace-pre-wrap leading-relaxed ${line.startsWith('>') ? 'font-bold' : 'opacity-70'}`} style={{ color: line.startsWith('>') ? 'var(--accent)' : 'var(--fg)' }}>{line}</div>
                ))}
                <form onSubmit={handleCommand} className="relative flex flex-col mt-2">
                  <div className="flex gap-3 items-center">
                    <span className="font-bold" style={{ color: 'var(--accent)' }}>$</span>
                    <input
                      ref={inputRef}
                      autoFocus
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="bg-transparent border-none outline-none w-full font-bold"
                      style={{ color: 'var(--fg)' }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                </form>
              </div>
              <div className="p-2 px-6 border-t text-[9px] opacity-40 flex justify-between uppercase font-bold tracking-widest" style={{ borderColor: 'var(--border)' }}>
                 <span>ibuildrun_os_v2.4.0 [{lang}]</span>
                 <span>UTF-8</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Terminal;
