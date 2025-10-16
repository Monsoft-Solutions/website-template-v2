import { WebPageSchema } from '@workspace/seo/react'
import { Hash } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { ContainerLayout } from '@/components/ContainerLayout.component'
import { BlogHeroSection } from '@/components/blog/BlogHeroSection.component'
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
        <ContainerLayout as='main' className='py-16 lg:py-20'>
            <WebPageSchema
                name='Blog Tags'
                url={`${seoConfig.siteUrl}/blog/tags`}
                description='Browse our blog posts by tag. Discover content on specific topics and technologies.'
            />

            <div className='mb-16'>
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: 'Tags' },
                    ]}
                    showBackground={false}
                />
            </div>

            <BlogHeroSection
                title='Tags'
                description='Explore articles by tag and discover content on specific topics and technologies that interest you.'
                navigationLinks={[
                    {
                        href: '/blog',
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
                                    d='M13 10V3L4 14h7v7l9-11h-7z'
                                />
                            </svg>
                        ),
                        text: 'View All Posts',
                    },
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
                ]}
            />

            <div className='flex flex-wrap gap-4'>
                {sortedTags.map((tag, index) => (
                    <Link
                        key={tag.id}
                        href={`/blog/tags/${tag.slug}`}
                        style={{
                            animationDelay: `${index * 0.02}s`,
                            animationFillMode: 'backwards',
                        }}
                        className='bg-card hover:bg-card/80 focus-visible:ring-ring focus-visible:ring-offset-background group animate-fade-in inline-flex items-center gap-3 rounded-full border-0 px-5 py-3 transition-all duration-200 hover:shadow-sm focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none'
                    >
                        <Hash
                            className='text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors duration-200'
                            aria-hidden='true'
                        />
                        <span className='text-foreground group-hover:text-foreground/90 font-medium transition-colors duration-200'>
                            {tag.name}
                        </span>
                        {typeof tag.count === 'number' && (
                            <span className='bg-muted/60 text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium'>
                                {tag.count}
                            </span>
                        )}
                    </Link>
                ))}
            </div>
        </ContainerLayout>
    )
}
