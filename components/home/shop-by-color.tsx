'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/locale-context'

const bagTypes = [
  { key: 'tote', nameZh: '托特包', nameEn: 'Tote', abbrev: 'T' },
  { key: 'crossbody', nameZh: '斜挎包', nameEn: 'Crossbody', abbrev: 'C' },
  { key: 'clutch', nameZh: '手拿包', nameEn: 'Clutch', abbrev: 'Cl' },
  { key: 'bucket', nameZh: '水桶包', nameEn: 'Bucket', abbrev: 'B' },
]

export function ShopByColor() {
  const { locale } = useLocale()

  const label = locale === 'en' ? 'Shop by Bag Type' : '按包型选购'

  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="text-center">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Shop by Bag Type
          </span>
          <h2 className="mt-2 font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
            {label}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {bagTypes.map((type) => (
            <Link
              key={type.key}
              href={`/${locale}/bags?category=${type.key}`}
              className="group flex flex-col items-center gap-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted/60 text-xs font-medium tracking-wide text-foreground transition-transform duration-500 group-hover:scale-110 lg:h-20 lg:w-20">
                {type.abbrev}
              </div>
              <span className="text-xs tracking-wide text-muted-foreground transition-colors group-hover:text-foreground">
                {locale === 'en' ? type.nameEn : type.nameZh}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
