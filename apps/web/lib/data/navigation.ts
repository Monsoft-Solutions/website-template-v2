/**
 * Navigation Data
 *
 * Configuration for site navigation and contact information
 */
import type {
    ContactInfo,
    NavigationItem,
    SocialLink,
} from '@/lib/types/navigation.type'

export const mainNavigation: NavigationItem[] = [
    { label: 'Home', href: '/', external: false },
    { label: 'About', href: '/about', external: false },
    { label: 'Blog', href: '/blog', external: false },
    { label: 'Contact', href: '/contact', external: false },
]

export const contactInfo: ContactInfo = {
    phone: '+1-555-123-4567',
    email: 'contact@example.com',
    address: '123 Main St, City, State 12345',
}

export const socialLinks: SocialLink[] = [
    {
        platform: 'github',
        url: 'https://github.com/example',
        label: 'GitHub',
    },
    {
        platform: 'twitter',
        url: 'https://twitter.com/example',
        label: 'Twitter/X',
    },
    {
        platform: 'linkedin',
        url: 'https://linkedin.com/company/example',
        label: 'LinkedIn',
    },
]
