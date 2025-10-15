/**
 * Section Type Definitions
 *
 * Base type definitions for reusable section components
 */
import type { ReactNode } from 'react'

export interface BaseSectionProps {
    className?: string
    children?: ReactNode
}

export interface SectionContainerProps extends BaseSectionProps {
    id?: string
    as?: 'section' | 'div' | 'article'
    variant?: 'default' | 'muted' | 'accent'
}

export interface SectionHeaderProps {
    title: string
    description?: string
    align?: 'left' | 'center' | 'right'
    className?: string
}

export interface FeatureCardProps {
    title: string
    description: string
    icon?: ReactNode
    href?: string
    className?: string
}

export interface CTASectionProps extends BaseSectionProps {
    title: string
    description?: string
    primaryButton?: {
        label: string
        href: string
    }
    secondaryButton?: {
        label: string
        href: string
    }
}

export interface IconCardProps {
    icon: ReactNode
    title: string
    description: string
    className?: string
}

export interface ImageSectionProps extends BaseSectionProps {
    imageSrc: string
    imageAlt: string
    title: string
    description: string
    imagePosition?: 'left' | 'right'
    ctaButton?: {
        label: string
        href: string
    }
}
