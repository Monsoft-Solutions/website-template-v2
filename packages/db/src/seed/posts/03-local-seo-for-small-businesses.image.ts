import type { InsertImage } from '../../schema/blog/image.table'

export const image: Omit<InsertImage, 'id' | 'createdAt' | 'updatedAt'> = {
    url: 'https://lcqnjgugr2aws94e.public.blob.vercel-storage.com/posts/03-local-seo-for-small-businesses.jpg',
    alt: 'Small business owner working on laptop in local coffee shop reviewing Google My Business listing for local SEO optimization',
    title: 'Local SEO for Small Business - Google My Business Optimization',
    description:
        'Small business owner actively managing their local SEO presence by reviewing and updating their Google My Business listing in a cozy local coffee shop environment',
    width: 1392,
    height: 752,
    fileSize: 1252395,
    mimeType: 'image/jpeg',
    originalFilename: '03-local-seo-for-small-businesses.jpg',
}
