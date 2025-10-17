/**
 * Analytics Configuration
 *
 * Environment-driven configuration for analytics services.
 * Scripts only load when IDs are present.
 *
 * @module analytics.config
 */
import { env } from '@/env'

import type { AnalyticsConfig } from './analytics.types'

/**
 * Get analytics configuration from environment variables
 *
 * @returns Analytics configuration object
 *
 * @example
 * ```ts
 * const config = getAnalyticsConfig()
 * if (config.ga?.enabled) {
 *   // Load GA4
 * }
 * ```
 */
export function getAnalyticsConfig(): AnalyticsConfig {
    const gaMeasurementId = env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    const clarityProjectId = env.NEXT_PUBLIC_CLARITY_PROJECT_ID
    const gtmId = env.NEXT_PUBLIC_GTM_ID

    return {
        ga: gaMeasurementId
            ? {
                  measurementId: gaMeasurementId,
                  enabled: true,
              }
            : undefined,
        clarity: clarityProjectId
            ? {
                  projectId: clarityProjectId,
                  enabled: true,
              }
            : undefined,
        gtm: gtmId
            ? {
                  containerId: gtmId,
                  enabled: true,
              }
            : undefined,
    }
}

/**
 * Check if any analytics service is enabled
 *
 * @returns True if at least one analytics service is configured
 *
 * @example
 * ```ts
 * if (isAnalyticsEnabled()) {
 *   // Show cookie banner
 * }
 * ```
 */
export function isAnalyticsEnabled(): boolean {
    const config = getAnalyticsConfig()
    return !!(
        config.ga?.enabled ||
        config.clarity?.enabled ||
        config.gtm?.enabled
    )
}
