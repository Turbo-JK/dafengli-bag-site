'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useLocale } from '@/lib/locale-context'
import { getLocalizedTitle } from '@/lib/types'
import { lookbookItems, getProductBySlug } from '@/lib/mock-data'

export default function LookbookPage() {
  const { locale } = useLocale()

  return (
    <>
      <SiteHeader />
      <main className="pt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Lookbook
          </span>
          <h1 className="mt-2 font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
            {locale === 'en' ? 'Style Inspiration' : '穿搭灵感'}
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {locale === 'en'
              ? 'Explore how our handbags complement everyday outfits across different occasions'
              : '以不同场景为灵感，探索手袋与日常穿搭的和谐搭配'}
          </p>
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-10">
          <div className="flex flex-col gap-24">
            {lookbookItems.map((item, i) => {
              const relatedProducts = item.productSlugs
                .map(getProductBySlug)
                .filter(Boolean)

              return (
                <article
                  key={item.id}
                  className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                    i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      {'Look '}{String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-serif text-2xl tracking-wide text-foreground lg:text-3xl">
                      {item.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    {relatedProducts.length > 0 && (
                      <div className="mt-4">
                        <span className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
                          {locale === 'en' ? 'Related Products' : '相关商品'}
                        </span>
                        <div className="mt-3 flex flex-col gap-2">
                          {relatedProducts.map((product) =>
                            product ? (
                              <Link
                                key={product.id}
                                href={`/${locale}/bags/${product.slug}`}
                                className="text-sm text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
                              >
                                {getLocalizedTitle(product, locale)}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
