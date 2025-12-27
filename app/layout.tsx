import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IBUILDRUN | AI-Augmented Developer Portfolio',
  description: 'Full-Stack Software Architecture. AI-augmented development workflow.',
  keywords: ['developer', 'portfolio', 'full-stack', 'react', 'nextjs', 'typescript', 'ai'],
  authors: [{ name: 'ibuildrun' }],
  openGraph: {
    title: 'IBUILDRUN',
    description: 'AI-Augmented Developer Portfolio',
    url: 'https://ibuildrun.ru',
    siteName: 'IBUILDRUN',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IBUILDRUN',
    description: 'AI-Augmented Developer Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-mono" suppressHydrationWarning>
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
