import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

type BreadcrumbItem = {
    label: string
    href?: string
}

type BreadcrumbsProps = {
    items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label='Breadcrumb' className='mb-8'>
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
                                        className='text-muted-foreground/40 h-4 w-4 flex-shrink-0'
                                        aria-hidden='true'
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <span className='text-foreground text-sm font-medium'>
                                    {item.label}
                                </span>
                                {index < items.length - 1 && (
                                    <ChevronRight
                                        className='text-muted-foreground/40 h-4 w-4 flex-shrink-0'
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
