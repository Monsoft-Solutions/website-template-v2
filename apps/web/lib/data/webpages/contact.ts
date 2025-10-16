/**
 * Contact Page Data
 *
 * Data structures and content for the contact page sections.
 * All content is centralized here for easy maintenance and localization.
 */
import { Mail, MapPin, Phone } from 'lucide-react'

import type {
    ContactFormSectionProps,
    ContactHeroSectionProps,
    ContactInfoSectionProps,
} from '@/lib/types/sections'

/**
 * Contact Hero Section Content
 */
export const contactHeroData: Omit<ContactHeroSectionProps, 'id'> = {
    badge: 'Get In Touch',
    headline: "Let's Start a Conversation",
    description:
        "Have a question or want to work together? We'd love to hear from you. Fill out the form below or reach out directly, and our team will get back to you as soon as possible.",
    enableAnimations: true,
}

/**
 * Contact Form Section Content
 */
export const contactFormData: Omit<ContactFormSectionProps, 'id'> = {
    badge: 'Send a Message',
    headline: 'Get In Touch',
    description:
        "Fill out the form below and we'll get back to you within 24 hours.",
}

/**
 * Contact Info Section Content
 */
export const contactInfoData: Omit<ContactInfoSectionProps, 'id'> = {
    badge: 'Contact Information',
    headline: 'Other Ways to Reach Us',
    description:
        'Prefer to reach out directly? Here are other ways to get in touch with our team.',
    contactItems: [
        {
            icon: Phone,
            title: 'Phone',
            value: '+1-555-123-4567',
            href: 'tel:+15551234567',
            ariaLabel: 'Call us at +1 (555) 123-4567',
        },
        {
            icon: Mail,
            title: 'Email',
            value: 'contact@example.com',
            href: 'mailto:contact@example.com',
            ariaLabel: 'Email us at contact@example.com',
        },
        {
            icon: MapPin,
            title: 'Address',
            value: '123 Main St, City, State 12345',
            ariaLabel: 'Our address',
        },
    ],
}

/**
 * Final CTA Section Content (for end of contact page)
 */
export const contactCTAData = {
    title: 'Prefer a Different Approach?',
    description:
        'Schedule a call with our team to discuss your needs in detail, or check out our FAQ section for quick answers.',
    primaryButton: {
        text: 'Schedule a Call',
        href: '/contact?schedule=true',
    },
    secondaryButton: {
        text: 'View FAQ',
        href: '/faq',
    },
    variant: 'accent' as const,
}
