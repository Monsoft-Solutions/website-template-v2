/**
 * Contact Form Type Definitions
 *
 * Type definitions and validation schema for contact form
 */
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
        .regex(
            /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
            {
                message: 'Please enter a valid phone number.',
            }
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
    success: boolean
    message: string
    error?: string
}
