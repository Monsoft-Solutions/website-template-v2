/**
 * Base Section Type Definitions
 *
 * Foundational type definitions and utilities for section components.
 * These base types provide common props and patterns used across all section components.
 */
import type { ReactNode } from 'react'

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
