import type { LucideIcon } from 'lucide-react'

/**
 * Service Feature
 *
 * Represents an individual feature or capability of a service.
 * Displayed in feature cards on the service detail page.
 *
 * @example
 * const feature: ServiceFeature = {
 *     icon: Zap,
 *     title: 'Lightning Fast',
 *     description: 'Optimized performance with sub-second load times',
 *     ariaLabel: 'Learn about our fast web development'
 * }
 */
export type ServiceFeature = {
    /**
     * Feature icon
     */
    readonly icon: LucideIcon

    /**
     * Feature title
     */
    readonly title: string

    /**
     * Feature description
     */
    readonly description: string

    /**
     * Optional aria label for accessibility
     */
    readonly ariaLabel?: string
}
