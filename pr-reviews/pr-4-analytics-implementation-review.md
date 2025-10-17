# PR #4 Review: Analytics System Implementation

## Metadata

```yaml
pr_number: 4
pr_title: '[FEATURE] Implement comprehensive analytics system with GA4 and Microsoft Clarity'
pr_author: flechilla
reviewer: AI Code Review
analysis_date: 2025-10-17
total_comments: 27
actionable_items: 8
critical_issues: 2
high_priority: 3
medium_priority: 3
low_priority: 0
requires_action: true
estimated_effort: '3-4 hours'
```

---

## Executive Summary

This PR implements a comprehensive analytics system with GA4, Microsoft Clarity, GTM, and Facebook Pixel integration. The implementation includes advanced tracking features like scroll depth monitoring, page view tracking, and form analytics. While the code quality is generally good and follows TypeScript best practices, there are **2 critical issues** that must be addressed before merging, primarily related to consent management integration and scroll tracking functionality.

---

## 🔴 CRITICAL Issues

### 1. AnalyticsProvider Mounted Outside Consent Boundary ✅ FIXED

**Status**: **COMPLETED** - Fixed on 2025-10-17

- Moved `AnalyticsProvider` inside `Providers` wrapper in layout.tsx
- Added consent check in `AnalyticsProvider` component
- Analytics scripts now only load when `consentState === 'granted'`
- Build verified successfully

**Location**: `apps/web/app/layout.tsx:56`

**Issue**: The `AnalyticsProvider` component is mounted directly in the `<body>` tag (line 56), **outside** the `<Providers>` wrapper (line 75). The `ConsentProvider` is nested inside `<Providers>`, which means:

- AnalyticsProvider mounts **before** ConsentProvider is available
- Analytics scripts initialize **before** consent defaults are set to 'denied'
- AnalyticsProvider cannot access ConsentProvider context
- This violates GDPR/privacy compliance requirements

**Current Code** (`apps/web/app/layout.tsx:52-80`):

```tsx
<body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
    {/* Analytics Scripts - Load conditionally based on env config */}
    <AnalyticsProvider />  {/* ❌ OUTSIDE consent boundary */}

    <WebVitals />
    <PageViewTracker />
    <ScrollDepthTracker />
    <OrganizationSchema ... />
    <WebSiteSchema ... />
    <Providers>  {/* ⚠️ ConsentProvider is INSIDE here */}
        <Header />
        <main id='main-content'>{children}</main>
        <Footer />
    </Providers>
</body>
```

**Problem**: This architecture means analytics scripts load immediately without checking user consent preferences, potentially violating privacy regulations.

**Solution**: Move `<AnalyticsProvider />` inside the `<Providers>` wrapper to ensure it has access to the consent context:

```tsx
<body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
    <WebVitals />
    <PageViewTracker />
    <ScrollDepthTracker />
    <OrganizationSchema ... />
    <WebSiteSchema ... />
    <Providers>
        {/* ✅ Analytics now inside consent boundary */}
        <AnalyticsProvider />
        <Header />
        <main id='main-content'>{children}</main>
        <Footer />
    </Providers>
</body>
```

**Additionally**: Update `AnalyticsProvider` to read consent state before rendering scripts:

```tsx
// apps/web/components/analytics/AnalyticsProvider.component.tsx
'use client'

import { getAnalyticsConfig } from '@/lib/analytics'
import { useConsent } from '@/lib/analytics/consent.context'

// apps/web/components/analytics/AnalyticsProvider.component.tsx

// apps/web/components/analytics/AnalyticsProvider.component.tsx

// apps/web/components/analytics/AnalyticsProvider.component.tsx

// apps/web/components/analytics/AnalyticsProvider.component.tsx

// apps/web/components/analytics/AnalyticsProvider.component.tsx

// apps/web/components/analytics/AnalyticsProvider.component.tsx

export function AnalyticsProvider() {
    const analyticsConfig = getAnalyticsConfig()
    const { hasConsent } = useConsent()

    // Don't load scripts until consent is granted
    if (!hasConsent('analytics')) {
        return null
    }

    return <>{/* ... existing script loading logic ... */}</>
}
```

**Guidelines Reference**: This violates privacy-first principles and Consent Mode v2 requirements documented in the implementation plan.

---

### 2. useScrollDepth Hook Doesn't Detect Route Changes

**Location**: `apps/web/lib/analytics/useScrollDepth.hook.ts:71-101`

**Issue**: The hook accepts a `resetOnPathChange` option (line 33) and documentation states "Reset tracking when pathname changes", but the implementation **never imports or uses** `usePathname()` from Next.js. The reset logic at lines 86-88 only executes when props change, not when the actual route changes.

**Current Code** (`useScrollDepth.hook.ts:71-101`):

```tsx
export function useScrollDepth(options: UseScrollDepthOptions = {}): void {
    const {
        enabled = true,
        resetOnPathChange = true, // ❌ Doesn't actually track pathname
        ...trackingOptions
    } = options

    const initializedRef = useRef(false)

    useEffect(() => {
        if (!enabled) return

        // ❌ This only runs when props change, NOT on route changes
        if (resetOnPathChange && initializedRef.current) {
            resetScrollDepthTracking()
        }

        const cleanup = initScrollDepthTracking(trackingOptions)
        initializedRef.current = true

        return () => {
            cleanup()
            initializedRef.current = false
        }
        // ❌ No pathname in dependencies
    }, [enabled, resetOnPathChange])
}
```

**Problem**: Scroll tracking persists across navigation, causing incorrect analytics. For example:

1. User scrolls 50% on Page A
2. User navigates to Page B
3. Analytics still thinks user is at 50% scroll depth on Page B
4. Events are attributed to the wrong page

**Solution**: Import `usePathname` and add it to the dependency array:

```tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

// ✅ Add this import

import {
    type ScrollDepthOptions,
    initScrollDepthTracking,
    resetScrollDepthTracking,
} from './scroll-depth.util'

export interface UseScrollDepthOptions extends ScrollDepthOptions {
    enabled?: boolean
    resetOnPathChange?: boolean
}

export function useScrollDepth(options: UseScrollDepthOptions = {}): void {
    const {
        enabled = true,
        resetOnPathChange = true,
        ...trackingOptions
    } = options

    const pathname = usePathname() // ✅ Track pathname changes
    const initializedRef = useRef(false)

    useEffect(() => {
        if (!enabled) return

        // ✅ Now resets on actual route changes
        if (resetOnPathChange && initializedRef.current) {
            resetScrollDepthTracking()
        }

        const cleanup = initScrollDepthTracking(trackingOptions)
        initializedRef.current = true

        return () => {
            cleanup()
            initializedRef.current = false
        }
    }, [enabled, resetOnPathChange, pathname, trackingOptions]) // ✅ Add pathname
}
```

**Note**: This will cause the hook to re-initialize when `trackingOptions` object reference changes. Consider wrapping the options in `useMemo` at the call site if performance becomes an issue.

**Guidelines Reference**: TypeScript best practices require that code behavior matches documentation. The scroll-depth.util.ts file itself shows the correct pattern with pathname dependency in its documentation examples.

---

## 🟠 HIGH Priority Issues

### 3. Duplicate NODE_ENV Declaration

**Location**: `apps/web/env.ts:26-28, 56-58, 78`

**Issue**: `NODE_ENV` is declared in **both** the `server` block (lines 26-28) and the `shared` block (lines 56-58), with a mapping at line 78. According to `@t3-oss/env-nextjs` semantics, variables should only appear in one block.

**Current Code**:

```tsx
export const env = createEnv({
    server: {
        // ...
        NODE_ENV: z
            .enum(['development', 'production', 'test'])
            .default('development'), // ✅ Keep this one
    },
    client: {
        // ...
    },
    shared: {
        NODE_ENV: z
            .enum(['development', 'production', 'test'])
            .default('development'), // ❌ Remove this duplicate
    },
    experimental__runtimeEnv: {
        // ...
        NODE_ENV: process.env.NODE_ENV, // ❌ Remove this mapping
    },
})
```

**Solution**: Remove the duplicate declarations:

```tsx
export const env = createEnv({
    server: {
        // ...
        NODE_ENV: z
            .enum(['development', 'production', 'test'])
            .default('development'),
    },
    client: {
        // ...
    },
    // ✅ Remove the shared block entirely since NODE_ENV is server-only
    experimental__runtimeEnv: {
        // ...
        // ✅ Remove NODE_ENV mapping
    },
})
```

**Guidelines Reference**: TypeScript naming conventions require single responsibility per declaration. The `shared` block is for variables accessible in both contexts, but `NODE_ENV` is inherently server-side.

---

### 4. Blog Post Metadata Not Passed to Analytics

**Location**: `apps/web/components/blog/BlogPostScrollTracker.component.tsx:31-51`

**Issue**: The component accepts `postSlug` and `postTitle` props but only uses them for console logging (lines 41-45). The actual scroll depth tracking via `useScrollDepth` doesn't receive this metadata, so analytics cannot distinguish scroll events between different blog posts.

**Current Code**:

```tsx
export function BlogPostScrollTracker({
    children,
    postSlug,
    postTitle,
}: BlogPostScrollTrackerProps) {
    useScrollDepth({
        thresholds: [25, 50, 75, 100],
        onThresholdReached: (threshold) => {
            // ❌ Only logs to console, doesn't send to analytics
            if (env.NEXT_PUBLIC_NODE_ENV === 'development') {
                console.log(
                    `Blog post "${postTitle}" scrolled ${threshold}%`,
                    `(${postSlug})`
                )
            }
        },
    })

    return <>{children}</>
}
```

**Problem**: In GA4, all scroll depth events will look the same without post identification. Analysts won't be able to answer questions like "Which blog posts have the highest engagement?"

**Solution**: Import `trackScrollDepth` and pass post metadata in the event parameters:

```tsx
'use client'

import { env } from '@/env'
import { trackScrollDepth, useScrollDepth } from '@/lib/analytics'

export interface BlogPostScrollTrackerProps {
    children: React.ReactNode
    postSlug: string
    postTitle: string
}

export function BlogPostScrollTracker({
    children,
    postSlug,
    postTitle,
}: BlogPostScrollTrackerProps) {
    useScrollDepth({
        thresholds: [25, 50, 75, 100],
        onThresholdReached: (threshold) => {
            // ✅ Send post metadata to analytics
            trackScrollDepth(threshold, {
                content_type: 'blog_post',
                post_slug: postSlug,
                post_title: postTitle,
                page_path: window.location.pathname,
            })

            // Keep dev logging
            if (env.NEXT_PUBLIC_NODE_ENV === 'development') {
                console.log(
                    `Blog post "${postTitle}" scrolled ${threshold}%`,
                    `(${postSlug})`
                )
            }
        },
    })

    return <>{children}</>
}
```

**Verify**: Check that `trackScrollDepth` accepts custom parameters in its signature. If not, update the function to accept an optional params argument.

**Guidelines Reference**: Analytics best practices require proper event attribution. The implementation plan specifically mentions tracking blog post engagement.

---

### 5. GTM Noscript Fallback in Wrong Location

**Location**: `apps/web/components/analytics/GoogleTagManager.component.tsx:59-67`

**Issue**: The GTM `<noscript>` iframe is rendered inside the `GoogleTagManager` component. Per Google's documentation, this fallback **must** be placed immediately after the opening `<body>` tag to work correctly when JavaScript is disabled.

**Current Code**:

```tsx
// apps/web/components/analytics/GoogleTagManager.component.tsx
export function GoogleTagManager({ containerId }: GoogleTagManagerProps) {
    return (
        <>
            <Script id='google-tag-manager' strategy='afterInteractive'>
                {/* ... GTM script ... */}
            </Script>

            {/* ❌ This won't work here - needs to be in body */}
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
                    height='0'
                    width='0'
                    style={{ display: 'none', visibility: 'hidden' }}
                />
            </noscript>
        </>
    )
}
```

**Problem**: React components can't reliably control body-level placement. The noscript might render in the wrong location or not at all.

**Solution**:

1. **Remove noscript from the component**:

````tsx
// apps/web/components/analytics/GoogleTagManager.component.tsx
/**
 * Google Tag Manager Script Component
 *
 * Loads GTM container for centralized tag management.
 *
 * **Important**: Add the noscript fallback manually in your root layout:
 * ```tsx
 * <body>
 *   <noscript>
 *     <iframe
 *       src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
 *       height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
 *     />
 *   </noscript>
 *   {/* ... rest of app ... *\/}
 * </body>
 * ```
 */
export function GoogleTagManager({ containerId }: GoogleTagManagerProps) {
    return (
        <Script id='google-tag-manager' strategy='afterInteractive'>
            {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${containerId}');
            `}
        </Script>
    )
}
````

2. **Add noscript to layout.tsx**:

```tsx
// apps/web/app/layout.tsx
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const analyticsConfig = getAnalyticsConfig()

    return (
        <html lang='en' suppressHydrationWarning>
            <head>...</head>
            <body
                className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
            >
                {/* GTM noscript fallback - Must be immediately after <body> */}
                {analyticsConfig.gtm?.enabled && (
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtm.containerId}`}
                            height='0'
                            width='0'
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                )}

                {/* Rest of app */}
                <AnalyticsProvider />
                {/* ... */}
            </body>
        </html>
    )
}
```

**Guidelines Reference**: This follows Google Tag Manager official implementation guidelines and Next.js RSC patterns.

---

## 🟡 MEDIUM Priority Issues

### 6. NEXT_PUBLIC_NODE_ENV Mapping Inconsistency

**Location**: `apps/web/env.ts:51-53, 77`

**Issue**: `NEXT_PUBLIC_NODE_ENV` is defined as a client variable (lines 51-53) but is mapped from `process.env.NEXT_PUBLIC_NODE_ENV` at line 77, which is confusing because:

1. Other `NEXT_PUBLIC_*` variables map from their matching `process.env.NEXT_PUBLIC_*`
2. But line 77 maps from `process.env.NEXT_PUBLIC_NODE_ENV`, not `process.env.NODE_ENV`
3. This means developers must explicitly set `NEXT_PUBLIC_NODE_ENV` in `.env`, which is unusual

**Current Code**:

```tsx
client: {
    // ...
    NEXT_PUBLIC_NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
},
experimental__runtimeEnv: {
    // ...
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,  // ❌ Inconsistent
    NODE_ENV: process.env.NODE_ENV,
},
```

**Problem**: The naming suggests it should mirror `NODE_ENV`, but it actually requires a separate environment variable. This is confusing for developers.

**Solution**: Choose one approach:

**Option A** - Mirror server NODE_ENV (if intent is to expose server env to client):

```tsx
client: {
    // Expose server NODE_ENV to client for environment detection
    NEXT_PUBLIC_NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
},
experimental__runtimeEnv: {
    // ✅ Mirror server's NODE_ENV
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    // Remove NODE_ENV from shared block (see issue #3)
},
```

**Option B** - Require explicit setting (if separate client/server envs needed):

```tsx
client: {
    // Client-specific environment (must be set explicitly in .env)
    // Note: This is separate from server NODE_ENV
    NEXT_PUBLIC_NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
},
experimental__runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
},
```

**Recommendation**: Use Option A unless there's a specific need for different client/server environments.

**Guidelines Reference**: TypeScript naming conventions require consistency across the codebase. Variable names should clearly indicate their purpose.

---

### 7. Duplicate JSDoc Blocks

**Location**: Multiple files still have duplicate documentation

**Issue**: While some duplicate JSDoc blocks were cleaned up, a few remain:

1. `apps/web/components/analytics/GoogleTagManager.component.tsx:1-10 and 16-28` - Two identical module docs
2. `apps/web/components/analytics/AnalyticsProvider.component.tsx:1-8 and 19-36` - Duplicate descriptions

**Solution**: Keep only the most detailed JSDoc comment and remove duplicates:

```tsx
// Example: GoogleTagManager.component.tsx
/**
 * Google Tag Manager Component
 *
 * Loads Google Tag Manager (GTM) container.
 * Only loads when NEXT_PUBLIC_GTM_ID is configured.
 *
 * Optional alternative to direct GA4 integration.
 *
 * **Important**: Add the noscript fallback manually in layout.tsx
 *
 * @module components/analytics
 */

'use client'

import Script from 'next/script'

// Example: GoogleTagManager.component.tsx
/**
 * Google Tag Manager Component
 *
 * Loads Google Tag Manager (GTM) container.
 * Only loads when NEXT_PUBLIC_GTM_ID is configured.
 *
 * Optional alternative to direct GA4 integration.
 *
 * **Important**: Add the noscript fallback manually in layout.tsx
 *
 * @module components/analytics
 */

// Example: GoogleTagManager.component.tsx
/**
 * Google Tag Manager Component
 *
 * Loads Google Tag Manager (GTM) container.
 * Only loads when NEXT_PUBLIC_GTM_ID is configured.
 *
 * Optional alternative to direct GA4 integration.
 *
 * **Important**: Add the noscript fallback manually in layout.tsx
 *
 * @module components/analytics
 */

// Example: GoogleTagManager.component.tsx
/**
 * Google Tag Manager Component
 *
 * Loads Google Tag Manager (GTM) container.
 * Only loads when NEXT_PUBLIC_GTM_ID is configured.
 *
 * Optional alternative to direct GA4 integration.
 *
 * **Important**: Add the noscript fallback manually in layout.tsx
 *
 * @module components/analytics
 */

// Example: GoogleTagManager.component.tsx
/**
 * Google Tag Manager Component
 *
 * Loads Google Tag Manager (GTM) container.
 * Only loads when NEXT_PUBLIC_GTM_ID is configured.
 *
 * Optional alternative to direct GA4 integration.
 *
 * **Important**: Add the noscript fallback manually in layout.tsx
 *
 * @module components/analytics
 */

// Example: GoogleTagManager.component.tsx
/**
 * Google Tag Manager Component
 *
 * Loads Google Tag Manager (GTM) container.
 * Only loads when NEXT_PUBLIC_GTM_ID is configured.
 *
 * Optional alternative to direct GA4 integration.
 *
 * **Important**: Add the noscript fallback manually in layout.tsx
 *
 * @module components/analytics
 */

// Example: GoogleTagManager.component.tsx
/**
 * Google Tag Manager Component
 *
 * Loads Google Tag Manager (GTM) container.
 * Only loads when NEXT_PUBLIC_GTM_ID is configured.
 *
 * Optional alternative to direct GA4 integration.
 *
 * **Important**: Add the noscript fallback manually in layout.tsx
 *
 * @module components/analytics
 */

// ❌ Remove duplicate block here

interface GoogleTagManagerProps {
    containerId: string
}
```

**Guidelines Reference**: Documentation best practices require avoiding duplication and maintaining a single source of truth.

---

### 8. Effect Dependencies Incomplete

**Location**: `apps/web/lib/analytics/useScrollDepth.hook.ts:100`

**Issue**: The effect's dependency array includes `enabled` and `resetOnPathChange` but omits `trackingOptions`. This means changes to thresholds, debounceMs, element, or onThresholdReached won't trigger reinitialization.

**Current Code**:

```tsx
useEffect(() => {
    // ...
    const cleanup = initScrollDepthTracking(trackingOptions)
    // ...
    return () => {
        cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [enabled, resetOnPathChange]) // ❌ Missing trackingOptions
```

**Problem**: If a parent component changes scroll thresholds or callbacks, the hook won't reinitialize with new values.

**Solution**: Add trackingOptions to dependencies OR require callers to memoize:

**Option A** - Add to deps (may cause unnecessary re-renders):

```tsx
}, [enabled, resetOnPathChange, pathname, trackingOptions])
```

**Option B** - Document requirement to memoize (preferred):

````tsx
/**
 * Custom hook to track scroll depth
 *
 * @param options - Scroll tracking options
 *
 * **Important**: Wrap options in useMemo if passing dynamic values:
 * ```tsx
 * const options = useMemo(() => ({
 *   thresholds: [25, 50, 75, 100],
 *   onThresholdReached: (t) => console.log(t)
 * }), [])
 *
 * useScrollDepth(options)
 * ```
 */
export function useScrollDepth(options: UseScrollDepthOptions = {}): void {
    // ...
}
````

**Recommendation**: Use Option B and document the memoization requirement to avoid performance issues.

**Guidelines Reference**: React hooks best practices require complete and stable dependency arrays.

---

## ℹ️ INFO / Already Fixed

### GA4 Measurement ID Validation ✅

**Location**: `apps/web/env.ts:43-46`

**Status**: **FIXED** - Regex validation was added:

```tsx
NEXT_PUBLIC_GA_MEASUREMENT_ID: z
    .string()
    .regex(/^G-[A-Z0-9]{10}$/)
    .optional(),
```

This prevents XSS injection via malformed measurement IDs.

---

### Timeout Type Fixed ✅

**Location**: `apps/web/lib/analytics/scroll-depth.util.ts:122`

**Status**: **FIXED** - Changed from `NodeJS.Timeout` to browser-compatible type:

```tsx
let timeout: ReturnType<typeof setTimeout> | null = null
```

---

### Duplicate Documentation Cleanup ✅ (Partial)

**Status**: **MOSTLY FIXED** - Most duplicate JSDoc blocks were removed. Only a few remain (see Medium Priority #7).

---

## Testing Recommendations

### Critical Path Testing

1. **Consent Flow**:

    ```bash
    # After fixing issue #1
    - Open app in incognito
    - Verify analytics scripts DON'T load initially
    - Accept cookies
    - Verify GA4/Clarity scripts load
    - Check Network tab for gtag.js
    ```

2. **Scroll Tracking Across Routes**:

    ```bash
    # After fixing issue #2
    - Scroll 50% on home page
    - Navigate to about page
    - Verify scroll depth resets to 0%
    - Check GA4 events show correct page_path
    ```

3. **Blog Post Attribution**:
    ```bash
    # After fixing issue #4
    - Open blog post A
    - Scroll to 75%
    - Open GA4 DebugView
    - Verify event has post_slug and post_title parameters
    ```

### Type Checking

```bash
# Should pass after fixes
cd apps/web && pnpm typecheck
```

### Build Verification

```bash
# Should build without errors
pnpm build
```

---

## Priority Order for Fixes

1. **Fix Issue #1 (CRITICAL)**: Move AnalyticsProvider inside ConsentProvider boundary
2. **Fix Issue #2 (CRITICAL)**: Add pathname dependency to useScrollDepth
3. **Fix Issue #3 (HIGH)**: Remove duplicate NODE_ENV declarations
4. **Fix Issue #4 (HIGH)**: Pass blog metadata to analytics
5. **Fix Issue #5 (HIGH)**: Move GTM noscript to layout.tsx
6. **Fix Issue #6 (MEDIUM)**: Clarify NEXT_PUBLIC_NODE_ENV mapping
7. **Fix Issue #7 (MEDIUM)**: Remove remaining duplicate JSDoc blocks
8. **Fix Issue #8 (MEDIUM)**: Document memoization requirement for useScrollDepth

---

## Summary of Required Changes

### Files Requiring Changes

1. ✅ **COMPLETED** `apps/web/app/layout.tsx` - Move AnalyticsProvider inside Providers boundary
2. ✅ **COMPLETED** `apps/web/components/analytics/AnalyticsProvider.component.tsx` - Add consent gating
3. ⏳ `apps/web/lib/analytics/useScrollDepth.hook.ts` - Add pathname tracking
4. ⏳ `apps/web/components/blog/BlogPostScrollTracker.component.tsx` - Pass metadata to analytics
5. ⏳ `apps/web/components/analytics/GoogleTagManager.component.tsx` - Remove noscript, update docs
6. ⏳ `apps/web/env.ts` - Remove duplicate NODE_ENV, clarify mappings
7. ⏳ Multiple files - Remove remaining duplicate JSDoc blocks

### Estimated Effort

- **Critical fixes**: 2-3 hours (issues #1, #2)
- **High priority fixes**: 1-1.5 hours (issues #3, #4, #5)
- **Medium priority fixes**: 30-45 minutes (issues #6, #7, #8)
- **Total**: 3-4 hours

---

## References

- [GA4 Events Documentation](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Consent Mode v2 Documentation](https://developers.google.com/tag-platform/devguides/consent)
- [GTM Implementation Guide](https://developers.google.com/tag-platform/tag-manager/web)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [TypeScript Best Practices](.cursor/rules/typescript.mdc)
- [PR Review Guidelines](.cursor/rules/pr-review-analyzer.mdc)

---

**Review completed**: 2025-10-17
**Next action**: Address critical issues #1 and #2 before merging to ensure privacy compliance and accurate analytics data.
