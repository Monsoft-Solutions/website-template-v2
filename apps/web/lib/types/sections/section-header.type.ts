/**
 * SectionHeader Type Definitions
 *
 * Type definitions for the SectionHeader component which provides
 * consistent section titles and descriptions with flexible alignment.
 */
import type { ReactNode } from 'react'

/**
 * Heading level options for section header
 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * Text alignment options
 */
export type TextAlignment = 'left' | 'center' | 'right'

/**
 * Props for the SectionHeader component
 */
export interface SectionHeaderProps {
    /**
     * Main heading text
     */
    title: string

    /**
     * Optional description/subtitle text
     */
    description?: string | ReactNode

    /**
     * Heading level for semantic HTML
     * @default 'h2'
     */
    as?: HeadingLevel

    /**
     * Text alignment
     * @default 'center'
     */
    align?: TextAlignment

    /**
     * Additional CSS classes for the container
     */
    className?: string

    /**
     * Additional CSS classes for the title
     */
    titleClassName?: string

    /**
     * Additional CSS classes for the description
     */
    descriptionClassName?: string

    /**
     * Optional badge or label to display above title
     */
    badge?: string | ReactNode

    /**
     * Spacing between title and description
     * @default 'default'
     */
    spacing?: 'tight' | 'default' | 'loose'
}
