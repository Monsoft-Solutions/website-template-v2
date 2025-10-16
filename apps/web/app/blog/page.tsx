import { WebPageSchema } from '@workspace/seo/react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { ContainerLayout } from '@/components/ContainerLayout.component'
import { BlogHeroSection } from '@/components/blog/BlogHeroSection.component'
import { InfinitePostList } from '@/components/blog/InfinitePostList.component'
import { Breadcrumbs } from '@/components/shared'
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
        <ContainerLayout as='main' className='py-16 lg:py-20'>
            <WebPageSchema
                name='Blog'
                url={`${seoConfig.siteUrl}/blog`}
                description='Read our latest articles, tutorials, and insights on web development, design, and technology.'
            />

            <div className='mb-16'>
                <Breadcrumbs
                    items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
                    showBackground={true}
                />
            </div>

            <BlogHeroSection
                badge={{
                    icon: (
                        <svg
                            className='mr-2 h-4 w-4'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                            />
                        </svg>
                    ),
                    text: 'Knowledge Hub',
                }}
                title='Our Blog'
                description={
                    <>
                        Discover insights, tutorials, and stories from our team.
                        <span className='text-foreground font-medium'>
                            {' '}
                            Stay ahead
                        </span>{' '}
                        with the latest trends, best practices, and innovative
                        approaches in web development and design.
                    </>
                }
                navigationLinks={[
                    {
                        href: '/blog/categories',
                        icon: (
                            <svg
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                                />
                            </svg>
                        ),
                        text: 'Browse by Category',
                    },
                    {
                        href: '/blog/tags',
                        icon: (
                            <svg
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                                />
                            </svg>
                        ),
                        text: 'Browse by Tag',
                    },
                ]}
            />

            <InfinitePostList
                initialPosts={initialPosts}
                initialCursor={encodedCursor}
                pageSize={pageSize}
            />
        </ContainerLayout>
    )
}
