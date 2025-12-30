import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    '!./ibuildrun-_-ai-augmented-developer-portfolio/**',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        muted: 'var(--muted)',
      },
    },
  },
  plugins: [],
};

export default config;
