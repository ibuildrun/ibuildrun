import type { NextConfig } from 'next';

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
};

export default nextConfig;
