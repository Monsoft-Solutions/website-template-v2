/**
 * Contact Info Section Type Definitions
 *
 * Type definitions for the contact information section component.
 * This section displays contact details and social media links.
 */
import type { LucideIcon } from 'lucide-react'

import type { CommonSectionProps, SectionWithHeader } from './section.type'

/**
 * Individual contact information item
 */
export interface ContactInfoItem {
    /**
     * Icon component from lucide-react
     */
    readonly icon: LucideIcon

    /**
     * Title/label for the contact method
     */
    readonly title: string

    /**
     * Contact value (phone number, email, address)
     */
    readonly value: string

    /**
     * Optional href for clickable contact items (tel:, mailto:)
     */
    readonly href?: string

    /**
     * Accessible label for screen readers
     */
    readonly ariaLabel: string
}

/**
 * Props for the ContactInfoSection component
 * Extends common section props with optional header content and contact-specific fields
 */
export interface ContactInfoSectionProps
    extends CommonSectionProps,
        SectionWithHeader {
    /**
     * Array of contact information items to display
     */
    readonly contactItems: ContactInfoItem[]

    /**
     * Whether to display social media links
     * @default true
     */
    readonly showSocialLinks?: boolean
}
