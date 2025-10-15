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
    text: string

    /**
     * Button link URL or tel: link
     */
    href: string

    /**
     * Button variant
     * @default 'default'
     */
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'

    /**
     * Optional icon to display with button
     */
    icon?: LucideIcon

    /**
     * Icon position
     * @default 'left'
     */
    iconPosition?: 'left' | 'right'

    /**
     * Whether the link is external
     * @default false
     */
    external?: boolean

    /**
     * Optional aria-label for accessibility
     */
    ariaLabel?: string
}

/**
 * Hero image configuration
 */
export interface HeroImageConfig {
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
     * @default true
     */
    priority?: boolean

    /**
     * Image aspect ratio class
     * @default 'aspect-video'
     */
    aspectRatio?: string
}

/**
 * Props for the HeroSection component
 */
export interface HeroSectionProps {
    /**
     * Main headline (H1)
     */
    headline: string | ReactNode

    /**
     * Supporting subheadline
     */
    subheadline?: string | ReactNode

    /**
     * Detailed description paragraph
     */
    description?: string | ReactNode

    /**
     * Primary CTA button (e.g., "Contact Us")
     */
    primaryButton: HeroCTAButton

    /**
     * Optional secondary CTA button (e.g., "Call Us")
     */
    secondaryButton?: HeroCTAButton

    /**
     * Hero image configuration
     */
    image: HeroImageConfig

    /**
     * Image position
     * @default 'right'
     */
    imagePosition?: 'left' | 'right'

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
     * Enable animations
     * @default true
     */
    enableAnimations?: boolean
}
