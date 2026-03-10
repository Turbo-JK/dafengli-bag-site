'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/types'
import { getLocalizedTitle } from '@/lib/types'
import { formatPrice } from '@/lib/mock-data'
import { useLocale } from '@/lib/locale-context'
import { cn } from '@/lib/utils'
import { getProductImageUrl } from '@/lib/image-utils'

interface ProductCardProps {
  product: Product
  className?: string
  priority?: boolean
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const { locale } = useLocale()
  const [activeVariant, setActiveVariant] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const variant = product.variants[activeVariant]

  // Studio image = default, Lifestyle image = hover；无图时用占位
  const productTitle = getLocalizedTitle(product, locale)
  const studioImage = variant?.images?.find((img) => img.type === 'studio') || variant?.images?.[0]
  const lifestyleImage = variant?.images?.find((img) => img.type === 'lifestyle')
  const mainImageUrl = studioImage ? getProductImageUrl(studioImage.url) : ''
  const displayUrl = mainImageUrl || '/placeholder.svg'
  const displayAlt = studioImage?.alt || productTitle
  const productLink = `/${locale}/bags/${product.slug}`

  return (
    <article className={cn('group', className)}>
      <Link href={productLink} className="block">
        <div
          className="relative aspect-[4/5] overflow-hidden bg-muted/60"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Studio (default) - letterbox：完整显示原图，留白由背景填充 */}
          <Image
            src={displayUrl}
            alt={displayAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              'object-contain transition-all duration-500 ease-out',
              isHovered && lifestyleImage ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
            )}
            priority={priority}
          />
          {/* Lifestyle (hover) image */}
          {lifestyleImage && mainImageUrl && (
            <Image
              src={getProductImageUrl(lifestyleImage.url) || displayUrl}
              alt={lifestyleImage.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={cn(
                'object-contain transition-all duration-500 ease-out',
                isHovered ? 'opacity-100 scale-[1.02]' : 'opacity-0 scale-100'
              )}
            />
          )}
          {/* Shadow on hover */}
          <div
            className={cn(
              'absolute inset-0 transition-shadow duration-300 pointer-events-none',
              isHovered ? 'shadow-[inset_0_-60px_40px_-20px_rgba(0,0,0,0.08)]' : ''
            )}
          />
          {/* Quick View Button (fade in on hover) */}
          <div
            className={cn(
              'absolute inset-x-4 bottom-4 transition-all duration-300',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            )}
          >
            <span className="flex h-9 items-center justify-center bg-background/90 backdrop-blur-sm text-[10px] tracking-[0.15em] uppercase text-foreground">
              {locale === 'en' ? 'Quick View' : '快速查看'}
            </span>
          </div>
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-foreground px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-background">
              New
            </span>
          )}
        </div>
      </Link>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm tracking-wide text-foreground">
              <Link href={productLink} className="hover:underline underline-offset-4">
                {productTitle}
              </Link>
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{product.collection}</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-foreground">{formatPrice(variant.price)}</span>
            {variant.compareAtPrice && (
              <span className="ml-2 text-xs text-muted-foreground line-through">
                {formatPrice(variant.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Color Swatches */}
        {product.variants.length > 1 && (
          <div className="mt-3 flex items-center gap-2">
            {product.variants.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setActiveVariant(i)}
                className={cn(
                  'h-3 w-3 rounded-full border transition-all duration-200',
                  i === activeVariant
                    ? 'border-foreground scale-125'
                    : 'border-border hover:border-muted-foreground'
                )}
                style={{ backgroundColor: v.colorHex }}
                aria-label={v.colorName}
                title={v.colorName}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
