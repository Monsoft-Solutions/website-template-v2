/**
 * Services Listing Page
 *
 * Main page that displays all published services in a responsive grid layout.
 * This page is SEO-optimized with structured data and metadata.
 *
 * Features:
 * - Breadcrumb navigation
 * - Page header with title and description
 * - Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
 * - Service cards with hover effects
 * - Empty state handling for no published services
 * - SEO metadata with OpenGraph tags
 * - Structured data (ItemList schema and BreadcrumbList schema)
 *
 * Route: /services
 */
import type { Metadata } from 'next'

import { ServiceCard } from '@/components/services/ServiceCard.component'
import {
    Breadcrumbs,
    ContentWrapper,
    SectionContainer,
    SectionHeader,
} from '@/components/shared'
import { siteConfig } from '@/lib/data/site-config'
import { getPublishedServices } from '@/lib/queries/get-services.query'
import {
    generateServiceBreadcrumbSchema,
    generateServicesListSchema,
} from '@/lib/seo/service-schema.util'
import { generateServicesListingMetadata } from '@/utils/services/generate-service-metadata.util'

/**
 * Generate page metadata
 *
 * Creates SEO-optimized metadata for the services listing page
 * including title, description, and OpenGraph tags.
 */
export function generateMetadata(): Metadata {
    return generateServicesListingMetadata()
}

/**
 * Services Listing Page Component
 *
 * Displays all published services with breadcrumbs, header, and grid layout.
 * Handles empty state when no services are published.
 */
export default function ServicesPage() {
    // Get all published services sorted by order
    const services = getPublishedServices()

    // Generate base URL for structured data
    const baseUrl = siteConfig.seo.siteUrl

    // Generate structured data schemas
    const servicesListSchema = generateServicesListSchema(services, baseUrl)
    const breadcrumbSchema = generateServiceBreadcrumbSchema(undefined, baseUrl)

    // Breadcrumb items for navigation
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Services' }, // Current page (no href)
    ]

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(servicesListSchema),
                }}
            />
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            {/* Page Container */}
            <SectionContainer as='section' variant='default' id='services-page'>
                <ContentWrapper size='lg'>
                    {/* Breadcrumbs Navigation */}
                    <div className='mb-8'>
                        <Breadcrumbs
                            items={breadcrumbItems}
                            showBackground={true}
                        />
                    </div>

                    {/* Page Header */}
                    <SectionHeader
                        badge='Our Services'
                        title='Comprehensive Solutions for Your Business'
                        description='Explore our range of professional services designed to help your business grow and succeed. From development to design and marketing, we have the expertise to bring your vision to life.'
                        as='h1'
                        align='center'
                        spacing='loose'
                        className='mb-12'
                    />

                    {/* Services Grid or Empty State */}
                    {services.length > 0 ? (
                        <div
                            className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                            role='list'
                            aria-label='Available services'
                        >
                            {services.map((service) => (
                                <div key={service.slug} role='listitem'>
                                    <ServiceCard
                                        service={service}
                                        className='h-full'
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className='border-border/50 bg-muted/30 flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center'>
                            <div className='mx-auto max-w-md space-y-4'>
                                <div className='flex justify-center'>
                                    <div className='bg-muted flex h-16 w-16 items-center justify-center rounded-full'>
                                        <svg
                                            className='text-muted-foreground h-8 w-8'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                            aria-hidden='true'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={1.5}
                                                d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className='text-foreground text-2xl font-semibold'>
                                    No Services Available
                                </h2>
                                <p className='text-muted-foreground text-sm'>
                                    We are currently updating our service
                                    offerings. Please check back soon or{' '}
                                    <a
                                        href='/contact'
                                        className='text-primary font-medium underline-offset-4 hover:underline'
                                    >
                                        contact us
                                    </a>{' '}
                                    for more information about how we can help
                                    your business.
                                </p>
                            </div>
                        </div>
                    )}
                </ContentWrapper>
            </SectionContainer>
        </>
    )
}
