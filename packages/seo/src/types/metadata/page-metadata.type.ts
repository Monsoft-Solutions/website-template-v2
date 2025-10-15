/**
 * PageMetadata
 *
 * Describes per-page metadata fields used to generate head tags.
 */
import type { ImageMetadata } from '../../config/seo-config.type'

export type PageMetadata = {
    title: string
    description: string
    keywords?: string[]
    authors?: { name: string; url?: string }[]
    robots?: string
    canonicalUrl?: string
    images?: ImageMetadata[]
    locale?: string
}
