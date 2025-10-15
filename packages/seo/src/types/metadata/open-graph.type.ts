/**
 * OpenGraphMetadata
 */
import type { ImageMetadata } from '../../config/seo-config.type'

export type OpenGraphMetadata = {
    type:
        | 'website'
        | 'article'
        | 'profile'
        | 'book'
        | 'music.song'
        | 'music.album'
        | 'music.playlist'
        | 'music.radio_station'
        | 'video.movie'
        | 'video.episode'
        | 'video.tv_show'
        | 'video.other'
    siteName?: string
    url?: string
    title?: string
    description?: string
    images?: ImageMetadata[]
    locale?: string
}
