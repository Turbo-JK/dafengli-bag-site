'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductCard } from '@/components/product-card'
import { FilterPanel } from '@/components/filter-panel'
import type { Product } from '@/lib/types'
import { useLocale } from '@/lib/locale-context'
import { t } from '@/lib/i18n'
import { Suspense } from 'react'

const filterGroups = [
  {
    key: 'category',
    labelKey: 'filter.category',
    options: [
      { value: 'tote', label: 'Tote', labelEn: 'Tote' },
      { value: 'crossbody', label: '斜挎包', labelEn: 'Crossbody' },
      { value: 'clutch', label: '手拿包', labelEn: 'Clutch' },
      { value: 'bucket', label: '水桶包', labelEn: 'Bucket' },
    ],
  },
  {
    key: 'material',
    labelKey: 'filter.material',
    options: [
      { value: 'Togo', label: 'Togo', labelEn: 'Togo' },
      { value: 'Epsom', label: 'Epsom', labelEn: 'Epsom' },
      { value: 'Clemence', label: 'Clemence', labelEn: 'Clemence' },
      { value: 'Box', label: 'Box', labelEn: 'Box' },
      { value: 'Swift', label: 'Swift', labelEn: 'Swift' },
    ],
  },
  {
    key: 'availability',
    labelKey: 'filter.availability',
    options: [
      { value: 'in-stock', label: '现货', labelEn: 'In Stock' },
    ],
  },
]

function BagsContent() {
  const { locale } = useLocale()
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category')

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(() => {
    const init: Record<string, string[]> = {}
    if (initialCategory) init.category = [initialCategory]
    return init
  })
  const [sortValue, setSortValue] = useState('newest')
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/products')
        if (!res.ok) return
        const json = await res.json()
        setProducts(json.data as Product[])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[key] || []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      const newFilters = { ...prev }
      if (next.length === 0) {
        delete newFilters[key]
      } else {
        newFilters[key] = next
      }
      return newFilters
    })
  }

  const handleClearAll = () => setActiveFilters({})

  const filteredProducts = useMemo(() => {
    if (!products.length) return []

    let result = [...products].filter((p) => p.status === 'active')

    // Category filter
    if (activeFilters.category?.length) {
      result = result.filter((p) => activeFilters.category.includes(p.category))
    }

    // Material filter
    if (activeFilters.material?.length) {
      result = result.filter((p) =>
        activeFilters.material.some((m) => p.material.includes(m))
      )
    }

    // Availability filter
    if (activeFilters.availability?.includes('in-stock')) {
      result = result.filter((p) => p.variants.some((v) => v.inventory > 0))
    }

    // Sort
    switch (sortValue) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'price-asc':
        result.sort((a, b) => a.variants[0].price - b.variants[0].price)
        break
      case 'price-desc':
        result.sort((a, b) => b.variants[0].price - a.variants[0].price)
        break
    }

    return result
  }, [products, activeFilters, sortValue])

  // Localize filter labels
  const localizedFilters = filterGroups.map((group) => ({
    ...group,
    label: t(locale, group.labelKey as any),
    options: group.options.map((opt) => ({
      ...opt,
      label: locale === 'en' ? (opt.labelEn || opt.label) : opt.label,
    })),
  }))

  return (
    <>
      <FilterPanel
        filters={localizedFilters}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {isLoading
              ? t(locale, 'bags.items', { n: 0 })
              : t(locale, 'bags.items', { n: filteredProducts.length })}
          </p>
        </div>

        {!isLoading && filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-foreground">{t(locale, 'bags.empty')}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, 'bags.emptyHint')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function BagsPage() {
  const { locale } = useLocale()

  return (
    <>
      <SiteHeader />
      <main className="pt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
          <h1 className="font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
            {t(locale, 'bags.title')}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, 'bags.desc')}
          </p>
        </div>
        <Suspense fallback={null}>
          <BagsContent />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
