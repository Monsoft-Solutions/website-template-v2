/**
 * CTASection Type Definitions
 *
 * Type definitions for the CTASection component which provides
 * a prominent call-to-action section with heading, description, and buttons.
 */
import type { ReactNode } from 'react'

/**
 * CTA button configuration
 */
export interface CTAButton {
    /**
     * Button text
     */
    text: string

    /**
     * Button link URL
     */
    href: string

    /**
     * Button variant
     * @default 'default'
     */
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'

    /**
     * Whether the link is external
     * @default false
     */
    external?: boolean

    /**
     * Optional icon to display (Lucide icon name or React element)
     */
    icon?: ReactNode

    /**
     * Icon position
     * @default 'left'
     */
    iconPosition?: 'left' | 'right'

    /**
     * Optional onClick handler (overrides href)
     */
    onClick?: () => void
}

/**
 * Props for the CTASection component
 */
export interface CTASectionProps {
    /**
     * Main heading text
     */
    heading: string

    /**
     * Optional description text
     */
    description?: string | ReactNode

    /**
     * Primary CTA button
     */
    primaryButton: CTAButton

    /**
     * Optional secondary CTA button
     */
    secondaryButton?: CTAButton

    /**
     * Background variant
     * @default 'accent'
     */
    variant?: 'default' | 'muted' | 'accent' | 'primary'

    /**
     * Text alignment
     * @default 'center'
     */
    align?: 'left' | 'center' | 'right'

    /**
     * Additional CSS classes
     */
    className?: string

    /**
     * Optional id for anchor linking
     */
    id?: string

    /**
     * Button layout on mobile
     * @default 'stack'
     */
    buttonLayout?: 'stack' | 'inline'

    /**
     * Section size/padding variant
     * @default 'default'
     */
    size?: 'sm' | 'default' | 'lg'
}
