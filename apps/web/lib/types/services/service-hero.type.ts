/**
 * ServiceHero Component Props
 *
 * Type definition for the ServiceHero component which displays
 * the hero section on service detail pages.
 *
 * @example
 * <ServiceHero
 *   title="Web Development"
 *   description="Build fast, scalable web applications..."
 *   category="development"
 *   categoryLabel="Development"
 *   heroImage={{ url: '/images/services/web-dev.jpg', alt: 'Web development' }}
 *   primaryButton={{ text: 'Get Started', href: '/contact' }}
 *   secondaryButton={{ text: 'Learn More', href: '/about' }}
 * />
 */
export type ServiceHeroProps = {
    /**
     * Service title
     * Displayed as the main heading
     */
    readonly title: string

    /**
     * Full service description
     * Can include multiple paragraphs
     */
    readonly description: string

    /**
     * Service category slug
     * Used for styling and filtering
     */
    readonly category: string

    /**
     * Display category name
     * Shown in the category badge
     */
    readonly categoryLabel: string

    /**
     * Optional hero image
     * Displayed alongside the hero content
     */
    readonly heroImage?: {
        readonly url: string
        readonly alt: string
    }

    /**
     * Primary call-to-action button
     * Main action for users to take
     */
    readonly primaryButton: {
        readonly text: string
        readonly href: string
    }

    /**
     * Optional secondary call-to-action button
     * Alternative action for users
     */
    readonly secondaryButton?: {
        readonly text: string
        readonly href: string
    }
}
