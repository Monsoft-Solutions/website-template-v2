/**
 * Service Benefit
 *
 * Represents a business benefit or outcome of using the service.
 * Focuses on value proposition and customer outcomes.
 *
 * @example
 * const benefit: ServiceBenefit = {
 *     iconPath: '/images/services/icons/chart-icon.png',
 *     title: 'Increased Conversions',
 *     description: 'Our optimized UX design increases conversion rates by up to 40%'
 * }
 */
export type ServiceBenefit = {
    /**
     * Benefit icon image path
     * Recommended size: 48x48px or 64x64px
     */
    readonly iconPath: string

    /**
     * Benefit title
     */
    readonly title: string

    /**
     * Benefit description
     * Should focus on customer outcomes and measurable results
     */
    readonly description: string
}
