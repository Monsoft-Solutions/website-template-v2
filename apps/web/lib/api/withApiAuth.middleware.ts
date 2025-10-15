import { NextRequest, NextResponse } from 'next/server'

/**
 * API authentication middleware for validating bearer tokens.
 *
 * Usage:
 *   async function postHandler(request: NextRequest) { ... }
 *   export const POST = withApiAuth(postHandler)
 *
 * Future extension points:
 * - Database-backed API keys with rotation
 * - Role-based access control (RBAC)
 * - Rate limiting per API key
 */
export function withApiAuth(
    handler: (request: NextRequest) => Promise<NextResponse>
) {
    return async (request: NextRequest): Promise<NextResponse> => {
        try {
            const authHeader = request.headers.get('authorization')

            // Validate authorization header exists and has correct format
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return NextResponse.json(
                    { error: 'Missing or invalid authorization header' },
                    { status: 401 }
                )
            }

            // Extract token from "Bearer <token>"
            const token = authHeader.substring(7)

            // Validate against environment variable
            // Future: extend this to check database, secrets manager, etc.
            const apiKey = process.env.BLOG_API_KEY
            if (!apiKey) {
                console.error(
                    'BLOG_API_KEY environment variable not configured'
                )
                return NextResponse.json(
                    { error: 'Server configuration error' },
                    { status: 500 }
                )
            }

            if (token !== apiKey) {
                return NextResponse.json(
                    { error: 'Invalid API key' },
                    { status: 401 }
                )
            }

            // Token is valid, proceed to handler
            return await handler(request)
        } catch (error) {
            console.error('Authentication error:', error)
            return NextResponse.json(
                { error: 'Authentication failed' },
                { status: 500 }
            )
        }
    }
}
