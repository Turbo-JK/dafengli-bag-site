'use client'

import Image from 'next/image'
import Link from 'next/link'
import { lookbookItems } from '@/lib/mock-data'
import { useLocale } from '@/lib/locale-context'

export function LookbookPreview() {
  const { locale } = useLocale()
  const items = lookbookItems.slice(0, 3)

  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Lookbook
            </span>
            <h2 className="mt-2 font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
              {locale === 'en' ? 'Style Inspiration' : '穿搭灵感'}
            </h2>
          </div>
          <Link
            href={`/${locale}/lookbook`}
            className="hidden border-b border-foreground pb-1 text-xs tracking-[0.15em] uppercase text-foreground transition-opacity hover:opacity-60 md:inline-block"
          >
            {locale === 'en' ? 'View All' : '查看全部'}
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Link key={item.id} href={`/${locale}/lookbook`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl text-background">{item.title}</h3>
                  <p className="mt-1 text-xs text-background/70">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href={`/${locale}/lookbook`}
            className="inline-block border-b border-foreground pb-1 text-xs tracking-[0.15em] uppercase text-foreground"
          >
            {locale === 'en' ? 'View All' : '查看全部'}
          </Link>
        </div>
      </div>
    </section>
  )
}
