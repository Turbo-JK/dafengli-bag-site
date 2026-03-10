import type { Locale } from './i18n'

// ── DB-aligned types ──

export interface ProductImage {
  id: string
  url: string
  alt: string
  type: 'studio' | 'lifestyle' | 'detail'
  orderIndex: number
}

export interface ProductVariant {
  id: string
  colorName: string
  colorHex: string
  price: number
  compareAtPrice?: number
  inventory: number
  sku: string
  isDefault: boolean
  images: ProductImage[]
}

export interface Product {
  id: string
  slug: string
  titleEn: string
  titleZh: string
  descriptionEn: string
  descriptionZh: string
  material: string
  size: string
  weight: string
  moq: number
  productionTime: string
  customizationAvailable: boolean
  status: 'active' | 'inactive'
  collection: string
  category: string
  features: string[]
  careInstructions: string[]
  tags: string[]
  isNew: boolean
  isFeatured: boolean
  createdAt: string
  variants: ProductVariant[]
}

// Helper to get localized title / description
export function getLocalizedTitle(product: Product, locale: Locale): string {
  return locale === 'en' ? product.titleEn : product.titleZh
}

export function getLocalizedDescription(product: Product, locale: Locale): string {
  return locale === 'en' ? product.descriptionEn : product.descriptionZh
}

// ── Cart ──

export interface CartItem {
  productId: string
  variantId: string
  quantity: number
  product: Product
  variant: ProductVariant
}

// ── Inquiry (Quick Inquiry form) ──

export interface Inquiry {
  id: string
  productId: string
  variantId: string
  quantity: number
  destinationCountry: string
  customization: boolean
  customerEmail: string
  status: 'new' | 'contacted' | 'closed'
  createdAt: string
}

// ── Order (reserved) ──

export interface Order {
  id: string
  customerName: string
  email: string
  country: string
  totalAmount: number
  paymentStatus: 'pending' | 'paid' | 'refunded'
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  createdAt: string
}

export interface OrderItem {
  productId: string
  variantId: string
  quantity: number
  unitPrice: number
  productTitle: string
  colorName: string
}

// ── Content ──

export interface Story {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
}

export interface LookbookItem {
  id: string
  title: string
  description: string
  image: string
  productSlugs: string[]
}
