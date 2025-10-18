/**
 * Service Feature
 *
 * Represents an individual feature or capability of a service.
 * Displayed in feature cards on the service detail page.
 *
 * @example
 * const feature: ServiceFeature = {
 *     iconPath: '/images/services/icons/fast-icon.png',
 *     title: 'Lightning Fast',
 *     description: 'Optimized performance with sub-second load times',
 *     ariaLabel: 'Learn about our fast web development'
 * }
 */
export type ServiceFeature = {
    /**
     * Feature icon image path
     * Recommended size: 48x48px or 64x64px
     */
    readonly iconPath: string

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
