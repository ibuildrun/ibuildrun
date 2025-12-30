import type { NextConfig } from 'next';
import path from 'path';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // basePath only for GitHub Pages deployment
  basePath: isGitHubPages ? '/ibuildrun' : '',
  assetPrefix: isGitHubPages ? '/ibuildrun/' : '',
  // Exclude nested project folder from build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/ibuildrun-_-ai-augmented-developer-portfolio/**'],
    };
    return config;
  },
};

export default nextConfig;
