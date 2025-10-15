/**
 * TeamSection Type Definitions
 *
 * Type definitions for the TeamSection component which displays
 * team members with avatars, roles, and social links.
 */
import type { ReactNode } from 'react'

/**
 * Social media links for team member
 */
export interface TeamMemberSocial {
    twitter?: string
    linkedin?: string
    github?: string
    email?: string
}

/**
 * Individual team member
 */
export interface TeamMember {
    /**
     * Team member name
     */
    name: string

    /**
     * Team member role/title
     */
    role: string

    /**
     * Optional short bio
     */
    bio?: string

    /**
     * Avatar image URL
     */
    avatar: string

    /**
     * Optional social media links
     */
    social?: TeamMemberSocial
}

/**
 * Props for the TeamSection component
 */
export interface TeamSectionProps {
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
    headline: string

    /**
     * Section description
     */
    description?: string | ReactNode

    /**
     * Array of team members
     */
    members: TeamMember[]

    /**
     * Number of columns for grid layout
     * @default 3
     */
    columns?: 2 | 3 | 4

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
