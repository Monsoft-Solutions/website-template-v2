import Link from 'next/link'

import { listActiveTagsWithCounts } from '@/lib/blog/taxonomy.query'

export default async function TagsIndexPage() {
    const tags = await listActiveTagsWithCounts()

    return (
        <div className='container py-12'>
            <div className='mb-12'>
                <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
                    Tags
                </h1>
                <p className='text-muted-foreground mt-4 text-lg'>
                    Browse articles by tag
                </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {tags.map((tag) => (
                    <Link
                        key={tag.id}
                        href={`/blog/tags/${tag.slug}`}
                        className='border-border bg-card hover:bg-accent focus-visible:ring-ring group flex items-center justify-between rounded-lg border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none'
                    >
                        <div>
                            <div className='text-lg font-medium'>
                                {tag.name}
                            </div>
                            {typeof tag.count === 'number' && (
                                <div className='text-muted-foreground text-sm'>
                                    {tag.count} post{tag.count === 1 ? '' : 's'}
                                </div>
                            )}
                        </div>
                        <svg
                            className='text-muted-foreground h-5 w-5 transition-transform group-hover:translate-x-1'
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
                    </Link>
                ))}
            </div>
        </div>
    )
}
