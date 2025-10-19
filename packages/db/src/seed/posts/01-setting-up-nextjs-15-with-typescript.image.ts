import type { InsertImage } from '../../schema/blog/image.table'

/**
 * Featured Image for: Setting Up a Next.js 15 Project with TypeScript
 *
 * Professional developer workspace image showing code editor with TypeScript and Next.js
 */

export const image: Omit<InsertImage, 'id' | 'createdAt' | 'updatedAt'> = {
    url: 'https://lcqnjgugr2aws94e.public.blob.vercel-storage.com/post/setting-up-nextjs-15-with-typescript/featured-image.jpg',
    alt: 'Professional developer workspace with laptop displaying TypeScript and Next.js code editor, modern minimalist desk setup with natural lighting',
    title: 'Next.js 15 TypeScript Development Environment',
    description:
        'A clean, professional developer workspace featuring a modern laptop with code editor displaying TypeScript and Next.js code, representing the modern development environment for setting up a Next.js 15 project',
    width: 1392,
    height: 752,
    fileSize: 203085, // 198KB
    mimeType: 'image/jpeg',
    originalFilename: '01-setting-up-nextjs-15-with-typescript.jpg',
}
