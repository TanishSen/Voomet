'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Maximize2, Check, Phone, ArrowRight } from 'lucide-react'
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

      {/* Hero with Video Background */}
      <section className="relative min-h-screen flex flex-col justify-end px-4 md:px-8 pb-16 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/Selectedworks.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for readability - like home hero */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <FadeUp>
            <div className="flex items-center gap-3 text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Works</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h1 className="font-display text-6xl md:text-9xl font-semibold leading-[0.9] tracking-[-0.05em] text-white">
                Selected<br />work.
              </h1>
              <p className="text-white/80 max-w-md text-sm md:text-base">
                A curated look at Voomet&apos;s completed office interiors
                across Bangalore and beyond. Each project tells a story.
              </p>
            </div>
          </FadeUp>

          {/* Stats Bar */}
          <FadeUp delay={0.15} className="mt-16">
            <div className="flex flex-wrap gap-8 md:gap-16 py-6 border-y border-white/20">
              <div>
                <div className="font-display text-4xl font-semibold tracking-tight text-white">{PROJECT_PORTFOLIO.length}</div>
                <div className="text-sm text-white/60 mt-1">Featured Projects</div>
              </div>
              <div>
                <div className="font-display text-4xl font-semibold tracking-tight text-white">
                  {PROJECT_PORTFOLIO.reduce((acc, p) => acc + parseInt(p.size.replace(/[^0-9]/g, '')) || 0, 0).toLocaleString()}+
                </div>
                <div className="text-sm text-white/60 mt-1">Sq.ft. Delivered</div>
              </div>
              <div>
                <div className="font-display text-4xl font-semibold tracking-tight text-white">
                  {new Set(PROJECT_PORTFOLIO.map(p => p.client)).size}
                </div>
                <div className="text-sm text-white/60 mt-1">Unique Clients</div>
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
            id={project.id}
            className={`py-16 md:py-24 px-4 md:px-8 scroll-mt-20 ${isEven ? 'bg-white' : 'bg-neutral-50'}`}
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

      {/* Services & Products Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Services & Products - 2 columns */}
              <div className="lg:col-span-2 space-y-12">
                {/* Services We Offer */}
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-8">
                    Services We Offer
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Turnkey Interiors',
                      'Electricals',
                      'Networking',
                      'Upholstery',
                      'Plumbing',
                      'Carpentry',
                      'Customized Furniture',
                      'Painting & Finishing',
                      'HVAC Installations',
                      'Landscape Design',
                      'Space Planning',
                      'Acoustic Solutions',
                      'Fire Safety Systems',
                      'Access Control',
                      'End-to-End Project Management',
                    ].map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 py-2.5 px-3 rounded-lg bg-white border border-neutral-200 text-sm text-neutral-700"
                      >
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Products We Manufacture */}
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-8">
                    Products We Manufacture
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Workstations',
                      'Storage Solutions',
                      'Office Seating',
                      'Pantry Furniture',
                      'Meeting Room Furniture',
                      'Reception Desks',
                      'Cable Management Systems',
                      'Glass Partition Systems',
                    ].map((product, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 py-2.5 px-3 rounded-lg bg-white border border-neutral-200 text-sm text-neutral-700"
                      >
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>{product}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 bg-neutral-900 text-white rounded-2xl p-8">
                  <h3 className="font-display text-2xl font-semibold mb-4">Get a free quote</h3>
                  <p className="text-neutral-400 text-sm mb-6">
                    Ready to transform your workspace? Let&apos;s discuss your project.
                  </p>
                  
                  <a
                    href="https://cal.com/voomet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-white text-neutral-900 font-medium hover:bg-neutral-100 transition-colors mb-4"
                  >
                    Book Consultation
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  
                  <a
                    href="tel:+917358888689"
                    className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full border border-neutral-700 text-white font-medium hover:bg-neutral-800 transition-colors mb-8"
                  >
                    <Phone className="h-4 w-4" />
                    +91 73588 88689
                  </a>

                  <div className="space-y-3 pt-6 border-t border-neutral-800">
                    {[
                      { value: '20+', label: 'Years Experience' },
                      { value: '300+', label: 'Projects Delivered' },
                      { value: '25L+', label: 'Sq.ft. Designed' },
                    ].map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-neutral-300 text-sm">
                          <span className="text-white font-semibold">{stat.value}</span> {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <ContactSection heading="Like what you see?\nLet&apos;s build yours." />
      <SiteFooter />
      <StickyCTA />
    </main>
  )
}
