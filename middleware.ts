import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'zh']
const defaultLocale = 'zh'

// Paths that should not be prefixed with locale
const publicFiles = [
  '/favicon.ico',
  '/icon.svg',
  '/icon-light-32x32.png',
  '/icon-dark-32x32.png',
  '/apple-icon.png',
]

function getLocale(request: NextRequest): string {
  // Check cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().substring(0, 2))
      .find((lang) => locales.includes(lang))
    if (preferredLocale) {
      return preferredLocale
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip public files and API routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    publicFiles.some((file) => pathname === file) ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Skip admin routes (no i18n for admin)
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  newUrl.search = request.nextUrl.search

  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!_next|api|images|.*\\..*).*)'],
}
