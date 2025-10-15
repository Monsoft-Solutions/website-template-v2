import { createEnv } from '@t3-oss/env-nextjs'
import { config } from 'dotenv'
import { z } from 'zod'

config({
    path: '.env.local',
})
config()

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        BLOG_API_KEY: z.string().min(1),
        BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
        VERCEL_URL: z.string().optional(),
    },
    client: {
        NEXT_PUBLIC_SITE_URL: z.string().url(),
        NEXT_PUBLIC_SITE_NAME: z.string().min(1),
        NEXT_PUBLIC_SITE_DESCRIPTION: z.string().min(1),
        NEXT_PUBLIC_TWITTER_HANDLE: z.string().optional(),
        NEXT_PUBLIC_FACEBOOK_APP_ID: z.string().optional(),
        NEXT_PUBLIC_LOCALE: z.string().default('en-US'),
        NEXT_PUBLIC_ENABLE_INDEXING: z.enum(['true', 'false']).optional(),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
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
