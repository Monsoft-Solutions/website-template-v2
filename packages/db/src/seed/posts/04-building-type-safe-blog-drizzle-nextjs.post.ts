import type { InsertBlogPost } from '../../schema/blog/blog-post.table'

/**
 * Blog Post: Building a Type-Safe Blog System with Drizzle ORM and Next.js 15
 *
 * Tutorial post demonstrating practical implementation of a blog system
 * Category: Development
 * Tags: Drizzle ORM, Next.js, TypeScript, Database, Tutorial
 */

export const post: Omit<
    InsertBlogPost,
    'id' | 'authorId' | 'createdAt' | 'updatedAt'
> = {
    slug: 'building-type-safe-blog-drizzle-nextjs',
    title: 'Building a Type-Safe Blog System with Drizzle ORM and Next.js 15',
    metaTitle:
        'Build a Type-Safe Blog with Drizzle ORM & Next.js 15 | Complete Guide',
    metaDescription:
        'Learn how to build a production-ready blog system with Drizzle ORM and Next.js 15. Complete type safety from database to UI. Includes schema design, queries, and frontend implementation.',
    metaKeywords:
        'Drizzle ORM, Next.js 15 blog, type-safe blog, PostgreSQL blog system, Next.js content management, Drizzle tutorial, blog database schema',
    excerpt:
        'Build a production-ready blog system with complete type safety. This guide covers database schema design, Drizzle ORM queries, and Next.js 15 implementation with real code examples.',
    content: `**TL;DR**

- Build a complete blog system with Drizzle ORM and Next.js 15
- Type safety from database schema to UI components
- Includes posts, categories, tags, comments, and images
- Production-ready with proper relationships and constraints
- Setup time: ~45 minutes

## The Problem with Most Blog Systems

You need a blog for your website. Every option has trade-offs:

**Headless CMS (Contentful, Sanity):** Monthly fees. API rate limits. Your content lives on someone else's servers. Migration is painful.

**WordPress:** Plugin hell. Security updates. PHP. Moving to modern infrastructure is nearly impossible.

**Markdown files:** No relational data. Searching is slow. Adding features requires rebuilding everything.

**The solution:** Build your own with Drizzle ORM. You get type-safe queries, full control, and none of the overhead. Your content lives in PostgreSQL alongside your application data.

This guide shows you how we built Keel's blog system. You'll get the complete schema, query functions, and UI implementation.

## What You'll Build

By the end of this tutorial, you'll have:

- **Database schema** with posts, categories, tags, authors, comments, and images
- **Type-safe queries** that autocomplete in your IDE
- **Relationship handling** (many-to-many for tags, one-to-many for comments)
- **API routes** for fetching posts with filters
- **Frontend components** with proper TypeScript types

**What you'll need:**
- Next.js 15 project with App Router
- PostgreSQL database (local or hosted)
- Basic TypeScript knowledge
- 45 minutes

## Step 1: Install Drizzle ORM

Drizzle provides type-safe database access without code generation delays.

\`\`\`bash
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
\`\`\`

Create \`drizzle.config.ts\` in your project root:

\`\`\`typescript
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/db/schema',
    out: './src/db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    },
})
\`\`\`

Add your database URL to \`.env\`:

\`\`\`bash
POSTGRES_URL="postgresql://user:password@localhost:5432/mydb"
\`\`\`

## Step 2: Design the Database Schema

A blog system needs more than just posts. You need categories, tags, authors, comments, and images.

**Key design decisions:**

1. **Many-to-many relationships** for categories and tags (posts can have multiple, and vice versa)
2. **One-to-many** for comments (each post has many comments)
3. **Timestamps** on everything (created_at, updated_at)
4. **Soft deletes** option (keep content, mark as deleted)
5. **SEO fields** (meta title, description, keywords)

### Posts Table

Create \`src/db/schema/posts.table.ts\`:

\`\`\`typescript
import { pgTable, text, timestamp, varchar, boolean, integer } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const posts = pgTable('blog_posts', {
    id: varchar('id', { length: 128 })
        .primaryKey()
        .$defaultFn(() => createId()),
    
    // Content fields
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    excerpt: text('excerpt'),
    content: text('content').notNull(),
    
    // SEO fields
    metaTitle: varchar('meta_title', { length: 255 }),
    metaDescription: varchar('meta_description', { length: 500 }),
    metaKeywords: text('meta_keywords'),
    
    // Publishing
    status: varchar('status', { length: 20 }).notNull().default('draft'), // draft, published, archived
    publishedAt: timestamp('published_at'),
    
    // Author relationship
    authorId: varchar('author_id', { length: 128 }).notNull(),
    
    // Featured image relationship
    featuredImageId: varchar('featured_image_id', { length: 128 }),
    
    // Metadata
    readingTime: integer('reading_time').notNull().default(5), // minutes
    viewCount: integer('view_count').notNull().default(0),
    isFeatured: boolean('is_featured').notNull().default(false),
    allowComments: boolean('allow_comments').notNull().default(true),
    
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
\`\`\`

**Why this structure?**

- **CUID2 IDs:** URL-safe, collision-resistant, better than UUIDs for databases
- **Slug field:** SEO-friendly URLs (\`/blog/my-post\` not \`/blog/123\`)
- **Status enum:** Control visibility (draft during editing, published when ready)
- **Reading time:** Improves user experience (calculated from word count)
- **View count:** Track popular content
- **Timestamps:** Audit trail for content changes

### Categories Table

\`\`\`typescript
export const categories = pgTable('blog_categories', {
    id: varchar('id', { length: 128 })
        .primaryKey()
        .$defaultFn(() => createId()),
    
    name: varchar('name', { length: 100 }).notNull().unique(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    description: text('description'),
    
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
\`\`\`

### Tags Table

\`\`\`typescript
export const tags = pgTable('blog_tags', {
    id: varchar('id', { length: 128 })
        .primaryKey()
        .$defaultFn(() => createId()),
    
    name: varchar('name', { length: 50 }).notNull().unique(),
    slug: varchar('slug', { length: 50 }).notNull().unique(),
    
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
\`\`\`

### Junction Tables (Many-to-Many)

Categories and tags need junction tables to create many-to-many relationships.

\`\`\`typescript
// Posts to Categories
export const postsToCategories = pgTable('blog_posts_to_categories', {
    postId: varchar('post_id', { length: 128 }).notNull().references(() => posts.id, { onDelete: 'cascade' }),
    categoryId: varchar('category_id', { length: 128 }).notNull().references(() => categories.id, { onDelete: 'cascade' }),
    
    createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
    pk: primaryKey({ columns: [table.postId, table.categoryId] }),
}))

// Posts to Tags
export const postsToTags = pgTable('blog_posts_to_tags', {
    postId: varchar('post_id', { length: 128 }).notNull().references(() => posts.id, { onDelete: 'cascade' }),
    tagId: varchar('tag_id', { length: 128 }).notNull().references(() => tags.id, { onDelete: 'cascade' }),
    
    createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
    pk: primaryKey({ columns: [table.postId, table.tagId] }),
}))
\`\`\`

**Why composite primary keys?**

- Prevents duplicate relationships (same post + category combo)
- Better query performance than separate ID column
- \`onDelete: 'cascade'\` automatically removes relationships when posts are deleted

### Comments Table

\`\`\`typescript
export const comments = pgTable('blog_comments', {
    id: varchar('id', { length: 128 })
        .primaryKey()
        .$defaultFn(() => createId()),
    
    postId: varchar('post_id', { length: 128 })
        .notNull()
        .references(() => posts.id, { onDelete: 'cascade' }),
    
    // Comment author (not the post author)
    authorName: varchar('author_name', { length: 100 }).notNull(),
    authorEmail: varchar('author_email', { length: 255 }).notNull(),
    
    content: text('content').notNull(),
    
    // Moderation
    status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, approved, spam
    
    // Threading (optional - for replies)
    parentCommentId: varchar('parent_comment_id', { length: 128 }),
    
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
\`\`\`

## Step 3: Generate TypeScript Types

Drizzle automatically generates types from your schema. No manual type definitions needed.

Run the migration generator:

\`\`\`bash
pnpm drizzle-kit generate
\`\`\`

This creates SQL migration files in \`src/db/migrations/\`.

Apply migrations to your database:

\`\`\`bash
pnpm drizzle-kit migrate
\`\`\`

**Type inference example:**

\`\`\`typescript
import { posts } from './schema/posts.table'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

// Inferred types from schema
export type Post = InferSelectModel<typeof posts>
export type NewPost = InferInsertModel<typeof posts>

// TypeScript knows all fields and their types
const post: Post = {
    id: 'abc123',
    slug: 'my-post',
    title: 'My Post',
    content: 'Content here',
    status: 'published',
    authorId: 'user123',
    // ... TypeScript ensures all required fields are present
}
\`\`\`

## Step 4: Create Type-Safe Query Functions

Now write query functions with full type safety.

### Fetch Published Posts

\`\`\`typescript
import { db } from './client'
import { posts, categories, tags, postsToCategories, postsToTags } from './schema'
import { eq, desc, and } from 'drizzle-orm'

export async function getPublishedPosts() {
    return await db
        .select()
        .from(posts)
        .where(eq(posts.status, 'published'))
        .orderBy(desc(posts.publishedAt))
}
\`\`\`

TypeScript knows the return type is \`Post[]\`. Your IDE autocompletes field names.

### Fetch Post with Relationships

The power of Drizzle: fetch posts with categories and tags in one query.

\`\`\`typescript
export async function getPostBySlug(slug: string) {
    // Main post data
    const post = await db
        .select()
        .from(posts)
        .where(and(
            eq(posts.slug, slug),
            eq(posts.status, 'published')
        ))
        .limit(1)
        .then(rows => rows[0])
    
    if (!post) return null
    
    // Fetch categories
    const postCategories = await db
        .select({ category: categories })
        .from(postsToCategories)
        .innerJoin(categories, eq(postsToCategories.categoryId, categories.id))
        .where(eq(postsToCategories.postId, post.id))
    
    // Fetch tags
    const postTags = await db
        .select({ tag: tags })
        .from(postsToTags)
        .innerJoin(tags, eq(postsToTags.tagId, tags.id))
        .where(eq(postsToTags.postId, post.id))
    
    return {
        ...post,
        categories: postCategories.map(pc => pc.category),
        tags: postTags.map(pt => pt.tag),
    }
}
\`\`\`

**Alternative: Using Drizzle relations** (even cleaner):

\`\`\`typescript
import { relations } from 'drizzle-orm'

// Define relationships in schema
export const postsRelations = relations(posts, ({ many }) => ({
    categories: many(postsToCategories),
    tags: many(postsToTags),
}))

// Query with relations
export async function getPostBySlugWithRelations(slug: string) {
    return await db.query.posts.findFirst({
        where: (posts, { eq, and }) => and(
            eq(posts.slug, slug),
            eq(posts.status, 'published')
        ),
        with: {
            categories: {
                with: { category: true }
            },
            tags: {
                with: { tag: true }
            }
        }
    })
}
\`\`\`

## Step 5: Build API Routes

Next.js 15 App Router makes API routes type-safe end-to-end.

### Get All Posts

\`app/api/blog/posts/route.ts\`:

\`\`\`typescript
import { NextResponse } from 'next/server'
import { getPublishedPosts } from '@/db/queries/blog'

export async function GET() {
    try {
        const posts = await getPublishedPosts()
        return NextResponse.json(posts)
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        )
    }
}
\`\`\`

### Get Post by Slug

\`app/api/blog/posts/[slug]/route.ts\`:

\`\`\`typescript
import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/db/queries/blog'

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const post = await getPostBySlug(params.slug)
        
        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            )
        }
        
        return NextResponse.json(post)
    } catch (error) {
        console.error('Error fetching post:', error)
        return NextResponse.json(
            { error: 'Failed to fetch post' },
            { status: 500 }
        )
    }
}
\`\`\`

## Step 6: Create Frontend Components

Now use your type-safe API in React components.

### Blog Post List

\`app/blog/page.tsx\`:

\`\`\`typescript
import { getPublishedPosts } from '@/db/queries/blog'
import Link from 'next/link'

export default async function BlogPage() {
    const posts = await getPublishedPosts()
    
    return (
        <main className="container mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map(post => (
                    <article key={post.id} className="border rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-2">
                            <Link href={\`/blog/\${post.slug}\`} className="hover:text-blue-600">
                                {post.title}
                            </Link>
                        </h2>
                        
                        {post.excerpt && (
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{post.readingTime} min read</span>
                            <span>{post.viewCount} views</span>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    )
}
\`\`\`

TypeScript knows \`post.title\`, \`post.slug\`, \`post.excerpt\` exist. Autocomplete works. Typos are caught at compile time.

### Individual Post Page

\`app/blog/[slug]/page.tsx\`:

\`\`\`typescript
import { getPostBySlug } from '@/db/queries/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPostBySlug(params.slug)
    
    if (!post) return {}
    
    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        keywords: post.metaKeywords,
    }
}

export default async function BlogPostPage({ params }: Props) {
    const post = await getPostBySlug(params.slug)
    
    if (!post) notFound()
    
    return (
        <article className="container mx-auto py-12 max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
            
            {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 mb-4">
                    {post.categories.map(cat => (
                        <span key={cat.id} className="px-3 py-1 bg-blue-100 rounded">
                            {cat.name}
                        </span>
                    ))}
                </div>
            )}
            
            <div className="prose prose-lg max-w-none">
                {/* Render markdown content here */}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 mt-8 flex-wrap">
                    {post.tags.map(tag => (
                        <Link
                            key={tag.id}
                            href={\`/blog/tags/\${tag.slug}\`}
                            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
                        >
                            #{tag.name}
                        </Link>
                    ))}
                </div>
            )}
        </article>
    )
}
\`\`\`

## Step 7: Add Search and Filtering

PostgreSQL full-text search with Drizzle:

\`\`\`typescript
import { sql } from 'drizzle-orm'

export async function searchPosts(query: string) {
    return await db
        .select()
        .from(posts)
        .where(
            and(
                eq(posts.status, 'published'),
                sql\`to_tsvector('english', \${posts.title} || ' ' || \${posts.content}) @@ plainto_tsquery('english', \${query})\`
            )
        )
        .orderBy(desc(posts.publishedAt))
}
\`\`\`

Filter by category:

\`\`\`typescript
export async function getPostsByCategory(categorySlug: string) {
    return await db
        .select({ post: posts })
        .from(posts)
        .innerJoin(postsToCategories, eq(posts.id, postsToCategories.postId))
        .innerJoin(categories, eq(postsToCategories.categoryId, categories.id))
        .where(
            and(
                eq(posts.status, 'published'),
                eq(categories.slug, categorySlug)
            )
        )
        .orderBy(desc(posts.publishedAt))
}
\`\`\`

## Common Issues and Solutions

### Issue: "Cannot find module '@/db/client'"

**Solution:** Check your \`tsconfig.json\` path aliases:

\`\`\`json
{
    "compilerOptions": {
        "paths": {
            "@/*": ["./src/*"]
        }
    }
}
\`\`\`

### Issue: Type errors on relations

**Solution:** Make sure you've defined relations in your schema:

\`\`\`typescript
import { relations } from 'drizzle-orm'

export const postsRelations = relations(posts, ({ one, many }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id],
    }),
    categories: many(postsToCategories),
}))
\`\`\`

### Issue: Migrations not applying

**Solution:** Check your \`drizzle.config.ts\` points to correct database URL:

\`\`\`typescript
export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_URL!, // Make sure this is set in .env
    },
})
\`\`\`

Run \`pnpm drizzle-kit push\` for development (skips migrations) or \`pnpm drizzle-kit migrate\` for production.

## Production Considerations

### Database Indexing

Add indexes for frequently queried fields:

\`\`\`typescript
export const posts = pgTable('blog_posts', {
    // ... fields
}, (table) => ({
    slugIdx: index('slug_idx').on(table.slug),
    statusIdx: index('status_idx').on(table.status),
    publishedAtIdx: index('published_at_idx').on(table.publishedAt),
}))
\`\`\`

### Caching

Use Next.js built-in caching:

\`\`\`typescript
// Revalidate every hour
export const revalidate = 3600

export async function getPublishedPosts() {
    // This response is cached
    return await db.select().from(posts)...
}
\`\`\`

### Connection Pooling

For production, use connection pooling:

\`\`\`typescript
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    max: 20, // maximum pool size
})

export const db = drizzle(pool)
\`\`\`

## What You've Built

You now have:

✅ **Type-safe database schema** with proper relationships
✅ **Autocomplete queries** that catch errors at compile time
✅ **Production-ready API routes** with error handling
✅ **Next.js 15 pages** with server-side rendering
✅ **Full-text search** capability
✅ **Category and tag filtering**

The best part? TypeScript ensures your database schema, queries, and UI stay in sync. Change a field name in the schema, and TypeScript immediately shows you every place that needs updating.

## Next Steps

Extend your blog system:

1. **Add image uploads** with Vercel Blob or S3
2. **Implement comments** with moderation workflow
3. **Build an admin dashboard** for content management
4. **Add RSS feed generation** for subscribers
5. **Track view counts** with server actions
6. **Implement draft previews** with unique URLs

## Conclusion

Most blog systems force you to choose between ease of setup and long-term maintainability. Drizzle ORM with Next.js 15 gives you both.

You get the type safety and developer experience of modern tooling. No migration delays. No generated files to commit. Just clean, type-safe code that works.

**Want to start with a production-ready template?** Keel includes this entire blog system pre-configured. Clone the repository and start writing content in minutes.

[View the Keel repository](https://github.com/Monsoft-Solutions/website-template-v2) or [read the documentation](/docs) to learn more.`,
    readingTime: 12,
    status: 'published',
    publishedAt: new Date('2025-10-19T18:00:00Z'),
    isFeatured: true,
    allowComments: true,
}

export const categories = ['Development', 'Tutorial']
export const tags = [
    'Drizzle ORM',
    'Next.js',
    'TypeScript',
    'Database',
    'PostgreSQL',
]
