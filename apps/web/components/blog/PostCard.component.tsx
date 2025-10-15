import Image from 'next/image'
import Link from 'next/link'

import type { BlogPostCard } from '@/types/blog/post-card.type'

type PostCardProps = {
    post: BlogPostCard
}

export function PostCard({ post }: PostCardProps) {
    const publishedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null

    const titleId = `post-title-${post.id}`

    return (
        <article className='group border-border bg-card relative flex flex-col overflow-hidden rounded-lg border transition-shadow hover:shadow-lg'>
            <Link
                href={`/blog/${post.slug}`}
                aria-labelledby={titleId}
                className='absolute inset-0 z-10'
            />

            {post.featuredImage && (
                <div className='bg-muted relative aspect-[16/9] w-full overflow-hidden'>
                    <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt}
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        placeholder={
                            post.featuredImage.blurDataUrl ? 'blur' : 'empty'
                        }
                        blurDataURL={
                            post.featuredImage.blurDataUrl ?? undefined
                        }
                    />
                </div>
            )}

            <div className='flex flex-1 flex-col p-6'>
                <div className='text-muted-foreground mb-3 flex items-center gap-3 text-sm'>
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

                <h2
                    id={titleId}
                    className='group-hover:text-primary mb-2 text-xl font-semibold tracking-tight transition-colors'
                >
                    {post.title}
                </h2>

                {post.excerpt && (
                    <p className='text-muted-foreground mb-4 line-clamp-3'>
                        {post.excerpt}
                    </p>
                )}

                <span className='text-primary mt-auto inline-flex items-center text-sm font-medium transition-colors group-hover:underline'>
                    Read more
                    <svg
                        className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1'
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
                </span>
            </div>
        </article>
    )
}
