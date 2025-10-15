/**
 * Navigation Type Definitions
 *
 * Type definitions for navigation items and menu structures
 */

export interface NavigationItem {
    label: string
    href: string
    external?: boolean
    description?: string
}

export interface NavigationSection {
    title: string
    items: NavigationItem[]
}

export interface SocialLink {
    platform: string
    url: string
    icon?: string
    label?: string
}

export interface ContactInfo {
    phone: string
    email: string
    address?: string
}
