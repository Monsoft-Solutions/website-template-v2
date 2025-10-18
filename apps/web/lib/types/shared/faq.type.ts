/**
 * FAQ Type
 *
 * Type definition for frequently asked questions sections.
 * Can be used across any page or component that displays FAQs.
 *
 * Used in:
 * - Service pages
 * - Product pages
 * - Support pages
 * - FAQ component
 */

/**
 * Single FAQ item
 *
 * Represents a question and answer pair for FAQ sections.
 */
export type FaqItem = {
    /**
     * The question text
     * Should be clear and concise
     */
    readonly question: string

    /**
     * The answer text
     * Can be multiple sentences providing detailed information
     */
    readonly answer: string
}
