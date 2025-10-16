import type { Config } from 'drizzle-kit'

import { env } from './src/env'

export default {
    schema: './src/schema/index.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.POSTGRES_URL,
    },
} satisfies Config
