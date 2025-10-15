import {
    boolean,
    foreignKey,
    index,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'

import { author } from './author.table'
import { images } from './image.table'

export const blogPostStatus = pgEnum('blog_post_status', [
    'draft',
    'readyToPublish',
    'published',
])

export const blogPost = pgTable(
    'blog_post',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        slug: varchar('slug', { length: 255 }).notNull().unique(),
        title: varchar('title', { length: 255 }).notNull(),
        metaDescription: text('meta_description').notNull(),
        metaTitle: varchar('meta_title', { length: 255 }),
        metaKeywords: text('meta_keywords'),
        excerpt: text('excerpt'),
        publishedAt: timestamp('published_at'),
        scheduledAt: timestamp('scheduled_at'),
        readingTime: integer('reading_time'), // in minutes
        content: text('content').notNull(),
        status: blogPostStatus('status').default('draft'),
        views: integer('views').default(0).notNull(),
        likes: integer('likes').default(0).notNull(),
        shares: integer('shares').default(0).notNull(),
        isFeatured: boolean('is_featured').default(false).notNull(),
        allowComments: boolean('allow_comments').default(true).notNull(),
        authorId: uuid('author_id'),
        featuredImageId: uuid('featured_image_id'),
        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at').defaultNow(),
    },
    (table) => [
        {
            // Foreign Keys
            authorFk: foreignKey({
                columns: [table.authorId],
                foreignColumns: [author.id],
                name: 'blog_post_author_id_fk',
            }).onDelete('set null'),
            featuredImageFk: foreignKey({
                columns: [table.featuredImageId],
                foreignColumns: [images.id],
                name: 'blog_post_featured_image_id_fk',
            }).onDelete('set null'),

            // Performance Indexes
            statusIdx: index('blog_post_status_idx').on(table.status),
            authorIdx: index('blog_post_author_id_idx').on(table.authorId),
            createdAtIdx: index('blog_post_created_at_idx').on(table.createdAt),
            publishedAtIdx: index('blog_post_published_at_idx').on(
                table.publishedAt
            ),
            scheduledAtIdx: index('blog_post_scheduled_at_idx').on(
                table.scheduledAt
            ),
            statusPublishedAtIdx: index('blog_post_status_published_at_idx').on(
                table.status,
                table.publishedAt
            ),
            isFeaturedIdx: index('blog_post_is_featured_idx').on(
                table.isFeatured
            ),
            viewsIdx: index('blog_post_views_idx').on(table.views),
            likesIdx: index('blog_post_likes_idx').on(table.likes),
        },
    ]
)

export type BlogPost = typeof blogPost.$inferSelect
export type InsertBlogPost = typeof blogPost.$inferInsert
