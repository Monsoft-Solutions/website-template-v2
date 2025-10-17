/**
 * Service Schema Utilities
 *
 * Functions to generate Schema.org structured data for service pages.
 * This helps search engines understand the content and display rich results.
 *
 * @see https://schema.org/Service
 * @see https://schema.org/ItemList
 */

import { siteConfig } from '@/lib/data/site-config'
import type { Service } from '@/lib/types/services'

/**
 * Generate Service schema for individual service pages
 *
 * Creates a Service schema with provider information, service type,
 * and relevant metadata for search engines.
 *
 * @param service - Service data object
 * @param url - Full URL to the service page
 * @returns Schema.org Service object
 *
 * @example
 * const schema = generateServiceSchema(service, 'https://example.com/services/web-development')
 */
export function generateServiceSchema(service: Service, url: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.excerpt,
        provider: {
            '@type': 'Organization',
            name: siteConfig.business.name,
            url: siteConfig.seo.siteUrl,
        },
        serviceType: service.categoryLabel,
        url,
        image:
            service.iconConfig.type === 'both' ||
            service.iconConfig.type === 'image'
                ? `${siteConfig.seo.siteUrl}${service.iconConfig.imagePath}`
                : undefined,
        offers: service.cta
            ? {
                  '@type': 'Offer',
                  description: service.cta.description,
                  url: `${siteConfig.seo.siteUrl}${service.cta.primaryButton.href}`,
              }
            : undefined,
    }
}

/**
 * Generate ItemList schema for services listing page
 *
 * Creates an ItemList schema that lists all published services.
 * This helps search engines understand the relationship between services.
 *
 * @param services - Array of published services
 * @param baseUrl - Base URL for the site
 * @returns Schema.org ItemList object
 *
 * @example
 * const schema = generateServicesListSchema(services, 'https://example.com')
 */
export function generateServicesListSchema(
    services: Service[],
    baseUrl: string
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Our Services',
        description: 'Complete list of services we offer',
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Service',
                name: service.title,
                description: service.excerpt,
                url: `${baseUrl}/services/${service.slug}`,
                serviceType: service.categoryLabel,
            },
        })),
    }
}

/**
 * Generate BreadcrumbList schema for navigation
 *
 * Creates a BreadcrumbList schema for service pages.
 * Helps search engines understand the site structure.
 *
 * @param service - Service data object (optional, for detail pages)
 * @param baseUrl - Base URL for the site
 * @returns Schema.org BreadcrumbList object
 *
 * @example
 * // For listing page
 * const schema = generateServiceBreadcrumbSchema(undefined, 'https://example.com')
 *
 * // For detail page
 * const schema = generateServiceBreadcrumbSchema(service, 'https://example.com')
 */
export function generateServiceBreadcrumbSchema(
    service: Service | undefined,
    baseUrl: string
) {
    const items = [
        {
            '@type': 'ListItem' as const,
            position: 1,
            name: 'Home',
            item: baseUrl,
        },
        {
            '@type': 'ListItem' as const,
            position: 2,
            name: 'Services',
            item: `${baseUrl}/services`,
        },
    ]

    if (service) {
        items.push({
            '@type': 'ListItem' as const,
            position: 3,
            name: service.title,
            item: `${baseUrl}/services/${service.slug}`,
        })
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items,
    }
}
