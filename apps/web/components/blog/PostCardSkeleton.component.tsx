/**
 * PostCardSkeleton Component
 *
 * A beautiful skeleton loader that matches the PostCard layout.
 * Features a minimalistic design with smooth shimmer animations
 * for a pleasant loading experience.
 */

export function PostCardSkeleton() {
    return (
        <article
            className='border-border bg-card relative flex flex-col overflow-hidden rounded-lg border'
            aria-busy='true'
            aria-label='Loading post'
        >
            {/* Featured Image Skeleton */}
            <div className='bg-muted relative aspect-[16/9] w-full overflow-hidden'>
                <div className='via-muted-foreground/5 animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent to-transparent' />
            </div>

            {/* Content Skeleton */}
            <div className='flex flex-1 flex-col p-6'>
                {/* Meta information skeleton */}
                <div className='mb-3 flex items-center gap-3'>
                    <div className='bg-muted h-4 w-24 animate-pulse rounded' />
                    <span
                        className='text-muted-foreground/40'
                        aria-hidden='true'
                    >
                        •
                    </span>
                    <div className='bg-muted h-4 w-20 animate-pulse rounded' />
                    <span
                        className='text-muted-foreground/40'
                        aria-hidden='true'
                    >
                        •
                    </span>
                    <div className='bg-muted h-4 w-16 animate-pulse rounded' />
                </div>

                {/* Title skeleton */}
                <div className='mb-2 space-y-2'>
                    <div className='bg-muted h-6 w-full animate-pulse rounded' />
                    <div className='bg-muted h-6 w-4/5 animate-pulse rounded' />
                </div>

                {/* Excerpt skeleton */}
                <div className='mb-4 space-y-2'>
                    <div className='bg-muted h-4 w-full animate-pulse rounded' />
                    <div className='bg-muted h-4 w-full animate-pulse rounded' />
                    <div className='bg-muted h-4 w-3/4 animate-pulse rounded' />
                </div>

                {/* Read more skeleton */}
                <div className='mt-auto'>
                    <div className='bg-muted h-4 w-20 animate-pulse rounded' />
                </div>
            </div>
        </article>
    )
}

/**
 * PostCardSkeletonGroup Component
 *
 * Renders a group of skeleton cards with staggered animation delays
 * for a more natural loading appearance.
 */
type PostCardSkeletonGroupProps = {
    count?: number
    className?: string
}

export function PostCardSkeletonGroup({
    count = 6,
    className = '',
}: PostCardSkeletonGroupProps) {
    return (
        <div
            className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
        >
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'backwards',
                    }}
                    className='animate-fade-in'
                >
                    <PostCardSkeleton />
                </div>
            ))}
        </div>
    )
}
