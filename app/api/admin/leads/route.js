import { NextResponse } from 'next/server'
import { listLeads } from '@/backend/leads'

export async function GET() {
  try {
    const leads = await listLeads(500)
    return NextResponse.json({ leads })
  } catch (err) {
    console.error('Admin leads error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
