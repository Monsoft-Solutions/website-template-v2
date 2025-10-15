import { WebPageSchema } from '@workspace/seo/react'
import type { Metadata } from 'next'
import { cache } from 'react'

import { InfinitePostList } from '@/components/blog/InfinitePostList.component'
import { getPublishedPostCardsPage } from '@/lib/blog/post-list.query'
import { getActiveTagBySlug } from '@/lib/blog/taxonomy.query'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

type PageProps = {
    params: Promise<{ slug: string }>
}

const getCachedTagBySlug = cache(async (slug: string) =>
    getActiveTagBySlug(slug)
)

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params
    const tag = await getCachedTagBySlug(slug)

    if (!tag) {
        return { title: 'Tag not found' }
    }

    return toNextMetadata(seoConfig, {
        title: `${tag.name} Articles`,
        description: `Explore articles tagged with ${tag.name}. Find insights and tutorials on this topic.`,
        canonical: `/blog/tags/${tag.slug}`,
    })
}

export default async function TagDetailPage({ params }: PageProps) {
    const { slug } = await params

    const tag = await getCachedTagBySlug(slug)
    if (!tag) {
        return (
            <div className='container py-12'>
                <h1 className='text-2xl font-semibold'>Tag not found</h1>
                <p className='text-muted-foreground mt-2'>
                    The tag you are looking for does not exist.
                </p>
            </div>
        )
    }

    const pageSize = 12
    const { items: initialPosts, nextCursor } = await getPublishedPostCardsPage(
        {
            limit: pageSize,
            tagSlug: slug,
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
                name={`${tag.name} Articles`}
                url={`${seoConfig.siteUrl}/blog/tags/${tag.slug}`}
                description={`Explore articles tagged with ${tag.name}. Find insights and tutorials on this topic.`}
            />
            <div className='mb-12'>
                <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
                    {tag.name}
                </h1>
                <p className='text-muted-foreground mt-4 text-lg'>
                    Posts with this tag
                </p>
            </div>

            <InfinitePostList
                initialPosts={initialPosts}
                initialCursor={encodedCursor}
                pageSize={pageSize}
                tagSlug={slug}
            />
        </div>
    )
}
