/**
 * ContactForm Component
 *
 * A comprehensive contact form with client-side validation using react-hook-form
 * and zod schema validation. Handles form submission, loading states, and displays
 * success/error messages.
 *
 * @example
 * ```tsx
 * <ContactForm
 *   badge="Send a Message"
 *   headline="Get In Touch"
 *   description="Fill out the form below..."
 * />
 * ```
 */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { Textarea } from '@workspace/ui/components/textarea'
import { cn } from '@workspace/ui/lib/utils'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
    ContentWrapper,
    SectionContainer,
    SectionHeader,
} from '@/components/shared'
import {
    type ContactFormData,
    type ContactFormResponse,
    contactFormSchema,
} from '@/lib/types/forms/contact-form.type'
import type { ContactFormSectionProps } from '@/lib/types/sections/contact-form-section.type'

/**
 * ContactForm Component
 *
 * A comprehensive contact form with client-side validation using react-hook-form
 * and zod schema validation. Handles form submission, loading states, and displays
 * success/error messages.
 *
 * @example
 * ```tsx
 * <ContactForm
 *   badge="Send a Message"
 *   headline="Get In Touch"
 *   description="Fill out the form below..."
 * />
 * ```
 */

/**
 * Form submission state
 */
type SubmissionState = {
    status: 'idle' | 'success' | 'error'
    message: string
}

export function ContactForm({
    badge,
    headline,
    description,
    className,
    id,
}: ContactFormSectionProps) {
    const [submissionState, setSubmissionState] = useState<SubmissionState>({
        status: 'idle',
        message: '',
    })

    // Initialize react-hook-form with zod validation
    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        },
    })

    /**
     * Handle form submission
     */
    const onSubmit = async (data: ContactFormData) => {
        try {
            // Reset submission state
            setSubmissionState({ status: 'idle', message: '' })

            // Submit to API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result: ContactFormResponse = await response.json()

            if (response.ok && result.success) {
                // Success - reset form and show success message
                setSubmissionState({
                    status: 'success',
                    message:
                        result.message ||
                        "Thank you for your message! We'll get back to you soon.",
                })
                form.reset()
            } else {
                // API returned error
                setSubmissionState({
                    status: 'error',
                    message:
                        result.error ||
                        result.message ||
                        'Something went wrong. Please try again.',
                })
            }
        } catch (error) {
            // Network or other error
            console.error('Contact form submission error:', error)
            setSubmissionState({
                status: 'error',
                message:
                    'Failed to send your message. Please check your connection and try again.',
            })
        }
    }

    const isSubmitting = form.formState.isSubmitting

    return (
        <SectionContainer
            variant='muted'
            id={id}
            className={cn('py-16 md:py-24', className)}
        >
            <ContentWrapper size='md'>
                {/* Section Header */}
                {(badge || headline || description) && (
                    <SectionHeader
                        badge={badge}
                        title={headline || ''}
                        description={description}
                        className='mb-12'
                    />
                )}

                {/* Contact Form */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='bg-card mx-auto max-w-2xl space-y-6 rounded-lg border p-6 shadow-sm md:p-8'
                    >
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name{' '}
                                        <span className='text-destructive'>
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='John Doe'
                                            {...field}
                                            disabled={isSubmitting}
                                            aria-label='Your name'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email{' '}
                                        <span className='text-destructive'>
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='john@example.com'
                                            {...field}
                                            disabled={isSubmitting}
                                            aria-label='Your email address'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone Field (Optional) */}
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone (Optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='tel'
                                            placeholder='+1 (555) 123-4567'
                                            {...field}
                                            disabled={isSubmitting}
                                            aria-label='Your phone number'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Subject Field */}
                        <FormField
                            control={form.control}
                            name='subject'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Subject{' '}
                                        <span className='text-destructive'>
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='How can we help?'
                                            {...field}
                                            disabled={isSubmitting}
                                            aria-label='Message subject'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Message Field */}
                        <FormField
                            control={form.control}
                            name='message'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Message{' '}
                                        <span className='text-destructive'>
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Tell us more about your inquiry...'
                                            className='min-h-[150px] resize-none'
                                            {...field}
                                            disabled={isSubmitting}
                                            aria-label='Your message'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submission State Messages */}
                        {submissionState.status === 'success' && (
                            <div
                                className='bg-success/10 text-success flex items-start gap-3 rounded-lg border border-green-500/20 p-4'
                                role='alert'
                                aria-live='polite'
                            >
                                <CheckCircle2 className='mt-0.5 size-5 flex-shrink-0' />
                                <p className='text-sm'>
                                    {submissionState.message}
                                </p>
                            </div>
                        )}

                        {submissionState.status === 'error' && (
                            <div
                                className='bg-destructive/10 text-destructive flex items-start gap-3 rounded-lg border border-red-500/20 p-4'
                                role='alert'
                                aria-live='assertive'
                            >
                                <AlertCircle className='mt-0.5 size-5 flex-shrink-0' />
                                <p className='text-sm'>
                                    {submissionState.message}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type='submit'
                            size='lg'
                            disabled={isSubmitting}
                            className='w-full'
                            aria-label={
                                isSubmitting
                                    ? 'Sending message...'
                                    : 'Send message'
                            }
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className='mr-2 size-4 animate-spin' />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className='mr-2 size-4' />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </ContentWrapper>
        </SectionContainer>
    )
}
