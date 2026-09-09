---
description: Read this before implementing or modifying server actions, mutations, or database write flows in the app.
---

# Server Actions

- All data mutations must go through Next.js server actions.
- Server actions must be called from client components.
- Server action files must be named `actions.ts` and colocated with the component that calls them.
- Define explicit TypeScript types for all server action inputs. Do not use the `FormData` TypeScript type.
- Validate every server action input with Zod before any business logic or database work runs.
- Check for an authenticated user at the start of every server action before continuing with database operations.
- Server actions should not throw errors. Return an object with either an `error` property or a `success` property instead.
- Keep Drizzle queries out of server actions. Server actions must call helper functions in the `/data` directory for database operations instead of querying Drizzle directly.
- Put mutation-specific database helpers in the `/data` directory so validation, auth checks, and persistence stay clearly separated.