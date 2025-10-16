import { z } from 'zod'

/**
 * Schema for image data to be uploaded to Vercel Blob
 */
export const imageDataSchema = z.object({
    url: z.string().url('Invalid image URL'),
})

/**
 * Resource creation schema for API
 */
export const createResourceSchema = z.object({
    slug: z.string().min(1, 'Slug is required'),
    title: z.string().min(1, 'Title is required'),
    metaDescription: z.string().min(1, 'Meta description is required'),
    metaTitle: z.string().optional(),
    metaKeywords: z.string().optional(),
    excerpt: z.string().optional(),
    date: z.string().min(1, 'Date is required'),
    readingTime: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
    status: z.enum(['draft', 'readyToPublish', 'published']).default('draft'),
    authorId: z.string().uuid('Invalid author ID'),
    featuredImageUrl: z.string().url('Invalid featured image URL').optional(),
    featuredImage: imageDataSchema.optional(),
    categoryIds: z.array(z.string().uuid('Invalid category ID')).default([]),
    tagIds: z.array(z.string().uuid('Invalid tag ID')).default([]),
})

export type CreateResourceInput = z.infer<typeof createResourceSchema>
