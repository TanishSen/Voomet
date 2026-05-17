// Next.js API route - thin wrapper that delegates to /backend modules
import { NextResponse } from 'next/server'
import { createLead, listLeads } from '@/backend/leads'

// ---------------------------------------------------------------------------
// In-memory rate limiter: max 10 requests per IP per 60 seconds
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 10
const rateLimitStore = new Map() // ip -> { count, resetAt }

function getClientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT_MAX) return true
  entry.count++
  return false
}

// ---------------------------------------------------------------------------
// CORS helper — only used for API responses (headers set per-response to
// complement the global next.config.js CORS headers on /api routes)
// ---------------------------------------------------------------------------
function corsHeaders() {
  const origin = process.env.NEXT_PUBLIC_BASE_URL || 'https://voomet.com'
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-secret',
  }
}

// ---------------------------------------------------------------------------
// Admin secret guard for sensitive endpoints
// ---------------------------------------------------------------------------
function isAdminAuthorised(request) {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false // if not configured, deny all
  return request.headers.get('x-admin-secret') === secret
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

export async function GET(request, { params }) {
  const path = params?.path || []
  const route = path.join('/')

  try {
    if (route === '' || route === 'health') {
      return NextResponse.json(
        { status: 'ok', service: 'voomet-api' },
        { headers: corsHeaders() }
      )
    }

    if (route === 'leads') {
      if (!isAdminAuthorised(request)) {
        return NextResponse.json(
          { error: 'Unauthorised' },
          { status: 401, headers: corsHeaders() }
        )
      }
      const leads = await listLeads(100)
      return NextResponse.json({ leads }, { headers: corsHeaders() })
    }

    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: corsHeaders() }
    )
  } catch (err) {
    console.error('GET error:', err)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500, headers: corsHeaders() }
    )
  }
}

export async function POST(request, { params }) {
  const path = params?.path || []
  const route = path.join('/')

  // Rate limit all POST requests by IP
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { ...corsHeaders(), 'Retry-After': '60' } }
    )
  }

  try {
    const body = await request.json().catch(() => ({}))

    if (route === 'leads') {
      const result = await createLead(body)
      if (!result.ok) {
        return NextResponse.json(
          { error: result.error },
          { status: result.status, headers: corsHeaders() }
        )
      }
      return NextResponse.json(
        { ok: true, lead: result.lead },
        { status: result.status, headers: corsHeaders() }
      )
    }

    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: corsHeaders() }
    )
  } catch (err) {
    console.error('POST error:', err)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500, headers: corsHeaders() }
    )
  }
}
