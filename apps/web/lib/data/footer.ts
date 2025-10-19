/**
 * Footer Data
 *
 * Configuration for footer sections and links.
 * Company name is pulled from centralized site-config.
 */
import { businessInfo, siteConfig } from '@/lib/data/site-config'
import { getPublishedServices } from '@/lib/queries/get-services.query'
import type { NavigationSection } from '@/lib/types/navigation.type'

/**
 * Get services navigation items
 *
 * Dynamically generates navigation items from published services
 */
function getServicesNavigation(): NavigationSection {
    const services = getPublishedServices()

    return {
        title: 'Services',
        items: [
            // Services overview link
            {
                label: 'All Services',
                href: '/services',
                external: false,
            },
            // Individual service links (limited to first 5 for footer space)
            ...services.slice(0, 5).map((service) => ({
                label: service.title,
                href: `/services/${service.slug}`,
                external: false as const,
            })),
        ],
    }
}

export const footerSections: NavigationSection[] = [
    {
        title: 'Company',
        items: [
            { label: 'About', href: '/about', external: false },
            { label: 'Blog', href: '/blog', external: false },
            { label: 'Contact', href: '/contact', external: false },
        ],
    },
    getServicesNavigation(),
    {
        title: 'Resources',
        items: [
            {
                label: 'GitHub',
                href:
                    siteConfig.social.find((s) => s.platform === 'github')
                        ?.url ?? '',
                external: true,
            },
        ],
    },
    {
        title: 'Legal',
        items: [
            { label: 'Privacy Policy', href: '/privacy', external: false },
            { label: 'Terms of Service', href: '/terms', external: false },
            { label: 'Cookie Policy', href: '/cookies', external: false },
        ],
    },
]

/**
 * Copyright text using centralized business name
 */
export const copyrightText = `© ${new Date().getFullYear()} ${businessInfo.name}. All rights reserved.`
