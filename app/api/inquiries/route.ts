import { NextResponse } from "next/server"
import { inquiries } from "@/lib/mock-data"

// GET /api/inquiries - List all inquiries (Admin)
export async function GET(request: Request) {
  // TODO: Add auth check
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const limit = searchParams.get("limit")
  const offset = searchParams.get("offset")

  let filtered = [...inquiries]

  if (status && status !== "all") {
    filtered = filtered.filter((i) => i.status === status)
  }

  // Sort by createdAt descending
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Pagination
  const total = filtered.length
  const limitNum = limit ? parseInt(limit) : 20
  const offsetNum = offset ? parseInt(offset) : 0
  filtered = filtered.slice(offsetNum, offsetNum + limitNum)

  return NextResponse.json({
    data: filtered,
    pagination: {
      total,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < total,
    },
  })
}

// POST /api/inquiries - Create new inquiry (Public)
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.customerName || !body.phone || !body.productId) {
      return NextResponse.json(
        { error: "Missing required fields: customerName, phone, productId" },
        { status: 400 }
      )
    }

    // Validate phone format (basic)
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(body.phone.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      )
    }

    // Validate email if provided
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        )
      }
    }

    // In real implementation, insert to database
    const newInquiry = {
      id: `inq_${Date.now()}`,
      ...body,
      status: "pending",
      source: body.source || "web",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // TODO: Send notification (email/webhook) to admin

    return NextResponse.json({ data: newInquiry }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }
}
