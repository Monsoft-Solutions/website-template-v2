/**
 * AboutHeroSection Type Definitions
 *
 * Type definitions for the AboutHeroSection component which displays
 * page title, introduction, and hero image for the About page.
 */
import type { HeroImageConfig } from './hero-section.type'
import type { BaseHeroSectionProps } from './section.type'

/**
 * Props for the AboutHeroSection component
 * Extends BaseHeroSectionProps and adds image configuration
 */
export interface AboutHeroSectionProps extends BaseHeroSectionProps {
    /**
     * Hero image configuration
     */
    readonly image: HeroImageConfig

    /**
     * Section background variant
     * @default 'default'
     */
    readonly variant?: 'default' | 'muted' | 'accent'
}
