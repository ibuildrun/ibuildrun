import { TechItem, ProcessNode, Project } from './types';

export const TECH_STACK: TechItem[] = [
  { name: 'Next.js', category: 'Web', description: 'React framework.' },
  { name: 'React', category: 'Web', description: 'UI library.' },
  { name: 'TypeScript', category: 'Web', description: 'Type-safe JS.' },
  { name: 'ASP.NET Core', category: 'Backend', description: 'C# Backend.' },
  { name: 'Node.js', category: 'Backend', description: 'JS Runtime.' },
  { name: 'Python', category: 'Backend', description: 'Scripting/AI.' },
  { name: 'PostgreSQL', category: 'Backend', description: 'Relational DB.' },
  { name: '.NET 8', category: 'Desktop', description: 'Desktop Framework.' },
  { name: 'aiogram', category: 'Bots', description: 'Python Bots.' },
  { name: 'Docker', category: 'DevOps', description: 'Containers.' }
];

export const PROCESS_NODES: ProcessNode[] = [
  { 
    id: '01', 
    title: { ru: 'АНАЛИЗ', en: 'ANALYZE' }, 
    description: { ru: 'Разбор требований, поиск узких мест в логике.', en: 'Parse requirements, identify logic bottlenecks.' } 
  },
  { 
    id: '02', 
    title: { ru: 'УСИЛЕНИЕ', en: 'AUGMENT' }, 
    description: { ru: 'Использование ИИ для прототипирования и рутины.', en: 'Leverage AI for boilerplate and rapid prototyping.' } 
  },
  { 
    id: '03', 
    title: { ru: 'ОЧИСТКА', en: 'REFINE' }, 
    description: { ru: 'Написание ядра логики, оптимизация памяти.', en: 'Hardcode core logic, optimize memory/speed.' } 
  },
  { 
    id: '04', 
    title: { ru: 'ЗАПУСК', en: 'SHIP' }, 
    description: { ru: 'Автоматизация CI/CD, мониторинг метрик.', en: 'CI/CD automation, monitor production metrics.' } 
  }
];


export const PROJECTS: Project[] = [
  {
    id: "0x01",
    title: "HQSTUDIO",
    category: { ru: "ENTERPRISE_CRM", en: "ENTERPRISE_CRM" },
    year: "2025",
    description: { 
      ru: "HQ Studio - Premium Auto Tuning CRM System. Web + Desktop + API монорепо.", 
      en: "HQ Studio - Premium Auto Tuning CRM System. Web + Desktop + API monorepo." 
    },
    detailedDescription: {
      ru: "Полноценная CRM-система для премиум автотюнинга. Монорепозиторий включает веб-приложение на Next.js, десктоп-клиент на .NET 8 WPF и ASP.NET Core API. Интеграция с платежными системами, управление заказами и клиентами.",
      en: "Full-featured CRM system for premium auto tuning business. Monorepo includes Next.js web app, .NET 8 WPF desktop client, and ASP.NET Core API. Payment integration, order and customer management."
    },
    stack: ["Next.js", "ASP.NET Core", ".NET 8", "PostgreSQL"],
    link: "https://github.com/ibuildrun/hqstudio"
  },
  {
    id: "0x02",
    title: "INSTRUCT_PIX2PIX_STUDIO",
    category: { ru: "AI_РЕДАКТОР", en: "AI_EDITOR" },
    year: "2025",
    description: { 
      ru: "AI-редактор изображений с InstructPix2Pix. Современный glassmorphism UI.", 
      en: "AI-powered image editor with InstructPix2Pix. Modern glassmorphism UI." 
    },
    detailedDescription: {
      ru: "Десктопное приложение для редактирования изображений с помощью ИИ. Использует модель InstructPix2Pix для трансформации изображений по текстовым инструкциям. Поддержка AMD DirectML для ускорения на видеокартах AMD.",
      en: "Desktop application for AI-powered image editing. Uses InstructPix2Pix model for image transformation via text instructions. AMD DirectML support for GPU acceleration on AMD graphics cards."
    },
    stack: ["Python", "PyTorch", "DirectML", "Gradio"],
    link: "https://github.com/ibuildrun/instruct-pix2pix-studio"
  },
  {
    id: "0x03",
    title: "TIC_TAC_TOE_PASTEL",
    category: { ru: "TELEGRAM_APP", en: "TELEGRAM_APP" },
    year: "2025",
    description: { 
      ru: "Уютная пастельная игра в крестики-нолики - Telegram Mini App с геймификацией.", 
      en: "Cozy pastel Tic-Tac-Toe game - Telegram Mini App with gamification." 
    },
    detailedDescription: {
      ru: "Telegram Mini App с классической игрой в крестики-нолики в пастельных тонах. Система достижений, статистика игр, анимации и звуковые эффекты. Оптимизировано для мобильных устройств.",
      en: "Telegram Mini App featuring classic Tic-Tac-Toe in pastel colors. Achievement system, game statistics, animations and sound effects. Optimized for mobile devices."
    },
    stack: ["React", "TypeScript", "Telegram API", "Vite"],
    link: "https://github.com/ibuildrun/tic-tac-toe-pastel"
  },
  {
    id: "0x04",
    title: "ZAPRET_DISCORD_YOUTUBE",
    category: { ru: "УТИЛИТА", en: "UTILITY" },
    year: "2025",
    description: { 
      ru: "zapret-discord-youtube с графическим интерфейсом. Форк с GUI для удобного управления.", 
      en: "zapret-discord-youtube with GUI. Fork with graphical interface for easy management." 
    },
    detailedDescription: {
      ru: "Форк проекта zapret-discord-youtube с добавлением графического интерфейса. Позволяет удобно управлять настройками обхода блокировок Discord и YouTube без использования командной строки.",
      en: "Fork of zapret-discord-youtube project with added graphical interface. Allows convenient management of Discord and YouTube bypass settings without using command line."
    },
    stack: ["Python", "PyQt", "Windows", "Networking"],
    link: "https://github.com/ibuildrun/zapret-discord-youtube"
  }
];
