import { WebPageSchema } from '@workspace/seo/react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { ContainerLayout } from '@/components/ContainerLayout.component'
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
        <ContainerLayout as='main' className='py-12 lg:py-16'>
            <WebPageSchema
                name='Blog'
                url={`${seoConfig.siteUrl}/blog`}
                description='Read our latest articles, tutorials, and insights on web development, design, and technology.'
            />

            <Breadcrumbs
                items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
            />

            <header className='mb-12 space-y-6'>
                <div className='space-y-4'>
                    <h1 className='text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl'>
                        Blog
                    </h1>
                    <p className='text-muted-foreground max-w-2xl text-lg leading-relaxed sm:text-xl'>
                        Insights, tutorials, and stories from our team
                    </p>
                </div>

                {/* Navigation Links */}
                <div className='flex flex-wrap items-center gap-4 pt-4'>
                    <Link
                        href='/blog/categories'
                        className='text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200'
                    >
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
                        Browse by Category
                    </Link>
                    <Link
                        href='/blog/tags'
                        className='text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200'
                    >
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
                        Browse by Tag
                    </Link>
                </div>
            </header>

            <InfinitePostList
                initialPosts={initialPosts}
                initialCursor={encodedCursor}
                pageSize={pageSize}
            />
        </ContainerLayout>
    )
}
