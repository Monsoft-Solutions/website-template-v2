/**
 * TestimonialsSection Component
 *
 * Displays customer testimonials in a card-based grid layout with optional ratings and avatars.
 *
 * @example
 * ```tsx
 * <TestimonialsSection
 *   title="What Our Clients Say"
 *   description="Don't just take our word for it"
 *   testimonials={[
 *     {
 *       quote: "Exceptional service and quality!",
 *       name: "John Doe",
 *       role: "CEO",
 *       company: "Acme Corp",
 *       rating: 5
 *     },
 *     // ... more testimonials
 *   ]}
 *   columns={3}
 * />
 * ```
 */
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@workspace/ui/components/avatar'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@workspace/ui/components/card'
import { cn } from '@workspace/ui/lib/utils'
import { Quote, Star } from 'lucide-react'

import {
    ContentWrapper,
    SectionContainer,
    SectionHeader,
} from '@/components/shared'
import type { TestimonialsSectionProps } from '@/lib/types/sections/testimonials-section.type'

/**
 * Maps column count to grid classes
 */
const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
}

/**
 * Generate avatar fallback from name (initials)
 */
function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

/**
 * Renders star rating
 */
function StarRating({ rating }: { rating: number }) {
    return (
        <div
            className='flex gap-1'
            aria-label={`Rating: ${rating} out of 5 stars`}
        >
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={cn(
                        'size-4',
                        index < rating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                    )}
                />
            ))}
        </div>
    )
}

export function TestimonialsSection({
    title,
    description,
    testimonials,
    columns = 3,
    variant = 'default',
    className,
    id,
    showRatings = true,
}: TestimonialsSectionProps) {
    return (
        <SectionContainer variant={variant} id={id} className={className}>
            <ContentWrapper>
                {/* Section Header */}
                <SectionHeader
                    title={title}
                    description={description}
                    align='center'
                    className='mb-12 md:mb-16'
                />

                {/* Testimonials Grid */}
                <div
                    className={cn(
                        'grid grid-cols-1 gap-6 md:gap-8',
                        columnClasses[columns]
                    )}
                >
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={`${testimonial.name}-${index}`}
                            className='flex flex-col transition-shadow duration-300 hover:shadow-lg'
                        >
                            <CardHeader className='space-y-4'>
                                {/* Rating */}
                                {showRatings && testimonial.rating && (
                                    <StarRating rating={testimonial.rating} />
                                )}

                                {/* Quote Icon */}
                                <Quote
                                    className='text-primary size-8 opacity-20'
                                    aria-hidden='true'
                                />
                            </CardHeader>

                            <CardContent className='flex flex-1 flex-col space-y-6'>
                                {/* Testimonial Quote */}
                                <CardDescription className='text-foreground flex-1 text-base leading-relaxed'>
                                    "{testimonial.quote}"
                                </CardDescription>

                                {/* Author Info */}
                                <div className='flex items-center gap-4'>
                                    {/* Avatar */}
                                    <Avatar className='size-12'>
                                        {testimonial.avatar && (
                                            <AvatarImage
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                            />
                                        )}
                                        <AvatarFallback className='bg-primary/10 text-primary'>
                                            {getInitials(testimonial.name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Name and Role */}
                                    <div className='flex flex-col'>
                                        <div className='text-foreground text-sm font-semibold'>
                                            {testimonial.name}
                                        </div>
                                        <div className='text-muted-foreground text-xs'>
                                            {testimonial.role}
                                            {testimonial.company &&
                                                ` • ${testimonial.company}`}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ContentWrapper>
        </SectionContainer>
    )
}
