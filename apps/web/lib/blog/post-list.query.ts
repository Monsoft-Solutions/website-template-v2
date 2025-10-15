import { db } from '@workspace/db'
import { author, blogPost, images } from '@workspace/db'
import { and, desc, eq, isNotNull, lt, or } from 'drizzle-orm'

import type { BlogPostCard } from '@/types/blog/post-card.type'

const PAGE_SIZE_DEFAULT = 12

/**
 * Fetch a page of published blog posts ordered by publishedAt DESC then id DESC.
 * Returns post card fields only for efficient listing.
 */
export async function getPublishedPostCardsPage(options?: {
    limit?: number
    cursor?: { publishedAt: Date; id: string } | null
}): Promise<{
    items: BlogPostCard[]
    nextCursor?: { publishedAt: Date; id: string }
}> {
    const limit = Math.min(
        Math.max(options?.limit ?? PAGE_SIZE_DEFAULT, 1),
        100
    )

    const cursor = options?.cursor
    const whereExpr = cursor
        ? and(
              eq(blogPost.status, 'published'),
              isNotNull(blogPost.publishedAt),
              or(
                  lt(blogPost.publishedAt, cursor.publishedAt),
                  and(
                      eq(blogPost.publishedAt, cursor.publishedAt),
                      lt(blogPost.id, cursor.id)
                  )
              )
          )
        : and(eq(blogPost.status, 'published'), isNotNull(blogPost.publishedAt))

    const rows = await db
        .select({
            id: blogPost.id,
            slug: blogPost.slug,
            title: blogPost.title,
            excerpt: blogPost.excerpt,
            publishedAt: blogPost.publishedAt,
            readingTime: blogPost.readingTime,
            authorName: author.name,
            imageUrl: images.url,
            imageAlt: images.alt,
            imageBlur: images.blurDataUrl,
        })
        .from(blogPost)
        .leftJoin(author, eq(author.id, blogPost.authorId))
        .leftJoin(images, eq(images.id, blogPost.featuredImageId))
        .where(whereExpr)
        .orderBy(desc(blogPost.publishedAt), desc(blogPost.id))
        .limit(limit + 1)

    const items: BlogPostCard[] = rows.slice(0, limit).map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt,
        publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
        readingTime: r.readingTime,
        featuredImage: r.imageUrl
            ? {
                  url: r.imageUrl,
                  alt: r.imageAlt ?? '',
                  blurDataUrl: r.imageBlur,
              }
            : null,
        author: r.authorName ? { name: r.authorName } : null,
    }))

    let nextCursor: { publishedAt: Date; id: string } | undefined
    if (rows.length > limit) {
        const last = rows[limit - 1]!
        nextCursor = {
            publishedAt: last.publishedAt!,
            id: last.id,
        }
    }

    return { items, nextCursor }
}
