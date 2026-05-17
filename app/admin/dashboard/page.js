'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminShell from '@/components/admin/AdminShell'
import { Users, TrendingUp, CalendarDays, ArrowUpRight } from 'lucide-react'

export default function AdminDashboard() {
  const [leads,   setLeads]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/leads')
      .then(r => r.json())
      .then(d => { setLeads(d.leads || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const today   = new Date().toDateString()
  const todayN  = leads.filter(l => new Date(l.createdAt).toDateString() === today).length
  const weekN   = leads.filter(l => (Date.now() - new Date(l.createdAt)) / 86400000 <= 7).length
  const recentLeads = leads.slice(0, 6)

  return (
    <AdminShell>
      <div className="p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard title="Total Leads"  value={leads.length} icon={Users}        loading={loading} />
          <StatCard title="Today"        value={todayN}       icon={CalendarDays}  loading={loading} />
          <StatCard title="Last 7 Days"  value={weekN}        icon={TrendingUp}    loading={loading} />
        </div>

        {/* Recent leads */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-900 text-sm">Recent Leads</h2>
            <Link
              href="/admin/leads"
              className="text-xs text-neutral-400 hover:text-neutral-900 flex items-center gap-1 transition-colors"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-neutral-400">Loading…</div>
          ) : recentLeads.length === 0 ? (
            <div className="p-10 text-center text-sm text-neutral-400">No leads yet.</div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {recentLeads.map(l => (
                <div key={l.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-neutral-900">{l.name}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {l.phone}
                      {l.requirement ? ` · ${l.requirement}` : ''}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-400 flex-shrink-0">
                    {new Date(l.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}

function StatCard({ title, value, icon: Icon, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
        <Icon className="h-4 w-4 text-neutral-600" />
      </div>
      <div className="text-3xl font-semibold text-neutral-900 tracking-tight">
        {loading ? '—' : value}
      </div>
      <div className="text-sm text-neutral-500 mt-1">{title}</div>
    </div>
  )
}
