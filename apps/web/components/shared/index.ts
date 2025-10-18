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

// Navigation Components
export { Breadcrumbs } from './Breadcrumbs.component'

// Mobile Components
export { MobileCallButton } from './MobileCallButton.component'

// Content Components
export { FeatureCard } from './FeatureCard.component'
export { CTASection } from './CTASection.component'
export { IconCard } from './IconCard.component'
export { ImageSection } from './ImageSection.component'
export { FAQComponent } from './FAQ.component'
export { Gallery } from './Gallery.component'

// Type Exports
export type { FAQProps } from './FAQ.component'
export type { GalleryProps } from './Gallery.component'
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

export type {
    MobileCallButtonProps,
    MobileCallButtonPosition,
    MobileCallButtonStyle,
} from '@/lib/types/mobile-call-button'
