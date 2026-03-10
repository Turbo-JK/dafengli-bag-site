'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useCart } from '@/lib/cart-context'
import { useLocale } from '@/lib/locale-context'
import { t } from '@/lib/i18n'
import { getLocalizedTitle } from '@/lib/types'
import { formatPrice } from '@/lib/mock-data'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, generateWhatsAppMessage } = useCart()
  const { locale } = useLocale()

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24">
        <div className="mx-auto max-w-[1000px] px-6 py-12 lg:px-10 lg:py-16">
          <h1 className="font-serif text-3xl tracking-wide text-foreground">
            {t(locale, 'cart.title')}
          </h1>

          {items.length === 0 ? (
            <div className="mt-16 flex flex-col items-center gap-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t(locale, 'cart.empty')}
              </p>
              <Link
                href={`/${locale}/bags`}
                className="border border-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                {t(locale, 'cart.startShopping')}
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="mt-10 border-t border-border">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex gap-6 border-b border-border py-8"
                  >
                    {/* Image */}
                    <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden bg-secondary">
                      <Image
                        src={item.variant.images[0]?.url || ''}
                        alt={getLocalizedTitle(item.product, locale)}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/${locale}/bags/${item.product.slug}`}
                            className="text-sm tracking-wide text-foreground hover:underline underline-offset-4"
                          >
                            {getLocalizedTitle(item.product, locale)}
                          </Link>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {item.variant.colorName}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={locale === 'en' ? 'Remove item' : '移除商品'}
                        >
                          <X className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex items-end justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                            aria-label={locale === 'en' ? 'Decrease quantity' : '减少数量'}
                          >
                            <Minus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                          <span className="flex h-8 w-10 items-center justify-center border-x border-border text-xs text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                            aria-label={locale === 'en' ? 'Increase quantity' : '增加数量'}
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                        </div>
                        <span className="text-sm text-foreground">
                          {formatPrice(item.variant.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8 flex flex-col items-end gap-4">
                <div className="flex w-full max-w-xs items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t(locale, 'cart.subtotal')}</span>
                  <span className="text-lg text-foreground">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t(locale, 'cart.shippingNote')}
                </p>

                <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
                  <Link
                    href={`/${locale}/checkout`}
                    className="flex h-12 items-center justify-center bg-foreground text-xs tracking-[0.2em] uppercase text-background transition-opacity hover:opacity-90"
                  >
                    {t(locale, 'cart.checkout')}
                  </Link>
                  <a
                    href={`https://wa.me/8613926015626?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center border border-foreground text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    {t(locale, 'cart.whatsappOrder')}
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
