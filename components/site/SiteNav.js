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

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className={`font-display text-2xl tracking-[-0.04em] font-semibold transition-colors duration-300 ${scrolled ? 'text-neutral-900' : 'text-white'}`}>
          Voomet<span className={scrolled ? 'text-neutral-400' : 'text-white/50'}>.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={`flex items-center gap-1 transition-colors py-2 ${scrolled ? 'text-neutral-700 hover:text-neutral-900' : 'text-white/80 hover:text-white'}`}>
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
          <Link href="/portfolio" className={`transition-colors ${scrolled ? 'text-neutral-700 hover:text-neutral-900' : 'text-white/80 hover:text-white'}`}>Portfolio</Link>
          <Link href="/about" className={`transition-colors ${scrolled ? 'text-neutral-700 hover:text-neutral-900' : 'text-white/80 hover:text-white'}`}>About</Link>
          <Link href="/#contact" className={`transition-colors ${scrolled ? 'text-neutral-700 hover:text-neutral-900' : 'text-white/80 hover:text-white'}`}>Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleCta}
            className={`inline-flex items-center gap-2 rounded-full h-11 px-5 text-sm font-medium transition-all ${
              scrolled
                ? 'bg-neutral-900 hover:bg-neutral-700 text-white'
                : 'text-white hover:brightness-110'
            }`}
            style={!scrolled ? {
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.25)',
            } : undefined}
          >
            Book Consultation <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className={`md:hidden p-2 transition-colors ${scrolled ? 'text-neutral-900' : 'text-white'}`} aria-label="Menu">
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
