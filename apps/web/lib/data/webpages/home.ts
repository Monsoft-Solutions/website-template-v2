/**
 * Home Page Data
 *
 * Data structures and content for the home page sections.
 * All content is centralized here for easy maintenance and localization.
 */
import {
    ArrowRight,
    Blocks,
    Eye,
    LineChart,
    Palette,
    Search,
    Shield,
    Zap,
} from 'lucide-react'

import type {
    AboutPreviewSectionProps,
    Feature,
    HeroSectionProps,
    Testimonial,
} from '@/lib/types/sections'

/**
 * Hero Section Content
 */
export const heroSectionData: Omit<HeroSectionProps, 'id'> = {
    subheadline: 'Next.js 15 • React 19 • TypeScript',
    headline: 'The foundation for production websites.',
    description:
        'Production-ready code with Next.js 15 and React 19. Built-in blog, analytics, SEO, and shadcn/ui components. Type-safe from database to UI.',
    primaryButton: {
        text: 'Start building',
        href: '#key-features',
        variant: 'default',
        icon: ArrowRight,
        iconPosition: 'right',
        ariaLabel: 'Start building with Keel template',
    },
    secondaryButton: {
        text: 'View Examples',
        href: '/about',
        variant: 'outline',
        icon: Eye,
        iconPosition: 'left',
        ariaLabel: 'View example pages and features',
    },
    image: {
        src: '/images/hero.jpg',
        alt: 'Modern website template showcase with Next.js and React',
        width: 1200,
        height: 800,
        priority: true,
        aspectRatio: 'aspect-[3/2]',
    },
    imagePosition: 'right',
    variant: 'default',
    enableAnimations: true,
}

/**
 * Key Features Section Content
 *
 * Highlights template capabilities and features
 */
export const keyFeaturesData: Feature[] = [
    {
        icon: Zap,
        title: 'Fast Development',
        description:
            'Pre-built components and layouts. Start building immediately. No boilerplate setup.',
        ariaLabel: 'Learn more about fast development features',
        imageSrc: '/images/services/web-development-workspace.jpg',
        imageAlt: 'Modern development workspace with code editor and tools',
    },
    {
        icon: Blocks,
        title: 'Complete Blog System',
        description:
            'Full-featured blog with PostgreSQL, categories, tags, and markdown. Vercel Blob image storage. Production-ready.',
        ariaLabel: 'Learn more about the blog system',
        imageSrc: '/images/services/web-development-success.jpg',
        imageAlt: 'Successful blog implementation with content management',
    },
    {
        icon: Shield,
        title: 'Type-Safe Code',
        description:
            '100% TypeScript with strict typing. Zod validation and error handling. Built for maintainability.',
        ariaLabel: 'Learn more about code quality',
        imageSrc: '/images/services/web-development-code-quality.jpg',
        imageAlt: 'High-quality TypeScript code on screen',
    },
    {
        icon: LineChart,
        title: 'Analytics Built-In',
        description:
            'Google Analytics, Clarity, GTM, and Facebook Pixel. Type-safe event tracking hooks. Pre-integrated.',
        ariaLabel: 'Learn more about analytics integration',
        imageSrc: '/images/services/digital-marketing/analytics-reporting.jpg',
        imageAlt: 'Analytics dashboard showing user metrics and reports',
    },
    {
        icon: Search,
        title: 'SEO Optimized',
        description:
            'Metadata generation, schema.org data, dynamic sitemaps, and Open Graph tags. SEO package included.',
        ariaLabel: 'Learn more about SEO optimization',
        imageSrc: '/images/services/digital-marketing/seo-optimization.jpg',
        imageAlt: 'SEO optimization tools and search rankings',
    },
    {
        icon: Palette,
        title: 'Beautiful UI Components',
        description:
            '13+ shadcn/ui components with Tailwind CSS 4. Dark mode support. Notion-inspired design.',
        ariaLabel: 'Learn more about UI components',
        imageSrc: '/images/services/web-development-ui-design.jpg',
        imageAlt: 'Beautiful UI component design with modern aesthetics',
    },
]

/**
 * Features/Services Section Content (Legacy - REMOVED)
 *
 * This legacy section contained prohibited brand voice terms and has been removed.
 * Use keyFeaturesData instead for brand-compliant feature content.
 */

/**
 * Tech Stack Section Content
 */
export const techStackData: Omit<AboutPreviewSectionProps, 'id'> = {
    badge: 'Modern Technology Stack',
    title: 'Built with tools developers trust',
    description:
        'Next.js 15 with React Server Components. TypeScript 5.7 for type safety. Drizzle ORM for databases. Turborepo for fast monorepo builds. Every tool selected for production reliability.',
    imageSrc: '/images/about-preview.jpg',
    imageAlt:
        'Technology stack: Next.js, React, TypeScript, Tailwind, PostgreSQL',
    imageWidth: 800,
    imageHeight: 800,
    buttonText: 'View Full Tech Stack',
    buttonHref: '/blog',
    imagePosition: 'left',
    variant: 'muted',
}

/**
 * About Preview Section Content (Legacy - REMOVED)
 *
 * This legacy section contained prohibited brand voice terms ("Pioneering Excellence",
 * "revolutionize", "cutting-edge", "unwavering commitment") and has been removed.
 * Use techStackData instead for brand-compliant about preview content.
 */

/**
 * Testimonials Section Content
 */
export const testimonialsData: Testimonial[] = [
    {
        quote: 'This template saved us weeks of setup time. The code quality is exceptional, and the built-in blog system was exactly what we needed. We shipped three client sites in the first month.',
        name: 'Alex Thompson',
        role: 'Founder',
        company: 'DevStudio Agency',
        rating: 5,
        avatar: '/images/testimonials/sarah-johnson.jpg',
    },
    {
        quote: "Finally, a template that doesn't cut corners. TypeScript everywhere, proper error handling, and the SEO package alone is worth it. Perfect for professional projects.",
        name: 'Maria Garcia',
        role: 'Senior Developer',
        company: 'TechCraft Solutions',
        rating: 5,
        avatar: '/images/testimonials/michael-chen.jpg',
    },
    {
        quote: 'As a small business owner with limited dev experience, I was able to customize this template and launch my website in two days. The documentation made it easy.',
        name: 'James Liu',
        role: 'Owner',
        company: 'Local Services Co',
        rating: 5,
        avatar: '/images/testimonials/emily-rodriguez.jpg',
    },
]

/**
 * Additional Features for Extended Layout (Legacy - REMOVED)
 *
 * This legacy section contained prohibited brand voice terms ("Cutting-Edge Technology")
 * and generic marketing claims. Has been removed for brand compliance.
 */

/**
 * Final CTA Section Content (for end of home page)
 */
export const finalCTAData = {
    title: 'Ready to build your website?',
    description:
        'Start with production-ready code. Full documentation included. Build your first site this week.',
    primaryButton: {
        text: 'Start building',
        href: '/contact',
    },
    secondaryButton: {
        text: 'View Documentation',
        href: 'https://github.com/Monsoft-Solutions/website-template-v2',
    },
    variant: 'accent' as const,
}
