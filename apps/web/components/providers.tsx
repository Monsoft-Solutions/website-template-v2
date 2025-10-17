'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

import { ConsentProvider } from '@/lib/analytics'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme
        >
            <ConsentProvider>{children}</ConsentProvider>
        </NextThemesProvider>
    )
}
