import { NextResponse } from 'next/server'

// Web Crypto HMAC — works in Edge runtime (where middleware runs)
async function getExpectedToken(secret) {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('voomet-admin-v1'))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // /admin/:path+ → protected pages (excludes /admin itself which is the login)
  // /api/admin/:path+ → protected API routes (excludes /api/admin/login)
  const protectedPage = pathname.startsWith('/admin/') // has a sub-path
  const protectedApi  = pathname.startsWith('/api/admin/') && !pathname.startsWith('/api/admin/login')

  if (!protectedPage && !protectedApi) return NextResponse.next()

  const secret = process.env.ADMIN_SECRET
  if (!secret) {
    if (protectedApi) return NextResponse.json({ error: 'Admin not configured' }, { status: 503 })
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  const cookieToken = request.cookies.get('admin_token')?.value
  const expectedToken = await getExpectedToken(secret)

  if (cookieToken !== expectedToken) {
    if (protectedApi) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path+', '/api/admin/:path+'],
}
