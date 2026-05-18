'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Maximize2, ArrowRight } from 'lucide-react'
import { HIGHLIGHTED_PROJECTS } from '@/lib/voomet-data'

const CARD_W    = 220
const CARD_H    = 330
const CARD_GAP  = 240
const INTERVAL  = 3500                              // ms between auto-advances
const EASE      = [0.16, 1, 0.3, 1]               // Expo.Out — super buttery

function getItemStyle(index) {
  const base = {
    position: 'absolute',
    overflow: 'hidden',
    transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
  }

  // index 0 (behind prev) & index 1 (active) — both fill the full section
  if (index <= 1) {
    return {
      ...base,
      top: 0, left: 0, right: 0, bottom: 0,
      width: '100%', height: '100%',
      borderRadius: 0,
      boxShadow: 'none',
      zIndex: index + 2,
    }
  }

  // peek cards — float on the right side of the background
  const offset = index - 2
  if (offset >= 3) {
    return {
      ...base,
      top: '50%',
      left: `calc(62% + ${offset * CARD_GAP}px)`,
      width: CARD_W, height: CARD_H,
      borderRadius: 18,
      boxShadow: '0 32px 72px rgba(0,0,0,0.85)',
      transform: 'translateY(-50%)',
      opacity: 0,
      zIndex: 1,
    }
  }
  return {
    ...base,
    top: '50%',
    left: `calc(62% + ${offset * CARD_GAP}px)`,
    width: CARD_W, height: CARD_H,
    borderRadius: 18,
    boxShadow: '0 32px 72px rgba(0,0,0,0.85)',
    transform: 'translateY(-50%)',
    zIndex: offset + 4,
  }
}

export default function ProjectHighlight() {
  const [items, setItems]   = useState(HIGHLIGHTED_PROJECTS)
  const [animKey, setAnimKey] = useState(0)
  const timerRef = useRef(null)

  // Stable advance — used by both auto-play and manual next
  const advance = useCallback(() => {
    setItems(prev => { const a = [...prev]; a.push(a.shift()); return a })
    setAnimKey(k => k + 1)
  }, [])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(advance, INTERVAL)
  }, [advance])

  // Auto-play: start on mount
  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const goNext = useCallback(() => { advance(); startTimer() }, [advance, startTimer])
  const goPrev = useCallback(() => {
    setItems(prev => { const a = [...prev]; a.unshift(a.pop()); return a })
    setAnimKey(k => k + 1)
    startTimer()
  }, [startTimer])

  const active    = items[1]
  const activeIdx = HIGHLIGHTED_PROJECTS.findIndex(p => p.id === active.id)

  // Preload next image so it's ready before the slide transition
  useEffect(() => {
    const next = items[2]
    if (next?.img) { new Image().src = next.img }
  }, [items])

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-neutral-950"
      style={{ height: '100svh', minHeight: 600 }}
    >
      {/* ── Slider items ── */}
      {items.map((project, index) => (
        <div key={project.id} style={getItemStyle(index)}>

          {/* Inner bg div — handles the image + Ken Burns independently
              from the outer div's position/size transition             */}
          <div
            className={`ph-bg${index === 1 ? ' ph-kenburns' : ''}`}
            style={{ backgroundImage: `url(${project.img})` }}
          />

          {/* Soft gradient for legibility — full-size items only */}
          {index <= 1 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 52%, rgba(0,0,0,0.06) 100%)',
              }}
            />
          )}
        </div>
      ))}

      {/* ── Section label + heading (top-left overlay) ── */}
      <div className="absolute top-20 md:top-24 left-6 md:left-12 lg:left-20 z-20 pointer-events-none select-none">
        <h2 className="font-display leading-[0.88]">
          <span className="block text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-white/15">
            Project
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white -mt-1">
            Highlights
          </span>
        </h2>
      </div>

      {/* ── Active project content (bottom-left overlay, re-animates each slide) ── */}
      <motion.div
        key={`content-${animKey}`}
        className="ph-content"
        style={{ zIndex: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.span
          className="ph-content-tag"
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.05 }}
        >
          {active.category}
        </motion.span>

        <motion.h3
          className="ph-content-name"
          initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.14 }}
        >
          {active.name}
        </motion.h3>

        <motion.div
          className="ph-content-meta"
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.24 }}
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {active.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 flex-shrink-0" />
            {active.size}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.34 }}
        >
          <Link href="/portfolio" className="ph-btn">View Project <ArrowRight className="h-4 w-4" /></Link>
        </motion.div>
      </motion.div>

      {/* ── Bottom bar: prev/next + progress strip + counter ── */}
      <div
        className="absolute bottom-8 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 flex items-center gap-5"
        style={{ zIndex: 20 }}
      >
        {/* Buttons */}
        <div className="flex items-center gap-2.5">
          <button className="ph-nav-btn" onClick={goPrev} aria-label="Previous project">◁</button>
          <button className="ph-nav-btn" onClick={goNext} aria-label="Next project">▷</button>
        </div>

        {/* Auto-play progress strip */}
        <div className="flex-1 h-[1.5px] bg-white/12 rounded-full overflow-hidden">
          <div
            key={`prog-${animKey}`}
            className="h-full rounded-full bg-white/55"
            style={{ animation: `ph-progress ${INTERVAL}ms linear forwards` }}
          />
        </div>

        {/* Slide counter */}
        <span className="text-[11px] text-white/30 tracking-[0.22em] tabular-nums">
          {String(activeIdx + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(HIGHLIGHTED_PROJECTS.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
