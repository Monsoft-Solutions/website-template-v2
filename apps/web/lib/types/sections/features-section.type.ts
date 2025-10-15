/**
 * FeaturesSection Type Definitions
 *
 * Type definitions for the FeaturesSection component which displays
 * a grid of feature/service cards with icons.
 */
import type { LucideIcon } from 'lucide-react'

/**
 * Individual feature item
 */
export interface Feature {
    /**
     * Icon component from lucide-react
     */
    icon: LucideIcon

    /**
     * Feature title
     */
    title: string

    /**
     * Feature description
     */
    description: string

    /**
     * Optional link URL
     */
    href?: string

    /**
     * Whether the link is external
     * @default false
     */
    external?: boolean

    /**
     * Optional aria-label for accessibility
     */
    ariaLabel?: string
}

/**
 * Props for the FeaturesSection component
 */
export interface FeaturesSectionProps {
    /**
     * Section title
     */
    title: string

    /**
     * Section description
     */
    description?: string

    /**
     * Array of feature items
     */
    features: Feature[]

    /**
     * Number of columns on desktop
     * @default 3
     */
    columns?: 2 | 3 | 4

    /**
     * Background variant
     * @default 'default'
     */
    variant?: 'default' | 'muted' | 'accent'

    /**
     * Additional CSS classes
     */
    className?: string

    /**
     * Optional id for anchor linking
     */
    id?: string

    /**
     * Icon style variant
     * @default 'outlined'
     */
    iconStyle?: 'outlined' | 'filled' | 'minimal'

    /**
     * Icon color variant
     * @default 'primary'
     */
    iconVariant?: 'primary' | 'secondary' | 'accent' | 'muted'

    /**
     * Show card borders
     * @default true
     */
    showBorders?: boolean
}
