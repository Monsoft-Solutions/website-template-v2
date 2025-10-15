import { WebPageSchema } from '@workspace/seo/react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { listActiveCategoriesWithCounts } from '@/lib/blog/taxonomy.query'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = toNextMetadata(seoConfig, {
    title: 'Blog Categories',
    description:
        'Browse our blog posts by category. Find articles on web development, design, technology, and more.',
    canonical: '/blog/categories',
})

export default async function CategoriesIndexPage() {
    const categories = await listActiveCategoriesWithCounts()

    return (
        <div className='container py-12'>
            <WebPageSchema
                name='Blog Categories'
                url={`${seoConfig.siteUrl}/blog/categories`}
                description='Browse our blog posts by category. Find articles on web development, design, technology, and more.'
            />
            <div className='mb-12'>
                <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
                    Categories
                </h1>
                <p className='text-muted-foreground mt-4 text-lg'>
                    Browse articles by topic
                </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/blog/categories/${cat.slug}`}
                        className='border-border bg-card hover:bg-accent focus-visible:ring-ring group flex items-center justify-between rounded-lg border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none'
                    >
                        <div>
                            <div className='text-lg font-medium'>
                                {cat.name}
                            </div>
                            {typeof cat.count === 'number' && (
                                <div className='text-muted-foreground text-sm'>
                                    {cat.count} post{cat.count === 1 ? '' : 's'}
                                </div>
                            )}
                        </div>
                        <svg
                            className='text-muted-foreground h-5 w-5 transition-transform group-hover:translate-x-1'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9 5l7 7-7 7'
                            />
                        </svg>
                    </Link>
                ))}
            </div>
        </div>
    )
}
