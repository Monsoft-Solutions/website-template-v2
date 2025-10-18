/**
 * Services Page Types
 *
 * Type definitions for services page components and data structures.
 */

export type {
    ServicesFAQItem,
    ServicesTestimonial,
} from '@/lib/data/services/services-page-content'

/**
 * Services Testimonials Component Props
 */
export type ServicesTestimonialsProps = {
    readonly title?: string
    readonly description?: string
    readonly className?: string
    readonly showAll?: boolean
}

/**
 * Services Contact Component Props
 */
export type ServicesContactProps = {
    readonly title?: string
    readonly description?: string
    readonly className?: string
    readonly variant?: 'default' | 'accent' | 'muted'
}
