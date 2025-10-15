import { ArrowRight } from 'lucide-react'
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
        <article className='group border-border/60 bg-card hover:border-border hover:shadow-primary/5 focus-within:ring-ring focus-within:ring-offset-background relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 hover:shadow-lg'>
            <Link
                href={`/blog/${post.slug}`}
                aria-labelledby={titleId}
                className='absolute inset-0 z-10 focus:outline-none'
            >
                <span className='sr-only'>Read article: {post.title}</span>
            </Link>

            {post.featuredImage && (
                <div className='bg-muted relative aspect-[16/9] w-full overflow-hidden'>
                    <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt}
                        fill
                        className='object-cover transition-all duration-500 ease-out group-hover:scale-105'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        placeholder={
                            post.featuredImage.blurDataUrl ? 'blur' : 'empty'
                        }
                        blurDataURL={
                            post.featuredImage.blurDataUrl ?? undefined
                        }
                    />
                    {/* Subtle overlay for better text contrast */}
                    <div className='from-card/10 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                </div>
            )}

            <div className='flex flex-1 flex-col gap-4 p-6'>
                {/* Meta information */}
                <div className='text-muted-foreground flex flex-wrap items-center gap-2 text-xs font-medium'>
                    {post.author && (
                        <span className='inline-flex items-center'>
                            {post.author.name}
                        </span>
                    )}
                    {publishedDate && (
                        <>
                            <span
                                className='text-muted-foreground/40'
                                aria-hidden='true'
                            >
                                •
                            </span>
                            <time
                                dateTime={post.publishedAt ?? undefined}
                                className='inline-flex items-center'
                            >
                                {publishedDate}
                            </time>
                        </>
                    )}
                    {post.readingTime && (
                        <>
                            <span
                                className='text-muted-foreground/40'
                                aria-hidden='true'
                            >
                                •
                            </span>
                            <span className='inline-flex items-center'>
                                {post.readingTime} min read
                            </span>
                        </>
                    )}
                </div>

                {/* Title */}
                <h2
                    id={titleId}
                    className='text-foreground group-hover:text-primary text-xl leading-tight font-bold tracking-tight transition-colors duration-300 lg:text-2xl'
                >
                    {post.title}
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className='text-muted-foreground line-clamp-3 text-sm leading-relaxed'>
                        {post.excerpt}
                    </p>
                )}

                {/* Read more link */}
                <div className='mt-auto flex items-center gap-2'>
                    <span className='text-primary text-sm font-semibold transition-colors duration-300 group-hover:underline'>
                        Read article
                    </span>
                    <ArrowRight
                        className='text-primary h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
                        aria-hidden='true'
                    />
                </div>
            </div>
        </article>
    )
}
