'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Building2,
  Hammer,
  DoorOpen,
  Quote,
  Star,
  Sparkles,
  Factory,
  Monitor,
  CheckCircle2,
} from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import StickyCTA from '@/components/site/StickyCTA'
import FadeUp from '@/components/site/FadeUp'
import ContactSection from '@/components/site/ContactSection'
import TextReveal from '@/components/site/TextReveal'
import ParallaxImage from '@/components/site/ParallaxImage'
import ProjectHighlight from '@/components/site/ProjectHighlight'
import HorizontalStory from '@/components/site/HorizontalStory'

import {
  SERVICES as ALL_SERVICES,
  STATS,
  TESTIMONIALS,
  CLIENTS,
  FOUNDER,
  COMPANY,
  PROCESS_STEPS,
  FAQS,
  WHY_CHOOSE,
  TECH,
  USP_BULLETS,
} from '@/lib/voomet-data'

const ease = [0.22, 1, 0.36, 1]

const ICON_MAP = {
  'office-interiors': Building2,
  'bulk-manufacturing': Hammer,
  'doors-manufacturing': DoorOpen,
}

const IMG = {
  hero: '/hero-bg.jpg',
  modernMinimalist: 'https://voomet.com/images/webp/28.webp',
  galleryCard: 'https://voomet.com/images/webp/13.webp',
  bestFurniture: 'https://images.unsplash.com/photo-1718049720136-08bf541cfce8?w=900&q=80',
  timeless: 'https://voomet.com/images/webp/40.webp',
}

const Counter = ({ value }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!inView) return
    const match = value.match(/^(\d+)/)
    if (!match) {
      setDisplay(value)
      return
    }
    const target = parseInt(match[1], 10)
    const suffix = value.slice(match[1].length)
    const duration = 1400
    const start = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.floor(target * eased) + suffix)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return <span ref={ref}>{display}</span>
}

function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  const words = ['PREMIUM.', 'CRAFTED.', 'INSPIRED.', 'TIMELESS.', 'YOURS.']
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const onContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-900">
      {/* Full-bleed background */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img
          src={IMG.hero}
          alt="Voomet premium interior"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 65%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35" />
      </motion.div>

      {/* Massive centred headline */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none px-4"
      >
        {/* Cycling word — big, on top */}
        <AnimatePresence mode="wait">
          <motion.div
            key={words[wordIndex]}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-white uppercase leading-none tracking-[-0.04em] text-[14vw] md:text-[13vw] lg:text-[11vw]"
            style={{ textShadow: '0 4px 60px rgba(0,0,0,0.5)' }}
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>

        {/* Static brand word — smaller, below */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="font-display font-semibold text-white/60 uppercase leading-none tracking-[0.22em] text-[4vw] md:text-[3vw] lg:text-[2.2vw] mt-4"
        >
          VOOMET
        </motion.div>
      </motion.div>

      {/* Bottom-left: tagline + See Our Work — side by side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.7 }}
        className="absolute left-6 md:left-10 bottom-8 md:bottom-10 flex items-end gap-5 max-w-2xl"
      >
        <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-[260px] md:max-w-xs">
          Premium interiors crafted with 20+ years of expertise.
          Transforming spaces into living works of art.
        </p>
        <Link
          href="/portfolio"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:gap-3"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.22)',
          }}
        >
          See Our Work <ArrowUpRight className="h-4 w-4" />
        </Link>
      </motion.div>


      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 pointer-events-none"
        style={{ opacity: scrollHintOpacity }}
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}

function ModernMinimalist() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-28">
      <div className="max-w-[1400px] mx-auto">
        {/* DEV.UN split heading */}
        <div className="mb-16 md:mb-24">
          <FadeUp>
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 block">Doing our job from the heart</span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="font-display leading-[0.95]">
              <span className="block text-5xl md:text-7xl lg:text-8xl split-heading-light">OUR</span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] split-heading-bold tracking-[-0.04em] -mt-1 md:-mt-3">CRAFT</span>
            </h2>
          </FadeUp>
        </div>

        {/* Service item 01 — image right, text left */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 md:mb-32">
          <FadeUp direction="left" delay={0.1} className="order-2 lg:order-1">
            <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4">MODERN MINIMALIST</h3>
            <div className="w-12 h-px bg-neutral-900 mb-5" />
            <p className="text-neutral-600 leading-relaxed text-editorial max-w-md">
              Aesthetic furniture where every piece tells a story of style. We implement interior design for buildings of all sizes — expanding, modernising and visually enlarging every space.
            </p>
          </FadeUp>
          <FadeUp direction="right" delay={0.15} className="order-1 lg:order-2 relative">
            <span className="ghost-number absolute -top-6 -right-2 md:-top-10 md:right-0 z-10">01</span>
            <div className="offset-frame rounded-2xl overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl group">
                <img
                  src={IMG.modernMinimalist}
                  alt="Modern Minimalist"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Service item 02 — image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 md:mb-32">
          <FadeUp direction="left" delay={0.1} className="relative">
            <span className="ghost-number absolute -top-6 -left-2 md:-top-10 md:left-0 z-10">02</span>
            <div className="offset-frame rounded-2xl overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl group">
                <img
                  src={IMG.bestFurniture}
                  alt="Turnkey Renovation"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
              </div>
            </div>
          </FadeUp>
          <FadeUp direction="right" delay={0.15}>
            <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4">TURNKEY RENOVATION</h3>
            <div className="w-12 h-px bg-neutral-900 mb-5" />
            <p className="text-neutral-600 leading-relaxed text-editorial max-w-md">
              A well-established system of managing all stages of work makes it possible to meet deadlines and complete the interior design without you. We visit the site, monitor the project, and control every detail.
            </p>
          </FadeUp>
        </div>

        {/* Service item 03 — image right, text left */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeUp direction="left" delay={0.1} className="order-2 lg:order-1">
            <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4">SELECTION OF MATERIALS</h3>
            <div className="w-12 h-px bg-neutral-900 mb-5" />
            <p className="text-neutral-600 leading-relaxed text-editorial max-w-md">
              Choosing materials and interior items together with a specialist is a comprehensive and cost-effective service. It helps you purchase stylistically justified and functional objects for your space.
            </p>
            <Link
              href="/services/office-interiors"
              className="inline-flex items-center gap-2 mt-8 bg-neutral-900 hover:bg-neutral-700 text-white rounded-full px-6 py-3 text-sm transition-all hover:gap-3"
            >
              Calculate the Estimate <ArrowUpRight className="h-4 w-4" />
            </Link>
          </FadeUp>
          <FadeUp direction="right" delay={0.15} className="order-1 lg:order-2 relative">
            <span className="ghost-number absolute -top-6 -right-2 md:-top-10 md:right-0 z-10">03</span>
            <div className="offset-frame rounded-2xl overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl group">
                <img
                  src={IMG.galleryCard}
                  alt="Selection of Materials"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const statImages = [
    'https://voomet.com/images/webp/28.webp',
    'https://voomet.com/images/webp/13.webp',
    'https://voomet.com/images/webp/40.webp',
  ]
  return (
    <section id="about" className="px-4 md:px-8 py-20 md:py-32 relative overflow-hidden">
      {/* DEV.UN split heading */}
      <div className="max-w-[1400px] mx-auto mb-16 md:mb-24">
        <FadeUp>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-neutral-900" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">Learn more about the company</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95]">
            About the Company
          </h2>
        </FadeUp>
      </div>

      {/* Giant ghost brand text on left — vertical */}
      <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 pointer-events-none select-none">
        <span className="font-display text-[14rem] font-black tracking-[-0.06em] leading-none text-transparent" style={{ WebkitTextStroke: '1.5px rgba(0,0,0,0.04)', writingMode: 'vertical-lr' }}>
          VOOMET
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto">
        {STATS.slice(0, 3).map((s, i) => (
          <div key={s.label} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 last:mb-0 ${i % 2 !== 0 ? '' : ''}`}>
            {/* Image */}
            <FadeUp direction="left" delay={0.1} className={`relative ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl group">
                <img
                  src={statImages[i]}
                  alt={s.label}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
              {/* Offset frame */}
              <div className="absolute -inset-2 border border-neutral-200 rounded-2xl pointer-events-none" style={{ transform: `translate(${i % 2 === 0 ? '6px' : '-6px'}, 6px)` }} />
            </FadeUp>

            {/* Stat */}
            <FadeUp direction="right" delay={0.15} className={`${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <div className="font-display text-7xl md:text-9xl font-bold tracking-[-0.04em] leading-none mb-2">
                <Counter value={s.num} />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold uppercase tracking-wide mb-3">{s.label}</h3>
              <div className="w-full h-px bg-neutral-200 mb-4" />
              <p className="text-neutral-600 leading-relaxed text-editorial max-w-md">
                {s.label.includes('Years') && 'prove that we have the deep expertise and dedication to deliver exceptional interiors consistently.'}
                {s.label.includes('Projects') && 'prove that owners of commercial facilities, houses and apartments trust us with their spaces.'}
                {s.label.includes('Sq.ft') && 'of beautifully designed space commissioned across offices, residences, and commercial properties.'}
                {s.label.includes('Checks') && 'per project ensure the highest build quality — every panel, joint, and finish is inspected before handover.'}
                {s.label.includes('Client') && 'are always ready to recommend us — our dedication speaks through their words.'}
                {s.label.includes('Cities') && 'across the country rely on our team for premium interior solutions.'}
              </p>
            </FadeUp>
          </div>
        ))}

      </div>
    </section>
  )
}

function ModernStyle() {
  return (
    <section className="px-4 md:px-8 py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <FadeUp direction="left" className="relative">
          <div className="offset-frame rounded-2xl overflow-hidden">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <ParallaxImage src={IMG.timeless} alt="Timeless modern" className="absolute inset-0 w-full h-full" speed={0.1} />
            </div>
          </div>
        </FadeUp>
        <FadeUp direction="right" delay={0.1} className="py-6 lg:py-0">
          <div className="flex items-center gap-3 text-xs text-neutral-400 uppercase tracking-[0.3em] mb-6">
            <span>Elegance</span>
            <span className="w-6 h-px bg-neutral-300" />
            <span>Timeless</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] mb-8">
            Modern Style,<br /><span className="text-neutral-400">Timeless</span> Charm
          </h2>
          <p className="text-neutral-600 leading-relaxed max-w-lg text-editorial">
            Discover Voomet&apos;s portfolio — featuring offices, residences, hotels and
            healthcare spaces embodying diverse lifestyle concepts. Designed in-house,
            manufactured on imported German machinery, installed by our own craftsmen.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-700 text-white rounded-full px-6 py-3 text-sm transition-all hover:gap-3"
            >
              About Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 border border-neutral-300 rounded-full px-6 py-3 text-sm hover:bg-neutral-100 transition-colors"
            >
              View Portfolio
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Services() {
  const services = ALL_SERVICES.slice(0, 6)
  const [active, setActive] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [services.length])

  const goTo = (i) => {
    clearInterval(intervalRef.current)
    setActive(i)
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length)
    }, 5000)
  }

  const next = () => goTo((active + 1) % services.length)
  const prev = () => goTo((active - 1 + services.length) % services.length)

  const current = services[active]

  return (
    <section id="services" className="relative h-screen min-h-[700px] max-h-[900px] overflow-hidden">
      {/* Background layer - blurred and darkened */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${active}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={current.hero}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content container */}
      <div className="relative h-full flex flex-col justify-center z-10">
        {/* Top section with label */}
        <div className="absolute top-8 md:top-12 left-6 md:left-12 lg:left-20">
          <motion.span 
            className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/80 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Project Highlight
          </motion.span>
        </div>

        {/* Navigation arrows - right side */}
        <div className="absolute top-8 md:top-12 right-6 md:right-12 lg:right-20 flex items-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all duration-300 hover:scale-105"
          >
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 rotate-180" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all duration-300 hover:scale-105"
          >
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        {/* Main content - split layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between h-full px-6 md:px-12 lg:px-20 py-24 md:py-32">
          {/* Left side - Text content */}
          <div className="lg:w-[35%] flex flex-col justify-center mb-8 lg:mb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${active}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white mb-6 leading-[1.1]">
                  {current.name}
                </h2>
                <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-md italic">
                  {current.short || "A focused selection of interior projects highlighting our approach to clarity, material balance, spatial comfort, and thoughtful design solutions."}
                </p>
                <Link
                  href={`/services/${current.slug}`}
                  className="inline-flex items-center gap-3 mt-8 text-white text-sm md:text-base group"
                >
                  <span className="border-b border-white/30 pb-1 group-hover:border-white transition-colors">View Project</span>
                  <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-neutral-900 transition-all duration-300">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side - Featured image */}
          <div className="lg:w-[55%] flex items-center justify-center">
            <div className="relative w-full max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${active}`}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -10 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={current.hero}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom progress indicators */}
        <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20">
          <div className="flex items-center gap-4">
            {/* Slide counter */}
            <div className="text-white/60 text-sm font-medium tabular-nums">
              <span className="text-white">{String(active + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(services.length).padStart(2, '0')}</span>
            </div>
            
            {/* Progress bar */}
            <div className="flex-1 flex gap-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="flex-1 h-[2px] rounded-full bg-white/20 overflow-hidden cursor-pointer"
                >
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: i === active ? '100%' : i < active ? '100%' : '0%' }}
                    transition={i === active ? { duration: 5, ease: 'linear' } : { duration: 0.3 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyChooseVoomet() {
  const icons = [Sparkles, Factory, Monitor, CheckCircle2]
  return (
    <section className="px-4 md:px-8 py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-neutral-900" />
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">Why Choose Voomet</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] max-w-3xl">
              Every opportunity<br />is about <span className="italic font-light">commitment</span>
            </h2>
          </FadeUp>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((w, i) => {
            const Icon = icons[i] || Sparkles
            return (
              <FadeUp key={w.title} delay={i * 0.1} scale={0.9} y={60}>
                <div className="bg-white rounded-[24px] p-8 h-full border border-neutral-100 hover:border-neutral-300 hover:shadow-xl transition-all duration-700 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="ghost-number !text-5xl">0{i + 1}</span>
                  </div>
                  <h4 className="font-display text-xl font-semibold mb-3 tracking-[-0.02em]">{w.title}</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">{w.desc}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Technology() {
  const techIcons = [Monitor, Factory, Hammer]
  return (
    <section className="px-4 md:px-8 py-20 md:py-32 bg-neutral-900 text-white relative overflow-hidden">
      {/* Ghost text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-display text-[20vw] font-black tracking-[-0.06em] leading-none text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.03)' }}>
          TECHNOLOGY
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <FadeUp>
          <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 block">Technology That Powers Us</span>
          <h2 className="font-display leading-[0.95]">
            <span className="block text-5xl md:text-7xl lg:text-8xl font-light text-white/90">Built With</span>
            <span className="block text-6xl md:text-8xl lg:text-[9rem] font-extrabold tracking-[-0.04em] -mt-1 md:-mt-3">PRECISION</span>
          </h2>
        </FadeUp>
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH.map((t, i) => {
            const Icon = techIcons[i] || Monitor
            return (
              <FadeUp key={t.title} delay={i * 0.12} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'} scale={0.92}>
                <div className="bg-white/5 rounded-[24px] p-8 h-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-700 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white text-neutral-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-5xl font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>0{i + 1}</span>
                  </div>
                  <h4 className="font-display text-2xl font-semibold mb-3 tracking-[-0.02em]">{t.title}</h4>
                  <p className="text-white/60 leading-relaxed">{t.desc}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const words = ['Premium Interiors', 'Office Fit-outs', 'Bulk Manufacturing', 'Door Production', 'Residential Turnkey', 'MEP Coordination', 'Hospital Interiors', 'Hotel Interiors']
  return (
    <section className="py-10 overflow-hidden border-y border-neutral-200/70">
      <div className="flex animate-marquee whitespace-nowrap gap-12">
        {[...words, ...words].map((w, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em]">
              {w}
            </span>
            <span className="text-2xl md:text-4xl text-neutral-400">✦</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ClientsBar() {
  const doubled = [...CLIENTS, ...CLIENTS]
  return (
    <section className="py-16 border-y border-neutral-200/70 overflow-hidden">
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-12 px-4 md:px-8 max-w-[1400px] mx-auto">
          <h3 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em]">
            Trusted by <span className="italic font-light">leading</span> brands.
          </h3>
          <p className="text-sm text-neutral-500">A few of our clients across India and overseas.</p>
        </div>
      </FadeUp>
      <div className="relative">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex gap-4 w-max animate-marquee">
          {doubled.map((c, i) => (
            <div key={i} className="bg-white/60 rounded-2xl border border-neutral-200/70 h-20 w-40 flex-shrink-0 flex items-center justify-center p-4 grayscale">
              <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FounderQuote() {
  return (
    <section className="px-4 md:px-8 py-20 md:py-32 bg-neutral-50">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <FadeUp direction="left" className="relative rounded-[28px] overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
          <ParallaxImage src={FOUNDER.image} alt={FOUNDER.name} className="w-full h-full" speed={0.08} />
          <div className="absolute -inset-2 border border-neutral-200 rounded-[32px] pointer-events-none" style={{ transform: 'translate(8px, 8px)' }} />
        </FadeUp>
        <FadeUp direction="right" delay={0.1}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-neutral-900" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">About the Founder</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[0.95] mb-8">
            I have invested my life<br />into my <span className="italic font-light">passion</span>.
          </h2>
          <blockquote className="text-xl md:text-2xl font-display font-medium italic text-neutral-800 leading-snug max-w-xl">
            &ldquo;{COMPANY.promise}&rdquo;
          </blockquote>
          <p className="mt-6 text-neutral-600 leading-relaxed max-w-xl text-editorial">{FOUNDER.bio}</p>
          <div className="mt-8 flex items-center gap-4">
            <img src={FOUNDER.signature} alt="signature" className="h-12 w-auto" />
            <div className="text-sm text-neutral-600">
              <strong>{FOUNDER.name}</strong>
              <br />
              {FOUNDER.title}
            </div>
          </div>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-700 rounded-full px-6 py-3 text-sm transition-all hover:gap-3"
          >
            Read full story <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(id)
  }, [])
  const t = TESTIMONIALS[active]
  return (
    <section className="px-4 md:px-8 py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-neutral-900" />
                <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">What Our Clients Say</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]">
                Testimony of our <span className="italic font-light">commitment</span>.
              </h2>
            </div>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? 'w-8 bg-neutral-900' : 'w-2 bg-neutral-400'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeUp>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/60 rounded-[28px] border border-neutral-200/70 p-8 md:p-14 max-w-4xl"
          >
            <Quote className="h-10 w-10 text-neutral-300 mb-6" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4 tracking-[-0.02em]">{t.title}</h3>
            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <div className="font-semibold">{t.author}</div>
              <div className="text-sm text-neutral-500">{t.role}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="px-4 md:px-8 py-20 md:py-32 bg-neutral-50">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-neutral-900" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">Our Process · Five Steps</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] max-w-3xl">
            From first sketch<br />to <span className="italic font-light">final handover</span>.
          </h2>
        </FadeUp>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-5 gap-6">
          {PROCESS_STEPS.map((p, i) => (
            <FadeUp key={p.step} delay={i * 0.1} y={60} scale={0.92}>
              <div className="relative group">
                <span className="ghost-number !text-6xl md:!text-7xl group-hover:!text-neutral-900/15 transition-all duration-700">{p.step}</span>
                <h4 className="mt-3 font-semibold text-lg tracking-[-0.01em]">{p.title}</h4>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
                <div className="mt-5 h-px w-full bg-neutral-300/70 origin-left group-hover:bg-neutral-900 transition-colors duration-700" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="px-4 md:px-8 py-20 md:py-32">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] mb-14">
            Frequently <span className="italic font-light">asked</span>.
          </h2>
        </FadeUp>
        <div className="mt-10 divide-y divide-neutral-300">
          {FAQS.map((f, i) => (
            <div key={i} className="py-5">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full text-left flex items-start justify-between gap-6"
              >
                <span className="font-display text-xl md:text-2xl font-semibold tracking-[-0.01em]">{f.q}</span>
                <span className={`text-2xl transition-transform duration-500 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 text-neutral-600 max-w-3xl leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuickQuoteSection() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', phone: '', email: '', requirement: '', area: '' })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) { toast.error('Name and phone are required'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'homepage-quick-quote' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      router.push('/thank-you')
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <section className="px-4 md:px-8 pt-10 pb-4">
      <div className="max-w-[1400px] mx-auto">

        {/* Split card */}
        <FadeUp delay={0.12}>
          <div className="rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] border border-neutral-200/70 shadow-sm">

            {/* Left — image with USP overlay */}
            <div className="relative min-h-[420px] overflow-hidden">
              <img
                src="/quote-bg.jpg"
                alt="Reliable Interior Designers in Bangalore"
                className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-900/55 to-neutral-900/15" />
              <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-end text-white">
                <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs mb-5 tracking-wider uppercase">
                  Bangalore&apos;s Trusted Studio
                </span>
                <h3 className="font-display text-3xl md:text-[2.5rem] font-semibold tracking-[-0.025em] leading-[1.05] mb-7">
                  Reliable Interior<br />Designers in Bangalore
                </h3>
                <ul className="space-y-3">
                  {USP_BULLETS.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm text-white/85">
                      <CheckCircle2 className="h-4 w-4 text-white/50 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — quick form */}
            <div className="p-8 md:p-12 bg-neutral-100 flex flex-col justify-center">
              <div className="mb-7">
                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.025em] mb-1.5">
                  Talk to Our Interior Design Specialist
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Free consultation · We respond within one business day.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Input
                    placeholder="First Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-white border-neutral-200 rounded-xl h-12 text-sm"
                    required
                  />
                  <Input
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-white border-neutral-200 rounded-xl h-12 text-sm"
                    required
                  />
                </div>
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-white border-neutral-200 rounded-xl h-12 text-sm"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Select onValueChange={(v) => setForm({ ...form, requirement: v })}>
                    <SelectTrigger className="bg-white border-neutral-200 rounded-xl h-12 text-sm">
                      <SelectValue placeholder="Choose Requirement…" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_SERVICES.map((s) => (
                        <SelectItem key={s.slug} value={s.name}>{s.name}</SelectItem>
                      ))}
                      <SelectItem value="General Enquiry">General Enquiry</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(v) => setForm({ ...form, area: v })}>
                    <SelectTrigger className="bg-white border-neutral-200 rounded-xl h-12 text-sm">
                      <SelectValue placeholder="Select Sq.ft. Area…" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Under 500 sq.ft.', '500–1,000 sq.ft.', '1,000–2,500 sq.ft.', '2,500–5,000 sq.ft.', '5,000–10,000 sq.ft.', '10,000+ sq.ft.'].map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-neutral-900 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:gap-3 disabled:opacity-60 mt-1"
                >
                  {loading ? 'Sending…' : <><span>Get A Quote</span><ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap gap-4 pt-5 border-t border-neutral-200/80">
                {[`${COMPANY.yearsExperience}+ Yrs Experience`, `${COMPANY.projectsDelivered}+ Projects`, 'Free Consultation'].map((b) => (
                  <div key={b} className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-400" />
                    {b}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-clip">
      <Toaster position="top-center" richColors />
      <SiteNav />
      <Hero />
      <QuickQuoteSection />
      <ClientsBar />
      <ModernMinimalist />
      <Services />
      <Stats />
      <HorizontalStory />
      <ModernStyle />
      <ProjectHighlight />
      <WhyChooseVoomet />
      <Technology />
      <Marquee />
      <FounderQuote />
      <Testimonials />
      <Process />
      <FAQ />
      <ContactSection />
      <SiteFooter />
      <StickyCTA />
    </main>
  )
}

export default App
