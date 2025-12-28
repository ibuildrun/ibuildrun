# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-12-28

### Fixed
- fix: changelog workflow to prevent duplicate Unreleased sections

## [3.2.0] - 2025-12-28

### Added
- Comprehensive SEO with multilingual support (EN/RU)
- JSON-LD structured data (Person, WebSite, ProfilePage)
- Open Graph and Twitter Card meta tags
- Dynamic SEOHead component for language-aware metadata
- OG image for social media previews
- Hreflang tags for international SEO
- Improved robots.txt with Googlebot and Yandexbot rules
- Extended sitemap.xml with all page sections
- Real GitHub repositories in portfolio (HQSTUDIO, INSTRUCT_PIX2PIX_STUDIO, TIC_TAC_TOE_PASTEL, ZAPRET_DISCORD_YOUTUBE)
- Smooth anchor scroll with easing animation
- GitHub Actions workflow for automatic CHANGELOG updates

### Changed
- Updated project years to 2025
- Replaced portfolio project with zapret-discord-youtube fork
- Print-PDF layout now uses portrait A4 orientation
- Dynamic year in ResumePrintView header
- Removed email contact, added Telegram @ibuildrun

### Fixed
- Matrix effect now properly renders with Japanese katakana characters
- Vim editor with full functionality (hjkl, w, b, e, dd, yy, p, Ctrl combinations)
- CRT and Matrix terminal commands now work correctly
- Text overflow in Vim editor fixed with break-all
- Achievement toast now matches current theme

## [3.1.0] - 2025-12-27

### Added
- localStorage persistence for theme, language, Matrix mode, CRT effect, command history, and achievements
- `history` command in terminal to view command history
- Auto-close terminal and smooth scroll to top when toggling Matrix/CRT effects
- Glow effect for Matrix rain animation
- Telegram contact (@ibuildrun) to BusinessCard and contact section

### Changed
- Matrix effect animation speed reduced to match movie aesthetic
- Improved mobile responsiveness for navigation, hero section, and contact area
- Sections now properly display above Matrix overlay with z-index fixes

### Removed
- GithubHeartbeat (System Heartbeat) component
- Email and LinkedIn from BusinessCard

## [3.0.0] - 2025-12-27

### Added
- Next.js 15 with App Router architecture
- GitHub Actions CI/CD pipeline for automated deployment
- Static export for GitHub Pages
- PWA support with service worker
- Docker setup with Tuna tunnel for ibuildrun.ru
- Generated robots.txt and sitemap.xml

### Changed
- Complete migration from Vite + React SPA to Next.js 15
- All components marked with 'use client' directive
- Utilities moved to lib/ directory
- Hooks moved to hooks/ directory
- Environment variables prefixed with NEXT_PUBLIC_

### Removed
- Vite configuration (vite.config.ts, index.html)
- Gemini AI integration

[Unreleased]: https://github.com/ibuildrun/ibuildrun/compare/v3.2.0...HEAD
[3.2.0]: https://github.com/ibuildrun/ibuildrun/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/ibuildrun/ibuildrun/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/ibuildrun/ibuildrun/releases/tag/v3.0.0
