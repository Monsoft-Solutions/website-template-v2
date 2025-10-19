import type { ReactNode } from 'react'

type CalloutBoxProps = {
    children: ReactNode
    type?: 'info' | 'warning' | 'success' | 'error'
}

export function CalloutBox({ children, type = 'info' }: CalloutBoxProps) {
    const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100',
        warning:
            'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-100',
        success:
            'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-100',
        error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100',
    }

    return (
        <div className={`my-6 rounded-r-lg border-l-4 p-6 ${styles[type]}`}>
            {children}
        </div>
    )
}
