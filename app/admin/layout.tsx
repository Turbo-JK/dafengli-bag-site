'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, MessageSquare, ShoppingCart, LayoutDashboard, ChevronLeft, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarNav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/category-icons', label: '包型图标', icon: ImageIcon },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 flex h-screen w-56 flex-col border-r border-border bg-card">
        {/* Brand */}
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <span className="font-serif text-sm tracking-[0.2em] text-foreground">DAFENGLI</span>
          <span className="text-[10px] tracking-wider text-muted-foreground uppercase">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {sidebarNav.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 text-xs tracking-wide transition-colors',
                      isActive
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Back to site */}
        <div className="border-t border-border p-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-56">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}
