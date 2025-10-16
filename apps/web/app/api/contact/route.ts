/**
 * Contact Form API Handler
 *
 * Handles POST requests for contact form submissions with server-side validation.
 * Currently logs submissions to console; email integration to be added.
 *
 * @module app/api/contact/route
 */
import { type NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

import {
    type ContactFormData,
    type ContactFormResponse,
    contactFormSchema,
} from '@/lib/types/forms/contact-form.type'

/**
 * Formats contact form data for console logging
 *
 * @param data - Validated contact form data
 * @returns Formatted string for console output
 */
function formatConsoleLog(data: ContactFormData): string {
    return `
=== New Contact Form Submission ===
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Subject: ${data.subject}
Message: ${data.message}
Submitted at: ${new Date().toISOString()}
===================================
    `.trim()
}

/**
 * Sends contact form email notification
 *
 * TODO: Implement email service integration (Resend, SendGrid, etc.)
 * This function should:
 * 1. Format email template with form data
 * 2. Send notification to admin email
 * 3. Optionally send confirmation email to user
 * 4. Handle email service errors gracefully
 *
 * @param data - Validated contact form data
 * @returns Promise resolving to success status
 *
 * @example
 * ```ts
 * import { Resend } from 'resend'
 * const resend = new Resend(process.env.RESEND_API_KEY)
 *
 * await resend.emails.send({
 *   from: 'Contact Form <noreply@yourdomain.com>',
 *   to: process.env.ADMIN_EMAIL,
 *   subject: `New Contact: ${data.subject}`,
 *   html: emailTemplate(data)
 * })
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendContactEmail(
    data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
    // Currently just logs to console
    // Replace this with actual email service implementation
    console.log('📧 Email would be sent with data:', data)

    return { success: true }
}

/**
 * POST handler for contact form submissions
 *
 * Validates incoming form data, logs submission details, and prepares for email integration.
 * Implements comprehensive error handling for validation and server errors.
 *
 * Security considerations:
 * - Zod schema validation sanitizes and validates all inputs
 * - Content-Type validation ensures JSON payloads only
 * - TODO: Add rate limiting to prevent spam (consider upstash/ratelimit or similar)
 * - TODO: Add CSRF protection for production
 * - TODO: Consider adding honeypot field for bot detection
 *
 * @param request - Next.js request object
 * @returns JSON response with success status and message
 *
 * @example
 * ```ts
 * // Success response
 * { success: true, message: "Thank you for contacting us! We'll get back to you soon." }
 *
 * // Validation error response
 * { success: false, message: "Validation failed", error: "Email is invalid" }
 *
 * // Server error response
 * { success: false, message: "Something went wrong. Please try again later.", error: "Error details" }
 * ```
 */
export async function POST(
    request: NextRequest
): Promise<NextResponse<ContactFormResponse>> {
    try {
        // Validate Content-Type header
        const contentType = request.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
            return NextResponse.json<ContactFormResponse>(
                {
                    success: false,
                    message: 'Invalid content type. Expected application/json.',
                    error: 'Content-Type must be application/json',
                },
                { status: 400 }
            )
        }

        // Parse request body
        const body = (await request.json()) as unknown

        // Validate request body against schema
        // Zod automatically sanitizes and validates the data
        const validatedData = contactFormSchema.parse(body)

        // Log the submission to console with formatted output
        console.log(formatConsoleLog(validatedData))

        // Send email notification (currently just logs)
        // TODO: Uncomment when email service is configured
        /*
        const emailResult = await sendContactEmail(validatedData)
        if (!emailResult.success) {
            console.error('Failed to send email:', emailResult.error)
            // Optionally still return success to user even if email fails
            // Or return error depending on business requirements
        }
        */

        // Return success response
        return NextResponse.json<ContactFormResponse>(
            {
                success: true,
                message:
                    "Thank you for contacting us! We'll get back to you soon.",
            },
            { status: 200 }
        )
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof ZodError) {
            // Extract first error message for user-friendly response
            const firstError = error.errors[0]
            const errorMessage = firstError
                ? `${firstError.path.join('.')}: ${firstError.message}`
                : 'Validation failed'

            console.error('Validation error:', {
                errors: error.errors,
                timestamp: new Date().toISOString(),
            })

            return NextResponse.json<ContactFormResponse>(
                {
                    success: false,
                    message: 'Validation failed',
                    error: errorMessage,
                },
                { status: 400 }
            )
        }

        // Handle JSON parsing errors
        if (error instanceof SyntaxError) {
            console.error('JSON parsing error:', error.message)

            return NextResponse.json<ContactFormResponse>(
                {
                    success: false,
                    message: 'Invalid JSON format',
                    error: 'Request body must be valid JSON',
                },
                { status: 400 }
            )
        }

        // Handle unexpected server errors
        console.error('Server error in contact form handler:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString(),
        })

        return NextResponse.json<ContactFormResponse>(
            {
                success: false,
                message: 'Something went wrong. Please try again later.',
                error:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            },
            { status: 500 }
        )
    }
}

/**
 * OPTIONS handler for CORS preflight requests
 *
 * @returns Response with CORS headers
 */
export async function OPTIONS(): Promise<NextResponse> {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}
