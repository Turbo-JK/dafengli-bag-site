import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HeroSection } from '@/components/home/hero-section'
import { NewArrivals } from '@/components/home/new-arrivals'
import { ShopByColor } from '@/components/home/shop-by-color'
import { CraftSection } from '@/components/home/craft-section'
import { LookbookPreview } from '@/components/home/lookbook-preview'
import { StoriesPreview } from '@/components/home/stories-preview'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <NewArrivals />
        <ShopByColor />
        <CraftSection />
        <LookbookPreview />
        <StoriesPreview />
      </main>
      <SiteFooter />
    </>
  )
}
