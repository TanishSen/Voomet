'use client'

import { useState } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { Smartphone, Phone, Search, Download, MessageSquare } from 'lucide-react'

/* ─── Mock data ─── */
const MOCK_WHATSAPP = [
  { id: 1,  phone: '+91 98765 43210', name: 'Rohan Mehta',    time: '10:32 AM', date: '21 May 2025' },
  { id: 2,  phone: '+91 87654 32109', name: 'Priya Sharma',   time: '9:15 AM',  date: '21 May 2025' },
  { id: 3,  phone: '+91 76543 21098', name: 'Amit Verma',     time: '8:44 PM',  date: '20 May 2025' },
  { id: 4,  phone: '+91 65432 10987', name: 'Nisha Patel',    time: '3:20 PM',  date: '20 May 2025' },
  { id: 5,  phone: '+91 54321 09876', name: 'Karan Malhotra', time: '11:55 AM', date: '19 May 2025' },
  { id: 6,  phone: '+91 43210 98765', name: 'Sneha Rao',      time: '7:30 PM',  date: '18 May 2025' },
  { id: 7,  phone: '+91 32109 87654', name: 'Arjun Nair',     time: '2:10 PM',  date: '17 May 2025' },
  { id: 8,  phone: '+91 21098 76543', name: 'Tanvi Iyer',     time: '10:00 AM', date: '16 May 2025' },
  { id: 9,  phone: '+91 10987 65432', name: 'Farhan Khan',    time: '6:45 PM',  date: '15 May 2025' },
  { id: 10, phone: '+91 99887 76655', name: 'Divya Singh',    time: '4:20 PM',  date: '14 May 2025' },
  { id: 11, phone: '+91 88776 65544', name: 'Vikram Joshi',   time: '1:30 PM',  date: '13 May 2025' },
  { id: 12, phone: '+91 77665 54433', name: 'Sunita Kapoor',  time: '9:50 AM',  date: '12 May 2025' },
]

const MOCK_CALLS = [
  { id: 1,  phone: '+91 66554 43322', name: 'Rahul Agarwal',   duration: '4:12',  time: '11:20 AM', date: '21 May 2025' },
  { id: 2,  phone: '+91 55443 32211', name: 'Meera Gupta',     duration: '2:45',  time: '10:05 AM', date: '21 May 2025' },
  { id: 3,  phone: '+91 44332 21100', name: 'Siddharth Rao',   duration: '7:30',  time: '5:15 PM',  date: '20 May 2025' },
  { id: 4,  phone: '+91 33221 10099', name: 'Unknown',         duration: '0:40',  time: '2:00 PM',  date: '20 May 2025' },
  { id: 5,  phone: '+91 22110 09988', name: 'Ritu Malhotra',   duration: '3:55',  time: '9:30 AM',  date: '19 May 2025' },
  { id: 6,  phone: '+91 11009 98877', name: 'Suresh Iyer',     duration: '1:20',  time: '4:40 PM',  date: '18 May 2025' },
  { id: 7,  phone: '+91 99009 88998', name: 'Kavita Pillai',   duration: '5:00',  time: '3:10 PM',  date: '16 May 2025' },
]

/* ─── Page ─── */
export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState('whatsapp')
  const [search,    setSearch]    = useState('')

  const isWA   = activeTab === 'whatsapp'
  const source = isWA ? MOCK_WHATSAPP : MOCK_CALLS

  const filtered = source.filter(c =>
    `${c.name} ${c.phone}`.toLowerCase().includes(search.toLowerCase())
  )

  /* Group by date for display */
  const grouped = filtered.reduce((acc, c) => {
    if (!acc[c.date]) acc[c.date] = []
    acc[c.date].push(c)
    return acc
  }, {})

  const exportCSV = () => {
    const headers = isWA
      ? ['Name', 'Phone', 'Time', 'Date']
      : ['Name', 'Phone', 'Time', 'Date']
    const rows = filtered.map(c =>
      isWA ? [c.name, c.phone, c.time, c.date] : [c.name, c.phone, c.time, c.date]
    )
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const a   = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
      download: `contacts-${activeTab}-${new Date().toISOString().slice(0,10)}.csv`,
    })
    a.click()
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-4xl">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
          <div>
            <h1 className="text-[26px] font-bold text-neutral-900 leading-tight">Contacts</h1>
            <p className="text-neutral-400 text-sm mt-1">
              People who reached out via WhatsApp or phone call
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-7">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5">
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center mb-3">
              <Smartphone className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-neutral-900">{MOCK_WHATSAPP.length}</div>
            <div className="text-sm text-neutral-500 mt-0.5">WhatsApp</div>
            <div className="text-xs text-neutral-400 mt-0.5">
              {MOCK_WHATSAPP.filter(c => c.date === '21 May 2025').length} today
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <Phone className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-neutral-900">{MOCK_CALLS.length}</div>
            <div className="text-sm text-neutral-500 mt-0.5">Phone Calls</div>
            <div className="text-xs text-neutral-400 mt-0.5">
              {MOCK_CALLS.filter(c => c.date === '21 May 2025').length} today
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 col-span-2 sm:col-span-1">
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
              <MessageSquare className="h-4 w-4 text-violet-600" />
            </div>
            <div className="text-2xl font-bold text-neutral-900">{MOCK_WHATSAPP.length + MOCK_CALLS.length}</div>
            <div className="text-sm text-neutral-500 mt-0.5">Total Contacts</div>
            <div className="text-xs text-neutral-400 mt-0.5">All time</div>
          </div>
        </div>

        {/* Tabs + search + export */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-xl p-1">
            <TabBtn active={activeTab === 'whatsapp'} onClick={() => { setActiveTab('whatsapp'); setSearch('') }}>
              <Smartphone className="h-3.5 w-3.5" />
              WhatsApp
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === 'whatsapp' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                {MOCK_WHATSAPP.length}
              </span>
            </TabBtn>
            <TabBtn active={activeTab === 'calls'} onClick={() => { setActiveTab('calls'); setSearch('') }}>
              <Phone className="h-3.5 w-3.5" />
              Calls
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === 'calls' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                {MOCK_CALLS.length}
              </span>
            </TabBtn>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name or phone…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 text-sm border border-neutral-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 w-56"
              />
            </div>
            <button
              onClick={exportCSV}
              disabled={filtered.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-40"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Contact list — grouped by date */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 py-20 text-center text-neutral-400 text-sm">
            No contacts found.
          </div>
        ) : (
          <div className="space-y-5">
            {Object.entries(grouped).map(([date, contacts]) => (
              <div key={date} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">

                {/* Date heading */}
                <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{date}</p>
                </div>

                {/* Rows */}
                <div className="divide-y divide-neutral-50">
                  {contacts.map(c => (
                    <div key={c.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isWA ? 'bg-green-50' : 'bg-blue-50'
                        }`}>
                          {isWA
                            ? <Smartphone className="h-4 w-4 text-green-600" />
                            : <Phone className="h-4 w-4 text-blue-600" />
                          }
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">{c.name}</p>
                          <a
                            href={`tel:${c.phone}`}
                            className="text-xs text-neutral-400 hover:text-neutral-700 hover:underline transition-colors"
                          >
                            {c.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-5 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-xs text-neutral-600">{c.time}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isWA ? (
                            <a
                              href={`https://wa.me/${c.phone.replace(/\D/g,'')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <Smartphone className="h-3 w-3" />
                              Chat
                            </a>
                          ) : (
                            <a
                              href={`tel:${c.phone}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Phone className="h-3 w-3" />
                              Call back
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-neutral-400 mt-4">Showing {filtered.length} {isWA ? 'WhatsApp' : 'phone call'} contacts.</p>
      </div>
    </AdminShell>
  )
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
      }`}
    >
      {children}
    </button>
  )
}
