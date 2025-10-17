/**
 * Service Icon Configuration
 *
 * Defines how a service is visually represented using images.
 * All services must use images for SSR compatibility.
 *
 * @example Card icon (small icon for service card)
 * const config: ServiceIcon = {
 *     cardIconPath: '/images/services/icons/web-dev-icon.png',
 *     heroImagePath: '/images/services/web-dev-hero.jpg',
 *     imageAlt: 'Web development workspace'
 * }
 */
export type ServiceIcon = {
    /**
     * Small icon image for service cards
     * Recommended size: 64x64px or 128x128px
     */
    readonly cardIconPath: string

    /**
     * Large hero image for service detail page
     * Recommended size: 1200x800px
     */
    readonly heroImagePath: string

    /**
     * Alt text for accessibility
     * Describes the image content for screen readers
     */
    readonly imageAlt: string
}
