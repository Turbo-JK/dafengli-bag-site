'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useLocale } from '@/lib/locale-context'
import { CheckCircle2 } from 'lucide-react'

export default function OrderSuccessPage() {
  const { locale } = useLocale()

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen items-center justify-center pt-24">
        <div className="mx-auto max-w-md px-6 py-16 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-foreground" strokeWidth={1} />
          <h1 className="mt-6 font-serif text-3xl tracking-wide text-foreground">
            {locale === 'en' ? 'Order Submitted' : '订单已提交'}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {locale === 'en'
              ? 'Thank you for your order. Our dedicated consultant will contact you within 24 hours to confirm order details and delivery arrangements.'
              : '感谢您的订单。我们的专属顾问将在 24 小时内与您联系，确认订单详情与配送安排。'}
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            {locale === 'en' ? 'For any questions, please contact us via ' : '如有任何疑问，请通过 '}
            <a
              href="https://wa.me/8613926015626"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              WhatsApp
            </a>
            {locale === 'en' ? '' : ' 联系我们'}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              href={`/${locale}/bags`}
              className="border border-foreground px-10 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {locale === 'en' ? 'Continue Shopping' : '继续购物'}
            </Link>
            <Link
              href={`/${locale}`}
              className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {locale === 'en' ? 'Back to Home' : '返回首页'}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
