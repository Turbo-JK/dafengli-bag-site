 "use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, UploadCloud, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import type { Product, ProductImage } from "@/lib/types"

interface AdminProduct extends Product {}

interface ExtraVariantForm {
  id: string
  colorName: string
  colorHex: string
  price: string
  compareAtPrice: string
  inventory: string
  sku: string
  file: File | null
}

const COMMON_COLORS = [
  { hex: "#000000", nameZh: "经典黑", nameEn: "Black" },
  { hex: "#B7A89A", nameZh: "大象灰", nameEn: "Etoupe" },
  { hex: "#C19A6B", nameZh: "焦糖棕", nameEn: "Caramel" },
  { hex: "#F5F0E8", nameZh: "奶油白", nameEn: "Cream" },
  { hex: "#8B4513", nameZh: "深棕色", nameEn: "Brown" },
  { hex: "#B22222", nameZh: "正红", nameEn: "Red" },
  { hex: "#6B1C23", nameZh: "酒红", nameEn: "Burgundy" },
  { hex: "#D4A0A0", nameZh: "玫瑰粉", nameEn: "Rose" },
  { hex: "#9CAF88", nameZh: "墨绿色", nameEn: "Green" },
  { hex: "#1B2A4A", nameZh: "藏蓝", nameEn: "Navy" },
  { hex: "#C5A55A", nameZh: "金色", nameEn: "Gold" },
  { hex: "#7C7C7C", nameZh: "深灰", nameEn: "Dark Grey" },
] as const

export default function AdminProductsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [extraVariants, setExtraVariants] = useState<ExtraVariantForm[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)

  const [formState, setFormState] = useState<{
    titleZh: string
    titleEn: string
    slug: string
    collection: string
    category: string
    material: string
    size: string
    weight: string
    moq: string
    productionTime: string
    customizationAvailable: boolean
    status: "active" | "inactive"
    isNew: boolean
    isFeatured: boolean
    price: string
    compareAtPrice: string
    inventory: string
    sku: string
    colorName: string
    colorHex: string
    descriptionZh: string
    descriptionEn: string
  }>({
    titleZh: "",
    titleEn: "",
    slug: "",
    collection: "",
    category: "",
    material: "",
    size: "",
    weight: "",
    moq: "1",
    productionTime: "",
    customizationAvailable: true,
    status: "active",
    isNew: true,
    isFeatured: false,
    price: "",
    compareAtPrice: "",
    inventory: "1",
    sku: "",
    colorName: "",
    colorHex: "#000000",
    descriptionZh: "",
    descriptionEn: "",
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/products")
        if (!res.ok) return
        const json = await res.json()
        setProducts(json.data as AdminProduct[])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleOpenDialog = () => {
    setIsEditing(false)
    setEditingProduct(null)
    setFormState((prev) => ({
      ...prev,
      titleZh: "",
      titleEn: "",
      slug: "",
      collection: "",
      category: "",
      material: "",
      size: "",
      weight: "",
      moq: "1",
      productionTime: "",
      customizationAvailable: true,
      status: "active",
      isNew: true,
      isFeatured: false,
      price: "",
      compareAtPrice: "",
      inventory: "1",
      sku: "",
      colorName: "",
      colorHex: "#000000",
      descriptionZh: "",
      descriptionEn: "",
    }))
    setCoverFile(null)
    setExtraVariants([])
    setIsDialogOpen(true)
  }

  const handleEdit = (product: AdminProduct) => {
    const mainVariant = product.variants[0]

    setIsEditing(true)
    setEditingProduct(product)
    setFormState({
      titleZh: product.titleZh,
      titleEn: product.titleEn,
      slug: product.slug,
      collection: product.collection,
      category: product.category,
      material: product.material,
      size: product.size,
      weight: product.weight,
      moq: String(product.moq),
      productionTime: product.productionTime,
      customizationAvailable: product.customizationAvailable,
      status: product.status,
      isNew: product.isNew,
      isFeatured: product.isFeatured,
      price: mainVariant ? String(mainVariant.price) : "",
      compareAtPrice: mainVariant?.compareAtPrice
        ? String(mainVariant.compareAtPrice)
        : "",
      inventory: mainVariant ? String(mainVariant.inventory) : "",
      sku: mainVariant?.sku ?? "",
      colorName: mainVariant?.colorName ?? "",
      colorHex: mainVariant?.colorHex ?? "#000000",
      descriptionZh: product.descriptionZh,
      descriptionEn: product.descriptionEn,
    })
    setCoverFile(null)
    setExtraVariants([])
    setIsDialogOpen(true)
  }

  const handleView = (product: AdminProduct) => {
    // 默认跳转到中文详情页
    router.push(`/zh/bags/${product.slug}`)
  }

  const handleToggleStatus = async (product: AdminProduct) => {
    const nextStatus = product.status === "active" ? "inactive" : "active"
    const action = nextStatus === "active" ? "上架" : "下架"
    try {
      const res = await fetch(`/api/products/${product.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: {
            slug: product.slug,
            titleEn: product.titleEn,
            titleZh: product.titleZh,
            descriptionEn: product.descriptionEn,
            descriptionZh: product.descriptionZh,
            material: product.material,
            size: product.size,
            weight: product.weight,
            moq: product.moq,
            productionTime: product.productionTime,
            customizationAvailable: product.customizationAvailable,
            status: nextStatus,
            collection: product.collection,
            category: product.category,
            tags: product.tags,
            isNew: product.isNew,
            isFeatured: product.isFeatured,
          },
        }),
      })
      if (!res.ok) return
      const refreshed = await fetch("/api/products")
      if (refreshed.ok) {
        const json = await refreshed.json()
        setProducts(json.data as AdminProduct[])
      }
    } catch (e) {
      console.error(action + "失败", e)
    }
  }

  const handleDelete = async (product: AdminProduct) => {
    const ok = window.confirm(`确认删除商品「${product.titleZh}」吗？此操作不可撤销。`)
    if (!ok) return

    try {
      const res = await fetch(`/api/products/${product.slug}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        console.error("删除商品失败")
        return
      }

      const refreshed = await fetch("/api/products")
      if (refreshed.ok) {
        const json = await refreshed.json()
        setProducts(json.data as AdminProduct[])
      }
    } catch (error) {
      console.error("删除商品异常", error)
    }
  }

  const handleSave = async () => {
    // 必填：中文名、英文名、Slug、分类
    if (!formState.titleZh?.trim()) return
    if (!formState.titleEn?.trim()) return
    if (!formState.slug?.trim()) return
    if (!formState.category?.trim()) return

    setIsSaving(true)
    try {
      // 编辑模式：只更新商品基础信息（不动已有图片和变体）
      if (isEditing && editingProduct) {
        const payload = {
          product: {
            slug: formState.slug,
            titleEn: formState.titleEn,
            titleZh: formState.titleZh,
            descriptionEn: formState.descriptionEn || formState.titleEn,
            descriptionZh: formState.descriptionZh || formState.titleZh,
            material: formState.material,
            size: formState.size,
            weight: formState.weight,
            moq: Number(formState.moq || editingProduct.moq),
            productionTime: formState.productionTime || editingProduct.productionTime,
            customizationAvailable: editingProduct.customizationAvailable,
            status: formState.status,
            collection: formState.collection,
            category: formState.category,
            tags: editingProduct.tags,
            isNew: formState.isNew,
            isFeatured: formState.isFeatured,
          },
        }

        const res = await fetch(`/api/products/${editingProduct.slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          console.error("更新商品失败")
          return
        }

        const refreshed = await fetch("/api/products")
        if (refreshed.ok) {
          const json = await refreshed.json()
          setProducts(json.data as AdminProduct[])
        }

        setIsDialogOpen(false)
        return
      }

      const uploadImage = async (file: File | null) => {
        if (!file) return ""
        const formData = new FormData()
        formData.append("file", file)
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        if (!uploadRes.ok) {
          throw new Error("上传图片失败")
        }
        const uploadJson = await uploadRes.json()
        return uploadJson.url as string
      }

      // 主色封面图
      const mainImageUrl = await uploadImage(coverFile)

      // 其他颜色的图片
      const extraImageUrls: Record<string, string> = {}
      for (const variant of extraVariants) {
        if (variant.file) {
          const url = await uploadImage(variant.file)
          extraImageUrls[variant.id] = url
        }
      }

      const payload = {
        product: {
          slug: formState.slug,
          titleEn: formState.titleEn,
          titleZh: formState.titleZh,
          descriptionEn: formState.descriptionEn || formState.titleEn,
          descriptionZh: formState.descriptionZh || formState.titleZh,
          material: formState.material,
          size: formState.size,
          weight: formState.weight,
          moq: Number(formState.moq || 1),
          productionTime: formState.productionTime,
          customizationAvailable: formState.customizationAvailable,
          status: formState.status,
          collection: formState.collection,
          category: formState.category,
          tags: [],
          isNew: formState.isNew,
          isFeatured: formState.isFeatured,
        },
        variants: [
          // 主色变体
          {
            colorName: formState.colorName || "Default",
            colorHex: formState.colorHex || "#000000",
            price: Number(formState.price || 0),
            compareAtPrice: formState.compareAtPrice ? Number(formState.compareAtPrice) : undefined,
            inventory: Number(formState.inventory || 0),
            sku: formState.sku,
            isDefault: true,
            images: mainImageUrl
              ? [
                  {
                    url: mainImageUrl,
                    alt: `${formState.titleZh || formState.titleEn} - ${formState.colorName || "Default"}`,
                    type: "studio" as ProductImage["type"],
                    orderIndex: 0,
                  },
                ]
              : [],
          },
          // 其他颜色变体
          ...extraVariants.map((variant, index) => {
            const url = extraImageUrls[variant.id]
            return {
              colorName: variant.colorName || `Variant ${index + 1}`,
              colorHex: variant.colorHex || "#000000",
              price: Number(variant.price || formState.price || 0),
              compareAtPrice: variant.compareAtPrice
                ? Number(variant.compareAtPrice)
                : formState.compareAtPrice
                  ? Number(formState.compareAtPrice)
                  : undefined,
              inventory: Number(variant.inventory || formState.inventory || 0),
              sku: variant.sku || formState.sku,
              isDefault: false,
              images: url
                ? [
                    {
                      url,
                      alt: `${formState.titleZh || formState.titleEn} - ${variant.colorName || `Variant ${index + 1}`}`,
                      type: "studio" as ProductImage["type"],
                      orderIndex: 0,
                    },
                  ]
                : [],
            }
          }),
        ],
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("保存商品失败")
      }

      const refreshed = await fetch("/api/products")
      if (refreshed.ok) {
        const json = await refreshed.json()
        setProducts(json.data as AdminProduct[])
      }

      setIsDialogOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  const filtered = products.filter(
    (p) =>
      p.titleZh.toLowerCase().includes(search.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      p.variants.some((v) => v.sku.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl">商品管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLoading ? "加载中..." : `共 ${products.length} 件商品`}
          </p>
        </div>
        <Button className="gap-2" onClick={handleOpenDialog}>
          <Plus className="h-4 w-4" />
          添加商品
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="搜索商品名称、SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-border/50 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">图片</TableHead>
              <TableHead>商品名称</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>分类</TableHead>
              <TableHead>变体</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden bg-secondary">
                    <Image
                      src={
                        product.variants[0]?.images[0]?.url ||
                        "/images/placeholder.jpg"
                      }
                      alt={product.titleZh}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{product.titleZh}</p>
                    <p className="text-xs text-muted-foreground">{product.titleEn}</p>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {product.variants.slice(0, 3).map((v) => (
                      <div
                        key={v.id}
                        className="h-5 w-5 rounded-full border border-border/50"
                        style={{ backgroundColor: v.colorHex }}
                        title={v.colorName}
                      />
                    ))}
                    {product.variants.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{product.variants.length - 3}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={product.status === "active" ? "default" : "secondary"}
                    className="font-normal"
                  >
                    {product.status === "active" ? "上架" : "下架"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => handleView(product)}
                      >
                        <Eye className="h-4 w-4" />
                        查看
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="h-4 w-4" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => handleToggleStatus(product)}
                      >
                        {product.status === "active" ? (
                          <>
                            <ArrowDownCircle className="h-4 w-4" />
                            下架
                          </>
                        ) : (
                          <>
                            <ArrowUpCircle className="h-4 w-4" />
                            上架
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2 text-destructive"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "编辑商品" : "添加商品"}</DialogTitle>
          </DialogHeader>

          <p className="text-xs text-muted-foreground mb-2">
            带 <span className="text-foreground font-medium">必填</span> 的为必填项，其余为选填。
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <Input
                  placeholder="中文名称 (必填)"
                  value={formState.titleZh}
                  onChange={(e) => setFormState((s) => ({ ...s, titleZh: e.target.value }))}
                />
                <p className="mt-0.5 text-[10px] text-muted-foreground">必填</p>
              </div>
              <div>
                <Input
                  placeholder="英文名称 (必填)"
                  value={formState.titleEn}
                  onChange={(e) => setFormState((s) => ({ ...s, titleEn: e.target.value }))}
                />
                <p className="mt-0.5 text-[10px] text-muted-foreground">必填</p>
              </div>
              <div>
                <Input
                  placeholder="Slug 网址别名，如 maison-tote (必填)"
                  value={formState.slug}
                  onChange={(e) => setFormState((s) => ({ ...s, slug: e.target.value }))}
                />
                <p className="mt-0.5 text-[10px] text-muted-foreground">必填，英文且唯一</p>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  包型分类 (必选)
                </label>
                <select
                  value={formState.category}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, category: e.target.value }))
                  }
                  className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value="">请选择包型</option>
                  <option value="tote">Tote / 托特包</option>
                  <option value="crossbody">Crossbody / 斜挎包</option>
                  <option value="clutch">Clutch / 手拿包</option>
                  <option value="bucket">Bucket / 水桶包</option>
                </select>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  将用于前台按包型筛选
                </p>
              </div>
              <Input placeholder="系列 (选填)" value={formState.collection} onChange={(e) => setFormState((s) => ({ ...s, collection: e.target.value }))} />
              <Input placeholder="材质 (选填)" value={formState.material} onChange={(e) => setFormState((s) => ({ ...s, material: e.target.value }))} />
              <Input placeholder="尺寸 (选填)" value={formState.size} onChange={(e) => setFormState((s) => ({ ...s, size: e.target.value }))} />
              <Input placeholder="重量 (选填)" value={formState.weight} onChange={(e) => setFormState((s) => ({ ...s, weight: e.target.value }))} />
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-muted-foreground">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formState.isNew}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, isNew: e.target.checked }))
                    }
                  />
                  <span>展示在「新品上市」</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formState.isFeatured}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, isFeatured: e.target.checked }))
                    }
                  />
                  <span>作为首页推荐</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                type="number"
                placeholder="价格 CNY (选填，不填则显示为 0)"
                value={formState.price}
                onChange={(e) => setFormState((s) => ({ ...s, price: e.target.value }))}
              />
              <Input placeholder="SKU (选填)" value={formState.sku} onChange={(e) => setFormState((s) => ({ ...s, sku: e.target.value }))} />
              <Input type="number" placeholder="对比价格 (选填)" value={formState.compareAtPrice} onChange={(e) => setFormState((s) => ({ ...s, compareAtPrice: e.target.value }))} />
              <Input type="number" placeholder="库存 (选填)" value={formState.inventory} onChange={(e) => setFormState((s) => ({ ...s, inventory: e.target.value }))} />
              <Input type="number" placeholder="MOQ 起订量 (选填)" value={formState.moq} onChange={(e) => setFormState((s) => ({ ...s, moq: e.target.value }))} />
              <Input placeholder="生产周期 (选填)" value={formState.productionTime} onChange={(e) => setFormState((s) => ({ ...s, productionTime: e.target.value }))} />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">主色 (选填)：</span>
                  <Input
                    type="color"
                    className="h-9 w-16 p-1"
                    value={formState.colorHex}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, colorHex: e.target.value }))
                    }
                  />
                  <Input
                    placeholder="颜色名称"
                    value={formState.colorName}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, colorName: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {COMMON_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() =>
                        setFormState((s) => ({
                          ...s,
                          colorHex: c.hex,
                          colorName: c.nameZh,
                        }))
                      }
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] leading-none ${
                        formState.colorHex === c.hex
                          ? "border-foreground"
                          : "border-border"
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-border"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.nameZh}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">封面图片 (选填)</p>
                <label className="flex h-24 cursor-pointer items-center justify-center gap-2 border border-dashed border-border text-xs text-muted-foreground hover:bg-muted/40">
                  <UploadCloud className="h-4 w-4" />
                  {coverFile ? coverFile.name : "点击上传图片"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setCoverFile(file)
                    }}
                  />
                </label>
                <p className="text-[10px] text-muted-foreground">
                  建议 4:5 竖图、约 800×1000 像素，单张不超过 5MB；页面将统一按 4:5 裁剪显示。
                </p>
              </div>
              {/* 其他颜色变体 */}
              <div className="space-y-3 pt-4">
                <p className="text-xs font-medium text-muted-foreground">其他颜色（可选）</p>
                {extraVariants.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="space-y-2 rounded-md border border-dashed border-border/70 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        颜色 {index + 2}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() =>
                          setExtraVariants((prev) => prev.filter((v) => v.id !== variant.id))
                        }
                      >
                        删除
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          className="h-9 w-16 p-1"
                          value={variant.colorHex}
                          onChange={(e) =>
                            setExtraVariants((prev) =>
                              prev.map((v) =>
                                v.id === variant.id
                                  ? { ...v, colorHex: e.target.value }
                                  : v,
                              )
                            )
                          }
                        />
                        <Input
                          placeholder="颜色名称（如 象牙白）"
                          value={variant.colorName}
                          onChange={(e) =>
                            setExtraVariants((prev) =>
                              prev.map((v) =>
                                v.id === variant.id
                                  ? { ...v, colorName: e.target.value }
                                  : v,
                              )
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {COMMON_COLORS.map((c) => (
                          <button
                            key={c.hex}
                            type="button"
                            onClick={() =>
                              setExtraVariants((prev) =>
                                prev.map((v) =>
                                  v.id === variant.id
                                    ? {
                                        ...v,
                                        colorHex: c.hex,
                                        colorName: c.nameZh,
                                      }
                                    : v,
                                )
                              )
                            }
                            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] leading-none ${
                              variant.colorHex === c.hex
                                ? "border-foreground"
                                : "border-border"
                            }`}
                          >
                            <span
                              className="h-3 w-3 rounded-full border border-border"
                              style={{ backgroundColor: c.hex }}
                            />
                            <span>{c.nameZh}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <Input
                      placeholder="SKU（可选，默认继承主色 SKU）"
                      value={variant.sku}
                      onChange={(e) =>
                        setExtraVariants((prev) =>
                          prev.map((v) =>
                            v.id === variant.id ? { ...v, sku: e.target.value } : v,
                          )
                        )
                      }
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="价格（可选，默认继承主色）"
                        value={variant.price}
                        onChange={(e) =>
                          setExtraVariants((prev) =>
                            prev.map((v) =>
                              v.id === variant.id ? { ...v, price: e.target.value } : v,
                            )
                          )
                        }
                      />
                      <Input
                        type="number"
                        placeholder="库存（可选，默认继承主色）"
                        value={variant.inventory}
                        onChange={(e) =>
                          setExtraVariants((prev) =>
                            prev.map((v) =>
                              v.id === variant.id ? { ...v, inventory: e.target.value } : v,
                            )
                          )
                        }
                      />
                    </div>
                    <label className="mt-1 flex h-20 cursor-pointer items-center justify-center gap-2 border border-dashed border-border text-xs text-muted-foreground hover:bg-muted/40">
                      <UploadCloud className="h-4 w-4" />
                      {variant.file ? variant.file.name : "上传该颜色的图片"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          setExtraVariants((prev) =>
                            prev.map((v) =>
                              v.id === variant.id ? { ...v, file } : v,
                            )
                          )
                        }}
                      />
                    </label>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 w-full border-dashed text-xs"
                  onClick={() =>
                    setExtraVariants((prev) => [
                      ...prev,
                      {
                        id: `${Date.now()}-${prev.length + 1}`,
                        colorName: "",
                        colorHex: "#ffffff",
                        price: "",
                        compareAtPrice: "",
                        inventory: "",
                        sku: "",
                        file: null,
                      },
                    ])
                  }
                >
                  + 添加其他颜色
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4">
            <Textarea
              placeholder="中文描述"
              value={formState.descriptionZh}
              onChange={(e) =>
                setFormState((s) => ({ ...s, descriptionZh: e.target.value }))
              }
            />
            <Textarea
              placeholder="英文描述"
              value={formState.descriptionEn}
              onChange={(e) =>
                setFormState((s) => ({ ...s, descriptionEn: e.target.value }))
              }
            />
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "保存中..." : "保存商品"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
