---
name: CSS Google Fonts import order
description: @import url(...) must be the first line of index.css in React/Vite apps using Tailwind/PostCSS
---

The rule: any `@import url(...)` (e.g. Google Fonts) MUST be the very first line of `index.css`, before `@import "tailwindcss"` and all other statements.

**Why:** PostCSS fails with a silent/misleading error if `@import url(...)` appears after other CSS rules. The error message mentions line numbers deep in compiled output and doesn't point to the root cause.

**How to apply:** When a design subagent adds Google Fonts or any external stylesheet, always check that the `@import url(...)` line precedes all other imports. If it's misplaced, move it to line 1.
