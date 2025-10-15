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
