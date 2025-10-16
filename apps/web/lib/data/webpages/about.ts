/**
 * About Page Data
 *
 * Data structures and content for the about page sections.
 * All content is centralized here for easy maintenance and localization.
 */
import { Compass, Heart, Target } from 'lucide-react'

import type {
    AboutHeroSectionProps,
    MissionSectionProps,
    StorySectionProps,
    TeamMember,
    TeamSectionProps,
} from '@/lib/types/sections'

/**
 * About Hero Section Content
 */
export const aboutHeroData: Omit<AboutHeroSectionProps, 'id'> = {
    badge: 'Our Story',
    headline: 'Pioneering Excellence Since 2010',
    description:
        "We're more than just a service provider - we're your strategic partner in growth. Founded with a vision to revolutionize the industry, our team brings together decades of combined experience, cutting-edge technology, and an unwavering commitment to your success.",
    image: {
        src: '/images/about-hero.jpg',
        alt: 'Our team collaborating in a modern workspace',
        width: 1200,
        height: 800,
        priority: true,
        aspectRatio: 'aspect-video',
    },
    enableAnimations: true,
}

/**
 * Mission, Vision, and Values Section Content
 */
export const missionData: Omit<MissionSectionProps, 'id'> = {
    items: [
        {
            icon: Target,
            title: 'Our Mission',
            description:
                'To deliver innovative solutions that drive measurable growth and lasting value for our clients, partners, and communities.',
            ariaLabel: 'Learn about our mission',
        },
        {
            icon: Compass,
            title: 'Our Vision',
            description:
                'To be the most trusted and innovative leader in our industry, recognized for excellence, integrity, and positive impact.',
            ariaLabel: 'Learn about our vision',
        },
        {
            icon: Heart,
            title: 'Our Values',
            description:
                'Excellence, Integrity, Innovation, Collaboration, and Customer-First approach guide everything we do.',
            ariaLabel: 'Learn about our values',
        },
    ],
}

/**
 * Company Story Section Content
 */
export const storyData: Omit<StorySectionProps, 'id'> = {
    badge: 'Our Journey',
    headline: 'How It All Started',
    content: `In 2010, our founders recognized a significant gap in the market. They saw businesses struggling with outdated solutions that didn't meet their evolving needs. With a passion for innovation and a commitment to excellence, they founded our company with a simple mission: to create solutions that truly make a difference.

Over the past decade, we've grown from a small startup to a trusted partner for hundreds of organizations worldwide. We've helped our clients achieve remarkable results, from reducing operational costs by up to 40% to increasing productivity and scaling their operations globally.

Our success is built on a foundation of continuous learning, customer-centric innovation, and a talented team that's passionate about solving complex problems. We've invested heavily in research and development, building cutting-edge technology that delivers real value.

Today, we're prouder than ever of what we've accomplished and the impact we've had on our clients' businesses. But we're just getting started. We're committed to pushing boundaries, embracing new technologies, and continuing to be the partner our clients can count on for their most important challenges.`,
    image: {
        src: '/images/about-story.jpg',
        alt: 'Our office and team workspace',
        width: 800,
        height: 600,
        aspectRatio: 'aspect-[4/3]',
    },
    imagePosition: 'right',
}

/**
 * Team Members Data
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
 * Team Section Props
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
    title: 'Ready to Get Started?',
    description:
        "Ready to partner with us? We'd love to discuss how we can help drive your success.",
    primaryButton: {
        text: 'Contact Us Today',
        href: '/contact',
    },
    secondaryButton: {
        text: 'Schedule a Demo',
        href: '/contact?demo=true',
    },
    variant: 'accent' as const,
}
