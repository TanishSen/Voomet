'use client'

import { MessageCircle, Phone } from 'lucide-react'
import { COMPANY } from '@/lib/voomet-data'

export default function StickyCTA() {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
      <a
        href={COMPANY.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/40 transition-all hover:scale-110 animate-float"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href={`tel:${COMPANY.phoneDigits}`}
        className="bg-neutral-900 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all md:hidden"
        aria-label="Call"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  )
}
