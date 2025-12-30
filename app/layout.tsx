import type { Metadata } from 'next';
import './globals.css';
import SecurityFeatures from '@/components/SecurityFeatures';

const BASE_URL = 'https://ibuildrun.ru';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'IBUILDRUN | Full-Stack Developer & Software Architect',
    template: '%s | IBUILDRUN'
  },
  description: 'Full-Stack Software Engineer & Architect. Specializing in Next.js, React, TypeScript, .NET, and AI-augmented development. Building scalable web applications and enterprise systems.',
  keywords: [
    'full-stack developer', 'software architect', 'react developer', 'nextjs developer',
    'typescript', 'dotnet developer', 'asp.net core', 'ai development',
    'web development', 'enterprise software', 'crm development', 'telegram bots',
    'fullstack разработчик', 'веб разработка', 'программист', 'архитектор ПО'
  ],
  authors: [{ name: 'ibuildrun', url: BASE_URL }],
  creator: 'ibuildrun',
  publisher: 'ibuildrun',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en': BASE_URL,
      'ru': BASE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ru_RU',
    url: BASE_URL,
    siteName: 'IBUILDRUN',
    title: 'IBUILDRUN | Full-Stack Developer & Software Architect',
    description: 'Full-Stack Software Engineer specializing in Next.js, React, TypeScript, .NET, and AI-augmented development.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'IBUILDRUN - Full-Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IBUILDRUN | Full-Stack Developer & Software Architect',
    description: 'Full-Stack Software Engineer specializing in Next.js, React, TypeScript, .NET, and AI-augmented development.',
    images: [`${BASE_URL}/og-image.png`],
    creator: '@ibuildrun',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  category: 'technology',
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'IBUILDRUN',
      description: 'Full-Stack Developer & Software Architect Portfolio',
      inLanguage: ['en', 'ru'],
      publisher: {
        '@id': `${BASE_URL}/#person`
      }
    },
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'ibuildrun',
      url: BASE_URL,
      jobTitle: ['Full-Stack Developer', 'Software Architect'],
      description: 'Full-Stack Software Engineer specializing in Next.js, React, TypeScript, .NET, and AI-augmented development',
      knowsAbout: [
        'Next.js', 'React', 'TypeScript', 'JavaScript',
        'ASP.NET Core', '.NET', 'C#', 'Python',
        'PostgreSQL', 'Docker', 'AI Development',
        'Web Development', 'Software Architecture'
      ],
      sameAs: [
        'https://github.com/ibuildrun',
        'https://t.me/ibuildrun'
      ]
    },
    {
      '@type': 'ProfilePage',
      '@id': `${BASE_URL}/#profilepage`,
      url: BASE_URL,
      name: 'IBUILDRUN Portfolio',
      isPartOf: {
        '@id': `${BASE_URL}/#website`
      },
      about: {
        '@id': `${BASE_URL}/#person`
      },
      mainEntity: {
        '@id': `${BASE_URL}/#person`
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white" style={{ scrollBehavior: 'smooth' }} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="ru" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-mono" suppressHydrationWarning>
        <SecurityFeatures />
        {children}
        <div className="scanline" />
        <div className="noise" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
