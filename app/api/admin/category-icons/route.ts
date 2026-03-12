import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

const CATEGORIES = ['tote', 'crossbody', 'clutch', 'bucket'] as const

/** GET /api/admin/category-icons - 后台获取当前包型图标 */
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('category_icons')
    .select('category_slug, image_url')

  if (error) {
    console.error('Error fetching category_icons', error)
    return NextResponse.json({ tote: null, crossbody: null, clutch: null, bucket: null })
  }

  const map: Record<string, string | null> = { tote: null, crossbody: null, clutch: null, bucket: null }
  for (const row of data as { category_slug: string; image_url: string }[]) {
    if (CATEGORIES.includes(row.category_slug as (typeof CATEGORIES)[number])) {
      map[row.category_slug] = row.image_url
    }
  }
  return NextResponse.json(map)
}

/** PUT /api/admin/category-icons - 设置某个包型的图标 URL */
export async function PUT(request: Request) {
  const body = await request.json().catch(() => ({}))
  const category = body.category as string
  const imageUrl = body.imageUrl as string

  if (!category || !imageUrl || !CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    return NextResponse.json({ error: 'Invalid category or imageUrl' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('category_icons')
    .upsert({ category_slug: category, image_url: imageUrl }, { onConflict: 'category_slug' })

  if (error) {
    console.error('Error upserting category_icon', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
