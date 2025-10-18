/**
 * UI/UX Design Service Data
 *
 * Complete service definition for UI/UX design offerings.
 */

import type { Service } from '@/lib/types/services'

export const uiUxDesignService: Service = {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    excerpt:
        'Create beautiful, intuitive user experiences that delight your customers and drive engagement.',
    description:
        'Our UI/UX design services focus on creating exceptional user experiences that combine beautiful aesthetics with intuitive functionality. We use data-driven design methodologies and user research to craft interfaces that not only look stunning but also drive conversions and user satisfaction.',
    category: 'design',
    categoryLabel: 'Design',
    iconConfig: {
        cardIconPath: '/images/services/icons/palette-icon.svg',
        heroImagePath: '/images/services/ui-ux-design-hero.jpg',
        imageAlt: 'UI/UX design workspace with sketches and digital mockups',
    },
    features: [
        {
            iconPath: '/images/services/icons/sparkles-icon.svg',
            title: 'Beautiful Interfaces',
            description:
                'Stunning visual designs that align with your brand identity',
            ariaLabel: 'Learn about our beautiful interface designs',
        },
        {
            iconPath: '/images/services/icons/users-icon.svg',
            title: 'User-Centered',
            description:
                'Research-driven designs focused on user needs and behaviors',
            ariaLabel: 'Learn about our user-centered design approach',
        },
        {
            iconPath: '/images/services/icons/smartphone-icon.svg',
            title: 'Responsive Design',
            description:
                'Seamless experiences across all devices and screen sizes',
            ariaLabel: 'Learn about our responsive design capabilities',
        },
    ],
    benefits: [
        {
            iconPath: '/images/services/icons/trending-up-icon.svg',
            title: 'Higher Engagement',
            description:
                'Intuitive designs that keep users engaged and coming back',
        },
        {
            iconPath: '/images/services/icons/chart-icon.svg',
            title: 'Better Conversions',
            description:
                'Strategic design that guides users toward your business goals',
        },
        {
            iconPath: '/images/services/icons/sparkles-icon.svg',
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
            iconPath: '/images/services/icons/target-icon.svg',
        },
        {
            step: 2,
            title: 'Wireframing & Prototyping',
            description:
                'Creating low and high-fidelity prototypes for validation',
            iconPath: '/images/services/icons/palette-icon.svg',
        },
        {
            step: 3,
            title: 'Visual Design',
            description:
                'Crafting beautiful interfaces with your brand identity',
            iconPath: '/images/services/icons/sparkles-icon.svg',
        },
        {
            step: 4,
            title: 'Testing & Iteration',
            description: 'User testing and refinement based on real feedback',
            iconPath: '/images/services/icons/users-icon.svg',
        },
    ],
    gallery: [
        {
            url: '/images/services/ui-ux-design/design-workspace-sketches.jpg',
            alt: 'Professional design workspace with wireframe sketches, prototypes, and design tools on wooden desk',
            caption: 'Design process with sketches and wireframes',
        },
        {
            url: '/images/services/ui-ux-design/user-research-testing.jpg',
            alt: 'UX researcher conducting usability testing session with participant using tablet prototype',
            caption: 'User research and usability testing',
        },
        {
            url: '/images/services/ui-ux-design/design-system-components.jpg',
            alt: 'Design system documentation showing UI components, color palette, and typography guidelines',
            caption: 'Comprehensive design systems and style guides',
        },
        {
            url: '/images/services/ui-ux-design/mobile-app-prototyping.jpg',
            alt: 'Designer creating mobile app wireframes on iPad Pro with Apple Pencil',
            caption: 'Mobile app prototyping and wireframing',
        },
        {
            url: '/images/services/ui-ux-design/team-collaboration.jpg',
            alt: 'Design team collaborating on UI project with laptops and prototypes in modern office',
            caption: 'Collaborative design team process',
        },
        {
            url: '/images/services/ui-ux-design/final-ui-designs-devices.jpg',
            alt: 'Final polished UI designs displayed on MacBook, iPad, and iPhone showing responsive design',
            caption: 'Final UI designs across multiple devices',
        },
    ],
    faqs: [
        {
            question: 'What is the difference between UI and UX design?',
            answer: 'UI (User Interface) design focuses on the visual elements and aesthetics of your product - colors, typography, buttons, and layouts. UX (User Experience) design focuses on the overall experience and journey of your users - how they interact with your product, navigation flow, and usability. We provide both services as they work together to create successful digital products. Great UX ensures your product is easy to use, while great UI makes it visually appealing.',
        },
        {
            question: 'How do you ensure the design aligns with our brand?',
            answer: 'We begin every project with a comprehensive brand discovery phase. We review your brand guidelines, values, target audience, and competitive landscape. Throughout the design process, we maintain close collaboration with your team, presenting concepts and gathering feedback. We create design systems that incorporate your brand colors, typography, and visual style, ensuring consistency across all touchpoints while bringing fresh, modern design thinking to elevate your brand.',
        },
        {
            question: 'Do you conduct user research and testing?',
            answer: 'Yes, user research and testing are integral parts of our design process. We conduct user interviews, surveys, and competitive analysis during the discovery phase. We create user personas and journey maps to inform our design decisions. Before finalizing designs, we perform usability testing with real users to validate our solutions and identify areas for improvement. This data-driven approach ensures we create designs that truly meet user needs.',
        },
        {
            question: 'Can you redesign our existing product?',
            answer: 'Absolutely. We specialize in both new product design and redesigns. For redesign projects, we start by auditing your current design, analyzing user data and feedback, and identifying pain points. We then create an improved design that maintains familiarity for existing users while addressing usability issues and modernizing the interface. We can redesign your entire product or focus on specific areas that need the most improvement.',
        },
        {
            question: 'What deliverables will we receive?',
            answer: 'Our deliverables include comprehensive design documentation: high-fidelity mockups for all screens and states, interactive prototypes for user testing, a complete design system with components and style guide, design specifications for developers, and source files in industry-standard formats (Figma, Adobe XD). We also provide design handoff sessions with your development team to ensure smooth implementation and maintain design quality.',
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
}
