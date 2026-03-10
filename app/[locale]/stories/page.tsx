'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useLocale } from '@/lib/locale-context'
import { stories } from '@/lib/mock-data'

export default function StoriesPage() {
  const { locale } = useLocale()
  const featured = stories[0]
  const rest = stories.slice(1)

  return (
    <>
      <SiteHeader />
      <main className="pt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Stories
          </span>
          <h1 className="mt-2 font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
            {locale === 'en' ? 'Brand Stories' : '品牌故事'}
          </h1>
        </div>

        {/* Featured */}
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Link href={`/${locale}/stories/${featured.slug}`} className="group grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                {featured.category}
              </span>
              <h2 className="font-serif text-2xl tracking-wide text-foreground group-hover:underline underline-offset-4 lg:text-3xl text-balance">
                {featured.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <span className="text-xs text-muted-foreground">
                {featured.date} &middot; {featured.author}
              </span>
            </div>
          </Link>
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((story) => (
              <Link key={story.id} href={`/${locale}/stories/${story.slug}`} className="group">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                    {story.category}
                  </span>
                  <h3 className="mt-1 text-sm tracking-wide text-foreground group-hover:underline underline-offset-4">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {story.excerpt}
                  </p>
                  <span className="mt-2 block text-[11px] text-muted-foreground">
                    {story.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
