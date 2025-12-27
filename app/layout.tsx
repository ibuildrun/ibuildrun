import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: 'IBUILDRUN | AI-Augmented Developer Portfolio',
  description: 'Full-Stack Software Architecture. AI-augmented development workflow.',
  keywords: ['developer', 'portfolio', 'full-stack', 'react', 'nextjs', 'typescript', 'ai'],
  authors: [{ name: 'ibuildrun' }],
  openGraph: {
    title: 'IBUILDRUN',
    description: 'AI-Augmented Developer Portfolio',
    url: 'https://ibuildrun.github.io/ibuildrun',
    siteName: 'IBUILDRUN',
    type: 'website',
    locale: 'ru_RU',
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
    <html lang="en" className={`${spaceMono.variable} bg-black text-white`} style={{ scrollBehavior: 'smooth' }} suppressHydrationWarning>
      <head>
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
