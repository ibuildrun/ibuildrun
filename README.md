# ibuildrun

Full-stack developer. I build web apps, backends, desktop software, and Telegram bots.

Stack doesn't matter much — it's just a tool. What matters is shipping working software.
I pick whatever fits the problem: Next.js or Angular for frontend, .NET or Node for backend, 
WPF for desktop.

My workflow is AI-augmented. Kiro, Cursor, Claude — I use them daily. 
Not as a crutch, but as leverage. They handle the repetitive stuff, 
I focus on architecture and solving actual problems.

## Portfolio Site

This repository contains my personal portfolio website built with Next.js 15 and App Router.

### Run Locally

**Prerequisites:** Node.js 20.x

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `NEXT_PUBLIC_GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```

### Docker Development

Run the development server in Docker with hot reload:

```bash
# Start development server
docker-compose up

# Start with Tuna tunnel for public access
docker-compose --profile tunnel up

# Production build
docker-compose --profile production up app-prod
```

### Tuna Tunnel Setup

Expose your local dev server on `ibuildrun.ru` domain:

1. Get your Tuna token from [tuna.am](https://tuna.am)
2. Add to `.env.local`:
   ```
   TUNA_TOKEN=tt_your_token_here
   TUNA_DOMAIN=ibuildrun.ru
   ```
3. Start tunnel:
   ```bash
   # With Docker
   docker-compose --profile tunnel up
   
   # Without Docker (Linux/macOS)
   ./scripts/start-tunnel.sh
   
   # Without Docker (Windows PowerShell)
   .\scripts\start-tunnel.ps1
   ```

### Stack

**Web:** Next.js, React, Angular, TypeScript, Tailwind CSS  
**Backend:** ASP.NET Core, Node.js, Python, PostgreSQL  
**Desktop:** WPF, .NET 8  
**Bots:** Telegram Bot API, aiogram, Telegraf  
**DevOps:** Docker, GitHub Actions, CI/CD

### Approach

Write less boilerplate, ship more features. 
AI tools let me move faster without cutting corners on quality.

---

Based in Russia. Open to remote work.
