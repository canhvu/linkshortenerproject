---
description: Read this before creating or modifying any UI components in the project.
---

# UI And Styling

- Build all UI in this app with shadcn/ui components.
- Do not create custom UI components when a shadcn/ui component can be used.
- Do not introduce a parallel in-house component library, bespoke primitives, or one-off replacement controls.
- When a screen needs new UI, add or compose the relevant shadcn/ui components following the existing `base-nova` style and project patterns.
- Keep Tailwind usage aligned with the chosen shadcn/ui component structure instead of hand-rolling custom visual systems.