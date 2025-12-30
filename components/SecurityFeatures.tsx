'use client';

import { useEffect } from 'react';

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

export default function SecurityFeatures() {
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

    // Add hack function to window
    (window as any).ibuildrun = {
      hack: () => {
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
        return '[DATA COLLECTED]';
      },
      help: () => {
        console.log('%c[AVAILABLE COMMANDS]', 'color: #00ffff; font-weight: bold;');
        console.log('> ibuildrun.hack()   - Try to hack this site');
        console.log('> ibuildrun.matrix() - Enter the matrix');
        console.log('> ibuildrun.whoami() - Get your info');
        console.log('> ibuildrun.source() - View source code');
        console.log('> ibuildrun.hire()   - Contact me');
        return '[HELP DISPLAYED]';
      },
      source: () => {
        window.open('https://github.com/ibuildrun/ibuildrun', '_blank');
        return '[OPENING GITHUB...]';
      },
      hire: () => {
        window.open('https://t.me/ibuildrun', '_blank');
        return '[OPENING TELEGRAM...]';
      }
    };

    // DevTools detection (just for fun, shows message)
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

    // Disable right-click context menu (optional, can be annoying)
    // document.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      window.removeEventListener('resize', checkDevTools);
      delete (window as any).ibuildrun;
    };
  }, []);

  // Hidden honeypot links for bots (invisible to users)
  return (
    <>
      {/* Honeypot links - invisible to users, bots will follow them */}
      <a 
        href="/admin" 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}
        tabIndex={-1}
        aria-hidden="true"
      >
        Admin
      </a>
      <a 
        href="/wp-admin" 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}
        tabIndex={-1}
        aria-hidden="true"
      >
        WordPress
      </a>
      <a 
        href="/.env" 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}
        tabIndex={-1}
        aria-hidden="true"
      >
        Config
      </a>
    </>
  );
}
