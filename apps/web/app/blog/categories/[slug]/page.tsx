import { WebPageSchema } from '@workspace/seo/react'
import type { Metadata } from 'next'
import { cache } from 'react'

import { InfinitePostList } from '@/components/blog/InfinitePostList.component'
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
            <div className='container py-12'>
                <h1 className='text-2xl font-semibold'>Category not found</h1>
                <p className='text-muted-foreground mt-2'>
                    The category you are looking for does not exist.
                </p>
            </div>
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
        <div className='container py-12'>
            <WebPageSchema
                name={`${category.name} Articles`}
                url={`${seoConfig.siteUrl}/blog/categories/${category.slug}`}
                description={`Browse all articles in the ${category.name} category. Stay updated with our latest insights and tutorials.`}
            />
            <div className='mb-12'>
                <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
                    {category.name}
                </h1>
                <p className='text-muted-foreground mt-4 text-lg'>
                    Posts in this category
                </p>
            </div>

            <InfinitePostList
                initialPosts={initialPosts}
                initialCursor={encodedCursor}
                pageSize={pageSize}
                categorySlug={slug}
            />
        </div>
    )
}
