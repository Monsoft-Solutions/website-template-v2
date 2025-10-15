import { db } from '@workspace/db'
import {
    blogCategory,
    blogPost,
    blogPostCategory,
    blogPostTag,
    blogTag,
} from '@workspace/db'
import { and, count, eq, isNotNull } from 'drizzle-orm'

import type { BlogCategoryItem, BlogTagItem } from '@/types/blog/taxonomy.type'

export async function listActiveCategoriesWithCounts(): Promise<
    BlogCategoryItem[]
> {
    const rows = await db
        .select({
            id: blogCategory.id,
            name: blogCategory.name,
            slug: blogCategory.slug,
            count: count(blogPostCategory.blogPostId),
        })
        .from(blogCategory)
        .leftJoin(
            blogPostCategory,
            eq(blogPostCategory.categoryId, blogCategory.id)
        )
        .leftJoin(
            blogPost,
            and(
                eq(blogPost.id, blogPostCategory.blogPostId),
                eq(blogPost.status, 'published'),
                isNotNull(blogPost.publishedAt)
            )
        )
        .where(eq(blogCategory.isActive, true))
        .groupBy(blogCategory.id)

    return rows.map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        count: Number(r.count),
    }))
}

export async function listActiveTagsWithCounts(): Promise<BlogTagItem[]> {
    const rows = await db
        .select({
            id: blogTag.id,
            name: blogTag.name,
            slug: blogTag.slug,
            count: count(blogPostTag.blogPostId),
        })
        .from(blogTag)
        .leftJoin(blogPostTag, eq(blogPostTag.tagId, blogTag.id))
        .leftJoin(
            blogPost,
            and(
                eq(blogPost.id, blogPostTag.blogPostId),
                eq(blogPost.status, 'published'),
                isNotNull(blogPost.publishedAt)
            )
        )
        .where(eq(blogTag.isActive, true))
        .groupBy(blogTag.id)

    return rows.map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        count: Number(r.count),
    }))
}

export async function getActiveCategoryBySlug(
    slug: string
): Promise<BlogCategoryItem | null> {
    const row = await db
        .select({
            id: blogCategory.id,
            name: blogCategory.name,
            slug: blogCategory.slug,
            isActive: blogCategory.isActive,
        })
        .from(blogCategory)
        .where(eq(blogCategory.slug, slug))
        .limit(1)
        .then((rows) => rows[0])

    if (!row || row.isActive !== true) return null
    return { id: row.id, name: row.name, slug: row.slug }
}

export async function getActiveTagBySlug(
    slug: string
): Promise<BlogTagItem | null> {
    const row = await db
        .select({
            id: blogTag.id,
            name: blogTag.name,
            slug: blogTag.slug,
            isActive: blogTag.isActive,
        })
        .from(blogTag)
        .where(eq(blogTag.slug, slug))
        .limit(1)
        .then((rows) => rows[0])

    if (!row || row.isActive !== true) return null
    return { id: row.id, name: row.name, slug: row.slug }
}
