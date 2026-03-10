import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-center gap-8">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                About DAFENGLI
              </span>
              <h1 className="font-serif text-3xl leading-snug tracking-wide text-foreground lg:text-5xl text-balance">
                以手工艺之名
                <br />
                致敬永恒之美
              </h1>
              <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  DAFENGLI 诞生于对极致工艺的执着追求。我们相信，一只真正出色的手袋，
                  不仅是配饰，更是一件承载时间的艺术品。
                </p>
                <p>
                  我们的每一件作品都由经验丰富的工匠手工打造，
                  从甄选世界顶级的皮革原料，到精确到毫米的裁剪缝合，
                  每一个步骤都倾注了对完美的追求。
                </p>
                <p>
                  我们坚信：克制即力量，简约即永恒。
                  在快速更迭的时尚潮流中，DAFENGLI 选择做时间的朋友，
                  创造跨越季节与趋势、历久弥新的经典之作。
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/craft.jpg"
                alt="DAFENGLI 工匠手工制作"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Values */}
          <div className="mt-24 border-t border-border pt-16 lg:mt-32 lg:pt-24">
            <h2 className="text-center font-serif text-2xl tracking-wide text-foreground lg:text-3xl">
              我们的信仰
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
              {[
                {
                  title: '手工之魂',
                  desc: '拒绝流水线，每一件作品均由资深工匠全手工缝制，确保独一无二的品质与细节。',
                },
                {
                  title: '甄选材质',
                  desc: '严选来自欧洲顶级制革工坊的原料，历经层层甄别，只为呈现最卓越的触感与质地。',
                },
                {
                  title: '永恒设计',
                  desc: '摒弃短暂的潮流追逐，以简约利落的设计语言，打造跨越时间的经典之作。',
                },
              ].map((value) => (
                <div key={value.title} className="text-center">
                  <h3 className="text-sm tracking-[0.15em] uppercase text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
