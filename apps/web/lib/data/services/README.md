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

#### Basic Information

- **`slug`**: URL-friendly identifier (e.g., `'web-development'`)
    - Must be unique across all services
    - Use kebab-case format
    - No spaces or special characters

- **`title`**: Service name (e.g., `'Web Development'`)

- **`excerpt`**: Short description (120-160 characters recommended for SEO)
    - Used in service cards
    - Used as meta description (if custom SEO description not provided)

- **`description`**: Full description for detail page
    - Can be multiple sentences or paragraphs
    - Explains the service in detail

#### Categorization

- **`category`**: Service category type
    - Options: `'consulting'`, `'development'`, `'design'`, `'marketing'`, `'support'`, `'other'`

- **`categoryLabel`**: Display name for category (e.g., `'Development'`)

#### Visual Representation

- **`iconConfig`**: Icon and image configuration
    - **Type 1 - Icon only**:
        ```typescript
        iconConfig: {
            type: 'icon',
            icon: Code  // Lucide React icon
        }
        ```
    - **Type 2 - Image only**:
        ```typescript
        iconConfig: {
            type: 'image',
            imagePath: '/images/services/web-dev.jpg',
            imageAlt: 'Web development workspace'  // Required for accessibility
        }
        ```
    - **Type 3 - Both**:
        ```typescript
        iconConfig: {
            type: 'both',
            icon: Code,  // Used on listing cards
            imagePath: '/images/services/web-dev.jpg',  // Used on detail page
            imageAlt: 'Web development workspace'
        }
        ```

#### Features and Benefits

- **`features`**: Array of service features (minimum 3 recommended)

    ```typescript
    features: [
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Optimized performance with sub-second load times',
            ariaLabel: 'Learn about our fast development', // Optional
        },
    ]
    ```

- **`benefits`**: Array of business benefits (minimum 3, maximum 6 recommended)
    ```typescript
    benefits: [
        {
            icon: BarChart,
            title: 'Increased Conversions',
            description:
                'Our optimized UX increases conversion rates by up to 40%',
        },
    ]
    ```

#### Call-to-Action

- **`cta`**: Call-to-action configuration
    ```typescript
    cta: {
        heading: 'Ready to Start Your Project?',
        description: 'Let\'s discuss how we can help.',
        primaryButton: {
            text: 'Get a Free Quote',
            href: '/contact'
        },
        secondaryButton: {  // Optional
            text: 'View Our Work',
            href: '/portfolio'
        }
    }
    ```

#### SEO Configuration

- **`seo`**: SEO metadata object
    ```typescript
    seo: {
        title: 'Web Development Services | Custom Applications',  // Optional
        description: 'Professional web development...',  // Optional
        keywords: ['web development', 'react', 'next.js'],  // Optional
        ogImage: '/images/services/og-web-dev.jpg'  // Optional
    }
    ```

### Optional Fields

- **`process`**: Step-by-step process (4-6 steps recommended)

    ```typescript
    process: [
        {
            step: 1,
            title: 'Discovery & Planning',
            description: 'We analyze your requirements...',
            icon: Target, // Optional
        },
    ]
    ```

- **`images`**: Additional images for detail page

    ```typescript
    gallery: [
        {
            url: '/images/services/additional-1.jpg',
            alt: 'Image description',
            caption: 'Optional caption',
        },
    ]
    ```

- **`order`**: Display order (lower = first, default: 0)

    ```typescript
    order: 1 // This service appears first
    ```

- **`isPublished`**: Whether service is visible (default: true)
    ```typescript
    isPublished: true // Service is live
    isPublished: false // Service is hidden (useful for drafts)
    ```

## Icon Options

You can use icons from [Lucide React](https://lucide.dev/icons/). Popular choices:

- `Code` - Development services
- `Palette` - Design services
- `BarChart` - Analytics/consulting
- `Shield` - Security services
- `Globe` - Global/international services
- `Smartphone` - Mobile services
- `Zap` - Fast/performance services
- `TrendingUp` - Growth/marketing services
- `Target` - Strategy/planning
- `Users` - Collaboration/team services

### How to Import Icons

Add icons at the top of `services-data.ts`:

```typescript
import { Code, Palette, Shield, Zap } from 'lucide-react'
```

Browse all available icons at: [lucide.dev/icons](https://lucide.dev/icons/)

## Image Guidelines

### Service Images

**Location**: `/public/images/services/`

**Recommended Specifications**:

- **Hero Images**: 1200x800px (3:2 aspect ratio)
- **Icon Images**: 600x600px (1:1 aspect ratio)
- **Format**: JPG or PNG (WebP preferred for smaller file sizes)
- **Size**: < 200KB per image (optimized)
- **Quality**: High quality, professional

### Naming Convention

Use the service slug for image names:

```
/public/images/services/
├── web-development.jpg
├── ui-ux-design.jpg
├── digital-marketing.jpg
└── mobile-app-development.jpg
```

### Alt Text Best Practices

- Describe what's in the image
- Be specific and concise
- Include relevant keywords naturally
- Don't start with "image of" or "picture of"

**Examples**:

- ✅ Good: `"Modern web development workspace with code on screens"`
- ✅ Good: `"UI/UX designer sketching mobile app wireframes"`
- ❌ Bad: `"Image"` or `"Service image"`

## SEO Best Practices

### Title

- Keep under 60 characters
- Include primary keyword
- Make it compelling and descriptive
- Format: `"Service Name | Value Proposition"`

**Examples**:

- `"Web Development Services | Custom Web Applications"`
- `"UI/UX Design | User Experience That Converts"`

### Description (excerpt)

- 120-160 characters for optimal search snippet length
- Include primary keyword naturally
- Describe the service benefit, not just features
- End with a soft call-to-action

**Examples**:

- `"Build fast, scalable, and secure web applications with modern technologies and best practices."`
- `"Create beautiful, intuitive user experiences that delight your customers and drive engagement."`

### Keywords

- Include 3-5 relevant keywords
- Use long-tail keywords (2-4 words)
- Match user search intent
- Don't keyword stuff

**Examples**:

```typescript
keywords: [
    'web development',
    'custom web applications',
    'react development',
    'next.js development',
]
```

## Examples

See `services-data.ts` for complete examples of:

- **Technical Services**: Web development, mobile apps
- **Creative Services**: UI/UX design, branding
- **Marketing Services**: Digital marketing, SEO
- **Consulting Services**: Strategy, analytics
- **Support Services**: Maintenance, hosting

## Troubleshooting

### Service Not Appearing?

**Check these common issues**:

1. **Published Status**
    - Ensure `isPublished` is `true` or omitted (defaults to true)

2. **Unique Slug**
    - Verify the slug is unique across all services

3. **TypeScript Errors**
    - Run `cd apps/web && pnpm typecheck` to check for errors

4. **Development Server**
    - Restart dev server: `pnpm dev`

### Image Not Loading?

**Common fixes**:

1. **File Location**
    - Verify image exists in `/public/images/services/`
    - Path must start with `/images/services/` (not `/public/`)

2. **File Name**
    - Check file name matches exactly (case-sensitive)
    - Use kebab-case: `web-development.jpg` not `Web Development.jpg`

3. **File Format**
    - Use JPG, PNG, or WebP format
    - Avoid special characters in filename

### TypeScript Errors?

**Common issues**:

1. **Missing Required Fields**
    - All required fields must be present
    - Check the structure matches examples

2. **Icon Import**
    - Icon must be imported from `'lucide-react'`

    ```typescript
    import { YourIcon } from 'lucide-react'
    ```

3. **Array Fields**
    - Arrays must have at least one item
    - Each item must have all required fields

4. **Syntax Errors**
    - Check for missing commas between fields
    - Ensure proper quote matching

## Advanced Customization

### Adding New Categories

To add a new service category:

1. **Update the type** in `apps/web/lib/types/services/service-category.type.ts`:

    ```typescript
    export type ServiceCategory =
        | 'consulting'
        | 'development'
        | 'your-new-category' // Add here
    ```

2. **Use in service data**:
    ```typescript
    {
        category: 'your-new-category',
        categoryLabel: 'Your New Category',
        // ... rest of service
    }
    ```

### Hiding Services Temporarily

To temporarily hide a service without deleting it:

```typescript
{
    slug: 'service-slug',
    // ... all other fields
    isPublished: false  // Service won't appear on website
}
```

### Controlling Display Order

Services appear in order from lowest to highest `order` value:

```typescript
// This service appears first
{ slug: 'featured-service', order: 1, ... }

// This service appears second
{ slug: 'another-service', order: 2, ... }

// Services without order default to 0 (appear first)
{ slug: 'default-order', ... }
```

## Need Help?

- **Documentation**: Review this README and examples in `services-data.ts`
- **Type Definitions**: Check `apps/web/lib/types/services/` for detailed type documentation
- **Examples**: Look at existing services in `services-data.ts`
- **Icons**: Browse [Lucide Icons](https://lucide.dev/icons/)
- **Next.js Docs**: [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
