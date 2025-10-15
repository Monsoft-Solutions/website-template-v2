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
    children: ReactNode

    /**
     * Background color variant
     * @default 'default'
     */
    variant?: SectionBackgroundVariant

    /**
     * Semantic HTML element to use
     * @default 'section'
     */
    as?: SectionElement

    /**
     * Optional id for anchor linking
     */
    id?: string

    /**
     * Additional CSS classes
     */
    className?: string

    /**
     * Whether to remove default vertical padding
     * @default false
     */
    noPadding?: boolean

    /**
     * Custom vertical padding (overrides default py-16 md:py-24)
     */
    paddingY?: string

    /**
     * ARIA label for accessibility
     */
    ariaLabel?: string
}
