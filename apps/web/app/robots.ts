/**
 * Robots.txt Route Handler
 *
 * Generates dynamic robots.txt with environment-aware rules and sitemap references.
 * This file exports a function that returns MetadataRoute.Robots for Next.js.
 */
import {
    type RobotsGeneratorConfig,
    createCommonRobotsRules,
    detectEnvironment,
    generateRobots,
} from '@workspace/seo'
import type { MetadataRoute } from 'next'

import { seoDefaults } from '@/lib/data/site-config'

/**
 * Get the base URL for the site
 * Uses site config which automatically reads from NEXT_PUBLIC_SITE_URL env var
 */
function getBaseUrl(): string {
    return seoDefaults.siteUrl
}

/**
 * Get additional disallowed paths specific to this application
 */
function getAppSpecificDisallows(): string[] {
    return [
        // Add app-specific paths to block
        '/dashboard/*',
        '/user/*',
        '/temp/*',
        '*.pdf',
        '/downloads/*',
        '/uploads/*',
    ]
}

/**
 * Main robots.txt generation function
 * This is called by Next.js to generate the robots.txt
 */
export default function robots(): MetadataRoute.Robots {
    const environment = detectEnvironment()
    const baseUrl = getBaseUrl()

    const config: RobotsGeneratorConfig = {
        environment,
        baseUrl,
        sitemapUrl: '/sitemap.xml',
        crawlDelay: environment === 'production' ? 1 : undefined,
        customRules:
            environment === 'production'
                ? createCommonRobotsRules()
                : undefined,
        additionalDisallows: getAppSpecificDisallows(),
    }

    try {
        return generateRobots(config)
    } catch (error) {
        console.error('Error generating robots.txt:', error)

        // Fallback to basic robots.txt
        return {
            rules: [
                {
                    userAgent: '*',
                    disallow:
                        environment === 'production'
                            ? ['/api/*', '/admin/*']
                            : ['/'],
                },
            ],
            sitemap:
                environment === 'production'
                    ? `${baseUrl}/sitemap.xml`
                    : undefined,
        }
    }
}

// Export the robots function as the default export
// This is required by Next.js for robots.ts files
