/**
 * AboutPreviewSection Component
 *
 * A preview section for the About page with image, company overview, and "Learn More" CTA.
 * Leverages the ImageSection component internally with preset configurations.
 *
 * @example
 * ```tsx
 * <AboutPreviewSection
 *   title="About Our Company"
 *   description="We've been delivering excellence since 2010..."
 *   imageSrc="/images/about-preview.jpg"
 *   imageAlt="Our team at work"
 *   imagePosition="left"
 * />
 * ```
 */
import { ImageSection } from '@/components/shared'
import type { AboutPreviewSectionProps } from '@/lib/types/sections/about-preview-section.type'

export function AboutPreviewSection({
    badge = 'About Us',
    title,
    description,
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
    buttonText = 'Learn More',
    buttonHref = '/about',
    imagePosition = 'left',
    variant = 'muted',
    className,
    id,
    aspectRatio = 'aspect-square',
}: AboutPreviewSectionProps) {
    return (
        <ImageSection
            image={{
                src: imageSrc,
                alt: imageAlt,
                width: imageWidth,
                height: imageHeight,
                priority: false,
                aspectRatio: aspectRatio,
            }}
            badge={badge}
            title={title}
            description={description}
            primaryButton={{
                text: buttonText,
                href: buttonHref,
                variant: 'default',
            }}
            imagePosition={imagePosition}
            variant={variant}
            contentAlign='start'
            className={className}
            id={id}
        />
    )
}
