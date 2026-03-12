import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

const CATEGORIES = ['tote', 'crossbody', 'clutch', 'bucket'] as const

export type CategoryIcons = Record<(typeof CATEGORIES)[number], string | null>

/** GET /api/category-icons - 首页「按包型选购」圆圈图标（公开） */
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('category_icons')
    .select('category_slug, image_url')

  if (error) {
    console.error('Error fetching category_icons', error)
    return NextResponse.json({ tote: null, crossbody: null, clutch: null, bucket: null })
  }

  const map: CategoryIcons = { tote: null, crossbody: null, clutch: null, bucket: null }
  for (const row of data as { category_slug: string; image_url: string }[]) {
    if (CATEGORIES.includes(row.category_slug as (typeof CATEGORIES)[number])) {
      map[row.category_slug as (typeof CATEGORIES)[number]] = row.image_url
    }
  }
  return NextResponse.json(map)
}
