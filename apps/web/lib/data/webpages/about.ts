/**
 * About Page Data
 *
 * Data structures and content for the about page sections.
 * All content is centralized here for easy maintenance and localization.
 */
import {
    Briefcase,
    Code,
    Compass,
    Heart,
    Lightbulb,
    Target,
} from 'lucide-react'

import type {
    AboutHeroSectionProps,
    Feature,
    MissionSectionProps,
    TeamMember,
    TeamSectionProps,
} from '@/lib/types/sections'

/**
 * About Hero Section Content
 */
export const aboutHeroData: Omit<AboutHeroSectionProps, 'id'> = {
    badge: 'Professional Website Solutions',
    headline: 'Launch Your Business Website in Days, Not Months',
    description:
        'Your business deserves a modern, professional website that works as hard as you do. We help business owners get online fast with websites that look great, perform flawlessly, and include everything you need—from built-in analytics and SEO optimization to a full-featured blog system.',
    image: {
        src: '/images/about-hero.jpg',
        alt: 'Modern professional business website on multiple devices',
        width: 1200,
        height: 800,
        priority: true,
        aspectRatio: 'aspect-video',
    },
    enableAnimations: true,
}

/**
 * Mission, Vision, and Values Section Content
 * Now focused on benefits for business owners
 */
export const missionData: Omit<MissionSectionProps, 'id'> = {
    items: [
        {
            icon: Target,
            title: 'Fast Deployment',
            description:
                'Get your business online in days, not months. Our proven template means no starting from scratch—just customize your content, add your branding, and launch. Time is money, and we help you save both.',
            ariaLabel: 'Learn about fast website deployment',
        },
        {
            icon: Compass,
            title: 'Modern Technology',
            description:
                "Built with Next.js 15 and React 19, your website stays future-proof and lightning-fast. We handle the technical complexity so you can focus on running your business. Updates and improvements come built-in—you're never stuck with outdated tech.",
            ariaLabel: 'Learn about modern web technology',
        },
        {
            icon: Heart,
            title: 'Business-Ready Features',
            description:
                'Everything your business needs is already included: SEO optimization to help customers find you, built-in analytics to track your success, a professional blog to share your expertise, and contact forms that actually work. No extra plugins or monthly subscriptions.',
            ariaLabel: 'Learn about business website features',
        },
    ],
}

/**
 * Our Story - Stacking Scroll Effect
 * Visual narrative that relates to both business owners and developers
 */
export const ourStoryData: Feature[] = [
    {
        icon: Lightbulb,
        title: 'The Problem We Solved',
        description:
            'We were building the same website foundations repeatedly. Every client project meant recreating the blog system, analytics setup, SEO structure, and contact forms from scratch. It was time-consuming and expensive.',
        imageSrc: '/images/about-story.jpg',
        imageAlt: 'Repetitive website development process',
    },
    {
        icon: Briefcase,
        title: 'For Business Owners',
        description:
            "Get your business online in days with a professional website that includes everything: blog, analytics, SEO, contact forms. No compromise on quality, no paying for work that's been done before.",
        imageSrc: '/images/services/web-development-workspace.jpg',
        imageAlt: 'Professional business website on multiple devices',
    },
    {
        icon: Code,
        title: 'For Developers',
        description:
            'Start with production-ready code following best practices. Monorepo architecture, TypeScript everywhere, shadcn/ui components, and comprehensive documentation. Build client projects faster or learn modern web development patterns.',
        imageSrc: '/images/about-developer.jpg',
        imageAlt: 'Modern development environment with TypeScript and React',
    },
    {
        icon: Target,
        title: 'Built for Real Projects',
        description:
            "This isn't a side project—it's production-tested code we use for client work. Next.js 15, React 19, Drizzle ORM, and modern tooling that delivers fast, reliable websites. Constantly improved based on real-world feedback.",
        imageSrc: '/images/services/seo-optimization.jpg',
        imageAlt: 'Production website with analytics and performance metrics',
    },
]

/**
 * Team Members Data (preserved for future use)
 */
export const teamMembers: TeamMember[] = [
    {
        name: 'Sarah Johnson',
        role: 'Chief Executive Officer',
        bio: 'Visionary leader with 15+ years of industry experience and a passion for innovation.',
        avatar: '/images/team/sarah-johnson.jpg',
        social: {
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
        },
    },
    {
        name: 'Michael Chen',
        role: 'Chief Technology Officer',
        bio: 'Tech innovator and architect with expertise in scalable systems and AI integration.',
        avatar: '/images/team/michael-chen.jpg',
        social: {
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
        },
    },
    {
        name: 'Emily Rodriguez',
        role: 'Chief Operating Officer',
        bio: 'Operations expert focused on efficiency, quality, and sustainable growth.',
        avatar: '/images/team/emily-rodriguez.jpg',
        social: {
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
        },
    },
    {
        name: 'David Kim',
        role: 'Head of Product',
        bio: 'Product visionary committed to building solutions that solve real customer problems.',
        avatar: '/images/team/david-kim.jpg',
        social: {
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
        },
    },
    {
        name: 'Jessica Williams',
        role: 'Head of Customer Success',
        bio: 'Customer advocate ensuring every client gets maximum value from our solutions.',
        avatar: '/images/team/jessica-williams.jpg',
        social: {
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
        },
    },
    {
        name: 'Alex Martinez',
        role: 'Lead Designer',
        bio: 'Design thinker creating beautiful, intuitive experiences that users love.',
        avatar: '/images/team/alex-martinez.jpg',
        social: {
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
        },
    },
]

/**
 * Team Section Props (preserved for future use)
 */
export const teamSectionData: Omit<TeamSectionProps, 'id'> = {
    badge: 'Meet the Team',
    headline: 'Talented People Driving Innovation',
    description:
        'Our diverse team of experts brings unique perspectives and deep expertise across technology, business, and customer success.',
    members: teamMembers,
}

/**
 * Final CTA Section Content (for end of about page)
 */
export const aboutCTAData = {
    title: 'Ready to Launch Your Website?',
    description:
        "Let's get your business online with a professional website that performs. Reach out today and we'll show you how fast we can get you up and running.",
    primaryButton: {
        text: 'Start Your Project',
        href: '/contact',
    },
    secondaryButton: {
        text: 'View Features',
        href: '/#features',
    },
    variant: 'accent' as const,
}
