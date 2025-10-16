/**
 * StorySection Type Definitions
 *
 * Type definitions for the StorySection component which displays
 * company story with image and text layout.
 */
import type { HeroImageConfig } from './hero-section.type'
import type {
    CommonSectionProps,
    ReactNode,
    SectionWithAnimations,
    SectionWithVariant,
} from './section.type'

/**
 * Props for the StorySection component
 * Extends base props with story-specific image and content configuration
 */
export interface StorySectionProps
    extends CommonSectionProps,
        SectionWithAnimations,
        SectionWithVariant {
    /**
     * Optional badge/label above the headline
     */
    readonly badge?: string

    /**
     * Section headline (required)
     */
    readonly headline: string

    /**
     * Main content/story text (required)
     */
    readonly content: string | ReactNode

    /**
     * Image configuration
     */
    readonly image: HeroImageConfig

    /**
     * Image position relative to text
     * @default 'right'
     */
    readonly imagePosition?: 'left' | 'right'
}
