/**
 * Site Configuration
 *
 * CENTRAL SOURCE OF TRUTH for all business and site information.
 *
 * 🎯 UPDATE THIS FILE when creating websites for new clients.
 *
 * This configuration is used across:
 * - SEO metadata and Open Graph tags
 * - Contact pages and forms
 * - Footer and header components
 * - Social media links
 * - Structured data (Schema.org)
 */
import { env } from '@/env'
import type { SiteConfig } from '@/lib/types/site-config.type'

/**
 * Get the site URL from environment variable
 * Falls back to VERCEL_URL or a default value
 */
function getSiteUrl(): string {
    // Priority: NEXT_PUBLIC_SITE_URL -> VERCEL_URL -> default
    if (env.NEXT_PUBLIC_SITE_URL) {
        return env.NEXT_PUBLIC_SITE_URL
    }

    if (env.VERCEL_URL) {
        return `https://${env.VERCEL_URL}`
    }

    return 'https://example.com' // Fallback for local development
}

/**
 * Main Site Configuration
 *
 * Update all values below for each new client/project.
 */
export const siteConfig: SiteConfig = {
    /**
     * Business Information
     */
    business: {
        name: 'ACME',
        legalName: 'ACME LLC',
        tagline: 'Building modern web experiences with excellence',
        description:
            'ACME is a company that builds modern web experiences with excellence.',
        foundedYear: 2024,
        founders: ['John Doe', 'Jane Smith'],
        organizationType: 'Corporation',
    },

    /**
     * Contact Information
     */
    contact: {
        phone: '+1-555-123-4567',
        phoneDisplay: '+1 (555) 123-4567',
        email: 'contact@example.com',
        supportEmail: 'support@example.com',
        address: '123 Main St',
        addressLine2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'United States',
        timezone: 'America/Los_Angeles',

        // Business hours
        businessHours: [
            {
                days: 'Monday - Friday',
                open: '9:00 AM',
                close: '5:00 PM',
            },
            {
                days: 'Saturday',
                open: '10:00 AM',
                close: '2:00 PM',
            },
            {
                days: 'Sunday',
                open: 'Closed',
                close: 'Closed',
                note: 'Closed on Sundays and public holidays',
            },
        ],

        // Support hours (if different from business hours)
        supportHours: [
            {
                days: 'Monday - Friday',
                open: '8:00 AM',
                close: '8:00 PM',
            },
            {
                days: 'Saturday - Sunday',
                open: '10:00 AM',
                close: '4:00 PM',
            },
        ],
    },

    /**
     * Social Media Links
     */
    social: [
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
    ],

    /**
     * Brand Assets
     */
    brand: {
        logo: '/logo.png',
        logoAlt: 'Your Company Name Logo',
        favicon: '/favicon.png',
        appleTouchIcon: '/apple-touch-icon.png',
        ogImage: '/og-image.jpg',
    },

    /**
     * SEO Defaults
     */
    seo: {
        siteUrl: getSiteUrl(), // Dynamically from environment
        siteName: 'Your Company Name',
        siteDescription:
            'Building modern web experiences with cutting-edge technology and design excellence.',
        keywords: [
            'web development',
            'modern web',
            'technology',
            'design',
            'software',
        ],
        locale: 'en-US',
        twitterHandle: '@example',
        facebookAppId: '',
        enableIndexing: true,
    },
}

/**
 * Helper function to get full address string
 */
export function getFullAddress(): string {
    const { address, addressLine2, city, state, postalCode, country } =
        siteConfig.contact

    const parts = [
        address,
        addressLine2,
        city && state ? `${city}, ${state}` : city || state,
        postalCode,
        country,
    ].filter(Boolean)

    return parts.join(', ')
}

/**
 * Helper function to get formatted phone number for tel: links
 */
export function getPhoneLink(): string {
    return `tel:${siteConfig.contact.phone.replace(/[\s()-]/g, '')}`
}

/**
 * Helper function to get email link
 */
export function getEmailLink(): string {
    return `mailto:${siteConfig.contact.email}`
}

/**
 * Helper function to get support email link
 */
export function getSupportEmailLink(): string {
    return `mailto:${siteConfig.contact.supportEmail || siteConfig.contact.email}`
}

/**
 * Export individual sections for convenience
 */
export const businessInfo = siteConfig.business
export const contactInfo = siteConfig.contact
export const socialLinks = siteConfig.social
export const brandAssets = siteConfig.brand
export const seoDefaults = siteConfig.seo
