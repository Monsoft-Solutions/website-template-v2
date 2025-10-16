# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from '@workspace/ui/components/button'
```

## Environment variables

- Define shared and app-specific variables using Vercel Environment Variable Groups.
- For local development, pull variables into each app directory:

```bash
cd apps/web && pnpm dlx vercel env pull --yes .env.local
```

Required variables (see `.env.example`):

- `POSTGRES_URL` (server)
- `BLOG_API_KEY` (server)
- `BLOB_READ_WRITE_TOKEN` (server, optional)
- `NEXT_PUBLIC_*` (client)

Access variables via env modules, not `process.env`:

```ts
// apps/web
import { env } from './env'
console.log(env.NEXT_PUBLIC_SITE_URL)

// packages/db
import { env } from './src/env'
console.log(env.POSTGRES_URL)
```
