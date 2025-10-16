/**
 * Navigation Type Definitions
 *
 * Type definitions for navigation items and menu structures
 */

export interface NavigationItem {
    readonly label: string
    readonly href: string
    readonly external?: boolean
    readonly description?: string
}

export interface NavigationSection {
    readonly title: string
    readonly items: NavigationItem[]
}

export interface SocialLink {
    readonly platform: string
    readonly url: string
    readonly icon?: string
    readonly label?: string
}

export interface ContactInfo {
    readonly phone: string
    readonly email: string
    readonly address?: string
}
