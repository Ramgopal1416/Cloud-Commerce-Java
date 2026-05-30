# ShopAI

An AI-powered e-commerce platform with a personal AI shopping assistant, product catalog, cart & checkout, order management, and admin dashboard.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — JWT signing secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 at `/api`, served at port 8080
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec → `lib/api-spec/openapi.yaml`)
- Build: esbuild (ESM bundle)
- Frontend: React + Vite + Tailwind + wouter + TanStack Query
- Auth: JWT (jsonwebtoken + bcryptjs), stored in localStorage as `auth_token`
- AI: OpenAI via Replit AI integration (`@workspace/integrations-openai-ai-server`)

## Where things live

- `lib/api-spec/openapi.yaml` — single source of truth for all API contracts
- `lib/db/src/schema/` — all Drizzle ORM table definitions
- `lib/api-client-react/src/generated/` — auto-generated React Query hooks + Zod schemas
- `artifacts/api-server/src/routes/` — all Express route handlers
- `artifacts/api-server/src/lib/auth.ts` — JWT auth middleware
- `artifacts/ecommerce-store/src/` — React frontend
- `artifacts/ecommerce-store/src/contexts/AuthContext.tsx` — auth state management
- `artifacts/ecommerce-store/src/index.css` — theme/CSS variables (Playfair Display + Inter fonts)

## Architecture decisions

- JWT auth: token stored in localStorage, injected via `setAuthTokenGetter` in `lib/api-client-react/src/custom-fetch.ts` so all generated hooks automatically include the bearer token
- Payment methods are enum-constrained (`STRIPE`, `RAZORPAY`, `COD`); free-text payment strings from checkout are mapped to `COD` as fallback
- Chatbot endpoint does not require auth — sessionId is used for conversation history grouping
- Admin endpoints use `requireAdmin` middleware (role must be `ADMIN` in DB)
- OpenAI integration uses `gpt-5-mini` for chatbot and review sentiment analysis

## Product

- **Home**: Hero, featured products, category showcase
- **Catalog** (`/products`): Browse/search/filter by category, price, brand
- **Product Detail** (`/products/:id`): Images, description, reviews, add-to-cart
- **Cart** (`/cart`): Manage items, quantities, checkout
- **Checkout** (`/checkout`): Shipping address + payment, place order
- **Orders** (`/orders`, `/orders/:id`): History, detail, cancel/return
- **Account** (`/account`): Profile management
- **Notifications** (`/notifications`): Order and promo notifications
- **AI Chat** (`/chat`): Full chatbot powered by OpenAI
- **Admin** (`/admin`): Stats dashboard, order management, user list, low-stock alerts

## Seed data

- Admin: `admin@shopai.com` / `admin123` (role: ADMIN)
- Customer: `jane@example.com` / `customer123` (role: CUSTOMER)
- 10 products across 5 categories (Electronics, Clothing, Home & Garden, Sports & Fitness, Books)
- Sample reviews on products 1, 2, 4, 6, 10

## Gotchas

- Google Fonts `@import url(...)` MUST be the first line of `index.css` — before `@import "tailwindcss"`, or PostCSS fails
- Do NOT import from `@workspace/api-client-react/src/*` deep paths — only `@workspace/api-client-react` (the barrel); deep paths aren't in the package exports
- `setAuthTokenGetter` is exported from the main barrel `@workspace/api-client-react`
- After any OpenAPI spec change, run codegen before touching routes or frontend

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
