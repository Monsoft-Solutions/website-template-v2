/**
 * AboutHeroSection Type Definitions
 *
 * Type definitions for the AboutHeroSection component which displays
 * page title, introduction, and hero image for the About page.
 */
import type { ReactNode } from 'react'

import { HeroImageConfig } from './hero-section.type'

/**
 * Props for the AboutHeroSection component
 */
export interface AboutHeroSectionProps {
    /**
     * Section ID for linking and tracking
     */
    id?: string

    /**
     * Optional badge/label above the headline
     */
    badge?: string

    /**
     * Main headline
     */
    headline: string

    /**
     * Section description
     */
    description: string | ReactNode

    /**
     * Hero image configuration
     */
    image: HeroImageConfig

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
