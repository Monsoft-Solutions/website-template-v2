/**
 * Contact Form Type Definitions
 *
 * Type definitions and validation schema for contact form
 */
import { parsePhoneNumberWithError } from 'libphonenumber-js'
import { z } from 'zod'

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    phone: z
        .string()
        .refine(
            (val) => {
                if (!val) return true // Allow empty
                try {
                    parsePhoneNumberWithError(val).isValid()
                    return true
                } catch {
                    return false
                }
            },
            { message: 'Please enter a valid phone number.' }
        )
        .optional()
        .or(z.literal('')),
    subject: z.string().min(3, {
        message: 'Subject must be at least 3 characters.',
    }),
    message: z.string().min(10, {
        message: 'Message must be at least 10 characters.',
    }),
})

/**
 * Inferred type from contact form schema
 */
export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * API response type for contact form submission
 */
export interface ContactFormResponse {
    readonly success: boolean
    readonly message: string
    readonly error?: string
}
