/**
 * Services Page Content Data
 *
 * Supporting content for the services listing page including FAQ, testimonials,
 * and general service information that applies across all services.
 *
 * Content aligned with Keel brand guidelines: clear, direct, production-focused.
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
 * Common questions about Keel template and services
 */
export const servicesFAQ: ServicesFAQItem[] = [
    {
        question: "What's included in the template?",
        answer: 'Complete website with blog system, SEO optimization, analytics integration, contact forms with email notifications, dark mode, admin features, and full documentation. Everything you need for production.',
    },
    {
        question: 'How long does it take to customize?',
        answer: 'Initial setup takes 1-2 hours. Update site-config.ts with your business info, customize colors and branding, add content. Most developers have a production-ready site within a day.',
    },
    {
        question: 'Do I need React/Next.js experience?',
        answer: 'Yes. You need basic React and Next.js knowledge to customize the template. If you can read TypeScript and use Git, you can use Keel. Full documentation guides you through everything.',
    },
    {
        question: 'Can I use this for client projects?',
        answer: 'Yes. Build unlimited websites for yourself or clients. No per-site licensing fees. Use the template for as many projects as you need. Attribution appreciated but not required.',
    },
    {
        question: 'What if I have an existing website?',
        answer: 'We can help you migrate. Move from WordPress, Wix, Squarespace, or any platform to Keel. We preserve your content, maintain SEO rankings with proper redirects, and keep your domain.',
    },
    {
        question: 'How does the SEO system work?',
        answer: 'Built-in technical SEO: meta tags, OpenGraph, Twitter Cards, Schema.org structured data. Automatic sitemap and robots.txt generation. Fast page loads. No plugins needed.',
    },
    {
        question: 'Is the blog system customizable?',
        answer: 'Yes. Full-featured blog with PostgreSQL and Drizzle ORM. Categories, tags, featured images, rich text editor. Admin interface for creating posts. Type-safe content management.',
    },
    {
        question: 'What support is included?',
        answer: 'Complete documentation for setup, deployment, and customization. Community support via GitHub discussions. Migration consulting and implementation support available for an additional fee.',
    },
]

/**
 * Client Testimonials
 *
 * Testimonials aligned with Keel brand voice: specific results, real use cases
 */
export const servicesTestimonials: ServicesTestimonial[] = [
    {
        quote: 'Saved three weeks on our last client project. The blog system and SEO features work perfectly out of the box. Type safety caught errors before deployment.',
        author: {
            name: 'Sarah Johnson',
            title: 'Lead Developer',
            company: 'Digital Agency Co.',
            avatar: '/images/testimonials/sarah-johnson.jpg',
        },
        service: 'Website Design & Development',
        rating: 5,
    },
    {
        quote: 'Migrated from WordPress in two weeks. Performance went from 60 to 95 on Lighthouse. SEO rankings maintained with proper redirects. Site loads in under a second now.',
        author: {
            name: 'Michael Chen',
            title: 'CTO',
            company: 'E-commerce Startup',
            avatar: '/images/testimonials/michael-chen.jpg',
        },
        service: 'Website Modernization',
        rating: 5,
    },
    {
        quote: 'Blog system is excellent. Categories, tags, and featured images work exactly as needed. Published 20 posts, organic traffic up 200% in three months.',
        author: {
            name: 'Emma Rodriguez',
            title: 'Content Director',
            company: 'SaaS Company',
            avatar: '/images/testimonials/emma-rodriguez.jpg',
        },
        service: 'SEO Optimization',
        rating: 5,
    },
    {
        quote: 'Used Keel for five client sites. Setup takes hours, not weeks. Clients love the speed and admin interface. TypeScript catches issues early.',
        author: {
            name: 'David Park',
            title: 'Freelance Developer',
            company: 'Independent',
            avatar: '/images/testimonials/david-park.jpg',
        },
        service: 'Website Design & Development',
        rating: 5,
    },
    {
        quote: 'Analytics integration saved days of work. Google Analytics, Clarity, and GTM work out of the box. Cookie consent banner handles privacy requirements.',
        author: {
            name: 'Lisa Thompson',
            title: 'Marketing Manager',
            company: 'Tech Startup',
            avatar: '/images/testimonials/lisa-thompson.jpg',
        },
        service: 'SEO Optimization',
        rating: 5,
    },
    {
        quote: 'Documentation is clear and complete. Deployed to Vercel in minutes. Environment validation caught config issues before production. Rock solid template.',
        author: {
            name: 'James Wilson',
            title: 'Senior Engineer',
            company: 'Enterprise Corp',
            avatar: '/images/testimonials/james-wilson.jpg',
        },
        service: 'Website Design & Development',
        rating: 5,
    },
]
