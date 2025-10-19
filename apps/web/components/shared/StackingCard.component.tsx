/**
 * StackingCard Component
 *
 * A wrapper component that creates a stacking scroll effect for cards.
 * Cards travel up through a vertical path and pin to the top of the viewport,
 * stacking on top of each other with subtle scaling animations.
 *
 * Features dynamic "push" effect where static cards start moving when
 * the incoming card is 50% overlapped.
 *
 * @example
 * ```tsx
 * <StackingCard index={0} total={6}>
 *   <IconCard icon={Zap} title="Feature" description="Description" />
 * </StackingCard>
 * ```
 */
'use client'

import { cn } from '@workspace/ui/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

export type StackingCardProps = {
    /** Child content to be wrapped with stacking effect */
    children: ReactNode
    /** Zero-based index of the card in the stack */
    index: number
    /** Total number of cards in the stack */
    total: number
    /** Additional CSS classes */
    className?: string
}

/**
 * StackingCard creates the stacking scroll effect using:
 * - Large container height for the "travel path"
 * - Sticky positioning to pin cards at the top
 * - Scale transforms for depth perception
 * - z-index layering for proper stacking order
 */
export function StackingCard({
    children,
    index,
    total,
    className,
}: StackingCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!cardRef.current) return

            const card = cardRef.current
            const cardRect = card.getBoundingClientRect()
            const stickyTop = 80 // Header height
            const cardHeight = cardRect.height

            // Calculate how much the card has "traveled" past the sticky point
            // When cardRect.top reaches stickyTop, it starts sticking
            // Progress is how much of the next card is overlapping this one
            const distanceFromSticky = stickyTop - cardRect.top
            const progress = Math.max(
                0,
                Math.min(1, distanceFromSticky / (cardHeight * 0.5))
            )

            setScrollProgress(progress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Calculate sticky top position (all cards stick at same position)
    const topOffset = 80 // 80px base (header height)

    // Calculate z-index (incoming cards stack OVER previous ones)
    const zIndex = index

    // Last card needs less height to avoid excessive bottom spacing
    const isLastCard = index === total - 1
    const containerHeight = isLastCard ? 'min-h-[80vh]' : 'min-h-[120vh]'

    // Dynamic scale based on scroll progress
    // When next card is 50% overlapped, this card starts scaling down
    const scale = 1 - scrollProgress * 0.1 // Scale down by 10% max

    return (
        <div
            className={cn(
                'flex items-start',
                containerHeight,
                'md:items-center',
                className
            )}
            style={{ zIndex }}
        >
            <div
                ref={cardRef}
                className={cn(
                    'sticky w-full transition-all duration-300 ease-out',
                    'shadow-lg'
                )}
                style={{
                    top: `${topOffset}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                }}
            >
                <div
                    className='transition-opacity duration-300'
                    style={{ opacity: 0.95 + scrollProgress * 0.05 }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}
