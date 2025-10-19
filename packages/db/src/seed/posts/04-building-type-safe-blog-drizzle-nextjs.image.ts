import type { InsertImage } from '../../schema/blog/image.table'

export const image: Omit<InsertImage, 'id' | 'createdAt' | 'updatedAt'> = {
    url: 'https://lcqnjgugr2aws94e.public.blob.vercel-storage.com/posts/04-building-type-safe-blog-drizzle-nextjs.jpg',
    alt: 'Professional software developer working at modern desk with laptop displaying TypeScript code and Drizzle ORM database schema definitions in code editor',
    title: 'Building Type-Safe Blog System with Drizzle ORM',
    description:
        'Developer focused on laptop screen showing Drizzle ORM schema code with TypeScript in a clean, well-lit modern workspace with natural lighting and minimal setup',
    width: 2816,
    height: 1536,
    fileSize: 842404,
    mimeType: 'image/jpeg',
    originalFilename: '04-building-type-safe-blog-drizzle-nextjs.jpg',
}
