/**
 * MissionSection Type Definitions
 *
 * Type definitions for the MissionSection component which displays
 * Mission, Vision, and Values in a 3-column grid layout.
 */
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Individual mission item (Mission, Vision, or Values)
 */
export interface MissionItem {
    /**
     * Lucide icon component
     */
    icon: LucideIcon

    /**
     * Item title
     */
    title: string

    /**
     * Item description
     */
    description: string | ReactNode

    /**
     * Optional ARIA label
     */
    ariaLabel?: string
}

/**
 * Props for the MissionSection component
 */
export interface MissionSectionProps {
    /**
     * Section ID for linking and tracking
     */
    id?: string

    /**
     * Optional badge/label above the headline
     */
    badge?: string

    /**
     * Section headline
     */
    headline?: string

    /**
     * Section description
     */
    description?: string | ReactNode

    /**
     * Array of mission items (Mission, Vision, Values)
     */
    items: MissionItem[]

    /**
     * Section background variant
     * @default 'default'
     */
    variant?: 'default' | 'muted' | 'accent'

    /**
     * Additional CSS classes
     */
    className?: string
}
