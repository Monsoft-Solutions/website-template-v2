/**
 * Services Page Content Data
 *
 * Supporting content for the services listing page including FAQ, testimonials,
 * and general service information that applies across all services.
 */

/**
 * FAQ Item Type
 */
export type ServicesFAQItem = {
    readonly question: string
    readonly answer: string
}

/**
 * Testimonial Type
 */
export type ServicesTestimonial = {
    readonly quote: string
    readonly author: {
        readonly name: string
        readonly title: string
        readonly company: string
        readonly avatar?: string
    }
    readonly service: string
    readonly rating: number
}

/**
 * General Services FAQ
 *
 * Common questions about services in general (not service-specific)
 */
export const servicesFAQ: ServicesFAQItem[] = [
    {
        question: 'How do you ensure project quality and timelines?',
        answer: 'We follow a rigorous project management process with clear milestones, regular check-ins, and quality assurance at every stage. Our agile methodology allows for flexibility while maintaining strict quality standards. We provide regular progress updates and maintain transparent communication throughout the project lifecycle.',
    },
    {
        question: 'What is your typical project timeline?',
        answer: 'Project timelines vary based on scope and complexity. Small projects typically take 2-4 weeks, medium projects 1-3 months, and large enterprise solutions 3-6 months. We provide detailed timeline estimates during our initial consultation and break larger projects into phases for faster delivery of core functionality.',
    },
    {
        question: 'Do you provide ongoing support after project completion?',
        answer: 'Yes, we offer comprehensive maintenance and support packages tailored to your needs. This includes regular updates, security patches, performance monitoring, and technical support. We also provide training for your team and documentation to ensure you can manage day-to-day operations independently.',
    },
    {
        question: 'What technologies and tools do you use?',
        answer: 'We specialize in modern, scalable technologies including React, Next.js, TypeScript, Node.js, and cloud platforms like AWS and Vercel. We choose the technology stack based on your specific requirements, ensuring optimal performance, maintainability, and future scalability.',
    },
    {
        question: 'How do you handle project pricing and payments?',
        answer: 'We offer transparent, competitive pricing with no hidden fees. Projects can be quoted as fixed-price or hourly depending on scope. We typically require a 50% deposit to begin work, with the remainder due upon completion. For larger projects, we can arrange milestone-based payments to improve cash flow.',
    },
    {
        question: 'Can you work with our existing team and systems?',
        answer: "Absolutely! We excel at integrating with existing teams, workflows, and systems. We can work as an extension of your team, collaborate with your developers, and integrate with your existing tools and processes. We adapt our approach to complement your organization's culture and methodologies.",
    },
    {
        question: 'What makes your services different from competitors?',
        answer: 'Our focus on quality, communication, and long-term partnerships sets us apart. We combine technical expertise with business understanding to deliver solutions that drive real results. Our commitment to transparency, regular communication, and post-launch support ensures your success beyond project completion.',
    },
]

/**
 * Client Testimonials
 *
 * Real client feedback about our services
 */
export const servicesTestimonials: ServicesTestimonial[] = [
    {
        quote: 'The team delivered an exceptional web application that exceeded our expectations. Their attention to detail and commitment to quality was evident throughout the entire project.',
        author: {
            name: 'Sarah Johnson',
            title: 'CTO',
            company: 'TechStart Inc.',
            avatar: '/images/testimonials/sarah-johnson.jpg',
        },
        service: 'Web Development',
        rating: 5,
    },
    {
        quote: 'Our new brand identity and website have transformed how customers perceive our business. The design work was creative, professional, and perfectly aligned with our vision.',
        author: {
            name: 'Michael Chen',
            title: 'Marketing Director',
            company: 'GreenLife Solutions',
            avatar: '/images/testimonials/michael-chen.jpg',
        },
        service: 'UI/UX Design',
        rating: 5,
    },
    {
        quote: 'The digital marketing campaign delivered outstanding results - we saw a 300% increase in qualified leads within the first three months. Highly recommend their expertise.',
        author: {
            name: 'Emma Rodriguez',
            title: 'CEO',
            company: 'Local Fitness Co.',
            avatar: '/images/testimonials/emma-rodriguez.jpg',
        },
        service: 'Digital Marketing',
        rating: 5,
    },
    {
        quote: 'Professional, responsive, and incredibly skilled. They took our complex requirements and turned them into an intuitive, powerful application that our users love.',
        author: {
            name: 'David Park',
            title: 'Product Manager',
            company: 'DataFlow Systems',
            avatar: '/images/testimonials/david-park.jpg',
        },
        service: 'Web Development',
        rating: 5,
    },
    {
        quote: 'Working with this team was a pleasure from start to finish. They understood our industry, our challenges, and delivered a solution that has streamlined our operations significantly.',
        author: {
            name: 'Lisa Thompson',
            title: 'Operations Director',
            company: 'Healthcare Plus',
            avatar: '/images/testimonials/lisa-thompson.jpg',
        },
        service: 'Custom Development',
        rating: 5,
    },
    {
        quote: 'The ROI on our investment has been incredible. Not only did they deliver on time and on budget, but the ongoing support has been exceptional. True partners in our success.',
        author: {
            name: 'James Wilson',
            title: 'Founder',
            company: 'E-commerce Ventures',
            avatar: '/images/testimonials/james-wilson.jpg',
        },
        service: 'E-commerce Development',
        rating: 5,
    },
]
