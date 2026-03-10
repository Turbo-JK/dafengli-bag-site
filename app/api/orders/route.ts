import { NextResponse } from "next/server"
import { mockOrders } from "@/lib/mock-data"

// Generate order number: MS + YYYYMMDD + 3-digit sequence
function generateOrderNumber(): string {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "")
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")
  return `MS${dateStr}${seq}`
}

// GET /api/orders - List all orders (Admin)
export async function GET(request: Request) {
  // TODO: Add auth check
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const limit = searchParams.get("limit")
  const offset = searchParams.get("offset")

  let filtered = [...mockOrders]

  if (status && status !== "all") {
    filtered = filtered.filter((o) => o.status === status)
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

// POST /api/orders - Create new order (Public checkout)
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (
      !body.customerName ||
      !body.phone ||
      !body.shippingAddress ||
      !body.items ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: customerName, phone, shippingAddress, items",
        },
        { status: 400 }
      )
    }

    // Validate phone
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(body.phone.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      )
    }

    // Calculate total
    const totalAmount = body.items.reduce(
      (sum: number, item: { unitPrice: number; quantity: number }) =>
        sum + item.unitPrice * item.quantity,
      0
    )

    // In real implementation, insert to database
    const newOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: generateOrderNumber(),
      customerName: body.customerName,
      phone: body.phone,
      email: body.email || null,
      shippingAddress: body.shippingAddress,
      shippingCity: body.shippingCity || null,
      shippingProvince: body.shippingProvince || null,
      shippingPostalCode: body.shippingPostalCode || null,
      items: body.items,
      totalAmount,
      status: "pending",
      paymentMethod: body.paymentMethod || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // TODO: Send order confirmation (email/SMS)

    return NextResponse.json({ data: newOrder }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }
}
