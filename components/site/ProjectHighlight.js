'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, MapPin, Maximize2 } from 'lucide-react'
import { HIGHLIGHTED_PROJECTS } from '@/lib/voomet-data'

const liquidTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1]
}

export default function ProjectHighlight() {
  const [activeProject, setActiveProject] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [exitScrollCount, setExitScrollCount] = useState(0)
  const sectionRef = useRef(null)
  const scrollAccumulator = useRef(0)

  const project = HIGHLIGHTED_PROJECTS[activeProject]
  const mainImage = project?.images?.[activeImage] || project?.images?.[0]

  // Lock body scroll when section is locked
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLocked])

  // Intersection observer to detect when section is in view
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            // Snap to section and lock scroll
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setTimeout(() => {
              setIsLocked(true)
              setExitScrollCount(0)
            }, 300)
          }
        })
      },
      { threshold: [0.6] }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Scroll wheel handler when locked
  useEffect(() => {
    if (!isLocked) return

    const handleWheel = (e) => {
      e.preventDefault()
      
      // Accumulate scroll delta
      scrollAccumulator.current += e.deltaY
      
      // Threshold to trigger project change
      const threshold = 100
      
      if (Math.abs(scrollAccumulator.current) > threshold && !isTransitioning) {
        if (scrollAccumulator.current > 0) {
          // Scrolling down
          if (activeProject < HIGHLIGHTED_PROJECTS.length - 1) {
            setIsTransitioning(true)
            setActiveProject((prev) => prev + 1)
            setActiveImage(0)
            setTimeout(() => setIsTransitioning(false), 700)
            setExitScrollCount(0)
          } else {
            // At last project - count exit scrolls
            setExitScrollCount((prev) => prev + 1)
            if (exitScrollCount >= 2) {
              // User scrolled multiple times at the end - release
              setIsLocked(false)
              setTimeout(() => {
                window.scrollBy({ top: 200, behavior: 'smooth' })
              }, 50)
            }
          }
        } else {
          // Scrolling up
          if (activeProject > 0) {
            setIsTransitioning(true)
            setActiveProject((prev) => prev - 1)
            setActiveImage(0)
            setTimeout(() => setIsTransitioning(false), 700)
            setExitScrollCount(0)
          } else {
            // At first project - count exit scrolls
            setExitScrollCount((prev) => prev + 1)
            if (exitScrollCount >= 2) {
              // User scrolled multiple times at the start - release
              setIsLocked(false)
              setTimeout(() => {
                window.scrollBy({ top: -200, behavior: 'smooth' })
              }, 50)
            }
          }
        }
        scrollAccumulator.current = 0
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isLocked, activeProject, isTransitioning, exitScrollCount])

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveProject((prev) => (prev + 1) % HIGHLIGHTED_PROJECTS.length)
    setActiveImage(0)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const goToPrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveProject((prev) => (prev - 1 + HIGHLIGHTED_PROJECTS.length) % HIGHLIGHTED_PROJECTS.length)
    setActiveImage(0)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const selectImage = (idx) => {
    if (idx === activeImage) return
    setActiveImage(idx)
  }

  const selectProject = (idx) => {
    if (isTransitioning || idx === activeProject) return
    setIsTransitioning(true)
    setActiveProject(idx)
    setActiveImage(0)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  return (
    <section 
      ref={sectionRef} 
      id="portfolio" 
      className="relative h-screen bg-neutral-950 overflow-hidden"
    >
        {/* Background Image (blurred) with smooth crossfade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={mainImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0"
          >
            <img
              src={mainImage}
              alt=""
              className="w-full h-full object-cover blur-3xl saturate-50"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark base overlay */}
        <div className="absolute inset-0 bg-neutral-950/75 z-[1]" />

        {/* Top dark gradient (hero-like effect) */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-neutral-950 to-transparent z-[2]" />

        {/* Bottom dark gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-[2]" />

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col pt-20">

          {/* Central area: Left text + Right photo */}
          <div
            className="flex-1 gap-10 lg:gap-16 px-6 md:px-12 lg:px-20 items-center py-6"
            style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', alignItems: 'center' }}
          >

            {/* Left: Two separate blocks */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeProject}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={liquidTransition}
                className="flex flex-col gap-8 lg:gap-12"
              >
                {/* Block 1: Title & Subtitle */}
                <div className="space-y-3">
                  <motion.h3
                    className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1] tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, ...liquidTransition }}
                  >
                    {project?.name}
                  </motion.h3>
                  <motion.div
                    className="flex items-center gap-5 text-white/60"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, ...liquidTransition }}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{project?.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-4 h-4" />
                      <span>{project?.size}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Block 2: Description */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, ...liquidTransition }}
                >
                  <p className="text-neutral-400 leading-relaxed text-[15px] max-w-sm">
                    Premium interior design and manufacturing excellence. This project showcases our commitment to quality craftsmanship and innovative design solutions.
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Right: Main Photo + arrow outside right edge */}
            <div className="relative flex items-center">
              <AnimatePresence mode="sync">
                <motion.div
                  key={mainImage}
                  initial={{ opacity: 0, scale: 0.95, x: 60, filter: 'blur(15px)' }}
                  animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, x: -60, filter: 'blur(15px)' }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full aspect-[4/3] max-h-[65vh] rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
                >
                  <img
                    src={mainImage}
                    alt={project?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Arrow - outside right edge */}
              <motion.button
                onClick={goToNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -right-7 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-neutral-900 transition-all duration-300 z-20"
              >
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.button>
            </div>
          </div>

          {/* Bottom - Thumbnail Strip */}
          <div className="px-6 md:px-12 lg:px-20 pb-6 lg:pb-8 relative z-10">
            <div className="flex items-center justify-between gap-6">
              {/* Project indicator */}
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-sm">Project</span>
                <motion.span
                  key={activeProject}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white font-display text-2xl font-bold"
                >
                  {String(activeProject + 1).padStart(2, '0')}
                </motion.span>
                <span className="text-white/30">/</span>
                <span className="text-white/30">
                  {String(HIGHLIGHTED_PROJECTS.length).padStart(2, '0')}
                </span>
              </div>

              {/* Thumbnails of same project - centered */}
              <div className="flex-1 flex items-center justify-center gap-2 md:gap-3">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={`thumbs-${activeProject}`}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    transition={liquidTransition}
                    className="flex items-center gap-2 md:gap-3"
                  >
                    {project?.images?.slice(0, 6).map((img, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => selectImage(idx)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                          idx === activeImage
                            ? 'w-16 h-11 md:w-20 md:h-14 ring-2 ring-white ring-offset-2 ring-offset-neutral-950'
                            : 'w-10 h-7 md:w-14 md:h-10 opacity-40 hover:opacity-70'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </motion.button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Project navigation dots */}
              <div className="flex items-center gap-2">
                {HIGHLIGHTED_PROJECTS.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => selectProject(idx)}
                    whileHover={{ scale: 1.2 }}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      idx === activeProject
                        ? 'w-10 bg-white'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 max-w-xl mx-auto">
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-white/30 via-white/60 to-white/30"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                  key={`progress-${activeProject}-${activeImage}`}
                />
              </div>
            </div>
          </div>

        </div>

    </section>
  )
}
