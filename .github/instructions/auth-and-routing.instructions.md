---
description: Read this before implementing or modifying any authentication in the project. 
---

# Auth And Routing

- Use Clerk for all authentication and user session flows in this app. Do not add or suggest any other auth provider, custom session system, or parallel auth path.
- Treat `/dashboard` as a protected route. Unauthenticated users must not be able to access it.
- If a signed-in user requests `/`, redirect them to `/dashboard` instead of rendering the public homepage.
- Sign-in and sign-up must always open through Clerk modal flows. Prefer Clerk modal triggers over full-page auth UX unless an existing Clerk integration explicitly requires otherwise.
- When changing auth-related UI or routing, check that signed-out users can reach the public homepage, signed-in users are redirected away from it, and dashboard access remains gated by Clerk auth state.