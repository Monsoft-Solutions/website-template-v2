/**
 * Consent Mode v2 Utilities
 *
 * Privacy-first consent management for Google Analytics 4.
 * Implements Consent Mode v2 standards for GDPR/CCPA compliance.
 *
 * @see https://developers.google.com/tag-platform/devguides/consent
 * @module consent.util
 */
import { env } from '@/env'

import type { ConsentConfig, ConsentState } from './analytics.types'

/**
 * Default consent state (privacy-first, all denied except essential)
 * This should be set BEFORE any analytics scripts load
 */
export const DEFAULT_CONSENT_CONFIG: ConsentConfig = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
} as const

/**
 * Consent state when user accepts all cookies
 */
export const ACCEPTED_CONSENT_CONFIG: ConsentConfig = {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
    functionality_storage: 'granted',
    personalization_storage: 'granted',
    security_storage: 'granted',
} as const

/**
 * Consent state when user accepts only essential cookies
 */
export const ESSENTIAL_CONSENT_CONFIG: ConsentConfig = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
} as const

/**
 * Initialize default consent state
 * Must be called before GA4 scripts load
 *
 * @example
 * ```ts
 * initializeConsent()
 * ```
 */
export function initializeConsent(): void {
    if (typeof window === 'undefined') return
    if (!window.gtag) return

    try {
        window.gtag('consent', 'default', DEFAULT_CONSENT_CONFIG)

        if (env.NODE_ENV === 'development') {
            console.log('Analytics: Consent mode initialized (default: denied)')
        }
    } catch (error) {
        if (env.NODE_ENV === 'development') {
            console.error('Analytics: Failed to initialize consent', error)
        }
    }
}

/**
 * Update consent state
 * Call this when user makes a consent choice
 *
 * @param config - The new consent configuration
 *
 * @example
 * ```ts
 * // User accepts all
 * updateConsent(ACCEPTED_CONSENT_CONFIG)
 *
 * // User accepts only essential
 * updateConsent(ESSENTIAL_CONSENT_CONFIG)
 *
 * // Custom consent
 * updateConsent({
 *   ...DEFAULT_CONSENT_CONFIG,
 *   analytics_storage: 'granted'
 * })
 * ```
 */
export function updateConsent(config: Partial<ConsentConfig>): void {
    if (typeof window === 'undefined') return
    if (!window.gtag) return

    try {
        window.gtag('consent', 'update', config)

        if (env.NODE_ENV === 'development') {
            console.log('Analytics: Consent updated', config)
        }
    } catch (error) {
        if (env.NODE_ENV === 'development') {
            console.error('Analytics: Failed to update consent', error)
        }
    }
}

/**
 * Grant analytics storage consent
 * Convenience method for analytics-only consent
 *
 * @example
 * ```ts
 * grantAnalyticsConsent()
 * ```
 */
export function grantAnalyticsConsent(): void {
    updateConsent({
        analytics_storage: 'granted',
    })
}

/**
 * Revoke analytics storage consent
 * Convenience method for revoking analytics
 *
 * @example
 * ```ts
 * revokeAnalyticsConsent()
 * ```
 */
export function revokeAnalyticsConsent(): void {
    updateConsent({
        analytics_storage: 'denied',
    })
}

/**
 * Check if analytics consent has been granted
 * Note: This checks localStorage, not live gtag state
 *
 * @returns The current analytics consent state if stored
 *
 * @example
 * ```ts
 * const state = getStoredConsentState()
 * if (state === 'granted') {
 *   // Analytics is enabled
 * }
 * ```
 */
export function getStoredConsentState(): ConsentState | null {
    if (typeof window === 'undefined') return null

    try {
        const stored = localStorage.getItem('analytics_consent')
        if (stored === 'granted' || stored === 'denied') {
            return stored
        }
    } catch {
        // localStorage might be unavailable
    }

    return null
}

/**
 * Store consent state in localStorage
 * Used to persist user choice across sessions
 *
 * @param state - The consent state to store
 *
 * @example
 * ```ts
 * storeConsentState('granted')
 * ```
 */
export function storeConsentState(state: ConsentState): void {
    if (typeof window === 'undefined') return

    try {
        localStorage.setItem('analytics_consent', state)
    } catch {
        // localStorage might be unavailable
        if (env.NODE_ENV === 'development') {
            console.warn('Analytics: Failed to store consent state')
        }
    }
}

/**
 * Clear stored consent state
 *
 * @example
 * ```ts
 * clearConsentState()
 * ```
 */
export function clearConsentState(): void {
    if (typeof window === 'undefined') return

    try {
        localStorage.removeItem('analytics_consent')
    } catch {
        // localStorage might be unavailable
    }
}
