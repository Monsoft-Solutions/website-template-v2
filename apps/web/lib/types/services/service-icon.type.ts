import type { LucideIcon } from 'lucide-react'

/**
 * Service Icon Configuration
 *
 * Defines how a service is visually represented.
 * Uses discriminated union for type safety and accessibility.
 *
 * @example Icon only
 * const config: ServiceIcon = {
 *     type: 'icon',
 *     icon: Code
 * }
 *
 * @example Image only
 * const config: ServiceIcon = {
 *     type: 'image',
 *     imagePath: '/images/services/web-dev.jpg',
 *     imageAlt: 'Web development workspace'
 * }
 *
 * @example Both icon and image
 * const config: ServiceIcon = {
 *     type: 'both',
 *     icon: Code,
 *     imagePath: '/images/services/web-dev.jpg',
 *     imageAlt: 'Web development workspace'
 * }
 */
export type ServiceIcon =
    | {
          /**
           * Icon-only display
           */
          readonly type: 'icon'
          /**
           * Lucide icon component
           */
          readonly icon: LucideIcon
      }
    | {
          /**
           * Image-only display
           */
          readonly type: 'image'
          /**
           * Image path relative to public directory
           */
          readonly imagePath: string
          /**
           * Required alt text for accessibility
           */
          readonly imageAlt: string
      }
    | {
          /**
           * Display both icon (for cards) and image (for hero)
           */
          readonly type: 'both'
          /**
           * Lucide icon component for card display
           */
          readonly icon: LucideIcon
          /**
           * Image path for hero section
           */
          readonly imagePath: string
          /**
           * Required alt text for accessibility
           */
          readonly imageAlt: string
      }
