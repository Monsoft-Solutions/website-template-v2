/**
 * ContentWrapper Type Definitions
 *
 * Type definitions for the ContentWrapper component which provides
 * max-width constraints and horizontal padding for content containers.
 */
import type { ReactNode } from 'react'

/**
 * Max width size options for content wrapper
 */
export type ContentWrapperSize =
    | 'sm' // max-w-3xl
    | 'md' // max-w-5xl
    | 'lg' // max-w-7xl
    | 'xl' // max-w-screen-2xl
    | 'full' // max-w-full

/**
 * Props for the ContentWrapper component
 */
export interface ContentWrapperProps {
    /**
     * Child elements to render inside the wrapper
     */
    readonly children: ReactNode

    /**
     * Max width size variant
     * @default 'lg'
     */
    readonly size?: ContentWrapperSize

    /**
     * Additional CSS classes
     */
    readonly className?: string

    /**
     * Whether to remove default horizontal padding
     * @default false
     */
    readonly noPadding?: boolean

    /**
     * Custom horizontal padding (overrides default px-6)
     */
    readonly paddingX?: string
}
