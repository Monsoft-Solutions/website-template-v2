/**
 * Analytics Module
 *
 * Centralized analytics utilities for Google Analytics 4 (GA4)
 * and Microsoft Clarity with Consent Mode v2 support.
 *
 * @module analytics
 */

// Configuration
export { getAnalyticsConfig, isAnalyticsEnabled } from './config'

// Client utilities
export {
    identifyClarityUser,
    trackClarityEvent,
    trackEvent,
    trackPageView,
    trackScrollDepth,
    upgradeClaritySession,
} from './analytics.client'

// Types
export type {
    AnalyticsConfig,
    ClarityFunction,
    ConsentConfig,
    ConsentState,
    ConsentStorageType,
    EventParams,
    GtagFunction,
    PageViewParams,
    ScrollDepthParams,
} from './analytics.types'

// Consent utilities
export {
    ACCEPTED_CONSENT_CONFIG,
    DEFAULT_CONSENT_CONFIG,
    ESSENTIAL_CONSENT_CONFIG,
    clearConsentState,
    getStoredConsentState,
    grantAnalyticsConsent,
    initializeConsent,
    revokeAnalyticsConsent,
    storeConsentState,
    updateConsent,
} from './consent.util'

// Consent context
export { ConsentProvider, useConsent } from './consent.context'
