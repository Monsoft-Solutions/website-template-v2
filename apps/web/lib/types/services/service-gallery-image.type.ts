/**
 * ServiceGalleryImage Type
 *
 * Type definition for gallery images in service pages.
 *
 * Used in:
 * - Service data structure
 * - ServiceGallery component
 */

/**
 * Single gallery image
 *
 * Represents an image in the service gallery with optional caption.
 */
export type ServiceGalleryImage = {
    /**
     * Image URL path
     * Should be relative to public directory (e.g., '/images/services/projects/...')
     */
    readonly url: string

    /**
     * Alt text for the image
     * Used for accessibility and SEO
     */
    readonly alt: string

    /**
     * Optional caption displayed on hover/in lightbox
     * Provides additional context about the image
     */
    readonly caption?: string
}
