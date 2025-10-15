/**
 * StorySection Type Definitions
 *
 * Type definitions for the StorySection component which displays
 * company story with image and text layout.
 */
import type { ReactNode } from 'react'

import { HeroImageConfig } from './hero-section.type'

/**
 * Props for the StorySection component
 */
export interface StorySectionProps {
    /**
     * Section ID for linking and tracking
     */
    id?: string

    /**
     * Optional badge/label above the headline
     */
    badge?: string

    /**
     * Section headline
     */
    headline: string

    /**
     * Main content/story text
     */
    content: string | ReactNode

    /**
     * Image configuration
     */
    image: HeroImageConfig

    /**
     * Image position relative to text
     * @default 'right'
     */
    imagePosition?: 'left' | 'right'

    /**
     * Section background variant
     * @default 'default'
     */
    variant?: 'default' | 'muted' | 'accent'

    /**
     * Enable fade-in animations
     * @default true
     */
    enableAnimations?: boolean

    /**
     * Additional CSS classes
     */
    className?: string
}
