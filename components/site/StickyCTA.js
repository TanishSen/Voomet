'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { COMPANY } from '@/lib/voomet-data'

export default function StickyCTA() {
  const [showWhatsApp, setShowWhatsApp] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show WhatsApp button after scrolling past hero (100vh)
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      setShowWhatsApp(scrollY > heroHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
      <AnimatePresence>
        {showWhatsApp && (
          <motion.a
            href={COMPANY.whatsapp}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </motion.a>
        )}
      </AnimatePresence>
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
