import { NextResponse } from 'next/server'
import { getDb } from '@/backend/db'
import { unlink } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

export async function DELETE(_request, { params }) {
  try {
    const { id } = params
    const db = await getDb()
    const image = await db.collection('image_slots').findOne({ id }, { projection: { _id: 0 } })

    if (!image) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Remove file from public/uploads (best-effort)
    try {
      const filePath = path.join(process.cwd(), 'public', 'uploads', image.section, image.filename)
      await unlink(filePath)
    } catch (_) {
      // File already gone — continue
    }

    await db.collection('image_slots').deleteOne({ id })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin image delete error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
