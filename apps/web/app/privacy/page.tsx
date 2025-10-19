import type { Metadata } from 'next'

import { LegalPageLayout } from '@/components/legal/LegalPageLayout.component'
import { privacyPolicyContent } from '@/lib/data/legal/privacy-policy.content'

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'Our privacy policy explains how we collect, use, and protect your personal information when you visit our website.',
    openGraph: {
        title: 'Privacy Policy',
        description:
            'Learn how we handle your personal data and protect your privacy.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Privacy Policy',
        description:
            'Learn how we handle your personal data and protect your privacy.',
    },
    robots: {
        index: true,
        follow: true,
    },
}

/**
 * Privacy Policy Page
 *
 * Displays the website's privacy policy including:
 * - Data collection practices
 * - Analytics and cookie usage
 * - Third-party services
 * - User rights (GDPR/CCPA)
 * - Contact information
 *
 * Built with open-source template by Adriano Flechilla / Monsoft Solutions, LLC
 */
export default function PrivacyPolicyPage() {
    return (
        <LegalPageLayout
            title='Privacy Policy'
            content={privacyPolicyContent}
            lastUpdated='October 19, 2025'
        />
    )
}
