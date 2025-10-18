/**
 * Digital Marketing Service Data
 *
 * Complete service definition for digital marketing offerings.
 */

import type { Service } from '@/lib/types/services'

export const digitalMarketingService: Service = {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    excerpt:
        'Grow your business with data-driven digital marketing strategies that deliver measurable results.',
    description:
        'Our digital marketing services help businesses reach their target audience and achieve their growth goals. We combine creativity with data-driven strategies to create campaigns that deliver real, measurable results across all digital channels.',
    category: 'marketing',
    categoryLabel: 'Marketing',
    iconConfig: {
        cardIconPath: '/images/services/icons/trending-up-icon.svg',
        heroImagePath: '/images/services/digital-marketing-hero.jpg',
        imageAlt:
            'Professional digital marketing team collaborating with analytics dashboards',
    },
    features: [
        {
            iconPath: '/images/services/icons/target-icon.svg',
            title: 'Targeted Campaigns',
            description:
                'Reach the right audience at the right time with precision targeting',
            ariaLabel: 'Learn about our targeted marketing campaigns',
        },
        {
            iconPath: '/images/services/icons/chart-icon.svg',
            title: 'Data-Driven',
            description:
                'Make informed decisions based on comprehensive analytics',
            ariaLabel: 'Learn about our data-driven approach',
        },
        {
            iconPath: '/images/services/icons/trending-up-icon.svg',
            title: 'Proven Results',
            description: 'Track and optimize campaigns for maximum ROI',
            ariaLabel: 'Learn about our proven marketing results',
        },
    ],
    benefits: [
        {
            iconPath: '/images/services/icons/users-icon.svg',
            title: 'Increased Reach',
            description:
                'Expand your audience and connect with potential customers',
        },
        {
            iconPath: '/images/services/icons/chart-icon.svg',
            title: 'Better ROI',
            description:
                'Get more value from your marketing budget with optimized campaigns',
        },
        {
            iconPath: '/images/services/icons/globe-icon.svg',
            title: 'Brand Awareness',
            description:
                'Build recognition and trust with consistent messaging',
        },
    ],
    process: [
        {
            step: 1,
            title: 'Strategy & Planning',
            description:
                'Develop comprehensive marketing strategies aligned with your business goals',
            iconPath: '/images/services/icons/target-icon.svg',
        },
        {
            step: 2,
            title: 'Campaign Creation',
            description:
                'Design and create compelling content and ad campaigns',
            iconPath: '/images/services/icons/sparkles-icon.svg',
        },
        {
            step: 3,
            title: 'Launch & Monitor',
            description: 'Deploy campaigns and track performance in real-time',
            iconPath: '/images/services/icons/trending-up-icon.svg',
        },
        {
            step: 4,
            title: 'Optimize & Scale',
            description:
                'Continuous optimization and scaling of successful campaigns',
            iconPath: '/images/services/icons/chart-icon.svg',
        },
    ],
    gallery: [
        {
            url: '/images/services/digital-marketing/seo-optimization.jpg',
            alt: 'SEO specialist optimizing website content and analyzing search performance',
            caption: 'Search Engine Optimization & Analytics',
        },
        {
            url: '/images/services/digital-marketing/social-media-marketing.jpg',
            alt: 'Creative team developing social media marketing campaigns and content',
            caption: 'Social Media Strategy & Content Creation',
        },
        {
            url: '/images/services/digital-marketing/email-marketing.jpg',
            alt: 'Email marketing campaign dashboard showing performance metrics and analytics',
            caption: 'Email Marketing Campaigns & Automation',
        },
        {
            url: '/images/services/digital-marketing/ppc-advertising.jpg',
            alt: 'Digital marketer managing pay-per-click advertising campaigns and bid optimization',
            caption: 'PPC Advertising & Campaign Management',
        },
        {
            url: '/images/services/digital-marketing/content-marketing.jpg',
            alt: 'Marketing team creating content strategy and editorial calendar',
            caption: 'Content Marketing & Strategy Development',
        },
        {
            url: '/images/services/digital-marketing/analytics-reporting.jpg',
            alt: 'Marketing analytics presentation showing ROI and performance metrics',
            caption: 'Analytics, Reporting & Performance Optimization',
        },
    ],
    faqs: [
        {
            question: 'What digital marketing services do you offer?',
            answer: 'We provide a comprehensive suite of digital marketing services including Search Engine Optimization (SEO), Pay-Per-Click advertising (PPC), social media marketing, content marketing, email marketing, conversion rate optimization, and marketing analytics. We create integrated strategies that leverage multiple channels to maximize your reach and ROI. Each campaign is customized to your specific business goals, target audience, and industry.',
        },
        {
            question: 'How do you measure marketing success?',
            answer: "We use a data-driven approach with clear KPIs tailored to your goals. Common metrics include website traffic, conversion rates, cost per acquisition, return on ad spend (ROAS), engagement rates, and revenue generated. We provide detailed monthly reports with actionable insights and recommendations. Our analytics dashboards give you real-time visibility into campaign performance, and we conduct regular strategy reviews to ensure we're meeting your objectives.",
        },
        {
            question: 'How long does it take to see results?',
            answer: 'Results vary by channel and strategy. Paid advertising (PPC, social ads) can generate immediate traffic and leads, often within days. SEO and content marketing are long-term strategies that typically show significant results in 3-6 months. Social media growth is gradual, building momentum over 2-4 months. We focus on both quick wins and sustainable long-term growth, providing regular updates on progress and adjusting strategies based on performance data.',
        },
        {
            question: 'What is your pricing structure?',
            answer: 'Our pricing is flexible and depends on your specific needs, goals, and budget. We offer both project-based pricing and monthly retainer packages. A typical monthly retainer includes strategy development, campaign management, content creation, analytics reporting, and ongoing optimization. We provide transparent pricing with no hidden fees, and we can scale services up or down based on your business needs and budget. Contact us for a custom quote tailored to your requirements.',
        },
        {
            question: 'Do you work with businesses in my industry?',
            answer: "We have experience across diverse industries including e-commerce, B2B services, healthcare, technology, professional services, real estate, and more. Each industry has unique challenges and opportunities, and we tailor our strategies accordingly. During our initial consultation, we research your specific industry, competitors, and target audience to create strategies that work for your market. We're happy to provide case studies and references from businesses similar to yours.",
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
        secondaryButton: {
            text: 'View Case Studies',
            href: '/portfolio',
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
}
