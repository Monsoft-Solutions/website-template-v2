import { faker } from '@faker-js/faker'
import { type LibSQLDatabase } from 'drizzle-orm/libsql'

import {
    author,
    blogCategory,
    blogPost,
    blogPostCategory,
    blogPostTag,
    blogTag,
} from '../schema'
import * as schema from '../schema'

type RunProps = {
    db: LibSQLDatabase<typeof schema>
}

export async function run({ db }: RunProps) {
    console.log('Seeding blog posts, categories, and tags...')

    const authors = await db.select().from(author)
    if (authors.length === 0) {
        console.error('❌ No authors found. Please seed authors first.')
        return
    }

    const categoriesData = [
        { name: 'Technology', slug: 'technology', color: '#3B82F6' },
        { name: 'Productivity', slug: 'productivity', color: '#10B981' },
        { name: 'Lifestyle', slug: 'lifestyle', color: '#F59E0B' },
    ]

    await db.insert(blogCategory).values(categoriesData).onConflictDoNothing()
    const categories = await db.select().from(blogCategory)

    const tagsData = [
        { name: 'Next.js', slug: 'next-js', color: '#000000' },
        { name: 'Drizzle ORM', slug: 'drizzle-orm', color: '#84CC16' },
        { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
        { name: 'Developer', slug: 'developer', color: '#6B7280' },
        { name: 'Personal Growth', slug: 'personal-growth', color: '#EF4444' },
    ]

    await db.insert(blogTag).values(tagsData).onConflictDoNothing()
    const tags = await db.select().from(blogTag)

    // Clear existing blog posts for re-seeding
    const existingPosts = await db.select().from(blogPost).limit(1)
    if (existingPosts.length > 0) {
        console.log('Clearing existing blog posts...')
        await db.delete(blogPostTag)
        await db.delete(blogPostCategory)
        await db.delete(blogPost)
    }

    const postsData = Array.from({ length: 30 }, (_, i) => {
        // Stagger publication dates for better ordering test
        const publishedDate = new Date()
        publishedDate.setDate(publishedDate.getDate() - i)

        return {
            title: faker.lorem.sentence(5),
            slug: `${faker.lorem.slug()}-${i}`,
            excerpt: faker.lorem.sentences(2),
            metaDescription: faker.lorem.sentence(20),
            content: faker.lorem.paragraphs(5),
            readingTime: Math.floor(Math.random() * 10) + 3, // 3-12 minutes
            authorId:
                authors.length > 0
                    ? authors[Math.floor(Math.random() * authors.length)]!.id
                    : null,
            publishedAt: publishedDate,
            status: 'published' as const,
        }
    })

    await db.insert(blogPost).values(postsData)
    const posts = await db.select().from(blogPost)

    for (const post of posts) {
        // Assign a random category
        const randomCategory =
            categories[Math.floor(Math.random() * categories.length)]
        if (randomCategory) {
            await db.insert(blogPostCategory).values({
                blogPostId: post.id,
                categoryId: randomCategory.id,
            })
        } else {
            console.warn(
                `No category found to assign to post with id ${post.id}`
            )
        }

        // Assign 2 random tags
        const randomTags =
            tags.length >= 2
                ? tags.sort(() => 0.5 - Math.random()).slice(0, 2)
                : tags
        for (const tag of randomTags) {
            await db.insert(blogPostTag).values({
                blogPostId: post.id,
                tagId: tag.id,
            })
        }
    }

    console.log('✅ Blog posts, categories, and tags seeded successfully!')
}
