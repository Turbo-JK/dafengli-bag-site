'use client'

import { useState, useMemo, useEffect } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { Minus, Plus, ChevronDown, MessageCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductGallery } from '@/components/product-gallery'
import { ProductCard } from '@/components/product-card'
import { ColorSwatch } from '@/components/color-swatch'
import { QuickInquiryModal } from '@/components/quick-inquiry-modal'
import { useCart } from '@/lib/cart-context'
import { useLocale } from '@/lib/locale-context'
import { t } from '@/lib/i18n'
import { getColorDisplayName } from '@/lib/color-names'
import { getLocalizedTitle, getLocalizedDescription, type Product } from '@/lib/types'
import { formatPrice } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import Link from 'next/link'

function PDPContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { locale } = useLocale()

  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const slug = params.slug as string
    setLoading(true)

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?slug=${encodeURIComponent(slug)}`)
        if (!res.ok) return
        const json = await res.json()
        const data = (json.data as Product[]) || []
        const main = data[0]
        setProduct(main ?? null)

        if (main) {
          const relatedRes = await fetch(
            `/api/products?category=${encodeURIComponent(
              main.category
            )}&limit=4`
          )
          if (relatedRes.ok) {
            const relatedJson = await relatedRes.json()
            const relatedData = (relatedJson.data as Product[]) || []
            setRelated(relatedData.filter((p) => p.id !== main.id))
          }
        }
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  const initialColorIndex = useMemo(() => {
    const color = searchParams.get('color')
    if (!product || !color) return 0
    const idx = product.variants.findIndex((v) => v.colorName === color || v.colorHex === color)
    return idx >= 0 ? idx : 0
  }, [product, searchParams])

  const [activeVariant, setActiveVariant] = useState(initialColorIndex)
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [inquiryOpen, setInquiryOpen] = useState(false)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
          <p className="text-sm text-muted-foreground">
            {locale === 'en' ? 'Loading...' : '加载中...'}
          </p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground">{t(locale, 'product.notFound')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t(locale, 'product.notFoundDesc')}</p>
        </div>
      </div>
    )
  }

  const variant = product.variants[activeVariant]
  const productTitle = getLocalizedTitle(product, locale)
  const productDescription = getLocalizedDescription(product, locale)

  const handleColorChange = (index: number) => {
    setActiveVariant(index)
    const newColor = product.variants[index].colorName
    router.replace(`/${locale}/bags/${product.slug}?color=${newColor}`, { scroll: false })
  }

  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in:\n\n${product.titleEn} - ${getColorDisplayName(variant.colorHex, variant.colorName, locale)}\nQuantity: ${quantity}\nPrice: ${formatPrice(variant.price)}\n\nCould you please confirm availability?`
  )

  const accordions = [
    {
      key: 'specs',
      title: t(locale, 'product.specs'),
      content: (
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex justify-between"><span>{locale === 'en' ? 'Material' : '材质'}</span><span className="text-foreground">{product.material}</span></div>
          <div className="flex justify-between"><span>{locale === 'en' ? 'Size' : '尺寸'}</span><span className="text-foreground">{product.size}</span></div>
          <div className="flex justify-between"><span>{locale === 'en' ? 'Weight' : '重量'}</span><span className="text-foreground">{product.weight}</span></div>
          <div className="flex justify-between"><span>SKU</span><span className="text-foreground">{variant.sku}</span></div>
          <div className="flex justify-between"><span>MOQ</span><span className="text-foreground">{product.moq} pcs</span></div>
          <div className="flex justify-between"><span>{locale === 'en' ? 'Lead Time' : '交期'}</span><span className="text-foreground">{product.productionTime}</span></div>
          <div className="flex justify-between"><span>{locale === 'en' ? 'Customizable' : '可定制'}</span><span className="text-foreground">{product.customizationAvailable ? (locale === 'en' ? 'Yes' : '是') : (locale === 'en' ? 'No' : '否')}</span></div>
        </div>
      ),
    },
    {
      key: 'features',
      title: t(locale, 'product.features'),
      content: (
        <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: 'care',
      title: t(locale, 'product.care'),
      content: (
        <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          {product.careInstructions.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
              {c}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav className="py-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href={`/${locale}/bags`} className="hover:text-foreground transition-colors">
            {t(locale, 'nav.bags')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{productTitle}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-16">
          {/* Gallery - 限制宽度，包图占比更小 */}
          <div className="mx-auto w-full max-w-md lg:max-w-[420px]">
            <ProductGallery images={variant.images} />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6 lg:py-8">
            <div>
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {product.collection}
              </span>
              <h1 className="mt-2 font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
                {productTitle}
              </h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-xl text-foreground">{formatPrice(variant.price)}</span>
              {variant.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(variant.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {productDescription}
            </p>

            {/* Color Selection */}
            <div>
              <span className="text-xs text-muted-foreground">
                {t(locale, 'product.color')}{': '}<span className="text-foreground">{getColorDisplayName(variant.colorHex, variant.colorName, locale)}</span>
              </span>
              <div className="mt-3 flex items-center gap-3">
                {product.variants.map((v, i) => (
                  <ColorSwatch
                    key={v.id}
                    hex={v.colorHex}
                    name={getColorDisplayName(v.colorHex, v.colorName, locale)}
                    isActive={i === activeVariant}
                    size="md"
                    onClick={() => handleColorChange(i)}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-xs text-muted-foreground">{t(locale, 'product.quantity')}</span>
              <div className="mt-2 flex items-center border border-border w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                  aria-label={locale === 'en' ? 'Decrease quantity' : '减少数量'}
                >
                  <Minus className="h-3 w-3" strokeWidth={1.5} />
                </button>
                <span className="flex h-10 w-12 items-center justify-center border-x border-border text-sm text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(variant.inventory, quantity + 1))}
                  className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                  aria-label={locale === 'en' ? 'Increase quantity' : '增加数量'}
                >
                  <Plus className="h-3 w-3" strokeWidth={1.5} />
                </button>
              </div>
              {variant.inventory <= 3 && variant.inventory > 0 && (
                <p className="mt-2 text-xs text-accent">{t(locale, 'product.onlyLeft', { n: variant.inventory })}</p>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              {/* Primary: WhatsApp Inquiry */}
              <a
                href={`https://wa.me/8613926015626?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 bg-foreground text-xs tracking-[0.2em] uppercase text-background transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                {t(locale, 'product.whatsappInquiry')}
              </a>
              {/* Quick Inquiry Form */}
              <button
                onClick={() => setInquiryOpen(true)}
                className="flex h-12 items-center justify-center border border-foreground text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                {locale === 'en' ? 'Quick Inquiry Form' : '快速询价表单'}
              </button>
              {/* Secondary: Add to cart */}
              <button
                onClick={() => addItem(product, variant, quantity)}
                className="flex h-10 items-center justify-center text-xs tracking-[0.15em] uppercase text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                {t(locale, 'product.addToCart')}
              </button>
            </div>

            {/* Accordions */}
            <div className="mt-4 border-t border-border">
              {accordions.map((acc) => (
                <div key={acc.key} className="border-b border-border">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === acc.key ? null : acc.key)}
                    className="flex w-full items-center justify-between py-4 text-left text-xs tracking-wide text-foreground"
                  >
                    {acc.title}
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-300',
                        openAccordion === acc.key && 'rotate-180'
                      )}
                      strokeWidth={1.5}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      openAccordion === acc.key ? 'max-h-80 pb-4' : 'max-h-0'
                    )}
                  >
                    {acc.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-24 border-t border-border pt-16 pb-16">
            <h2 className="font-serif text-2xl tracking-wide text-foreground">
              {t(locale, 'product.relatedTitle')}
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        productName={product.titleEn}
        colorName={getColorDisplayName(variant.colorHex, variant.colorName, locale)}
      />
    </div>
  )
}

export default function ProductDetailPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <PDPContent />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
