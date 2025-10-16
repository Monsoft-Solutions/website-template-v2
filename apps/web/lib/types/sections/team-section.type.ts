/**
 * TeamSection Type Definitions
 *
 * Type definitions for the TeamSection component which displays
 * team members with avatars, roles, and social links.
 */
import type {
    CommonSectionProps,
    ReactNode,
    SectionWithColumns,
    SectionWithVariant,
} from './section.type'

/**
 * Social media links for team member
 */
export interface TeamMemberSocial {
    readonly twitter?: string
    readonly linkedin?: string
    readonly github?: string
    readonly email?: string
}

/**
 * Individual team member
 */
export interface TeamMember {
    /**
     * Team member name
     */
    readonly name: string

    /**
     * Team member role/title
     */
    readonly role: string

    /**
     * Optional short bio
     */
    readonly bio?: string

    /**
     * Avatar image URL
     */
    readonly avatar: string

    /**
     * Optional social media links
     */
    readonly social?: TeamMemberSocial
}

/**
 * Props for the TeamSection component
 * Extends base props with grid layout and team-specific fields
 */
export interface TeamSectionProps
    extends CommonSectionProps,
        SectionWithColumns,
        SectionWithVariant {
    /**
     * Optional badge/label above the headline
     */
    readonly badge?: string

    /**
     * Section headline (required)
     */
    readonly headline: string

    /**
     * Section description
     */
    readonly description?: string | ReactNode

    /**
     * Array of team members
     */
    readonly members: TeamMember[]
}
