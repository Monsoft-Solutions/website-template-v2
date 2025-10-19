import { ArticleSchema } from '@workspace/seo/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { ContainerLayout } from '@/components/ContainerLayout.component'
import { PostMarkdown } from '@/components/blog/PostMarkdown.component'
import { TableOfContents } from '@/components/blog/TableOfContents.component'
import { Breadcrumbs } from '@/components/shared'
import { getPublishedPostBySlug } from '@/lib/queries/blog/post-detail.query'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'
import { extractTableOfContents } from '@/lib/utils/extract-toc.util'

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

    const tableOfContents = extractTableOfContents(post.content)

    return (
        <ContainerLayout as='article' size='lg' className='py-16 lg:py-20'>
            <div className='mb-16'>
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: post.title },
                    ]}
                    showBackground={true}
                />
            </div>

            {/* Two column layout: content + TOC */}
            <div className='grid grid-cols-1 gap-12 lg:grid-cols-[1fr_250px]'>
                {/* Main content column */}
                <div className='min-w-0'>
                    <header className='mb-16 space-y-8'>
                        <h1 className='text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight'>
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className='text-muted-foreground text-lg leading-relaxed sm:text-xl sm:leading-relaxed'>
                                {post.excerpt}
                            </p>
                        )}

                        <div className='text-muted-foreground border-border/40 flex flex-wrap items-center gap-4 border-t pt-8 text-sm font-normal'>
                            {post.author && (
                                <span className='inline-flex items-center font-medium'>
                                    <span className='sr-only'>Written by </span>
                                    {post.author.name}
                                </span>
                            )}
                            {publishedDate && (
                                <>
                                    <span
                                        className='text-muted-foreground/30'
                                        aria-hidden='true'
                                    >
                                        •
                                    </span>
                                    <time
                                        dateTime={post.publishedAt ?? undefined}
                                    >
                                        <span className='sr-only'>
                                            Published on{' '}
                                        </span>
                                        {publishedDate}
                                    </time>
                                </>
                            )}
                            {post.readingTime && (
                                <>
                                    <span
                                        className='text-muted-foreground/30'
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
                        <figure className='relative mb-16 aspect-[16/9] w-full overflow-hidden rounded-lg'>
                            <Image
                                src={post.featuredImage.url}
                                alt={post.featuredImage.alt}
                                fill
                                className='object-cover'
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px'
                                priority
                                placeholder={
                                    post.featuredImage.blurDataUrl
                                        ? 'blur'
                                        : 'empty'
                                }
                                blurDataURL={
                                    post.featuredImage.blurDataUrl ?? undefined
                                }
                            />
                        </figure>
                    )}

                    <div className='prose prose-neutral dark:prose-invert prose-lg prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-3xl prose-h1:leading-tight prose-h2:text-2xl prose-h2:leading-snug prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:leading-snug prose-h3:mt-10 prose-h3:mb-4 prose-p:leading-relaxed prose-p:mb-6 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-primary/20 prose-blockquote:bg-muted/30 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-pre:border-border/40 max-w-none'>
                        <PostMarkdown content={post.content} />
                    </div>

                    <ArticleSchema
                        type='BlogPosting'
                        headline={post.title}
                        description={post.excerpt ?? undefined}
                        author={post.author?.name ?? 'Unknown'}
                        datePublished={
                            post.publishedAt ?? new Date().toISOString()
                        }
                        dateModified={post.publishedAt ?? undefined}
                        image={post.featuredImage?.url}
                        mainEntityOfPage={`${seoConfig.siteUrl}/blog/${post.slug}`}
                        publisher={{
                            name:
                                seoConfig.organization?.name ??
                                seoConfig.siteName,
                            logo: seoConfig.organization?.logo,
                            url:
                                seoConfig.organization?.url ??
                                seoConfig.siteUrl,
                        }}
                    />

                    {(post.categories.length > 0 || post.tags.length > 0) && (
                        <footer className='border-border/30 mt-20 border-t pt-12'>
                            <h2 className='text-foreground mb-8 text-sm font-medium tracking-wide'>
                                Topics
                            </h2>
                            <div className='flex flex-wrap gap-3'>
                                {post.categories.map((c) => (
                                    <Link
                                        key={c.id}
                                        href={`/blog/categories/${c.slug}`}
                                        className='bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200'
                                    >
                                        {c.name}
                                    </Link>
                                ))}
                                {post.tags.map((t) => (
                                    <Link
                                        key={t.id}
                                        href={`/blog/tags/${t.slug}`}
                                        className='bg-muted/60 text-muted-foreground hover:bg-muted/80 hover:text-foreground inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200'
                                    >
                                        #{t.name}
                                    </Link>
                                ))}
                            </div>
                        </footer>
                    )}
                </div>

                {/* Sidebar: Sticky TOC */}
                <aside className='hidden lg:block'>
                    <div className='sticky top-24'>
                        <TableOfContents headings={tableOfContents} />
                    </div>
                </aside>
            </div>
        </ContainerLayout>
    )
}
