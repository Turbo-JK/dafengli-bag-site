'use client'

import Image from 'next/image'
import Link from 'next/link'
import { stories } from '@/lib/mock-data'
import { useLocale } from '@/lib/locale-context'

export function StoriesPreview() {
  const { locale } = useLocale()

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Stories
            </span>
            <h2 className="mt-2 font-serif text-3xl tracking-wide text-foreground lg:text-4xl">
              {locale === 'en' ? 'Brand Stories' : '品牌故事'}
            </h2>
          </div>
          <Link
            href={`/${locale}/stories`}
            className="hidden border-b border-foreground pb-1 text-xs tracking-[0.15em] uppercase text-foreground transition-opacity hover:opacity-60 md:inline-block"
          >
            {locale === 'en' ? 'All Articles' : '全部文章'}
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {stories.map((story) => (
            <Link key={story.id} href={`/${locale}/stories/${story.slug}`} className="group">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
