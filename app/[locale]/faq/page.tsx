'use client'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const faqs: { q: string; a: string }[] = []

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-24">
        <div className="mx-auto max-w-[800px] px-6 py-16 lg:px-10 lg:py-24">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            FAQ
          </span>
          <h1 className="mt-2 font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
            常见问题
          </h1>

          <div className="mt-12 text-sm leading-relaxed text-muted-foreground">
            暂无详细常见问题内容，如有任何疑问，欢迎通过 WhatsApp 与我们联系。
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://wa.me/8613926015626"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              WhatsApp 咨询
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
