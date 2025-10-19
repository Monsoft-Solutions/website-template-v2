import type { TOCHeading } from '@/lib/types/blog/toc.type'

/**
 * Extract headings from markdown content for table of contents
 * Matches h2 and h3 headings and extracts their text
 */
export function extractTableOfContents(content: string): TOCHeading[] {
    const headings: TOCHeading[] = []

    // Match markdown headings (## and ###)
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    let match

    while ((match = headingRegex.exec(content)) !== null) {
        if (!match[1] || !match[2]) continue

        const level = match[1].length // 2 for h2, 3 for h3
        const text = match[2].trim()

        // Convert heading text to slug (same as rehypeSlug does)
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')

        headings.push({ id, text, level })
    }

    return headings
}
