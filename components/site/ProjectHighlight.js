'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { MapPin, Maximize2 } from 'lucide-react'
import { HIGHLIGHTED_PROJECTS } from '@/lib/voomet-data'

const CARD_W   = 220
const CARD_H   = 320
const CARD_GAP = 240

function getItemStyle(index) {
  const base = {
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    overflow: 'hidden',
  }

  // index 0 (behind) and index 1 (active) — both fill the full section
  if (index <= 1) {
    return {
      ...base,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      borderRadius: 0,
      boxShadow: 'none',
      zIndex: index + 2,
    }
  }

  // peek cards — float on the right portion of the background
  const offset = index - 2
  if (offset >= 3) {
    return {
      ...base,
      top: '50%',
      left: `calc(62% + ${offset * CARD_GAP}px)`,
      width: CARD_W,
      height: CARD_H,
      borderRadius: 16,
      boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
      transform: 'translateY(-50%)',
      opacity: 0,
      zIndex: 1,
    }
  }
  return {
    ...base,
    top: '50%',
    left: `calc(62% + ${offset * CARD_GAP}px)`,
    width: CARD_W,
    height: CARD_H,
    borderRadius: 16,
    boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
    transform: 'translateY(-50%)',
    zIndex: offset + 4,
  }
}

export default function ProjectHighlight() {
  const [items, setItems] = useState(HIGHLIGHTED_PROJECTS)
  const [animKey, setAnimKey] = useState(0)

  const goNext = useCallback(() => {
    setItems(prev => { const a = [...prev]; a.push(a.shift()); return a })
    setAnimKey(k => k + 1)
  }, [])

  const goPrev = useCallback(() => {
    setItems(prev => { const a = [...prev]; a.unshift(a.pop()); return a })
    setAnimKey(k => k + 1)
  }, [])

  const active = items[1]

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-neutral-950"
      style={{ height: '100svh', minHeight: 600 }}
    >
      {/* ── All slider items — index 0 & 1 fill the full section background ── */}
      {items.map((project, index) => (
        <div
          key={project.id}
          style={{
            ...getItemStyle(index),
            backgroundImage: `url(${project.img})`,
          }}
        >
          {/* Dark gradient — only on the two full-size background items */}
          {index <= 1 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.1) 100%)',
              }}
            />
          )}
        </div>
      ))}

      {/* ── Overlaid UI (z-index above all items) ── */}

      {/* Section label + heading — top left */}
      <div className="absolute top-20 md:top-24 left-6 md:left-12 lg:left-20 z-20 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-3 block">
          Featured Work
        </span>
        <h2 className="font-display leading-[0.9]">
          <span className="block text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-white/20">
            PROJECT
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white -mt-1">
            HIGHLIGHTS
          </span>
        </h2>
      </div>

      {/* Active project content — vertically centred, left side */}
      <div
        key={`content-${animKey}`}
        className="ph-content"
        style={{ zIndex: 20 }}
      >
        <span className="ph-content-tag">{active.category}</span>
        <h3 className="ph-content-name">{active.name}</h3>
        <div className="ph-content-meta">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {active.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 flex-shrink-0" />
            {active.size}
          </span>
        </div>
        <Link href="/portfolio" className="ph-btn">
          View Project
        </Link>
      </div>

      {/* Prev / Next — bottom centre */}
      <div className="ph-buttons" style={{ zIndex: 20 }}>
        <button className="ph-nav-btn" onClick={goPrev} aria-label="Previous project">◁</button>
        <button className="ph-nav-btn" onClick={goNext} aria-label="Next project">▷</button>
      </div>
    </section>
  )
}
