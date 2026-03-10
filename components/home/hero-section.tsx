'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/lib/locale-context'
import { t } from '@/lib/i18n'

export function HeroSection() {
  const { locale } = useLocale()

  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <Image
        src="/images/hero.jpg"
        alt="DAFENGLI luxury handbag"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-foreground/10" />
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-background/80">
          {t(locale, 'hero.subtitle')}
        </span>
        <h1 className="font-serif text-4xl leading-tight tracking-wide text-background md:text-6xl lg:text-7xl text-balance">
          {t(locale, 'hero.title_1')}
          <br />
          {t(locale, 'hero.title_2')}
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-background/80">
          {t(locale, 'hero.desc')}
        </p>
        <Link
          href={`/${locale}/bags`}
          className="mt-4 border border-background px-10 py-3.5 text-xs tracking-[0.2em] uppercase text-background transition-all duration-500 hover:bg-background hover:text-foreground"
        >
          {t(locale, 'hero.cta')}
        </Link>
      </div>
    </section>
  )
}
