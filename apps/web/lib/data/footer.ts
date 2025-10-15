/**
 * Footer Data
 *
 * Configuration for footer sections and links
 */
import type { NavigationSection } from '@/lib/types/navigation.type'

export const footerSections: NavigationSection[] = [
    {
        title: 'Company',
        items: [
            { label: 'About', href: '/about', external: false },
            { label: 'Blog', href: '/blog', external: false },
            { label: 'Contact', href: '/contact', external: false },
        ],
    },
    {
        title: 'Resources',
        items: [
            { label: 'Documentation', href: '/docs', external: false },
            { label: 'Help Center', href: '/help', external: false },
            { label: 'Community', href: '/community', external: false },
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

export const copyrightText = `© ${new Date().getFullYear()} Your Company Name. All rights reserved.`
