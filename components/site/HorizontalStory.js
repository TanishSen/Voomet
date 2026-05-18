'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const PANELS = [
  {
    id: 'vision',
    num: '01',
    tag: 'Vision',
    line1: "We don't just",
    line2: 'design spaces.',
    accent: 'We build experiences.',
    body: 'Every Voomet project starts with understanding how people move, breathe, and thrive in a space. Design is our first language — before a single nail is driven.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=2560&q=95&auto=format&fit=crop',
    textSide: 'left',
  },
  {
    id: 'craft',
    num: '02',
    tag: 'Craft',
    line1: 'Manufactured',
    line2: 'in-house.',
    accent: 'Precision without compromise.',
    body: 'Our factory runs on German machinery. Every piece we make is cut, shaped, and finished in-house — zero outsourcing, full quality control, zero surprises.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=2560&q=95&auto=format&fit=crop',
    textSide: 'right',
  },
  {
    id: 'materials',
    num: '03',
    tag: 'Materials',
    line1: 'Every surface',
    line2: 'speaks.',
    accent: 'Curated for longevity.',
    body: 'From premium veneers to signature hardware — we source materials that define the character of your space and outlast every trend by decades.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2560&q=95&auto=format&fit=crop',
    textSide: 'left',
  },
  {
    id: 'result',
    num: '04',
    tag: 'The Result',
    line1: '500+ spaces',
    line2: 'transformed.',
    accent: 'Across India and beyond.',
    body: 'From ambitious startups to leading enterprises — every space we deliver sets a new benchmark for what exceptional design looks like in the real world.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2560&q=95&auto=format&fit=crop',
    textSide: 'right',
    cta: true,
  },
]

export default function HorizontalStory() {
  const wrapperRef = useRef(null)
  const [activePanel, setActivePanel] = useState(0)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `${-(PANELS.length - 1) * 100}vw`]
  )

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(
      PANELS.length - 1,
      Math.max(0, Math.round(latest * (PANELS.length - 1)))
    )
    setActivePanel(next)
  })

  return (
    <div
      id="story"
      ref={wrapperRef}
      style={{ height: `${PANELS.length * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport — pinned to top while user scrolls through outer height */}
      <div className="sticky top-0 h-screen overflow-hidden bg-neutral-950">

        {/* Horizontal track */}
        <motion.div
          style={{ x, width: `${PANELS.length * 100}vw` }}
          className="flex h-full will-change-transform"
        >
          {PANELS.map((panel, i) => (
            <Panel
              key={panel.id}
              panel={panel}
              index={i}
              total={PANELS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* ── Persistent overlay UI ── */}

        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-neutral-950 to-transparent z-30 pointer-events-none" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent z-30 pointer-events-none" />

        {/* Bottom bar */}
        <div className="absolute bottom-8 left-0 right-0 z-40 px-8 md:px-14 lg:px-20 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.span
              key={activePanel}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease }}
              className="text-[10px] text-white/55 uppercase tracking-[0.32em]"
            >
              {PANELS[activePanel]?.num}&nbsp;—&nbsp;{PANELS[activePanel]?.tag}
            </motion.span>
          </AnimatePresence>

          <div className="flex items-center gap-2">
            {PANELS.map((_, idx) => (
              <div
                key={idx}
                className={`h-[3px] rounded-full transition-all duration-500 ease-out ${
                  idx === activePanel ? 'w-8 bg-white' : 'w-2 bg-white/35'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint — vertical label on right edge (first panel only) */}
        <AnimatePresence>
          {activePanel === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 pointer-events-none"
            >
              <span className="text-[9px] text-white/45 uppercase tracking-[0.28em]"
                style={{ writingMode: 'vertical-lr' }}>
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

function Panel({ panel, index, total, scrollYProgress }) {
  const panelCenter = total <= 1 ? 0 : index / (total - 1)
  const half = 0.38 / Math.max(total - 1, 1)

  const lo = Math.max(0, panelCenter - half)
  const hi = Math.min(1, panelCenter + half)
  const loSoft = Math.max(0, panelCenter - half * 0.3)
  const hiSoft = Math.min(1, panelCenter + half * 0.3)

  /* Edge-case: when lo is clipped to 0 (first panel) or hi is clipped to 1 (last panel),
     the duplicate keyframe causes framer-motion to pick opacity=0 at the boundary.
     Detect those cases and start/end fully visible instead. */
  const isFirstPanel = lo >= panelCenter
  const isLastPanel  = hi <= panelCenter

  /* Background: dims + scales slightly when off-center */
  const imgOpacity = useTransform(
    scrollYProgress,
    [lo, panelCenter, hi],
    [isFirstPanel ? 1 : 0.45, 1, isLastPanel ? 1 : 0.45],
    { clamp: true }
  )
  const imgScale = useTransform(
    scrollYProgress,
    [lo, panelCenter, hi],
    [isFirstPanel ? 1 : 1.08, 1, isLastPanel ? 1 : 1.08],
    { clamp: true }
  )

  /* Content: slides and fades in/out with panel */
  const contentY = useTransform(
    scrollYProgress,
    [lo, loSoft, hiSoft, hi],
    [isFirstPanel ? 0 : 40, 0, 0, isLastPanel ? 0 : -40],
    { clamp: true }
  )
  const contentOpacity = useTransform(
    scrollYProgress,
    [lo, loSoft, hiSoft, hi],
    [isFirstPanel ? 1 : 0, 1, 1, isLastPanel ? 1 : 0],
    { clamp: true }
  )

  /* Accent line: grows in when panel is centered */
  const lineScale = useTransform(scrollYProgress, [lo, panelCenter], [0, 1], { clamp: true })

  const isLeft = panel.textSide === 'left'

  return (
    <div className="relative w-screen h-full flex-shrink-0 overflow-hidden">

      {/* ── Background image ── */}
      <motion.div
        style={{ opacity: imgOpacity, scale: imgScale }}
        className="absolute inset-0 origin-center"
      >
        <img
          src={panel.image}
          alt={panel.tag}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* ── Layered gradients for legibility ── */}
      <div className="absolute inset-0 bg-neutral-950/30" />
      <div className={`absolute inset-0 ${
        isLeft
          ? 'bg-gradient-to-r from-neutral-950/80 via-neutral-950/30 to-transparent'
          : 'bg-gradient-to-l from-neutral-950/80 via-neutral-950/30 to-transparent'
      }`} />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent" />

      {/* ── Ghost number (decorative) ── */}
      <div
        className={`absolute bottom-12 pointer-events-none select-none z-0 ${
          isLeft ? 'right-8 md:right-16' : 'left-8 md:left-16'
        }`}
      >
        <span
          className="font-display font-black leading-none text-transparent"
          style={{
            fontSize: 'clamp(8rem, 22vw, 22rem)',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.04)',
          }}
        >
          {panel.num}
        </span>
      </div>

      {/* ── Panel content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={`absolute inset-0 z-10 flex flex-col justify-center px-10 md:px-16 lg:px-24 xl:px-32 ${
          isLeft ? 'items-start' : 'items-end text-right'
        }`}
      >
        {/* Label */}
        <div className={`flex items-center gap-3 mb-7 ${isLeft ? '' : 'flex-row-reverse'}`}>
          <span className="w-6 h-px bg-white/25" />
          <span className="text-[10px] text-white/60 uppercase tracking-[0.35em]">
            {panel.num}&nbsp;—&nbsp;{panel.tag}
          </span>
        </div>

        {/* Main headline */}
        <h2
          className="font-display font-bold text-white leading-[0.88] tracking-tight"
          style={{ fontSize: 'clamp(3.2rem, 7.5vw, 8rem)' }}
        >
          {panel.line1}
          <br />
          {panel.line2}
        </h2>

        {/* Accent italic */}
        <p className="mt-4 font-display text-lg md:text-xl font-light italic text-white/55 tracking-tight">
          {panel.accent}
        </p>

        {/* Animated divider line */}
        <motion.div
          style={{ scaleX: lineScale, originX: isLeft ? 0 : 1 }}
          className={`mt-5 mb-5 h-px w-20 bg-white/35 ${isLeft ? '' : 'ml-auto'}`}
        />

        {/* Body copy */}
        <p
          className="text-white/70 leading-relaxed"
          style={{
            fontSize: 'clamp(13px, 1.1vw, 16px)',
            maxWidth: '380px',
            marginLeft: isLeft ? 0 : 'auto',
          }}
        >
          {panel.body}
        </p>

        {/* CTA (last panel only) */}
        {panel.cta && (
          <Link
            href="/portfolio"
            className={`inline-flex items-center gap-3 mt-9 group ${isLeft ? '' : 'flex-row-reverse'}`}
          >
            <span className="font-display text-white text-[15px] border-b border-white/20 pb-0.5 group-hover:border-white/60 transition-colors duration-300">
              Explore our portfolio
            </span>
            <span className="w-9 h-9 rounded-full border border-white/18 flex items-center justify-center group-hover:bg-white group-hover:text-neutral-900 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        )}
      </motion.div>

    </div>
  )
}
