/**
 * ContactInfoSection Component
 *
 * Displays contact information (phone, email, address) and social media links
 * in a visually organized card layout. Includes interactive elements with
 * proper accessibility attributes.
 *
 * @example
 * ```tsx
 * <ContactInfoSection
 *   headline="Other Ways to Reach Us"
 *   contactItems={contactItems}
 *   showSocialLinks={true}
 * />
 * ```
 */
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card'
import { cn } from '@workspace/ui/lib/utils'
import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

import {
    ContentWrapper,
    SectionContainer,
    SectionHeader,
} from '@/components/shared'
import { socialLinks } from '@/lib/data/navigation'
import type { ContactInfoSectionProps } from '@/lib/types/sections/contact-info-section.type'

/**
 * Map social platform names to their corresponding Lucide icons
 */
const socialIconMap = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
} as const

/**
 * Get icon component for social platform
 */
function getSocialIcon(platform: string) {
    const normalizedPlatform = platform.toLowerCase()
    return (
        socialIconMap[normalizedPlatform as keyof typeof socialIconMap] ||
        Github
    )
}

export function ContactInfoSection({
    badge,
    headline,
    description,
    contactItems,
    showSocialLinks = true,
    className,
    id,
}: ContactInfoSectionProps) {
    return (
        <SectionContainer
            variant='default'
            id={id}
            className={cn('py-16 md:py-24', className)}
        >
            <ContentWrapper size='md'>
                {/* Section Header */}
                {(badge || headline || description) && (
                    <SectionHeader
                        badge={badge}
                        title={headline || ''}
                        description={description}
                        className='mb-12'
                    />
                )}

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {/* Contact Information Cards */}
                    {contactItems.map((item, index) => {
                        const Icon = item.icon
                        const isClickable = !!item.href

                        const CardWrapper = isClickable ? 'div' : 'div'
                        const cardContent = (
                            <Card
                                className={cn(
                                    'transition-shadow duration-200',
                                    isClickable &&
                                        'group cursor-pointer hover:shadow-md'
                                )}
                            >
                                <CardHeader>
                                    <div className='flex items-center gap-3'>
                                        <div
                                            className={cn(
                                                'bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg',
                                                isClickable &&
                                                    'group-hover:bg-primary/20 transition-colors'
                                            )}
                                        >
                                            <Icon
                                                className='size-5'
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <CardTitle className='text-base'>
                                            {item.title}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p
                                        className={cn(
                                            'text-muted-foreground text-sm',
                                            isClickable &&
                                                'group-hover:text-foreground transition-colors'
                                        )}
                                    >
                                        {item.value}
                                    </p>
                                </CardContent>
                            </Card>
                        )

                        return (
                            <CardWrapper key={`${item.title}-${index}`}>
                                {isClickable && item.href ? (
                                    <Link
                                        href={item.href}
                                        aria-label={item.ariaLabel}
                                        className='block'
                                    >
                                        {cardContent}
                                    </Link>
                                ) : (
                                    <div aria-label={item.ariaLabel}>
                                        {cardContent}
                                    </div>
                                )}
                            </CardWrapper>
                        )
                    })}
                </div>

                {/* Social Media Links */}
                {showSocialLinks && socialLinks.length > 0 && (
                    <div className='mt-12'>
                        <div className='bg-muted/30 flex flex-col items-center gap-6 rounded-lg p-6 md:p-8'>
                            <div className='text-center'>
                                <h3 className='text-foreground mb-2 text-lg font-semibold'>
                                    Follow Us
                                </h3>
                                <p className='text-muted-foreground text-sm'>
                                    Connect with us on social media
                                </p>
                            </div>
                            <div className='flex flex-wrap items-center justify-center gap-4'>
                                {socialLinks.map((social) => {
                                    const SocialIcon = getSocialIcon(
                                        social.platform
                                    )
                                    return (
                                        <Link
                                            key={social.platform}
                                            href={social.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            aria-label={
                                                social.label ||
                                                `Follow us on ${social.platform}`
                                            }
                                            className='bg-background hover:bg-accent hover:text-accent-foreground flex size-12 items-center justify-center rounded-full border shadow-sm transition-colors duration-200'
                                        >
                                            <SocialIcon
                                                className='size-5'
                                                aria-hidden='true'
                                            />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </ContentWrapper>
        </SectionContainer>
    )
}
