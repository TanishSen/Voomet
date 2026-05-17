import { NextResponse } from 'next/server'
import { createSessionToken } from '@/lib/admin-auth'

export async function POST(request) {
  const { password } = await request.json()
  const secret = process.env.ADMIN_SECRET

  if (!secret || password !== secret) {
    // Constant-time-ish delay to slow brute-force attempts
    await new Promise(r => setTimeout(r, 600))
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = await createSessionToken(secret)
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  return res
}
