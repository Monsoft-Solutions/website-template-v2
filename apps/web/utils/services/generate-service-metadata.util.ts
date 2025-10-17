/**
 * Service Metadata Generation Utility
 *
 * Functions to generate Next.js metadata for service pages.
 * Handles both service detail pages and the services listing page.
 *
 * @example Service detail page
 * export async function generateMetadata({ params }: PageProps) {
 *     const service = getServiceBySlug(params.slug)
 *     if (!service) return { title: 'Service Not Found' }
 *     return generateServiceMetadata(service)
 * }
 *
 * @example Services listing page
 * export function generateMetadata() {
 *     return generateServicesListingMetadata()
 * }
 */
import type { Metadata } from 'next'

import type { Service } from '@/lib/types/services'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

/**
 * Generate metadata for service detail page
 *
 * Creates optimized metadata for individual service pages including:
 * - Page title (custom or generated from service name)
 * - Meta description (custom or from service excerpt)
 * - OpenGraph tags with service image
 * - Twitter card configuration
 * - Canonical URL
 *
 * @param service - The service data object
 * @returns Next.js Metadata object
 *
 * @example
 * const service = getServiceBySlug('web-development')
 * const metadata = generateServiceMetadata(service)
 * // Returns: { title: 'Web Development | Your Company', description: '...', ... }
 */
export function generateServiceMetadata(service: Service): Metadata {
    // Use custom SEO title or generate from service title
    const title =
        service.seo.title ?? `${service.title} | ${seoConfig.siteName}`

    // Use custom SEO description or fallback to excerpt
    const description = service.seo.description ?? service.excerpt

    // Determine OpenGraph image
    let ogImageUrl: string | undefined

    // Priority: custom SEO image > service image > undefined
    if (service.seo.ogImage) {
        ogImageUrl = service.seo.ogImage
    } else if (service.iconConfig.type !== 'icon') {
        ogImageUrl = service.iconConfig.imagePath
    }

    return toNextMetadata(seoConfig, {
        title,
        description,
        keywords: service.seo.keywords,
        canonical: `/services/${service.slug}`,
        openGraph: {
            type: 'website',
            title,
            description,
            images: ogImageUrl
                ? [
                      {
                          url: ogImageUrl,
                          alt:
                              service.iconConfig.type !== 'icon'
                                  ? service.iconConfig.imageAlt
                                  : service.title,
                      },
                  ]
                : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ogImageUrl ? [ogImageUrl] : undefined,
        },
    })
}

/**
 * Generate metadata for services listing page
 *
 * Creates metadata for the main /services page that lists all services.
 * Uses default service page metadata with listing-specific content.
 *
 * @returns Next.js Metadata object
 *
 * @example
 * export function generateMetadata() {
 *     return generateServicesListingMetadata()
 * }
 */
export function generateServicesListingMetadata(): Metadata {
    return toNextMetadata(seoConfig, {
        title: `Our Services | ${seoConfig.siteName}`,
        description:
            'Explore our comprehensive range of professional services designed to help your business grow and succeed. From development to design and marketing.',
        canonical: '/services',
        openGraph: {
            type: 'website',
            title: `Our Services | ${seoConfig.siteName}`,
            description:
                'Explore our comprehensive range of professional services designed to help your business grow and succeed.',
        },
        twitter: {
            card: 'summary_large_image',
            title: `Our Services | ${seoConfig.siteName}`,
            description:
                'Explore our comprehensive range of professional services designed to help your business grow and succeed.',
        },
    })
}
