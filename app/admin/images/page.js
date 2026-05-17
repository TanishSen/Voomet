'use client'

import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import AdminShell from '@/components/admin/AdminShell'
import { IMAGE_SECTIONS } from '@/lib/admin-auth'
import { Upload, Trash2, Copy, ImageOff, Loader2 } from 'lucide-react'

export default function AdminImages() {
  const [activeSection, setActiveSection] = useState(IMAGE_SECTIONS[0].key)
  const [allImages,     setAllImages]     = useState([])
  const [loading,       setLoading]       = useState(true)
  const [uploading,     setUploading]     = useState(false)
  const [dragging,      setDragging]      = useState(false)
  const fileRef = useRef(null)

  const fetchImages = async () => {
    try {
      const res  = await fetch('/api/admin/images', { credentials: 'same-origin' })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast.error(`Failed to load images: ${err.error || res.status}`)
        setLoading(false)
        return
      }
      const data = await res.json()
      setAllImages(data.images || [])
    } catch (e) {
      toast.error('Failed to load images: ' + e.message)
    }
    setLoading(false)
  }

  useEffect(() => { fetchImages() }, [])

  const upload = async (files) => {
    if (!files?.length) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file',    file)
      fd.append('section', activeSection)
      fd.append('label',   file.name)
      try {
        const res  = await fetch('/api/admin/images', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Upload failed')
        toast.success(`${file.name} uploaded`)
      } catch (err) {
        toast.error(err.message)
      }
    }
    setUploading(false)
    await fetchImages()
  }

  const deleteImage = async (id, label) => {
    if (!window.confirm(`Delete "${label}"?`)) return
    try {
      const res = await fetch(`/api/admin/images/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      toast.success('Image deleted')
      setAllImages(prev => prev.filter(img => img.id !== id))
    } catch {
      toast.error('Failed to delete image')
    }
  }

  const copyURL = (url) => {
    navigator.clipboard.writeText(url)
    toast.success('URL copied to clipboard')
  }

  const sectionImages = allImages.filter(img => img.section === activeSection)
  const countFor      = (key) => allImages.filter(img => img.section === key).length
  const activeLabel   = IMAGE_SECTIONS.find(s => s.key === activeSection)?.label

  return (
    <AdminShell>
      <div className="flex min-h-screen">

        {/* Section sidebar */}
        <aside className="w-52 bg-white border-r border-neutral-200 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
          <div className="p-4 border-b border-neutral-100">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Sections</p>
          </div>
          <nav className="p-2">
            {IMAGE_SECTIONS.map(s => {
              const count  = countFor(s.key)
              const active = activeSection === s.key
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-sm mb-0.5 transition-colors ${
                    active
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span className="truncate">{s.label}</span>
                  {count > 0 && (
                    <span className={`ml-2 text-[11px] flex-shrink-0 ${active ? 'text-white/60' : 'text-neutral-400'}`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-neutral-900 tracking-tight">{activeLabel}</h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              {sectionImages.length} image{sectionImages.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Upload zone */}
          <div
            onDragOver={e  => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files) }}
            onClick={() => !uploading && fileRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all mb-8 select-none ${
              dragging
                ? 'border-neutral-900 bg-neutral-50 scale-[1.01]'
                : uploading
                ? 'border-neutral-300 bg-neutral-50 cursor-default'
                : 'border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => upload(e.target.files)}
            />
            <div className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center">
                {uploading
                  ? <Loader2 className="h-5 w-5 text-neutral-600 animate-spin" />
                  : <Upload  className="h-5 w-5 text-neutral-400" />
                }
              </div>
              <p className="text-sm font-medium text-neutral-700">
                {uploading ? 'Uploading…' : 'Drop images here, or click to upload'}
              </p>
              <p className="text-xs text-neutral-400">
                PNG · JPG · WEBP · GIF &mdash; uploads to <strong>{activeLabel}</strong> section
              </p>
            </div>
          </div>

          {/* Image grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20 text-sm text-neutral-400">
              <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading images…
            </div>
          ) : sectionImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
              <ImageOff className="h-10 w-10 mb-3 text-neutral-200" />
              <p className="text-sm">No images in this section yet.</p>
              <p className="text-xs mt-1">Upload some above to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sectionImages.map(img => (
                <ImageCard
                  key={img.id}
                  img={img}
                  onDelete={() => deleteImage(img.id, img.label)}
                  onCopy={() => copyURL(img.url)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}

function ImageCard({ img, onDelete, onCopy }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-100 border border-neutral-200 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.url}
        alt={img.label}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Hover overlay */}
      {hovered && (
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2.5 p-3">
          <p className="text-xs text-white/80 text-center line-clamp-2 leading-tight w-full">
            {img.label}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onCopy}
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white rounded-lg px-3 py-1.5 text-xs transition-colors"
            >
              <Copy className="h-3 w-3" /> Copy URL
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-1 bg-red-500/80 hover:bg-red-500 text-white rounded-lg px-3 py-1.5 text-xs transition-colors"
            >
              <Trash2 className="h-3 w-3" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
