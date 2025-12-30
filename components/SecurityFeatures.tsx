'use client';

import { useEffect, useState } from 'react';

// ASCII art for console
const ASCII_LOGO = `
 ██╗██████╗ ██╗   ██╗██╗██╗     ██████╗ ██████╗ ██╗   ██╗███╗   ██╗
 ██║██╔══██╗██║   ██║██║██║     ██╔══██╗██╔══██╗██║   ██║████╗  ██║
 ██║██████╔╝██║   ██║██║██║     ██║  ██║██████╔╝██║   ██║██╔██╗ ██║
 ██║██╔══██╗██║   ██║██║██║     ██║  ██║██╔══██╗██║   ██║██║╚██╗██║
 ██║██████╔╝╚██████╔╝██║███████╗██████╔╝██║  ██║╚██████╔╝██║ ╚████║
 ╚═╝╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                                                                   
 Full-Stack Developer & Software Architect                         
 ─────────────────────────────────────────────────────────────────
`;

const WELCOME_MESSAGE = `
 [SYSTEM] Welcome, curious developer.
 
 You found the console. Nice.
 Looking for vulnerabilities? Good luck - this is a static site.
 No backend, no database, no API to hack.
 
 ─────────────────────────────────────────────────────────────────
 
 [ABOUT]
 > Name: ibuildrun
 > Role: Full-Stack Developer & Software Architect
 > Stack: Next.js, React, TypeScript, .NET, Python
 > Focus: AI-augmented development, scalable systems
 
 [LINKS]
 > GitHub:   https://github.com/ibuildrun
 > Telegram: https://t.me/ibuildrun
 > Website:  https://ibuildrun.ru
 
 [CONSOLE COMMANDS]
 > ibuildrun.hack()   - Try to hack this site
 > ibuildrun.matrix() - Enter the matrix
 > ibuildrun.whoami() - Get your browser info
 > ibuildrun.source() - View source code on GitHub
 > ibuildrun.hire()   - Contact me on Telegram
 > ibuildrun.help()   - Show all commands
 
 ─────────────────────────────────────────────────────────────────
`;

// Detect headless browsers / bots
function detectHeadlessBrowser(): boolean {
  const dominated = navigator.webdriver;
  const phantom = !!(window as any).callPhantom || !!(window as any)._phantom;
  const nightmare = !!(window as any).__nightmare;
  const selenium = !!(window as any).document.__selenium_unwrapped || 
                   !!(window as any).document.__webdriver_evaluate ||
                   !!(window as any).document.__driver_evaluate;
  const chromeHeadless = /HeadlessChrome/.test(navigator.userAgent);
  const noPlugins = navigator.plugins.length === 0;
  const noLanguages = !navigator.languages || navigator.languages.length === 0;
  
  return dominated || phantom || nightmare || selenium || chromeHeadless || 
         (noPlugins && noLanguages);
}

// Canvas fingerprint check (bots often have identical/missing canvas)
function detectCanvasAnomaly(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return true;
    
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('ibuildrun', 2, 15);
    
    const dataUrl = canvas.toDataURL();
    // Bots often return empty or identical canvas
    return dataUrl.length < 1000;
  } catch {
    return true;
  }
}

export default function SecurityFeatures() {
  const [showBreach, setShowBreach] = useState(false);
  const [breachText, setBreachText] = useState('');

  useEffect(() => {
    // Console easter egg - monochrome style
    const style = 'font-family: monospace; font-size: 11px; line-height: 1.2;';
    console.log('%c' + ASCII_LOGO, style);
    console.log('%c' + WELCOME_MESSAGE, style);

    // Bot detection
    const isBot = detectHeadlessBrowser();
    const canvasAnomaly = detectCanvasAnomaly();
    
    if (isBot || canvasAnomaly) {
      console.log('[BOT DETECTED] Automated browser detected. Nice try.');
    }

    // Security breach animation function
    const triggerBreach = (reason: string) => {
      setBreachText(reason);
      setShowBreach(true);
      setTimeout(() => setShowBreach(false), 3000);
    };

    // Monochrome style for all console outputs
    const mono = 'font-family: monospace;';

    // Add hack function to window
    (window as any).ibuildrun = {
      hack: () => {
        triggerBreach('INTRUSION ATTEMPT DETECTED');
        console.log('%c[INITIATING HACK SEQUENCE...]', mono);
        setTimeout(() => console.log('[*] Scanning ports...'), 500);
        setTimeout(() => console.log('[*] Found open port: 443'), 1000);
        setTimeout(() => console.log('[*] Attempting SQL injection...'), 1500);
        setTimeout(() => console.log('[!] No database found (static site)'), 2000);
        setTimeout(() => console.log('[*] Trying XSS attack...'), 2500);
        setTimeout(() => console.log('[!] CSP blocked the attempt'), 3000);
        setTimeout(() => console.log('[*] Brute forcing admin panel...'), 3500);
        setTimeout(() => console.log('[!] No admin panel exists'), 4000);
        setTimeout(() => {
          console.log('[HACK FAILED]');
          console.log('> Nice try. Maybe hire me instead?');
          console.log('> https://t.me/ibuildrun');
        }, 4500);
        return '[HACK IN PROGRESS...]';
      },
      matrix: () => {
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        let output = '';
        for (let i = 0; i < 50; i++) {
          let line = '';
          for (let j = 0; j < 80; j++) {
            line += chars[Math.floor(Math.random() * chars.length)];
          }
          output += line + '\n';
        }
        console.log('%c' + output, 'font-family: monospace; font-size: 8px; line-height: 8px;');
        return '[MATRIX ACTIVATED]';
      },
      whoami: () => {
        console.log('[USER INFO]');
        console.log('> User Agent:', navigator.userAgent);
        console.log('> Language:', navigator.language);
        console.log('> Cookies:', navigator.cookieEnabled ? 'enabled' : 'disabled');
        console.log('> Online:', navigator.onLine ? 'yes' : 'no');
        console.log('> Screen:', `${screen.width}x${screen.height}`);
        console.log('> Color Depth:', screen.colorDepth);
        console.log('> Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
        console.log('> Bot detected:', isBot ? 'YES' : 'no');
        console.log('> Canvas anomaly:', canvasAnomaly ? 'YES' : 'no');
        return '[DATA COLLECTED]';
      },
      help: () => {
        console.log('[AVAILABLE COMMANDS]');
        console.log('> ibuildrun.hack()   - Try to hack this site');
        console.log('> ibuildrun.matrix() - Enter the matrix');
        console.log('> ibuildrun.whoami() - Get your info');
        console.log('> ibuildrun.source() - View source code');
        console.log('> ibuildrun.hire()   - Contact me');
        console.log('> ibuildrun.breach() - Trigger security alert');
        return '[HELP DISPLAYED]';
      },
      source: () => {
        window.open('https://github.com/ibuildrun/ibuildrun', '_blank');
        return '[OPENING GITHUB...]';
      },
      hire: () => {
        window.open('https://t.me/ibuildrun', '_blank');
        return '[OPENING TELEGRAM...]';
      },
      breach: () => {
        triggerBreach('SECURITY BREACH SIMULATION');
        return '[BREACH TRIGGERED]';
      }
    };

    // DevTools detection - check window size difference
    let devToolsAlerted = false;

    const checkWindowSize = () => {
      if (devToolsAlerted) return;
      
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      
      if (widthDiff || heightDiff) {
        devToolsAlerted = true;
        console.log('[DEVTOOLS DETECTED]');
        console.log('> I see you opened DevTools. Curious one, aren\'t you?');
        console.log('> Type ibuildrun.help() for available commands.');
      }
    };

    // Check on resize
    window.addEventListener('resize', checkWindowSize);
    
    // Initial check after small delay
    setTimeout(checkWindowSize, 1000);

    // Anti-copy: add watermark when copying text
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 50) {
        e.preventDefault();
        const watermark = `\n\n---\nCopied from ibuildrun.ru | https://t.me/ibuildrun\n---`;
        const text = selection.toString() + watermark;
        e.clipboardData?.setData('text/plain', text);
        console.log('[COPY DETECTED] Watermark added to clipboard.');
      }
    };

    document.addEventListener('copy', handleCopy);

    // Keyboard shortcut detection (Ctrl+Shift+I, F12, etc.)
    const handleKeydown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        console.log('[F12 PRESSED]');
      }
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        console.log('[DEVTOOLS SHORTCUT]');
      }
      // Ctrl+U (view source)
      if (e.ctrlKey && e.key === 'u') {
        console.log('[VIEW SOURCE]');
        console.log('> Looking at the source? Check GitHub instead:');
        console.log('> https://github.com/ibuildrun/ibuildrun');
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeydown);
      delete (window as any).ibuildrun;
    };
  }, []);

  return (
    <>
      {/* Security breach animation overlay */}
      {showBreach && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'breach-flash 0.5s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              color: '#ff0000',
              fontFamily: 'monospace',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
              textShadow: '0 0 10px #ff0000',
              animation: 'breach-glitch 0.1s infinite',
            }}
          >
            [!] {breachText} [!]
            <br />
            <span style={{ fontSize: '14px', color: '#ff6666' }}>
              TRACING IP ADDRESS...
            </span>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes breach-flash {
          0%, 100% { background-color: rgba(255, 0, 0, 0.05); }
          50% { background-color: rgba(255, 0, 0, 0.15); }
        }
        @keyframes breach-glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </>
  );
}
