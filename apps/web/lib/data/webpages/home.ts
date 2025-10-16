/**
 * Home Page Data
 *
 * Data structures and content for the home page sections.
 * All content is centralized here for easy maintenance and localization.
 */
import {
    ArrowRight,
    Award,
    Clock,
    Globe,
    Phone,
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
    subheadline: 'Your Trusted Partner',
    headline: 'Building the Future Together',
    description:
        'We deliver innovative solutions that drive growth and success. Our team of experts is dedicated to transforming your vision into reality with cutting-edge technology and exceptional service.',
    primaryButton: {
        text: 'Get Started',
        href: '/contact',
        variant: 'default',
        icon: ArrowRight,
        iconPosition: 'right',
        ariaLabel: 'Get started with our services',
    },
    secondaryButton: {
        text: 'Call Us Now',
        href: 'tel:+1234567890',
        variant: 'outline',
        icon: Phone,
        iconPosition: 'left',
        ariaLabel: 'Call us at +1 (234) 567-890',
    },
    image: {
        src: '/images/hero.jpg',
        alt: 'Modern office workspace with collaborative team',
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
 * Features/Services Section Content
 */
export const featuresData: Feature[] = [
    {
        icon: Zap,
        title: 'Fast & Reliable',
        description:
            'Lightning-fast performance and 99.9% uptime guarantee. We ensure your business never skips a beat.',
        ariaLabel: 'Learn more about our fast and reliable service',
    },
    {
        icon: Shield,
        title: 'Secure & Protected',
        description:
            'Enterprise-grade security with end-to-end encryption. Your data is always safe and protected.',
        ariaLabel: 'Learn more about our security measures',
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
        ariaLabel: 'Learn more about our results-driven approach',
    },
    {
        icon: Globe,
        title: 'Global Reach',
        description:
            'Serving clients worldwide with local expertise. Expand your business across borders seamlessly.',
        ariaLabel: 'Learn more about our global reach',
    },
    {
        icon: Award,
        title: 'Award-Winning',
        description:
            'Recognized for excellence and innovation. Our track record speaks for itself.',
        ariaLabel: 'Learn more about our awards and recognition',
    },
]

/**
 * About Preview Section Content
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
        quote: 'Working with this team has been transformative for our business. Their expertise and dedication helped us achieve results we never thought possible. Highly recommended!',
        name: 'Sarah Johnson',
        role: 'CEO',
        company: 'TechCorp Solutions',
        rating: 5,
        avatar: '/images/testimonials/sarah-johnson.jpg',
    },
    {
        quote: 'The level of professionalism and attention to detail is outstanding. They truly understand our needs and consistently deliver beyond expectations. A game-changer for our organization.',
        name: 'Michael Chen',
        role: 'Director of Operations',
        company: 'Global Innovations Ltd',
        rating: 5,
        avatar: '/images/testimonials/michael-chen.jpg',
    },
    {
        quote: "From start to finish, the experience was seamless. The team's expertise and responsiveness made the entire process smooth and stress-free. We couldn't be happier with the results.",
        name: 'Emily Rodriguez',
        role: 'Marketing Manager',
        company: 'Creative Ventures',
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
    title: 'Ready to Get Started?',
    description:
        "Join thousands of satisfied customers who have transformed their business with our solutions. Let's build something amazing together.",
    primaryButton: {
        text: 'Contact Us Today',
        href: '/contact',
    },
    secondaryButton: {
        text: 'View Our Work',
        href: '/portfolio',
    },
    variant: 'accent' as const,
}
