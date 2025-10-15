import { db } from '@workspace/db'
import {
    author,
    blogCategory,
    blogPost,
    blogPostCategory,
    blogPostTag,
    blogTag,
    images,
} from '@workspace/db'
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
    categorySlug?: string | null
    tagSlug?: string | null
}): Promise<{
    items: BlogPostCard[]
    nextCursor?: { publishedAt: Date; id: string }
}> {
    const limit = Math.min(
        Math.max(options?.limit ?? PAGE_SIZE_DEFAULT, 1),
        100
    )

    const cursor = options?.cursor
    const categorySlug = options?.categorySlug ?? null
    const tagSlug = options?.tagSlug ?? null
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

    // Build base query with optional taxonomy filters
    let query = db
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

    if (categorySlug) {
        query = query
            .innerJoin(
                blogPostCategory,
                eq(blogPostCategory.blogPostId, blogPost.id)
            )
            .innerJoin(
                blogCategory,
                eq(blogCategory.id, blogPostCategory.categoryId)
            )
    }

    if (tagSlug) {
        query = query
            .innerJoin(blogPostTag, eq(blogPostTag.blogPostId, blogPost.id))
            .innerJoin(blogTag, eq(blogTag.id, blogPostTag.tagId))
    }

    const rows = await (query as any)
        .where(
            and(
                whereExpr,
                categorySlug ? eq(blogCategory.slug, categorySlug) : undefined,
                tagSlug ? eq(blogTag.slug, tagSlug) : undefined
            )
        )
        .orderBy(desc(blogPost.publishedAt), desc(blogPost.id))
        .limit(limit + 1)

    type Row = {
        id: string
        slug: string
        title: string
        excerpt: string | null
        publishedAt: Date | null
        readingTime: number | null
        authorName: string | null
        imageUrl: string | null
        imageAlt: string | null
        imageBlur: string | null
    }

    const items: BlogPostCard[] = (rows as Row[])
        .slice(0, limit)
        .map((r: Row) => ({
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
            publishedAt: (last as any).publishedAt!,
            id: (last as any).id,
        }
    }

    return { items, nextCursor }
}
