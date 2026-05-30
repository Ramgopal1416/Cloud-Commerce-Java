---
name: api-client-react deep imports are forbidden
description: Only import from @workspace/api-client-react barrel, never from deep src/ paths
---

The rule: NEVER import from `@workspace/api-client-react/src/...` deep paths. Only the barrel export `.` is listed in `package.json` exports — deep paths cause a Vite "Missing specifier" error at runtime.

**Why:** The package.json `exports` field only maps `.` → `./src/index.ts`. Deep paths like `./src/custom-fetch` or `./src/generated/api.schemas` are not listed and Vite/Node module resolution rejects them.

**How to apply:** Everything exported from custom-fetch.ts (including `setAuthTokenGetter`, `setBaseUrl`, `ApiError`) is re-exported from the main barrel `src/index.ts`. Types like `UserProfile`, `Product`, etc. are also re-exported. Always import from `@workspace/api-client-react` only.
