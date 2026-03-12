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

  // HTTP 环境下不能用 Secure，否则浏览器不会保存 cookie
  const isHttps =
    typeof request.headers.get('x-forwarded-proto') === 'string'
      ? request.headers.get('x-forwarded-proto') === 'https'
      : request.url.startsWith('https://')

  res.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isHttps,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 天
  })

  return res
}

export async function DELETE(request: Request) {
  const isHttps =
    typeof request.headers.get('x-forwarded-proto') === 'string'
      ? request.headers.get('x-forwarded-proto') === 'https'
      : request.url.startsWith('https://')

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: isHttps,
    path: '/',
    maxAge: 0,
  })
  return res
}

