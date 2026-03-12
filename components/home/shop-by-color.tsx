'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/lib/locale-context'
import { getProductImageUrl } from '@/lib/image-utils'

const bagTypes = [
  { key: 'tote', nameZh: '托特包', nameEn: 'Tote', abbrev: 'T' },
  { key: 'crossbody', nameZh: '斜挎包', nameEn: 'Crossbody', abbrev: 'C' },
  { key: 'clutch', nameZh: '手拿包', nameEn: 'Clutch', abbrev: 'Cl' },
  { key: 'bucket', nameZh: '水桶包', nameEn: 'Bucket', abbrev: 'B' },
] as const

type CategoryIcons = Record<string, string | null>

export function ShopByColor() {
  const { locale } = useLocale()
  const [icons, setIcons] = useState<CategoryIcons>({})

  useEffect(() => {
    fetch('/api/category-icons')
      .then((res) => res.ok ? res.json() : {})
      .then((data: CategoryIcons) => setIcons(data))
      .catch(() => {})
  }, [])

  const label = locale === 'en' ? 'Shop by Bag Type' : '按包型选购'

  return (
    <section className="border-t border-border bg-[#F8F7F4] py-24 lg:py-32">
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
          {bagTypes.map((type) => {
            const imageUrl = icons[type.key] ? getProductImageUrl(icons[type.key]!) : null
            return (
              <Link
                key={type.key}
                href={`/${locale}/bags?category=${type.key}`}
                className="group flex flex-col items-center gap-4"
              >
                <div className="relative w-full aspect-[4/5] max-w-[280px] overflow-hidden bg-muted/40">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={locale === 'en' ? type.nameEn : type.nameZh}
                      fill
                      sizes="(max-width: 768px) 50vw, 280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-2xl font-medium tracking-wide text-muted-foreground">
                      {type.abbrev}
                    </span>
                  )}
                </div>
                <span className="w-full max-w-[280px] text-left text-xs font-medium tracking-[0.12em] uppercase text-foreground">
                  {locale === 'en' ? type.nameEn : type.nameZh}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
