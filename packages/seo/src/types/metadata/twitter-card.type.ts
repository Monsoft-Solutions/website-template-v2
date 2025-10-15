/**
 * TwitterCardMetadata
 */
import type { ImageMetadata } from '../../config/seo-config.type'

export type TwitterCardMetadata = {
    card: 'summary' | 'summary_large_image' | 'app' | 'player'
    site?: string
    creator?: string
    title?: string
    description?: string
    images?: ImageMetadata[]
}
