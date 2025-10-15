/**
 * ImageSection Type Definitions
 *
 * Type definitions for the ImageSection component which provides
 * a two-column layout with image and content (title, description, CTA).
 */
import type { ReactNode } from 'react'

/**
 * CTA button configuration for image section
 */
export interface ImageSectionButton {
    /**
     * Button text
     */
    text: string

    /**
     * Button link URL
     */
    href: string

    /**
     * Button variant
     * @default 'default'
     */
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'

    /**
     * Whether the link is external
     * @default false
     */
    external?: boolean
}

/**
 * Image configuration for image section
 */
export interface ImageConfig {
    /**
     * Image source URL
     */
    src: string

    /**
     * Image alt text (required for accessibility)
     */
    alt: string

    /**
     * Image width (for Next.js Image optimization)
     */
    width?: number

    /**
     * Image height (for Next.js Image optimization)
     */
    height?: number

    /**
     * Whether to prioritize loading this image
     * @default false
     */
    priority?: boolean

    /**
     * Image aspect ratio class
     * @default 'aspect-video'
     */
    aspectRatio?: string
}

/**
 * Props for the ImageSection component
 */
export interface ImageSectionProps {
    /**
     * Image configuration
     */
    image: ImageConfig

    /**
     * Section title
     */
    title: string

    /**
     * Section description
     */
    description: string | ReactNode

    /**
     * Optional badge or label above title
     */
    badge?: string | ReactNode

    /**
     * Optional primary CTA button
     */
    primaryButton?: ImageSectionButton

    /**
     * Optional secondary CTA button
     */
    secondaryButton?: ImageSectionButton

    /**
     * Image position
     * @default 'left'
     */
    imagePosition?: 'left' | 'right'

    /**
     * Content vertical alignment
     * @default 'center'
     */
    contentAlign?: 'start' | 'center' | 'end'

    /**
     * Background variant
     * @default 'default'
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

    /**
     * Whether to reverse column order on mobile
     * @default false (image always stacks on top by default)
     */
    reverseMobile?: boolean

    /**
     * Custom image container classes
     */
    imageContainerClassName?: string

    /**
     * Custom content container classes
     */
    contentContainerClassName?: string
}
