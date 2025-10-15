import type { BlogPostCard } from './post-card.type'

/**
 * Response type for paginated blog posts API
 */
export type BlogPostsPaginatedResponse = {
    items: BlogPostCard[]
    nextCursor?: string
}
