import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import type { Product } from '@/lib/types'
import type { DbProductRow } from '../route'
import { mapProduct } from '../route'

// GET /api/products/[slug] - Get single product by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*, product_variants (*, product_images (*))')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Error fetching product by slug', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  const product = mapProduct(data as DbProductRow)
  return NextResponse.json({ data: product })
}

// PUT /api/products/[slug] - Update product (Admin)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const body = await request.json()
    const productUpdates: Partial<Product> | undefined = body.product

    if (!productUpdates) {
      return NextResponse.json(
        { error: 'Missing product payload' },
        { status: 400 }
      )
    }

    const { data: existing, error: findError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (findError) {
      console.error('Error looking up product', findError)
      return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
    }

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {
      title_en: productUpdates.titleEn ?? existing.title_en,
      title_zh: productUpdates.titleZh ?? existing.title_zh,
      description_en: productUpdates.descriptionEn ?? existing.description_en,
      description_zh: productUpdates.descriptionZh ?? existing.description_zh,
      material: productUpdates.material ?? existing.material,
      size: productUpdates.size ?? existing.size,
      weight: productUpdates.weight ?? existing.weight,
      moq: productUpdates.moq ?? existing.moq,
      production_time: productUpdates.productionTime ?? existing.production_time,
      customization_available:
        productUpdates.customizationAvailable ?? existing.customization_available,
      status: productUpdates.status ?? existing.status,
      collection: productUpdates.collection ?? existing.collection,
      category: productUpdates.category ?? existing.category,
      tags: productUpdates.tags ?? existing.tags,
      is_new: productUpdates.isNew ?? existing.is_new,
      is_featured: productUpdates.isFeatured ?? existing.is_featured,
    }

    if (productUpdates.slug && productUpdates.slug !== existing.slug) {
      updateData.slug = productUpdates.slug
    }

    const { error: updateError } = await supabaseAdmin
      .from('products')
      .update(updateData)
      .eq('id', existing.id)

    if (updateError) {
      console.error('Error updating product', updateError)
      const status = (updateError as any).code === '23505' ? 409 : 500
      return NextResponse.json({ error: 'Failed to update product' }, { status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in PUT /api/products/[slug]', error)
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

// DELETE /api/products/[slug] - Delete product (Admin)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const { data: existing, error: findError } = await supabaseAdmin
    .from('products')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (findError) {
    console.error('Error looking up product for delete', findError)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }

  if (!existing) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  const { error: deleteError } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', existing.id)

  if (deleteError) {
    console.error('Error deleting product', deleteError)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
