/**
 * AboutPreviewSection Type Definitions
 *
 * Type definitions for the AboutPreviewSection component which provides
 * a preview of the company/about page with image and content.
 */
import type { CommonSectionProps, SectionWithVariant } from './section.type'

/**
 * Props for the AboutPreviewSection component
 *
 * This component leverages the ImageSection component internally,
 * so it uses similar configuration but with preset semantics for "about" content.
 * Extends base props with image and button configuration
 */
export interface AboutPreviewSectionProps
    extends CommonSectionProps,
        SectionWithVariant {
    /**
     * Section badge/label
     * @default 'About Us'
     */
    readonly badge?: string

    /**
     * Section title (required)
     */
    readonly title: string

    /**
     * Company overview/description (required)
     */
    readonly description: string

    /**
     * Image source URL
     */
    readonly imageSrc: string

    /**
     * Image alt text (required for accessibility)
     */
    readonly imageAlt: string

    /**
     * Image width (for Next.js Image optimization)
     */
    readonly imageWidth?: number

    /**
     * Image height (for Next.js Image optimization)
     */
    readonly imageHeight?: number

    /**
     * Button text
     * @default 'Learn More'
     */
    readonly buttonText?: string

    /**
     * Button link URL
     * @default '/about'
     */
    readonly buttonHref?: string

    /**
     * Image position
     * @default 'left'
     */
    readonly imagePosition?: 'left' | 'right'
}
