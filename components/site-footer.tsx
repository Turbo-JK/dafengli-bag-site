'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/locale-context'
import { t } from '@/lib/i18n'

export function SiteFooter() {
  const { locale } = useLocale()

  const getLocalizedHref = (path: string) => `/${locale}${path}`

  const footerNav = [
    {
      titleKey: 'footer.shop' as const,
      links: [
        { path: '/bags', labelKey: 'footer.allBags' as const },
        { path: '/bags?category=tote', label: 'Tote' },
        { path: '/bags?category=crossbody', label: locale === 'en' ? 'Crossbody' : '斜挎包' },
        { path: '/bags?category=clutch', label: locale === 'en' ? 'Clutch' : '手拿包' },
      ],
    },
    {
      titleKey: 'footer.brand' as const,
      links: [
        { path: '/about', labelKey: 'footer.aboutUs' as const },
        { path: '/stories', labelKey: 'footer.stories' as const },
        { path: '/lookbook', label: 'Lookbook' },
      ],
    },
    {
      titleKey: 'footer.help' as const,
      links: [
        { path: '/contact', labelKey: 'footer.contactUs' as const },
        { path: '/faq', labelKey: 'footer.faq' as const },
        { path: '/policies', labelKey: 'footer.policies' as const },
      ],
    },
  ]

  const services = [
    { titleKey: 'footer.service.shipping' as const, descKey: 'footer.service.shipping_desc' as const },
    { titleKey: 'footer.service.authentic' as const, descKey: 'footer.service.authentic_desc' as const },
    { titleKey: 'footer.service.consultant' as const, descKey: 'footer.service.consultant_desc' as const },
  ]

  return (
    <footer className="border-t border-border bg-background">
      {/* Services Bar */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-0 md:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={i}
              className={cn(
                'flex flex-col items-center gap-1 py-8 text-center',
                i < 2 && 'md:border-r md:border-border'
              )}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-foreground">
                {t(locale, service.titleKey)}
              </span>
              <span className="text-xs text-muted-foreground">
                {t(locale, service.descKey)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href={getLocalizedHref('')}>
              <span className="font-serif text-lg tracking-[0.3em] text-foreground">
                DAFENGLI
              </span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {locale === 'zh' ? (
                <>
                  广州市解放北路1339号柏丽NYC.A座一楼A1151档
                  <br />
                  联系人 Linda · <a href="tel:+8613926015626" className="hover:underline">13926015626</a>
                </>
              ) : (
                <>
                  Store: No.A1151, 1/F, Block A, Baili NYC, No.1339 Jiefang North Road, Guangzhou
                  <br />
                  Linda · <a href="tel:+8613926015626" className="hover:underline">+86 139 2601 5626</a>
                </>
              )}
            </p>
            <a
              href="https://wa.me/8613926015626"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              {t(locale, 'footer.whatsapp')}
            </a>
          </div>

          {/* Nav Columns */}
          {footerNav.map((section) => (
            <div key={section.titleKey}>
              <h3 className="text-xs tracking-[0.2em] uppercase text-foreground">
                {t(locale, section.titleKey)}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={getLocalizedHref(link.path)}
                      className="text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {'labelKey' in link ? t(locale, link.labelKey) : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-[11px] text-muted-foreground">
            {'© 2026 DAFENGLI. All rights reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={getLocalizedHref('/policies')}
              className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(locale, 'footer.privacy')}
            </Link>
            <Link
              href={getLocalizedHref('/policies')}
              className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(locale, 'footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
