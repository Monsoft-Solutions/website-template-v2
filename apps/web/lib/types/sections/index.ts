/**
 * Section Component Types
 *
 * Central export file for all section-related type definitions.
 * Import from this file for convenience or from individual type files for better tree-shaking.
 *
 * @example
 * ```ts
 * // Import all types
 * import type { SectionContainerProps, FeatureCardProps } from '@/lib/types/sections'
 *
 * // Or import from individual files
 * import type { SectionContainerProps } from '@/lib/types/sections/section-container.type'
 * ```
 */

// SectionContainer types
export type {
    SectionContainerProps,
    SectionBackgroundVariant,
    SectionElement,
} from './section-container.type'

// ContentWrapper types
export type {
    ContentWrapperProps,
    ContentWrapperSize,
} from './content-wrapper.type'

// SectionHeader types
export type {
    SectionHeaderProps,
    HeadingLevel,
    TextAlignment,
} from './section-header.type'

// FeatureCard types
export type { FeatureCardProps } from './feature-card.type'

// CTASection types
export type { CTASectionProps, CTAButton } from './cta-section.type'

// IconCard types
export type { IconCardProps } from './icon-card.type'

// ImageSection types
export type {
    ImageSectionProps,
    ImageConfig,
    ImageSectionButton,
} from './image-section.type'
