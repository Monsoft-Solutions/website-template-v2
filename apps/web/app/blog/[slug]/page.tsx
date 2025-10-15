import { ArticleSchema } from '@workspace/seo/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { Breadcrumbs } from '@/components/blog/Breadcrumbs.component'
import { PostMarkdown } from '@/components/blog/PostMarkdown.component'
import { getPublishedPostBySlug } from '@/lib/blog/post-detail.query'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

type PageProps = {
    params: Promise<{ slug: string }>
}

const getCachedPostBySlug = cache(async (slug: string) =>
    getPublishedPostBySlug(slug)
)

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await getCachedPostBySlug(slug)
    if (!post) return { title: 'Post not found' }

    return toNextMetadata(seoConfig, {
        title: post.title,
        description: post.excerpt ?? undefined,
        openGraph: {
            type: 'article',
            images: post.featuredImage
                ? [
                      {
                          url: post.featuredImage.url,
                          alt: post.featuredImage.alt,
                      },
                  ]
                : undefined,
        },
        canonical: `/blog/${post.slug}`,
    })
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = await getCachedPostBySlug(slug)
    if (!post) notFound()

    const publishedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null

    return (
        <article className='prose prose-neutral dark:prose-invert container max-w-3xl py-12 lg:py-16'>
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Blog', href: '/blog' },
                    { label: post.title },
                ]}
            />

            <header className='not-prose mb-12 space-y-6'>
                <h1 className='text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl'>
                    {post.title}
                </h1>

                {post.excerpt && (
                    <p className='text-muted-foreground text-lg leading-relaxed sm:text-xl'>
                        {post.excerpt}
                    </p>
                )}

                <div className='text-muted-foreground flex flex-wrap items-center gap-3 text-sm font-medium'>
                    {post.author && (
                        <span className='inline-flex items-center'>
                            <span className='sr-only'>Written by </span>
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
                            <time dateTime={post.publishedAt ?? undefined}>
                                <span className='sr-only'>Published on </span>
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
                            <span>{post.readingTime} min read</span>
                        </>
                    )}
                </div>
            </header>

            {post.featuredImage && (
                <figure className='not-prose border-border/60 relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-xl border shadow-lg'>
                    <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px'
                        priority
                        placeholder={
                            post.featuredImage.blurDataUrl ? 'blur' : 'empty'
                        }
                        blurDataURL={
                            post.featuredImage.blurDataUrl ?? undefined
                        }
                    />
                </figure>
            )}

            <PostMarkdown content={post.content} />

            <ArticleSchema
                type='BlogPosting'
                headline={post.title}
                description={post.excerpt ?? undefined}
                author={post.author?.name ?? 'Unknown'}
                datePublished={post.publishedAt ?? new Date().toISOString()}
                dateModified={post.publishedAt ?? undefined}
                image={post.featuredImage?.url}
                mainEntityOfPage={`${seoConfig.siteUrl}/blog/${post.slug}`}
                publisher={{
                    name: seoConfig.organization?.name ?? seoConfig.siteName,
                    logo: seoConfig.organization?.logo,
                    url: seoConfig.organization?.url ?? seoConfig.siteUrl,
                }}
            />

            {(post.categories.length > 0 || post.tags.length > 0) && (
                <footer className='not-prose border-border/60 mt-16 border-t pt-8'>
                    <h2 className='text-foreground mb-6 text-sm font-semibold tracking-wider uppercase'>
                        Topics
                    </h2>
                    <div className='flex flex-wrap gap-3'>
                        {post.categories.map((c) => (
                            <Link
                                key={c.id}
                                href={`/blog/categories/${c.slug}`}
                                className='bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200'
                            >
                                {c.name}
                            </Link>
                        ))}
                        {post.tags.map((t) => (
                            <Link
                                key={t.id}
                                href={`/blog/tags/${t.slug}`}
                                className='bg-muted text-muted-foreground hover:bg-muted/80 inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200'
                            >
                                #{t.name}
                            </Link>
                        ))}
                    </div>
                </footer>
            )}
        </article>
    )
}
