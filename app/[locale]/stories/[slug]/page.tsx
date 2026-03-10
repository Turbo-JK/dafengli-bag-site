'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useLocale } from '@/lib/locale-context'
import { stories } from '@/lib/mock-data'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function StoryDetailPage({ params }: PageProps) {
  const { slug } = use(params)
  const { locale } = useLocale()
  const story = stories.find((s) => s.slug === slug)

  if (!story) notFound()

  return (
    <>
      <SiteHeader />
      <main className="pt-24">
        <article className="mx-auto max-w-[800px] px-6 py-12 lg:py-16">
          <Link
            href={`/${locale}/stories`}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
            {locale === 'en' ? 'Back to Stories' : '返回故事列表'}
          </Link>

          <div className="mt-8">
            <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
              {story.category}
            </span>
            <h1 className="mt-2 font-serif text-3xl leading-snug tracking-wide text-foreground lg:text-4xl text-balance">
              {story.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{story.author}</span>
              <span>&middot;</span>
              <span>{story.date}</span>
            </div>
          </div>

          <div className="relative mt-10 aspect-[3/2] overflow-hidden">
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="object-cover"
              sizes="800px"
              priority
            />
          </div>

          <div className="mt-10 text-sm leading-relaxed text-muted-foreground">
            <p className="text-lg leading-relaxed text-foreground">
              {story.excerpt}
            </p>
            <p className="mt-6">
              {story.content}
            </p>
            <p className="mt-6">
              {locale === 'en'
                ? 'Through the passage of time, craftsmanship carries the wisdom and passion of generations of artisans. Every stitch, every polish, is a pursuit and tribute to perfection. We believe true luxury lies not in labels, but in those invisible details—the stories hidden in leather textures, the emotions woven between stitches.'
                : '在时间的流转中，手工艺承载着一代代匠人的智慧与热情。每一道针脚、每一次打磨，都是对完美的追求与致敬。我们相信，真正的奢华不在于标签，而在于那些看不见的细节——隐藏在皮革纹理中的故事，编织在缝线之间的情感。'}
            </p>
            <p className="mt-6">
              {locale === 'en'
                ? 'When you touch a handcrafted piece, you feel not just the warmth of the material, but the depth of time. This is why we insist on handmade craftsmanship—to create a unique experience for every owner.'
                : '当你触摸一件手工制品，你感受到的不仅是材质的温度，更是时间的厚度。这就是我们坚持手工制作的原因——为每一位拥有者创造独一无二的体验。'}
            </p>
          </div>

          <div className="mt-16 border-t border-border pt-8">
            <Link
              href={`/${locale}/stories`}
              className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {locale === 'en' ? 'View More Stories' : '查看更多故事'}
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
