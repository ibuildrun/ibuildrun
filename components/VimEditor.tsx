'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface VimEditorProps {
  filename: string;
  initialContent: string;
  onExit: (content?: string) => void;
}

type Mode = 'NORMAL' | 'INSERT' | 'VISUAL' | 'COMMAND';

const VimEditor: React.FC<VimEditorProps> = ({ filename, initialContent, onExit }) => {
  const [lines, setLines] = useState<string[]>(initialContent.split('\n'));
  const [mode, setMode] = useState<Mode>('NORMAL');
  const [command, setCommand] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [cursorRow, setCursorRow] = useState(0);
  const [cursorCol, setCursorCol] = useState(0);
  const [visualStart, setVisualStart] = useState<{row: number, col: number} | null>(null);
  const [yankBuffer, setYankBuffer] = useState<string[]>([]);
  const [lastSearch, setLastSearch] = useState('');
  const [modified, setModified] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLInputElement>(null);

  const currentLine = lines[cursorRow] || '';
  const maxCol = Math.max(0, currentLine.length - (mode === 'INSERT' ? 0 : 1));

  // Clamp cursor position
  useEffect(() => {
    if (cursorCol > maxCol) setCursorCol(Math.max(0, maxCol));
  }, [cursorCol, maxCol]);

  useEffect(() => {
    if (mode === 'COMMAND' && commandRef.current) {
      commandRef.current.focus();
    } else if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [mode]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 2000);
  };

  const insertChar = (char: string) => {
    const newLines = [...lines];
    const line = newLines[cursorRow] || '';
    newLines[cursorRow] = line.slice(0, cursorCol) + char + line.slice(cursorCol);
    setLines(newLines);
    setCursorCol(cursorCol + 1);
    setModified(true);
  };

  const deleteChar = (forward: boolean = false) => {
    const newLines = [...lines];
    const line = newLines[cursorRow] || '';
    if (forward) {
      if (cursorCol < line.length) {
        newLines[cursorRow] = line.slice(0, cursorCol) + line.slice(cursorCol + 1);
        setLines(newLines);
        setModified(true);
      }
    } else {
      if (cursorCol > 0) {
        newLines[cursorRow] = line.slice(0, cursorCol - 1) + line.slice(cursorCol);
        setLines(newLines);
        setCursorCol(cursorCol - 1);
        setModified(true);
      } else if (cursorRow > 0) {
        const prevLine = newLines[cursorRow - 1];
        const newCol = prevLine.length;
        newLines[cursorRow - 1] = prevLine + line;
        newLines.splice(cursorRow, 1);
        setLines(newLines);
        setCursorRow(cursorRow - 1);
        setCursorCol(newCol);
        setModified(true);
      }
    }
  };

  const insertNewLine = () => {
    const newLines = [...lines];
    const line = newLines[cursorRow] || '';
    newLines[cursorRow] = line.slice(0, cursorCol);
    newLines.splice(cursorRow + 1, 0, line.slice(cursorCol));
    setLines(newLines);
    setCursorRow(cursorRow + 1);
    setCursorCol(0);
    setModified(true);
  };

  const deleteLine = (row: number) => {
    if (lines.length === 1) {
      setYankBuffer([lines[0]]);
      setLines(['']);
      setCursorCol(0);
    } else {
      setYankBuffer([lines[row]]);
      const newLines = lines.filter((_, i) => i !== row);
      setLines(newLines);
      if (row >= newLines.length) setCursorRow(newLines.length - 1);
    }
    setModified(true);
  };

  const yankLine = (row: number) => {
    setYankBuffer([lines[row]]);
    showStatus('1 line yanked');
  };

  const pasteLine = (after: boolean) => {
    if (yankBuffer.length === 0) return;
    const newLines = [...lines];
    const insertRow = after ? cursorRow + 1 : cursorRow;
    newLines.splice(insertRow, 0, ...yankBuffer);
    setLines(newLines);
    setCursorRow(insertRow);
    setCursorCol(0);
    setModified(true);
  };

  const findNextWord = () => {
    const line = lines[cursorRow];
    let col = cursorCol + 1;
    while (col < line.length && /\w/.test(line[col])) col++;
    while (col < line.length && !/\w/.test(line[col])) col++;
    if (col >= line.length && cursorRow < lines.length - 1) {
      setCursorRow(cursorRow + 1);
      setCursorCol(0);
    } else {
      setCursorCol(Math.min(col, line.length - 1));
    }
  };

  const findPrevWord = () => {
    const line = lines[cursorRow];
    let col = cursorCol - 1;
    while (col > 0 && !/\w/.test(line[col])) col--;
    while (col > 0 && /\w/.test(line[col - 1])) col--;
    if (col <= 0 && cursorRow > 0) {
      setCursorRow(cursorRow - 1);
      setCursorCol(lines[cursorRow - 1].length - 1);
    } else {
      setCursorCol(Math.max(0, col));
    }
  };

  const findEndOfWord = () => {
    const line = lines[cursorRow];
    let col = cursorCol + 1;
    while (col < line.length && !/\w/.test(line[col])) col++;
    while (col < line.length - 1 && /\w/.test(line[col + 1])) col++;
    setCursorCol(Math.min(col, line.length - 1));
  };

  const handleVimCommand = useCallback(() => {
    const cmd = command.slice(1).trim();
    
    if (cmd === 'q') {
      if (modified) {
        showStatus('No write since last change (add ! to override)');
        setMode('NORMAL');
        setCommand('');
        return;
      }
      onExit();
    } else if (cmd === 'q!') {
      onExit();
    } else if (cmd === 'w') {
      onExit(lines.join('\n'));
    } else if (cmd === 'wq' || cmd === 'x') {
      onExit(lines.join('\n'));
    } else if (cmd.startsWith('/')) {
      const search = cmd.slice(1);
      setLastSearch(search);
      // Simple search - find in current line first
      const idx = currentLine.indexOf(search, cursorCol + 1);
      if (idx !== -1) {
        setCursorCol(idx);
      } else {
        showStatus(`Pattern not found: ${search}`);
      }
      setMode('NORMAL');
      setCommand('');
    } else if (cmd === 'set nu' || cmd === 'set number') {
      showStatus('Line numbers enabled');
      setMode('NORMAL');
      setCommand('');
    } else if (cmd === 'help') {
      showStatus('Type :q to quit, :wq to save and quit');
      setMode('NORMAL');
      setCommand('');
    } else if (/^\d+$/.test(cmd)) {
      const lineNum = parseInt(cmd) - 1;
      if (lineNum >= 0 && lineNum < lines.length) {
        setCursorRow(lineNum);
        setCursorCol(0);
      }
      setMode('NORMAL');
      setCommand('');
    } else {
      showStatus(`Not an editor command: ${cmd}`);
      setMode('NORMAL');
      setCommand('');
    }
  }, [command, lines, modified, onExit, currentLine, cursorCol]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (mode === 'NORMAL') {
      e.preventDefault();
      
      // Movement
      if (e.key === 'h' || e.key === 'ArrowLeft') {
        setCursorCol(c => Math.max(0, c - 1));
      } else if (e.key === 'l' || e.key === 'ArrowRight') {
        setCursorCol(c => Math.min(maxCol, c + 1));
      } else if (e.key === 'j' || e.key === 'ArrowDown') {
        setCursorRow(r => Math.min(lines.length - 1, r + 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        setCursorRow(r => Math.max(0, r - 1));
      } else if (e.key === 'w') {
        findNextWord();
      } else if (e.key === 'b') {
        findPrevWord();
      } else if (e.key === 'e') {
        findEndOfWord();
      } else if (e.key === '0' || e.key === 'Home') {
        setCursorCol(0);
      } else if (e.key === '$' || e.key === 'End') {
        setCursorCol(maxCol);
      } else if (e.key === '^') {
        const firstNonSpace = currentLine.search(/\S/);
        setCursorCol(firstNonSpace === -1 ? 0 : firstNonSpace);
      } else if (e.key === 'g' && e.ctrlKey) {
        // gg - go to first line (handled below with gg)
      } else if (e.key === 'G') {
        if (e.shiftKey) {
          setCursorRow(lines.length - 1);
          setCursorCol(0);
        }
      }
      // Insert mode
      else if (e.key === 'i') {
        setMode('INSERT');
      } else if (e.key === 'I') {
        const firstNonSpace = currentLine.search(/\S/);
        setCursorCol(firstNonSpace === -1 ? 0 : firstNonSpace);
        setMode('INSERT');
      } else if (e.key === 'a') {
        setCursorCol(c => Math.min(currentLine.length, c + 1));
        setMode('INSERT');
      } else if (e.key === 'A') {
        setCursorCol(currentLine.length);
        setMode('INSERT');
      } else if (e.key === 'o') {
        const newLines = [...lines];
        newLines.splice(cursorRow + 1, 0, '');
        setLines(newLines);
        setCursorRow(cursorRow + 1);
        setCursorCol(0);
        setMode('INSERT');
        setModified(true);
      } else if (e.key === 'O') {
        const newLines = [...lines];
        newLines.splice(cursorRow, 0, '');
        setLines(newLines);
        setCursorCol(0);
        setMode('INSERT');
        setModified(true);
      }
      // Delete/Change
      else if (e.key === 'x') {
        deleteChar(true);
      } else if (e.key === 'X') {
        deleteChar(false);
      } else if (e.key === 'd') {
        // dd - delete line (simplified, just delete current line)
        deleteLine(cursorRow);
      } else if (e.key === 'D') {
        // Delete to end of line
        const newLines = [...lines];
        newLines[cursorRow] = currentLine.slice(0, cursorCol);
        setLines(newLines);
        setCursorCol(Math.max(0, cursorCol - 1));
        setModified(true);
      } else if (e.key === 'C') {
        // Change to end of line
        const newLines = [...lines];
        newLines[cursorRow] = currentLine.slice(0, cursorCol);
        setLines(newLines);
        setMode('INSERT');
        setModified(true);
      } else if (e.key === 'c') {
        // cc - change line
        setYankBuffer([lines[cursorRow]]);
        const newLines = [...lines];
        newLines[cursorRow] = '';
        setLines(newLines);
        setCursorCol(0);
        setMode('INSERT');
        setModified(true);
      } else if (e.key === 's') {
        // Substitute char
        deleteChar(true);
        setMode('INSERT');
      } else if (e.key === 'S') {
        // Substitute line
        setYankBuffer([lines[cursorRow]]);
        const newLines = [...lines];
        newLines[cursorRow] = '';
        setLines(newLines);
        setCursorCol(0);
        setMode('INSERT');
        setModified(true);
      }
      // Yank/Paste
      else if (e.key === 'y') {
        yankLine(cursorRow);
      } else if (e.key === 'p') {
        pasteLine(true);
      } else if (e.key === 'P') {
        pasteLine(false);
      }
      // Undo (simplified - just show message)
      else if (e.key === 'u') {
        showStatus('Undo not implemented in this demo');
      }
      // Join lines
      else if (e.key === 'J') {
        if (cursorRow < lines.length - 1) {
          const newLines = [...lines];
          newLines[cursorRow] = currentLine + ' ' + newLines[cursorRow + 1].trimStart();
          newLines.splice(cursorRow + 1, 1);
          setLines(newLines);
          setModified(true);
        }
      }
      // Search
      else if (e.key === 'n') {
        if (lastSearch) {
          const idx = currentLine.indexOf(lastSearch, cursorCol + 1);
          if (idx !== -1) setCursorCol(idx);
          else showStatus(`Pattern not found: ${lastSearch}`);
        }
      } else if (e.key === 'N') {
        if (lastSearch) {
          const idx = currentLine.lastIndexOf(lastSearch, cursorCol - 1);
          if (idx !== -1) setCursorCol(idx);
          else showStatus(`Pattern not found: ${lastSearch}`);
        }
      }
      // Visual mode
      else if (e.key === 'v') {
        setMode('VISUAL');
        setVisualStart({ row: cursorRow, col: cursorCol });
      } else if (e.key === 'V') {
        setMode('VISUAL');
        setVisualStart({ row: cursorRow, col: 0 });
      }
      // Command mode
      else if (e.key === ':') {
        setMode('COMMAND');
        setCommand(':');
      } else if (e.key === '/') {
        setMode('COMMAND');
        setCommand('/');
      }
      // Replace single char
      else if (e.key === 'r') {
        // Next key will replace
        showStatus('-- REPLACE --');
      }
      // Repeat (simplified)
      else if (e.key === '.') {
        showStatus('Repeat not implemented');
      }
      // Page movement
      else if (e.key === 'd' && e.ctrlKey) {
        setCursorRow(r => Math.min(lines.length - 1, r + 10));
      } else if (e.key === 'u' && e.ctrlKey) {
        setCursorRow(r => Math.max(0, r - 10));
      }
      
    } else if (mode === 'INSERT') {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMode('NORMAL');
        setCursorCol(c => Math.max(0, c - 1));
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteChar(false);
      } else if (e.key === 'Delete') {
        e.preventDefault();
        deleteChar(true);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        insertNewLine();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        insertChar('  ');
      } else if (e.key === 'ArrowLeft') {
        setCursorCol(c => Math.max(0, c - 1));
      } else if (e.key === 'ArrowRight') {
        setCursorCol(c => Math.min(currentLine.length, c + 1));
      } else if (e.key === 'ArrowUp') {
        setCursorRow(r => Math.max(0, r - 1));
      } else if (e.key === 'ArrowDown') {
        setCursorRow(r => Math.min(lines.length - 1, r + 1));
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        insertChar(e.key);
      }
      
    } else if (mode === 'VISUAL') {
      e.preventDefault();
      if (e.key === 'Escape') {
        setMode('NORMAL');
        setVisualStart(null);
      } else if (e.key === 'h' || e.key === 'ArrowLeft') {
        setCursorCol(c => Math.max(0, c - 1));
      } else if (e.key === 'l' || e.key === 'ArrowRight') {
        setCursorCol(c => Math.min(maxCol, c + 1));
      } else if (e.key === 'j' || e.key === 'ArrowDown') {
        setCursorRow(r => Math.min(lines.length - 1, r + 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        setCursorRow(r => Math.max(0, r - 1));
      } else if (e.key === 'y') {
        // Yank selection
        if (visualStart) {
          const startRow = Math.min(visualStart.row, cursorRow);
          const endRow = Math.max(visualStart.row, cursorRow);
          setYankBuffer(lines.slice(startRow, endRow + 1));
          showStatus(`${endRow - startRow + 1} lines yanked`);
        }
        setMode('NORMAL');
        setVisualStart(null);
      } else if (e.key === 'd') {
        // Delete selection
        if (visualStart) {
          const startRow = Math.min(visualStart.row, cursorRow);
          const endRow = Math.max(visualStart.row, cursorRow);
          setYankBuffer(lines.slice(startRow, endRow + 1));
          const newLines = lines.filter((_, i) => i < startRow || i > endRow);
          setLines(newLines.length ? newLines : ['']);
          setCursorRow(Math.min(startRow, newLines.length - 1));
          setModified(true);
        }
        setMode('NORMAL');
        setVisualStart(null);
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
  }, [mode, maxCol, lines, cursorRow, cursorCol, currentLine, handleVimCommand, visualStart, lastSearch, modified]);

  const getContent = () => lines.join('\n');

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 font-mono flex flex-col cursor-text outline-none overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Editor area */}
      <div className="flex-1 overflow-hidden p-2 text-sm leading-5">
        {lines.map((line, rowIdx) => (
          <div key={rowIdx} className="flex">
            {/* Line number */}
            <span 
              className="w-6 text-right pr-2 select-none flex-shrink-0 text-xs"
              style={{ color: 'var(--muted)' }}
            >
              {rowIdx + 1}
            </span>
            {/* Line content */}
            <div className="flex-1 overflow-hidden relative">
              <div className="break-all">
                {line.split('').map((char, colIdx) => {
                  const isCursor = rowIdx === cursorRow && colIdx === cursorCol;
                  const isVisualSelected = visualStart && (
                    (rowIdx > Math.min(visualStart.row, cursorRow) && rowIdx < Math.max(visualStart.row, cursorRow)) ||
                    (rowIdx === visualStart.row && rowIdx === cursorRow && colIdx >= Math.min(visualStart.col, cursorCol) && colIdx <= Math.max(visualStart.col, cursorCol)) ||
                    (rowIdx === Math.min(visualStart.row, cursorRow) && rowIdx !== Math.max(visualStart.row, cursorRow) && colIdx >= (visualStart.row < cursorRow ? visualStart.col : cursorCol)) ||
                    (rowIdx === Math.max(visualStart.row, cursorRow) && rowIdx !== Math.min(visualStart.row, cursorRow) && colIdx <= (visualStart.row > cursorRow ? visualStart.col : cursorCol))
                  );
                  
                  return (
                    <span
                      key={colIdx}
                      className={`inline ${isCursor ? 'relative' : ''}`}
                      style={{
                        backgroundColor: isCursor 
                          ? (mode === 'INSERT' ? 'transparent' : 'var(--fg)') 
                          : isVisualSelected ? 'var(--accent)' : undefined,
                        color: isCursor && mode !== 'INSERT' 
                          ? 'var(--bg)' 
                          : isVisualSelected ? 'var(--bg)' : undefined,
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
                {/* Cursor at end of line or empty line */}
                {rowIdx === cursorRow && cursorCol >= line.length && (
                  <span 
                    className="inline-block animate-pulse"
                    style={{ 
                      backgroundColor: mode === 'INSERT' ? 'var(--accent)' : 'var(--fg)',
                      width: mode === 'INSERT' ? '2px' : '8px',
                      height: '1em',
                      verticalAlign: 'text-bottom',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="border-t px-2 py-1 text-xs flex justify-between" style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
        <div className="flex gap-4">
          <span style={{ color: 'var(--accent)' }}>
            {mode === 'COMMAND' ? (
              <input
                ref={commandRef}
                autoFocus
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="bg-transparent border-none outline-none w-48"
                style={{ color: 'var(--fg)' }}
              />
            ) : statusMessage ? (
              statusMessage
            ) : (
              `-- ${mode} --`
            )}
          </span>
        </div>
        <div className="flex gap-4" style={{ color: 'var(--muted)' }}>
          <span>{filename}{modified ? ' [+]' : ''}</span>
          <span>{cursorRow + 1}:{cursorCol + 1}</span>
          <span>{Math.round(((cursorRow + 1) / lines.length) * 100)}%</span>
        </div>
      </div>

      {/* Help hint */}
      <div className="px-2 py-1 text-[10px] border-t" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
        {mode === 'NORMAL' && 'i:insert a:append o:newline dd:delete yy:yank p:paste w:word b:back 0:start $:end :q:quit :wq:save&quit'}
        {mode === 'INSERT' && 'ESC:normal mode | Type to insert text'}
        {mode === 'VISUAL' && 'y:yank d:delete ESC:cancel | hjkl:move selection'}
        {mode === 'COMMAND' && 'Enter:execute ESC:cancel | :q :wq :w /<search> :<line>'}
      </div>
    </motion.div>
  );
};

export default VimEditor;