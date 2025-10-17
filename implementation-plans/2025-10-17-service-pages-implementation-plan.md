# Service Pages Implementation Plan

**Date:** 2025-10-17
**Feature:** Service Pages with Dynamic Routing
**Branch:** `feature/service-pages`
**Status:** Planning Complete - Ready for Implementation

---

## Executive Summary

This implementation plan outlines the development of a comprehensive service pages feature for the Next.js 15 website template. The feature includes:

- A services listing page (`/services`) displaying all available services
- Individual service detail pages (`/services/[slug]`) for each service
- Service data stored in the `apps/web/lib/data/` folder for easy modification
- Automatic rendering when new services are added (zero code changes needed)
- Full SEO optimization with metadata, structured data, and static generation
- Mobile-first responsive design using shadcn/ui components
- Template-friendly architecture for easy client customization

**Key Benefits:**

- Template users can add/modify services by editing a single data file
- Automatic SEO optimization for all service pages
- Fast page loads through static generation
- Professional, interactive UI using existing design system
- Consistent with existing template patterns and conventions

---

## Technical Analysis

### Current State Assessment

The project already includes:

- ✅ Next.js 15 App Router with React Server Components
- ✅ Dynamic routing pattern established (blog: `/blog/[slug]`)
- ✅ Centralized data management pattern (`lib/data/webpages/`)
- ✅ SEO utilities via `@workspace/seo` package
- ✅ Structured data support (ArticleSchema, WebPageSchema)
- ✅ Layout components (SectionContainer, ContentWrapper)
- ✅ Shared UI components (FeatureCard, IconCard, Breadcrumbs)
- ✅ Type-safe environment configuration
- ✅ Image optimization with Next.js Image component

### Requirements Analysis

**Functional Requirements:**

1. Services listing page with grid/card layout
2. Dynamic service detail pages with rich content
3. Data-driven architecture (no hardcoded content)
4. SEO-optimized pages (metadata, OG tags, structured data)
5. Navigation integration (header, footer, breadcrumbs)
6. Mobile-responsive design
7. Loading states and error handling

**Non-Functional Requirements:**

1. Fast page loads (< 3s on 3G)
2. Static generation for optimal performance
3. Type-safe implementation
4. Accessibility (WCAG 2.1 AA)
5. Template-friendly (easy for developers to customize)

### Technology Decisions

**Routing Strategy:** Dynamic routes with `generateStaticParams`

- All service pages pre-rendered at build time for optimal SEO
- Follows existing blog pattern for consistency
- Falls back to 404 for non-existent services

**Data Management:** TypeScript data files (not database)

- Keeps template simple and portable
- Easy for developers to modify without database setup
- Version control friendly
- Fast build times

**SEO Strategy:**

- Individual metadata per service page
- Service-specific structured data (Schema.org Service type)
- Sitemap integration
- Breadcrumb navigation

**Image Strategy:**

- Next.js Image component with automatic optimization
- Support for local and CDN images
- Blur placeholders for smooth loading
- Responsive image sizes

---

## Dependencies & Prerequisites

### Required Packages (Already Installed)

- ✅ Next.js 15.4.5
- ✅ React 19.1.1
- ✅ TypeScript 5.7.3
- ✅ Tailwind CSS v4.1.11
- ✅ @workspace/ui (shadcn/ui components)
- ✅ @workspace/seo (SEO utilities)
- ✅ lucide-react (icons)

### Optional shadcn/ui Components to Install

If not already installed, add these components:

```bash
# Run from repository root
pnpm dlx shadcn@latest add badge -c apps/web
pnpm dlx shadcn@latest add separator -c apps/web
```

### Environment Variables

No new environment variables required. Uses existing SEO configuration:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_ENABLE_INDEXING`

### Prerequisites

- Node.js >=20
- pnpm 10.4.1
- Development server running: `pnpm dev`

---

## Architecture Overview

### Folder Structure

```
apps/web/
├── app/
│   └── services/
│       ├── page.tsx                          # Services listing page
│       └── [slug]/
│           └── page.tsx                      # Individual service detail page
├── components/
│   └── services/
│       ├── ServiceCard.component.tsx         # Service card for listing page
│       ├── ServiceHero.component.tsx         # Hero section for detail page
│       ├── ServiceFeatures.component.tsx     # Features section for detail page
│       ├── ServiceBenefits.component.tsx     # Benefits section for detail page
│       ├── ServiceProcess.component.tsx      # Process/steps section
│       └── ServiceCTA.component.tsx          # Call-to-action section
├── lib/
│   ├── data/
│   │   └── services/
│   │       ├── services-data.ts              # Main service data file
│   │       └── README.md                     # Documentation for users
│   ├── types/
│   │   └── services/
│   │       ├── service.type.ts               # Core service type
│   │       ├── service-card.type.ts          # Service card props
│   │       ├── service-detail.type.ts        # Service detail props
│   │       ├── service-feature.type.ts       # Service feature type
│   │       ├── service-benefit.type.ts       # Service benefit type
│   │       └── service-process-step.type.ts  # Process step type
│   ├── queries/
│   │   ├── get-services.query.ts             # Query to get all services
│   │   └── get-service-by-slug.query.ts      # Query to get service by slug
│   └── seo/
│       └── service-schema.util.ts            # Service structured data utility
├── utils/
│   └── services/
│       └── generate-service-metadata.util.ts # Metadata generation utility
└── public/
    └── images/
        └── services/                          # Service images
            ├── service-1.jpg
            ├── service-2.jpg
            └── ...
```

### Data Flow

```
1. Service Data File (services-data.ts)
   ↓
2. Type Validation (TypeScript)
   ↓
3. Query Functions (get-services.query.ts)
   ↓
4. Next.js Pages (page.tsx)
   ↓
5. React Components (ServiceCard.component.tsx)
   ↓
6. Rendered HTML (with SEO metadata & structured data)
```

### Component Hierarchy

**Services Listing Page (`/services`):**

```
Page
└── SectionContainer (variant="default")
    └── ContentWrapper (size="lg")
        ├── SectionHeader
        │   ├── Badge (optional)
        │   ├── Title
        │   └── Description
        └── ServicesGrid
            └── ServiceCard[] (map over services)
                ├── Image (service icon/image)
                ├── Badge (category)
                ├── Title
                ├── Description
                ├── Features List
                └── CTA Button
```

**Service Detail Page (`/services/[slug]`):**

```
Page
└── article
    ├── Breadcrumbs
    ├── ServiceHero
    │   ├── Badge (category)
    │   ├── Title
    │   ├── Description
    │   ├── CTA Buttons
    │   └── Hero Image
    ├── ServiceFeatures
    │   └── FeatureCard[] (from @workspace/ui)
    ├── ServiceBenefits
    │   └── IconCard[] (from shared components)
    ├── ServiceProcess (optional)
    │   └── ProcessStep[]
    ├── ImageSection (optional)
    └── ServiceCTA
        ├── Heading
        ├── Description
        └── Action Buttons
```

---

## Type System Design

### Core Service Type

```typescript
// apps/web/lib/types/services/service.type.ts
import type { LucideIcon } from 'lucide-react'

/**
 * Service Category
 * Categorize services for filtering and organization
 */
export type ServiceCategory =
    | 'consulting'
    | 'development'
    | 'design'
    | 'marketing'
    | 'support'
    | 'other'

/**
 * Service Icon Configuration
 * Support both Lucide icons and image paths
 */
export type ServiceIcon = {
    /**
     * Lucide icon component (for listing page cards)
     */
    readonly icon?: LucideIcon

    /**
     * Image path for hero section
     */
    readonly imagePath?: string

    /**
     * Image alt text (required if imagePath is provided)
     */
    readonly imageAlt?: string
}

/**
 * Service Feature
 * Individual feature/capability of a service
 */
export type ServiceFeature = {
    /**
     * Feature icon
     */
    readonly icon: LucideIcon

    /**
     * Feature title
     */
    readonly title: string

    /**
     * Feature description
     */
    readonly description: string

    /**
     * Optional aria label for accessibility
     */
    readonly ariaLabel?: string
}

/**
 * Service Benefit
 * Business benefit or outcome of using the service
 */
export type ServiceBenefit = {
    /**
     * Benefit icon
     */
    readonly icon: LucideIcon

    /**
     * Benefit title
     */
    readonly title: string

    /**
     * Benefit description
     */
    readonly description: string
}

/**
 * Service Process Step
 * Step in the service delivery process
 */
export type ServiceProcessStep = {
    /**
     * Step number (for display)
     */
    readonly step: number

    /**
     * Step title
     */
    readonly title: string

    /**
     * Step description
     */
    readonly description: string

    /**
     * Optional icon for the step
     */
    readonly icon?: LucideIcon
}

/**
 * Service Call-to-Action
 * CTA configuration for service pages
 */
export type ServiceCTA = {
    /**
     * CTA heading
     */
    readonly heading: string

    /**
     * CTA description
     */
    readonly description: string

    /**
     * Primary button configuration
     */
    readonly primaryButton: {
        readonly text: string
        readonly href: string
    }

    /**
     * Optional secondary button
     */
    readonly secondaryButton?: {
        readonly text: string
        readonly href: string
    }
}

/**
 * Main Service Type
 * Complete service data structure
 */
export type Service = {
    /**
     * Unique identifier (used for routing)
     * Format: kebab-case (e.g., 'web-development')
     */
    readonly slug: string

    /**
     * Service name/title
     */
    readonly title: string

    /**
     * Short description (used in cards and meta description)
     * Recommended: 120-160 characters
     */
    readonly excerpt: string

    /**
     * Full service description (used on detail page)
     * Can include multiple paragraphs
     */
    readonly description: string

    /**
     * Service category
     */
    readonly category: ServiceCategory

    /**
     * Display category name (e.g., 'Web Development')
     */
    readonly categoryLabel: string

    /**
     * Service icon configuration
     */
    readonly iconConfig: ServiceIcon

    /**
     * Service features/capabilities
     */
    readonly features: ServiceFeature[]

    /**
     * Service benefits (min 3, max 6 recommended)
     */
    readonly benefits: ServiceBenefit[]

    /**
     * Optional process steps
     */
    readonly process?: ServiceProcessStep[]

    /**
     * Optional additional images for detail page
     */
    readonly images?: {
        readonly url: string
        readonly alt: string
        readonly caption?: string
    }[]

    /**
     * Call-to-action configuration
     */
    readonly cta: ServiceCTA

    /**
     * SEO metadata
     */
    readonly seo: {
        /**
         * Page title (falls back to service title)
         */
        readonly title?: string

        /**
         * Meta description (falls back to excerpt)
         */
        readonly description?: string

        /**
         * Additional keywords
         */
        readonly keywords?: string[]

        /**
         * OG image (optional, uses iconConfig.imagePath if not provided)
         */
        readonly ogImage?: string
    }

    /**
     * Display order (lower numbers appear first)
     * @default 0
     */
    readonly order?: number

    /**
     * Whether service is published
     * @default true
     */
    readonly published?: boolean
}
```

### Component Props Types

```typescript
// apps/web/lib/types/services/service-card.type.ts
import type { Service } from './service.type'

/**
 * ServiceCard Component Props
 */
export type ServiceCardProps = {
    /**
     * Service data
     */
    readonly service: Service

    /**
     * Optional className for customization
     */
    readonly className?: string

    /**
     * Whether to show full description or excerpt
     * @default false (shows excerpt)
     */
    readonly showFullDescription?: boolean
}
```

---

## Data Layer

### Service Data Structure

**File:** `apps/web/lib/data/services/services-data.ts`

```typescript
/**
 * Service Data
 *
 * CENTRAL SOURCE OF TRUTH for all service information.
 *
 * 🎯 ADD NEW SERVICES HERE - they will automatically appear on the website.
 *
 * This file defines all services offered. Each service includes:
 * - Basic information (title, description, category)
 * - Features and capabilities
 * - Benefits and outcomes
 * - Optional process steps
 * - SEO metadata
 * - Call-to-action configuration
 *
 * To add a new service:
 * 1. Copy an existing service object
 * 2. Update all fields with new service information
 * 3. Choose a unique slug (used in URL: /services/your-slug)
 * 4. Add service images to /public/images/services/
 * 5. Save the file - no code changes needed!
 *
 * The service will automatically appear on:
 * - Services listing page (/services)
 * - Individual service page (/services/your-slug)
 * - Site navigation (if configured)
 * - Sitemap and search engines
 */
import {
    BarChart,
    Code,
    Globe,
    Palette,
    Shield,
    Smartphone,
    Zap,
} from 'lucide-react'

import type { Service } from '@/lib/types/services/service.type'

/**
 * All Services
 *
 * Add new services to this array.
 * Services are automatically sorted by the `order` field.
 */
export const services: Service[] = [
    {
        slug: 'web-development',
        title: 'Web Development',
        excerpt:
            'Build fast, scalable, and secure web applications with modern technologies and best practices.',
        description:
            'Our web development services deliver cutting-edge solutions tailored to your business needs. We specialize in building fast, scalable, and maintainable web applications using the latest technologies and industry best practices. From simple landing pages to complex enterprise applications, our expert team ensures your digital presence stands out.',
        category: 'development',
        categoryLabel: 'Development',
        iconConfig: {
            icon: Code,
            imagePath: '/images/services/web-development.jpg',
            imageAlt: 'Modern web development workspace',
        },
        features: [
            {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized performance with sub-second load times',
                ariaLabel: 'Learn about our fast web development',
            },
            {
                icon: Shield,
                title: 'Secure & Reliable',
                description:
                    'Enterprise-grade security and 99.9% uptime guarantee',
                ariaLabel: 'Learn about our secure web development',
            },
            {
                icon: Smartphone,
                title: 'Mobile-First',
                description: 'Responsive design that works on all devices',
                ariaLabel: 'Learn about our mobile-first approach',
            },
        ],
        benefits: [
            {
                icon: BarChart,
                title: 'Increased Conversions',
                description:
                    'Our optimized UX design increases conversion rates by up to 40%',
            },
            {
                icon: Globe,
                title: 'Global Reach',
                description:
                    'Scalable infrastructure that grows with your business',
            },
            {
                icon: Code,
                title: 'Clean Codebase',
                description: 'Maintainable, well-documented code that scales',
            },
        ],
        process: [
            {
                step: 1,
                title: 'Discovery & Planning',
                description:
                    'We analyze your requirements and create a detailed project roadmap',
                icon: Globe,
            },
            {
                step: 2,
                title: 'Design & Prototyping',
                description:
                    'Interactive prototypes and design mockups for your approval',
                icon: Palette,
            },
            {
                step: 3,
                title: 'Development & Testing',
                description:
                    'Agile development with continuous testing and quality assurance',
                icon: Code,
            },
            {
                step: 4,
                title: 'Launch & Support',
                description:
                    'Smooth deployment with ongoing maintenance and support',
                icon: Zap,
            },
        ],
        cta: {
            heading: 'Ready to Start Your Project?',
            description:
                "Let's discuss how we can help bring your vision to life with our web development expertise.",
            primaryButton: {
                text: 'Get a Free Quote',
                href: '/contact',
            },
            secondaryButton: {
                text: 'View Our Work',
                href: '/portfolio',
            },
        },
        seo: {
            title: 'Web Development Services | Custom Web Applications',
            description:
                'Professional web development services for businesses of all sizes. Build fast, scalable, and secure web applications with our expert team.',
            keywords: [
                'web development',
                'custom web applications',
                'react development',
                'next.js development',
                'full-stack development',
            ],
        },
        order: 1,
        published: true,
    },

    // Add more services here following the same structure
]
```

**Note:** Query functions are defined in separate query files in `apps/web/lib/queries/` for better organization.

### Service Query Functions

**File:** `apps/web/lib/queries/get-services.query.ts`

```typescript
/**
 * Service Query Functions
 *
 * Functions to retrieve and filter service data.
 */
import { services } from '@/lib/data/services/services-data'
import type { Service } from '@/lib/types/services/service.type'

/**
 * Get all published services sorted by order
 */
export function getPublishedServices(): Service[] {
    return services
        .filter((service) => service.published !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

/**
 * Get services by category
 */
export function getServicesByCategory(category: string): Service[] {
    return getPublishedServices().filter(
        (service) => service.category === category
    )
}

/**
 * Get all unique categories
 */
export function getServiceCategories(): string[] {
    const categories = new Set(
        getPublishedServices().map((service) => service.category)
    )
    return Array.from(categories)
}
```

**File:** `apps/web/lib/queries/get-service-by-slug.query.ts`

```typescript
/**
 * Get Single Service Query
 *
 * Function to retrieve a single service by its slug.
 */
import { services } from '@/lib/data/services/services-data'
import type { Service } from '@/lib/types/services/service.type'

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
    return services.find(
        (service) => service.slug === slug && service.published !== false
    )
}
```

### Documentation for Users

**File:** `apps/web/lib/data/services/README.md`

````markdown
# Service Data Management

This directory contains all service data for the website. Services are defined in TypeScript files and automatically rendered on the website.

## Quick Start

To add a new service:

1. Open `services-data.ts`
2. Copy an existing service object from the `services` array
3. Update all fields with your new service information
4. Choose a unique `slug` (used in URL: `/services/your-slug`)
5. Add service images to `/public/images/services/`
6. Save the file

The new service will automatically appear on:

- Services listing page (`/services`)
- Individual service page (`/services/your-slug`)
- Sitemap
- Search engine results

## Service Structure

Each service requires these fields:

### Required Fields

- `slug`: URL-friendly identifier (e.g., 'web-development')
- `title`: Service name
- `excerpt`: Short description (120-160 characters for SEO)
- `description`: Full description (multiple paragraphs ok)
- `category`: Category type ('consulting', 'development', 'design', etc.)
- `categoryLabel`: Display name for category
- `iconConfig`: Icon configuration (Lucide icon and/or image)
- `features`: Array of service features (min 3)
- `benefits`: Array of business benefits (min 3, max 6)
- `cta`: Call-to-action configuration

### Optional Fields

- `process`: Step-by-step process (4-6 steps recommended)
- `images`: Additional images for detail page
- `seo`: Custom SEO metadata (title, description, keywords)
- `order`: Display order (lower = first, default: 0)
- `published`: Whether service is live (default: true)

## Icon Options

You can use icons from Lucide React. Popular choices:

- `Code` - Development services
- `Palette` - Design services
- `BarChart` - Analytics/consulting
- `Shield` - Security services
- `Globe` - Global/international services
- `Smartphone` - Mobile services
- `Zap` - Fast/performance services

Import icons at the top of the file:

```typescript
import { Code, Palette, Shield } from 'lucide-react'
```
````

## Image Guidelines

### Service Images

Location: `/public/images/services/`

Recommended specifications:

- **Hero Images**: 1200x800px (3:2 aspect ratio)
- **Icon Images**: 600x600px (1:1 aspect ratio)
- **Format**: JPG or PNG
- **Size**: < 200KB (optimized)
- **Quality**: High quality, professional

### Naming Convention

Use service slug for image names:

- `web-development.jpg`
- `mobile-app-development.jpg`
- `ui-ux-design.jpg`

## SEO Best Practices

### Title

- Keep under 60 characters
- Include primary keyword
- Make it compelling
- Format: "Service Name | Value Proposition"

### Description (excerpt)

- 120-160 characters
- Include primary keyword naturally
- Describe the service benefit
- End with a soft call-to-action

### Keywords

- Include 3-5 relevant keywords
- Use long-tail keywords
- Match user search intent
- Don't keyword stuff

## Examples

See `services-data.ts` for complete examples of:

- Technical services (web development, mobile apps)
- Creative services (design, branding)
- Consulting services (strategy, analytics)
- Support services (maintenance, hosting)

## Troubleshooting

**Service not appearing?**

- Check `published` is `true` or omitted
- Verify `slug` is unique
- Ensure no TypeScript errors
- Restart dev server: `pnpm dev`

**Image not loading?**

- Verify image exists in `/public/images/services/`
- Check file name matches exactly (case-sensitive)
- Image path starts with `/images/services/`
- Image format is JPG or PNG

**TypeScript errors?**

- All required fields must be present
- Icon must be imported from 'lucide-react'
- Arrays must have at least one item
- Check for missing commas

````

---

## Component Structure

### 1. ServiceCard Component

**Purpose:** Display service summary on listing page
**Location:** `apps/web/components/services/ServiceCard.component.tsx`

**Features:**
- Displays service icon, title, excerpt
- Shows category badge
- Lists 2-3 key features
- Includes "Learn More" button
- Hover effects (lift animation)
- Fully accessible with ARIA labels

**Props:**
```typescript
type ServiceCardProps = {
    readonly service: Service
    readonly className?: string
}
````

**Design:**

- Card with rounded corners and subtle shadow
- Icon/image at the top (aspect-[4/3])
- Badge for category (top-right absolute position)
- Title (text-xl font-semibold)
- Excerpt (text-muted-foreground, 2-3 lines with ellipsis)
- Feature list (max 3, with checkmarks or icons)
- CTA button (full-width at bottom)
- Hover: lift effect with increased shadow

### 2. ServiceHero Component

**Purpose:** Hero section for service detail page
**Location:** `apps/web/components/services/ServiceHero.component.tsx`

**Features:**

- Large service title
- Category badge
- Full description
- CTA buttons (primary + secondary)
- Hero image (right side or full-width)
- Breadcrumb navigation

**Props:**

```typescript
type ServiceHeroProps = {
    readonly title: string
    readonly description: string
    readonly category: string
    readonly categoryLabel: string
    readonly heroImage?: {
        readonly url: string
        readonly alt: string
    }
    readonly primaryButton: {
        readonly text: string
        readonly href: string
    }
    readonly secondaryButton?: {
        readonly text: string
        readonly href: string
    }
}
```

### 3. ServiceFeatures Component

**Purpose:** Display service features in grid
**Location:** `apps/web/components/services/ServiceFeatures.component.tsx`

**Features:**

- Reuses existing FeatureCard from @workspace/ui
- 3-column grid (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- Section header with title and description
- Icons with color variants

**Props:**

```typescript
type ServiceFeaturesProps = {
    readonly features: ServiceFeature[]
    readonly title?: string
    readonly description?: string
    readonly variant?: 'default' | 'muted' | 'accent'
}
```

### 4. ServiceBenefits Component

**Purpose:** Display business benefits/outcomes
**Location:** `apps/web/components/services/ServiceBenefits.component.tsx`

**Features:**

- Reuses IconCard from shared components
- 2-3 column grid
- Emphasizes business value
- Data/metrics when applicable

**Props:**

```typescript
type ServiceBenefitsProps = {
    readonly benefits: ServiceBenefit[]
    readonly title?: string
    readonly description?: string
}
```

### 5. ServiceProcess Component

**Purpose:** Display step-by-step process
**Location:** `apps/web/components/services/ServiceProcess.component.tsx`

**Features:**

- Numbered steps (1, 2, 3, 4)
- Timeline/flow visual (vertical or horizontal)
- Step icon, title, description
- Connecting lines between steps

**Props:**

```typescript
type ServiceProcessProps = {
    readonly steps: ServiceProcessStep[]
    readonly title?: string
    readonly description?: string
    readonly layout?: 'vertical' | 'horizontal'
}
```

### 6. ServiceCTA Component

**Purpose:** Call-to-action section at page end
**Location:** `apps/web/components/services/ServiceCTA.component.tsx`

**Features:**

- Reuses existing CTASection component
- Service-specific messaging
- Primary and secondary actions

**Props:**

```typescript
type ServiceCTAProps = {
    readonly heading: string
    readonly description: string
    readonly primaryButton: {
        readonly text: string
        readonly href: string
    }
    readonly secondaryButton?: {
        readonly text: string
        readonly href: string
    }
    readonly variant?: 'default' | 'muted' | 'accent'
}
```

---

## Routing & Navigation

### URL Structure

**Services Listing:**

- URL: `/services`
- File: `apps/web/app/services/page.tsx`
- Purpose: Display all services in grid layout

**Service Detail:**

- URL: `/services/[slug]`
- File: `apps/web/app/services/[slug]/page.tsx`
- Purpose: Display individual service details
- Example: `/services/web-development`

### Dynamic Route Configuration

```typescript
// apps/web/app/services/[slug]/page.tsx

import { notFound } from 'next/navigation'

import { getPublishedServices } from '@/lib/queries/get-services.query'
import { getServiceBySlug } from '@/lib/queries/get-service-by-slug.query'

type PageProps = {
    params: Promise<{ slug: string }>
}

// Generate static params for all services at build time
export async function generateStaticParams() {
    const services = getPublishedServices()

    return services.map((service) => ({
        slug: service.slug,
    }))
}

// Generate metadata for each service page
export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const service = getServiceBySlug(slug)

    if (!service) {
        return {
            title: 'Service Not Found',
        }
    }

    return {
        title: service.seo.title || `${service.title} | Your Company`,
        description: service.seo.description || service.excerpt,
        // ... more metadata
    }
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params
    const service = getServiceBySlug(slug)

    if (!service) {
        notFound()
    }

    return (
        // Component JSX
    )
}
```

### Navigation Integration

**Header Navigation:**

- Add "Services" link to main navigation
- Location: `apps/web/lib/data/navigation.ts`
- Dropdown menu with service categories (optional)

**Footer:**

- Services section with links to all services
- Location: `apps/web/lib/data/footer.ts`

**Breadcrumbs:**

- Listing page: Home > Services
- Detail page: Home > Services > Service Name

---

## SEO Implementation

### Metadata Generation

**File:** `apps/web/utils/services/generate-service-metadata.util.ts`

```typescript
import type { Metadata } from 'next'

import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'
import type { Service } from '@/lib/types/services/service.type'

/**
 * Generate metadata for service detail page
 */
export function generateServiceMetadata(service: Service): Metadata {
    const title =
        service.seo.title || `${service.title} | ${seoConfig.siteName}`
    const description = service.seo.description || service.excerpt
    const ogImage = service.seo.ogImage || service.iconConfig.imagePath

    return toNextMetadata(seoConfig, {
        title,
        description,
        canonical: `/services/${service.slug}`,
        keywords: service.seo.keywords,
        openGraph: {
            type: 'website',
            title,
            description,
            images: ogImage
                ? [
                      {
                          url: ogImage,
                          alt: service.iconConfig.imageAlt || service.title,
                      },
                  ]
                : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
    })
}

/**
 * Generate metadata for services listing page
 */
export function generateServicesListingMetadata(): Metadata {
    return toNextMetadata(seoConfig, {
        title: 'Our Services | Professional Solutions',
        description:
            'Explore our comprehensive range of services designed to help your business grow and succeed.',
        canonical: '/services',
        openGraph: {
            type: 'website',
        },
    })
}
```

### Structured Data (Schema.org)

**File:** `apps/web/lib/seo/service-schema.util.ts`

```typescript
import { seoConfig } from '@/lib/seo-config'
import type { Service } from '@/lib/types/services/service.type'

/**
 * Generate Service structured data (Schema.org)
 *
 * Uses Schema.org Service type for SEO
 * https://schema.org/Service
 */
export function generateServiceSchema(service: Service) {
    const serviceUrl = `${seoConfig.siteUrl}/services/${service.slug}`
    const imageUrl = service.iconConfig.imagePath
        ? `${seoConfig.siteUrl}${service.iconConfig.imagePath}`
        : undefined

    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': serviceUrl,
        name: service.title,
        description: service.description,
        url: serviceUrl,
        image: imageUrl,
        provider: {
            '@type': 'Organization',
            name: seoConfig.siteName,
            url: seoConfig.siteUrl,
        },
        areaServed: {
            '@type': 'Country',
            name: 'United States', // Customize based on your service area
        },
        category: service.categoryLabel,
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            itemOffered: {
                '@type': 'Service',
                name: service.title,
            },
        },
    }
}

/**
 * Generate ItemList structured data for services listing page
 */
export function generateServicesListSchema(services: Service[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Our Services',
        description: 'Professional services offered by our company',
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Service',
                '@id': `${seoConfig.siteUrl}/services/${service.slug}`,
                name: service.title,
                description: service.excerpt,
                url: `${seoConfig.siteUrl}/services/${service.slug}`,
            },
        })),
    }
}
```

### Sitemap Integration

Update existing sitemap to include service pages:

**File:** `apps/web/app/sitemap.ts`

```typescript
import type { MetadataRoute } from 'next'

import { getPublishedServices } from '@/lib/queries/get-services.query'

export default function sitemap(): MetadataRoute.Sitemap {
    const services = getPublishedServices()
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

    // Service pages
    const servicePages = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Services listing page
    const servicesListing = {
        url: `${baseUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }

    return [
        servicesListing,
        ...servicePages,
        // ... other pages
    ]
}
```

---

## Performance Optimization

### Static Generation Strategy

**Approach:** Full static generation at build time

**Implementation:**

- Use `generateStaticParams()` in `[slug]/page.tsx`
- All service pages pre-rendered during build
- Served as static HTML for fastest load times
- No runtime data fetching required

**Benefits:**

- Sub-second page loads
- Perfect Lighthouse scores
- Optimal SEO (search engines love static pages)
- Lower hosting costs (no server computation)

### Image Optimization

**Strategy:**

- Use Next.js Image component for automatic optimization
- Serve responsive images based on device
- Lazy load images below the fold
- Blur placeholder for smooth loading

**Implementation:**

```typescript
import Image from 'next/image'

<Image
    src={service.iconConfig.imagePath}
    alt={service.iconConfig.imageAlt}
    width={1200}
    height={800}
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    priority={false} // Only true for hero images
    placeholder="blur"
    blurDataURL="data:image/..." // Generate at build time
/>
```

**Image Guidelines:**

- Hero images: 1200x800px, < 200KB
- Card images: 600x400px, < 100KB
- Format: WebP preferred, JPEG fallback
- Use CDN for production (Vercel automatically provides this)

### Code Splitting

**Automatic splitting:**

- Each service page is a separate chunk
- Shared components bundled efficiently
- Route-based code splitting by Next.js

**Manual optimization (if needed):**

```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const ServiceProcess = dynamic(
    () => import('@/components/services/ServiceProcess.component'),
    { loading: () => <ProcessSkeleton /> }
)
```

### Loading States

**Services Listing Page:**

- Skeleton cards while loading
- Progressive image loading
- Staggered animation for cards

**Service Detail Page:**

- Immediate page shell
- Progressive content hydration
- Blur placeholders for images

### Performance Targets

**Lighthouse Scores:**

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Core Web Vitals:**

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Additional Metrics:**

- Time to First Byte: < 600ms
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.5s

---

## Extensibility Pattern

### How Developers Add New Services

**Step 1: Open Service Data File**

```bash
# File path
apps/web/lib/data/services/services-data.ts
```

**Step 2: Import Required Icons**

```typescript
import { NewIcon } from 'lucide-react'
```

**Step 3: Add Service Object**

```typescript
export const services: Service[] = [
    // Existing services...
    {
        slug: 'your-new-service',
        title: 'Your New Service',
        excerpt: 'Short description for cards and SEO',
        description: 'Full description for detail page',
        category: 'development',
        categoryLabel: 'Development',
        iconConfig: {
            icon: NewIcon,
            imagePath: '/images/services/your-new-service.jpg',
            imageAlt: 'Service image description',
        },
        features: [
            // At least 3 features
        ],
        benefits: [
            // At least 3 benefits
        ],
        cta: {
            // Call-to-action config
        },
        seo: {
            // Optional SEO overrides
        },
    },
]
```

**Step 4: Add Service Image**

```bash
# Add image to
apps/web/public/images/services/your-new-service.jpg
```

**Step 5: Save and Test**

```bash
# The new service automatically appears at:
# - /services (listing page)
# - /services/your-new-service (detail page)
# No code changes or restarts needed!
```

### How to Modify Existing Services

**Edit Service Data:**

```typescript
// Find service by slug and update any field
{
    slug: 'web-development',
    title: 'Updated Title', // Change title
    excerpt: 'New description', // Update description
    features: [...], // Add/remove features
    published: false, // Hide service temporarily
}
```

**Update Service Order:**

```typescript
{
    slug: 'service-1',
    order: 1, // Display first
}
{
    slug: 'service-2',
    order: 2, // Display second
}
```

**Hide/Unpublish Service:**

```typescript
{
    slug: 'old-service',
    published: false, // Won't appear on website
}
```

### How to Extend Service Schema

**Add New Optional Field:**

1. **Update Type Definition:**

```typescript
// apps/web/lib/types/services/service.type.ts

export type Service = {
    // ... existing fields

    /**
     * New optional field
     */
    readonly pricing?: {
        readonly startingPrice: string
        readonly pricingModel: 'fixed' | 'hourly' | 'project'
        readonly currency: string
    }
}
```

2. **Add Field to Data:**

```typescript
// apps/web/lib/data/services/services-data.ts

{
    slug: 'web-development',
    // ... existing fields
    pricing: {
        startingPrice: '$5,000',
        pricingModel: 'project',
        currency: 'USD',
    },
}
```

3. **Use in Components:**

```typescript
// apps/web/components/services/ServiceCard.component.tsx

{service.pricing && (
    <div className="mt-4">
        <p className="text-lg font-semibold">
            Starting at {service.pricing.startingPrice}
        </p>
    </div>
)}
```

### Template Customization Guide

**Common Customizations:**

1. **Change service categories:**

```typescript
// Update ServiceCategory type
export type ServiceCategory =
    | 'consulting'
    | 'development'
    | 'your-custom-category'
```

2. **Modify card layout:**

```typescript
// Edit ServiceCard.component.tsx
// Change grid columns, spacing, hover effects
```

3. **Add new section to detail page:**

```typescript
// Create new component: ServicePricing.component.tsx
// Add to service detail page: app/services/[slug]/page.tsx
```

4. **Change color scheme:**

```typescript
// All styling uses Tailwind classes
// Modify component className props
// No custom CSS needed
```

5. **Add filtering to listing page:**

```typescript
// Implement category filter
// Use getServicesByCategory() utility
```

---

## Implementation Phases

### Phase 1: Type System & Data Structure (2-3 hours)

**Objective:** Establish type-safe foundation for service data

**Tasks:**

1. Create type definitions in `apps/web/lib/types/services/`
    - `service.type.ts` - Core service types
    - `service-card.type.ts` - Component props types
    - `service-detail.type.ts` - Detail page types
    - `service-feature.type.ts` - Feature types
    - `service-benefit.type.ts` - Benefit types
    - `service-process-step.type.ts` - Process step types

2. Create data directory structure
    - `apps/web/lib/data/services/`
    - Create `services-data.ts` with initial service examples
    - Create `README.md` with user documentation

3. Create query functions in `apps/web/lib/queries/`
    - `get-services.query.ts` - Get all services
    - `get-service-by-slug.query.ts` - Get single service

4. Create utility functions in `apps/web/utils/services/`
    - `generate-service-metadata.util.ts` - Metadata generation utility

**Validation:**

- Run TypeScript type checking: `cd apps/web && pnpm typecheck`
- Verify no type errors
- Test utility functions return expected data

**Edge Cases:**

- Handle missing optional fields gracefully
- Validate slug uniqueness (consider adding validation)
- Handle empty service arrays
- Validate all required fields are present

---

### Phase 2: Services Listing Page (3-4 hours) (DONE)

**Objective:** Create main services page with grid layout

**Tasks:**

1. Create page component
    - `apps/web/app/services/page.tsx`
    - Implement static page with metadata
    - Add page header with SectionHeader component
    - Add breadcrumbs

2. Create ServiceCard component
    - `apps/web/components/services/ServiceCard.component.tsx`
    - Display service icon/image
    - Show category badge
    - Render title, excerpt
    - List 2-3 features
    - Add "Learn More" button
    - Implement hover effects

3. Implement grid layout
    - Use ContentWrapper and SectionContainer
    - 3-column grid (responsive)
    - Add empty state (if no services)

4. Add metadata and SEO
    - Generate page metadata
    - Add OpenGraph tags
    - Implement structured data (ItemList schema)

**Validation:**

- Page renders correctly at `/services`
- All services display in cards
- Hover effects work smoothly
- Responsive design works on mobile/tablet/desktop
- Links navigate to correct detail pages
- Lighthouse score: 95+ performance

**Edge Cases:**

- No services published (show empty state)
- Service missing image (show fallback icon)
- Very long service titles (truncate gracefully)
- Services with many features (show only 3 in card)

---

### Phase 3: Service Detail Page Structure (3-4 hours)

**Objective:** Create dynamic route and basic detail page layout

**Tasks:**

1. Create dynamic route
    - `apps/web/app/services/[slug]/page.tsx`
    - Implement `generateStaticParams()`
    - Add `generateMetadata()`
    - Handle 404 for non-existent services

2. Create ServiceHero component
    - `apps/web/components/services/ServiceHero.component.tsx`
    - Display service title and description
    - Add category badge
    - Show CTA buttons
    - Include hero image (if available)
    - Add breadcrumb navigation

3. Implement page layout
    - Implement breadcrumb navigation
    - Add scroll-to-top behavior

4. Add basic metadata
    - Service-specific title and description
    - OpenGraph tags
    - Twitter card metadata

**Validation:**

- Detail pages accessible at `/services/[slug]`
- All services generate static pages at build
- Metadata correctly generated for each service
- 404 page shows for invalid slugs
- Breadcrumbs navigate correctly
- TypeScript has no errors

**Edge Cases:**

- Service slug with special characters
- Missing hero image (show fallback)
- Service with no description (show excerpt)
- Very long service titles (handle overflow)

---

### Phase 4: Service Detail Sections (4-5 hours)

**Objective:** Add rich content sections to detail pages

**Tasks:**

1. Create ServiceFeatures component
    - `apps/web/components/services/ServiceFeatures.component.tsx`
    - Reuse FeatureCard from @workspace/ui
    - 3-column responsive grid
    - Section header with title
    - Icon color variants

2. Create ServiceBenefits component
    - `apps/web/components/services/ServiceBenefits.component.tsx`
    - Reuse IconCard from shared components
    - 2-3 column grid
    - Emphasize business value

3. Create ServiceProcess component
    - `apps/web/components/services/ServiceProcess.component.tsx`
    - Numbered steps (1, 2, 3, 4)
    - Visual timeline/flow
    - Step icons and descriptions
    - Connecting lines between steps

4. Create ServiceCTA component
    - `apps/web/components/services/ServiceCTA.component.tsx`
    - Reuse CTASection component
    - Service-specific messaging
    - Primary and secondary buttons

5. Integrate all sections into detail page
    - Proper ordering of sections
    - Consistent spacing
    - Section variants (default/muted/accent)

**Validation:**

- All sections render correctly
- Components are responsive
- Animations and interactions work
- Sections reuse existing components properly
- No layout shift during loading
- Accessibility: keyboard navigation works

**Edge Cases:**

- Service with no process steps (hide section)
- Service with many features (grid handles overflow)
- Service with only primary CTA button
- Missing icons (show fallback)

---

### Phase 5: Service Page UI/UX Enhancements (3-4 hours) (DONE)

**Objective:** Add FAQ accordion and project gallery sections to enhance service detail pages

**Tasks:**

1. Install required shadcn components
    - `pnpm dlx shadcn@latest add accordion -c apps/web`
    - `pnpm dlx shadcn@latest add dialog -c apps/web`

2. Create type definitions
    - `apps/web/lib/types/services/service-faq.type.ts`
    - `apps/web/lib/types/services/service-gallery-image.type.ts`
    - Update `apps/web/lib/types/services/index.ts` to export new types
    - Update Service type to include optional `faqs` and `gallery` arrays

3. Create ServiceFAQ component
    - `apps/web/components/services/ServiceFAQ.component.tsx`
    - Use shadcn Accordion component
    - Single item open at a time (collapsible behavior)
    - Smooth expand/collapse animations
    - Keyboard navigation support
    - Mobile-first responsive design

4. Create ServiceGallery component
    - `apps/web/components/services/ServiceGallery.component.tsx`
    - Responsive grid layout (2-3 columns)
    - Click-to-expand lightbox using shadcn Dialog
    - Navigation between images (prev/next)
    - Hover overlay with caption
    - Next.js Image optimization with lazy loading

5. Update service data
    - Add sample FAQ data to web-development service
    - Add sample gallery images to web-development service
    - Provide 5 comprehensive FAQ items
    - Provide 3 gallery images (reusing existing service images)

6. Integrate components into service detail page
    - Import ServiceFAQ and ServiceGallery components
    - Add conditional rendering for both sections
    - Proper section ordering: Features > Benefits > Gallery > Process > FAQ > CTA
    - Alternate section variants for visual contrast

**Implementation Details:**

**ServiceFAQ Component:**

- Uses SectionContainer with ContentWrapper (size: 'md')
- Accordion with type="single" and collapsible=true
- Custom styled accordion items with borders and hover effects
- Proper typography hierarchy for questions and answers
- Default variant: 'muted'

**ServiceGallery Component:**

- Client component with useState for lightbox state
- Grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- GalleryImageCard subcomponent with hover effects
- Dialog lightbox with full-screen image display
- Navigation buttons (disabled at boundaries)
- Close button and ESC key support
- Caption overlay at bottom of lightbox
- Default variant: 'default'

**Section Order:**

1. ServiceHero
2. ServiceFeatures (variant: muted)
3. ServiceBenefits (variant: default)
4. ServiceGallery (variant: muted, conditional)
5. ServiceProcess (variant: default, conditional)
6. ServiceFAQ (variant: muted, conditional)
7. ServiceCTA (variant: accent)

**Validation:**

- ✅ FAQ accordion displays correctly
- ✅ FAQ items expand/collapse smoothly
- ✅ Only one FAQ open at a time
- ✅ Gallery images display in responsive grid
- ✅ Clicking gallery image opens lightbox
- ✅ Lightbox displays full-size image with navigation
- ✅ Sections conditionally render based on data
- ✅ TypeScript has no errors
- ✅ All sections responsive on mobile/tablet/desktop
- ✅ Accessibility: keyboard navigation for accordion
- ✅ Component follows project naming conventions

**Edge Cases:**

- Service with no FAQs (section hidden) ✅
- Service with no gallery (section hidden) ✅
- FAQ with very long answer text (handled by accordion) ✅
- Gallery with only 1-2 images (grid adjusts, navigation works) ✅
- Gallery images with different aspect ratios (object-cover handles) ✅

**Files Created:**

- `apps/web/lib/types/services/service-faq.type.ts`
- `apps/web/lib/types/services/service-gallery-image.type.ts`
- `apps/web/components/services/ServiceFAQ.component.tsx`
- `apps/web/components/services/ServiceGallery.component.tsx`

**Files Modified:**

- `apps/web/lib/types/services/service.type.ts` (added faqs and gallery fields)
- `apps/web/lib/types/services/index.ts` (exported new types)
- `apps/web/lib/data/services/services-data.ts` (added FAQ and gallery data)
- `apps/web/app/services/[slug]/page.tsx` (integrated new components)
- `packages/ui/src/components/accordion.tsx` (added by shadcn)
- `packages/ui/src/components/dialog.tsx` (added by shadcn)

---

### Phase 6: SEO & Structured Data (2-3 hours)

**Objective:** Implement comprehensive SEO optimization

**Tasks:**

1. Create metadata utility
    - `apps/web/utils/services/generate-service-metadata.util.ts`
    - Generate service-specific metadata
    - Handle OpenGraph images
    - Twitter card configuration

2. Create structured data utility
    - `apps/web/lib/seo/service-schema.util.ts`
    - Generate Service schema
    - Generate ItemList schema for listing page
    - Include organization information

3. Integrate structured data
    - Add JSON-LD to listing page
    - Add JSON-LD to each detail page
    - Validate with Google Rich Results Test

4. Update sitemap
    - Add services listing page
    - Add all service detail pages
    - Set appropriate priority and changeFrequency

5. Implement canonical URLs
    - Add canonical tags to all pages
    - Prevent duplicate content issues

**Validation:**

- Google Rich Results Test passes
- Structured data shows no errors
- Sitemap includes all service pages
- Canonical URLs are correct
- Social media preview cards work (Twitter, Facebook)
- Search Console validates pages

**Edge Cases:**

- Service with no OG image (use site default)
- Service with very long description (truncate)
- Special characters in metadata (properly escape)

---

### Phase 7: Navigation & Integration (2-3 hours)

**Objective:** Integrate services into site navigation

**Tasks:**

1. Update main navigation
    - Add "Services" link to `apps/web/lib/data/navigation.ts`
    - Add mobile menu support
    - Highlight active state for service pages

2. Update footer
    - Add services section to `apps/web/lib/data/footer.ts`
    - List all services (or categories)
    - Link to listing page and detail pages

3. Add internal linking
    - Link from homepage features to relevant services
    - Link from about page to services
    - Add "Related Services" section to detail pages (optional)

4. Update breadcrumbs
    - Ensure breadcrumbs work on all service pages
    - Proper hierarchy: Home > Services > Service Name

**Validation:**

- Services link appears in header navigation
- Mobile menu includes services
- Footer links work correctly
- Breadcrumbs show proper hierarchy
- Active states work correctly
- All internal links navigate properly

**Edge Cases:**

- Long service names in navigation (truncate)
- Many services in footer (consider categories)
- Active state on nested routes

---

### Phase 8: Images & Assets (2-3 hours)

**Objective:** Add and optimize all service images

**Tasks:**

1. Create image directory
    - `apps/web/public/images/services/`
    - Organize by service slug

2. Add placeholder images
    - Hero images (1200x800px)
    - Icon images (600x600px)
    - Additional content images

3. Optimize images
    - Compress to < 200KB per image
    - Convert to WebP (with JPEG fallback)
    - Generate blur placeholders

4. Update service data
    - Add image paths to services-data.ts
    - Add proper alt text
    - Test image loading

5. Implement responsive images
    - Use proper sizes attribute
    - Lazy load below-fold images
    - Priority load hero images

**Validation:**

- All images load correctly
- Images are optimized (< 200KB)
- Blur placeholders show while loading
- Responsive images serve correct sizes
- Alt text is descriptive
- No layout shift during image load

**Edge Cases:**

- Missing images (show fallback icon/image)
- Failed image loads (error state)
- Very large images (enforce size limits)
- Different aspect ratios (handle with object-fit)

---

### Phase 9: Polish & Refinement (2-3 hours)

**Objective:** Final touches and quality assurance

**Tasks:**

1. Add loading states
    - Skeleton loaders for cards
    - Progressive image loading
    - Smooth transitions

2. Add animations
    - Fade-in on scroll
    - Hover effects on cards
    - Smooth page transitions
    - Card entrance animations (stagger)

3. Implement error boundaries
    - Graceful error handling
    - User-friendly error messages
    - Fallback UI for failures

4. Add empty states
    - No services published message
    - Helpful guidance for users

5. Accessibility improvements
    - ARIA labels on all interactive elements
    - Keyboard navigation
    - Focus indicators
    - Screen reader testing

6. Performance optimization
    - Code splitting
    - Lazy loading
    - Bundle size analysis
    - Lighthouse optimization

**Validation:**

- All animations are smooth (60fps)
- Loading states appear correctly
- Error states handle failures gracefully
- Empty states are helpful
- Lighthouse scores: 95+ across all metrics
- Accessibility score: 100
- Keyboard navigation works perfectly
- Screen reader announces correctly

**Edge Cases:**

- Slow network (loading states work)
- Failed data fetch (error boundaries catch)
- JavaScript disabled (graceful degradation)
- Very slow devices (performance remains good)

---

### Phase 10: Unit Testing (3-4 hours)

**Objective:** Comprehensive test coverage for all service functionality

**Tasks:**

1. Test query functions
    - `get-services.query.test.ts`
    - Test getPublishedServices() returns only published services
    - Test getServiceBySlug() finds correct service
    - Test with empty service array
    - Test with unpublished services

2. Test utility functions
    - `generate-service-metadata.util.test.ts`
    - Test metadata generation with SEO overrides
    - Test fallback to defaults when SEO fields missing
    - Test OpenGraph image handling

3. Test component rendering
    - `ServiceCard.component.test.tsx`
        - Renders service title, excerpt, and features
        - Shows category badge
        - Renders "Learn More" button with correct href
        - Shows fallback when image missing
    - `ServiceHero.component.test.tsx`
        - Renders title and description
        - Shows CTA buttons
        - Renders hero image when provided
    - `ServiceFeatures.component.test.tsx`
        - Renders all features in grid
        - Handles empty features array
    - `ServiceBenefits.component.test.tsx`
        - Renders all benefits
        - Shows icons correctly
    - `ServiceProcess.component.test.tsx`
        - Renders steps in order
        - Shows step numbers
    - `ServiceCTA.component.test.tsx`
        - Renders heading and description
        - Shows primary button
        - Shows secondary button when provided

4. Test structured data
    - `service-schema.util.test.ts`
    - Test Service schema has required fields
    - Test ItemList schema for services listing
    - Test schema URLs are correctly formatted
    - Test provider organization is included

5. Integration tests
    - Test service listing page renders all services
    - Test service detail page for valid slug
    - Test 404 for invalid slug
    - Test generateStaticParams returns all published services

6. Type safety tests
    - Verify TypeScript compilation
    - Test type inference works correctly
    - Test required vs optional fields

**Validation:**

- All tests pass: `pnpm test`
- Coverage > 80% for new code
- No TypeScript errors
- Tests run fast (< 10s total)
- CI/CD pipeline passes

**Testing Framework:**

- Vitest for unit tests
- Testing Library for component tests
- Mock Next.js router and Image component
- Mock lucide-react icons

**Edge Cases Tested:**

- Empty service arrays
- Missing optional fields (images, process, secondary button)
- Unpublished services filtered out
- Invalid slugs return undefined
- Special characters in service data

---

### Phase 11: Documentation (2-3 hours)

**Objective:** Complete documentation for template users

**Tasks:**

1. Create service data README
    - `apps/web/lib/data/services/README.md`
    - How to add new services
    - How to modify existing services
    - Field descriptions and requirements
    - Icon selection guide
    - Image specifications
    - SEO best practices
    - Troubleshooting guide

2. Update main project documentation
    - Update `CLAUDE.md` with service pages patterns
    - Add service page examples
    - Document component usage
    - Add import patterns

3. Add inline code documentation
    - JSDoc comments on all types
    - Component prop documentation
    - Utility function documentation
    - Example usage in comments

4. Create example services
    - 3-5 complete service examples in services-data.ts
    - Different categories represented
    - Show various optional features
    - Demonstrate best practices

5. Create video/tutorial (optional)
    - Screen recording of adding a new service
    - Demonstrate customization options
    - Show common modifications

6. Document customization points
    - How to add new service categories
    - How to modify component layouts
    - How to extend service schema
    - How to add filtering/search

**Deliverables:**

- ✅ README.md in services data directory
- ✅ Updated CLAUDE.md with service patterns
- ✅ Inline code documentation (JSDoc)
- ✅ Example services in data file
- ✅ Component usage examples
- ✅ Customization guide

**Validation:**

- Documentation is clear and easy to follow
- Examples compile without errors
- New developers can add services without help
- All code has proper comments
- README covers all common use cases

**Documentation Sections:**

1. Quick Start (5-minute guide to add service)
2. Service Structure (field-by-field explanation)
3. Component Reference (all service components)
4. Customization Guide (extend and modify)
5. Best Practices (SEO, images, content)
6. Troubleshooting (common issues)
7. Examples (complete service examples)

---

## Testing Considerations

### What Should Be Tested

**Unit Tests:**

1. **Query Functions**
    - getPublishedServices() returns only published services
    - getServiceBySlug() finds correct service by slug
    - Edge case: empty services array
    - Edge case: all services unpublished

2. **Utility Functions**
    - generateServiceMetadata() creates correct metadata
    - Falls back to defaults when SEO fields missing
    - Handles missing images gracefully

3. **Type Validation**
    - Service type has all required fields
    - Optional fields can be omitted
    - TypeScript compilation succeeds

4. **Structured Data**
    - Service schema has required fields
    - ItemList schema formats correctly
    - URLs are properly constructed

**Component Tests:**

1. **ServiceCard**
    - Renders service title and excerpt
    - Shows category badge
    - Displays features list
    - Renders "Learn More" button
    - Handles missing image (shows icon fallback)

2. **ServiceHero**
    - Renders title and description
    - Shows CTA buttons
    - Displays hero image when provided
    - Breadcrumbs render correctly

3. **ServiceFeatures**
    - Renders all features in grid
    - Shows feature icons
    - Handles empty features array

4. **ServiceBenefits**
    - Renders all benefits
    - Displays icons correctly

5. **ServiceProcess**
    - Renders steps in correct order
    - Shows step numbers
    - Handles optional icon display

6. **ServiceCTA**
    - Renders heading and description
    - Shows primary button
    - Conditionally shows secondary button

**Integration Tests:**

1. **Services Listing Page**
    - Renders all published services
    - Grid layout is responsive
    - Cards link to correct detail pages
    - Metadata is correctly generated

2. **Service Detail Page**
    - Renders service for valid slug
    - Returns 404 for invalid slug
    - All sections render in correct order
    - Structured data is included

3. **Navigation**
    - Services link appears in header
    - Footer includes service links
    - Breadcrumbs show correct hierarchy

**End-to-End Tests (Optional):**

1. User can navigate to services listing
2. User can click on service card
3. Detail page loads correctly
4. CTA buttons navigate to contact page
5. Breadcrumbs navigate back to listing

### Edge Cases to Consider

**Data Edge Cases:**

1. **Empty Service Array**
    - Listing page shows empty state
    - No errors thrown
    - Helpful message displayed

2. **Missing Optional Fields**
    - Service without process section (section hidden)
    - Service without secondary CTA (only primary shown)
    - Service without hero image (icon shown instead)
    - Service without SEO overrides (defaults used)

3. **Unpublished Services**
    - Don't appear on listing page
    - Don't generate static pages
    - Return 404 if accessed directly

4. **Invalid Slug**
    - Returns 404 page
    - No errors in console
    - Breadcrumbs still work

**UI Edge Cases:**

1. **Long Content**
    - Very long service titles (truncate with ellipsis)
    - Very long descriptions (expand/collapse or scroll)
    - Many features (handle grid overflow)

2. **Missing Assets**
    - Missing service image (show fallback icon)
    - Failed image load (show error state)
    - Missing icon (show default icon)

3. **Responsive Design**
    - Mobile viewport (1 column grid)
    - Tablet viewport (2 column grid)
    - Desktop viewport (3 column grid)
    - Very large screens (max-width constraint)

4. **Accessibility**
    - Keyboard navigation works
    - Screen reader announces correctly
    - Focus indicators visible
    - ARIA labels present

**Performance Edge Cases:**

1. **Slow Network**
    - Loading states show
    - Images lazy load
    - Progressive enhancement works

2. **Large Number of Services**
    - Page remains performant (50+ services)
    - Pagination or infinite scroll (if needed)
    - Search/filter functionality (future enhancement)

3. **Build Time**
    - All services generate static pages
    - Build completes in reasonable time
    - No memory issues during build

**SEO Edge Cases:**

1. **Duplicate Content**
    - Canonical URLs prevent duplicate content
    - Each service has unique metadata

2. **Missing Metadata**
    - Falls back to defaults gracefully
    - Still generates valid metadata

3. **Invalid Structured Data**
    - Schema validation passes
    - Required fields always present

---

## Risk Assessment

### Potential Challenges

**Challenge 1: Image Asset Management**

- **Risk:** Template users may add very large images, slowing down page loads
- **Mitigation:**
    - Document image size requirements clearly
    - Add image optimization guidelines
    - Consider build-time image validation
    - Use Next.js Image component (automatic optimization)
    - Show warnings for oversized images in development

**Challenge 2: Content Quality**

- **Risk:** Users may write poor SEO content or leave fields empty
- **Mitigation:**
    - Provide content writing guidelines
    - Include examples of good vs. bad content
    - Add field length recommendations
    - Consider adding content validation
    - Provide character counters for SEO fields

**Challenge 3: Type Safety Enforcement**

- **Risk:** Users may make TypeScript errors when adding services
- **Mitigation:**
    - Excellent inline documentation
    - Clear type error messages
    - Comprehensive examples
    - Consider creating a service generator CLI tool
    - Provide VSCode snippets for service creation

**Challenge 4: Icon Selection**

- **Risk:** Users may not know which Lucide icons are available
- **Mitigation:**
    - Link to Lucide icon browser in documentation
    - Provide curated list of recommended icons by service type
    - Show icon import examples
    - Consider creating icon picker component

**Challenge 5: Build Time with Many Services**

- **Risk:** Static generation may slow down builds with 50+ services
- **Mitigation:**
    - Optimize image processing
    - Use incremental static regeneration (ISR) if needed
    - Consider dynamic rendering for large catalogs
    - Profile build performance
    - Implement pagination if necessary

**Challenge 6: SEO Duplication**

- **Risk:** Similar services may have duplicate metadata
- **Mitigation:**
    - Document unique value proposition requirements
    - Provide SEO differentiation examples
    - Add canonical URL support
    - Consider noindex for very similar services
    - Implement metadata uniqueness validation

### Mitigation Strategies

**Strategy 1: Comprehensive Documentation**

- Create step-by-step guides with screenshots
- Provide video tutorials
- Include FAQ section
- Add troubleshooting guide
- Create "Common Mistakes" section

**Strategy 2: Validation & Safeguards**

- TypeScript type checking (already in place)
- Add runtime validation for critical fields
- Image size warnings in development
- Slug uniqueness validation
- Required field completeness checks

**Strategy 3: Developer Experience**

- Clear, helpful error messages
- Inline code comments
- VSCode snippets for common patterns
- Template generator CLI (future)
- Hot reload during development

**Strategy 4: Performance Monitoring**

- Lighthouse CI integration
- Build time tracking
- Bundle size monitoring
- Image optimization checks
- Core Web Vitals tracking

**Strategy 5: Gradual Rollout**

- Start with 3-5 example services
- Test with real users
- Gather feedback
- Iterate on documentation
- Add advanced features based on needs

---

## Success Metrics

### Performance Metrics

**Page Load Performance:**

- ✅ Services listing page loads in < 2s on 3G
- ✅ Service detail page loads in < 2.5s on 3G
- ✅ First Contentful Paint < 1.8s
- ✅ Largest Contentful Paint < 2.5s
- ✅ Cumulative Layout Shift < 0.1
- ✅ Time to Interactive < 3.5s

**Lighthouse Scores:**

- ✅ Performance: 95+
- ✅ Accessibility: 100
- ✅ Best Practices: 100
- ✅ SEO: 100

**Build Performance:**

- ✅ Build time increase < 30s for 10 services
- ✅ Static pages generated successfully for all services
- ✅ No build errors or warnings

### SEO Metrics

**Technical SEO:**

- ✅ All service pages indexed by Google
- ✅ Structured data validates with no errors
- ✅ Mobile-friendly test passes
- ✅ Page speed insights: Good rating
- ✅ Sitemap includes all service pages
- ✅ Canonical URLs implemented correctly

**Metadata Quality:**

- ✅ Unique title for each service page
- ✅ Unique meta description for each service
- ✅ OpenGraph tags present and valid
- ✅ Twitter cards display correctly
- ✅ Social media previews look good

**Rich Results:**

- ✅ Service schema appears in rich results
- ✅ Breadcrumb navigation in search results
- ✅ Organization information linked correctly

### User Experience Metrics

**Usability:**

- ✅ Services easy to browse on listing page
- ✅ Clear call-to-action on each service
- ✅ Navigation intuitive and consistent
- ✅ Breadcrumbs help users understand location
- ✅ Images load smoothly with blur placeholders

**Accessibility:**

- ✅ Keyboard navigation works perfectly
- ✅ Screen readers announce content correctly
- ✅ Focus indicators clearly visible
- ✅ Color contrast meets WCAG AA standards
- ✅ ARIA labels present on interactive elements

**Responsive Design:**

- ✅ Layouts work on mobile (320px+)
- ✅ Layouts work on tablet (768px+)
- ✅ Layouts work on desktop (1024px+)
- ✅ Touch targets are appropriately sized
- ✅ No horizontal scrolling

### Developer Experience Metrics

**Ease of Use:**

- ✅ New developer can add service in < 10 minutes
- ✅ Documentation is clear and comprehensive
- ✅ Examples cover common use cases
- ✅ Type errors are helpful and actionable
- ✅ Hot reload works during development

**Code Quality:**

- ✅ TypeScript types are accurate and helpful
- ✅ Components follow established patterns
- ✅ Code is well-documented with comments
- ✅ Naming conventions are consistent
- ✅ No linting errors or warnings

**Maintainability:**

- ✅ Components are reusable and composable
- ✅ Data structure is flexible and extensible
- ✅ Adding new features is straightforward
- ✅ Refactoring is safe with TypeScript
- ✅ Test coverage is adequate (80%+)

### Business Metrics

**Conversion Goals:**

- ✅ Clear CTAs on all service pages
- ✅ Easy path to contact/conversion
- ✅ Service benefits clearly communicated
- ✅ Trust signals present (testimonials, process)

**Content Quality:**

- ✅ Service descriptions are compelling
- ✅ Features clearly articulated
- ✅ Benefits focus on customer outcomes
- ✅ Professional imagery throughout

### Measurement Tools

**Performance:**

- Lighthouse CI
- WebPageTest
- Chrome DevTools Performance tab
- Vercel Analytics

**SEO:**

- Google Search Console
- Google Rich Results Test
- Bing Webmaster Tools
- Schema.org Validator

**Accessibility:**

- axe DevTools
- WAVE Browser Extension
- VoiceOver (macOS)
- NVDA (Windows)

**User Behavior:**

- Google Analytics 4
- Microsoft Clarity
- Hotjar (optional)
- User feedback surveys

---

## References

### Next.js 15 Documentation

**Core Features:**

- [App Router](https://nextjs.org/docs/app) - Main routing documentation
- [Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes) - Dynamic segment conventions
- [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - Static generation function
- [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Metadata generation
- [Image Optimization](https://nextjs.org/docs/app/getting-started/images) - Next.js Image component
- [JSON-LD](https://nextjs.org/docs/app/guides/json-ld) - Structured data guide

**API Reference:**

- [Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Full metadata API
- [notFound()](https://nextjs.org/docs/app/api-reference/functions/not-found) - 404 handling
- [Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - Sitemap generation

### Schema.org Documentation

**Service Pages:**

- [Service Schema](https://schema.org/Service) - Main Service type
- [ItemList Schema](https://schema.org/ItemList) - For services listing
- [BreadcrumbList](https://schema.org/BreadcrumbList) - Breadcrumb navigation
- [Organization](https://schema.org/Organization) - Company information
- [WebPage](https://schema.org/WebPage) - Web page type

**Implementation Guides:**

- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Schema.org Getting Started](https://schema.org/docs/gs.html)
- [JSON-LD Playground](https://json-ld.org/playground/) - Validate structured data

### SEO Best Practices

**Content & Metadata:**

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [Moz SEO Learning Center](https://moz.com/learn/seo) - Comprehensive SEO education
- [Meta Description Best Practices](https://moz.com/learn/seo/meta-description) - Writing effective descriptions

**Technical SEO:**

- [Core Web Vitals](https://web.dev/vitals/) - Performance metrics
- [Mobile-First Indexing](https://developers.google.com/search/docs/mobile-indexing/overview)
- [Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Image SEO Best Practices](https://developers.google.com/search/docs/appearance/google-images)

### Design & Accessibility

**shadcn/ui:**

- [shadcn/ui Documentation](https://ui.shadcn.com/) - Component library
- [Installation Guide](https://ui.shadcn.com/docs/installation/next) - Next.js setup
- [Theming](https://ui.shadcn.com/docs/theming) - Customization guide
- [Components](https://ui.shadcn.com/docs/components) - Full component list

**Accessibility:**

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - ARIA patterns
- [WebAIM](https://webaim.org/) - Accessibility resources
- [A11y Project](https://www.a11y-project.com/) - Practical accessibility tips

### Performance Optimization

**Image Optimization:**

- [Next.js Image Optimization](https://nextjs.org/docs/app/getting-started/images) - Official guide
- [Sharp.js](https://sharp.pixelplumbing.com/) - Image processing library
- [WebP Image Format](https://developers.google.com/speed/webp) - Modern format
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) - MDN guide

**Performance:**

- [web.dev Performance](https://web.dev/performance/) - Google's performance guide
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/) - Audit tool
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing) - Optimization techniques

### Development Tools

**TypeScript:**

- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Official docs
- [Type vs Interface](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) - Built-in type helpers

**Testing:**

- [Vitest](https://vitest.dev/) - Testing framework
- [Testing Library](https://testing-library.com/) - Component testing
- [Next.js Testing](https://nextjs.org/docs/app/building-your-application/testing) - Testing guide

**Icons:**

- [Lucide Icons](https://lucide.dev/) - Icon library
- [Icon Browser](https://lucide.dev/icons/) - Search icons
- [React Integration](https://lucide.dev/guide/packages/lucide-react) - Usage guide

### Additional Resources

**Blogs & Tutorials:**

- [Vercel Blog](https://vercel.com/blog) - Next.js updates and best practices
- [Dev.to Next.js](https://dev.to/t/nextjs) - Community tutorials
- [CSS-Tricks](https://css-tricks.com/) - Web design techniques

**Communities:**

- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [React Discord](https://discord.gg/react) - React community
- [WebDevHub Discord](https://discord.gg/webdev) - General web dev

**Tools:**

- [Google Rich Results Test](https://search.google.com/test/rich-results) - Validate structured data
- [Schema Markup Validator](https://validator.schema.org/) - JSON-LD validator
- [WebPageTest](https://www.webpagetest.org/) - Performance testing
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Automated audits

---

## Implementation Timeline

**Total Estimated Time:** 31-40 hours

**Breakdown:**

- Phase 1: Type System & Data Structure (2-3 hours)
- Phase 2: Services Listing Page (3-4 hours) ✅ DONE
- Phase 3: Service Detail Page Structure (3-4 hours) ✅ DONE
- Phase 4: Service Detail Sections (4-5 hours) ✅ DONE
- Phase 5: Service Page UI/UX Enhancements (3-4 hours) ✅ DONE
- Phase 6: SEO & Structured Data (2-3 hours)
- Phase 7: Navigation & Integration (2-3 hours)
- Phase 8: Images & Assets (2-3 hours)
- Phase 9: Polish & Refinement (2-3 hours)
- Phase 10: Unit Testing (3-4 hours)
- Phase 11: Documentation (2-3 hours)

**Recommended Approach:**

- Days 1-2: Phases 1-3 (Foundation and basic pages)
- Days 3-4: Phases 4-5 (Rich content and SEO)
- Day 5: Phases 6-7 (Integration and assets)
- Day 6: Phase 8 (Polish and refinement)
- Day 7: Phases 9-10 (Testing and documentation)

**Milestones:**

- ✅ Day 2: Basic service pages working
- ✅ Day 4: Full feature set complete
- ✅ Day 6: Production-ready
- ✅ Day 7: Documented and tested

---

## Next Steps

1. **Review this implementation plan** with stakeholders
2. **Set up git branch:** Already on `feature/service-pages`
3. **Begin Phase 1:** Type system and data structure
4. **Follow phases sequentially** as outlined above
5. **Test after each phase** to catch issues early
6. **Document as you go** to avoid last-minute documentation rush
7. **Request code reviews** at major milestones (after phases 3, 5, 8)
8. **Create PR** after Phase 10 is complete
9. **Merge to master** after approval and testing

---

## Appendix

### File Checklist

**Types (7 files):**

- [ ] `apps/web/lib/types/services/service.type.ts`
- [ ] `apps/web/lib/types/services/service-card.type.ts`
- [ ] `apps/web/lib/types/services/service-detail.type.ts`
- [ ] `apps/web/lib/types/services/service-feature.type.ts`
- [ ] `apps/web/lib/types/services/service-benefit.type.ts`
- [ ] `apps/web/lib/types/services/service-process-step.type.ts`
- [ ] `apps/web/lib/types/services/index.ts` (exports)

**Data (2 files):**

- [ ] `apps/web/lib/data/services/services-data.ts`
- [ ] `apps/web/lib/data/services/README.md`

**Queries (2 files):**

- [ ] `apps/web/lib/queries/get-services.query.ts`
- [ ] `apps/web/lib/queries/get-service-by-slug.query.ts`

**Utilities (2 files):**

- [ ] `apps/web/utils/services/generate-service-metadata.util.ts`
- [ ] `apps/web/lib/seo/service-schema.util.ts`

**Pages (2 files):**

- [ ] `apps/web/app/services/page.tsx`
- [ ] `apps/web/app/services/[slug]/page.tsx`

**Components (6 files):**

- [ ] `apps/web/components/services/ServiceCard.component.tsx`
- [ ] `apps/web/components/services/ServiceHero.component.tsx`
- [ ] `apps/web/components/services/ServiceFeatures.component.tsx`
- [ ] `apps/web/components/services/ServiceBenefits.component.tsx`
- [ ] `apps/web/components/services/ServiceProcess.component.tsx`
- [ ] `apps/web/components/services/ServiceCTA.component.tsx`

**Tests (10 files):**

- [ ] `apps/web/lib/queries/__tests__/get-services.query.test.ts`
- [ ] `apps/web/lib/queries/__tests__/get-service-by-slug.query.test.ts`
- [ ] `apps/web/utils/services/__tests__/generate-service-metadata.util.test.ts`
- [ ] `apps/web/lib/seo/__tests__/service-schema.util.test.ts`
- [ ] `apps/web/components/services/__tests__/ServiceCard.component.test.tsx`
- [ ] `apps/web/components/services/__tests__/ServiceHero.component.test.tsx`
- [ ] `apps/web/components/services/__tests__/ServiceFeatures.component.test.tsx`
- [ ] `apps/web/components/services/__tests__/ServiceBenefits.component.test.tsx`
- [ ] `apps/web/components/services/__tests__/ServiceProcess.component.test.tsx`
- [ ] `apps/web/components/services/__tests__/ServiceCTA.component.test.tsx`

**Configuration Updates:**

- [ ] Update `apps/web/lib/data/navigation.ts` (add Services link)
- [ ] Update `apps/web/lib/data/footer.ts` (add Services section)
- [ ] Update `apps/web/app/sitemap.ts` (add service pages)

**Assets:**

- [ ] Create `apps/web/public/images/services/` directory
- [ ] Add example service images

**Total Files:** 31 new files + 3 updates = 34 file changes

---

**Plan Status:** Ready for Implementation
**Created:** 2025-10-17
**Last Updated:** 2025-10-17 (SEO Best Practices Applied)
**Created By:** Claude Code - Senior Software Architect

---

## Implementation Updates

### 2025-10-17: SEO Best Practices Applied

**Changes Made:**

- ✅ Updated `apps/web/app/services/page.tsx` to follow SEO package best practices
- ✅ Replaced manual `<script>` tags with SEO package components (`WebPageSchema`, `BreadcrumbSchema`, `JsonLd`)
- ✅ Changed metadata generation from function to const following `about/page.tsx` pattern
- ✅ Updated `apps/web/lib/seo/service-schema.util.ts` with proper TypeScript types (`WithContext<ItemList>`, `WithContext<Service>`)
- ✅ Removed deprecated `generateServiceBreadcrumbSchema` function (replaced by `BreadcrumbSchema` component)
- ✅ Installed `schema-dts` package for proper type safety
- ✅ Fixed `ServiceIcon` type references (use `heroImagePath` instead of `imagePath`)

**Pattern Now Follows:**

```tsx
// Metadata (const instead of function)
export const metadata = toNextMetadata(seoConfig, { ... })

// Schema components (instead of manual script tags)
<WebPageSchema name={...} url={...} description={...} />
<BreadcrumbSchema items={breadcrumbSchemaItems} />
<JsonLd data={customSchema} />
```

**Benefits:**

- Consistent with project SEO standards
- Better type safety with `schema-dts`
- Uses centralized SEO utilities from `@workspace/seo/react`
- Follows same pattern as `about/page.tsx`
- Easier to maintain and less error-prone
