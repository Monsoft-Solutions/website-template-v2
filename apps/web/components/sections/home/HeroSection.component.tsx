/**
 * HeroSection Component
 *
 * A prominent landing section with headline, subheadline, description, CTAs, and hero image.
 * Features subtle fade-in animations and mobile-responsive layout.
 *
 * @example
 * ```tsx
 * <HeroSection
 *   headline="Welcome to Our Company"
 *   subheadline="Excellence in Every Detail"
 *   description="We provide innovative solutions..."
 *   primaryButton={{ text: "Contact Us", href: "/contact" }}
 *   secondaryButton={{ text: "Call Us", href: "tel:+1234567890", icon: Phone }}
 *   image={{ src: "/images/hero.jpg", alt: "Hero image", priority: true }}
 * />
 * ```
 */
import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

import { ContentWrapper } from '@/components/shared'
import { SectionContainer } from '@/components/shared'
import type { HeroSectionProps } from '@/lib/types/sections/hero-section.type'

export function HeroSection({
    headline,
    subheadline,
    description,
    primaryButton,
    secondaryButton,
    image,
    imagePosition = 'right',
    variant = 'default',
    className,
    id,
    enableAnimations = true,
}: HeroSectionProps) {
    return (
        <SectionContainer
            variant={variant}
            id={id}
            className={cn('py-20 md:py-28 lg:py-32', className)}
        >
            <ContentWrapper>
                <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16'>
                    {/* Content Container */}
                    <div
                        className={cn(
                            'flex flex-col space-y-6',
                            imagePosition === 'right' && 'lg:order-1',
                            imagePosition === 'left' && 'lg:order-2',
                            enableAnimations && 'animate-fade-in'
                        )}
                    >
                        {/* Subheadline */}
                        {subheadline && (
                            <div className='text-primary text-sm font-semibold tracking-wider uppercase md:text-base'>
                                {subheadline}
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

                        {/* CTA Buttons */}
                        <div className='flex flex-col gap-4 pt-4 sm:flex-row'>
                            {/* Primary Button */}
                            <Button
                                asChild
                                size='lg'
                                variant={primaryButton.variant || 'default'}
                                className='group'
                            >
                                <Link
                                    href={primaryButton.href}
                                    {...(primaryButton.external && {
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                    })}
                                    aria-label={
                                        primaryButton.ariaLabel ||
                                        primaryButton.text
                                    }
                                >
                                    {primaryButton.icon &&
                                        primaryButton.iconPosition !==
                                            'right' && (
                                            <primaryButton.icon className='mr-2 size-5' />
                                        )}
                                    {primaryButton.text}
                                    {primaryButton.icon &&
                                        primaryButton.iconPosition ===
                                            'right' && (
                                            <primaryButton.icon className='ml-2 size-5' />
                                        )}
                                </Link>
                            </Button>

                            {/* Secondary Button */}
                            {secondaryButton && (
                                <Button
                                    asChild
                                    size='lg'
                                    variant={
                                        secondaryButton.variant || 'outline'
                                    }
                                    className='group'
                                >
                                    <Link
                                        href={secondaryButton.href}
                                        {...(secondaryButton.external && {
                                            target: '_blank',
                                            rel: 'noopener noreferrer',
                                        })}
                                        aria-label={
                                            secondaryButton.ariaLabel ||
                                            secondaryButton.text
                                        }
                                    >
                                        {secondaryButton.icon &&
                                            secondaryButton.iconPosition !==
                                                'right' && (
                                                <secondaryButton.icon className='mr-2 size-5' />
                                            )}
                                        {secondaryButton.text}
                                        {secondaryButton.icon &&
                                            secondaryButton.iconPosition ===
                                                'right' && (
                                                <secondaryButton.icon className='ml-2 size-5' />
                                            )}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Image Container */}
                    <div
                        className={cn(
                            'relative overflow-hidden rounded-lg',
                            imagePosition === 'right' && 'lg:order-2',
                            imagePosition === 'left' && 'lg:order-1',
                            enableAnimations &&
                                'animate-fade-in [animation-delay:200ms]'
                        )}
                    >
                        <div
                            className={cn(
                                'relative',
                                image.aspectRatio || 'aspect-video'
                            )}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className='object-cover'
                                priority={image.priority ?? true}
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
                            />
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </SectionContainer>
    )
}
