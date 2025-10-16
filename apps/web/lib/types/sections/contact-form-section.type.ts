/**
 * Contact Form Section Type Definitions
 *
 * Type definitions for the contact form section component.
 * This section contains the main contact form for user inquiries.
 */
import type { CommonSectionProps, SectionWithHeader } from './section.type'

/**
 * Props for the ContactFormSection component
 * Extends common section props with optional header content
 */
export interface ContactFormSectionProps
    extends CommonSectionProps,
        SectionWithHeader {}
