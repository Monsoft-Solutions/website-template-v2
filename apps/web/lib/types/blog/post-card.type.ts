/**
 * Represents a blog post card for list/grid display
 * @property publishedAt - ISO 8601 date string when the post was published
 * @property readingTime - Estimated reading time in minutes
 * @property featuredImage - Featured image with Next.js optimization support
 */
export type BlogPostCard = {
    id: string
    slug: string
    title: string
    excerpt: string | null
    publishedAt: string | null
    readingTime: number | null
    featuredImage: {
        url: string
        alt: string
        blurDataUrl?: string | null
    } | null
    author: {
        name: string
    } | null
}
