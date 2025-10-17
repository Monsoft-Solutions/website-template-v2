/**
 * Analytics Provider Component
 *
 * Centralized analytics provider that conditionally loads all analytics services.
 * Loads only the services configured via environment variables.
 *
 * @module components/analytics
 */

'use client'

import { getAnalyticsConfig } from '@/lib/analytics'

import { Clarity } from './Clarity.component'
import { FacebookPixel } from './FacebookPixel.component'
import { GoogleAnalytics } from './GoogleAnalytics.component'
import { GoogleTagManager } from './GoogleTagManager.component'

/**
 * Analytics Provider Component
 *
 * Conditionally loads analytics scripts based on environment configuration.
 * Centralizes all analytics service integrations in a single component.
 *
 * Supported services:
 * - Google Analytics 4 (GA4)
 * - Google Tag Manager (GTM)
 * - Microsoft Clarity
 * - Facebook Pixel
 *
 * @example
 * ```tsx
 * // In your root layout
 * <AnalyticsProvider />
 * ```
 */
export function AnalyticsProvider() {
    const analyticsConfig = getAnalyticsConfig()

    return (
        <>
            {/* Google Analytics 4 */}
            {analyticsConfig.ga?.enabled && (
                <GoogleAnalytics
                    measurementId={analyticsConfig.ga.measurementId}
                />
            )}

            {/* Google Tag Manager */}
            {analyticsConfig.gtm?.enabled && (
                <GoogleTagManager
                    containerId={analyticsConfig.gtm.containerId}
                />
            )}

            {/* Microsoft Clarity */}
            {analyticsConfig.clarity?.enabled && (
                <Clarity projectId={analyticsConfig.clarity.projectId} />
            )}

            {/* Facebook Pixel */}
            {analyticsConfig.facebookPixel?.enabled && (
                <FacebookPixel
                    pixelId={analyticsConfig.facebookPixel.pixelId}
                />
            )}
        </>
    )
}
