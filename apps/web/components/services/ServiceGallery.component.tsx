/**
 * ServiceGallery Component
 *
 * Displays a gallery of project images with lightbox functionality for service detail pages.
 * Features responsive grid layout and click-to-expand image preview.
 *
 * Features:
 * - Responsive grid (2 cols tablet, 3 cols desktop)
 * - Image lightbox with full-size preview
 * - Navigation between images in lightbox
 * - Hover overlay with caption
 * - Lazy loading with Next.js Image optimization
 * - Keyboard navigation (ESC to close, arrow keys for navigation)
 *
 * @example
 * ```tsx
 * <ServiceGallery
 *   images={[
 *     { url: '/images/project-1.jpg', alt: 'Project 1', caption: 'E-commerce platform' },
 *     { url: '/images/project-2.jpg', alt: 'Project 2', caption: 'Mobile app' }
 *   ]}
 *   title="Project Gallery"
 *   description="Examples of our work"
 * />
 * ```
 */
'use client'

import {
    Dialog,
    DialogContent,
    DialogTitle,
} from '@workspace/ui/components/dialog'
import { cn } from '@workspace/ui/lib/utils'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import type { ServiceGalleryImage } from '@/lib/types/services'

import { ContentWrapper, SectionContainer, SectionHeader } from '../shared'

/**
 * ServiceGallery Component Props
 */
export type ServiceGalleryProps = {
    /**
     * Array of gallery images to display
     */
    readonly images: ServiceGalleryImage[]

    /**
     * Optional section title
     * @default "Project Gallery"
     */
    readonly title?: string

    /**
     * Optional section description
     */
    readonly description?: string

    /**
     * Background variant for the section
     * @default "default"
     */
    readonly variant?: 'default' | 'muted' | 'accent'

    /**
     * Optional section ID for anchor links
     */
    readonly id?: string

    /**
     * Optional additional CSS classes
     */
    readonly className?: string
}

/**
 * ServiceGallery Component
 *
 * Renders a responsive grid of images with click-to-expand lightbox.
 */
export function ServiceGallery({
    images,
    title = 'Project Gallery',
    description,
    variant = 'default',
    id = 'gallery',
    className,
}: ServiceGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null
    )
    const [isOpen, setIsOpen] = useState(false)

    // Handle empty images array
    if (!images || images.length === 0) {
        return null
    }

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index)
        setIsOpen(true)
    }

    const closeLightbox = () => {
        setIsOpen(false)
        setSelectedImageIndex(null)
    }

    const goToPrevious = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1)
        }
    }

    const goToNext = () => {
        if (
            selectedImageIndex !== null &&
            selectedImageIndex < images.length - 1
        ) {
            setSelectedImageIndex(selectedImageIndex + 1)
        }
    }

    const selectedImage =
        selectedImageIndex !== null ? images[selectedImageIndex] : null

    return (
        <>
            <SectionContainer variant={variant} id={id} className={className}>
                <ContentWrapper size='lg'>
                    {/* Section Header */}
                    <SectionHeader
                        title={title}
                        description={description}
                        align='center'
                        className='mb-12'
                    />

                    {/* Gallery Grid */}
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {images.map((image, index) => (
                            <GalleryImageCard
                                key={`gallery-${index}`}
                                image={image}
                                onClick={() => openLightbox(index)}
                            />
                        ))}
                    </div>
                </ContentWrapper>
            </SectionContainer>

            {/* Lightbox Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent
                    className={cn('max-w-7xl p-0', 'border-none bg-black/95')}
                >
                    <DialogTitle className='sr-only'>
                        {selectedImage?.alt || 'Gallery image'}
                    </DialogTitle>

                    {selectedImage && (
                        <div className='relative flex items-center justify-center'>
                            {/* Close Button */}
                            <button
                                onClick={closeLightbox}
                                className={cn(
                                    'absolute top-4 right-4 z-50',
                                    'rounded-full bg-black/50 p-2',
                                    'text-white transition-colors hover:bg-black/70'
                                )}
                                aria-label='Close gallery'
                            >
                                <X className='size-6' />
                            </button>

                            {/* Navigation Buttons */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={goToPrevious}
                                        disabled={selectedImageIndex === 0}
                                        className={cn(
                                            'absolute top-1/2 left-4 z-50 -translate-y-1/2',
                                            'rounded-full bg-black/50 p-3',
                                            'text-white transition-colors hover:bg-black/70',
                                            'disabled:cursor-not-allowed disabled:opacity-30'
                                        )}
                                        aria-label='Previous image'
                                    >
                                        <ChevronLeft className='size-6' />
                                    </button>

                                    <button
                                        onClick={goToNext}
                                        disabled={
                                            selectedImageIndex ===
                                            images.length - 1
                                        }
                                        className={cn(
                                            'absolute top-1/2 right-4 z-50 -translate-y-1/2',
                                            'rounded-full bg-black/50 p-3',
                                            'text-white transition-colors hover:bg-black/70',
                                            'disabled:cursor-not-allowed disabled:opacity-30'
                                        )}
                                        aria-label='Next image'
                                    >
                                        <ChevronRight className='size-6' />
                                    </button>
                                </>
                            )}

                            {/* Image */}
                            <div className='relative aspect-video w-full'>
                                <Image
                                    src={selectedImage.url}
                                    alt={selectedImage.alt}
                                    fill
                                    className='object-contain'
                                    sizes='100vw'
                                    priority
                                />
                            </div>

                            {/* Caption */}
                            {selectedImage.caption && (
                                <div className='absolute right-0 bottom-0 left-0 bg-black/70 p-4 text-center'>
                                    <p className='text-sm text-white md:text-base'>
                                        {selectedImage.caption}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

/**
 * Individual Gallery Image Card Component
 */
type GalleryImageCardProps = {
    readonly image: ServiceGalleryImage
    readonly onClick: () => void
}

function GalleryImageCard({ image, onClick }: GalleryImageCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'group relative aspect-video w-full overflow-hidden rounded-lg',
                'transition-transform hover:scale-[1.02]',
                'focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none'
            )}
        >
            <Image
                src={image.url}
                alt={image.alt}
                fill
                className='object-cover transition-transform group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />

            {/* Hover Overlay */}
            {image.caption && (
                <div
                    className={cn(
                        'absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent',
                        'opacity-0 transition-opacity group-hover:opacity-100'
                    )}
                >
                    <p className='p-4 text-sm font-medium text-white md:text-base'>
                        {image.caption}
                    </p>
                </div>
            )}
        </button>
    )
}
