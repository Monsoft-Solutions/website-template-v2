import { createEnv } from '@t3-oss/env-core'
import { config } from 'dotenv'
import z from 'zod'

config({
    path: '.env.local',
})
config()

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
    },
    runtimeEnv: process.env,
})
