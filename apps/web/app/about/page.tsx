/**
 * About Page
 *
 * Comprehensive About page showcasing company story, mission, vision, values,
 * and team. Includes SEO optimization and structured data.
 */
import { OrganizationSchema, WebPageSchema } from '@workspace/seo/react'
import { ArrowRight } from 'lucide-react'

import {
    AboutHeroSection,
    MissionSection,
    StorySection,
    TeamSection,
} from '@/components/sections/about'
import { Breadcrumbs, CTASection, ContentWrapper } from '@/components/shared'
import {
    aboutCTAData,
    aboutHeroData,
    missionData,
    storyData,
    teamSectionData,
} from '@/lib/data/webpages/about'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

/**
 * About Page Metadata
 *
 * Implements SEO best practices for the About page including:
 * - Unique, descriptive title
 * - Compelling meta description
 * - Open Graph tags for social sharing
 * - Twitter Card configuration
 * - Canonical URL
 */
export const metadata = toNextMetadata(seoConfig, {
    // Canonical URL for about page
    canonical: '/about',

    // Page-specific metadata
    title: 'About Us - Learn Our Story & Values',
    description:
        'Discover our company story, mission, and the talented team behind our success. Learn about our values and commitment to excellence.',

    // Open Graph tags for social sharing
    openGraph: {
        title: 'About Us - Our Mission & Team',
        description:
            'Learn about our company story, mission, vision, and the talented team driving innovation.',
        url: `${seoConfig.siteUrl}/about`,
        type: 'website',
        siteName: seoConfig.siteName,
        images: [
            {
                url: `${seoConfig.siteUrl}/og-about.jpg`,
                width: 1200,
                height: 630,
                alt: 'About us - our team and office',
            },
        ],
    },

    // Twitter Card configuration
    twitter: {
        card: 'summary_large_image',
        title: 'About Us - Learn Our Story & Values',
        description:
            'Discover our company story, mission, and the talented team behind our success.',
        images: [`${seoConfig.siteUrl}/og-about.jpg`],
    },
})

export default function AboutPage() {
    return (
        <>
            {/* SEO Schema */}
            <WebPageSchema
                name={metadata.title as string}
                url={`${seoConfig.siteUrl}/about`}
                description={metadata.description as string}
            />

            <OrganizationSchema
                name={seoConfig.siteName}
                url={seoConfig.siteUrl}
                logo={seoConfig.organization?.logo}
                sameAs={seoConfig.organization?.socialProfiles?.map(
                    (s) => s.url
                )}
            />

            {/* Main Content */}
            <main>
                {/* Breadcrumbs Navigation */}
                <div className='pt-8 pb-4'>
                    <ContentWrapper>
                        <Breadcrumbs
                            items={[
                                { label: 'Home', href: '/' },
                                { label: 'About' },
                            ]}
                        />
                    </ContentWrapper>
                </div>

                {/* About Hero Section */}
                <AboutHeroSection id='about-hero' {...aboutHeroData} />

                {/* Mission/Vision/Values Section */}
                <MissionSection id='mission-values' {...missionData} />

                {/* Company Story Section */}
                <StorySection id='company-story' {...storyData} />

                {/* Team Section */}
                <TeamSection id='team' {...teamSectionData} />

                {/* Final CTA Section */}
                <CTASection
                    id='about-cta'
                    heading={aboutCTAData.title}
                    description={aboutCTAData.description}
                    primaryButton={{
                        text: aboutCTAData.primaryButton.text,
                        href: aboutCTAData.primaryButton.href,
                        variant: 'default',
                        icon: <ArrowRight className='size-5' />,
                        iconPosition: 'right',
                    }}
                    secondaryButton={{
                        text: aboutCTAData.secondaryButton.text,
                        href: aboutCTAData.secondaryButton.href,
                        variant: 'outline',
                    }}
                    variant={aboutCTAData.variant}
                    align='center'
                />
            </main>
        </>
    )
}
