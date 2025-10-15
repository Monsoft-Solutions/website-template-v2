/**
 * Breadcrumbs Component
 *
 * A reusable breadcrumb navigation component that helps users understand
 * their current location within the site hierarchy. Includes proper
 * accessibility attributes and responsive styling.
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'About', href: '/about' },
 *     { label: 'Team' },
 *   ]}
 * />
 * ```
 */
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

/**
 * Individual breadcrumb item
 */
interface BreadcrumbItem {
    label: string
    href?: string
}

/**
 * Props for the Breadcrumbs component
 */
interface BreadcrumbsProps {
    /**
     * Array of breadcrumb items
     */
    items: BreadcrumbItem[]

    /**
     * Additional CSS classes
     */
    className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav aria-label='Breadcrumb' className={className}>
            <ol className='flex flex-wrap items-center gap-2'>
                {items.map((item, index) => (
                    <li
                        key={`${item.label}-${index}`}
                        className='flex items-center gap-2'
                    >
                        {item.href ? (
                            <>
                                <Link
                                    href={item.href}
                                    className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-200'
                                >
                                    {item.label}
                                </Link>
                                {index < items.length - 1 && (
                                    <ChevronRight
                                        className='text-muted-foreground/40 size-4 flex-shrink-0'
                                        aria-hidden='true'
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <span
                                    className='text-foreground text-sm font-medium'
                                    aria-current='page'
                                >
                                    {item.label}
                                </span>
                                {index < items.length - 1 && (
                                    <ChevronRight
                                        className='text-muted-foreground/40 size-4 flex-shrink-0'
                                        aria-hidden='true'
                                    />
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
