import { cn } from '@workspace/ui/lib/utils'

interface ContainerLayoutProps {
    children: React.ReactNode
    className?: string
    size?: 'default' | 'sm' | 'lg' | 'xl' | 'full'
}

export function ContainerLayout({
    children,
    className,
    size = 'default',
}: ContainerLayoutProps) {
    const sizeClasses = {
        default: 'container mx-auto px-4 sm:px-6 lg:px-8',
        sm: 'container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8',
        lg: 'container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8',
        xl: 'container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
        full: 'w-full px-4 sm:px-6 lg:px-8',
    }

    return <div className={cn(sizeClasses[size], className)}>{children}</div>
}
