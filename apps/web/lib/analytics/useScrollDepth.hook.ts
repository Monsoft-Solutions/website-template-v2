'use client'

/**
 * Scroll Depth Tracking Hook
 *
 * React hook for tracking scroll depth in components.
 * Automatically sets up and cleans up scroll tracking.
 *
 * @module lib/analytics/useScrollDepth
 */
import { useEffect, useRef } from 'react'

import {
    type ScrollDepthOptions,
    initScrollDepthTracking,
    resetScrollDepthTracking,
} from './scroll-depth.util'

/**
 * Hook options
 */
export interface UseScrollDepthOptions extends ScrollDepthOptions {
    /**
     * Whether tracking is enabled
     * @default true
     */
    enabled?: boolean

    /**
     * Reset tracking when pathname changes
     * @default true
     */
    resetOnPathChange?: boolean
}

/**
 * Custom hook to track scroll depth
 *
 * Automatically initializes scroll depth tracking when the component mounts
 * and cleans up when it unmounts. Optionally resets tracking on path changes.
 *
 * @param options - Scroll tracking options
 *
 * @example
 * ```tsx
 * function BlogPost() {
 *   // Track scroll depth for this blog post
 *   useScrollDepth({
 *     thresholds: [25, 50, 75, 100],
 *     onThresholdReached: (threshold) => {
 *       console.log(`Reader scrolled ${threshold}% of article`)
 *     }
 *   })
 *
 *   return <article>...</article>
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Conditional tracking (e.g., only on long-form content)
 * function ContentPage({ isLongForm }) {
 *   useScrollDepth({
 *     enabled: isLongForm,
 *   })
 *
 *   return <div>...</div>
 * }
 * ```
 */
export function useScrollDepth(options: UseScrollDepthOptions = {}): void {
    const {
        enabled = true,
        resetOnPathChange = true,
        ...trackingOptions
    } = options

    // Track if we've initialized to prevent double-init
    const initializedRef = useRef(false)

    useEffect(() => {
        // Skip if disabled or already initialized
        if (!enabled) return

        // Reset tracking if needed
        if (resetOnPathChange && initializedRef.current) {
            resetScrollDepthTracking()
        }

        // Initialize tracking
        const cleanup = initScrollDepthTracking(trackingOptions)
        initializedRef.current = true

        // Return cleanup function
        return () => {
            cleanup()
            initializedRef.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, resetOnPathChange])
}
