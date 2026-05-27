'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'

export default function SiteNav({ onCta }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past hero (approximately 90vh)
      const heroHeight = window.innerHeight * 0.9
      setScrolled(window.scrollY > heroHeight - 80)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCta = () => {
    if (onCta) return onCta()
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/') {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = '/#contact'
      }
    }
  }

  const useLightText = !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/60'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center transition-opacity duration-300 hover:opacity-80">
          <img 
            src="/logo/LogoDark.png"
            alt="Voomet"
            className="h-48 md:h-64 w-auto object-contain"
            style={{
              filter: useLightText ? 'invert(1) brightness(1.1)' : 'brightness(0.95)'
            }}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm">
          <Link href="/" className={`transition-colors ${useLightText ? 'text-white/80 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'}`}>Home</Link>
          <Link href="/portfolio" className={`transition-colors ${useLightText ? 'text-white/80 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'}`}>Works</Link>
          <Link href="/about" className={`transition-colors ${useLightText ? 'text-white/80 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'}`}>Story</Link>
          <Link href="/#contact" className={`transition-colors ${useLightText ? 'text-white/80 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'}`}>Hello</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleCta}
            className={`inline-flex items-center gap-2 rounded-full h-11 px-5 text-sm font-medium transition-all ${
              useLightText
                ? 'text-white hover:brightness-110'
                : 'bg-neutral-900 hover:bg-neutral-700 text-white'
            }`}
            style={useLightText ? {
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.25)',
            } : undefined}
          >
            Book Consultation <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className={`md:hidden p-2 transition-colors ${useLightText ? 'text-white' : 'text-neutral-900'}`} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-neutral-200 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              <Link href="/" onClick={() => setOpen(false)} className="py-2 text-base">Home</Link>
              <Link href="/portfolio" onClick={() => setOpen(false)} className="py-2 text-base">Works</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="py-2 text-base">Story</Link>
              <Link href="/#contact" onClick={() => setOpen(false)} className="py-2 text-base">Hello</Link>
              <button
                onClick={() => { setOpen(false); handleCta() }}
                className="bg-neutral-900 text-white rounded-full mt-4 px-6 py-3 text-sm font-medium"
              >
                Book Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
