'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  ArrowRight,
  Quote,
  Star,
  CheckCircle2,
  Grid3X3,
  Box,
  Palette,
  LayoutDashboard,
  MessageCircle,
  FileCheck2,
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
import ParallaxImage from '@/components/site/ParallaxImage'
import ProjectHighlight from '@/components/site/ProjectHighlight'
import HorizontalStory from '@/components/site/HorizontalStory'
import AboutSection from '@/components/site/AboutSection'
import FeatureModal from '@/components/site/FeatureModal'

import {
  SERVICES,
  TESTIMONIALS,
  CLIENTS,
  COMPANY,
  FAQS,
  TECH,
  USP_BULLETS,
} from '@/lib/voomet-data'

const ease = [0.22, 1, 0.36, 1]

const IMG = {
  timeless: '/portfolio/Orbit/3.jpg',
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

  const words = [
    'TURNKEY OFFICE INTERIORS',
    'COMMERCIAL WORKSPACE DESIGN & EXECUTION EXPERTS',
    'OFFICE FIT-OUT SPECIALISTS',
    'WORKSPACE DESIGN & BUILD',
    'MNC & STARTUP OFFICE INTERIORS',
    'END-TO-END EXECUTION'
  ]
  const [wordIndex, setWordIndex] = useState(0)
  const [showTitle, setShowTitle] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)

  // Lazy load video when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !videoLoaded) {
          setVideoLoaded(true)
        }
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [videoLoaded])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Track video time to hide title between 45-51 seconds
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime
      // Hide title between 45-51 seconds
      if (currentTime >= 45 && currentTime < 51) {
        setShowTitle(false)
      } else {
        setShowTitle(true)
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

  const onContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-neutral-900">
      {/* Full-bleed background */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        {/* Poster image for instant LCP */}
        <img
          src="/portfolio/Orbit/3.jpg"
          alt="Voomet Interior"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{ objectPosition: 'center 65%' }}
          fetchPriority="high"
        />
        {/* Lazy-loaded video - use compressed version */}
        {videoLoaded && (
          <video
            ref={videoRef}
            src="/herobg/hero-compressed.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 65%' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/55" />
      </motion.div>

      {/* Bottom-left: tagline + See Our Work */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.7 }}
        className="absolute left-6 md:left-10 bottom-8 md:bottom-10 flex items-end gap-5 max-w-xl"
      >
        <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-[280px] md:max-w-sm">
          From concept to handover — turnkey office interiors designed, built, and delivered under one roof.
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
          View Our Work <ArrowUpRight className="h-4 w-4" />
        </Link>
      </motion.div>


      {/* Scroll hint with centered cycling headline above */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-8 pointer-events-none"
        style={{ opacity: scrollHintOpacity }}
      >
        {/* Centered cycling headline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={words[wordIndex]}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white uppercase leading-none tracking-[0.12em] whitespace-nowrap text-2xl md:text-3xl lg:text-4xl"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
        
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

function Stats() {
  const [hoveredCard, setHoveredCard] = useState(null)
  
  const statsData = [
    { id: 0, num: '800+', label: 'Office Projects Delivered*', desc: '', dark: true, bg: '/portfolio/PW/2.png' },
    { id: 1, num: '6', label: 'Weeks Average Delivery', desc: '', dark: false, bg: '/portfolio/Appsforbarth/18.png' },
    { id: 2, num: '25L+', label: 'Sq.ft. Designed', desc: '', dark: false, bg: '/portfolio/Zluri/31.png' },
  ]

  // Slower, smoother spring config
  const springConfig = { type: "spring", stiffness: 120, damping: 20 }
  const slowSpring = { type: "spring", stiffness: 80, damping: 18 }

  // Calculate flex for each card based on hover state
  // Default: 2:1:1, Hover maintains the 2:1:1 pattern shifting to hovered card
  const getFlexValue = (cardId) => {
    if (hoveredCard === null) {
      // Default state: first card (black) is bigger
      return cardId === 0 ? 2 : 1
    }
    // Hovered card gets 2, others get 1
    return hoveredCard === cardId ? 2 : 1
  }

  return (
    <section className="px-4 md:px-8 py-16 md:py-24 relative overflow-hidden bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Centered Headline */}
        <FadeUp>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.1]">
              Commercial Interior Expertise<br />
              <span className="italic font-light">at scale.</span>
            </h2>
          </div>
        </FadeUp>

        {/* Interactive Cards Row */}
        <FadeUp delay={0.15}>
          <div 
            className="flex flex-col lg:flex-row gap-4 md:gap-5 h-auto lg:h-[420px]"
            onMouseLeave={() => setHoveredCard(null)}
          >
            {statsData.map((stat, i) => {
              const isHovered = hoveredCard === stat.id
              const hasHover = hoveredCard !== null
              const isOther = hasHover && !isHovered
              const flexValue = getFlexValue(stat.id)

              return (
                <motion.div
                  key={stat.id}
                  className="relative rounded-3xl overflow-hidden cursor-pointer flex flex-col"
                  onMouseEnter={() => setHoveredCard(stat.id)}
                  animate={{
                    flex: flexValue,
                    scale: isHovered ? 1.015 : isOther ? 0.985 : 1,
                    filter: isOther ? 'brightness(0.88)' : 'brightness(1)',
                  }}
                  transition={slowSpring}
                  style={{ minHeight: '280px' }}
                >
                  {/* Background image + overlay */}
                  <div className="absolute inset-0">
                    <img
                      src={stat.bg}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                      style={{
                        transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                        filter: 'blur(1.5px) brightness(0.52)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/55 to-black/45" />
                  </div>

                  {/* Grid Pattern */}
                  <div className={`absolute inset-0 ${stat.dark ? 'opacity-[0.05]' : 'opacity-[0.18]'}`}>
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`grid-${stat.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#grid-${stat.id})`} />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="relative p-6 md:p-8 lg:p-10 flex flex-col h-full">
                    {/* Icon */}
                    <motion.div 
                      className="mb-auto"
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        y: isHovered ? -2 : 0 
                      }}
                      transition={springConfig}
                    >
                      {i === 0 ? (
                        <svg className="w-7 h-7 text-white/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : i === 1 ? (
                        <svg className="w-7 h-7 text-white/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-7 h-7 text-white/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                        </svg>
                      )}
                    </motion.div>

                    {/* Number */}
                    <motion.div 
                      className="mt-auto overflow-hidden"
                      animate={{ 
                        scale: isHovered ? 1.02 : isOther ? 0.85 : 1,
                        x: isHovered ? 3 : 0
                      }}
                      transition={slowSpring}
                    >
                      <motion.span 
                        className="font-display font-bold tracking-[-0.04em] leading-none block text-white"
                        style={{ 
                          fontSize: stat.dark ? 'clamp(4rem, 10vw, 7rem)' : 'clamp(3rem, 8vw, 5rem)'
                        }}
                      >
                        <Counter value={stat.num} />
                      </motion.span>
                    </motion.div>

                    {/* Label */}
                    <motion.div 
                      className="mt-3"
                      animate={{ 
                        opacity: isOther ? 0.5 : 1,
                        y: isHovered ? 2 : 0
                      }}
                      transition={slowSpring}
                    >
                      <p className="text-sm md:text-base leading-snug text-white/90">
                        {stat.label}
                      </p>
                    </motion.div>

                    {/* Hover indicator line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 ${stat.dark ? 'bg-white/30' : 'bg-neutral-900/20'}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originX: 0 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Technology() {
  const techIcons = [Grid3X3, Box, Palette, LayoutDashboard, MessageCircle, FileCheck2]
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [clickPosition, setClickPosition] = useState(null)

  const handleCardClick = (feature, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
    setSelectedFeature(feature)
  }

  return (
    <>
      <section className="px-4 md:px-8 py-20 md:py-32 bg-neutral-900 text-white relative overflow-hidden">
        {/* Top black gradient overlay for seamless transition */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-24 md:h-32" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 40%)'}} />
        {/* Ghost text background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-display text-[20vw] font-black tracking-[-0.06em] leading-none text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.03)' }}>
            TECHNOLOGY
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 pt-8">
          <FadeUp>
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 block">Precision Through Technology</span>
            <h2 className="font-display leading-[0.95]">
              <span className="block text-5xl md:text-7xl lg:text-8xl font-light text-white/90">Designed &amp; Built With</span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] font-extrabold tracking-[-0.04em] -mt-1 md:-mt-3">PRECISION</span>
            </h2>
          </FadeUp>
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TECH.map((t, i) => {
              const Icon = techIcons[i] || Monitor
              return (
                <FadeUp key={t.title} delay={i * 0.12} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'} scale={0.92}>
                  <motion.button
                    onClick={(e) => handleCardClick(t, e)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-left bg-white/5 rounded-[24px] p-8 h-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-700 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white text-neutral-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-display text-5xl font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>0{i + 1}</span>
                    </div>
                    <h4 className="font-display text-2xl font-semibold mb-3 tracking-[-0.02em]">{t.title}</h4>
                    <p className="text-white/60 leading-relaxed">{t.desc}</p>
                    <div className="mt-4 text-xs uppercase tracking-widest text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to explore →
                    </div>
                  </motion.button>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feature Modal - import and render */}
      {typeof window !== 'undefined' && selectedFeature && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <FeatureModal 
            feature={selectedFeature} 
            isOpen={!!selectedFeature} 
            onClose={() => setSelectedFeature(null)}
            position={clickPosition}
          />
        </motion.div>
      )}
    </>
  )
}

function Marquee() {
  const words = ['Office Interiors', 'MNC Fit-outs', 'SME Workspaces', 'Start-up Offices', 'Turnkey Delivery', 'MEP Coordination', '3D Visualisation', 'In-House Manufacturing']
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
    <section className="py-16 border-t border-neutral-200/70 overflow-hidden">
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-12 px-4 md:px-8 max-w-[1400px] mx-auto">
          <h3 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em]">
            Trusted by <span className="italic font-light">Industry Leaders</span>
          </h3>
          <p className="text-sm text-neutral-500 text-right max-w-xs">Workspace partner for leading enterprises,<br />high-growth start-ups, and technology-driven organisations.</p>
        </div>
      </FadeUp>
      <div className="relative">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex gap-4 w-max animate-marquee">
          {doubled.map((c, i) => (
            <div key={i} className="h-16 w-36 flex-shrink-0 flex items-center justify-center p-3 transition-transform duration-300 ease-out hover:-translate-y-2">
              <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
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
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-neutral-900' : 'w-2 bg-neutral-400'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
      
      {/* Horizontal Carousel - Centered Active Card */}
      <div className="relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative h-[480px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {TESTIMONIALS.map((t, i) => {
                const isActive = i === active
                const offset = i - active
                
                // Only render nearby cards for performance
                if (Math.abs(offset) > 2) return null
                
                return (
                  <motion.div
                    key={i}
                    onClick={() => setActive(i)}
                    className="absolute cursor-pointer"
                    initial={{ 
                      x: offset > 0 ? 800 : -700,
                      scale: 0.9,
                      opacity: 0,
                    }}
                    animate={{ 
                      x: offset * 520,
                      scale: isActive ? 1.02 : 0.75,
                      opacity: isActive ? 1 : 0.3,
                      zIndex: isActive ? 30 : 10 - Math.abs(offset),
                    }}
                    exit={{ 
                      x: offset < 0 ? -700 : 700,
                      scale: 0.7,
                      opacity: 0,
                    }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.32, 0.72, 0, 1],
                      scale: { duration: 0.5 }
                    }}
                    style={{ width: 500 }}
                  >
                    <motion.div 
                      className={`bg-white rounded-[28px] border p-10 transition-shadow duration-500 ${
                        isActive 
                          ? 'border-neutral-300 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.25)]' 
                          : 'border-neutral-200/40 shadow-lg'
                      }`}
                      animate={{
                        filter: isActive ? 'blur(0px)' : 'blur(4px)',
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Quote className="h-10 w-10 text-neutral-300 mb-6" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h3 className="font-display text-2xl font-semibold mb-4 tracking-[-0.02em]">{t.title}</h3>
                      <p className="text-lg text-neutral-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                      <div className="mt-8 pt-6 border-t border-neutral-200">
                        <div className="font-semibold">{t.author}</div>
                        <div className="text-sm text-neutral-500">{t.role}</div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
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
            Real Questions, <span className="italic font-light">Straight Answers.</span>
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
    <section className="px-4 md:px-8 py-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Split card */}
        <FadeUp delay={0.12}>
          <div className="rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] border border-neutral-200/70 shadow-sm">

            {/* Left — image with USP overlay */}
            <div className="relative min-h-[420px] overflow-hidden">
              <img
                src="/quote-bg.jpg"
                alt="Reliable Interior Designers in Bangalore"
                className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s] blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-900/70 to-neutral-900/40" />
              <div className="relative z-10 p-8 md:p-12 pb-16 md:pb-20 flex flex-col h-full justify-end text-white">
                <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs mb-6 tracking-wider uppercase">
                  Bangalore&apos;s Trusted Studio
                </span>
                <h3 className="font-display text-3xl md:text-[2.5rem] font-semibold tracking-[-0.025em] leading-[1.05] mb-14">
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
                      {SERVICES.map((s) => (
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
                      {['Under 2,500 sq.ft', '2,500–5,000 sq.ft.', '5,000–10,000 sq.ft.', '10,000–20,000 sq.ft.', 'Above 60,000 sq.ft'].map((a) => (
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
      <HorizontalStory />
      <Stats />
      <ProjectHighlight />
      <AboutSection />
      <Marquee />
      <Technology />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <SiteFooter />
      <StickyCTA />
    </main>
  )
}

export default App
