/**
 * Get Single Service Query
 *
 * Function to retrieve a single service by its slug.
 * Used primarily on service detail pages to fetch the service data.
 *
 * @example
 * const service = getServiceBySlug('web-development')
 * if (!service) {
 *     notFound()
 * }
 */
import type { Service } from '@/lib/types/services'
import { services } from '@/lib/data/services/services-data'

/**
 * Get service by slug
 *
 * Finds and returns a single published service matching the provided slug.
 * Returns undefined if no matching service is found or if the service is unpublished.
 *
 * @param slug - The service slug to search for (e.g., 'web-development')
 * @returns The matching service or undefined if not found
 *
 * @example
 * const service = getServiceBySlug('web-development')
 * if (service) {
 *     console.log(service.title) // 'Web Development'
 * }
 *
 * @example With Next.js notFound
 * import { notFound } from 'next/navigation'
 *
 * const service = getServiceBySlug(params.slug)
 * if (!service) {
 *     notFound()
 * }
 */
export function getServiceBySlug(slug: string): Service | undefined {
    return services.find(
        (service) => service.slug === slug && service.isPublished !== false
    )
}
