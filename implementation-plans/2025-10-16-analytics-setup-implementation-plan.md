## Executive Summary

This plan defines how to implement first‑party analytics for the monorepo’s Next.js 15 web app using Google Analytics 4 (GA4) and Microsoft Clarity, with privacy-first defaults (Consent Mode v2), robust event tracking (page views, clicks, form submits, scroll depth), environment-driven configuration, and production-grade verification/monitoring. The approach leverages Next.js App Router patterns, the repository’s shared conventions, and keeps third-party scripts isolated and type-safe.

## Technical Analysis

- **Tech stack context**
    - Next.js 15 (App Router, RSC), React 19, Turborepo, pnpm
    - Shared UI in `@workspace/ui`, SEO helpers in `@workspace/seo`
    - Tailwind v4, shadcn/ui, TypeScript 5.7+/5.9
- **Relevant integration patterns**
    - Next.js supports first-class third-party helpers via `next/third-parties` for Google and Clarity. If we need more control, fall back to `next/script`.
    - GA4 requires a Measurement ID (e.g., `G-XXXXXXX`). Clarity requires a Project ID.
    - Consent Mode v2 is the current standard for privacy compliance in GA4.
    - Event tracking in GA4 should follow consistent naming and avoid PII.
- **Fit with repo**
    - Centralize analytics config and utilities under `apps/web/lib/analytics/`.
    - `.env` is at repository root; `apps/web/env.ts` should validate new env vars.

## Dependencies & Prerequisites

- **Accounts**
    - GA4 property with Web data stream and Measurement ID.
    - Microsoft Clarity project with Project ID.
- **Environment**
    - Root `.env` updated with keys (see Configuration Changes).
    - Optional cookie consent UI to drive Consent Mode updates.
- **Access & governance**
    - Ensure appropriate access to GA and Clarity properties.
    - Define naming conventions and event taxonomy before rollout.

## Architecture Overview

- **Script loading**
    - Prefer `next/third-parties` components for GA and Clarity for correct placement and performance.
    - Fallback to `next/script` as needed.
- **Configuration via env**
    - `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID` control activation.
    - Consent defaults configured early in the app tree; updates from consent UI.
- **Event layer**
    - A thin analytics client (`analytics.client.ts`) wraps `gtag` and `clarity` with browser guards.
    - Page view events on initial load and route changes (App Router).
    - Interaction events (click, submit, scroll depth) via hooks/helpers.
- **Privacy & compliance**
    - Consent Mode v2 default state and updates.
    - Clarity masking for sensitive content.

## Implementation Phases

### Phase 1 — Baseline instrumentation and env wiring

- **Objectives**
    - Load GA4 and Clarity only when configured via env.
    - Establish central analytics utilities.
- **Deliverables**
    - `apps/web/app/layout.tsx` loads GA/Clarity components or scripts.
    - `apps/web/lib/analytics/analytics.client.ts` with `trackEvent`, `trackPageview`, `trackScrollDepth` stubs.
    - Extend `apps/web/env.ts` to include analytics env vars.
- **Effort**: S • **Complexity**: Low
- **Dependencies**: Env variables present
- **Testing/validation**: Verify scripts load with real IDs; no runtime errors.

### Phase 2 — Consent Mode v2 & privacy controls

- **Objectives**
    - Initialize Consent Mode default state; update on user consent.
- **Deliverables**
    - Consent initializer (in `layout.tsx` or a provider) invoking `gtag('consent', 'default', {...})`.
    - Hook/context to apply consent updates from the banner.
- **Effort**: M • **Complexity**: Medium
- **Dependencies**: Phase 1
- **Testing/validation**: GA DebugView shows limited behavior pre-consent and full behavior post-consent.

### Phase 3 — Page view tracking (App Router)

- **Objectives**
    - Send GA4 `page_view` on initial load and route changes.
- **Deliverables**
    - Client component using `usePathname` + `useEffect` calling `trackPageview` on changes.
- **Effort**: S • **Complexity**: Low
- **Dependencies**: Phase 1
- **Testing/validation**: Confirm GA DebugView receives `page_view` on navigation; no duplicates.

### Phase 4 — Interaction events (click, submit, scroll depth)

- **Objectives**
    - Utilities/hooks to log common UX events consistently and type-safely.
- **Deliverables**
    - `useAnalyticsEvent.hook.ts` to emit named events with params.
    - `scroll-depth.util.ts` using IntersectionObserver or scroll listener at 25/50/75/100% thresholds.
    - Example usage across CTA buttons, forms, and long content pages.
- **Effort**: M • **Complexity**: Medium
- **Dependencies**: Phases 1–3
- **Testing/validation**: GA receives events; Clarity heatmaps/recordings reflect interactions.

### Phase 5 — Verification, monitoring & dashboards

- **Objectives**
    - Ensure data quality and visibility.
- **Deliverables**
    - GA4 DebugView checklist; real-time validation steps.
    - Clarity masking configuration review; optional GA integration linking.
    - Documentation of standard explorations/dashboards.
- **Effort**: S • **Complexity**: Low
- **Dependencies**: Phases 1–4
- **Testing/validation**: Validate across dev/staging; ensure no PII leakage.

### Phase 6 — Optional: Google Tag Manager (GTM) path

- **Objectives**
    - Offer an alternative where tags are orchestrated via GTM.
- **Deliverables**
    - `NEXT_PUBLIC_GTM_ID` support and `GoogleTagManager` embed.
    - Guidance on when to choose GTM vs direct instrumentation.
- **Effort**: S • **Complexity**: Low/Medium
- **Dependencies**: Independent (interacts with Phases 1–4)
- **Testing/validation**: Verify parity when migrating tags to GTM.

### Unit Testing Phase — Coverage for analytics utilities

- **Scope**
    - Unit tests for `analytics.client.ts` and event hooks (Vitest).
    - Mock `window.gtag` and `window.clarity`; assert calls and parameters.
- **Deliverables**
    - `*.test.ts` under `apps/web/lib/analytics/__tests__/`.
    - ≥80% coverage for new code; enforce in CI.
- **Integration tests**
    - Test page emitting events; assert utilities invoked.
- **CI/CD**
    - Ensure analytics tests run in pipelines.

### Documentation Phase — Developer & ops docs

- **Scope**
    - VitePress docs under `/docs/` covering setup, env vars, event taxonomy, consent patterns.
- **Deliverables**
    - Dev guide: how to log events; best practices.
    - Ops guide: verification checklist, dashboards, troubleshooting.
- **Artifacts**
    - Code snippets for typical usage; links to official docs.

## Folder Structure

- `apps/web/lib/analytics/`
    - `analytics.client.ts` — GA4/Clarity wrappers (browser-only)
    - `useAnalyticsEvent.hook.ts` — Hook to emit typed events
    - `scroll-depth.util.ts` — Scroll depth helper and emitter
    - `index.ts` — Public exports
- `apps/web/app/`
    - `layout.tsx` — Third-party script components and consent default
    - `providers.tsx` — Optional consent provider wiring

## Configuration Changes

- Root `.env` additions (examples)

```bash
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=XXXXXXXXXX
# Optional GTM alternative
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

- Update `apps/web/env.ts` to include and validate these variables.
- Add guards so scripts only load when IDs are present.

## Minimal Implementation Examples (for clarity)

These illustrate the intended approach; actual code will be added during implementation.

- Load scripts in `layout.tsx` (preferred components; fallback to next/script):

```tsx
// Using next/third-parties components (if available in our Next.js version)
// import { GoogleAnalytics, GoogleTagManager } from 'next/third-parties/google'
// import { Clarity } from 'next/third-parties/clarity'

{
    /* {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
)} */
}
{
    /* {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
  <Clarity id={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
)} */
}
```

- Consent Mode v2 default (execute early on client):

```ts
// window.gtag?.('consent', 'default', {
//   ad_storage: 'denied',
//   ad_user_data: 'denied',
//   ad_personalization: 'denied',
//   analytics_storage: 'denied',
//   functionality_storage: 'granted',
//   personalization_storage: 'denied',
//   security_storage: 'granted',
// });
```

- GA4 event wrapper (typed, browser-safe):

```ts
// export function trackEvent(name: string, params?: Record<string, unknown>) {
//   if (typeof window === 'undefined') return
//   if (!window.gtag) return
//   window.gtag('event', name, params ?? {})
// }
```

- Scroll depth thresholds:

```ts
// [25, 50, 75, 100].forEach((threshold) => {
//   // fire once per threshold reached
//   // trackEvent('scroll_depth', { percent: threshold })
// })
```

## Risk Assessment

- **Privacy & compliance**
    - Risk: Misconfigured consent could send analytics pre-consent.
    - Mitigation: Denied-by-default Consent Mode; QA via GA DebugView; review checklists.
- **Double counting**
    - Risk: Duplicate `page_view` or events.
    - Mitigation: Centralize emission; guard against multiple inits; test routing flows.
- **PII leakage**
    - Risk: PII in event params or Clarity recordings.
    - Mitigation: Strict event schema; code review gates; Clarity masking configuration.
- **Performance**
    - Risk: Heavy listeners/observers.
    - Mitigation: Lightweight hooks; debounce; lazy observers; only essential events.

## Success Metrics

- **Technical**
    - 0 console errors/warnings from analytics in prod.
    - < 10ms added TBT from instrumentation (field data).
    - ≥80% coverage on analytics utilities.
- **Data**
    - Accurate `page_view` counts vs server logs (±5%).
    - Events visible in GA Real-time; interactions reflected in Clarity heatmaps.
- **Process**
    - Clear developer docs; <10 minutes to add a new event.

## References

- Google Analytics events (gtag.js): `https://developers.google.com/analytics/devguides/collection/ga4/events`
- Consent Mode v2: `https://developers.google.com/tag-platform/devguides/consent`
- GA4 Web stream setup: `https://support.google.com/analytics/answer/9304153`
- Next.js third-party scripts: `https://nextjs.org/docs/app/building-your-application/optimizing/third-party-scripts`
- Microsoft Clarity setup: `https://learn.microsoft.com/clarity/setup-and-installation/clarity-setup`
- Clarity + GA integration: `https://learn.microsoft.com/clarity/ga-integration`
- GA4 Engagement & Scroll: `https://support.google.com/analytics/answer/12195621`

---

Notes

- Direct GA4 + Clarity is recommended for simplicity and performance. Consider GTM if marketing ownership or frequent tag changes are required.
- Keep all event names lowercase, hyphenated or snake_case, and avoid PII.
