'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { UploadCloud } from 'lucide-react'

const BAG_TYPES = [
  { key: 'tote', nameZh: '托特包', nameEn: 'Tote' },
  { key: 'crossbody', nameZh: '斜挎包', nameEn: 'Crossbody' },
  { key: 'clutch', nameZh: '手拿包', nameEn: 'Clutch' },
  { key: 'bucket', nameZh: '水桶包', nameEn: 'Bucket' },
] as const

export default function AdminCategoryIconsPage() {
  const [icons, setIcons] = useState<Record<string, string | null>>({
    tote: null,
    crossbody: null,
    clutch: null,
    bucket: null,
  })
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const res = await fetch('/api/admin/category-icons')
        if (res.ok) {
          const data = await res.json()
          setIcons(data)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchIcons()
  }, [])

  const handleUpload = async (category: string, file: File) => {
    setUploading(category)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!uploadRes.ok) throw new Error('上传失败')
      const { url } = await uploadRes.json()

      const putRes = await fetch('/api/admin/category-icons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, imageUrl: url }),
      })
      if (!putRes.ok) throw new Error('保存失败')
      setIcons((prev) => ({ ...prev, [category]: url }))
    } catch (e) {
      console.error(e)
    } finally {
      setUploading(null)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-muted-foreground">加载中...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="font-serif text-2xl">包型图标</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          设置首页「按包型选购」四个圆圈的图片，未上传时显示字母（T / C / Cl / B）。
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BAG_TYPES.map(({ key, nameZh, nameEn }) => (
          <div
            key={key}
            className="flex flex-col items-center gap-3 rounded-lg border border-border/60 bg-card p-6"
          >
            <span className="text-xs text-muted-foreground">
              {nameZh} / {nameEn}
            </span>
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-muted/60">
              {icons[key] ? (
                <Image
                  src={icons[key]!}
                  alt={nameZh}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-lg font-medium text-muted-foreground">
                  {key === 'clutch' ? 'Cl' : key[0].toUpperCase()}
                </span>
              )}
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
              <UploadCloud className="h-4 w-4" />
              {uploading === key ? '上传中...' : '上传图片'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading !== null}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUpload(key, file)
                  e.target.value = ''
                }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
