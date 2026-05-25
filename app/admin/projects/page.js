'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import AdminShell from '@/components/admin/AdminShell'
import {
  Plus, Search, Pencil, Trash2, X, ImagePlus, CheckCircle2,
  Eye, EyeOff, GripVertical, Globe, FileEdit,
} from 'lucide-react'

/* ─── Mock initial data ─── */
const INITIAL_PROJECTS = [
  {
    id: 1,
    name: 'Orbit Interiors',
    description: 'A premium residential interior project featuring modern aesthetics with traditional Indian elements. Complete home renovation including living spaces, bedrooms, and kitchen design.',
    status: 'published',
    images: ['/portfolio/Orbit/3.jpg', '/portfolio/Orbit/26.jpg'],
    updatedAt: '15 Jan 2025',
  },
  {
    id: 2,
    name: 'PW Architecture',
    description: 'Large-scale architectural project combining modern design principles with sustainable building practices. Includes commercial spaces and mixed-use development.',
    status: 'published',
    images: ['/portfolio/PW/3.png'],
    updatedAt: '10 Jan 2025',
  },
  {
    id: 3,
    name: 'Juego Branding',
    description: 'Complete brand identity design for a gaming and entertainment company. Includes logo design, color palette, typography system, and brand guidelines.',
    status: 'published',
    images: ['/portfolio/juego/12.png'],
    updatedAt: '5 Jan 2025',
  },
  {
    id: 4,
    name: 'Qpi Platform',
    description: 'End-to-end UI/UX design for a B2B SaaS platform. Complex dashboard design with data visualisation components, user flows, and interactive prototypes.',
    status: 'published',
    images: ['/portfolio/Qpi/7.png'],
    updatedAt: '28 Dec 2024',
  },
  {
    id: 5,
    name: 'Appsforbarth',
    description: 'Full website design and development for a technology services company. Includes landing page, service pages, case studies, and a contact system.',
    status: 'published',
    images: ['/portfolio/Appsforbarth/17.png'],
    updatedAt: '20 Dec 2024',
  },
  {
    id: 6,
    name: 'Neofoods Identity',
    description: 'Fresh and bold brand identity for a modern food delivery startup. Logo, packaging design, social media kit, and restaurant menu design.',
    status: 'published',
    images: ['/portfolio/Orbit/26.jpg'],
    updatedAt: '15 Dec 2024',
  },
  {
    id: 7,
    name: 'Happey Spaces',
    description: 'Work in progress — cozy co-working space interior with ergonomic zones and vibrant collaborative areas.',
    status: 'draft',
    images: [],
    updatedAt: '8 Dec 2024',
  },
  {
    id: 8,
    name: 'Littlegym App',
    description: 'Mobile app design for a children\'s fitness and activity centre. Includes parent-facing app UI, class booking flow, and activity tracker.',
    status: 'draft',
    images: [],
    updatedAt: '1 Dec 2024',
  },
]

const EMPTY_FORM = { name: '', description: '', status: 'published', images: [] }

/* ─── Page ─── */
export default function ProjectsPage() {
  const [projects, setProjects]         = useState(INITIAL_PROJECTS)
  const [search,   setSearch]           = useState('')
  const [modal,    setModal]            = useState(null)   // null | 'add' | project-object
  const [delId,    setDelId]            = useState(null)   // id pending confirm
  const [form,     setForm]             = useState(EMPTY_FORM)
  const fileRef = useRef(null)

  /* Filtered list */
  const filtered = projects.filter(p =>
    `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase())
  )

  const published = projects.filter(p => p.status === 'published').length
  const drafts    = projects.filter(p => p.status === 'draft').length

  /* Open add modal */
  const openAdd = () => {
    setForm(EMPTY_FORM)
    setModal('add')
  }

  /* Open edit modal */
  const openEdit = (project) => {
    setForm({ ...project })
    setModal(project)
  }

  /* Close modal */
  const closeModal = () => {
    setModal(null)
    setForm(EMPTY_FORM)
  }

  /* Save (add or update) */
  const saveProject = () => {
    if (!form.name.trim()) return
    if (modal === 'add') {
      const newP = { ...form, id: Date.now(), updatedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) }
      setProjects(prev => [newP, ...prev])
    } else {
      setProjects(prev => prev.map(p => p.id === form.id ? { ...form, updatedAt: 'Just now' } : p))
    }
    closeModal()
  }

  /* Delete */
  const confirmDelete = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    setDelId(null)
  }

  /* Image picker (UI only — adds a placeholder path) */
  const handleImageFiles = (files) => {
    const names = Array.from(files).map(f => URL.createObjectURL(f))
    setForm(prev => ({ ...prev, images: [...prev.images, ...names] }))
  }

  const removeImage = (idx) =>
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))

  return (
    <AdminShell>
      <div className="p-8">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
          <div>
            <h1 className="text-[26px] font-bold text-neutral-900 leading-tight">Projects</h1>
            <p className="text-neutral-400 text-sm mt-1">
              {projects.length} total · {published} published · {drafts} draft{drafts !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 text-sm border border-neutral-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 w-52"
              />
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          </div>
        </div>

        {/* Project grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-neutral-400 text-sm">
            {search ? 'No projects match your search.' : 'No projects yet. Click "Add Project" to get started.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => openEdit(project)}
                onDelete={() => setDelId(project.id)}
                delPending={delId === project.id}
                onDeleteConfirm={() => confirmDelete(project.id)}
                onDeleteCancel={() => setDelId(null)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modal !== null && (
        <ProjectModal
          mode={modal === 'add' ? 'add' : 'edit'}
          form={form}
          setForm={setForm}
          onClose={closeModal}
          onSave={saveProject}
          fileRef={fileRef}
          onImageFiles={handleImageFiles}
          onRemoveImage={removeImage}
        />
      )}
    </AdminShell>
  )
}

/* ─── Project card ─── */
function ProjectCard({ project, onEdit, onDelete, delPending, onDeleteConfirm, onDeleteCancel }) {
  const hasCover = project.images.length > 0

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm hover:border-neutral-300 transition-all group">
      {/* Cover */}
      <div className="relative aspect-[4/3] bg-neutral-100">
        {hasCover ? (
          <Image
            src={project.images[0]}
            alt={project.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-neutral-300">
            <FileEdit className="h-8 w-8" />
            <span className="text-xs">No images yet</span>
          </div>
        )}
        {/* Status badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
            project.status === 'published'
              ? 'bg-green-500 text-white'
              : 'bg-neutral-700 text-neutral-200'
          }`}>
            {project.status === 'published' ? <Globe className="h-2.5 w-2.5" /> : <EyeOff className="h-2.5 w-2.5" />}
            {project.status === 'published' ? 'Live' : 'Draft'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-neutral-900 mb-1 line-clamp-1">{project.name}</h3>
        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{project.description}</p>
        <p className="text-[10px] text-neutral-300 mt-2">Updated {project.updatedAt}</p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100">
          {delPending ? (
            <>
              <span className="text-xs text-red-600 font-medium flex-1">Delete this project?</span>
              <button
                onClick={onDeleteConfirm}
                className="text-xs font-semibold text-red-600 hover:text-red-700 px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
              >
                Yes, delete
              </button>
              <button
                onClick={onDeleteCancel}
                className="text-xs font-medium text-neutral-500 hover:text-neutral-900 px-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onEdit}
                className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors flex-1 justify-center"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                onClick={onDelete}
                className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors flex-1 justify-center"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Modal ─── */
function ProjectModal({ mode, form, setForm, onClose, onSave, fileRef, onImageFiles, onRemoveImage }) {
  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) onImageFiles(e.dataTransfer.files)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <h2 className="text-base font-bold text-neutral-900">
              {mode === 'add' ? 'Add New Project' : `Edit — ${form.name}`}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              {mode === 'add' ? 'Fill in the details and add images' : 'Update project info or swap images'}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">

            {/* Left: Form */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">Project Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Orbit Interiors"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">Description</label>
                <textarea
                  placeholder="Describe the project briefly…"
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  rows={5}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2 uppercase tracking-wider">Visibility</label>
                <div className="flex gap-3">
                  {[
                    { val: 'published', icon: Globe,   label: 'Published',  desc: 'Visible on site' },
                    { val: 'draft',     icon: EyeOff,  label: 'Draft',      desc: 'Hidden from site' },
                  ].map(opt => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => set('status', opt.val)}
                      className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all ${
                        form.status === opt.val
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                      }`}
                    >
                      <opt.icon className="h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold leading-tight">{opt.label}</p>
                        <p className={`text-[10px] leading-tight mt-0.5 ${form.status === opt.val ? 'text-neutral-300' : 'text-neutral-400'}`}>{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Images */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Images <span className="text-neutral-400 normal-case font-normal ml-1">({form.images.length} added)</span>
                </label>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="text-xs font-medium text-neutral-600 hover:text-neutral-900 flex items-center gap-1 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add images
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={e => onImageFiles(e.target.files)}
                />
              </div>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => form.images.length === 0 && fileRef.current?.click()}
                className={`min-h-[200px] rounded-xl border-2 border-dashed transition-colors ${
                  dragOver
                    ? 'border-neutral-400 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                } ${form.images.length === 0 ? 'cursor-pointer' : ''}`}
              >
                {form.images.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-2 text-neutral-400">
                    <ImagePlus className="h-8 w-8" />
                    <p className="text-sm font-medium">Drop images here</p>
                    <p className="text-xs">or click to browse</p>
                  </div>
                ) : (
                  <div className="p-3 grid grid-cols-3 gap-2">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative group/img aspect-square rounded-lg overflow-hidden bg-neutral-100">
                        <Image src={img} alt="" fill className="object-cover" unoptimized />
                        {/* Cover badge */}
                        {i === 0 && (
                          <div className="absolute top-1 left-1 bg-neutral-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                            Cover
                          </div>
                        )}
                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => onRemoveImage(i)}
                          className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                    {/* Add more tile */}
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="aspect-square rounded-lg border-2 border-dashed border-neutral-200 hover:border-neutral-400 flex items-center justify-center text-neutral-300 hover:text-neutral-400 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 mt-2">First image is used as the cover photo.</p>
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100 bg-neutral-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-neutral-600 rounded-xl border border-neutral-200 hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!form.name.trim()}
            className="px-5 py-2.5 text-sm font-semibold bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="h-4 w-4" />
            {mode === 'add' ? 'Add Project' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
