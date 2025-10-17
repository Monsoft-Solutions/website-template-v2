import type { LucideIcon } from 'lucide-react'

/**
 * Service Benefit
 *
 * Represents a business benefit or outcome of using the service.
 * Focuses on value proposition and customer outcomes.
 *
 * @example
 * const benefit: ServiceBenefit = {
 *     icon: BarChart,
 *     title: 'Increased Conversions',
 *     description: 'Our optimized UX design increases conversion rates by up to 40%'
 * }
 */
export type ServiceBenefit = {
    /**
     * Benefit icon
     */
    readonly icon: LucideIcon

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
