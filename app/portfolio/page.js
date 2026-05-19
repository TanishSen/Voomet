'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Maximize2 } from 'lucide-react'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import StickyCTA from '@/components/site/StickyCTA'
import FadeUp from '@/components/site/FadeUp'
import ContactSection from '@/components/site/ContactSection'
import { Toaster } from 'sonner'
import { PROJECT_PORTFOLIO } from '@/lib/voomet-data'

const TYPE_LABELS = {
  mnc: 'MNC',
  startup: 'Start-up',
  sme: 'SME',
  education: 'Education',
}

export default function PortfolioPage() {
  const [lightbox, setLightbox] = useState({ open: false, projectIdx: 0, imageIdx: 0 })

  const openLightbox = (projectIdx, imageIdx = 0) => setLightbox({ open: true, projectIdx, imageIdx })
  const closeLightbox = () => setLightbox({ ...lightbox, open: false })

  const currentProject = PROJECT_PORTFOLIO[lightbox.projectIdx]
  const allImages = currentProject?.gallery?.length > 0 ? currentProject.gallery : [currentProject?.img]
  
  const nextImage = () => {
    setLightbox((prev) => ({
      ...prev,
      imageIdx: (prev.imageIdx + 1) % allImages.length,
    }))
  }
  const prevImage = () => {
    setLightbox((prev) => ({
      ...prev,
      imageIdx: (prev.imageIdx - 1 + allImages.length) % allImages.length,
    }))
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <SiteNav />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 md:px-8">
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
                across Bangalore and beyond. Each project tells a story.
              </p>
            </div>
          </FadeUp>

          {/* Stats Bar */}
          <FadeUp delay={0.15} className="mt-12">
            <div className="flex flex-wrap gap-8 md:gap-16 py-6 border-y border-neutral-200">
              <div>
                <div className="font-display text-4xl font-semibold tracking-tight">{PROJECT_PORTFOLIO.length}</div>
                <div className="text-sm text-neutral-500 mt-1">Featured Projects</div>
              </div>
              <div>
                <div className="font-display text-4xl font-semibold tracking-tight">
                  {PROJECT_PORTFOLIO.reduce((acc, p) => acc + parseInt(p.size.replace(/[^0-9]/g, '')) || 0, 0).toLocaleString()}+
                </div>
                <div className="text-sm text-neutral-500 mt-1">Sq.ft. Delivered</div>
              </div>
              <div>
                <div className="font-display text-4xl font-semibold tracking-tight">
                  {new Set(PROJECT_PORTFOLIO.map(p => p.client)).size}
                </div>
                <div className="text-sm text-neutral-500 mt-1">Unique Clients</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Project Sections */}
      {PROJECT_PORTFOLIO.map((project, projectIdx) => {
        const images = project.gallery?.length > 0 ? project.gallery : [project.img]
        const isEven = projectIdx % 2 === 0

        return (
          <section
            key={project.id}
            className={`py-16 md:py-24 px-4 md:px-8 ${isEven ? 'bg-white' : 'bg-neutral-50'}`}
          >
            <div className="max-w-[1400px] mx-auto">
              <FadeUp>
                {/* Project Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider">
                        {TYPE_LABELS[project.type] || project.type}
                      </span>
                      {project.timeline && (
                        <span className="px-3 py-1 rounded-full border border-neutral-300 text-xs text-neutral-600">
                          {project.timeline}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.1]">
                      {project.name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-6 text-sm text-neutral-600 lg:text-right">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4" />
                      <span>{project.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-4xl mb-10">
                  {project.description}
                </p>

                {/* Image Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {/* Main large image */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openLightbox(projectIdx, 0)}
                    className="col-span-2 row-span-2 relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200 group cursor-pointer"
                  >
                    <img
                      src={images[0]}
                      alt={`${project.name} - Main`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="h-4 w-4" />
                    </div>
                  </motion.button>

                  {/* Additional images */}
                  {images.slice(1, 5).map((img, imgIdx) => (
                    <motion.button
                      key={imgIdx}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openLightbox(projectIdx, imgIdx + 1)}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200 group cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`${project.name} - ${imgIdx + 2}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.button>
                  ))}

                  {/* Placeholder cells if less than 4 additional images */}
                  {images.length < 5 &&
                    Array.from({ length: 4 - (images.length - 1) }).map((_, i) => (
                      <div
                        key={`placeholder-${i}`}
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 flex items-center justify-center"
                      >
                        <span className="text-neutral-300 text-sm">Coming soon</span>
                      </div>
                    ))}
                </div>
              </FadeUp>
            </div>
          </section>
        )
      })}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && (
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
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  className="absolute left-4 md:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  className="absolute right-4 md:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <motion.div
              key={`${lightbox.projectIdx}-${lightbox.imageIdx}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[lightbox.imageIdx]}
                alt={`${currentProject.name} - ${lightbox.imageIdx + 1}`}
                className="max-h-[80vh] w-auto object-contain rounded-lg"
              />
              <div className="mt-4 text-center text-white">
                <div className="text-xs opacity-70 uppercase tracking-wider">{TYPE_LABELS[currentProject.type] || currentProject.type}</div>
                <div className="font-display text-2xl font-semibold tracking-[-0.02em]">{currentProject.name}</div>
                <div className="text-xs opacity-60 mt-1">{lightbox.imageIdx + 1} / {allImages.length}</div>
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
