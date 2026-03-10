"use client"

import { Package, MessageSquare, ShoppingCart, TrendingUp, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { products, mockInquiries, mockOrders } from "@/lib/mock-data"

export default function AdminDashboard() {
  const inquiries = mockInquiries
  const orders = mockOrders
  const stats = [
    {
      title: "商品总数",
      value: products.length,
      icon: Package,
      change: "+2 本月",
    },
    {
      title: "待处理询价",
      value: inquiries.filter((i) => i.status === "pending").length,
      icon: MessageSquare,
      change: `${inquiries.length} 总计`,
    },
    {
      title: "订单总数",
      value: orders.length,
      icon: ShoppingCart,
      change: `¥${orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString("zh-CN")}`,
    },
    {
      title: "本月浏览",
      value: "12.5K",
      icon: Eye,
      change: "+18% vs 上月",
    },
  ]

  const recentInquiries = inquiries.slice(0, 5)
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl">控制台</h1>
        <p className="mt-1 text-sm text-muted-foreground">欢迎回来，查看最新数据概览</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-normal text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Inquiries */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <MessageSquare className="h-4 w-4" />
              最新询价
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{inquiry.customerName}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {inquiry.productTitle} · {inquiry.colorName}
                    </p>
                  </div>
                  <span
                    className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs ${
                      inquiry.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : inquiry.status === "replied"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {inquiry.status === "pending"
                      ? "待回复"
                      : inquiry.status === "replied"
                        ? "已回复"
                        : "已关闭"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <TrendingUp className="h-4 w-4" />
              最新订单
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{order.orderNumber}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {order.customerName} · {order.items.length} 件商品
                    </p>
                  </div>
                  <div className="ml-2 text-right">
                    <p className="text-sm font-medium">
                      ¥{order.totalAmount.toLocaleString("zh-CN")}
                    </p>
                    <span
                      className={`text-xs ${
                        order.status === "pending"
                          ? "text-amber-600"
                          : order.status === "paid"
                            ? "text-blue-600"
                            : order.status === "shipped"
                              ? "text-indigo-600"
                              : "text-green-600"
                      }`}
                    >
                      {order.status === "pending"
                        ? "待付款"
                        : order.status === "paid"
                          ? "已付款"
                          : order.status === "shipped"
                            ? "已发货"
                            : "已完成"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
