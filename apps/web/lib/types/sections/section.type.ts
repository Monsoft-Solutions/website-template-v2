/**
 * Base Section Type Definitions
 *
 * Foundational type definitions and utilities for section components.
 * These base types provide common props and patterns used across all section components.
 */
import type { ReactNode } from 'react'

export type { ReactNode }

/**
 * Base props shared by all section components
 * Provides className and children for composition
 */
export interface BaseSectionProps {
    /**
     * Optional CSS classes to apply to the component
     */
    readonly className?: string

    /**
     * Child elements to render within the component
     */
    readonly children?: ReactNode
}

/**
 * Common background variant options used across section components
 */
export type SectionBackgroundVariant = 'default' | 'muted' | 'accent'

/**
 * Common text alignment options
 */
export type SectionTextAlignment = 'left' | 'center' | 'right'

/**
 * Common size variants for sections
 */
export type SectionSize = 'sm' | 'default' | 'lg' | 'xl'

/**
 * Props for sections that support background variants
 */
export interface SectionWithVariant {
    /**
     * Background color variant
     * @default 'default'
     */
    readonly variant?: SectionBackgroundVariant
}

/**
 * Props for sections that support text alignment
 */
export interface SectionWithAlignment {
    /**
     * Text alignment
     * @default 'center'
     */
    readonly align?: SectionTextAlignment
}

/**
 * Props for sections that support sizing
 */
export interface SectionWithSize {
    /**
     * Section size/padding variant
     * @default 'default'
     */
    readonly size?: SectionSize
}

/**
 * Props for sections that support anchor linking
 */
export interface SectionWithId {
    /**
     * HTML ID attribute for anchor linking
     */
    readonly id?: string
}

/**
 * Common section metadata props (id, className)
 * Extends BaseSectionProps to include ID support
 */
export interface CommonSectionProps extends BaseSectionProps, SectionWithId {}

/**
 * Props for sections with header content (badge, headline, description)
 */
export interface SectionWithHeader {
    /**
     * Optional badge/label text above the headline
     */
    readonly badge?: string

    /**
     * Main section headline
     */
    readonly headline?: string

    /**
     * Section description text
     */
    readonly description?: string
}

/**
 * Props for sections with required header content
 * Allows ReactNode for description to support rich content
 */
export interface SectionWithRequiredHeader {
    /**
     * Optional badge/label text above the headline
     */
    readonly badge?: string

    /**
     * Main section headline (required)
     */
    readonly headline: string

    /**
     * Section description text (required)
     * Can be string or ReactNode for rich content
     */
    readonly description: string | ReactNode
}

/**
 * Props for sections with animations
 */
export interface SectionWithAnimations {
    /**
     * Enable entrance animations
     * @default true
     */
    readonly enableAnimations?: boolean
}

/**
 * Props for sections with title and optional description
 * Uses 'title' instead of 'headline' for more generic content sections
 */
export interface SectionWithTitle {
    /**
     * Section title (required)
     */
    readonly title: string

    /**
     * Optional section description
     */
    readonly description?: string | ReactNode
}

/**
 * Props for sections with grid columns
 */
export interface SectionWithColumns {
    /**
     * Number of columns on desktop
     * @default 3
     */
    readonly columns?: 2 | 3 | 4
}

/**
 * Base props for hero sections
 * Combines common section props with header and animation support
 */
export interface BaseHeroSectionProps
    extends CommonSectionProps,
        SectionWithRequiredHeader,
        SectionWithAnimations {}

/**
 * Re-export all section component types for convenience
 * Import individual types from their respective files for better tree-shaking
 */
export type {
    SectionContainerProps,
    SectionBackgroundVariant as SectionContainerVariant,
    SectionElement,
} from './section-container.type'

export type {
    ContentWrapperProps,
    ContentWrapperSize,
} from './content-wrapper.type'

export type {
    SectionHeaderProps,
    HeadingLevel,
    TextAlignment,
} from './section-header.type'

export type { FeatureCardProps } from './feature-card.type'

export type { CTASectionProps, CTAButton } from './cta-section.type'

export type { IconCardProps } from './icon-card.type'

export type {
    ImageSectionProps,
    ImageConfig,
    ImageSectionButton,
} from './image-section.type'

export type { ContactHeroSectionProps } from './contact-hero-section.type'

export type { ContactFormSectionProps } from './contact-form-section.type'

export type {
    ContactInfoSectionProps,
    ContactInfoItem,
} from './contact-info-section.type'
