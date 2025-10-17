import type { MobileCallButtonPosition } from './mobile-call-button-position.type'
import type { MobileCallButtonStyle } from './mobile-call-button-style.type'

/**
 * Mobile Call Button Props
 *
 * Props interface for the MobileCallButton component.
 */
export type MobileCallButtonProps = {
    /**
     * Position of the button on the screen
     * Note: When `isBanner` is true, position is forced to 'bottom-center'
     * @default 'bottom-center'
     */
    position?: MobileCallButtonPosition

    /**
     * Style variant of the button
     * @default 'icon-text'
     */
    style?: MobileCallButtonStyle

    /**
     * Enable banner mode
     * When true, the button appears as a full-width banner with background at the bottom
     * Position is forced to center and takes full width
     * @default false
     */
    isBanner?: boolean
}
