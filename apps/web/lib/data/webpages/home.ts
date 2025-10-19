/**
 * Home Page Data
 *
 * Data structures and content for the home page sections.
 * All content is centralized here for easy maintenance and localization.
 */
import {
    ArrowRight,
    Award,
    Blocks,
    Clock,
    Eye,
    Globe,
    LineChart,
    Palette,
    Search,
    Shield,
    Target,
    Users,
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
    headline: 'Ship Professional Websites in Hours, Not Weeks',
    description:
        'Production-ready website template with everything you need: built-in blog, analytics, SEO optimization, shadcn/ui components, and full TypeScript support. Perfect for developers and agencies.',
    primaryButton: {
        text: 'View Documentation',
        href: '#key-features',
        variant: 'default',
        icon: ArrowRight,
        iconPosition: 'right',
        ariaLabel: 'View template documentation and features',
    },
    secondaryButton: {
        text: 'See Demo',
        href: '/about',
        variant: 'outline',
        icon: Eye,
        iconPosition: 'left',
        ariaLabel: 'See template demo pages',
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
        title: 'Lightning Fast Development',
        description:
            'Start building immediately with pre-built components, layouts, and sections. No boilerplate setup—just customize and deploy.',
        ariaLabel: 'Learn more about fast development features',
        imageSrc: '/images/services/web-development-workspace.jpg',
        imageAlt: 'Modern development workspace with code editor and tools',
    },
    {
        icon: Blocks,
        title: 'Complete Blog System',
        description:
            'Full-featured blog with PostgreSQL, categories, tags, markdown support, and Vercel Blob image storage. Production-ready out of the box.',
        ariaLabel: 'Learn more about the blog system',
        imageSrc: '/images/services/web-development-success.jpg',
        imageAlt: 'Successful blog implementation with content management',
    },
    {
        icon: Shield,
        title: 'Enterprise-Grade Code',
        description:
            '100% TypeScript with strict typing, Zod validation, error handling, and comprehensive naming conventions. Built for maintainability.',
        ariaLabel: 'Learn more about code quality',
        imageSrc: '/images/services/web-development-code-quality.jpg',
        imageAlt: 'High-quality TypeScript code on screen',
    },
    {
        icon: LineChart,
        title: 'Analytics Built-In',
        description:
            'Pre-integrated Google Analytics, Microsoft Clarity, GTM, and Facebook Pixel with type-safe event tracking hooks.',
        ariaLabel: 'Learn more about analytics integration',
        imageSrc: '/images/services/digital-marketing/analytics-reporting.jpg',
        imageAlt: 'Analytics dashboard showing user metrics and reports',
    },
    {
        icon: Search,
        title: 'SEO Optimized',
        description:
            'Dedicated SEO package with metadata generation, schema.org structured data, dynamic sitemaps, and Open Graph tags.',
        ariaLabel: 'Learn more about SEO optimization',
        imageSrc: '/images/services/digital-marketing/seo-optimization.jpg',
        imageAlt: 'SEO optimization tools and search rankings',
    },
    {
        icon: Palette,
        title: 'Beautiful UI Components',
        description:
            '13+ shadcn/ui components with Tailwind CSS 4. Dark mode support, responsive design, and Notion-inspired aesthetics.',
        ariaLabel: 'Learn more about UI components',
        imageSrc: '/images/services/web-development-ui-design.jpg',
        imageAlt: 'Beautiful UI component design with modern aesthetics',
    },
]

/**
 * Features/Services Section Content (Legacy - kept for reference)
 *
 * Features with links to relevant service pages
 */
export const featuresData: Feature[] = [
    {
        icon: Zap,
        title: 'Fast & Reliable',
        description:
            'Lightning-fast performance and 99.9% uptime guarantee. We ensure your business never skips a beat.',
        href: '/services/web-development',
        ariaLabel: 'Learn more about our web development services',
    },
    {
        icon: Shield,
        title: 'Secure & Protected',
        description:
            'Enterprise-grade security with end-to-end encryption. Your data is always safe and protected.',
        href: '/services/web-development',
        ariaLabel: 'Learn more about our secure web development',
    },
    {
        icon: Users,
        title: 'Expert Support',
        description:
            '24/7 dedicated support team ready to help. Get answers from real experts, not bots.',
        ariaLabel: 'Learn more about our expert support team',
    },
    {
        icon: Target,
        title: 'Results-Driven',
        description:
            'Proven strategies that deliver measurable results. We focus on what matters most to your business.',
        href: '/services/digital-marketing',
        ariaLabel: 'Learn more about our digital marketing services',
    },
    {
        icon: Globe,
        title: 'Global Reach',
        description:
            'Serving clients worldwide with local expertise. Expand your business across borders seamlessly.',
        href: '/services/digital-marketing',
        ariaLabel: 'Learn more about our global marketing reach',
    },
    {
        icon: Award,
        title: 'Award-Winning',
        description:
            'Recognized for excellence and innovation. Our track record speaks for itself.',
        href: '/services/ui-ux-design',
        ariaLabel: 'Learn more about our award-winning design services',
    },
]

/**
 * Tech Stack Section Content
 */
export const techStackData: Omit<AboutPreviewSectionProps, 'id'> = {
    badge: 'Modern Technology Stack',
    title: 'Built With The Best Tools Developers Love',
    description:
        'We chose proven, cutting-edge technologies that developers trust. Next.js 15 with React Server Components, TypeScript 5.7 for type safety, Drizzle ORM for database management, and Turborepo for blazing-fast monorepo builds. Every tool was selected for production reliability and developer experience.',
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
 * About Preview Section Content (Legacy - kept for reference)
 */
export const aboutPreviewData: Omit<AboutPreviewSectionProps, 'id'> = {
    badge: 'About Us',
    title: 'Pioneering Excellence Since 2010',
    description:
        "We're more than just a service provider - we're your strategic partner in growth. Founded with a vision to revolutionize the industry, our team brings together decades of combined experience, cutting-edge technology, and an unwavering commitment to your success. Every project we undertake is driven by innovation, integrity, and a passion for delivering exceptional results.",
    imageSrc: '/images/about-preview.jpg',
    imageAlt: 'Our team collaborating in a modern workspace',
    imageWidth: 800,
    imageHeight: 800,
    buttonText: 'Learn Our Story',
    buttonHref: '/about',
    imagePosition: 'left',
    variant: 'muted',
}

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
 * Additional Features for Extended Layout (Optional)
 */
export const extendedFeaturesData: Feature[] = [
    {
        icon: Clock,
        title: 'Time-Saving Solutions',
        description:
            'Automate repetitive tasks and focus on what really matters. Increase productivity by up to 40%.',
    },
    {
        icon: Zap,
        title: 'Cutting-Edge Technology',
        description:
            "Stay ahead with the latest innovations. We continuously evolve to meet tomorrow's challenges.",
    },
]

/**
 * Final CTA Section Content (for end of home page)
 */
export const finalCTAData = {
    title: 'Ready to Build Your Website?',
    description:
        'Join developers and agencies using this template to ship professional websites faster. Get started in minutes with comprehensive documentation and support.',
    primaryButton: {
        text: 'Get Started Now',
        href: '/contact',
    },
    secondaryButton: {
        text: 'View on GitHub',
        href: 'https://github.com/your-repo',
    },
    variant: 'accent' as const,
}
