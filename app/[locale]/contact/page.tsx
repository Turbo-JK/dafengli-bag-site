import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MapPin, Mail, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-24">
        <div className="mx-auto max-w-[1000px] px-6 py-16 lg:px-10 lg:py-24">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Contact
          </span>
          <h1 className="mt-2 font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
            联系我们
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            我们期待为您提供专属的选购服务与咨询
          </p>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xs tracking-[0.1em] uppercase text-foreground">地址</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    广州市解放北路1339号柏丽NYC.A座一楼A1151档
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    Store: No.A1151, 1/F, Block A, Baili NYC, No.1339 Jiefang North Road, Guangzhou
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xs tracking-[0.1em] uppercase text-foreground">电话 / 联系人</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <a href="tel:+8613926015626" className="hover:underline">139 2601 5626</a>
                    {' · Linda'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xs tracking-[0.1em] uppercase text-foreground">邮箱</h3>
                  <p className="mt-1 text-sm text-muted-foreground">concierge@dafengli.com</p>
                </div>
              </div>
              <div>
                <a
                  href="https://wa.me/8613926015626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  WhatsApp 联系
                </a>
              </div>

              {/* QR Codes */}
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs tracking-[0.1em] uppercase text-foreground">
                    WhatsApp 二维码
                  </h3>
                  <div className="mt-2 inline-flex rounded-md border border-border bg-background p-3">
                    <Image
                      src="/qr-whatsapp-linda.png"
                      alt="Linda WhatsApp 二维码"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.1em] uppercase text-foreground">
                    微信二维码
                  </h3>
                  <div className="mt-2 inline-flex rounded-md border border-border bg-background p-3">
                    <Image
                      src="/qr-wechat-linda.png"
                      alt="Linda 微信二维码"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="姓名"
                className="border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
              <input
                type="email"
                placeholder="邮箱"
                className="border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
              <input
                type="text"
                placeholder="主题"
                className="border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
              <textarea
                rows={5}
                placeholder="请留言..."
                className="resize-none border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 flex h-12 items-center justify-center bg-foreground text-xs tracking-[0.2em] uppercase text-background transition-opacity hover:opacity-90"
              >
                发送
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
