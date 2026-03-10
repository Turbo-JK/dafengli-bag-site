'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { Locale } from './i18n'
import { defaultLocale, isValidLocale, locales } from './i18n'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const COOKIE_NAME = 'NEXT_LOCALE'

interface LocaleProviderProps {
  children: ReactNode
  initialLocale?: Locale
}

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract locale from current path
  const pathLocale = pathname.split('/')[1]
  const currentLocale: Locale = isValidLocale(pathLocale) ? pathLocale : (initialLocale || defaultLocale)
  
  const [locale, setLocaleState] = useState<Locale>(currentLocale)

  // Sync locale with path changes
  useEffect(() => {
    const pathLocale = pathname.split('/')[1]
    if (isValidLocale(pathLocale) && pathLocale !== locale) {
      setLocaleState(pathLocale)
    }
  }, [pathname, locale])

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return

    // Set cookie for middleware
    document.cookie = `${COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; samesite=lax`
    
    // Navigate to new locale path while preserving the rest of the path
    const segments = pathname.split('/')
    const currentPathLocale = segments[1]
    
    let newPath: string
    if (locales.includes(currentPathLocale as Locale)) {
      // Replace the locale segment
      segments[1] = newLocale
      newPath = segments.join('/')
    } else {
      // Prepend the locale
      newPath = `/${newLocale}${pathname}`
    }
    
    setLocaleState(newLocale)
    router.push(newPath)
  }, [locale, pathname, router])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
