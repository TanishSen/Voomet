'use client'

/**
 * ProjectHighlight — home page section
 *
 * Horizontal-scroll + scale effect (Dribbble-inspired).
 * Cards snap to centre; the centred card is at full scale + full opacity.
 * Adjacent cards shrink and dim smoothly using a scroll-event listener.
 * Each card also shows a filmstrip of project thumbnails at the bottom.
 */

import { useRef, useEffect, useCallback, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin, Maximize2 } from 'lucide-react'
import { HIGHLIGHTED_PROJECTS } from '@/lib/voomet-data'
import FadeUp from '@/components/site/FadeUp'

const CARD_ASPECT = 'aspect-[3/4]'   // portrait card on all screens
const CARD_W_PX   = 420              // px — used only for arrow-nav calculation

export default function ProjectHighlight() {
  const trackRef  = useRef(null)
  const cardRefs  = useRef([])
  const rafRef    = useRef(null)

  // Index of the currently active (most-centred) card
  const [activeIdx, setActiveIdx] = useState(0)
  // Which thumbnail is shown on each card  {idx: thumbIdx}
  const [thumbMap, setThumbMap] = useState({})

  /* ── Scale / opacity effect ──────────────────────────────────────── */
  const applyScales = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const cw = track.clientWidth
    const center = track.scrollLeft + cw / 2
    let closest = 0
    let minDist = Infinity

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const dist = Math.abs(center - cardCenter)
      const ratio = Math.min(dist / (cw * 0.55), 1)
      const scale   = 1 - ratio * 0.13           // 1.00 → 0.87
      const opacity = 1 - ratio * 0.45           // 1.00 → 0.55

      card.style.transform = `scale(${scale})`
      card.style.opacity   = opacity
      card.style.transition = 'transform 0.3s ease, opacity 0.3s ease'

      if (dist < minDist) { minDist = dist; closest = i }
    })
    setActiveIdx(closest)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(applyScales)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    // Initial paint
    applyScales()
    return () => {
      track.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [applyScales])

  /* ── Arrow navigation ────────────────────────────────────────────── */
  const scrollTo = (idx) => {
    const track = trackRef.current
    const card  = cardRefs.current[idx]
    if (!track || !card) return
    const target = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
    track.scrollTo({ left: target, behavior: 'smooth' })
  }

  const prev = () => scrollTo(Math.max(0, activeIdx - 1))
  const next = () => scrollTo(Math.min(HIGHLIGHTED_PROJECTS.length - 1, activeIdx + 1))

  /* ── Thumbnail cycling ───────────────────────────────────────────── */
  const setThumb = (projectIdx, thumbIdx) => {
    setThumbMap((m) => ({ ...m, [projectIdx]: thumbIdx }))
  }

  return (
    <section className="bg-neutral-950 pt-20 pb-16 overflow-hidden">

      {/* ── Section heading ──────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <FadeUp>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium">
              Selected Work · Office Projects
            </span>
          </div>
        </FadeUp>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <FadeUp delay={0.05}>
            <h2 className="font-display leading-[0.9]">
              <span className="block text-5xl md:text-7xl lg:text-8xl split-heading-light text-white/60">
                PROJECT
              </span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] split-heading-bold tracking-[-0.04em] -mt-1 md:-mt-3 text-white">
                HIGHLIGHT.
              </span>
            </h2>
          </FadeUp>

          {/* Arrow controls — top right of header */}
          <FadeUp delay={0.12} className="flex items-center gap-3 pb-2">
            <button
              onClick={prev}
              aria-label="Previous project"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <span className="text-white/30 text-sm tabular-nums">
              {String(activeIdx + 1).padStart(2, '0')} / {String(HIGHLIGHTED_PROJECTS.length).padStart(2, '0')}
            </span>
            <button
              onClick={next}
              aria-label="Next project"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </FadeUp>
        </div>
      </div>

      {/* ── Horizontal scroll track ──────────────────────────────────── */}
      <div
        ref={trackRef}
        className="ph-track flex gap-5 overflow-x-auto pb-6"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          /* Hide scrollbar cross-browser */
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft:  'max(1.5rem, calc((100vw - 840px) / 2))',
          paddingRight: 'max(1.5rem, calc((100vw - 840px) / 2))',
        }}
      >
        {HIGHLIGHTED_PROJECTS.map((project, pIdx) => {
          const activeThumb = thumbMap[pIdx] ?? 0
          const heroImg     = project.images[activeThumb]

          return (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[pIdx] = el }}
              className="ph-card flex-none w-[78vw] md:w-[42vw] lg:w-[34vw] cursor-grab active:cursor-grabbing"
              style={{ scrollSnapAlign: 'center', transformOrigin: 'center center' }}
            >
              {/* Card inner */}
              <div className="relative overflow-hidden rounded-2xl bg-neutral-900 h-full flex flex-col group">

                {/* Hero image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* Crossfade between thumbnails */}
                  {project.images.map((img, iIdx) => (
                    <img
                      key={img}
                      src={img}
                      alt={`${project.name} — ${iIdx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                      style={{ opacity: iIdx === activeThumb ? 1 : 0 }}
                      loading="lazy"
                    />
                  ))}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Project number */}
                  <div className="absolute top-5 left-5 font-display text-[2.5rem] font-black text-white/10 leading-none select-none">
                    {project.number}
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-5 right-5">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium bg-white/10 backdrop-blur-sm text-white/70 border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Bottom info row (inside image area) */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight tracking-[-0.02em]">
                          {project.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-white/50 text-xs">
                          <MapPin className="h-3 w-3" />
                          <span>{project.location}</span>
                          <span>·</span>
                          <Maximize2 className="h-3 w-3" />
                          <span>{project.size}</span>
                        </div>
                      </div>
                      <Link
                        href="/portfolio"
                        className="flex-shrink-0 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-neutral-900 transition-all duration-300"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Thumbnail filmstrip */}
                <div className="flex gap-1.5 p-3 bg-neutral-900/90">
                  {project.images.map((img, iIdx) => (
                    <button
                      key={img}
                      onClick={() => setThumb(pIdx, iIdx)}
                      className={`relative flex-1 aspect-square overflow-hidden rounded-md transition-all duration-300 ${
                        iIdx === activeThumb
                          ? 'ring-2 ring-white ring-offset-1 ring-offset-neutral-900 opacity-100'
                          : 'opacity-40 hover:opacity-70'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Progress dots ─────────────────────────────────────────────── */}
      <div className="flex justify-center gap-2 mt-6">
        {HIGHLIGHTED_PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to project ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === activeIdx ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* ── Footer link ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mt-10"
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors group"
        >
          <span className="border-b border-white/20 pb-0.5 group-hover:border-white transition-colors">
            View full portfolio
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>

    </section>
  )
}
