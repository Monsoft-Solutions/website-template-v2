import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema/index.js'

if (!process.env.DATABASE_URL) {
    throw new Error(
        'DATABASE_URL environment variable is required. Please check your .env file.'
    )
}
const client = postgres(process.env.DATABASE_URL, { prepare: false })
export const db = drizzle(client, { schema })
