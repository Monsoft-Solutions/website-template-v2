/**
 * TestimonialsSection Type Definitions
 *
 * Type definitions for the TestimonialsSection component which displays
 * customer testimonials in a card-based layout.
 */
import type {
    CommonSectionProps,
    SectionWithColumns,
    SectionWithTitle,
    SectionWithVariant,
} from './section.type'

/**
 * Individual testimonial item
 */
export interface Testimonial {
    /**
     * Testimonial quote/content
     */
    readonly quote: string

    /**
     * Customer name
     */
    readonly name: string

    /**
     * Customer role/title
     */
    readonly role: string

    /**
     * Optional company name
     */
    readonly company?: string

    /**
     * Optional avatar image URL
     */
    readonly avatar?: string

    /**
     * Rating (1-5 stars)
     */
    readonly rating?: number
}

/**
 * Props for the TestimonialsSection component
 * Extends base props with grid layout and testimonial-specific options
 */
export interface TestimonialsSectionProps
    extends CommonSectionProps,
        SectionWithTitle,
        SectionWithColumns,
        SectionWithVariant {
    /**
     * Array of testimonial items
     */
    readonly testimonials: Testimonial[]

    /**
     * Show ratings
     * @default true
     */
    readonly showRatings?: boolean
}
