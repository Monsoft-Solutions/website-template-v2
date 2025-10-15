import { type LibSQLDatabase } from 'drizzle-orm/libsql'

import * as schema from '../schema'
import { author } from '../schema'

type RunProps = {
    db: LibSQLDatabase<typeof schema>
}

export async function run({ db }: RunProps) {
    console.log('Seeding authors...')

    const data: (typeof author.$inferInsert)[] = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            bio: 'A passionate writer and tech enthusiast.',
            avatarUrl: 'https://example.com/avatar/john.jpg',
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            bio: 'Lover of coffee, code, and cats.',
            avatarUrl: 'https://example.com/avatar/jane.jpg',
        },
    ]

    await db.insert(author).values(data).onConflictDoNothing()

    console.log('Authors seeded successfully!')
}
