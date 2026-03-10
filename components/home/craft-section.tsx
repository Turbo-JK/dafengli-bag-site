'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from '@/lib/locale-context'
import { t } from '@/lib/i18n'

export function CraftSection() {
  const { locale } = useLocale()

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Craft Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/craft.jpg"
              alt={locale === 'en' ? 'Hand-stitching craftsmanship' : '手工缝制工艺'}
              fill
              className="object-cover"
            />
          </div>

          {/* Craft Text */}
          <div className="flex flex-col gap-8 lg:py-12">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {t(locale, 'craft.label')}
            </span>
            <h2 className="font-serif text-3xl leading-snug tracking-wide text-foreground lg:text-5xl text-balance">
              {t(locale, 'craft.title_1')}
              <br />
              {t(locale, 'craft.title_2')}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {t(locale, 'craft.desc')}
            </p>
            <Link
              href={`/${locale}/about`}
              className="mt-2 inline-flex w-fit border-b border-foreground pb-1 text-xs tracking-[0.15em] uppercase text-foreground transition-opacity hover:opacity-60"
            >
              {t(locale, 'craft.cta')}
            </Link>
          </div>
        </div>

        {/* Material Section */}
        <div className="mt-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8 lg:order-1 lg:py-12">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {t(locale, 'material.label')}
            </span>
            <h2 className="font-serif text-3xl leading-snug tracking-wide text-foreground lg:text-5xl text-balance">
              {t(locale, 'material.title_1')}
              <br />
              {t(locale, 'material.title_2')}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {t(locale, 'material.desc')}
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden lg:order-2">
            <Image
              src="/images/material.jpg"
              alt={locale === 'en' ? 'Premium leather material' : '顶级皮革材质'}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
