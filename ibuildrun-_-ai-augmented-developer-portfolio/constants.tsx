
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
    title: "NEXASTREAM_CORE",
    category: { ru: "СИСТЕМНАЯ_АРХ", en: "SYSTEM_ARCH" },
    year: "2024",
    description: { 
      ru: "Высокопроизводительный движок обработки потоков нейронных данных.", 
      en: "High-throughput stream processing engine for neural workloads." 
    },
    detailedDescription: {
      ru: "Разработка уровня приема данных, способного обрабатывать более 50 000 событий в секунду. Реализовано кастомное управление памятью и обработчики обратного давления. Интегрировано с Claude API для семантического анализа пакетов в реальном времени.",
      en: "Development of a highly parallelized ingestion layer handling 50k+ events/sec. Implemented custom memory pooling and backpressure handlers. Integrated with Claude API for real-time semantic analysis."
    },
    stack: ["TypeScript", "Node.js", "Redis", "Kafka"],
    link: "https://github.com/ibuildrun/nexastream"
  },
  {
    id: "0x02",
    title: "BOT_FRAMEWORK_PRO",
    category: { ru: "АВТОМАТИЗАЦИЯ", en: "AUTOMATION" },
    year: "2023",
    description: { 
      ru: "Enterprise-обертка для асинхронных бот-коммуникаций.", 
      en: "Enterprise-grade wrapper for asynchronous bot communications." 
    },
    detailedDescription: {
      ru: "Надежный слой промежуточного ПО для Telegram и Slack ботов. Поддерживает автоматическое горизонтальное масштабирование и встроенную аналитику. Сократил время разработки новых фич на 60% за счет стандартизации.",
      en: "Robust middleware for Telegram/Slack. Features horizontal scaling, built-in analytics, and state-machine conversation engine. Reduced dev time by 60%."
    },
    stack: ["Python", "aiogram", "PostgreSQL", "Docker"],
    link: "https://github.com/ibuildrun/bot-framework"
  },
  {
    id: "0x03",
    title: "DOTNET_OBSIDIAN",
    category: { ru: "ИНТЕРФЕЙСЫ", en: "UI_SYSTEM" },
    year: "2024",
    description: { 
      ru: "Монохромная дизайн-система для сред WPF и Avalonia.", 
      en: "Monochrome design system for WPF and Avalonia environments." 
    },
    detailedDescription: {
      ru: "Система дизайна, вдохновленная минималистичными текстовыми редакторами. Полностью кастомные элементы управления на C# без сторонних зависимостей. Оптимизировано для низких задержек отрисовки.",
      en: "A pure-code design system inspired by minimalist text editors. Custom controls written in C# without third-party dependencies. Optimized for low-latency rendering."
    },
    stack: [".NET 8", "C#", "Avalonia", "XAML"],
    link: "https://github.com/ibuildrun/obsidian-ui"
  },
  {
    id: "0x04",
    title: "K8S_INFRA_AUTO",
    category: { ru: "ДЕВОПС", en: "DEVOPS" },
    year: "2024",
    description: { 
      ru: "Скрипты развертывания Zero-touch для мультиоблачных кластеров.", 
      en: "Zero-touch deployment scripts for multi-cloud clusters." 
    },
    detailedDescription: {
      ru: "Автоматизированная подготовка и управление конфигурацией для кластеров Kubernetes. Включает управление TLS, интеграцию с Vault и кастомные дашборды мониторинга.",
      en: "Automated provisioning and configuration for K8s. Includes TLS management, Vault integration, and GitOps workflow using ArgoCD."
    },
    stack: ["Go", "Terraform", "Kubernetes", "ArgoCD"],
    link: "https://github.com/ibuildrun/k8s-infra"
  }
];
