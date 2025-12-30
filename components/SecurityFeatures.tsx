'use client';

import { useEffect, useState } from 'react';

// ASCII art for console
const ASCII_LOGO = `
%c
 ██╗██████╗ ██╗   ██╗██╗██╗     ██████╗ ██████╗ ██╗   ██╗███╗   ██╗
 ██║██╔══██╗██║   ██║██║██║     ██╔══██╗██╔══██╗██║   ██║████╗  ██║
 ██║██████╔╝██║   ██║██║██║     ██║  ██║██████╔╝██║   ██║██╔██╗ ██║
 ██║██╔══██╗██║   ██║██║██║     ██║  ██║██╔══██╗██║   ██║██║╚██╗██║
 ██║██████╔╝╚██████╔╝██║███████╗██████╔╝██║  ██║╚██████╔╝██║ ╚████║
 ╚═╝╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
`;

const WELCOME_MESSAGE = `
%c[SYSTEM] %cWelcome, curious developer.

%c> You found the console. Nice.
> Looking for vulnerabilities? Good luck.
> This is a static site. No backend to hack.
> But since you're here...

%c[TIP] %cType %cibuildrun.hack()%c in console for a surprise.

%c[CONTACT] %chttps://t.me/ibuildrun
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
    // Console easter egg
    console.clear();
    console.log(
      ASCII_LOGO,
      'color: #00ff00; font-family: monospace; font-size: 10px;'
    );
    console.log(
      WELCOME_MESSAGE,
      'color: #ff0000; font-weight: bold;',
      'color: #ffffff;',
      'color: #888888;',
      'color: #ffff00; font-weight: bold;',
      'color: #ffffff;',
      'color: #00ff00; font-weight: bold;',
      'color: #ffffff;',
      'color: #00ffff; font-weight: bold;',
      'color: #00ffff;'
    );

    // Bot detection
    const isBot = detectHeadlessBrowser();
    const canvasAnomaly = detectCanvasAnomaly();
    
    if (isBot || canvasAnomaly) {
      console.log('%c[BOT DETECTED]', 'color: #ff0000; font-size: 20px;');
      console.log('%c> Automated browser detected. Nice try.', 'color: #888888;');
    }

    // Security breach animation function
    const triggerBreach = (reason: string) => {
      setBreachText(reason);
      setShowBreach(true);
      setTimeout(() => setShowBreach(false), 3000);
    };

    // Add hack function to window
    (window as any).ibuildrun = {
      hack: () => {
        triggerBreach('INTRUSION ATTEMPT DETECTED');
        console.log('%c[INITIATING HACK SEQUENCE...]', 'color: #ff0000; font-size: 14px;');
        setTimeout(() => console.log('%c[*] Scanning ports...', 'color: #00ff00;'), 500);
        setTimeout(() => console.log('%c[*] Found open port: 443', 'color: #00ff00;'), 1000);
        setTimeout(() => console.log('%c[*] Attempting SQL injection...', 'color: #00ff00;'), 1500);
        setTimeout(() => console.log('%c[!] No database found (static site lol)', 'color: #ffff00;'), 2000);
        setTimeout(() => console.log('%c[*] Trying XSS attack...', 'color: #00ff00;'), 2500);
        setTimeout(() => console.log('%c[!] CSP blocked the attempt', 'color: #ffff00;'), 3000);
        setTimeout(() => console.log('%c[*] Brute forcing admin panel...', 'color: #00ff00;'), 3500);
        setTimeout(() => console.log('%c[!] No admin panel exists', 'color: #ffff00;'), 4000);
        setTimeout(() => {
          console.log('%c[HACK FAILED]', 'color: #ff0000; font-size: 16px; font-weight: bold;');
          console.log('%c> Nice try. Maybe hire me instead?', 'color: #00ffff;');
          console.log('%c> https://t.me/ibuildrun', 'color: #00ffff;');
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
        console.log('%c' + output, 'color: #00ff00; font-family: monospace; font-size: 8px; line-height: 8px;');
        return '[MATRIX ACTIVATED]';
      },
      whoami: () => {
        console.log('%c[USER INFO]', 'color: #00ffff; font-weight: bold;');
        console.log('> Platform:', navigator.platform);
        console.log('> Language:', navigator.language);
        console.log('> Cookies:', navigator.cookieEnabled ? 'enabled' : 'disabled');
        console.log('> Online:', navigator.onLine ? 'yes' : 'no');
        console.log('> Screen:', `${screen.width}x${screen.height}`);
        console.log('> Bot detected:', isBot ? 'YES' : 'no');
        console.log('> Canvas anomaly:', canvasAnomaly ? 'YES' : 'no');
        return '[DATA COLLECTED]';
      },
      help: () => {
        console.log('%c[AVAILABLE COMMANDS]', 'color: #00ffff; font-weight: bold;');
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

    // DevTools detection
    let devToolsOpen = false;
    const threshold = 160;
    
    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if ((widthThreshold || heightThreshold) && !devToolsOpen) {
        devToolsOpen = true;
        console.log('%c[DEVTOOLS DETECTED]', 'color: #ff0000; font-size: 14px; font-weight: bold;');
        console.log('%c> I see you opened DevTools. Curious one, aren\'t you?', 'color: #888888;');
        console.log('%c> Type ibuildrun.help() for available commands.', 'color: #00ff00;');
      }
    };

    window.addEventListener('resize', checkDevTools);
    checkDevTools();

    // Anti-copy: add watermark when copying text
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 50) {
        e.preventDefault();
        const watermark = `\n\n---\nCopied from ibuildrun.ru | https://t.me/ibuildrun\n---`;
        const text = selection.toString() + watermark;
        e.clipboardData?.setData('text/plain', text);
        console.log('%c[COPY DETECTED]', 'color: #ffff00;');
        console.log('%c> Watermark added to clipboard.', 'color: #888888;');
      }
    };

    document.addEventListener('copy', handleCopy);

    // Keyboard shortcut detection (Ctrl+Shift+I, F12, etc.)
    const handleKeydown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        console.log('%c[F12 PRESSED]', 'color: #ffff00;');
      }
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        console.log('%c[DEVTOOLS SHORTCUT]', 'color: #ffff00;');
      }
      // Ctrl+U (view source)
      if (e.ctrlKey && e.key === 'u') {
        console.log('%c[VIEW SOURCE]', 'color: #ffff00;');
        console.log('%c> Looking at the source? Check GitHub instead:', 'color: #888888;');
        console.log('%c> https://github.com/ibuildrun/ibuildrun', 'color: #00ffff;');
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('resize', checkDevTools);
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

      {/* Honeypot links - invisible to users, bots will follow them */}
      <a 
        href="/admin" 
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
        tabIndex={-1}
        aria-hidden="true"
      >
        Admin
      </a>
      <a 
        href="/wp-admin" 
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
        tabIndex={-1}
        aria-hidden="true"
      >
        WordPress
      </a>
      <a 
        href="/.env" 
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
        tabIndex={-1}
        aria-hidden="true"
      >
        Config
      </a>

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
