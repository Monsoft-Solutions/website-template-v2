/**
 * GalleryImage Type
 *
 * Generic type definition for gallery images used across the application.
 * Supports lightbox galleries, image grids, and portfolio displays.
 *
 * Used in:
 * - Gallery component (shared)
 * - Service pages
 * - Portfolio pages
 * - Blog image galleries
 *
 * @example
 * ```tsx
 * const images: GalleryImage[] = [
 *   {
 *     url: '/images/project-1.jpg',
 *     alt: 'Project showcase',
 *     caption: 'E-commerce platform',
 *     width: 1920,
 *     height: 1080
 *   }
 * ]
 * ```
 */

/**
 * Single gallery image with optional dimensions and caption
 *
 * @property url - Image URL path (relative to public directory or absolute URL)
 * @property alt - Alt text for accessibility and SEO
 * @property caption - Optional caption displayed in lightbox or on hover
 * @property width - Optional image width in pixels (for aspect ratio optimization)
 * @property height - Optional image height in pixels (for aspect ratio optimization)
 */
export type GalleryImage = {
    /**
     * Image URL path
     * Should be relative to public directory (e.g., '/images/gallery/...')
     * or absolute URL for external images
     */
    readonly url: string

    /**
     * Alt text for the image
     * Required for accessibility and SEO
     */
    readonly alt: string

    /**
     * Optional caption displayed on hover or in lightbox
     * Provides additional context about the image
     */
    readonly caption?: string

    /**
     * Optional image width in pixels
     * Used for aspect ratio calculation and optimization
     */
    readonly width?: number

    /**
     * Optional image height in pixels
     * Used for aspect ratio calculation and optimization
     */
    readonly height?: number
}
