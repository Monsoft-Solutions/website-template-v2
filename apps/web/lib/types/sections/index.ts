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

// HeroSection types
export type {
    HeroSectionProps,
    HeroCTAButton,
    HeroImageConfig,
} from './hero-section.type'

// FeaturesSection types
export type { FeaturesSectionProps, Feature } from './features-section.type'

// AboutPreviewSection types
export type { AboutPreviewSectionProps } from './about-preview-section.type'

// TestimonialsSection types
export type {
    TestimonialsSectionProps,
    Testimonial,
} from './testimonials-section.type'

// AboutHeroSection types
export type { AboutHeroSectionProps } from './about-hero-section.type'

// MissionSection types
export type { MissionSectionProps, MissionItem } from './mission-section.type'

// StorySection types
export type { StorySectionProps } from './story-section.type'

// TeamSection types
export type {
    TeamSectionProps,
    TeamMember,
    TeamMemberSocial,
} from './team-section.type'

// ContactHeroSection types
export type { ContactHeroSectionProps } from './contact-hero-section.type'

// ContactFormSection types
export type { ContactFormSectionProps } from './contact-form-section.type'

// ContactInfoSection types
export type {
    ContactInfoSectionProps,
    ContactInfoItem,
} from './contact-info-section.type'

// Stacking types
export type {
    StackingVariant,
    AnimationIntensity,
    StackingCardConfig,
} from './stacking.type'
export { ANIMATION_PRESETS, STACKING_VARIANTS } from './stacking.type'
