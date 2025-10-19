/**
 * BlogCTA Component
 *
 * Extensible call-to-action component for blog posts.
 * Supports multiple content variants and two visual styles.
 *
 * Features:
 * - Load predefined CTA content via ctaId
 * - Pass custom content directly
 * - Two visual variants: inline (accent box) and footer (large section)
 * - Responsive design with proper spacing
 *
 * @example
 * ```tsx
 * // Use predefined CTA
 * <BlogCTA variant="inline" ctaId="consultation" />
 *
 * // Use custom content
 * <BlogCTA
 *   variant="footer"
 *   content={{
 *     id: "custom",
 *     heading: "Custom Heading",
 *     description: "Custom description",
 *     primaryButton: { text: "Click Me", href: "/page" }
 *   }}
 * />
 * ```
 */
'use client'

import { Button } from '@workspace/ui/components/button'
import { ArrowRight, Mail, MessageCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'

import {
    defaultCTAContent,
    getCTAContentById,
} from '@/lib/data/blog-cta-content'
import type { BlogCTAProps } from '@/lib/types/blog/blog-cta.type'

/**
 * Map icon names to lucide-react components
 */
function getIcon(iconName?: string) {
    if (!iconName) return null

    const iconProps = { className: 'ml-2 h-4 w-4' }

    switch (iconName) {
        case 'arrow-right':
            return <ArrowRight {...iconProps} />
        case 'mail':
            return <Mail {...iconProps} />
        case 'message-circle':
            return <MessageCircle {...iconProps} />
        case 'sparkles':
            return <Sparkles {...iconProps} />
        default:
            return null
    }
}

export function BlogCTA({ variant, content, ctaId }: BlogCTAProps) {
    // Determine which content to use (priority: content prop > ctaId > default)
    const ctaContent =
        content ?? (ctaId ? getCTAContentById(ctaId) : defaultCTAContent)

    // If no content found, log error and return null
    if (!ctaContent) {
        console.error(
            `BlogCTA: No content found for ctaId "${ctaId}". Component will not render.`
        )
        return null
    }

    const primaryIcon = getIcon(ctaContent.primaryButton.iconName)

    if (variant === 'inline') {
        return (
            <aside className='bg-accent/30 border-accent/40 my-12 rounded-lg border p-8'>
                <div className='flex flex-col gap-6'>
                    <div>
                        <h3 className='text-foreground mb-2 text-xl font-semibold'>
                            {ctaContent.heading}
                        </h3>
                        <p className='text-muted-foreground text-base leading-relaxed'>
                            {ctaContent.description}
                        </p>
                    </div>
                    <div className='flex flex-col gap-3 sm:flex-row'>
                        <Button asChild size='lg'>
                            <Link href={ctaContent.primaryButton.href}>
                                {ctaContent.primaryButton.text}
                                {primaryIcon}
                            </Link>
                        </Button>
                        {ctaContent.secondaryButton && (
                            <Button
                                asChild
                                size='lg'
                                variant={
                                    ctaContent.secondaryButton.variant ??
                                    'outline'
                                }
                            >
                                <Link href={ctaContent.secondaryButton.href}>
                                    {ctaContent.secondaryButton.text}
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </aside>
        )
    }

    // Footer variant
    return (
        <section className='bg-primary/5 border-border/30 mt-20 rounded-lg border p-12'>
            <div className='mx-auto max-w-3xl text-center'>
                <h2 className='text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl'>
                    {ctaContent.heading}
                </h2>
                <p className='text-muted-foreground mb-8 text-lg leading-relaxed'>
                    {ctaContent.description}
                </p>
                <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                    <Button asChild size='lg'>
                        <Link href={ctaContent.primaryButton.href}>
                            {ctaContent.primaryButton.text}
                            {primaryIcon}
                        </Link>
                    </Button>
                    {ctaContent.secondaryButton && (
                        <Button
                            asChild
                            size='lg'
                            variant={
                                ctaContent.secondaryButton.variant ?? 'outline'
                            }
                        >
                            <Link href={ctaContent.secondaryButton.href}>
                                {ctaContent.secondaryButton.text}
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </section>
    )
}
