/**
 * Contact Hero Section Type Definitions
 *
 * Type definitions for the contact page hero section component.
 * This section introduces the contact page and provides context for users.
 */
import type { BaseHeroSectionProps } from './section.type'

/**
 * Props for the ContactHeroSection component
 * Extends BaseHeroSectionProps for consistency with other hero sections
 */
export interface ContactHeroSectionProps extends BaseHeroSectionProps {
    /**
     * Badge text is required for contact hero (overrides optional from base)
     */
    readonly badge: string
}
