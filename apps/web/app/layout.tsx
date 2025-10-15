import { OrganizationSchema, WebSiteSchema } from '@workspace/seo/react'
import '@workspace/ui/globals.css'
import { Geist, Geist_Mono } from 'next/font/google'

import { Providers } from '@/components/providers'
import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

export const metadata = toNextMetadata(seoConfig)

const fontSans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
})

const fontMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
            >
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
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
