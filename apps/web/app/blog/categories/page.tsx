import { WebPageSchema } from '@workspace/seo/react'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/blog/Breadcrumbs.component'
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
        <div className='container py-12 lg:py-16'>
            <WebPageSchema
                name='Blog Categories'
                url={`${seoConfig.siteUrl}/blog/categories`}
                description='Browse our blog posts by category. Find articles on web development, design, technology, and more.'
            />

            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Categories' },
                ]}
            />

            <header className='mb-12 space-y-6'>
                <div className='space-y-4'>
                    <h1 className='text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl'>
                        Categories
                    </h1>
                    <p className='text-muted-foreground max-w-2xl text-lg leading-relaxed sm:text-xl'>
                        Browse articles by topic
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

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {categories.map((cat, index) => (
                    <Link
                        key={cat.id}
                        href={`/blog/categories/${cat.slug}`}
                        style={{
                            animationDelay: `${index * 0.05}s`,
                            animationFillMode: 'backwards',
                        }}
                        className='border-border/60 bg-card hover:border-border hover:shadow-primary/5 focus-visible:ring-ring focus-visible:ring-offset-background group animate-fade-in flex items-center justify-between rounded-xl border p-6 transition-all duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                    >
                        <div className='flex-1'>
                            <h2 className='text-foreground group-hover:text-primary mb-1 text-xl font-semibold transition-colors duration-300'>
                                {cat.name}
                            </h2>
                            {typeof cat.count === 'number' && (
                                <p className='text-muted-foreground text-sm font-medium'>
                                    {cat.count} post{cat.count === 1 ? '' : 's'}
                                </p>
                            )}
                        </div>
                        <ArrowRight
                            className='text-muted-foreground group-hover:text-primary ml-4 h-5 w-5 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1'
                            aria-hidden='true'
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}
