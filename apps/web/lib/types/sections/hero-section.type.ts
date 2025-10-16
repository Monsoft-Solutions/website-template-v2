/**
 * HeroSection Type Definitions
 *
 * Type definitions for the HeroSection component which provides
 * a prominent landing section with headline, description, CTAs, and hero image.
 */
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * CTA button configuration for hero section
 */
export interface HeroCTAButton {
    /**
     * Button text
     */
    readonly text: string

    /**
     * Button link URL or tel: link
     */
    readonly href: string

    /**
     * Button variant
     * @default 'default'
     */
    readonly variant?: 'default' | 'outline' | 'secondary' | 'ghost'

    /**
     * Optional icon to display with button
     */
    readonly icon?: LucideIcon

    /**
     * Icon position
     * @default 'left'
     */
    readonly iconPosition?: 'left' | 'right'

    /**
     * Whether the link is external
     * @default false
     */
    readonly external?: boolean

    /**
     * Optional aria-label for accessibility
     */
    readonly ariaLabel?: string
}

/**
 * Hero image configuration
 */
export interface HeroImageConfig {
    /**
     * Image source URL
     */
    readonly src: string

    /**
     * Image alt text (required for accessibility)
     */
    readonly alt: string

    /**
     * Image width (for Next.js Image optimization)
     */
    readonly width?: number

    /**
     * Image height (for Next.js Image optimization)
     */
    readonly height?: number

    /**
     * Whether to prioritize loading this image
     * @default true
     */
    readonly priority?: boolean

    /**
     * Image aspect ratio class
     * @default 'aspect-video'
     */
    readonly aspectRatio?: string
}

/**
 * Props for the HeroSection component
 */
export interface HeroSectionProps {
    /**
     * Main headline (H1)
     */
    readonly headline: string | ReactNode

    /**
     * Supporting subheadline
     */
    readonly subheadline?: string | ReactNode

    /**
     * Detailed description paragraph
     */
    readonly description?: string | ReactNode

    /**
     * Primary CTA button (e.g., "Contact Us")
     */
    readonly primaryButton: HeroCTAButton

    /**
     * Optional secondary CTA button (e.g., "Call Us")
     */
    readonly secondaryButton?: HeroCTAButton

    /**
     * Hero image configuration
     */
    readonly image: HeroImageConfig

    /**
     * Image position
     * @default 'right'
     */
    readonly imagePosition?: 'left' | 'right'

    /**
     * Background variant
     * @default 'default'
     */
    readonly variant?: 'default' | 'muted' | 'accent'

    /**
     * Additional CSS classes
     */
    readonly className?: string

    /**
     * Optional id for anchor linking
     */
    readonly id?: string

    /**
     * Enable animations
     * @default true
     */
    readonly enableAnimations?: boolean
}
