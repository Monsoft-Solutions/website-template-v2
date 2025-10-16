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
    readonly icon: LucideIcon

    /**
     * Card title
     */
    readonly title: string

    /**
     * Card description
     */
    readonly description: string | ReactNode

    /**
     * Optional href to make the card clickable
     */
    readonly href?: string

    /**
     * Whether the link is external
     * @default false
     */
    readonly external?: boolean

    /**
     * Additional CSS classes
     */
    readonly className?: string

    /**
     * Icon display style
     * @default 'outlined'
     */
    readonly iconStyle?: 'outlined' | 'filled' | 'minimal'

    /**
     * Icon color variant
     * @default 'primary'
     */
    readonly iconVariant?: 'primary' | 'secondary' | 'accent' | 'muted'

    /**
     * Card layout orientation
     * @default 'vertical'
     */
    readonly orientation?: 'vertical' | 'horizontal'

    /**
     * Whether to show a subtle border
     * @default true
     */
    readonly showBorder?: boolean

    /**
     * Optional onClick handler
     */
    readonly onClick?: () => void

    /**
     * ARIA label for accessibility
     */
    readonly ariaLabel?: string
}
