/**
 * Service Call-to-Action
 *
 * CTA configuration for service pages.
 * Defines the conversion actions available to users.
 *
 * @example
 * const cta: ServiceCTA = {
 *     heading: 'Ready to Start Your Project?',
 *     description: "Let's discuss how we can help bring your vision to life.",
 *     primaryButton: {
 *         text: 'Get a Free Quote',
 *         href: '/contact'
 *     },
 *     secondaryButton: {
 *         text: 'View Our Work',
 *         href: '/portfolio'
 *     }
 * }
 */
export type ServiceCTA = {
    /**
     * CTA heading
     */
    readonly heading: string

    /**
     * CTA description
     */
    readonly description: string

    /**
     * Primary button configuration
     */
    readonly primaryButton: {
        readonly text: string
        readonly href: string
    }

    /**
     * Optional secondary button
     */
    readonly secondaryButton?: {
        readonly text: string
        readonly href: string
    }
}
