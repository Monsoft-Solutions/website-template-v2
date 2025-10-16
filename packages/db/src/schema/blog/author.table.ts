import {
    boolean,
    index,
    json,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'

/**
 * Authors table for blog post writers
 * Each author can write multiple blog posts
 */
export const author = pgTable(
    'author',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: varchar('name', { length: 255 }).notNull(),
        email: varchar('email', { length: 255 }).notNull().unique(),
        bio: text('bio'),
        avatarUrl: varchar('avatar_url', { length: 500 }),
        website: varchar('website', { length: 500 }),
        socialLinks: json('social_links').$type<{
            twitter?: string
            linkedin?: string
            github?: string
            instagram?: string
        }>(),
        isActive: boolean('is_active').default(true).notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at')
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    (table) => [
        {
            // Performance Indexes
            nameIdx: index('author_name_idx').on(table.name),
            isActiveIdx: index('author_is_active_idx').on(table.isActive),
            createdAtIdx: index('author_created_at_idx').on(table.createdAt),
        },
    ]
)
