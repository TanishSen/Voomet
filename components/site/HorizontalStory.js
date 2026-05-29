'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
} from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const PANELS = [
  {
    id: 'materials',
    num: '01',
    tag: 'Smart Material Selection',
    line1: 'Commercial-grade.',
    line2: 'Brand-aligned.',
    accent: 'Durable materials for operational needs.',
    body: 'We source durable, commercial-grade materials and furniture that align with your brand, budget, and operational needs.',
    image: '/AutoScrollimg/1.png',
  },
  {
    id: 'visualise',
    num: '02',
    tag: 'Visualise Before Execution',
    line1: 'See it before',
    line2: "it's built.",
    accent: 'Detailed 2D and 3D planning.',
    body: 'Detailed 2D planning and 3D visualisation help stakeholders review layouts, finishes, and functionality before execution begins.',
    image: '/AutoScrollimg/2.png',
  },
  {
    id: 'project',
    num: '03',
    tag: 'Structured Project Management',
    line1: 'Tracked.',
    line2: 'Coordinated. Visible.',
    accent: 'Defined milestones. Single point of contact.',
    body: 'Every project is tracked through defined milestones, coordinated timelines, and a dedicated point of contact for complete visibility.',
    image: '/AutoScrollimg/6.png',
  },
  {
    id: 'quality',
    num: '04',
    tag: 'Quality in Execution',
    line1: 'Monitored at',
    line2: 'every stage.',
    accent: 'Civil work to final finishing.',
    body: 'From civil work to final finishing, every stage is monitored for consistency, durability, and long-term performance.',
    image: '/AutoScrollimg/4.png',
  },
  {
    id: 'result',
    num: '05',
    tag: 'The Result',
    line1: 'Functional.',
    line2: 'Scalable. Built to last.',
    accent: 'MNCs. SMEs. Start-ups.',
    body: 'From Physics Wallah to Zluri, Juego to Nordson — every office we deliver is designed for how modern businesses work.',
    image: '/AutoScrollimg/5.png',
    cta: true,
  },
  {
    id: 'awards',
    num: '06',
    tag: 'ET Achievers 2025',
    line1: 'Award-winning',
    line2: 'design excellence.',
    accent: 'Recognized by The Times of India.',
    body: 'Excellence in Innovative Commercial Interior Design — Workplace, Hospitality, Retail & Educational Projects.',
    image: '/awards/PHOTO-2026-05-22-11-11-51.jpg',
    image2: '/awards/PHOTO-2026-05-22-11-11-50.jpg',
    isAward: true,
  },
]

const AUTO_PLAY_DELAY = 5000 // 5 seconds

export default function HorizontalStory() {
  const [activePanel, setActivePanel] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const isScrolling = useRef(false)
  const isLocked = useRef(false)
  const exitingDown = useRef(false)
  const exitingUp = useRef(false)
  const autoPlayTimer = useRef(null)

  const panel = PANELS[activePanel]

  // Navigation functions
  const goNext = () => {
    setActivePanel((i) => (i + 1) % PANELS.length)
    resetAutoPlay()
  }

  const goPrev = () => {
    setActivePanel((i) => (i - 1 + PANELS.length) % PANELS.length)
    resetAutoPlay()
  }

  const resetAutoPlay = () => {
    setIsPaused(true)
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current)
    // Resume auto-play after 8 seconds of inactivity
    autoPlayTimer.current = setTimeout(() => setIsPaused(false), 8000)
  }

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setActivePanel((i) => (i + 1) % PANELS.length)
    }, AUTO_PLAY_DELAY)

    return () => clearInterval(timer)
  }, [isPaused])

  // Lock/unlock body scroll
  const lockScroll = () => {
    if (!isLocked.current) {
      isLocked.current = true
      document.body.style.overflow = 'hidden'
    }
  }

  const unlockScroll = () => {
    if (isLocked.current) {
      isLocked.current = false
      document.body.style.overflow = ''
    }
  }

  // Handle wheel on entire section when locked
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let accumulated = 0

    const handleWheel = (e) => {
      const rect = section.getBoundingClientRect()
      const sectionInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100

      // If section is in view, lock scroll and handle panels
      if (sectionInView && !exitingDown.current && !exitingUp.current) {
        // Check if we should exit
        if (activePanel === PANELS.length - 1 && e.deltaY > 0) {
          // At last panel, scrolling down → exit
          exitingDown.current = true
          unlockScroll()
          return
        }
        if (activePanel === 0 && e.deltaY < 0) {
          // At first panel, scrolling up → exit
          exitingUp.current = true
          unlockScroll()
          return
        }

        // Lock scroll and navigate panels
        e.preventDefault()
        lockScroll()

        if (isScrolling.current) return

        accumulated += e.deltaY

        if (Math.abs(accumulated) > 50) {
          isScrolling.current = true

          if (accumulated > 0) {
            setActivePanel((i) => Math.min(PANELS.length - 1, i + 1))
          } else {
            setActivePanel((i) => Math.max(0, i - 1))
          }

          accumulated = 0

          setTimeout(() => {
            isScrolling.current = false
          }, 500)
        }
      } else {
        unlockScroll()
      }
    }

    // Reset exit flags when section leaves view
    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        exitingDown.current = false
        exitingUp.current = false
        // Reset to first panel when scrolling back from top
        if (rect.top > window.innerHeight) {
          setActivePanel(0)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      unlockScroll()
    }
  }, [activePanel])

  return (
    <section ref={sectionRef} id="story" className="px-4 md:px-8 py-16 md:py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto">

        {/* ─── Animated Title (ABOVE container) ─── */}
        <div className="mb-8 md:mb-10">
          {/* Label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={panel.id + '-label'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-px bg-neutral-300 dark:bg-neutral-600" />
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.35em]">
                {panel.num}&nbsp;—&nbsp;{panel.tag}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Main headline */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={panel.id + '-title'}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease }}
              className="font-display font-bold text-neutral-900 dark:text-white leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}
            >
              {panel.line1}
              <br />
              {panel.line2}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* ─── Container Card (description + image) ─── */}
        <div
          ref={containerRef}
          className="relative rounded-3xl overflow-hidden bg-neutral-900 cursor-grab active:cursor-grabbing"
          style={{ height: '620px' }}
        >
          {/* Background image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={panel.id + '-img'}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease }}
              className="absolute inset-0"
            >
              {panel.isAward ? (
                // Awards slide with two images side by side
                <div className="w-full h-full flex">
                  <div className="w-1/2 h-full relative">
                    <img
                      src={panel.image}
                      alt="ET Achievers Award Ceremony"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-1/2 h-full relative">
                    <img
                      src={panel.image2}
                      alt="ET Achievers Certificate"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={panel.image}
                  alt={panel.tag}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Overlay gradients - lighter for better image visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-neutral-950/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={panel.id + '-content'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease }}
                className="max-w-md"
              >
                {/* Accent */}
                <p className="font-display text-base md:text-lg font-light italic text-white/70 mb-3">
                  {panel.accent}
                </p>

                {/* Divider */}
                <div className="w-12 h-px bg-white/30 mb-4" />

                {/* Body */}
                <p className="text-white/80 text-sm md:text-[15px] leading-relaxed mb-5">
                  {panel.body}
                </p>

                {/* CTA (last panel) */}
                {panel.cta && (
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-neutral-900 rounded-full px-5 py-2.5 text-sm font-medium transition-all"
                  >
                    Explore our Works
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Bottom bar: arrows + navigation dots */}
            <div className="absolute bottom-6 left-6 md:left-10 right-6 md:right-10 flex items-center justify-between">
              {/* Left/Right Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={goNext}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Dots + hint */}
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-white/40 uppercase tracking-widest hidden md:block">
                  {isPaused ? 'Paused' : 'Auto-playing'}
                </span>
                <div className="flex items-center gap-1.5">
                  {PANELS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setActivePanel(idx); resetAutoPlay() }}
                      className={`h-[3px] rounded-full transition-all duration-400 ${
                        idx === activePanel ? 'w-6 bg-white' : 'w-2 bg-white/35 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Ghost number */}
            <span
              className="absolute bottom-4 right-4 font-display font-black text-[8rem] md:text-[12rem] text-white/[0.04] pointer-events-none select-none leading-none"
            >
              {panel.num}
            </span>
          </div>
        </div>

        {/* Slide counter */}
        <div className="mt-5 flex justify-end">
          <span className="text-xs text-neutral-400 tracking-wider">
            {String(activePanel + 1).padStart(2, '0')} / {String(PANELS.length).padStart(2, '0')}
          </span>
        </div>

      </div>
    </section>
  )
}
