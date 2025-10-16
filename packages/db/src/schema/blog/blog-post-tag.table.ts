import { foreignKey, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

import { blogPost } from './blog-post.table'
import { blogTag } from './blog-tag.table'

/**
 * Junction table for many-to-many relationship between blog posts and tags
 * Associates tags with blog posts for better content organization
 */
export const blogPostTag = pgTable(
    'blog_post_tag',
    {
        blogPostId: uuid('blog_post_id').notNull(),
        tagId: uuid('tag_id').notNull(),
    },
    (table) => [
        {
            pk: primaryKey({ columns: [table.blogPostId, table.tagId] }),
            blogPostFk: foreignKey({
                columns: [table.blogPostId],
                foreignColumns: [blogPost.id],
                name: 'blog_post_tags_blog_post_id_fk',
            }).onDelete('cascade'),
            tagFk: foreignKey({
                columns: [table.tagId],
                foreignColumns: [blogTag.id],
                name: 'blog_posts_tags_tag_id_fk',
            }).onDelete('cascade'),
        },
    ]
)
