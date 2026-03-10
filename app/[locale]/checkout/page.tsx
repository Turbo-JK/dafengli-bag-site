'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useCart } from '@/lib/cart-context'
import { useLocale } from '@/lib/locale-context'
import { t } from '@/lib/i18n'
import { getLocalizedTitle } from '@/lib/types'
import { formatPrice } from '@/lib/mock-data'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { locale } = useLocale()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    coupon: '',
    payment: 'stripe',
    shipping: 'standard',
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clearCart()
    router.push(`/${locale}/order-success`)
  }

  if (items.length === 0) {
    return (
      <>
        <SiteHeader />
        <main className="flex min-h-screen items-center justify-center pt-24">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">购物袋为空</p>
            <Link
              href={`/${locale}/bags`}
              className="mt-4 inline-block border border-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              继续购物
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24">
        <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10 lg:py-16">
          <h1 className="font-serif text-3xl tracking-wide text-foreground">
            {t(locale, 'checkout.title')}
          </h1>

          <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Left: Form */}
            <div className="flex flex-col gap-10 lg:col-span-3">
              {/* Contact */}
              <fieldset>
                <legend className="text-xs tracking-[0.15em] uppercase text-foreground">收货信息</legend>
                <div className="mt-4 flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="姓名"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="电话"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="邮箱"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="详细地址"
                    required
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="城市"
                    required
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  />
                </div>
              </fieldset>

              {/* Shipping */}
              <fieldset>
                <legend className="text-xs tracking-[0.15em] uppercase text-foreground">配送方式</legend>
                <div className="mt-4 flex flex-col gap-3">
                  {[
                    { value: 'standard', label: '标准配送', desc: '3-5 个工作日', price: '免费' },
                    { value: 'express', label: '加急配送', desc: '1-2 个工作日', price: '\u00A5200' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center justify-between border px-4 py-3 transition-colors ${
                        formData.shipping === opt.value ? 'border-foreground' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.value}
                          checked={formData.shipping === opt.value}
                          onChange={() => handleChange('shipping', opt.value)}
                          className="sr-only"
                        />
                        <div className={`h-3 w-3 rounded-full border ${formData.shipping === opt.value ? 'border-foreground bg-foreground' : 'border-muted-foreground'}`} />
                        <div>
                          <span className="text-xs text-foreground">{opt.label}</span>
                          <p className="text-[11px] text-muted-foreground">{opt.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs text-foreground">{opt.price}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Payment */}
              <fieldset>
                <legend className="text-xs tracking-[0.15em] uppercase text-foreground">支付方式</legend>
                <div className="mt-4 flex flex-col gap-3">
                  {[
                    { value: 'stripe', label: 'Stripe' },
                    { value: 'paypal', label: 'PayPal' },
                    { value: 'transfer', label: '银行转账' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center gap-3 border px-4 py-3 transition-colors ${
                        formData.payment === opt.value ? 'border-foreground' : 'border-border'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={formData.payment === opt.value}
                        onChange={() => handleChange('payment', opt.value)}
                        className="sr-only"
                      />
                      <div className={`h-3 w-3 rounded-full border ${formData.payment === opt.value ? 'border-foreground bg-foreground' : 'border-muted-foreground'}`} />
                      <span className="text-xs text-foreground">{opt.label}</span>
                    </label>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  支付与配送功能完善中，提交后将由专属顾问联系您
                </p>
              </fieldset>

              {/* Coupon */}
              <div>
                <label className="text-xs tracking-[0.15em] uppercase text-foreground">优惠码</label>
                <div className="mt-3 flex gap-3">
                  <input
                    type="text"
                    placeholder="输入优惠码"
                    value={formData.coupon}
                    onChange={(e) => handleChange('coupon', e.target.value)}
                    className="flex-1 border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  />
                  <button
                    type="button"
                    className="border border-foreground px-6 py-3 text-xs tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    应用
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 border border-border p-6">
                <h2 className="text-xs tracking-[0.15em] uppercase text-foreground">
                  订单摘要
                </h2>
                <div className="mt-6 flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4">
                      <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden bg-secondary">
                        <Image
                          src={item.variant.images[0]?.url || ''}
                          alt={getLocalizedTitle(item.product, locale)}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex flex-1 items-start justify-between">
                        <div>
                          <p className="text-xs text-foreground">{getLocalizedTitle(item.product, locale)}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {item.variant.colorName} x{item.quantity}
                          </p>
                        </div>
                        <span className="text-xs text-foreground">
                          {formatPrice(item.variant.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">商品小计</span>
                    <span className="text-foreground">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-muted-foreground">配送</span>
                    <span className="text-foreground">
                      {formData.shipping === 'express' ? '\u00A5200' : '免费'}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between border-t border-border pt-4">
                    <span className="text-sm text-foreground">合计</span>
                    <span className="text-lg text-foreground">
                      {formatPrice(totalPrice + (formData.shipping === 'express' ? 200 : 0))}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 flex h-12 w-full items-center justify-center bg-foreground text-xs tracking-[0.2em] uppercase text-background transition-opacity hover:opacity-90"
                >
                  提交订单
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
