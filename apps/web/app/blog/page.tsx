import { WebPageSchema } from '@workspace/seo/react'
import type { Metadata } from 'next'

import { InfinitePostList } from '@/components/blog/InfinitePostList.component'
import { getPublishedPostCardsPage } from '@/lib/blog/post-list.query'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = toNextMetadata(seoConfig, {
    title: 'Blog',
    description:
        'Read our latest articles, tutorials, and insights on web development, design, and technology.',
    canonical: '/blog',
})

export default async function BlogPage() {
    const pageSize = 12
    const { items: initialPosts, nextCursor } = await getPublishedPostCardsPage(
        {
            limit: pageSize,
        }
    )

    // Encode the cursor for client-side use
    const encodedCursor = nextCursor
        ? Buffer.from(
              JSON.stringify({
                  publishedAt: nextCursor.publishedAt.toISOString(),
                  id: nextCursor.id,
              })
          ).toString('base64')
        : undefined

    return (
        <div className='container py-12'>
            <WebPageSchema
                name='Blog'
                url={`${seoConfig.siteUrl}/blog`}
                description='Read our latest articles, tutorials, and insights on web development, design, and technology.'
            />
            <div className='mb-12'>
                <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
                    Blog
                </h1>
                <p className='text-muted-foreground mt-4 text-lg'>
                    Insights, tutorials, and stories from our team
                </p>
            </div>

            <InfinitePostList
                initialPosts={initialPosts}
                initialCursor={encodedCursor}
                pageSize={pageSize}
            />
        </div>
    )
}
