import { z } from 'zod'

/**
 * Base pagination schema for cursor-based pagination
 * Used across multiple API endpoints for consistent pagination validation
 */
export const basePaginationSchema = z.object({
    /**
     * Number of items to return per page
     * @default 12
     * @minimum 1
     * @maximum 100
     */
    pageSize: z
        .string()
        .optional()
        .transform((val) => {
            if (!val) return 12
            const parsed = parseInt(val, 10)
            return Math.min(Math.max(parsed, 1), 100)
        }),

    /**
     * Base64 encoded cursor for pagination continuation
     * Format: {publishedAt: string, id: string}
     */
    cursor: z
        .string()
        .optional()
        .transform((val) => {
            if (!val) return null

            try {
                const decoded = JSON.parse(
                    Buffer.from(val, 'base64').toString('utf-8')
                )
                return {
                    publishedAt: new Date(decoded.publishedAt),
                    id: decoded.id,
                }
            } catch {
                throw new Error('Invalid cursor format')
            }
        })
        .nullable(),
})

/**
 * Type inference for base pagination schema
 */
export type BasePaginationInput = z.input<typeof basePaginationSchema>
export type BasePaginationOutput = z.output<typeof basePaginationSchema>
