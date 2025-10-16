/**
 * ContactHeroSection Component
 *
 * A hero section for the contact page displaying page title, introduction,
 * and breadcrumb navigation. Features subtle fade-in animations and centered layout.
 *
 * @example
 * ```tsx
 * <ContactHeroSection
 *   badge="Get In Touch"
 *   headline="Let's Start a Conversation"
 *   description="We'd love to hear from you..."
 * />
 * ```
 */
import { cn } from '@workspace/ui/lib/utils'

import { ContentWrapper, SectionContainer } from '@/components/shared'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs.component'
import type { ContactHeroSectionProps } from '@/lib/types/sections/contact-hero-section.type'

export function ContactHeroSection({
    badge,
    headline,
    description,
    enableAnimations = true,
    className,
    id,
}: ContactHeroSectionProps) {
    // Breadcrumb items for navigation
    const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Contact' }]

    return (
        <SectionContainer
            variant='default'
            id={id}
            className={cn('py-16 md:py-20 lg:py-24', className)}
        >
            <ContentWrapper>
                <div className='flex flex-col items-center space-y-6 text-center'>
                    {/* Breadcrumbs */}
                    <div
                        className={cn(
                            'flex w-full justify-center',
                            enableAnimations && 'animate-fade-in'
                        )}
                    >
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>

                    {/* Content Container */}
                    <div
                        className={cn(
                            'flex max-w-3xl flex-col space-y-6',
                            enableAnimations &&
                                'animate-fade-in [animation-delay:100ms]'
                        )}
                    >
                        {/* Badge */}
                        {badge && (
                            <div className='text-primary text-sm font-semibold tracking-wider uppercase md:text-base'>
                                {badge}
                            </div>
                        )}

                        {/* Headline */}
                        <h1 className='text-foreground text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl'>
                            {headline}
                        </h1>

                        {/* Description */}
                        {description && (
                            <p className='text-muted-foreground text-base leading-relaxed md:text-lg lg:text-xl'>
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </ContentWrapper>
        </SectionContainer>
    )
}
