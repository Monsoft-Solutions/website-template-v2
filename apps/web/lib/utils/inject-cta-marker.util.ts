/**
 * CTA Injection Utility
 *
 * Determines where to inject a CTA within blog post content.
 * Supports both explicit markdown markers and automatic placement.
 */

/**
 * Result of finding CTA insertion point
 */
export type CTAInsertionResult = {
    /**
     * Content before the CTA
     */
    readonly beforeCTA: string

    /**
     * Content after the CTA
     */
    readonly afterCTA: string

    /**
     * Whether an explicit marker was found
     */
    readonly hasMarker: boolean

    /**
     * CTA type ID extracted from marker (e.g., "consultation" from <!-- CTA:consultation -->)
     * Only present when explicit marker with type is found
     */
    readonly ctaId?: string
}

/**
 * Check if a line is part of a markdown block that shouldn't be split
 *
 * @param line - The line to check
 * @param context - Surrounding lines for context
 * @returns true if line is part of unsplittable block
 */
function isUnsplittableLine(
    line: string,
    context: { previous?: string; next?: string }
): boolean {
    const trimmed = line.trim()

    // Don't split on:
    // - Code blocks (```)
    if (trimmed.startsWith('```')) return true

    // - List items
    if (/^[-*+]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) return true

    // - Headings
    if (/^#{1,6}\s/.test(trimmed)) return true

    // - Blockquotes
    if (trimmed.startsWith('>')) return true

    // - Tables
    if (trimmed.includes('|')) return true

    // - HTML tags (opening or closing)
    if (/<\/?[a-z][\s\S]*>/i.test(trimmed)) return true

    // - Image or link references
    if (/^\[.*\]:/.test(trimmed) || /^!\[/.test(trimmed)) return true

    // Check if previous line suggests continuation
    if (context.previous) {
        const prevTrimmed = context.previous.trim()
        // Previous line is a heading (don't split right after heading)
        if (/^#{1,6}\s/.test(prevTrimmed)) return true

        // Previous line ends with double colon (definition lists) – avoid splitting
        if (prevTrimmed.endsWith('::')) return true
    }

    return false
}

/**
 * Find the optimal insertion point for a CTA in blog content
 *
 * Logic:
 * 1. First checks for explicit <!-- CTA --> or <!-- CTA:type --> marker in markdown
 * 2. If no marker found, calculates 40% split point and then:
 *    - Looks for next ## heading after 40% point to insert CTA before it
 *    - If no ## heading found, looks for next ### heading after 40% point
 *    - If no headings found, falls back to intelligent paragraph splitting
 *
 * @param content - The markdown content to split
 * @returns Object with content before/after CTA, marker flag, and optional ctaId
 */
export function findCTAInsertionPoint(content: string): CTAInsertionResult {
    // Check for explicit marker first (supports both <!-- CTA --> and <!-- CTA:type -->)
    const ctaMarkerRegex = /<!--\s*CTA(?::(\w+))?\s*-->/
    const markerMatch = content.match(ctaMarkerRegex)

    if (markerMatch) {
        const marker = markerMatch[0]
        const ctaId = markerMatch[1] // Extract type if present (e.g., "consultation")
        const parts = content.split(marker)

        return {
            beforeCTA: parts[0]?.trim() ?? '',
            afterCTA: parts.slice(1).join(marker).trim(),
            hasMarker: true,
            ctaId,
        }
    }

    // No marker found - find next appropriate heading after 40% point
    const lines = content.split('\n')
    const totalLines = lines.length

    // Calculate target line (40% of content)
    const targetLine = Math.floor(totalLines * 0.4)

    // Look for next ## heading after target line (excluding ### and higher)
    let headingIndex = -1

    for (let i = targetLine; i < totalLines; i++) {
        const line = lines[i]?.trim() ?? ''

        // Check for second level heading (## but not ###)
        if (line.startsWith('## ') && !line.startsWith('### ')) {
            headingIndex = i
            break
        }
    }

    // If no ## heading found, look for ### heading after target line
    if (headingIndex === -1) {
        for (let i = targetLine; i < totalLines; i++) {
            const line = lines[i]?.trim() ?? ''

            // Check for third level heading (### but not ####)
            if (line.startsWith('### ') && !line.startsWith('#### ')) {
                headingIndex = i
                break
            }
        }
    }

    let splitIndex = targetLine

    if (headingIndex !== -1) {
        // Insert before the heading - look for preceding blank line for better formatting
        splitIndex = headingIndex

        // Look backwards from heading to find a blank line for cleaner insertion
        for (let i = headingIndex - 1; i >= targetLine; i--) {
            const line = lines[i]?.trim() ?? ''
            if (line === '') {
                splitIndex = i
                break
            }
        }
    } else {
        // Fallback to existing logic for safe split points when no headings found
        const safeSplitCandidates: number[] = []
        let inCodeBlock = false

        for (let i = 0; i < totalLines; i++) {
            const line = lines[i]
            const trimmed = line?.trim() ?? ''

            if (trimmed.startsWith('```')) {
                inCodeBlock = !inCodeBlock
                continue
            }

            if (trimmed !== '') {
                continue
            }

            if (inCodeBlock) {
                continue
            }

            const previous = i > 0 ? lines[i - 1] : undefined
            const next = i < totalLines - 1 ? lines[i + 1] : undefined

            // Require content before and after the split to avoid empty sections
            if (!previous || previous.trim() === '') {
                continue
            }

            if (!next || next.trim() === '') {
                continue
            }

            if (isUnsplittableLine(next, { previous })) {
                continue
            }

            safeSplitCandidates.push(i)
        }

        if (safeSplitCandidates.length > 0) {
            const forwardCandidate = safeSplitCandidates.find(
                (index) => index >= targetLine
            )
            const backwardCandidate = [...safeSplitCandidates]
                .reverse()
                .find((index) => index < targetLine)

            if (
                forwardCandidate !== undefined &&
                backwardCandidate !== undefined
            ) {
                splitIndex =
                    Math.abs(forwardCandidate - targetLine) <
                    Math.abs(targetLine - backwardCandidate)
                        ? forwardCandidate
                        : backwardCandidate
            } else if (forwardCandidate !== undefined) {
                splitIndex = forwardCandidate
            } else if (backwardCandidate !== undefined) {
                splitIndex = backwardCandidate
            }
        }
    }

    // Split at the found index
    const beforeCTA = lines.slice(0, splitIndex).join('\n').trim()
    const afterCTA = lines.slice(splitIndex).join('\n').trim()

    return {
        beforeCTA,
        afterCTA,
        hasMarker: false,
    }
}
