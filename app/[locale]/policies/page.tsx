import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function PoliciesPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-24">
        <div className="mx-auto max-w-[800px] px-6 py-16 lg:px-10 lg:py-24">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Policies
          </span>
          <h1 className="mt-2 font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
            退换政策
          </h1>
          <div className="mt-12 text-sm leading-relaxed text-muted-foreground">
            如需了解退换或配送等政策信息，请直接通过 WhatsApp 联系我们的客服，我们会为您做一对一说明。
            <div className="mt-6">
              <a
                href="https://wa.me/8613926015626"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                WhatsApp 联系
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
