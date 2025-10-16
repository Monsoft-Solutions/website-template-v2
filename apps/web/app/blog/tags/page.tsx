import { WebPageSchema } from '@workspace/seo/react'
import { Hash } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { ContainerLayout } from '@/components/ContainerLayout.component'
import { Breadcrumbs } from '@/components/shared'
import { listActiveTagsWithCounts } from '@/lib/blog/taxonomy.query'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = toNextMetadata(seoConfig, {
    title: 'Blog Tags',
    description:
        'Browse our blog posts by tag. Discover content on specific topics and technologies.',
    canonical: '/blog/tags',
})

export default async function TagsIndexPage() {
    const tags = await listActiveTagsWithCounts()

    // Sort tags by count (descending) for better visual hierarchy
    const sortedTags = [...tags].sort((a, b) => (b.count ?? 0) - (a.count ?? 0))

    return (
        <ContainerLayout as='main' className='py-12 lg:py-16'>
            <WebPageSchema
                name='Blog Tags'
                url={`${seoConfig.siteUrl}/blog/tags`}
                description='Browse our blog posts by tag. Discover content on specific topics and technologies.'
            />

            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Tags' },
                ]}
            />

            <header className='mb-12 space-y-6'>
                <div className='space-y-4'>
                    <h1 className='text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl'>
                        Tags
                    </h1>
                    <p className='text-muted-foreground max-w-2xl text-lg leading-relaxed sm:text-xl'>
                        Browse articles by tag. Click on any tag to see related
                        posts.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className='flex flex-wrap items-center gap-4 pt-4'>
                    <Link
                        href='/blog'
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
                                d='M13 10V3L4 14h7v7l9-11h-7z'
                            />
                        </svg>
                        View All Posts
                    </Link>
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
                </div>
            </header>

            <div className='flex flex-wrap gap-3'>
                {sortedTags.map((tag, index) => (
                    <Link
                        key={tag.id}
                        href={`/blog/tags/${tag.slug}`}
                        style={{
                            animationDelay: `${index * 0.02}s`,
                            animationFillMode: 'backwards',
                        }}
                        className='border-border/60 bg-card hover:border-border hover:shadow-primary/5 focus-visible:ring-ring focus-visible:ring-offset-background group animate-fade-in inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                    >
                        <Hash
                            className='text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors duration-300'
                            aria-hidden='true'
                        />
                        <span className='text-foreground group-hover:text-primary font-medium transition-colors duration-300'>
                            {tag.name}
                        </span>
                        {typeof tag.count === 'number' && (
                            <span className='bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-semibold'>
                                {tag.count}
                            </span>
                        )}
                    </Link>
                ))}
            </div>
        </ContainerLayout>
    )
}
