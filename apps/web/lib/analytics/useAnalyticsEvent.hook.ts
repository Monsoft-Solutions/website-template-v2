'use client'

/**
 * Analytics Event Hook
 *
 * React hook for tracking custom events to Google Analytics and Microsoft Clarity
 * with type-safe event parameters and automatic browser guards.
 *
 * @module lib/analytics/useAnalyticsEvent
 */
import { useCallback } from 'react'

import { trackClarityEvent, trackEvent } from './analytics.client'
import type { EventParams } from './analytics.types'

/**
 * Options for tracking events
 */
export interface UseAnalyticsEventOptions {
    /**
     * Whether to also send the event to Microsoft Clarity
     * @default false
     */
    sendToClarity?: boolean

    /**
     * Transform event name for Clarity (if different from GA4)
     */
    clarityEventName?: string
}

/**
 * Hook return type
 */
export interface UseAnalyticsEventReturn {
    /**
     * Track an event to analytics platforms
     *
     * @param eventName - Event name (use lowercase snake_case)
     * @param params - Event parameters (avoid PII)
     * @param options - Additional tracking options
     */
    track: (
        eventName: string,
        params?: EventParams,
        options?: UseAnalyticsEventOptions
    ) => void

    /**
     * Track a click event with common parameters
     *
     * @param elementName - Name/ID of clicked element
     * @param additionalParams - Additional event parameters
     */
    trackClick: (elementName: string, additionalParams?: EventParams) => void

    /**
     * Track a form submission event
     *
     * @param formName - Name/ID of the form
     * @param additionalParams - Additional event parameters
     */
    trackFormSubmit: (formName: string, additionalParams?: EventParams) => void

    /**
     * Track a CTA (Call-to-Action) click event
     *
     * @param ctaName - Name/ID of the CTA
     * @param additionalParams - Additional event parameters
     */
    trackCTA: (ctaName: string, additionalParams?: EventParams) => void
}

/**
 * Custom hook for tracking analytics events
 *
 * Provides type-safe utilities to emit events to Google Analytics and
 * optionally Microsoft Clarity. Includes convenience methods for common
 * interaction patterns.
 *
 * @returns Analytics tracking utilities
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { track, trackClick, trackFormSubmit } = useAnalyticsEvent()
 *
 *   return (
 *     <>
 *       <button onClick={() => trackClick('subscribe_button', { location: 'hero' })}>
 *         Subscribe
 *       </button>
 *
 *       <form onSubmit={() => trackFormSubmit('contact_form')}>
 *         // ...
 *       </form>
 *     </>
 *   )
 * }
 * ```
 */
export function useAnalyticsEvent(): UseAnalyticsEventReturn {
    const track = useCallback(
        (
            eventName: string,
            params?: EventParams,
            options?: UseAnalyticsEventOptions
        ) => {
            // Track to Google Analytics
            trackEvent(eventName, params)

            // Optionally track to Clarity
            if (options?.sendToClarity) {
                const clarityName = options.clarityEventName ?? eventName
                trackClarityEvent(clarityName, params)
            }
        },
        []
    )

    const trackClick = useCallback(
        (elementName: string, additionalParams?: EventParams) => {
            track('click', {
                element_name: elementName,
                event_category: 'engagement',
                ...additionalParams,
            })
        },
        [track]
    )

    const trackFormSubmit = useCallback(
        (formName: string, additionalParams?: EventParams) => {
            track('form_submit', {
                form_name: formName,
                event_category: 'conversion',
                ...additionalParams,
            })
        },
        [track]
    )

    const trackCTA = useCallback(
        (ctaName: string, additionalParams?: EventParams) => {
            track('cta_click', {
                cta_name: ctaName,
                event_category: 'engagement',
                ...additionalParams,
            })
        },
        [track]
    )

    return {
        track,
        trackClick,
        trackFormSubmit,
        trackCTA,
    }
}
