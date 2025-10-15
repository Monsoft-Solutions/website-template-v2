'use client'

import { useInfiniteBlogPosts } from '@/hooks/useInfiniteBlogPosts.hook'
import type { BlogPostCard } from '@/lib/types/blog/post-card.type'

import { PostCard } from './PostCard.component'

type InfinitePostListProps = {
    initialPosts: BlogPostCard[]
    initialCursor?: string
    className?: string
    pageSize?: number
    categorySlug?: string
    tagSlug?: string
}

export function InfinitePostList({
    initialPosts,
    initialCursor,
    className = '',
    pageSize = 12,
    categorySlug,
    tagSlug,
}: InfinitePostListProps) {
    const { posts, isLoading, hasMore, observerRef } = useInfiniteBlogPosts({
        initialPosts,
        pageSize,
        initialCursor,
        categorySlug,
        tagSlug,
    })

    if (posts.length === 0) {
        return (
            <div className='flex min-h-[400px] items-center justify-center'>
                <div className='text-center'>
                    <h2 className='text-muted-foreground text-2xl font-semibold'>
                        No posts found
                    </h2>
                    <p className='text-muted-foreground mt-2'>
                        Check back later for new content!
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='space-y-8'>
            <div
                className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
            >
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Loading indicator */}
            {isLoading && (
                <div className='flex justify-center py-8'>
                    <div className='flex items-center gap-2'>
                        <div className='bg-primary h-2 w-2 animate-pulse rounded-full' />
                        <div
                            className='bg-primary h-2 w-2 animate-pulse rounded-full'
                            style={{ animationDelay: '0.2s' }}
                        />
                        <div
                            className='bg-primary h-2 w-2 animate-pulse rounded-full'
                            style={{ animationDelay: '0.4s' }}
                        />
                    </div>
                </div>
            )}

            {/* Intersection observer trigger */}
            {hasMore && !isLoading && (
                <div
                    ref={observerRef}
                    className='flex justify-center py-8'
                    aria-label='Loading more posts'
                />
            )}

            {/* End of list message */}
            {!hasMore && posts.length > 0 && (
                <div className='text-muted-foreground flex justify-center py-8 text-sm'>
                    You&apos;ve reached the end of the list
                </div>
            )}
        </div>
    )
}
