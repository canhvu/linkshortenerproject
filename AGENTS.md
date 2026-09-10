# AGENTS.md

Instructions for AI coding agents (Copilot, Claude, etc.) working in this repository.

Relevant docs:

- [docs/auth-and-routing.md](docs/auth-and-routing.md) for Clerk-only auth rules, protected route expectations, homepage redirect behavior, and modal auth flows.
- [.github/instructions/server-actions.instructions.md](.github/instructions/server-actions.instructions.md) for mutation flow rules, server action placement, Zod validation, auth checks, and data-layer boundaries.
- [docs/ui-and-styling.md](docs/ui-and-styling.md) for shadcn/ui-only component rules and UI implementation constraints.

## Project Overview

A URL/link shortener web app built with Next.js (App Router). Users sign in with Clerk,
create shortened links, and the app persists data via Drizzle ORM against a Neon
(serverless Postgres) database. UI is built with Tailwind CSS v4 and shadcn/ui
(`base-nova` style) on top of `@base-ui/react` primitives.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, Turbopack/RSC)
- **Language**: TypeScript (strict mode)
- **Auth**: Clerk (`@clerk/nextjs`, `@clerk/ui`)
- **Database**: Neon serverless Postgres via `@neondatabase/serverless`
- **ORM**: Drizzle ORM + Drizzle Kit for migrations
- **Styling**: Tailwind CSS v4, `tailwind-merge`, `class-variance-authority`
- **Components**: shadcn/ui (`components.json`, style: `base-nova`) built on `@base-ui/react`
- **Icons**: lucide-react
- **Linting**: ESLint 9 flat config (`eslint-config-next`)

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # lint the project
npx drizzle-kit generate   # generate SQL migrations from db/schema.ts
npx drizzle-kit migrate    # apply migrations to the database
npx drizzle-kit push       # push schema changes directly (dev only)
npx drizzle-kit studio     # open Drizzle Studio to inspect data
```

Always run `npm run lint` before considering a change complete. There is no test suite
configured yet — do not assume Jest/Vitest/Playwright exist unless you add and document
them yourself.

## Critical Rules (apply everywhere)

1. **Never commit secrets.** `.env` is git-ignored; never print, log, or hardcode values
   from it (`DATABASE_URL`, Clerk keys, etc.).
2. **Server vs. client boundaries matter.** Components are Server Components by default.
   Only add `"use client"` when the component needs interactivity, hooks, or browser APIs.
3. **Never query the database from client components.** Data access goes through the
   `db` client in [db/index.ts](db/index.ts), called from Server Components, Server
   Actions, or Route Handlers only.
4. **Schema changes go through Drizzle.** Edit [db/schema.ts](db/schema.ts), then generate
   a migration with `drizzle-kit generate` — never hand-write SQL migration files.
5. **Use the `@/` path alias** (configured in [tsconfig.json](tsconfig.json)) instead of
   relative `../../` imports across directories.
6. **Use the `cn()` helper** from [lib/utils.ts](lib/utils.ts) to merge Tailwind class
   names instead of string concatenation or template literals.
7. **Keep TypeScript strict.** Do not introduce `any`, disable strict-mode checks, or add
   `// @ts-ignore` to silence real type errors — fix the underlying type issue instead.
8. **UI stays on shadcn/ui.** Follow [docs/ui-and-styling.md](docs/ui-and-styling.md)
   and do not create custom UI components or parallel component patterns.
9. **Auth stays on Clerk.** Follow [docs/auth-and-routing.md](docs/auth-and-routing.md)
   for all auth, protected-route, redirect, and auth-modal behavior.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
