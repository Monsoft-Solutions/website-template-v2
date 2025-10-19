import type { InsertImage } from '../../schema/blog/image.table'

/**
 * Featured Image for: Your Small Business Needs a Website. Here's Why Most Solutions Fail.
 *
 * Small business owner working on website, approachable and relatable
 */

export const image: Omit<InsertImage, 'id' | 'createdAt' | 'updatedAt'> = {
    url: 'https://lcqnjgugr2aws94e.public.blob.vercel-storage.com/post/small-business-website-pain-points/featured-image.jpg',
    alt: 'Friendly small business owner sitting at desk in modern office, working on laptop with website mockups, professional and approachable atmosphere',
    title: 'Small Business Owner Working on Website',
    description:
        'A warm and professional image of a small business owner in a contemporary office setting, reviewing website designs on their laptop, representing the journey of small business owners building their online presence',
    width: 1392,
    height: 752,
    fileSize: 240615, // 235KB
    mimeType: 'image/jpeg',
    originalFilename: '02-small-business-website-pain-points.jpg',
}
