/**
 * StackingFeatureCard Component
 *
 * A visually rich feature card designed for the stacking scroll effect.
 * Includes an image, icon, title, and description in an elegant layout.
 *
 * @example
 * ```tsx
 * <StackingFeatureCard
 *   icon={Zap}
 *   title="Fast Development"
 *   description="Ship faster with our tools"
 *   imageSrc="/images/feature-1.jpg"
 *   imageAlt="Development tools"
 * />
 * ```
 */
import { cn } from '@workspace/ui/lib/utils'
import Image from 'next/image'

export type StackingFeatureCardProps = {
    /** Feature title */
    title: string
    /** Feature description */
    description: string
    /** Image source path */
    imageSrc: string
    /** Image alt text */
    imageAlt: string
    /** Additional CSS classes */
    className?: string
}

export function StackingFeatureCard({
    title,
    description,
    imageSrc,
    imageAlt,
    className,
}: StackingFeatureCardProps) {
    return (
        <div
            className={cn(
                'group border-border/50 bg-background relative overflow-hidden rounded-2xl border shadow-2xl',
                'transition-all duration-300',
                className
            )}
        >
            {/* Image Section - Top Half */}
            <div className='bg-muted/30 relative h-64 w-full overflow-hidden md:h-80'>
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                {/* Gradient Overlay */}
                <div className='to-background/80 absolute inset-0 bg-gradient-to-b from-transparent via-transparent' />
            </div>

            {/* Content Section - Bottom Half - Centered */}
            <div className='relative flex flex-col items-center space-y-4 p-8 text-center md:p-10'>
                {/* Title */}
                <h3 className='text-foreground text-2xl font-bold tracking-tight md:text-3xl'>
                    {title}
                </h3>

                {/* Description */}
                <p className='text-muted-foreground text-base leading-relaxed md:text-lg'>
                    {description}
                </p>
            </div>
        </div>
    )
}
