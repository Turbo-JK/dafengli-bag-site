import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import type { Product, ProductVariant, ProductImage } from '@/lib/types'

export type DbProductRow = {
  id: string
  slug: string
  title_en: string
  title_zh: string
  description_en: string
  description_zh: string
  material: string
  size: string
  weight: string
  moq: number
  production_time: string
  customization_available: boolean
  status: string
  collection: string
  category: string
  tags: string[] | null
  is_new: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  product_variants?: DbVariantRow[]
}

type DbVariantRow = {
  id: string
  product_id: string
  color_name: string
  color_hex: string
  price: number
  compare_at_price: number | null
  inventory: number
  sku: string
  is_default: boolean
  product_images?: DbImageRow[]
}

type DbImageRow = {
  id: string
  variant_id: string
  url: string
  alt: string
  type: string
  order_index: number
}

function mapImage(row: DbImageRow): ProductImage {
  return {
    id: row.id,
    url: row.url,
    alt: row.alt,
    type: (row.type as ProductImage['type']) ?? 'studio',
    orderIndex: row.order_index,
  }
}

function mapVariant(row: DbVariantRow): ProductVariant {
  const images = (row.product_images ?? []).map(mapImage).sort((a, b) => a.orderIndex - b.orderIndex)

  return {
    id: row.id,
    colorName: row.color_name,
    colorHex: row.color_hex,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price != null ? Number(row.compare_at_price) : undefined,
    inventory: row.inventory,
    sku: row.sku,
    isDefault: row.is_default,
    images,
  }
}

export function mapProduct(row: DbProductRow): Product {
  const variants = (row.product_variants ?? []).map(mapVariant)

  return {
    id: row.id,
    slug: row.slug,
    titleEn: row.title_en,
    titleZh: row.title_zh,
    descriptionEn: row.description_en,
    descriptionZh: row.description_zh,
    material: row.material,
    size: row.size,
    weight: row.weight,
    moq: row.moq,
    productionTime: row.production_time,
    customizationAvailable: row.customization_available,
    status: row.status === 'active' ? 'active' : 'inactive',
    collection: row.collection,
    category: row.category,
    features: [], // filled by admin / future schema extension
    careInstructions: [],
    tags: row.tags ?? [],
    isNew: row.is_new,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    variants,
  }
}

// GET /api/products - List all products with optional filters
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const category = searchParams.get('category')
  const color = searchParams.get('color')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const isNew = searchParams.get('isNew')
  const isFeatured = searchParams.get('isFeatured')
  const search = searchParams.get('search')
  const limit = searchParams.get('limit')
  const offset = searchParams.get('offset')

  let query = supabaseAdmin
    .from('products')
    .select('*, product_variants (*, product_images (*))')
    .order('created_at', { ascending: false })

  if (slug) {
    query = query.eq('slug', slug)
  }

  if (category) {
    query = query.eq('category', category)
  }

  if (isNew === 'true') {
    query = query.eq('is_new', true)
  }

  if (isFeatured === 'true') {
    query = query.eq('is_featured', true)
  }

  if (search) {
    const s = search.toLowerCase()
    query = query.or(
      `title_en.ilike.%${s}%,title_zh.ilike.%${s}%,collection.ilike.%${s}%,category.ilike.%${s}%`
    )
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products from Supabase', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }

  let mapped: Product[] = (data as DbProductRow[]).map(mapProduct)

  // Color filter (by variant colorName containing the filter string)
  if (color) {
    mapped = mapped.filter((p) =>
      p.variants.some((v) => v.colorName.includes(color) || v.colorHex.includes(color))
    )
  }

  // Price filters (check any variant price)
  if (minPrice) {
    const min = parseFloat(minPrice)
    mapped = mapped.filter((p) => p.variants.some((v) => v.price >= min))
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice)
    mapped = mapped.filter((p) => p.variants.some((v) => v.price <= max))
  }

  const total = mapped.length
  const limitNum = limit ? parseInt(limit) : 20
  const offsetNum = offset ? parseInt(offset) : 0
  const paged = mapped.slice(offsetNum, offsetNum + limitNum)

  return NextResponse.json({
    data: paged,
    pagination: {
      total,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < total,
    },
  })
}

// POST /api/products - Create a new product (Admin)
export async function POST(request: Request) {
  // TODO: Add auth check before enabling in production
  try {
    const body = await request.json()

    const {
      product,
      variants,
    }: {
      product: {
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
        tags?: string[]
        isNew?: boolean
        isFeatured?: boolean
      }
      variants: Array<{
        colorName: string
        colorHex: string
        price: number
        compareAtPrice?: number
        inventory: number
        sku: string
        isDefault?: boolean
        images: Array<{
          url: string
          alt: string
          type: ProductImage['type']
          orderIndex?: number
        }>
      }>
    } = body

    if (!product?.titleEn || !product?.titleZh || !product?.slug || !product?.category) {
      return NextResponse.json(
        { error: 'Missing required fields on product: titleEn, titleZh, slug, category' },
        { status: 400 }
      )
    }

    if (!variants?.length) {
      return NextResponse.json(
        { error: 'At least one variant is required' },
        { status: 400 }
      )
    }

    const { data: insertedProduct, error: insertProductError } = await supabaseAdmin
      .from('products')
      .insert({
        slug: product.slug,
        title_en: product.titleEn,
        title_zh: product.titleZh,
        description_en: product.descriptionEn,
        description_zh: product.descriptionZh,
        material: product.material,
        size: product.size,
        weight: product.weight,
        moq: product.moq,
        production_time: product.productionTime,
        customization_available: product.customizationAvailable,
        status: product.status,
        collection: product.collection,
        category: product.category,
        tags: product.tags ?? [],
        is_new: product.isNew ?? false,
        is_featured: product.isFeatured ?? false,
      })
      .select('*')
      .single()

    if (insertProductError || !insertedProduct) {
      console.error('Error inserting product', insertProductError)
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }

    const productId = (insertedProduct as DbProductRow).id

    const variantsToInsert = variants.map((v) => ({
      product_id: productId,
      color_name: v.colorName,
      color_hex: v.colorHex,
      price: v.price,
      compare_at_price: v.compareAtPrice ?? null,
      inventory: v.inventory,
      sku: v.sku,
      is_default: v.isDefault ?? false,
    }))

    const { data: insertedVariants, error: insertVariantsError } = await supabaseAdmin
      .from('product_variants')
      .insert(variantsToInsert)
      .select('*')

    if (insertVariantsError || !insertedVariants) {
      console.error('Error inserting variants', insertVariantsError)
      return NextResponse.json({ error: 'Failed to create variants' }, { status: 500 })
    }

    const imagesToInsert: Array<{
      variant_id: string
      url: string
      alt: string
      type: string
      order_index: number
    }> = []

    insertedVariants.forEach((variantRow: any, idx: number) => {
      const variantPayload = variants[idx]
      if (!variantPayload?.images?.length) return

      variantPayload.images.forEach((img, imageIndex) => {
        imagesToInsert.push({
          variant_id: variantRow.id,
          url: img.url,
          alt: img.alt,
          type: img.type,
          order_index: img.orderIndex ?? imageIndex,
        })
      })
    })

    if (imagesToInsert.length > 0) {
      const { error: insertImagesError } = await supabaseAdmin
        .from('product_images')
        .insert(imagesToInsert)

      if (insertImagesError) {
        console.error('Error inserting product images', insertImagesError)
        return NextResponse.json(
          { error: 'Failed to create product images' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      {
        data: {
          id: productId,
        },
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Error in POST /api/products', err)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

