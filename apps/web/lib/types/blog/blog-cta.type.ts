/**
 * Blog CTA Types
 *
 * Type definitions for the blog CTA system that supports
 * multiple content variants and extensible configurations.
 */

export type BlogCTAContent = {
    /**
     * Unique identifier for this CTA content
     */
    readonly id: string

    /**
     * Main heading text for the CTA
     */
    readonly heading: string

    /**
     * Description or subheading text
     */
    readonly description: string

    /**
     * Primary call-to-action button
     */
    readonly primaryButton: {
        readonly text: string
        readonly href: string
        readonly iconName?: string
    }

    /**
     * Optional secondary button
     */
    readonly secondaryButton?: {
        readonly text: string
        readonly href: string
        readonly variant?: 'outline' | 'ghost'
    }
}

export type BlogCTAProps = {
    /**
     * Visual variant of the CTA
     * - inline: Accent box within content flow
     * - footer: Large prominent section at end of post
     */
    readonly variant: 'inline' | 'footer'

    /**
     * Custom CTA content to display
     * Takes precedence over ctaId
     */
    readonly content?: BlogCTAContent

    /**
     * ID of predefined CTA content from configuration
     * Used if content prop is not provided
     */
    readonly ctaId?: string
}
