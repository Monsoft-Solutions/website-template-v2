/**
 * TestimonialsSection Type Definitions
 *
 * Type definitions for the TestimonialsSection component which displays
 * customer testimonials in a card-based layout.
 */

/**
 * Individual testimonial item
 */
export interface Testimonial {
    /**
     * Testimonial quote/content
     */
    quote: string

    /**
     * Customer name
     */
    name: string

    /**
     * Customer role/title
     */
    role: string

    /**
     * Optional company name
     */
    company?: string

    /**
     * Optional avatar image URL
     */
    avatar?: string

    /**
     * Rating (1-5 stars)
     */
    rating?: number
}

/**
 * Props for the TestimonialsSection component
 */
export interface TestimonialsSectionProps {
    /**
     * Section title
     */
    title: string

    /**
     * Section description
     */
    description?: string

    /**
     * Array of testimonial items
     */
    testimonials: Testimonial[]

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
     * Show ratings
     * @default true
     */
    showRatings?: boolean
}
