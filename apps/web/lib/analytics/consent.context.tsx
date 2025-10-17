/**
 * Consent Context & Provider
 *
 * React context for managing user consent preferences.
 * Provides hooks for updating and checking consent state.
 *
 * @module consent.context
 */

'use client'

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'

import { env } from '@/env'

import type { ConsentState } from './analytics.types'
import {
    ACCEPTED_CONSENT_CONFIG,
    ESSENTIAL_CONSENT_CONFIG,
    clearConsentState,
    getStoredConsentState,
    initializeConsent,
    storeConsentState,
    updateConsent,
} from './consent.util'

/**
 * Consent Context & Provider
 *
 * React context for managing user consent preferences.
 * Provides hooks for updating and checking consent state.
 *
 * @module consent.context
 */

/**
 * Consent Context & Provider
 *
 * React context for managing user consent preferences.
 * Provides hooks for updating and checking consent state.
 *
 * @module consent.context
 */

/**
 * Consent Context & Provider
 *
 * React context for managing user consent preferences.
 * Provides hooks for updating and checking consent state.
 *
 * @module consent.context
 */

/**
 * Consent context value
 */
interface ConsentContextValue {
    /**
     * Current analytics consent state
     */
    consentState: ConsentState | null

    /**
     * Whether consent has been explicitly set by user
     */
    hasConsented: boolean

    /**
     * Accept all cookies
     */
    acceptAll: () => void

    /**
     * Accept only essential cookies
     */
    acceptEssential: () => void

    /**
     * Revoke consent (reset to default)
     */
    revokeConsent: () => void
}

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined)

/**
 * Consent Provider Props
 */
interface ConsentProviderProps {
    children: React.ReactNode
}

/**
 * Consent Provider Component
 *
 * Manages consent state and provides methods to update consent.
 * Should be placed high in the component tree (e.g., in providers).
 *
 * @example
 * ```tsx
 * <ConsentProvider>
 *   <App />
 * </ConsentProvider>
 * ```
 */
export function ConsentProvider({ children }: ConsentProviderProps) {
    const [consentState, setConsentState] = useState<ConsentState | null>(null)
    const [hasConsented, setHasConsented] = useState(false)

    // Initialize consent on mount
    useEffect(() => {
        // Initialize default consent before scripts load
        initializeConsent()

        // Check for stored consent preference
        const stored = getStoredConsentState()
        if (stored) {
            setConsentState(stored)
            setHasConsented(true)

            // Apply stored consent
            if (stored === 'granted') {
                updateConsent(ACCEPTED_CONSENT_CONFIG)
            } else {
                updateConsent(ESSENTIAL_CONSENT_CONFIG)
            }
        }
    }, [])

    /**
     * Accept all cookies
     */
    const acceptAll = useCallback(() => {
        updateConsent(ACCEPTED_CONSENT_CONFIG)
        storeConsentState('granted')
        setConsentState('granted')
        setHasConsented(true)

        if (env.NEXT_PUBLIC_NODE_ENV === 'development') {
            console.log('Analytics: User accepted all cookies')
        }
    }, [])

    /**
     * Accept only essential cookies
     */
    const acceptEssential = useCallback(() => {
        updateConsent(ESSENTIAL_CONSENT_CONFIG)
        storeConsentState('denied')
        setConsentState('denied')
        setHasConsented(true)

        if (env.NEXT_PUBLIC_NODE_ENV === 'development') {
            console.log('Analytics: User accepted essential cookies only')
        }
    }, [])

    /**
     * Revoke consent (reset to default)
     */
    const revokeConsent = useCallback(() => {
        updateConsent(ESSENTIAL_CONSENT_CONFIG)
        clearConsentState()
        setConsentState(null)
        setHasConsented(false)

        if (env.NEXT_PUBLIC_NODE_ENV === 'development') {
            console.log('Analytics: User revoked consent')
        }
    }, [])

    const value: ConsentContextValue = {
        consentState,
        hasConsented,
        acceptAll,
        acceptEssential,
        revokeConsent,
    }

    return (
        <ConsentContext.Provider value={value}>
            {children}
        </ConsentContext.Provider>
    )
}

/**
 * Hook to access consent context
 *
 * @throws Error if used outside ConsentProvider
 *
 * @example
 * ```tsx
 * function CookieBanner() {
 *   const { hasConsented, acceptAll, acceptEssential } = useConsent()
 *
 *   if (hasConsented) return null
 *
 *   return (
 *     <div>
 *       <button onClick={acceptAll}>Accept All</button>
 *       <button onClick={acceptEssential}>Essential Only</button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useConsent(): ConsentContextValue {
    const context = useContext(ConsentContext)

    if (context === undefined) {
        throw new Error('useConsent must be used within ConsentProvider')
    }

    return context
}
