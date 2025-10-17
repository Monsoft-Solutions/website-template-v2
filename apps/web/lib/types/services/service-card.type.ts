import type { Service } from './service.type'

/**
 * ServiceCard Component Props
 *
 * Props for the ServiceCard component used on the services listing page.
 * The card displays a service summary with icon, title, excerpt, and CTA.
 *
 * @example
 * <ServiceCard
 *     service={webDevelopmentService}
 *     className="hover:shadow-xl"
 *     showFullDescription={false}
 * />
 */
export type ServiceCardProps = {
    /**
     * Service data to display
     */
    readonly service: Service

    /**
     * Optional className for customization
     */
    readonly className?: string

    /**
     * Whether to show full description or excerpt
     * @default false (shows excerpt)
     */
    readonly showFullDescription?: boolean

    /**
     * Card layout variant
     * @default 'vertical'
     */
    readonly layout?: 'horizontal' | 'vertical'

    /**
     * Image position for horizontal layout
     * @default 'left'
     */
    readonly imagePosition?: 'left' | 'right'
}
