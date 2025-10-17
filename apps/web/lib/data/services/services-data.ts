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
    Sparkles,
    Target,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react'

import type { Service } from '@/lib/types/services'

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
            type: 'both',
            icon: Code,
            imagePath: '/images/services/web-development.jpg',
            imageAlt: 'Modern web development workspace with code on screens',
        },
        features: [
            {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized performance with sub-second load times',
                ariaLabel: 'Learn about our fast web development approach',
            },
            {
                icon: Shield,
                title: 'Secure & Reliable',
                description:
                    'Enterprise-grade security and 99.9% uptime guarantee',
                ariaLabel: 'Learn about our secure web development practices',
            },
            {
                icon: Smartphone,
                title: 'Mobile-First',
                description:
                    'Responsive design that works perfectly on all devices',
                ariaLabel: 'Learn about our mobile-first development approach',
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
                    'Scalable infrastructure that grows with your business worldwide',
            },
            {
                icon: Code,
                title: 'Clean Codebase',
                description:
                    'Maintainable, well-documented code that makes future updates easy',
            },
        ],
        process: [
            {
                step: 1,
                title: 'Discovery & Planning',
                description:
                    'We analyze your requirements and create a detailed project roadmap',
                icon: Target,
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
        isPublished: true,
    },
    {
        slug: 'ui-ux-design',
        title: 'UI/UX Design',
        excerpt:
            'Create beautiful, intuitive user experiences that delight your customers and drive engagement.',
        description:
            'Our UI/UX design services focus on creating exceptional user experiences that combine beautiful aesthetics with intuitive functionality. We use data-driven design methodologies and user research to craft interfaces that not only look stunning but also drive conversions and user satisfaction.',
        category: 'design',
        categoryLabel: 'Design',
        iconConfig: {
            type: 'both',
            icon: Palette,
            imagePath: '/images/services/ui-ux-design.jpg',
            imageAlt:
                'UI/UX design workspace with sketches and digital mockups',
        },
        features: [
            {
                icon: Sparkles,
                title: 'Beautiful Interfaces',
                description:
                    'Stunning visual designs that align with your brand identity',
                ariaLabel: 'Learn about our beautiful interface designs',
            },
            {
                icon: Users,
                title: 'User-Centered',
                description:
                    'Research-driven designs focused on user needs and behaviors',
                ariaLabel: 'Learn about our user-centered design approach',
            },
            {
                icon: Smartphone,
                title: 'Responsive Design',
                description:
                    'Seamless experiences across all devices and screen sizes',
                ariaLabel: 'Learn about our responsive design capabilities',
            },
        ],
        benefits: [
            {
                icon: TrendingUp,
                title: 'Higher Engagement',
                description:
                    'Intuitive designs that keep users engaged and coming back',
            },
            {
                icon: BarChart,
                title: 'Better Conversions',
                description:
                    'Strategic design that guides users toward your business goals',
            },
            {
                icon: Sparkles,
                title: 'Brand Differentiation',
                description:
                    'Stand out from competitors with unique, memorable design',
            },
        ],
        process: [
            {
                step: 1,
                title: 'Research & Discovery',
                description:
                    'Understanding your users, competitors, and market landscape',
                icon: Target,
            },
            {
                step: 2,
                title: 'Wireframing & Prototyping',
                description:
                    'Creating low and high-fidelity prototypes for validation',
                icon: Palette,
            },
            {
                step: 3,
                title: 'Visual Design',
                description:
                    'Crafting beautiful interfaces with your brand identity',
                icon: Sparkles,
            },
            {
                step: 4,
                title: 'Testing & Iteration',
                description:
                    'User testing and refinement based on real feedback',
                icon: Users,
            },
        ],
        cta: {
            heading: 'Transform Your User Experience',
            description:
                'Let us help you create a design that your users will love and that drives real business results.',
            primaryButton: {
                text: 'Schedule Consultation',
                href: '/contact',
            },
            secondaryButton: {
                text: 'See Our Designs',
                href: '/portfolio',
            },
        },
        seo: {
            title: 'UI/UX Design Services | User Experience Design',
            description:
                'Professional UI/UX design services that create beautiful, intuitive experiences. Research-driven design that drives engagement and conversions.',
            keywords: [
                'ui design',
                'ux design',
                'user experience',
                'interface design',
                'user research',
                'design systems',
            ],
        },
        order: 2,
        isPublished: true,
    },
    {
        slug: 'digital-marketing',
        title: 'Digital Marketing',
        excerpt:
            'Grow your business with data-driven digital marketing strategies that deliver measurable results.',
        description:
            'Our digital marketing services help businesses reach their target audience and achieve their growth goals. We combine creativity with data-driven strategies to create campaigns that deliver real, measurable results across all digital channels.',
        category: 'marketing',
        categoryLabel: 'Marketing',
        iconConfig: {
            type: 'icon',
            icon: TrendingUp,
        },
        features: [
            {
                icon: Target,
                title: 'Targeted Campaigns',
                description:
                    'Reach the right audience at the right time with precision targeting',
                ariaLabel: 'Learn about our targeted marketing campaigns',
            },
            {
                icon: BarChart,
                title: 'Data-Driven',
                description:
                    'Make informed decisions based on comprehensive analytics',
                ariaLabel: 'Learn about our data-driven approach',
            },
            {
                icon: TrendingUp,
                title: 'Proven Results',
                description: 'Track and optimize campaigns for maximum ROI',
                ariaLabel: 'Learn about our proven marketing results',
            },
        ],
        benefits: [
            {
                icon: Users,
                title: 'Increased Reach',
                description:
                    'Expand your audience and connect with potential customers',
            },
            {
                icon: BarChart,
                title: 'Better ROI',
                description:
                    'Get more value from your marketing budget with optimized campaigns',
            },
            {
                icon: Globe,
                title: 'Brand Awareness',
                description:
                    'Build recognition and trust with consistent messaging',
            },
        ],
        cta: {
            heading: 'Ready to Grow Your Business?',
            description:
                'Partner with us to create digital marketing campaigns that drive real results.',
            primaryButton: {
                text: 'Get Started',
                href: '/contact',
            },
        },
        seo: {
            title: 'Digital Marketing Services | Performance Marketing',
            description:
                'Data-driven digital marketing services that deliver measurable results. SEO, PPC, social media, and content marketing expertise.',
            keywords: [
                'digital marketing',
                'performance marketing',
                'SEO services',
                'PPC advertising',
                'social media marketing',
                'content marketing',
            ],
        },
        order: 3,
        isPublished: true,
    },
]
