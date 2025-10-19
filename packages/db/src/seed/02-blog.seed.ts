import { glob } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { eq } from 'drizzle-orm'

import { db } from '../client'
import { env } from '../env'
import {
    author,
    blogCategory,
    blogPost,
    blogPostCategory,
    blogPostTag,
    blogTag,
    images,
} from '../schema'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type RunProps = {
    db: typeof db
}

type PostModule = {
    post: Omit<
        typeof blogPost.$inferInsert,
        'id' | 'authorId' | 'createdAt' | 'updatedAt'
    >
    categories: string[]
    tags: string[]
}

type ImageModule = {
    image: Omit<typeof images.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>
}

/**
 * Converts a string to a URL-friendly slug
 */
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

/**
 * Generates a color based on the string hash (deterministic)
 */
function generateColor(str: string): string {
    const colors = [
        '#3B82F6', // Blue
        '#10B981', // Green
        '#F59E0B', // Amber
        '#EF4444', // Red
        '#8B5CF6', // Purple
        '#EC4899', // Pink
        '#14B8A6', // Teal
        '#F97316', // Orange
        '#6366F1', // Indigo
        '#84CC16', // Lime
    ]
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]!
}

export async function run({ db }: RunProps) {
    console.log('Seeding blog posts, categories, and tags...')

    const authors = await db.select().from(author)
    if (authors.length === 0) {
        console.error('❌ No authors found. Please seed authors first.')
        return
    }

    const isDevelopment = env.NODE_ENV === 'development'
    const shouldClearData = isDevelopment

    // Check if blog posts exist
    const existingPosts = await db.select().from(blogPost).limit(1)

    if (shouldClearData && existingPosts.length > 0) {
        console.log('🗑️  Clearing existing blog data (development mode)...')
        await db.delete(blogPostTag)
        await db.delete(blogPostCategory)
        await db.delete(blogPost)
        await db.delete(blogCategory)
        await db.delete(blogTag)
        await db.delete(images)
    }

    // Load blog post files from the posts directory
    const postsDir = path.resolve(__dirname, 'posts')
    const postFiles = await glob('*.post.{js,ts}', {
        cwd: postsDir,
    })

    if (postFiles.length === 0) {
        console.log('ℹ️  No blog post files found in posts directory')
        return
    }

    console.log(`📝 Found ${postFiles.length} blog post(s)`)

    // Load image files from the posts directory
    const imageFiles = await glob('*.image.{js,ts}', {
        cwd: postsDir,
    })

    console.log(`🖼️  Found ${imageFiles.length} image(s)`)

    // Collect all unique categories and tags from posts
    const allCategories = new Set<string>()
    const allTags = new Set<string>()
    const postModules: PostModule[] = []

    for (const file of postFiles) {
        const postModule = (await import(
            path.resolve(postsDir, file)
        )) as PostModule
        postModules.push(postModule)

        postModule.categories.forEach((cat) => allCategories.add(cat))
        postModule.tags.forEach((tag) => allTags.add(tag))
    }

    // Process images first - always populate imageMap regardless of insert/conflict
    const imageMap = new Map<string, string>() // Maps base filename to image ID

    if (imageFiles.length > 0) {
        console.log('🖼️  Processing images and populating imageMap...')

        for (const file of imageFiles) {
            const imageModule = (await import(
                path.resolve(postsDir, file)
            )) as ImageModule

            // Always attempt to insert the image with conflict handling
            // This ensures the image exists in the database
            await db
                .insert(images)
                .values(imageModule.image)
                .onConflictDoNothing()

            // Always query the database to get the image ID by URL
            // This ensures imageMap is populated whether the insert was new or conflicted
            const [existingImage] = await db
                .select()
                .from(images)
                .where(eq(images.url, imageModule.image.url))

            if (existingImage) {
                // Extract base filename (e.g., "01-setting-up-nextjs-15-with-typescript")
                const baseFilename = file
                    .replace('.image.ts', '')
                    .replace('.image.js', '')
                imageMap.set(baseFilename, existingImage.id)
                console.log(
                    `✅ Processed image: ${existingImage.title} (${baseFilename})`
                )
            } else {
                console.warn(
                    `⚠️  Image not found in database after insert: ${file}`
                )
            }
        }

        console.log(`✅ ImageMap populated with ${imageMap.size} entries`)
    }

    // Insert categories
    if (
        shouldClearData ||
        (await db.select().from(blogCategory)).length === 0
    ) {
        const categoriesData = Array.from(allCategories).map((name) => ({
            name,
            slug: slugify(name),
            color: generateColor(name),
        }))

        if (categoriesData.length > 0) {
            await db
                .insert(blogCategory)
                .values(categoriesData)
                .onConflictDoNothing()
            console.log(`✅ Inserted ${categoriesData.length} categories`)
        }
    }
    const categories = await db.select().from(blogCategory)

    // Insert tags
    if (shouldClearData || (await db.select().from(blogTag)).length === 0) {
        const tagsData = Array.from(allTags).map((name) => ({
            name,
            slug: slugify(name),
            color: generateColor(name),
        }))

        if (tagsData.length > 0) {
            await db.insert(blogTag).values(tagsData).onConflictDoNothing()
            console.log(`✅ Inserted ${tagsData.length} tags`)
        }
    }
    const tags = await db.select().from(blogTag)

    // Only insert posts if table is empty or we're in development
    if (shouldClearData || existingPosts.length === 0) {
        // Get a random author for posts
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)]

        if (!randomAuthor) {
            console.error('❌ No author available for posts')
            return
        }

        // Insert each post
        for (let i = 0; i < postModules.length; i++) {
            const postModule = postModules[i]
            if (!postModule) continue

            const {
                post: postData,
                categories: postCategories,
                tags: postTags,
            } = postModule

            // Find the corresponding image ID based on filename pattern
            const postFile = postFiles[i]
            const baseFilename = postFile
                ?.replace('.post.ts', '')
                .replace('.post.js', '')
            const featuredImageId = baseFilename
                ? imageMap.get(baseFilename)
                : undefined

            // Insert the blog post
            const [insertedPost] = await db
                .insert(blogPost)
                .values({
                    ...postData,
                    authorId: randomAuthor.id,
                    featuredImageId,
                })
                .returning()

            if (!insertedPost) {
                console.error(`❌ Failed to insert post: ${postData.title}`)
                continue
            }

            console.log(`✅ Inserted post: ${insertedPost.title}`)

            // Link categories
            for (const categoryName of postCategories) {
                const category = categories.find((c) => c.name === categoryName)
                if (category) {
                    await db.insert(blogPostCategory).values({
                        blogPostId: insertedPost.id,
                        categoryId: category.id,
                    })
                }
            }

            // Link tags
            for (const tagName of postTags) {
                const tag = tags.find((t) => t.name === tagName)
                if (tag) {
                    await db.insert(blogPostTag).values({
                        blogPostId: insertedPost.id,
                        tagId: tag.id,
                    })
                }
            }
        }

        console.log('✅ Blog posts, categories, and tags seeded successfully!')
    } else {
        console.log(
            'ℹ️  Blog data already exists, skipping seed (production mode)'
        )
    }
}
