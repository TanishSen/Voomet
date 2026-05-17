import { NextResponse } from 'next/server'
import { getDb } from '@/backend/db'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const db = await getDb()
    const images = await db
      .collection('image_slots')
      .find({}, { projection: { _id: 0 } })
      .sort({ section: 1, uploadedAt: -1 })
      .toArray()
    return NextResponse.json({ images })
  } catch (err) {
    console.error('Admin images GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file    = formData.get('file')
    const section = formData.get('section')
    const label   = formData.get('label') || file?.name || 'Untitled'

    if (!file || !section) {
      return NextResponse.json({ error: 'file and section are required' }, { status: 400 })
    }

    const bytes  = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const ext    = path.extname(file.name) || '.jpg'
    const id     = crypto.randomUUID()
    const filename = `${id}${ext}`

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', section)
    await mkdir(uploadDir, { recursive: true })
    await writeFile(path.join(uploadDir, filename), buffer)

    const url = `/uploads/${section}/${filename}`
    const db  = await getDb()
    const record = { id, section, label, filename, url, uploadedAt: new Date().toISOString() }
    await db.collection('image_slots').insertOne({ ...record })

    return NextResponse.json({ ok: true, image: record })
  } catch (err) {
    console.error('Admin image upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
