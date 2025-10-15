import type { Metadata } from 'next'

import { InfinitePostList } from '@/components/blog/InfinitePostList.component'
import { getPublishedPostCardsPage } from '@/lib/blog/post-list.query'
import { getActiveTagBySlug } from '@/lib/blog/taxonomy.query'

type PageProps = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params
    const tag = await getActiveTagBySlug(slug)
    return {
        title: tag ? `${tag.name} · Tags` : 'Tag',
        description: tag ? `Posts tagged ${tag.name}.` : 'Tag posts',
    }
}

export default async function TagDetailPage({ params }: PageProps) {
    const { slug } = await params

    const tag = await getActiveTagBySlug(slug)
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
