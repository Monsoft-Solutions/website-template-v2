import type { BlogPostCard } from '@/types/blog/post-card.type'

import { PostCard } from './PostCard.component'

type PostListProps = {
    posts: BlogPostCard[]
    className?: string
}

export function PostList({ posts, className = '' }: PostListProps) {
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
        <div
            className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
        >
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
