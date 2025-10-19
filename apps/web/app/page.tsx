import { WebPageSchema } from '@workspace/seo/react'

import {
    AboutPreviewSection,
    HeroSection,
    StackingFeaturesSection,
    TestimonialsSection,
} from '@/components/sections/home'
import { CTASection } from '@/components/shared'
import {
    finalCTAData,
    heroSectionData,
    keyFeaturesData,
    techStackData,
    testimonialsData,
} from '@/lib/data/webpages/home'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

/**
 * Homepage Metadata
 *
 * Implements SEO best practices for the homepage including:
 * - Unique, descriptive title (< 60 characters)
 * - Compelling meta description (< 160 characters)
 * - Open Graph tags for social sharing
 * - Twitter Card configuration
 * - Canonical URL
 */
export const metadata = toNextMetadata(seoConfig, {
    // Canonical URL for homepage
    canonical: '/',

    // Page-specific metadata
    title: 'Modern Website Template - Next.js 15 + React 19 + TypeScript',
    description:
        'Production-ready Next.js website template with blog, analytics, SEO, and shadcn/ui components. Ship professional websites in hours. Built for developers and agencies.',

    // Open Graph tags for social sharing
    openGraph: {
        title: 'Modern Website Template - Next.js 15 + React 19 + TypeScript',
        description:
            'Production-ready Next.js website template with blog, analytics, SEO, and shadcn/ui components. Ship professional websites in hours. Built for developers and agencies.',
        url: seoConfig.siteUrl,
        type: 'website',
        siteName: seoConfig.siteName,
        images: seoConfig.defaultMetadata.image
            ? [
                  {
                      url: seoConfig.defaultMetadata.image.url,
                      width: seoConfig.defaultMetadata.image.width ?? 1200,
                      height: seoConfig.defaultMetadata.image.height ?? 630,
                      alt: seoConfig.defaultMetadata.image.alt,
                  },
              ]
            : undefined,
    },

    // Twitter Card tags
    twitter: {
        card: seoConfig.twitter?.cardType ?? 'summary_large_image',
        title: 'Modern Website Template - Next.js 15 + React 19 + TypeScript',
        description:
            'Production-ready Next.js website template with blog, analytics, SEO, and shadcn/ui components. Ship professional websites in hours. Built for developers and agencies.',
        site: seoConfig.twitter?.site,
        creator: seoConfig.twitter?.creator ?? seoConfig.twitter?.handle,
        images: seoConfig.defaultMetadata.image
            ? [seoConfig.defaultMetadata.image.url]
            : undefined,
    },

    // Keywords (if available)
    keywords: seoConfig.defaultMetadata.keywords,

    // Additional metadata
    authors: seoConfig.defaultMetadata.author
        ? [{ name: seoConfig.defaultMetadata.author }]
        : undefined,
})

/**
 * Homepage Component
 *
 * Assembles complete homepage with multiple sections:
 * 1. Hero Section - Main headline and CTA
 * 2. Features Section - Service/product highlights
 * 3. About Preview Section - Company overview
 * 4. Testimonials Section - Customer reviews
 * 5. Final CTA Section - End-of-page call-to-action
 *
 * Features:
 * - Full SEO optimization with JSON-LD schema
 * - Smooth scroll behavior
 * - Mobile-responsive design
 * - Notion-inspired minimalistic styling
 * - Accessible ARIA labels and semantic HTML
 */
export default function Page() {
    return (
        <>
            {/* JSON-LD Schema for Homepage */}
            <WebPageSchema
                name='Modern Website Template - Next.js 15 + React 19 + TypeScript'
                url={seoConfig.siteUrl}
                description='Production-ready Next.js website template with blog, analytics, SEO, and shadcn/ui components. Ship professional websites in hours. Built for developers and agencies.'
            />

            {/* Hero Section */}
            <HeroSection
                id='hero'
                headline={heroSectionData.headline}
                subheadline={heroSectionData.subheadline}
                description={heroSectionData.description}
                primaryButton={heroSectionData.primaryButton}
                secondaryButton={heroSectionData.secondaryButton}
                image={heroSectionData.image}
                imagePosition={heroSectionData.imagePosition}
                variant={heroSectionData.variant}
                enableAnimations={heroSectionData.enableAnimations}
            />

            {/* Key Features Section with Stacking Scroll Effect */}
            <StackingFeaturesSection
                id='key-features'
                title='Everything You Need to Launch Fast'
                description='A complete website template with all the features developers and businesses need—no compromises on quality or functionality'
                features={keyFeaturesData}
                variant='muted'
            />

            {/* Tech Stack Section */}
            <AboutPreviewSection
                id='tech-stack'
                badge={techStackData.badge}
                title={techStackData.title}
                description={techStackData.description}
                imageSrc={techStackData.imageSrc}
                imageAlt={techStackData.imageAlt}
                imageWidth={techStackData.imageWidth}
                imageHeight={techStackData.imageHeight}
                buttonText={techStackData.buttonText}
                buttonHref={techStackData.buttonHref}
                imagePosition={techStackData.imagePosition}
                variant={techStackData.variant}
            />

            {/* Testimonials Section */}
            <TestimonialsSection
                id='testimonials'
                title='Trusted by Developers and Agencies'
                description='See how developers and businesses are using this template to ship professional websites faster'
                testimonials={testimonialsData}
                columns={3}
                variant='default'
                showRatings
            />

            {/* Final CTA Section */}
            <CTASection
                id='final-cta'
                heading={finalCTAData.title}
                description={finalCTAData.description}
                primaryButton={{
                    text: finalCTAData.primaryButton.text,
                    href: finalCTAData.primaryButton.href,
                }}
                secondaryButton={{
                    text: finalCTAData.secondaryButton.text,
                    href: finalCTAData.secondaryButton.href,
                }}
                variant={finalCTAData.variant}
                align='center'
                size='default'
            />
        </>
    )
}
