import { WebPageSchema } from '@workspace/seo/react'
import type { Metadata } from 'next'
import { cache } from 'react'

import { ContainerLayout } from '@/components/ContainerLayout.component'
import { InfinitePostList } from '@/components/blog/InfinitePostList.component'
import { Breadcrumbs } from '@/components/shared'
import { getPublishedPostCardsPage } from '@/lib/blog/post-list.query'
import { getActiveCategoryBySlug } from '@/lib/blog/taxonomy.query'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

type PageProps = {
    params: Promise<{ slug: string }>
}

const getCachedCategoryBySlug = cache(async (slug: string) =>
    getActiveCategoryBySlug(slug)
)

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params
    const category = await getCachedCategoryBySlug(slug)

    if (!category) {
        return { title: 'Category not found' }
    }

    return toNextMetadata(seoConfig, {
        title: `${category.name} Articles`,
        description: `Browse all articles in the ${category.name} category. Stay updated with our latest insights and tutorials.`,
        canonical: `/blog/categories/${category.slug}`,
    })
}

export default async function CategoryDetailPage({ params }: PageProps) {
    const { slug } = await params

    const category = await getCachedCategoryBySlug(slug)
    if (!category) {
        return (
            <ContainerLayout className='py-12'>
                <h1 className='text-2xl font-semibold'>Category not found</h1>
                <p className='text-muted-foreground mt-2'>
                    The category you are looking for does not exist.
                </p>
            </ContainerLayout>
        )
    }

    const pageSize = 12
    const { items: initialPosts, nextCursor } = await getPublishedPostCardsPage(
        {
            limit: pageSize,
            categorySlug: slug,
        }
    )

    const encodedCursor = nextCursor
        ? Buffer.from(
              JSON.stringify({
                  publishedAt: nextCursor.publishedAt.toISOString(),
                  id: nextCursor.id,
              })
          ).toString('base64')
        : undefined

    return (
        <ContainerLayout className='py-12 lg:py-16'>
            <WebPageSchema
                name={`${category.name} Articles`}
                url={`${seoConfig.siteUrl}/blog/categories/${category.slug}`}
                description={`Browse all articles in the ${category.name} category. Stay updated with our latest insights and tutorials.`}
            />

            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Categories', href: '/blog/categories' },
                    { label: category.name },
                ]}
            />

            <header className='mb-12 space-y-6'>
                <div className='space-y-4'>
                    <div className='flex flex-wrap items-center gap-3'>
                        <h1 className='text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl'>
                            {category.name}
                        </h1>
                        <span className='bg-primary/10 text-primary inline-flex h-8 items-center rounded-full px-3 text-sm font-semibold'>
                            Category
                        </span>
                    </div>
                    <p className='text-muted-foreground max-w-2xl text-lg leading-relaxed sm:text-xl'>
                        Posts in this category
                    </p>
                </div>
            </header>

            <InfinitePostList
                initialPosts={initialPosts}
                initialCursor={encodedCursor}
                pageSize={pageSize}
                categorySlug={slug}
            />
        </ContainerLayout>
    )
}
