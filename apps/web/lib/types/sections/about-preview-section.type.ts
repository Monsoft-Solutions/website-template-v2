/**
 * AboutPreviewSection Type Definitions
 *
 * Type definitions for the AboutPreviewSection component which provides
 * a preview of the company/about page with image and content.
 */

/**
 * Props for the AboutPreviewSection component
 *
 * This component leverages the ImageSection component internally,
 * so it uses similar configuration but with preset semantics for "about" content.
 */
export interface AboutPreviewSectionProps {
    /**
     * Section badge/label
     * @default 'About Us'
     */
    badge?: string

    /**
     * Section title
     */
    title: string

    /**
     * Company overview/description
     */
    description: string

    /**
     * Image source URL
     */
    imageSrc: string

    /**
     * Image alt text (required for accessibility)
     */
    imageAlt: string

    /**
     * Image width (for Next.js Image optimization)
     */
    imageWidth?: number

    /**
     * Image height (for Next.js Image optimization)
     */
    imageHeight?: number

    /**
     * Button text
     * @default 'Learn More'
     */
    buttonText?: string

    /**
     * Button link URL
     * @default '/about'
     */
    buttonHref?: string

    /**
     * Image position
     * @default 'left'
     */
    imagePosition?: 'left' | 'right'

    /**
     * Background variant
     * @default 'muted'
     */
    variant?: 'default' | 'muted' | 'accent'

    /**
     * Additional CSS classes
     */
    className?: string

    /**
     * Optional id for anchor linking
     */
    id?: string
}
