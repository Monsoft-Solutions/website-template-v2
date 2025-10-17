import { WebPageSchema } from '@workspace/seo/react'

import {
    AboutPreviewSection,
    ServicesPreviewSection,
    HeroSection,
    TestimonialsSection,
} from '@/components/sections/home'
import { CTASection } from '@/components/shared'
import {
    aboutPreviewData,
    finalCTAData,
    heroSectionData,
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
    title: seoConfig.defaultMetadata.title,
    description: seoConfig.defaultMetadata.description,

    // Open Graph tags for social sharing
    openGraph: {
        title: seoConfig.defaultMetadata.title,
        description: seoConfig.defaultMetadata.description,
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
        title: seoConfig.defaultMetadata.title,
        description: seoConfig.defaultMetadata.description,
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
                name={seoConfig.defaultMetadata.title}
                url={seoConfig.siteUrl}
                description={seoConfig.defaultMetadata.description}
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

            {/* Services Preview Section */}
            <ServicesPreviewSection
                id='services-preview'
                title='Our Services'
                description='Discover comprehensive solutions designed to drive your business forward and achieve your goals'
                maxServices={3}
                variant='muted'
            />

            {/* About Preview Section */}
            <AboutPreviewSection
                id='about-preview'
                badge={aboutPreviewData.badge}
                title={aboutPreviewData.title}
                description={aboutPreviewData.description}
                imageSrc={aboutPreviewData.imageSrc}
                imageAlt={aboutPreviewData.imageAlt}
                imageWidth={aboutPreviewData.imageWidth}
                imageHeight={aboutPreviewData.imageHeight}
                buttonText={aboutPreviewData.buttonText}
                buttonHref={aboutPreviewData.buttonHref}
                imagePosition={aboutPreviewData.imagePosition}
                variant={aboutPreviewData.variant}
            />

            {/* Testimonials Section */}
            <TestimonialsSection
                id='testimonials'
                title='What Our Clients Say'
                description="Don't just take our word for it—hear from the customers who've transformed their business with us"
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
