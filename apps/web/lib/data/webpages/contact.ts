/**
 * Contact Page Data
 *
 * Data structures and content for the contact page sections.
 * Contact information is pulled from centralized site-config.
 */
import { Mail, MapPin, Phone } from 'lucide-react'

import {
    contactInfo,
    getEmailLink,
    getFullAddress,
    getPhoneLink,
} from '@/lib/data/site-config'
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
 * Uses centralized contact information from site-config
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
            value: contactInfo.phoneDisplay || contactInfo.phone,
            href: getPhoneLink(),
            ariaLabel: `Call us at ${contactInfo.phoneDisplay || contactInfo.phone}`,
        },
        {
            icon: Mail,
            title: 'Email',
            value: contactInfo.email,
            href: getEmailLink(),
            ariaLabel: `Email us at ${contactInfo.email}`,
        },
        {
            icon: MapPin,
            title: 'Address',
            value: getFullAddress(),
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
