'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FolderOpen, MessageSquare, Phone, LogOut,
} from 'lucide-react'
import { Toaster } from 'sonner'

const NAV = [
  { href: '/admin/dashboard', label: 'Overview',   icon: LayoutDashboard, badge: null },
  { href: '/admin/projects',  label: 'Projects',   icon: FolderOpen,      badge: null },
  { href: '/admin/enquiries', label: 'Enquiries',  icon: MessageSquare,   badge: 8 },
  { href: '/admin/contacts',  label: 'Contacts',   icon: Phone,           badge: 3 },
]

export default function AdminShell({ children }) {
  const pathname = usePathname()
  const router   = useRouter()

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <div className="min-h-screen flex bg-neutral-50">
      <Toaster position="top-right" richColors />

      {/* Sidebar */}
      <aside className="w-[220px] bg-neutral-950 flex flex-col fixed inset-y-0 left-0 z-50">

        {/* Brand */}
        <div className="px-4 pt-4 pb-3">
          <div
            className="w-32 h-8 bg-no-repeat"
            style={{
              backgroundImage: 'url(/logo/LogoLight.png)',
              backgroundSize: 'auto 192px',
              backgroundPosition: 'left center',
            }}
          />
          <p className="text-neutral-500 text-[10px] mt-1 leading-none uppercase tracking-wider">Admin Panel</p>
        </div>

        <div className="mx-4 h-px bg-white/8 mb-3" />

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon, badge }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  active
                    ? 'bg-white text-neutral-950'
                    : 'text-neutral-400 hover:bg-white/8 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-[15px] w-[15px] flex-shrink-0" />
                  {label}
                </span>
                {badge ? (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                    active ? 'bg-neutral-200 text-neutral-700' : 'bg-white/15 text-white'
                  }`}>
                    {badge}
                  </span>
                ) : null}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/8">
          <div className="flex items-center gap-2.5 px-3 py-2 mb-0.5">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] text-white font-semibold">A</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-[12px] font-medium leading-none">Admin</p>
              <p className="text-neutral-500 text-[10px] mt-0.5 truncate leading-none">voomet.in</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-neutral-500 hover:text-white hover:bg-white/8 transition-colors"
          >
            <LogOut className="h-[15px] w-[15px]" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-[220px] min-h-screen">
        {children}
      </main>
    </div>
  )
}
