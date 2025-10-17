'use client'

/**
 * Scroll Depth Tracking Utility
 *
 * Tracks user scroll depth at 25%, 50%, 75%, and 100% thresholds
 * using IntersectionObserver for performance and accuracy.
 *
 * @module lib/analytics/scroll-depth
 */
import { trackScrollDepth } from './analytics.client'

/**
 * Scroll depth thresholds to track
 */
export const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const

/**
 * Scroll depth threshold type
 */
export type ScrollThreshold = (typeof SCROLL_THRESHOLDS)[number]

/**
 * Options for scroll depth tracking
 */
export interface ScrollDepthOptions {
    /**
     * Custom thresholds to track (default: [25, 50, 75, 100])
     */
    thresholds?: readonly ScrollThreshold[]

    /**
     * Debounce delay in milliseconds (default: 100)
     */
    debounceMs?: number

    /**
     * Element to track scroll depth on (default: document.documentElement)
     */
    element?: HTMLElement

    /**
     * Callback function called when threshold is reached
     */
    onThresholdReached?: (threshold: ScrollThreshold) => void
}

/**
 * Tracks the maximum scroll depth reached
 */
let maxScrollDepth = 0

/**
 * Set of thresholds that have already been tracked
 */
const trackedThresholds = new Set<ScrollThreshold>()

/**
 * Get current scroll depth percentage
 *
 * @param element - Element to calculate scroll depth for
 * @returns Current scroll depth as a percentage (0-100)
 */
function getScrollDepth(
    element: HTMLElement = document.documentElement
): number {
    const windowHeight = window.innerHeight
    const documentHeight = element.scrollHeight
    const scrollTop = window.pageYOffset || element.scrollTop

    // Handle edge case where document is shorter than viewport
    if (documentHeight <= windowHeight) {
        return 100
    }

    const scrollableHeight = documentHeight - windowHeight
    const scrollPercentage = (scrollTop / scrollableHeight) * 100

    return Math.min(Math.round(scrollPercentage), 100)
}

/**
 * Check and track scroll depth thresholds
 *
 * @param currentDepth - Current scroll depth percentage
 * @param thresholds - Thresholds to check
 * @param onThresholdReached - Callback when threshold is reached
 */
function checkThresholds(
    currentDepth: number,
    thresholds: readonly ScrollThreshold[],
    onThresholdReached?: (threshold: ScrollThreshold) => void
): void {
    for (const threshold of thresholds) {
        // Track if we've reached this threshold and haven't tracked it yet
        if (currentDepth >= threshold && !trackedThresholds.has(threshold)) {
            trackedThresholds.add(threshold)

            // Track to analytics
            trackScrollDepth({
                percent: threshold,
                page_path: window.location.pathname,
            })

            // Call custom callback if provided
            onThresholdReached?.(threshold)
        }
    }
}

/**
 * Debounce utility
 *
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null
            func(...args)
        }

        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(later, wait)
    }
}

/**
 * Initialize scroll depth tracking
 *
 * Sets up scroll event listeners and tracks when user reaches
 * depth milestones (25%, 50%, 75%, 100%).
 *
 * @param options - Scroll tracking options
 * @returns Cleanup function to remove listeners
 *
 * @example
 * ```tsx
 * // In a component
 * useEffect(() => {
 *   const cleanup = initScrollDepthTracking({
 *     thresholds: [25, 50, 75, 100],
 *     onThresholdReached: (threshold) => {
 *       console.log(`User scrolled to ${threshold}%`)
 *     }
 *   })
 *
 *   return cleanup
 * }, [])
 * ```
 */
export function initScrollDepthTracking(
    options: ScrollDepthOptions = {}
): () => void {
    // Only run in browser
    if (typeof window === 'undefined') {
        return () => {}
    }

    const {
        thresholds = SCROLL_THRESHOLDS,
        debounceMs = 100,
        element = document.documentElement,
        onThresholdReached,
    } = options

    // Reset tracked thresholds for this page
    trackedThresholds.clear()
    maxScrollDepth = 0

    // Scroll handler
    const handleScroll = debounce(() => {
        const currentDepth = getScrollDepth(element)

        // Update max depth
        if (currentDepth > maxScrollDepth) {
            maxScrollDepth = currentDepth
            checkThresholds(maxScrollDepth, thresholds, onThresholdReached)
        }
    }, debounceMs)

    // Check initial scroll position (user may start mid-page)
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup function
    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
}

/**
 * Reset scroll depth tracking
 *
 * Clears all tracked thresholds and resets max depth.
 * Useful when navigating to a new page in SPA.
 *
 * @example
 * ```tsx
 * // Reset on route change
 * useEffect(() => {
 *   resetScrollDepthTracking()
 * }, [pathname])
 * ```
 */
export function resetScrollDepthTracking(): void {
    trackedThresholds.clear()
    maxScrollDepth = 0
}

/**
 * Get the maximum scroll depth reached so far
 *
 * @returns Maximum scroll depth percentage
 */
export function getMaxScrollDepth(): number {
    return maxScrollDepth
}

/**
 * Get all tracked thresholds
 *
 * @returns Set of thresholds that have been reached and tracked
 */
export function getTrackedThresholds(): ReadonlySet<ScrollThreshold> {
    return trackedThresholds
}
