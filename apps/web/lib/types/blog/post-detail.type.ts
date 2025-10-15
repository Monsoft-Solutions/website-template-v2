import type { BlogPostCard } from './post-card.type'

export type BlogPostDetail = BlogPostCard & {
    content: string
    categories: Array<{
        id: string
        name: string
        slug: string
    }>
    tags: Array<{
        id: string
        name: string
        slug: string
    }>
}
