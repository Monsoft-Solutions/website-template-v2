/**
 * Header Component
 *
 * Main site header with responsive navigation, mobile menu, and theme toggle
 */

'use client'

import { Button } from '@workspace/ui/components/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@workspace/ui/components/sheet'
import { cn } from '@workspace/ui/lib/utils'
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { mainNavigation } from '@/lib/data/navigation'

/**
 * Header Component
 *
 * Main site header with responsive navigation, mobile menu, and theme toggle
 */

export function Header() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Handle theme toggle only after component is mounted
    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle scroll behavior for sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === href
        }
        return pathname?.startsWith(href)
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <header
            className={cn(
                'bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur transition-shadow',
                isScrolled && 'shadow-sm'
            )}
        >
            <div className='container mx-auto max-w-7xl px-6'>
                <div className='flex h-16 items-center justify-between'>
                    {/* Logo / Brand */}
                    <Link
                        href='/'
                        className='flex items-center space-x-2 text-xl font-bold transition-opacity hover:opacity-80'
                        aria-label='Home'
                    >
                        <span>YourBrand</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav
                        className='hidden items-center space-x-1 md:flex'
                        aria-label='Main navigation'
                    >
                        {mainNavigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                                    'hover:bg-accent hover:text-accent-foreground',
                                    isActive(item.href)
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-foreground/60'
                                )}
                                aria-current={
                                    isActive(item.href) ? 'page' : undefined
                                }
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className='flex items-center space-x-2'>
                        {/* Theme Toggle */}
                        {mounted && (
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={toggleTheme}
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                className='hidden md:flex'
                            >
                                {theme === 'dark' ? (
                                    <Sun className='h-5 w-5' />
                                ) : (
                                    <Moon className='h-5 w-5' />
                                )}
                            </Button>
                        )}

                        {/* Mobile Menu */}
                        <Sheet
                            open={isMobileMenuOpen}
                            onOpenChange={setIsMobileMenuOpen}
                        >
                            <SheetTrigger asChild>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    className='md:hidden'
                                    aria-label='Open menu'
                                >
                                    <Menu className='h-5 w-5' />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side='right'
                                className='w-[300px] sm:w-[400px]'
                            >
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <nav
                                    className='mt-8 flex flex-col space-y-4'
                                    aria-label='Mobile navigation'
                                >
                                    {mainNavigation.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className={cn(
                                                'rounded-md px-4 py-3 text-base font-medium transition-colors',
                                                'hover:bg-accent hover:text-accent-foreground',
                                                isActive(item.href)
                                                    ? 'bg-accent text-accent-foreground'
                                                    : 'text-foreground/60'
                                            )}
                                            aria-current={
                                                isActive(item.href)
                                                    ? 'page'
                                                    : undefined
                                            }
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    {/* Theme Toggle for Mobile */}
                                    {mounted && (
                                        <Button
                                            variant='outline'
                                            onClick={toggleTheme}
                                            className='h-auto justify-start px-4 py-3'
                                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                        >
                                            {theme === 'dark' ? (
                                                <>
                                                    <Sun className='mr-2 h-5 w-5' />
                                                    <span>Light Mode</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Moon className='mr-2 h-5 w-5' />
                                                    <span>Dark Mode</span>
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            {/* Skip to content link for accessibility */}
            <a
                href='#main-content'
                className='focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2'
            >
                Skip to content
            </a>
        </header>
    )
}
