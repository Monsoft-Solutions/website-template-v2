import { z } from 'zod'

import { basePaginationSchema } from '../pagination.schema'

/**
 * Zod schema for blog posts API query parameters
 * Extends base pagination with blog-specific filters
 */
export const blogPostsQuerySchema = basePaginationSchema.extend({
    /**
     * Filter posts by category slug
     * @optional
     */
    categorySlug: z.string().optional().nullable(),

    /**
     * Filter posts by tag slug
     * @optional
     */
    tagSlug: z.string().optional().nullable(),
})

/**
 * Type inference for blog posts query schema
 */
export type BlogPostsQueryInput = z.input<typeof blogPostsQuerySchema>
export type BlogPostsQueryOutput = z.output<typeof blogPostsQuerySchema>
