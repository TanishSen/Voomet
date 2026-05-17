'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { Search, Download, ChevronUp, ChevronDown } from 'lucide-react'

const COLS = [
  { key: 'name',        label: 'Name' },
  { key: 'phone',       label: 'Phone' },
  { key: 'email',       label: 'Email' },
  { key: 'requirement', label: 'Requirement' },
  { key: 'area',        label: 'Area' },
  { key: 'createdAt',   label: 'Date' },
]

export default function AdminLeads() {
  const [leads,   setLeads]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [sort,    setSort]    = useState({ col: 'createdAt', dir: 'desc' })

  useEffect(() => {
    fetch('/api/admin/leads')
      .then(r => r.json())
      .then(d => { setLeads(d.leads || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = leads
    .filter(l =>
      [l.name, l.phone, l.email, l.requirement, l.area, l.message]
        .join(' ').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const av = String(a[sort.col] || '')
      const bv = String(b[sort.col] || '')
      return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })

  const toggleSort = (col) =>
    setSort(s => s.col === col
      ? { col, dir: s.dir === 'asc' ? 'desc' : 'asc' }
      : { col, dir: 'desc' })

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Requirement', 'Area', 'Message', 'Source', 'Date']
    const rows = filtered.map(l => [
      l.name, l.phone, l.email, l.requirement, l.area, l.message, l.source,
      new Date(l.createdAt).toLocaleDateString('en-IN'),
    ])
    const csv = [headers, ...rows]
      .map(r => r.map(v => `"${(v || '').replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `voomet-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminShell>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">Leads</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {loading ? 'Loading…' : `${filtered.length} of ${leads.length} entries`}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-neutral-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 w-56"
              />
            </div>
            <button
              onClick={exportCSV}
              disabled={filtered.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-40"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          {loading ? (
            <div className="p-14 text-center text-sm text-neutral-400">Loading leads…</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    {COLS.map(c => (
                      <th
                        key={c.key}
                        onClick={() => toggleSort(c.key)}
                        className="text-left px-5 py-3.5 font-medium text-neutral-500 cursor-pointer hover:text-neutral-900 select-none whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1">
                          {c.label}
                          {sort.col === c.key
                            ? sort.dir === 'asc'
                              ? <ChevronUp   className="h-3 w-3" />
                              : <ChevronDown className="h-3 w-3" />
                            : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-neutral-400">
                        {search ? 'No results match your search.' : 'No leads yet.'}
                      </td>
                    </tr>
                  ) : filtered.map(l => (
                    <tr key={l.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-neutral-900 whitespace-nowrap">{l.name}</td>
                      <td className="px-5 py-3.5 text-neutral-600 whitespace-nowrap">
                        <a href={`tel:${l.phone}`} className="hover:underline">{l.phone}</a>
                      </td>
                      <td className="px-5 py-3.5 text-neutral-600">
                        {l.email
                          ? <a href={`mailto:${l.email}`} className="hover:underline">{l.email}</a>
                          : <span className="text-neutral-300">—</span>}
                      </td>
                      <td className="px-5 py-3.5 text-neutral-600 whitespace-nowrap">
                        {l.requirement || <span className="text-neutral-300">—</span>}
                      </td>
                      <td className="px-5 py-3.5 text-neutral-600 whitespace-nowrap">
                        {l.area || <span className="text-neutral-300">—</span>}
                      </td>
                      <td className="px-5 py-3.5 text-neutral-400 whitespace-nowrap">
                        {new Date(l.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
