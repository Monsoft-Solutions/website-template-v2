/**
 * FeatureCard Type Definitions
 *
 * Type definitions for the FeatureCard component which displays
 * features or services with icon, title, description, and optional CTA.
 */
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Props for the FeatureCard component
 */
export interface FeatureCardProps {
    /**
     * Lucide icon component to display
     */
    icon: LucideIcon

    /**
     * Feature title
     */
    title: string

    /**
     * Feature description
     */
    description: string | ReactNode

    /**
     * Optional CTA link
     */
    href?: string

    /**
     * Optional CTA link text
     * @default 'Learn more'
     */
    linkText?: string

    /**
     * Whether the link is external
     * @default false
     */
    external?: boolean

    /**
     * Additional CSS classes for the card
     */
    className?: string

    /**
     * Icon color variant (uses design system colors)
     * @default 'primary'
     */
    iconVariant?: 'primary' | 'secondary' | 'accent' | 'muted'

    /**
     * Icon size
     * @default 'default'
     */
    iconSize?: 'sm' | 'default' | 'lg'

    /**
     * Card hover effect style
     * @default 'lift'
     */
    hoverEffect?: 'lift' | 'border' | 'glow' | 'none'

    /**
     * Optional onClick handler
     */
    onClick?: () => void

    /**
     * ARIA label for accessibility
     */
    ariaLabel?: string
}
