/**
 * Web Development Service Data
 *
 * Complete service definition for web development offerings.
 */

import type { Service } from '@/lib/types/services'

export const webDevelopmentService: Service = {
    slug: 'web-development',
    title: 'Web Development',
    excerpt:
        'Build fast, scalable, and secure web applications with modern technologies and best practices.',
    description:
        'Our web development services deliver cutting-edge solutions tailored to your business needs. We specialize in building fast, scalable, and maintainable web applications using the latest technologies and industry best practices. From simple landing pages to complex enterprise applications, our expert team ensures your digital presence stands out.',
    category: 'development',
    categoryLabel: 'Development',
    iconConfig: {
        cardIconPath: '/images/services/icons/code-icon.svg',
        heroImagePath: '/images/services/web-development.jpg',
        imageAlt:
            'Modern web development workspace with code editor displaying React and TypeScript',
    },
    features: [
        {
            iconPath: '/images/services/icons/zap-icon.svg',
            title: 'Lightning Fast',
            description: 'Optimized performance with sub-second load times',
            ariaLabel: 'Learn about our fast web development approach',
        },
        {
            iconPath: '/images/services/icons/shield-icon.svg',
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security and 99.9% uptime guarantee',
            ariaLabel: 'Learn about our secure web development practices',
        },
        {
            iconPath: '/images/services/icons/smartphone-icon.svg',
            title: 'Mobile-First',
            description:
                'Responsive design that works perfectly on all devices',
            ariaLabel: 'Learn about our mobile-first development approach',
        },
    ],
    benefits: [
        {
            iconPath: '/images/services/icons/chart-icon.svg',
            title: 'Increased Conversions',
            description:
                'Our optimized UX design increases conversion rates by up to 40%',
        },
        {
            iconPath: '/images/services/icons/globe-icon.svg',
            title: 'Global Reach',
            description:
                'Scalable infrastructure that grows with your business worldwide',
        },
        {
            iconPath: '/images/services/icons/code-icon.svg',
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
            iconPath: '/images/services/icons/target-icon.svg',
        },
        {
            step: 2,
            title: 'Design & Prototyping',
            description:
                'Interactive prototypes and design mockups for your approval',
            iconPath: '/images/services/icons/palette-icon.svg',
        },
        {
            step: 3,
            title: 'Development & Testing',
            description:
                'Agile development with continuous testing and quality assurance',
            iconPath: '/images/services/icons/code-icon.svg',
        },
        {
            step: 4,
            title: 'Launch & Support',
            description:
                'Smooth deployment with ongoing maintenance and support',
            iconPath: '/images/services/icons/zap-icon.svg',
        },
    ],
    gallery: [
        {
            url: '/images/services/web-development-workspace.jpg',
            alt: 'Modern professional developer workspace with dual monitors',
            caption: 'Clean, organized development environment',
        },
        {
            url: '/images/services/web-development-team.jpg',
            alt: 'Diverse team of developers collaborating on a project',
            caption: 'Collaborative team development process',
        },
        {
            url: '/images/services/web-development-mobile.jpg',
            alt: 'Developer testing responsive design on multiple devices',
            caption: 'Mobile-first responsive development',
        },
        {
            url: '/images/services/web-development-code-quality.jpg',
            alt: 'Clean TypeScript React code with testing environment',
            caption: 'Code quality and automated testing',
        },
        {
            url: '/images/services/web-development-ui-design.jpg',
            alt: 'UX designer creating modern web interface mockups',
            caption: 'User interface and experience design',
        },
        {
            url: '/images/services/web-development-success.jpg',
            alt: 'Development team celebrating successful project launch',
            caption: 'Successful project delivery and launch',
        },
    ],
    faqs: [
        {
            question: 'How long does a typical web development project take?',
            answer: 'Project timelines vary based on complexity and scope. A simple website typically takes 4-6 weeks, while a complex web application may require 3-6 months. During our initial consultation, we provide a detailed timeline based on your specific requirements and can break the project into phases for faster delivery of core features.',
        },
        {
            question: 'What technologies do you use for web development?',
            answer: 'We specialize in modern, scalable technologies including React, Next.js, TypeScript, and Node.js. We choose the technology stack based on your project requirements, ensuring optimal performance, maintainability, and future scalability. All our solutions follow industry best practices and use enterprise-grade tools.',
        },
        {
            question: 'Do you provide ongoing maintenance and support?',
            answer: 'Yes, we offer comprehensive maintenance and support packages. This includes regular security updates, performance optimization, bug fixes, feature enhancements, and technical support. We can customize a support plan that fits your needs, from basic monitoring to full-time dedicated support.',
        },
        {
            question: 'Can you integrate with our existing systems?',
            answer: 'Absolutely. We have extensive experience integrating web applications with various third-party services, APIs, and legacy systems. Whether you need CRM integration, payment gateways, authentication systems, or custom APIs, we can create seamless connections between your new web application and existing infrastructure.',
        },
        {
            question: 'What is included in the web development cost?',
            answer: 'Our pricing includes all aspects of development: initial consultation, project planning, UI/UX design, frontend and backend development, testing, deployment, and post-launch support. We provide transparent, detailed quotes with no hidden fees. The final cost depends on project complexity, features required, and timeline. Contact us for a free, no-obligation quote tailored to your specific needs.',
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
}
