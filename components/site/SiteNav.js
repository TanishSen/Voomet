'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/voomet-data'

export default function SiteNav({ onCta }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [inDarkSection, setInDarkSection] = useState(false)

  useEffect(() => {
    const checkSection = () => {
      setScrolled(window.scrollY > 20)
      
      // Check if we're in a dark section (portfolio or horizontal story)
      const darkSectionIds = ['portfolio', 'story']
      const isInDark = darkSectionIds.some(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 80 && rect.bottom >= 80
      })
      setInDarkSection(isInDark)
    }
    
    window.addEventListener('scroll', checkSection)
    checkSection() // Initial check
    return () => window.removeEventListener('scroll', checkSection)
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

  // Determine if we should use light text (hero or dark sections)
  const useLightText = !scrolled || inDarkSection

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled && !inDarkSection ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className={`font-display text-2xl tracking-[-0.04em] font-semibold transition-colors duration-300 ${useLightText ? 'text-white' : 'text-neutral-900'}`}>
          Voomet<span className={useLightText ? 'text-white/50' : 'text-neutral-400'}>.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={`flex items-center gap-1 transition-colors py-2 ${useLightText ? 'text-white/80 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'}`}>
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px]"
                >
                  <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl p-3 grid grid-cols-2 gap-1">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex flex-col gap-0.5 rounded-xl p-3 hover:bg-neutral-100 transition-colors"
                      >
                        <span className="font-medium text-sm text-neutral-900">{s.name}</span>
                        <span className="text-xs text-neutral-500">{s.starting}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/portfolio" className={`transition-colors ${useLightText ? 'text-white/80 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'}`}>Portfolio</Link>
          <Link href="/about" className={`transition-colors ${useLightText ? 'text-white/80 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'}`}>About</Link>
          <Link href="/#contact" className={`transition-colors ${useLightText ? 'text-white/80 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'}`}>Contact</Link>
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
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2 mt-1">Services</div>
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="py-2 text-base"
                >
                  {s.name}
                </Link>
              ))}
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2 mt-4">More</div>
              <Link href="/portfolio" onClick={() => setOpen(false)} className="py-2 text-base">Portfolio</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="py-2 text-base">About</Link>
              <Link href="/#contact" onClick={() => setOpen(false)} className="py-2 text-base">Contact</Link>
              <Button
                onClick={() => { setOpen(false); handleCta() }}
                className="bg-neutral-900 text-white rounded-full mt-4"
              >
                Book Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
