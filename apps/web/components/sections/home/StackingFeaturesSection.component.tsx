/**
 * StackingFeaturesSection Component
 *
 * Displays feature cards with an elegant stacking scroll effect.
 * As users scroll, cards travel up and pin to the top, stacking on each other
 * with subtle scaling animations for depth perception.
 *
 * @example
 * ```tsx
 * <StackingFeaturesSection
 *   title="Everything You Need"
 *   description="Complete features for your success"
 *   features={[
 *     { icon: Zap, title: "Fast", description: "Lightning fast" },
 *     // ... more features
 *   ]}
 * />
 * ```
 */
import {
    ContentWrapper,
    SectionContainer,
    SectionHeader,
    StackingCard,
    StackingFeatureCard,
} from '@/components/shared'
import type { Feature } from '@/lib/types/sections'

export type StackingFeaturesSectionProps = {
    /** Section title */
    title: string
    /** Section description */
    description?: string
    /** Array of feature items */
    features: Feature[]
    /** Background variant */
    variant?: 'default' | 'muted' | 'accent'
    /** Additional CSS classes */
    className?: string
    /** Section ID for anchor links */
    id?: string
}

/**
 * StackingFeaturesSection with Apple-style stacking scroll effect
 *
 * Features:
 * - Single-column layout for maximum stacking effect
 * - Each card in a StackingCard wrapper for travel path
 * - Section header remains static at top
 * - Narrower content width for better focus
 * - Larger section padding for emphasis
 */
export function StackingFeaturesSection({
    title,
    description,
    features,
    variant = 'default',
    className,
    id,
}: StackingFeaturesSectionProps) {
    return (
        <SectionContainer
            variant={variant}
            id={id}
            className={className}
            paddingY='py-20 md:py-32'
        >
            <ContentWrapper size='md'>
                {/* Section Header - remains static */}
                <SectionHeader
                    title={title}
                    description={description}
                    align='center'
                    className='mb-16 md:mb-20'
                />

                {/* Stacking Cards Container */}
                <div className='space-y-0'>
                    {features.map((feature, index) => (
                        <StackingCard
                            key={`${feature.title}-${index}`}
                            index={index}
                            total={features.length}
                        >
                            <StackingFeatureCard
                                title={feature.title}
                                description={feature.description}
                                imageSrc={
                                    feature.imageSrc || '/images/hero.jpg'
                                }
                                imageAlt={feature.imageAlt || feature.title}
                            />
                        </StackingCard>
                    ))}
                </div>
            </ContentWrapper>
        </SectionContainer>
    )
}
