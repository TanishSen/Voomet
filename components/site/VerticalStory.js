'use client'

import { useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const PANELS = [
  {
    id: 'awards',
    num: '01',
    tag: 'ET Achievers 2025',
    headline: 'Award-winning design excellence.',
    subheadline: 'Recognized by The Times of India.',
    body: 'Excellence in Innovative Commercial Interior Design — Workplace, Hospitality, Retail & Educational Projects.',
    image: '/awards/PHOTO-2026-05-22-11-11-51.jpg',
    image2: '/awards/PHOTO-2026-05-22-11-11-50.jpg',
    isAward: true,
  },
  {
    id: 'materials',
    num: '02',
    tag: 'Smart Material & Furniture Selection',
    headline: 'Commercial-grade. Brand-aligned.',
    subheadline: 'Durable materials for operational needs.',
    body: 'We source durable, commercial-grade materials and furniture that align with your brand, budget, and operational needs.',
    image: '/AutoScrollimg/1.png',
  },
  {
    id: 'visualise',
    num: '03',
    tag: 'Visualise Before Execution',
    headline: 'See it before it\'s built.',
    subheadline: 'Detailed 2D and 3D planning.',
    body: 'Detailed 2D planning and 3D visualisation help stakeholders review layouts, finishes, and functionality before execution begins.',
    image: '/AutoScrollimg/2.png',
  },
  {
    id: 'project',
    num: '04',
    tag: 'Structured Project Management',
    headline: 'Tracked. Coordinated. Visible.',
    subheadline: 'Defined milestones. Single point of contact.',
    body: 'Every project is tracked through defined milestones, coordinated timelines, and a dedicated point of contact for complete visibility.',
    image: '/AutoScrollimg/3.png',
  },
  {
    id: 'quality',
    num: '05',
    tag: 'Quality in Execution',
    headline: 'Monitored at every stage.',
    subheadline: 'Civil work to final finishing.',
    body: 'From civil work to final finishing, every stage is monitored for consistency, durability, and long-term performance.',
    image: '/AutoScrollimg/4.png',
  },
  {
    id: 'result',
    num: '06',
    tag: 'The Result',
    headline: 'Functional. Scalable. Built to last.',
    subheadline: 'MNCs. SMEs. Start-ups.',
    body: 'From Physics Wallah to Zluri, Juego to Nordson — every office we deliver is designed for how modern businesses work.',
    image: '/AutoScrollimg/5.png',
    cta: true,
  },
]

function Panel({ panel, index, isReversed }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05])

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        index !== PANELS.length - 1 ? 'mb-24 md:mb-40' : ''
      }`}
    >
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className={`${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] text-neutral-400 uppercase tracking-[0.3em]">
            {panel.num}&nbsp;—&nbsp;{panel.tag}
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] mb-4 text-neutral-900">
          {panel.headline}
        </h3>

        {/* Subheadline */}
        <p className="font-display text-lg md:text-xl font-light italic text-neutral-500 mb-5">
          {panel.subheadline}
        </p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="w-16 h-px bg-neutral-300 mb-6 origin-left"
        />

        {/* Body */}
        <p className="text-neutral-600 leading-relaxed max-w-md text-[15px]">
          {panel.body}
        </p>

        {/* CTA */}
        {panel.cta && (
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 mt-8 group"
          >
            <span className="bg-neutral-900 hover:bg-neutral-700 text-white rounded-full px-6 py-3 text-sm font-medium transition-all flex items-center gap-2">
              Explore Our Work <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        )}
      </motion.div>

      {/* Image */}
      <motion.div
        ref={imgRef}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease }}
        className={`relative ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
      >
        {/* Ghost number */}
        <span
          className={`absolute -top-8 z-10 font-display font-black text-8xl md:text-9xl text-transparent pointer-events-none select-none ${
            isReversed ? '-left-4 md:-left-6' : '-right-4 md:-right-6'
          }`}
          style={{ WebkitTextStroke: '1.5px rgba(0,0,0,0.06)' }}
        >
          {panel.num}
        </span>

        {/* Image container with parallax */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-neutral-200/50">
          {panel.isAward ? (
            // Awards slide with two images side by side
            <div className="absolute inset-0 flex">
              <motion.div 
                className="w-1/2 h-full relative"
                style={{ y: imgY, scale: imgScale }}
              >
                <img
                  src={panel.image}
                  alt="ET Achievers Award Ceremony"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="w-1/2 h-full relative"
                style={{ y: imgY, scale: imgScale }}
              >
                <img
                  src={panel.image2}
                  alt="ET Achievers Certificate"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          ) : (
            <motion.img
              src={panel.image}
              alt={panel.tag}
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/10 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}

export default function VerticalStory() {
  const sectionRef = useRef(null)
  const headerInView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section ref={sectionRef} id="story" className="px-4 md:px-8 py-20 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 block">
              From Concept to Completion
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display leading-[0.92]"
          >
            <span className="block text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] text-neutral-900">
              TURNKEY
            </span>
            <span className="block text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-[-0.04em] -mt-1 md:-mt-3 text-neutral-900">
              OFFICE INTERIORS
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-8 text-neutral-500 text-lg max-w-xl"
          >
            Premium workspaces designed, manufactured, and delivered under one roof.
          </motion.p>
        </div>

        {/* Panels */}
        {PANELS.map((panel, index) => (
          <Panel
            key={panel.id}
            panel={panel}
            index={index}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  )
}
