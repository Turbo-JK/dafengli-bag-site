'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useLocale } from '@/lib/locale-context'
import { t } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from '@/components/language-switcher'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems } = useCart()
  const { locale, setLocale } = useLocale()

  // Navigation links with translations
  const navLinks = [
    { path: '/bags', labelKey: 'nav.bags' as const },
    { path: '/lookbook', labelKey: 'nav.lookbook' as const },
    { path: '/stories', labelKey: 'nav.stories' as const },
    { path: '/about', labelKey: 'nav.about' as const },
    { path: '/contact', labelKey: 'nav.contact' as const },
  ]

  const getLocalizedHref = (path: string) => `/${locale}${path}`

  // Check if current path matches (accounting for locale prefix)
  const isActive = (path: string) => {
    const localizedPath = `/${locale}${path}`
    return pathname === localizedPath || pathname?.startsWith(localizedPath + '/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border py-3'
            : 'bg-transparent py-6'
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
          {/* Left: Logo */}
          <Link href={getLocalizedHref('')} className="flex-shrink-0">
            <span className="font-serif text-xl tracking-[0.3em] font-medium text-foreground lg:text-2xl">
              DAFENGLI
            </span>
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={getLocalizedHref(link.path)}
                className={cn(
                  'text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:text-foreground',
                  isActive(link.path) ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {t(locale, link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-5">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-foreground transition-opacity hover:opacity-60"
              aria-label={locale === 'en' ? 'Search' : '搜索'}
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <Link
              href={getLocalizedHref('/cart')}
              className="relative text-foreground transition-opacity hover:opacity-60"
              aria-label={`${t(locale, 'cart.title')} (${totalItems})`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center bg-foreground text-[10px] text-background">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              href="#"
              className="hidden text-foreground transition-opacity hover:opacity-60 lg:block"
              aria-label={locale === 'en' ? 'Account' : '账户'}
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground transition-opacity hover:opacity-60 lg:hidden"
              aria-label={mobileOpen ? (locale === 'en' ? 'Close menu' : '关闭菜单') : (locale === 'en' ? 'Open menu' : '打开菜单')}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-500',
            searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="mx-auto max-w-[1400px] px-6 pb-4 pt-2 lg:px-10">
            <input
              type="text"
              placeholder={t(locale, 'search.placeholder')}
              className="w-full border-b border-foreground/20 bg-transparent py-2 text-sm tracking-wide text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              autoFocus={searchOpen}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background transition-all duration-500 lg:hidden',
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={getLocalizedHref(link.path)}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'font-serif text-2xl tracking-[0.2em] transition-colors duration-300',
                isActive(link.path) ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {t(locale, link.labelKey)}
            </Link>
          ))}
          <Link
            href={getLocalizedHref('/cart')}
            onClick={() => setMobileOpen(false)}
            className="mt-4 text-sm tracking-[0.15em] uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            {t(locale, 'cart.title')}{totalItems > 0 ? ` (${totalItems})` : ''}
          </Link>
        </nav>
      </div>
    </>
  )
}
