import { WebPageSchema } from '@workspace/seo/react'
import type { Metadata } from 'next'
import { cache } from 'react'

import { ContainerLayout } from '@/components/ContainerLayout.component'
import { Breadcrumbs } from '@/components/blog/Breadcrumbs.component'
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
            <ContainerLayout className='py-12'>
                <h1 className='text-2xl font-semibold'>Tag not found</h1>
                <p className='text-muted-foreground mt-2'>
                    The tag you are looking for does not exist.
                </p>
            </ContainerLayout>
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
        <ContainerLayout className='py-12 lg:py-16'>
            <WebPageSchema
                name={`${tag.name} Articles`}
                url={`${seoConfig.siteUrl}/blog/tags/${tag.slug}`}
                description={`Explore articles tagged with ${tag.name}. Find insights and tutorials on this topic.`}
            />

            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Tags', href: '/blog/tags' },
                    { label: tag.name },
                ]}
            />

            <header className='mb-12 space-y-6'>
                <div className='space-y-4'>
                    <div className='flex flex-wrap items-center gap-3'>
                        <span
                            className='text-muted-foreground text-3xl sm:text-4xl lg:text-5xl'
                            aria-hidden='true'
                        >
                            #
                        </span>
                        <h1 className='text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl'>
                            {tag.name}
                        </h1>
                        <span className='bg-muted text-muted-foreground inline-flex h-8 items-center rounded-full px-3 text-sm font-semibold'>
                            Tag
                        </span>
                    </div>
                    <p className='text-muted-foreground max-w-2xl text-lg leading-relaxed sm:text-xl'>
                        Posts with this tag
                    </p>
                </div>
            </header>

            <InfinitePostList
                initialPosts={initialPosts}
                initialCursor={encodedCursor}
                pageSize={pageSize}
                tagSlug={slug}
            />
        </ContainerLayout>
    )
}
