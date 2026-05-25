'use client'

import Link from 'next/link'
import AdminShell from '@/components/admin/AdminShell'
import {
  FolderOpen, MessageSquare, Phone, Smartphone,
  ArrowUpRight, TrendingUp, Clock, CheckCircle2,
} from 'lucide-react'

const RECENT_ENQUIRIES = [
  { id: 1, name: 'Rohan Mehta',    requirement: 'Office Interior',  status: 'new',     time: '2h ago' },
  { id: 2, name: 'Priya Sharma',   requirement: 'General Enquiry',  status: 'read',    time: '5h ago' },
  { id: 3, name: 'Amit Verma',     requirement: 'General Enquiry',  status: 'new',     time: '1d ago' },
  { id: 4, name: 'Sunita Kapoor',  requirement: 'Office Interior',  status: 'replied', time: '2d ago' },
  { id: 5, name: 'Vikram Joshi',   requirement: 'Office Interior',  status: 'new',     time: '3d ago' },
]

const RECENT_CONTACTS = [
  { id: 1, phone: '+91 98765 43210', type: 'whatsapp', time: '1h ago' },
  { id: 2, phone: '+91 87654 32109', type: 'call',     time: '3h ago' },
  { id: 3, phone: '+91 76543 21098', type: 'whatsapp', time: '1d ago' },
  { id: 4, phone: '+91 65432 10987', type: 'call',     time: '2d ago' },
  { id: 5, phone: '+91 54321 09876', type: 'whatsapp', time: '2d ago' },
]

const STATUS_STYLE = {
  new:     { dot: 'bg-blue-500',   label: 'bg-blue-50 text-blue-700',    text: 'New' },
  read:    { dot: 'bg-neutral-400', label: 'bg-neutral-100 text-neutral-500', text: 'Read' },
  replied: { dot: 'bg-green-500',  label: 'bg-green-50 text-green-700',  text: 'Replied' },
}

export default function AdminDashboard() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const dateStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-neutral-900 leading-tight">{greeting}, Admin 👋</h1>
          <p className="text-neutral-400 text-sm mt-1 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {dateStr}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            href="/admin/projects"
            icon={FolderOpen}
            label="Total Projects"
            value={8}
            sub="+1 this month"
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />
          <StatCard
            href="/admin/enquiries"
            icon={MessageSquare}
            label="Enquiries"
            value={24}
            sub="8 unread"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            href="/admin/contacts"
            icon={Smartphone}
            label="WhatsApp"
            value={12}
            sub="3 today"
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            href="/admin/contacts"
            icon={Phone}
            label="Phone Calls"
            value={7}
            sub="1 today"
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
          />
        </div>

        {/* Two-column activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Recent Enquiries */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">Recent Enquiries</h2>
                <p className="text-xs text-neutral-400 mt-0.5">Latest form submissions</p>
              </div>
              <Link href="/admin/enquiries" className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-neutral-50">
              {RECENT_ENQUIRIES.map(e => {
                const s = STATUS_STYLE[e.status]
                return (
                  <div key={e.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-neutral-600">
                        {e.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-900 truncate">{e.name}</p>
                        <p className="text-xs text-neutral-400 truncate">{e.requirement}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.label}`}>{s.text}</span>
                      <span className="text-xs text-neutral-400">{e.time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <Link href="/admin/enquiries" className="flex items-center justify-center gap-1.5 px-5 py-3 text-xs text-neutral-400 hover:text-neutral-900 border-t border-neutral-50 transition-colors">
              See all 24 enquiries <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Recent Contacts */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">Recent Contacts</h2>
                <p className="text-xs text-neutral-400 mt-0.5">WhatsApp & phone calls</p>
              </div>
              <Link href="/admin/contacts" className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-neutral-50">
              {RECENT_CONTACTS.map(c => (
                <div key={c.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      c.type === 'whatsapp' ? 'bg-green-50' : 'bg-blue-50'
                    }`}>
                      {c.type === 'whatsapp'
                        ? <Smartphone className="h-3.5 w-3.5 text-green-600" />
                        : <Phone className="h-3.5 w-3.5 text-blue-600" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{c.phone}</p>
                      <p className="text-xs text-neutral-400">{c.type === 'whatsapp' ? 'WhatsApp' : 'Phone Call'}</p>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 flex-shrink-0">{c.time}</span>
                </div>
              ))}
            </div>
            <Link href="/admin/contacts" className="flex items-center justify-center gap-1.5 px-5 py-3 text-xs text-neutral-400 hover:text-neutral-900 border-t border-neutral-50 transition-colors">
              See all 19 contacts <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

        </div>
      </div>
    </AdminShell>
  )
}

function StatCard({ href, icon: Icon, label, value, sub, iconBg, iconColor }) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl border border-neutral-200 p-5 block hover:border-neutral-300 hover:shadow-sm transition-all group"
    >
      <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <div className="text-3xl font-bold text-neutral-900 leading-none mb-1.5 tabular-nums">{value}</div>
      <div className="text-sm text-neutral-600 font-medium">{label}</div>
      <div className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1">
        <TrendingUp className="h-3 w-3" />
        {sub}
      </div>
    </Link>
  )
}

