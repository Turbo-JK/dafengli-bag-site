import { notFound } from 'next/navigation'
import { CartProvider } from '@/lib/cart-context'
import { LocaleProvider } from '@/lib/locale-context'
import type { Locale } from '@/lib/i18n'
import { locales } from '@/lib/i18n'
import '../globals.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <LocaleProvider initialLocale={locale as Locale}>
      <CartProvider>
        {children}
      </CartProvider>
    </LocaleProvider>
  )
}
