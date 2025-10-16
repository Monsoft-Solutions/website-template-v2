import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import { env } from './env'

// Load env only in entrypoint for local dev compatibility
dotenv.config({ path: '../../.env' })
dotenv.config()

const runMigrations = async () => {
    const databaseUrl = env.DATABASE_URL

    console.log('⏳ Running migrations...')

    const client = postgres(databaseUrl, { max: 1 })
    const db = drizzle(client)

    await migrate(db, { migrationsFolder: './migrations' })

    await client.end()

    console.log('✅ Migrations completed')
}

runMigrations().catch((err) => {
    console.error('❌ Migration failed')
    console.error(err)
    process.exit(1)
})
