/**
 * Service Process Step
 *
 * Represents a step in the service delivery process.
 * Used to visualize the workflow or methodology.
 *
 * @example
 * const step: ServiceProcessStep = {
 *     step: 1,
 *     title: 'Discovery & Planning',
 *     description: 'We analyze your requirements and create a detailed project roadmap',
 *     iconPath: '/images/services/icons/globe-icon.png'
 * }
 */
export type ServiceProcessStep = {
    /**
     * Step number (for display)
     * @minimum 1
     */
    readonly step: number

    /**
     * Step title
     */
    readonly title: string

    /**
     * Step description
     */
    readonly description: string

    /**
     * Optional icon image path for the step
     * Recommended size: 48x48px or 64x64px
     */
    readonly iconPath?: string
}
