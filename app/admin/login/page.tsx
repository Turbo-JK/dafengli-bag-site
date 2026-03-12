"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) return

    setLoading(true)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const text = await res.text()
        let msg = "登录失败，请检查账号和密码。"
        try {
          const data = JSON.parse(text)
          if (data?.message) msg = data.message
        } catch {
          if (text) msg = text
        }
        setError(msg)
        setLoading(false)
        return
      }

      // 登录成功后直接跳到商品管理页
      router.replace("/admin/products")
    } catch {
      setError("网络异常，请稍后重试。")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 border border-border/60 bg-card p-6 shadow-sm">
        <div className="space-y-1 text-center">
          <h1 className="font-serif text-2xl tracking-tight">DAFENGLI 后台登录</h1>
          <p className="text-xs text-muted-foreground">
            仅限内部使用，请输入管理员账号和密码。
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">账号</label>
            <Input
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">密码</label>
            <Input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2">
              <p className="text-sm font-medium text-destructive">{error}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {error.includes("not configured")
                  ? "请在服务器或 Vercel 环境变量中配置 ADMIN_USERNAME、ADMIN_PASSWORD、ADMIN_SESSION_TOKEN。"
                  : "请检查账号密码或稍后重试。"}
              </p>
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "登录中..." : "登录"}
          </Button>
        </form>
      </div>
    </div>
  )
}

