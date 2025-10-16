/**
 * SectionContainer Type Definitions
 *
 * Type definitions for the SectionContainer component which provides
 * consistent vertical spacing and optional background variants for page sections.
 */
import type { ReactNode } from 'react'

/**
 * Background variant options for section containers
 */
export type SectionBackgroundVariant = 'default' | 'muted' | 'accent'

/**
 * Semantic HTML element options for section containers
 */
export type SectionElement = 'section' | 'div' | 'article' | 'aside'

/**
 * Props for the SectionContainer component
 */
export interface SectionContainerProps {
    /**
     * Child elements to render inside the section
     */
    readonly children: ReactNode

    /**
     * Background color variant
     * @default 'default'
     */
    readonly variant?: SectionBackgroundVariant

    /**
     * Semantic HTML element to use
     * @default 'section'
     */
    readonly as?: SectionElement

    /**
     * Optional id for anchor linking
     */
    readonly id?: string

    /**
     * Additional CSS classes
     */
    readonly className?: string

    /**
     * Whether to remove default vertical padding
     * @default false
     */
    readonly noPadding?: boolean

    /**
     * Custom vertical padding (overrides default py-16 md:py-24)
     */
    readonly paddingY?: string

    /**
     * ARIA label for accessibility
     */
    readonly ariaLabel?: string
}
