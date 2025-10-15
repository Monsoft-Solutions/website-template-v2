import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { PostMarkdown } from '@/components/blog/PostMarkdown.component'
import { getPublishedPostBySlug } from '@/lib/blog/post-detail.query'

type PageProps = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await getPublishedPostBySlug(slug)
    if (!post) return { title: 'Post not found' }

    return {
        title: post.title,
        description: post.excerpt ?? undefined,
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = await getPublishedPostBySlug(slug)
    if (!post) notFound()

    const publishedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null

    return (
        <article className='prose prose-neutral dark:prose-invert container max-w-3xl py-12'>
            <header className='not-prose mb-8'>
                <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
                    {post.title}
                </h1>
                <div className='text-muted-foreground mt-3 flex flex-wrap items-center gap-3 text-sm'>
                    {post.author && <span>{post.author.name}</span>}
                    {publishedDate && (
                        <>
                            <span aria-hidden='true'>•</span>
                            <time dateTime={post.publishedAt ?? undefined}>
                                {publishedDate}
                            </time>
                        </>
                    )}
                    {post.readingTime && (
                        <>
                            <span aria-hidden='true'>•</span>
                            <span>{post.readingTime} min read</span>
                        </>
                    )}
                </div>
            </header>

            {post.featuredImage && (
                <div className='not-prose relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-lg'>
                    <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px'
                        placeholder={
                            post.featuredImage.blurDataUrl ? 'blur' : 'empty'
                        }
                        blurDataURL={
                            post.featuredImage.blurDataUrl ?? undefined
                        }
                    />
                </div>
            )}

            <PostMarkdown content={post.content} />

            {(post.categories.length > 0 || post.tags.length > 0) && (
                <footer className='not-prose mt-12 border-t pt-6'>
                    <div className='flex flex-wrap gap-2 text-sm'>
                        {post.categories.map((c) => (
                            <span
                                key={c.id}
                                className='bg-muted text-muted-foreground rounded-md px-2 py-1'
                            >
                                {c.name}
                            </span>
                        ))}
                        {post.tags.map((t) => (
                            <span
                                key={t.id}
                                className='bg-muted text-muted-foreground rounded-md px-2 py-1'
                            >
                                #{t.name}
                            </span>
                        ))}
                    </div>
                </footer>
            )}
        </article>
    )
}
