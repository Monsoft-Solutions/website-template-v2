/**
 * IconCard Type Definitions
 *
 * Type definitions for the IconCard component which provides
 * a lightweight card with icon, title, and description for grid layouts.
 */
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Props for the IconCard component
 */
export interface IconCardProps {
    /**
     * Lucide icon component to display
     */
    icon: LucideIcon

    /**
     * Card title
     */
    title: string

    /**
     * Card description
     */
    description: string | ReactNode

    /**
     * Optional href to make the card clickable
     */
    href?: string

    /**
     * Whether the link is external
     * @default false
     */
    external?: boolean

    /**
     * Additional CSS classes
     */
    className?: string

    /**
     * Icon display style
     * @default 'outlined'
     */
    iconStyle?: 'outlined' | 'filled' | 'minimal'

    /**
     * Icon color variant
     * @default 'primary'
     */
    iconVariant?: 'primary' | 'secondary' | 'accent' | 'muted'

    /**
     * Card layout orientation
     * @default 'vertical'
     */
    orientation?: 'vertical' | 'horizontal'

    /**
     * Whether to show a subtle border
     * @default true
     */
    showBorder?: boolean

    /**
     * Optional onClick handler
     */
    onClick?: () => void

    /**
     * ARIA label for accessibility
     */
    ariaLabel?: string
}
