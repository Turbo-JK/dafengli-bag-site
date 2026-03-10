'use client'

import { useRef, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { useLocale } from '@/lib/locale-context'
import { t } from '@/lib/i18n'
import Link from 'next/link'
import type { Product } from '@/lib/types'

export function NewArrivals() {
  const { locale } = useLocale()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [newProducts, setNewProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchNew = async () => {
      try {
        const res = await fetch('/api/products?isNew=true&limit=12')
        if (!res.ok) return
        const json = await res.json()
        const data = (json.data as Product[]) ?? []
        setNewProducts(data.filter((p) => p.status === 'active'))
      } catch {
        // ignore
      }
    }

    fetchNew()
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.6
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {t(locale, 'new.label')}
            </span>
            <h2 className="mt-2 font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
              {t(locale, 'new.title')}
            </h2>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:bg-foreground hover:text-background"
              aria-label={locale === 'en' ? 'Previous' : '上一个'}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:bg-foreground hover:text-background"
              aria-label={locale === 'en' ? 'Next' : '下一个'}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 scrollbar-hide lg:px-10"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex-shrink-0 lg:w-[calc((100vw-80px-1400px)/2+10px)]" />
        {newProducts.map((product, i) => (
          <div key={product.id} className="w-[280px] flex-shrink-0 snap-start md:w-[320px]">
            <ProductCard product={product} priority={i < 3} />
          </div>
        ))}
        <div className="flex-shrink-0 w-6 lg:w-10" />
      </div>

      <div className="mt-12 text-center">
        <Link
          href={`/${locale}/bags`}
          className="inline-block border-b border-foreground pb-1 text-xs tracking-[0.15em] uppercase text-foreground transition-opacity hover:opacity-60"
        >
          {t(locale, 'new.viewAll')}
        </Link>
      </div>
    </section>
  )
}
