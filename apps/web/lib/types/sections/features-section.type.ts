/**
 * FeaturesSection Type Definitions
 *
 * Type definitions for the FeaturesSection component which displays
 * a grid of feature/service cards with icons.
 */
import type { LucideIcon } from 'lucide-react'

import type {
    CommonSectionProps,
    SectionWithColumns,
    SectionWithTitle,
    SectionWithVariant,
} from './section.type'

/**
 * Individual feature item
 */
export interface Feature {
    /**
     * Icon component from lucide-react
     */
    readonly icon: LucideIcon

    /**
     * Feature title
     */
    readonly title: string

    /**
     * Feature description
     */
    readonly description: string

    /**
     * Optional link URL
     */
    readonly href?: string

    /**
     * Whether the link is external
     * @default false
     */
    readonly external?: boolean

    /**
     * Optional aria-label for accessibility
     */
    readonly ariaLabel?: string

    /**
     * Optional image source for visual cards
     */
    readonly imageSrc?: string

    /**
     * Optional image alt text
     */
    readonly imageAlt?: string
}

/**
 * Props for the FeaturesSection component
 * Extends base props with grid layout and custom feature styling options
 */
export interface FeaturesSectionProps
    extends CommonSectionProps,
        SectionWithTitle,
        SectionWithColumns,
        SectionWithVariant {
    /**
     * Array of feature items
     */
    readonly features: Feature[]

    /**
     * Icon style variant
     * @default 'outlined'
     */
    readonly iconStyle?: 'outlined' | 'filled' | 'minimal'

    /**
     * Icon color variant
     * @default 'primary'
     */
    readonly iconVariant?: 'primary' | 'secondary' | 'accent' | 'muted'

    /**
     * Show card borders
     * @default true
     */
    readonly showBorders?: boolean
}
