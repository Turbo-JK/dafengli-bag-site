"use client"

import { useState } from "react"
import { Search, MessageSquare, Phone, Mail, Clock, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockInquiries } from "@/lib/mock-data"

const statusConfig = {
  pending: { label: "待回复", color: "bg-amber-100 text-amber-700", icon: Clock },
  replied: { label: "已回复", color: "bg-blue-100 text-blue-700", icon: MessageSquare },
  closed: { label: "已关闭", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
}

export default function AdminInquiriesPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const inquiries = mockInquiries.map((inq) => {
    const baseName =
      (inq.customerEmail && inq.customerEmail.split("@")[0]) || "客户"

    const status =
      inq.status === "new"
        ? "pending"
        : inq.status === "contacted"
          ? "replied"
          : "closed"

    return {
      id: inq.id,
      customerName: baseName,
      productTitle: `商品 ${inq.productId}`,
      colorName: inq.variantId,
      productSku: inq.variantId,
      message: "",
      phone: "",
      email: inq.customerEmail,
      status,
      createdAt: inq.createdAt,
    }
  })

  const filtered = inquiries.filter((inquiry) => {
    const matchSearch =
      inquiry.customerName.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.productTitle.toLowerCase().includes(search.toLowerCase())
    const matchTab = activeTab === "all" || inquiry.status === activeTab
    return matchSearch && matchTab
  })

  const counts = {
    all: inquiries.length,
    pending: inquiries.filter((i) => i.status === "pending").length,
    replied: inquiries.filter((i) => i.status === "replied").length,
    closed: inquiries.filter((i) => i.status === "closed").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl">询价管理</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          管理客户询价，及时回复提升转化
        </p>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">全部 ({counts.all})</TabsTrigger>
            <TabsTrigger value="pending">待回复 ({counts.pending})</TabsTrigger>
            <TabsTrigger value="replied">已回复 ({counts.replied})</TabsTrigger>
            <TabsTrigger value="closed">已关闭 ({counts.closed})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索客户或商品..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Inquiry Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((inquiry) => {
          const config = statusConfig[inquiry.status]
          const StatusIcon = config.icon

          return (
            <Card key={inquiry.id} className="border-border/50">
              <CardHeader className="flex flex-row items-start justify-between pb-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium">{inquiry.customerName}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(inquiry.createdAt).toLocaleDateString("zh-CN", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Badge className={`${config.color} shrink-0 gap-1 font-normal`}>
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-sm font-medium">{inquiry.productTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    {inquiry.colorName} · SKU: {inquiry.productSku}
                  </p>
                </div>

                {inquiry.message && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {inquiry.message}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {inquiry.phone}
                  </span>
                  {inquiry.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {inquiry.email}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {inquiry.status === "pending" && (
                    <>
                      <Button size="sm" className="flex-1">
                        回复
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        WhatsApp
                      </Button>
                    </>
                  )}
                  {inquiry.status === "replied" && (
                    <Button size="sm" variant="outline" className="w-full gap-1">
                      <XCircle className="h-3 w-3" />
                      关闭询价
                    </Button>
                  )}
                  {inquiry.status === "closed" && (
                    <Button size="sm" variant="ghost" className="w-full">
                      查看详情
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <MessageSquare className="mx-auto h-12 w-12 opacity-30" />
          <p className="mt-4">暂无询价记录</p>
        </div>
      )}
    </div>
  )
}
