/**
 * MissionSection Type Definitions
 *
 * Type definitions for the MissionSection component which displays
 * Mission, Vision, and Values in a 3-column grid layout.
 */
import type { LucideIcon } from 'lucide-react'

import type {
    CommonSectionProps,
    ReactNode,
    SectionWithHeader,
    SectionWithVariant,
} from './section.type'

/**
 * Individual mission item (Mission, Vision, or Values)
 */
export interface MissionItem {
    /**
     * Lucide icon component
     */
    readonly icon: LucideIcon

    /**
     * Item title
     */
    readonly title: string

    /**
     * Item description
     */
    readonly description: string | ReactNode

    /**
     * Optional ARIA label
     */
    readonly ariaLabel?: string
}

/**
 * Props for the MissionSection component
 * Extends base props with mission-specific items array
 */
export interface MissionSectionProps
    extends CommonSectionProps,
        SectionWithHeader,
        SectionWithVariant {
    /**
     * Array of mission items (Mission, Vision, Values)
     */
    readonly items: MissionItem[]
}
