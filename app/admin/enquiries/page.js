'use client'

import { useState } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import {
  Search, Download, MessageSquare, Mail, Phone,
  ChevronDown, ChevronUp, X, Eye, CheckCheck,
} from 'lucide-react'

/* ─── Mock data — fields match the actual contact form ─── */
const MOCK_ENQUIRIES = [
  { id: 1,  name: 'Rohan Mehta',    phone: '+91 98765 43210', email: 'rohan.m@gmail.com',    requirement: 'Office Interior',   area: 'Under 2,500 sq.ft',     message: 'Looking for complete home renovation for a 3BHK apartment in South Mumbai. Have a budget of around 20–25 lakhs.', status: 'new',     date: '21 May 2025' },
  { id: 2,  name: 'Priya Sharma',   phone: '+91 87654 32109', email: 'priya.s@outlook.com',  requirement: 'General Enquiry',   area: '',                        message: 'Need a full brand refresh for my bakery business. Need logo, packaging, and social media kit.', status: 'read',    date: '20 May 2025' },
  { id: 3,  name: 'Amit Verma',     phone: '+91 76543 21098', email: '',                     requirement: 'General Enquiry',   area: 'Under 2,500 sq.ft',     message: 'Portfolio website for a chartered accountant. Should look premium and professional.', status: 'new',     date: '20 May 2025' },
  { id: 4,  name: 'Sunita Kapoor',  phone: '+91 65432 10987', email: 'sunita.k@gmail.com',   requirement: 'Office Interior',   area: '',                        message: 'UI design for a healthcare mobile app. Targeting elderly users, so accessibility is key.', status: 'replied', date: '19 May 2025' },
  { id: 5,  name: 'Vikram Joshi',   phone: '+91 54321 09876', email: 'vikram.j@yahoo.com',   requirement: 'Office Interior',   area: '5,000–10,000 sq.ft',    message: 'Office space redesign for a 2000 sq ft startup office in Pune. Need a modern co-working vibe.', status: 'new',     date: '18 May 2025' },
  { id: 6,  name: 'Nisha Patel',    phone: '+91 43210 98765', email: 'nisha.p@gmail.com',    requirement: 'General Enquiry',   area: '',                        message: 'Launching a new fashion label. Need brand identity from scratch — name, logo, tagline, everything.', status: 'replied', date: '17 May 2025' },
  { id: 7,  name: 'Karan Malhotra', phone: '+91 32109 87654', email: 'karan.m@gmail.com',    requirement: 'Office Interior',   area: '',                        message: 'SaaS dashboard design for an analytics product. Need detailed wireframes and high-fi designs.', status: 'new',     date: '16 May 2025' },
  { id: 8,  name: 'Divya Singh',    phone: '+91 21098 76543', email: 'divya.s@icloud.com',   requirement: 'General Enquiry',   area: 'Under 2,500 sq.ft',     message: 'E-commerce website for handmade jewelry. About 50 products, need clean and premium look.', status: 'read',    date: '15 May 2025' },
  { id: 9,  name: 'Rahul Agarwal',  phone: '+91 10987 65432', email: 'rahul.a@gmail.com',    requirement: 'Office Interior',   area: '2,500–5,000 sq.ft',     message: 'Residential plot 40x60, need full architectural drawings and 3D visualisation for ground+2 floors.', status: 'replied', date: '14 May 2025' },
  { id: 10, name: 'Sneha Rao',      phone: '+91 99887 76655', email: 'sneha.r@gmail.com',    requirement: 'Office Interior',   area: '2,500–5,000 sq.ft',     message: 'Villa interior in Goa. Open to contemporary style with local materials.', status: 'new',     date: '13 May 2025' },
  { id: 11, name: 'Arjun Nair',     phone: '+91 88776 65544', email: 'arjun.n@gmail.com',    requirement: 'General Enquiry',   area: '',                        message: 'Fitness app redesign. Current app looks outdated, want a fresh modern look.', status: 'read',    date: '12 May 2025' },
  { id: 12, name: 'Meera Gupta',    phone: '+91 77665 54433', email: 'meera.g@hotmail.com',  requirement: 'General Enquiry',   area: '',                        message: 'Rebranding for a 10-year-old manufacturing company. Want to look more tech-forward.', status: 'replied', date: '11 May 2025' },
  { id: 13, name: 'Farhan Khan',    phone: '+91 66554 43322', email: 'farhan.k@gmail.com',   requirement: 'Office Interior',   area: '',                        message: 'Industrial product design for a smart home device. Need form factor and UX design.', status: 'new',     date: '10 May 2025' },
  { id: 14, name: 'Tanvi Iyer',     phone: '+91 55443 32211', email: 'tanvi.i@gmail.com',    requirement: 'General Enquiry',   area: 'Under 2,500 sq.ft',     message: 'Personal blog and portfolio for a travel photographer. Need something minimal and image-heavy.', status: 'replied', date: '9 May 2025' },
  { id: 15, name: 'Siddharth Rao',  phone: '+91 44332 21100', email: 'sid.r@outlook.com',    requirement: 'Office Interior',   area: '10,000–20,000 sq.ft',   message: 'Boutique hotel lobby and 12 room interiors in Mysore. Premium segment.', status: 'new',     date: '8 May 2025' },
]

const STATUS_META = {
  new:     { label: 'New',     style: 'bg-blue-50 text-blue-700 border-blue-200',   dot: 'bg-blue-500' },
  read:    { label: 'Read',    style: 'bg-neutral-100 text-neutral-500 border-neutral-200', dot: 'bg-neutral-400' },
  replied: { label: 'Replied', style: 'bg-green-50 text-green-700 border-green-200', dot: 'bg-green-500' },
}

const TABS = ['all', 'new', 'read', 'replied']

/* ─── Page ─── */
export default function EnquiriesPage() {
  const [search,   setSearch]   = useState('')
  const [tab,      setTab]      = useState('all')
  const [sort,     setSort]     = useState({ col: 'date', dir: 'desc' })
  const [expanded, setExpanded] = useState(null)
  const [data,     setData]     = useState(MOCK_ENQUIRIES)

  /* Filter + sort */
  const filtered = data
    .filter(e => tab === 'all' ? true : e.status === tab)
    .filter(e => `${e.name} ${e.phone} ${e.email} ${e.requirement} ${e.area} ${e.message}`.toLowerCase().includes(search.toLowerCase()))

  const counts = TABS.reduce((acc, t) => {
    acc[t] = t === 'all' ? data.length : data.filter(e => e.status === t).length
    return acc
  }, {})

  const markAs = (id, status) =>
    setData(prev => prev.map(e => e.id === id ? { ...e, status } : e))

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Requirement', 'Area', 'Message', 'Status', 'Date']
    const rows    = filtered.map(e => [e.name, e.phone, e.email, e.requirement, e.area, e.message, e.status, e.date])
    const csv     = [headers, ...rows].map(r => r.map(v => `"${(v||'').replace(/"/g, '""')}"`).join(',')).join('\n')
    const a       = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
      download: `enquiries-${new Date().toISOString().slice(0,10)}.csv`,
    })
    a.click()
  }

  return (
    <AdminShell>
      <div className="p-8">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[26px] font-bold text-neutral-900 leading-tight">Enquiries</h1>
            <p className="text-neutral-400 text-sm mt-1">
              Form submissions from your website visitors
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 text-sm border border-neutral-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 w-52"
              />
            </div>
            <button
              onClick={exportCSV}
              disabled={filtered.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-40"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-xl p-1 mb-6 w-fit">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              <span className={`text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full ${
                tab === t ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
              }`}>
                {counts[t]}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-neutral-400 text-sm">
              {search ? 'No enquiries match your search.' : `No ${tab === 'all' ? '' : tab + ' '}enquiries yet.`}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/70">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider w-[220px]">Person</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Requirement</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Area</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Message</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Date</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {filtered.map(enq => {
                    const meta = STATUS_META[enq.status]
                    const isOpen = expanded === enq.id
                    return (
                      <>
                        <tr
                          key={enq.id}
                          onClick={() => setExpanded(isOpen ? null : enq.id)}
                          className={`hover:bg-neutral-50 cursor-pointer transition-colors ${
                            enq.status === 'new' ? 'bg-blue-50/30' : ''
                          }`}
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${meta.dot}`} />
                              <div>
                                <p className="font-semibold text-neutral-900">{enq.name}</p>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <a href={`tel:${enq.phone}`} onClick={e => e.stopPropagation()} className="text-xs text-neutral-400 hover:text-neutral-700 flex items-center gap-1">
                                    <Phone className="h-3 w-3" />{enq.phone}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-xs font-medium text-neutral-700 bg-neutral-100 px-2 py-1 rounded-lg whitespace-nowrap">
                              {enq.requirement}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {enq.area
                              ? <span className="text-xs text-neutral-600 whitespace-nowrap">{enq.area}</span>
                              : <span className="text-neutral-300 text-xs">—</span>}
                          </td>
                          <td className="px-5 py-4 max-w-[240px]">
                            <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{enq.message}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${meta.style}`}>
                              {meta.label}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs text-neutral-400 whitespace-nowrap">{enq.date}</td>
                          <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              {enq.email && (
                                <a
                                  href={`mailto:${enq.email}`}
                                  className="w-7 h-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                                  title={`Email ${enq.email}`}
                                >
                                  <Mail className="h-3.5 w-3.5" />
                                </a>
                              )}
                              <a
                                href={`https://wa.me/${enq.phone.replace(/\D/g,'')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-7 h-7 rounded-lg hover:bg-green-50 flex items-center justify-center text-neutral-400 hover:text-green-600 transition-colors"
                                title="Reply on WhatsApp"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                              </a>
                              {enq.status !== 'replied' && (
                                <button
                                  onClick={() => markAs(enq.id, 'replied')}
                                  className="w-7 h-7 rounded-lg hover:bg-green-50 flex items-center justify-center text-neutral-400 hover:text-green-600 transition-colors"
                                  title="Mark as replied"
                                >
                                  <CheckCheck className="h-3.5 w-3.5" />
                                </button>
                              )}
                              {enq.status === 'new' && (
                                <button
                                  onClick={() => markAs(enq.id, 'read')}
                                  className="w-7 h-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                                  title="Mark as read"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>

                        {/* Expanded row */}
                        {isOpen && (
                          <tr key={`${enq.id}-exp`} className="bg-neutral-50">
                            <td colSpan={7} className="px-5 py-4">
                              <div className="bg-white rounded-xl border border-neutral-200 p-4 max-w-2xl">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <div>
                                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Enquiry from {enq.name}</p>
                                    <div className="flex flex-wrap items-center gap-3">
                                      {enq.email && (
                                        <a href={`mailto:${enq.email}`} className="text-xs text-neutral-400 hover:underline flex items-center gap-1">
                                          <Mail className="h-3 w-3" />{enq.email}
                                        </a>
                                      )}
                                      <a href={`tel:${enq.phone}`} className="text-xs text-neutral-400 hover:underline flex items-center gap-1">
                                        <Phone className="h-3 w-3" />{enq.phone}
                                      </a>
                                    </div>
                                  </div>
                                  <button onClick={() => setExpanded(null)} className="text-neutral-400 hover:text-neutral-900 flex-shrink-0">
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <span className="text-xs font-medium bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-lg">{enq.requirement}</span>
                                  {enq.area && <span className="text-xs font-medium bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-lg">{enq.area}</span>}
                                </div>
                                <p className="text-sm text-neutral-700 leading-relaxed">{enq.message}</p>
                                <div className="flex items-center gap-2 mt-4">
                                  {enq.email && (
                                    <a href={`mailto:${enq.email}`} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
                                      <Mail className="h-3.5 w-3.5" />Reply via Email
                                    </a>
                                  )}
                                  <a href={`https://wa.me/${enq.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    <MessageSquare className="h-3.5 w-3.5" />WhatsApp
                                  </a>
                                  <a href={`tel:${enq.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors">
                                    <Phone className="h-3.5 w-3.5" />Call
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-neutral-400 mt-4">Showing {filtered.length} of {data.length} enquiries. Click any row to expand full message.</p>
      </div>
    </AdminShell>
  )
}
