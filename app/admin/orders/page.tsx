"use client"

import { useState } from "react"
import { Search, Package, Truck, CheckCircle, Clock, CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockOrders } from "@/lib/mock-data"

const statusConfig = {
  pending: { label: "待付款", color: "bg-amber-100 text-amber-700", icon: Clock },
  paid: { label: "已付款", color: "bg-blue-100 text-blue-700", icon: CreditCard },
  shipped: { label: "已发货", color: "bg-indigo-100 text-indigo-700", icon: Truck },
  completed: { label: "已完成", color: "bg-green-100 text-green-700", icon: CheckCircle },
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const orders = mockOrders.map((order) => {
    // 显示用的订单号，简单使用 id
    const orderNumber = order.id

    // 将后端 orderStatus 映射到前端使用的状态枚举
    const status =
      order.orderStatus === "pending"
        ? "pending"
        : order.orderStatus === "confirmed" || order.paymentStatus === "paid"
          ? "paid"
          : order.orderStatus === "shipped"
            ? "shipped"
            : "completed"

    return {
      id: order.id,
      orderNumber,
      customerName: order.customerName,
      phone: order.email,
      totalAmount: order.totalAmount,
      status,
      createdAt: order.createdAt,
      items: order.items,
    }
  })

  const filtered = orders.filter((order) => {
    const matchSearch =
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || order.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalRevenue = orders
    .filter((o) => o.status !== "pending")
    .reduce((sum, o) => sum + o.totalAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-2xl">订单管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            共 {orders.length} 笔订单 · 总收入 ¥{totalRevenue.toLocaleString("zh-CN")}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索订单号、客户..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="订单状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="pending">待付款</SelectItem>
            <SelectItem value="paid">已付款</SelectItem>
            <SelectItem value="shipped">已发货</SelectItem>
            <SelectItem value="completed">已完成</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-border/50 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>订单号</TableHead>
              <TableHead>客户</TableHead>
              <TableHead>商品</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>日期</TableHead>
              <TableHead className="w-24">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => {
              const config = statusConfig[order.status]
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <p key={idx} className="truncate text-sm">
                          {item.productTitle} × {item.quantity}
                        </p>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{order.items.length - 2} 件商品
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ¥{order.totalAmount.toLocaleString("zh-CN")}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${config.color} gap-1 font-normal`}>
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("zh-CN")}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      详情
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <Package className="mx-auto h-12 w-12 opacity-30" />
          <p className="mt-4">暂无订单</p>
        </div>
      )}
    </div>
  )
}
