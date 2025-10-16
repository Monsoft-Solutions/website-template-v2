import {
    boolean,
    index,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'

/**
 * Tags table for categorizing blog posts with keywords
 * Multiple tags can be associated with multiple blog posts (many-to-many)
 */
export const blogTag = pgTable(
    'blog_tag',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: varchar('name', { length: 100 }).notNull(),
        slug: varchar('slug', { length: 100 }).notNull().unique(),
        description: text('description'),
        color: varchar('color', { length: 7 }), // hex color code
        usageCount: integer('usage_count').default(0).notNull(),
        isActive: boolean('is_active').default(true).notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
    },
    (table) => [
        {
            // Performance Indexes
            nameIdx: index('blog_tag_name_idx').on(table.name),
            isActiveIdx: index('blog_tag_is_active_idx').on(table.isActive),
            usageCountIdx: index('blog_tag_usage_count_idx').on(
                table.usageCount
            ),
            createdAtIdx: index('blog_tag_created_at_idx').on(table.createdAt),
        },
    ]
)
