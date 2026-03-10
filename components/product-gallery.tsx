'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProductImage } from '@/lib/types'
import { cn } from '@/lib/utils'
import { getProductImageUrl } from '@/lib/image-utils'

interface ProductGalleryProps {
  images: ProductImage[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) return null

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 lg:flex-col lg:gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'relative h-16 w-16 flex-shrink-0 overflow-hidden border-2 bg-muted/60 transition-all duration-200 lg:h-20 lg:w-20',
                i === activeIndex ? 'border-foreground' : 'border-transparent opacity-50 hover:opacity-80'
              )}
            >
              <Image
                src={getProductImageUrl(img.url)}
                alt={img.alt}
                fill
                className="object-contain"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image - letterbox：完整显示，留白由背景填充 */}
      <div className="relative flex-1 aspect-[4/5] overflow-hidden bg-muted/60">
        <Image
          src={getProductImageUrl(images[activeIndex].url)}
          alt={images[activeIndex].alt}
          fill
          className="object-contain transition-opacity duration-500"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      </div>
    </div>
  )
}
