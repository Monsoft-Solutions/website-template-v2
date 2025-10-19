/**
 * Stacking Component Type Definitions
 *
 * Comprehensive types for stacking scroll effect components with
 * configurable animations, variants, and accessibility options.
 */

/**
 * Stacking layout variant types
 */
export type StackingVariant = 'default' | 'compact' | 'spacious'

/**
 * Animation intensity levels
 */
export type AnimationIntensity = 'subtle' | 'normal' | 'dramatic'

/**
 * Stacking card configuration options
 */
export type StackingCardConfig = {
    /** Scale reduction amount (0-1, default: 0.15) */
    scaleAmount?: number
    /** 3D rotation amount in degrees (default: 2) */
    rotationAmount?: number
    /** Blur amount in pixels (default: 4) */
    blurAmount?: number
    /** Enable blur effect (default: true) */
    enableBlur?: boolean
    /** Enable 3D transforms (default: true) */
    enable3D?: boolean
    /** Horizontal offset amount in pixels (default: 10) */
    offsetAmount?: number
    /** Shadow intensity multiplier (default: 1) */
    shadowIntensity?: number
    /** Brightness reduction amount (0-1, default: 0.2) */
    brightnessReduction?: number
}

/**
 * Animation intensity preset configurations
 */
export const ANIMATION_PRESETS: Record<AnimationIntensity, StackingCardConfig> =
    {
        subtle: {
            scaleAmount: 0.08,
            rotationAmount: 1,
            blurAmount: 2,
            offsetAmount: 5,
            shadowIntensity: 0.5,
            brightnessReduction: 0.1,
        },
        normal: {
            scaleAmount: 0.15,
            rotationAmount: 2,
            blurAmount: 4,
            offsetAmount: 10,
            shadowIntensity: 1,
            brightnessReduction: 0.2,
        },
        dramatic: {
            scaleAmount: 0.25,
            rotationAmount: 4,
            blurAmount: 6,
            offsetAmount: 20,
            shadowIntensity: 1.5,
            brightnessReduction: 0.3,
        },
    }

/**
 * Stacking variant container height configurations
 */
export const STACKING_VARIANTS: Record<
    StackingVariant,
    { default: string; last: string }
> = {
    default: {
        default: 'min-h-[90vh]',
        last: 'min-h-[60vh]',
    },
    compact: {
        default: 'min-h-[70vh]',
        last: 'min-h-[50vh]',
    },
    spacious: {
        default: 'min-h-[120vh]',
        last: 'min-h-[80vh]',
    },
}
