/**
 * Shared Components Barrel Export
 *
 * This file exports all shared components and their type definitions
 * for easy importing across the application.
 *
 * @example
 * ```tsx
 * import { SectionContainer, ContentWrapper, FeatureCard } from '@/components/shared'
 * ```
 */

// Container Components
export { SectionContainer } from './SectionContainer.component'
export { ContentWrapper } from './ContentWrapper.component'
export { SectionHeader } from './SectionHeader.component'

// Content Components
export { FeatureCard } from './FeatureCard.component'
export { CTASection } from './CTASection.component'
export { IconCard } from './IconCard.component'
export { ImageSection } from './ImageSection.component'

// Type Exports
export type {
    SectionContainerProps,
    SectionBackgroundVariant,
    SectionElement,
} from '@/lib/types/sections/section-container.type'

export type {
    ContentWrapperProps,
    ContentWrapperSize,
} from '@/lib/types/sections/content-wrapper.type'

export type {
    SectionHeaderProps,
    HeadingLevel,
    TextAlignment,
} from '@/lib/types/sections/section-header.type'

export type { FeatureCardProps } from '@/lib/types/sections/feature-card.type'

export type {
    CTASectionProps,
    CTAButton,
} from '@/lib/types/sections/cta-section.type'

export type { IconCardProps } from '@/lib/types/sections/icon-card.type'

export type {
    ImageSectionProps,
    ImageSectionButton,
    ImageConfig,
} from '@/lib/types/sections/image-section.type'
