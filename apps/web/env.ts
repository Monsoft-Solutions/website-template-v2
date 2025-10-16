import { createEnv } from '@t3-oss/env-nextjs'
import { config } from 'dotenv'
import { z } from 'zod'

config({
    path: '.env.local',
})
config()

/**
 * Environment Variables Configuration
 *
 * Note: Most site/business data is centralized in `lib/data/site-config.ts`.
 * Only environment-specific variables are defined here.
 *
 * NEXT_PUBLIC_SITE_URL is used by site-config.ts for environment-aware URL handling.
 */
export const env = createEnv({
    server: {
        // Database & Storage (required for runtime)
        POSTGRES_URL: z.string().url(),
        BLOG_API_KEY: z.string().min(1),
        BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
        VERCEL_URL: z.string().optional(),
    },
    client: {
        // Site URL - used by site-config.ts (with fallback to VERCEL_URL)
        NEXT_PUBLIC_SITE_URL: z.string().url().optional(),

        // Other SEO variables are OPTIONAL - defaults come from site-config.ts
        NEXT_PUBLIC_SITE_NAME: z.string().min(1).optional(),
        NEXT_PUBLIC_SITE_DESCRIPTION: z.string().min(1).optional(),
        NEXT_PUBLIC_TWITTER_HANDLE: z.string().optional(),
        NEXT_PUBLIC_FACEBOOK_APP_ID: z.string().optional(),
        NEXT_PUBLIC_LOCALE: z.string().optional(),
        NEXT_PUBLIC_ENABLE_INDEXING: z.enum(['true', 'false']).optional(),
    },
    runtimeEnv: {
        POSTGRES_URL: process.env.POSTGRES_URL,
        BLOG_API_KEY: process.env.BLOG_API_KEY,
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
        VERCEL_URL: process.env.VERCEL_URL,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
        NEXT_PUBLIC_TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
        NEXT_PUBLIC_FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        NEXT_PUBLIC_LOCALE: process.env.NEXT_PUBLIC_LOCALE,
        NEXT_PUBLIC_ENABLE_INDEXING: process.env.NEXT_PUBLIC_ENABLE_INDEXING,
    },
})
