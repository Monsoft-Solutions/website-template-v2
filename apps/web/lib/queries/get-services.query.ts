/**
 * Service Query Functions
 *
 * Functions to retrieve and filter service data.
 * These queries are used throughout the application to access service information.
 *
 * @example Get all published services
 * const services = getPublishedServices()
 *
 * @example Get services by category
 * const devServices = getServicesByCategory('development')
 *
 * @example Get all categories
 * const categories = getServiceCategories()
 */
import type { Service, ServiceCategory } from '@/lib/types/services'
import { services } from '@/lib/data/services/services-data'

/**
 * Get all published services sorted by order
 *
 * Filters out unpublished services and sorts by the `order` field (ascending).
 * Services without an explicit order value default to 0.
 *
 * @returns Array of published services, sorted by order
 *
 * @example
 * const allServices = getPublishedServices()
 * // Returns: [{ slug: 'web-dev', order: 1, ... }, { slug: 'design', order: 2, ... }]
 */
export function getPublishedServices(): Service[] {
    return services
        .filter((service) => service.isPublished !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

/**
 * Get services by category
 *
 * Filters published services to return only those matching the specified category.
 *
 * @param category - The category to filter by
 * @returns Array of published services in the specified category, sorted by order
 *
 * @example
 * const devServices = getServicesByCategory('development')
 * // Returns: [{ slug: 'web-dev', category: 'development', ... }, ...]
 */
export function getServicesByCategory(
    category: ServiceCategory | string
): Service[] {
    return getPublishedServices().filter(
        (service) => service.category === category
    )
}

/**
 * Get all unique categories
 *
 * Returns a list of all categories that have at least one published service.
 * Useful for building category filters or navigation.
 *
 * @returns Array of unique category strings
 *
 * @example
 * const categories = getServiceCategories()
 * // Returns: ['development', 'design', 'marketing']
 */
export function getServiceCategories(): string[] {
    const categories = new Set(
        getPublishedServices().map((service) => service.category)
    )
    return Array.from(categories)
}
