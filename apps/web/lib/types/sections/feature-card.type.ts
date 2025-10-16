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
    readonly icon: LucideIcon

    /**
     * Feature title
     */
    readonly title: string

    /**
     * Feature description
     */
    readonly description: string | ReactNode

    /**
     * Optional CTA link
     */
    readonly href?: string

    /**
     * Optional CTA link text
     * @default 'Learn more'
     */
    readonly linkText?: string

    /**
     * Whether the link is external
     * @default false
     */
    readonly external?: boolean

    /**
     * Additional CSS classes for the card
     */
    readonly className?: string

    /**
     * Icon color variant (uses design system colors)
     * @default 'primary'
     */
    readonly iconVariant?: 'primary' | 'secondary' | 'accent' | 'muted'

    /**
     * Icon size
     * @default 'default'
     */
    readonly iconSize?: 'sm' | 'default' | 'lg'

    /**
     * Card hover effect style
     * @default 'lift'
     */
    readonly hoverEffect?: 'lift' | 'border' | 'glow' | 'none'

    /**
     * Optional onClick handler
     */
    readonly onClick?: () => void

    /**
     * ARIA label for accessibility
     */
    readonly ariaLabel?: string
}
