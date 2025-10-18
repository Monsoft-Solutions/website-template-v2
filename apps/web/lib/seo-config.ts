/**
 * Site-specific SEO Configuration
 *
 * This file creates the SEO configuration using centralized site data.
 * All business and SEO information is pulled from site-config.ts
 */
import type { SEOConfig } from '@workspace/seo/config'

import { siteConfig } from '@/lib/data/site-config'

/**
 * Get the site's SEO configuration
 *
 * This function creates the SEO configuration using centralized site data
 * from site-config.ts instead of environment variables.
 *
 * @returns SEO configuration for the site
 */
export function getSEOConfig(): SEOConfig {
    const config: SEOConfig = {
        // Site identity from centralized config
        siteUrl: siteConfig.seo.siteUrl,
        siteName: siteConfig.seo.siteName,

        // Default metadata
        defaultMetadata: {
            title: siteConfig.seo.siteName,
            description: siteConfig.seo.siteDescription,
            keywords: siteConfig.seo.keywords,
            author: siteConfig.business.name,
            locale: siteConfig.seo.locale || 'en-US',
            image: {
                url: `${siteConfig.seo.siteUrl}${siteConfig.brand.ogImage}`,
                width: 1200,
                height: 630,
                alt: `${siteConfig.business.name} - ${siteConfig.business.tagline}`,
            },
        },

        // Organization information for Schema.org
        organization: {
            name: siteConfig.business.name,
            legalName: siteConfig.business.legalName,
            url: siteConfig.seo.siteUrl,
            logo: `${siteConfig.seo.siteUrl}${siteConfig.brand.logo}`,
            founders: siteConfig.business.founders,
            socialProfiles: siteConfig.social.map((social) => ({
                platform: social.platform,
                url: social.url,
            })),
        },

        // Open Graph configuration
        openGraph: {
            type: 'website',
            siteName: siteConfig.seo.siteName,
            locale: siteConfig.seo.locale || 'en-US',
            images: siteConfig.brand.ogImage
                ? [
                      {
                          url: `${siteConfig.seo.siteUrl}${siteConfig.brand.ogImage}`,
                          width: 1200,
                          height: 630,
                          alt: `${siteConfig.business.name} - ${siteConfig.business.tagline}`,
                      },
                  ]
                : undefined,
        },

        // Twitter Card configuration
        twitter: {
            cardType: 'summary_large_image',
            site: siteConfig.seo.twitterHandle,
            handle: siteConfig.seo.twitterHandle,
            creator: siteConfig.seo.twitterHandle,
        },

        // Robots configuration
        robots: {
            index: siteConfig.seo.enableIndexing ?? true,
            follow: siteConfig.seo.enableIndexing ?? true,
        },

        // Locale
        locale: siteConfig.seo.locale || 'en-US',
    }

    return config
}

/**
 * Export the SEO configuration
 */
export const seoConfig = getSEOConfig()
