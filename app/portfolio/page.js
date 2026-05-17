'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import StickyCTA from '@/components/site/StickyCTA'
import FadeUp from '@/components/site/FadeUp'
import ContactSection from '@/components/site/ContactSection'
import { Toaster } from 'sonner'
import { PORTFOLIO } from '@/lib/voomet-data'

const CATS = ['All', 'Office']

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null) // index or null

  const filtered = filter === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.cat === filter)

  const openLightbox = (idx) => setLightbox(idx)
  const closeLightbox = () => setLightbox(null)
  const next = () => setLightbox((i) => (i + 1) % filtered.length)
  const prev = () => setLightbox((i) => (i - 1 + filtered.length) % filtered.length)

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <SiteNav />

      {/* Hero */}
      <section className="pt-28 pb-10 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
              <Link href="/" className="hover:text-neutral-900">Home</Link>
              <span>/</span>
              <span className="text-neutral-900">Portfolio</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h1 className="font-display text-6xl md:text-9xl font-semibold leading-[0.9] tracking-[-0.05em]">
                Selected<br />work.
              </h1>
              <p className="text-neutral-600 max-w-md text-sm md:text-base">
                A curated look at Voomet&apos;s completed office interiors
                across Bangalore and beyond.
              </p>
            </div>
          </FadeUp>

          {/* Filters */}
          <FadeUp delay={0.15} className="mt-10">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-5 py-2.5 text-sm transition-all ${
                    filter === c
                      ? 'bg-neutral-900 text-white'
                      : 'border border-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  {c}{' '}
                  <span className="ml-1 text-xs opacity-60">
                    ({c === 'All' ? PORTFOLIO.length : PORTFOLIO.filter((p) => p.cat === c).length})
                  </span>
                </button>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, idx) => {
                const isLarge = idx % 7 === 0
                return (
                  <motion.button
                    layout
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => openLightbox(idx)}
                    className={`group relative overflow-hidden rounded-[18px] bg-neutral-200 ${
                      isLarge ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-[4/3]'
                    }`}
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between text-white translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div>
                        <div className="text-xs opacity-80">{p.cat}</div>
                        <div className="font-display text-lg font-semibold tracking-[-0.02em]">{p.name}</div>
                      </div>
                      <span className="bg-white text-neutral-900 rounded-full p-2">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox() }}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].img}
                alt={filtered[lightbox].name}
                className="max-h-[80vh] w-auto object-contain rounded-lg"
              />
              <div className="mt-4 text-center text-white">
                <div className="text-xs opacity-70 uppercase tracking-wider">{filtered[lightbox].cat}</div>
                <div className="font-display text-2xl font-semibold tracking-[-0.02em]">{filtered[lightbox].name}</div>
                <div className="text-xs opacity-60 mt-1">{lightbox + 1} / {filtered.length}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactSection heading="Like what you see?\nLet&apos;s build yours." />
      <SiteFooter />
      <StickyCTA />
    </main>
  )
}
