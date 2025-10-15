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
