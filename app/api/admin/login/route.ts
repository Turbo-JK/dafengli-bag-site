import { NextResponse } from 'next/server'

const ADMIN_COOKIE_NAME = 'admin_auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const username = String(body.username ?? '')
  const password = String(body.password ?? '')

  const expectedUser = process.env.ADMIN_USERNAME || ''
  const expectedPass = process.env.ADMIN_PASSWORD || ''
  const sessionToken = process.env.ADMIN_SESSION_TOKEN || ''

  if (!expectedUser || !expectedPass || !sessionToken) {
    return NextResponse.json(
      { ok: false, message: 'Admin login is not configured.' },
      { status: 500 },
    )
  }

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json(
      { ok: false, message: 'Invalid credentials.' },
      { status: 401 },
    )
  }

  const res = NextResponse.json({ ok: true })

  res.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 天
  })

  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return res
}

