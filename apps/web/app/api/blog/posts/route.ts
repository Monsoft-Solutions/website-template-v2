import { NextRequest, NextResponse } from 'next/server'

import { getPublishedPostCardsPage } from '@/lib/blog/post-list.query'
import type { BlogPostsPaginatedResponse } from '@/lib/types/blog/api-response.type'

/**
 * GET /api/blog/posts
 * Returns paginated blog post cards with cursor-based pagination
 *
 * Query params:
 * - pageSize: number of items to return (default: 12, max: 100)
 * - cursor: base64 encoded cursor {publishedAt, id}
 * - categorySlug: (optional) filter by category
 * - tagSlug: (optional) filter by tag
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl

        // Parse pageSize
        const pageSize = Math.min(
            Math.max(Number(searchParams.get('pageSize')) || 12, 1),
            100
        )

        // Parse cursor
        let cursor: { publishedAt: Date; id: string } | null = null
        const cursorParam = searchParams.get('cursor')
        if (cursorParam) {
            try {
                const decoded = JSON.parse(
                    Buffer.from(cursorParam, 'base64').toString('utf-8')
                )
                cursor = {
                    publishedAt: new Date(decoded.publishedAt),
                    id: decoded.id,
                }
            } catch {
                return NextResponse.json(
                    { error: 'Invalid cursor format' },
                    { status: 400 }
                )
            }
        }

        const categorySlug = searchParams.get('categorySlug') || undefined
        const tagSlug = searchParams.get('tagSlug') || undefined

        // Fetch posts
        const { items, nextCursor } = await getPublishedPostCardsPage({
            limit: pageSize,
            cursor,
            categorySlug,
            tagSlug,
        })

        // Encode next cursor for client
        const encodedNextCursor = nextCursor
            ? Buffer.from(
                  JSON.stringify({
                      publishedAt: nextCursor.publishedAt.toISOString(),
                      id: nextCursor.id,
                  })
              ).toString('base64')
            : undefined

        const response: BlogPostsPaginatedResponse = {
            items,
            nextCursor: encodedNextCursor,
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Error fetching blog posts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        )
    }
}
