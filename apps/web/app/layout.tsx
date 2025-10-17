import { OrganizationSchema, WebSiteSchema } from '@workspace/seo/react'
import '@workspace/ui/globals.css'
import { Geist, Geist_Mono } from 'next/font/google'

import {
    Clarity,
    GoogleAnalytics,
    GoogleTagManager,
    PageViewTracker,
    ScrollDepthTracker,
} from '@/components/analytics'
import { Footer } from '@/components/layout/Footer.component'
import { Header } from '@/components/layout/Header.component'
import { Providers } from '@/components/providers'
import { WebVitals } from '@/components/web-vitals.component'
import { getAnalyticsConfig } from '@/lib/analytics'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

export const metadata = toNextMetadata(seoConfig)

const fontSans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
    preload: true,
})

const fontMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    // Get analytics configuration from environment
    const analyticsConfig = getAnalyticsConfig()

    return (
        <html lang='en' suppressHydrationWarning>
            <head>
                {/* Resource hints for external domains */}
                <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin='anonymous'
                />

                {/* Favicon and app icons */}
                <link rel='icon' type='image/png' href='/favicon.png' />
                <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
            </head>
            <body
                className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
            >
                {/* Analytics Scripts - Load conditionally based on env config */}
                {analyticsConfig.ga?.enabled && (
                    <GoogleAnalytics
                        measurementId={analyticsConfig.ga.measurementId}
                    />
                )}
                {analyticsConfig.clarity?.enabled && (
                    <Clarity projectId={analyticsConfig.clarity.projectId} />
                )}
                {analyticsConfig.gtm?.enabled && (
                    <GoogleTagManager
                        containerId={analyticsConfig.gtm.containerId}
                    />
                )}

                <WebVitals />
                <PageViewTracker />
                <ScrollDepthTracker />
                <OrganizationSchema
                    name={seoConfig.siteName}
                    url={seoConfig.siteUrl}
                    logo={seoConfig.organization?.logo}
                    legalName={seoConfig.organization?.legalName}
                    founders={seoConfig.organization?.founders}
                    sameAs={seoConfig.organization?.socialProfiles?.map(
                        (s) => s.url
                    )}
                />
                <WebSiteSchema
                    name={seoConfig.siteName}
                    url={seoConfig.siteUrl}
                />
                <Providers>
                    <Header />
                    <main id='main-content'>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
