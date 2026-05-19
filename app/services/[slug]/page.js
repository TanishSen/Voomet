'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Check, X, Phone, Shield, Award } from 'lucide-react'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import StickyCTA from '@/components/site/StickyCTA'
import FadeUp from '@/components/site/FadeUp'
import ContactSection from '@/components/site/ContactSection'
import ServiceFAQ from '@/components/site/ServiceFAQ'
import { Toaster } from 'sonner'
import {
  SERVICES,
  COMPANY,
  WHY_CHOOSE,
  BULK_PRODUCTS,
  DOOR_MATERIALS,
  COMPARISON,
  FEATURED_PROJECTS,
} from '@/lib/voomet-data'

// Hero Slideshow Component with smooth transitions
function HeroSlideshow({ images, name }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [images])

  if (!images || images.length === 0) return null

  return (
    <div className="relative rounded-[28px] overflow-hidden aspect-[16/8]">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${name} - ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      </AnimatePresence>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Progress indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex 
                  ? 'w-8 bg-white' 
                  : 'w-1.5 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ServicePage({ params }) {
  const service = SERVICES.find((s) => s.slug === params.slug)
  if (!service) return notFound()

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3)
  const isDoors = service.slug === 'doors-manufacturing'
  const isBulk = service.slug === 'bulk-manufacturing'
  const showFeaturedProjects = service.featuredProjects && service.featuredProjects.length > 0
  const hasHeroSlideshow = service.heroImages && service.heroImages.length > 1

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <SiteNav />

      {/* Hero */}
      <section className="pt-28 pb-10 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
              <Link href="/" className="hover:text-neutral-900">Home</Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-neutral-900">Services</Link>
              <span>/</span>
              <span className="text-neutral-900">{service.name}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <h1 className="font-display text-5xl md:text-8xl font-semibold leading-[0.95] tracking-[-0.04em] max-w-4xl">
                {service.name}
              </h1>
              <div className="flex flex-col gap-2 md:items-end">
                <span className="inline-flex w-fit items-center rounded-full bg-neutral-900 text-white px-4 py-2 text-sm">
                  {service.starting}
                </span>
                {isDoors && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
                    <Shield className="h-3.5 w-3.5" /> {COMPANY.warrantyDoor} Warranty
                  </span>
                )}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            {hasHeroSlideshow ? (
              <HeroSlideshow images={service.heroImages} name={service.name} />
            ) : (
              <div className="relative rounded-[28px] overflow-hidden aspect-[16/8]">
                <img src={service.hero} alt={service.name} className="w-full h-full object-cover" />
              </div>
            )}
          </FadeUp>
        </div>
      </section>

      {/* Description */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <FadeUp className="lg:col-span-2">
            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl">
              {service.description}
            </p>
            {service.longDescription && (
              <p className="mt-5 text-neutral-600 leading-relaxed max-w-3xl">
                {service.longDescription}
              </p>
            )}

            <div className="mt-10">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] mb-4">Services We Offer</h3>
              <div className="flex flex-wrap gap-2">
                {service.services.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white/60 px-3 py-1.5 text-sm text-neutral-800">
                    <Check className="h-3.5 w-3.5 text-emerald-600" /> {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] mb-4">Products We Manufacture</h3>
              <div className="flex flex-wrap gap-2">
                {service.products.map((p) => (
                  <span key={p} className="inline-flex items-center rounded-full bg-neutral-900 text-white px-3 py-1.5 text-sm">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-1">
            <div className="sticky top-28 bg-neutral-900 text-white rounded-[24px] p-8">
              <h4 className="font-display text-2xl font-semibold mb-3 tracking-[-0.02em]">Get a free quote</h4>
              <p className="text-white/70 text-sm mb-6">
                Tell us about your space. Our team will respond within one business day.
              </p>
              <Link href="/#contact" className="flex items-center justify-between gap-2 bg-white text-neutral-900 rounded-full px-5 py-3 text-sm font-medium hover:bg-neutral-100 mb-3">
                Book Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${COMPANY.phoneDigits}`} className="flex items-center justify-between gap-2 border border-white/20 rounded-full px-5 py-3 text-sm hover:bg-white/10">
                <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> {COMPANY.phone}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              {isDoors && (
                <a href={`tel:${COMPANY.phoneSecondaryDigits}`} className="mt-2 flex items-center justify-between gap-2 border border-white/20 rounded-full px-5 py-3 text-sm hover:bg-white/10">
                  <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> {COMPANY.phoneSecondary}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
              <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/70 space-y-2">
                <p>✓ {COMPANY.yearsExperience}+ years of expertise</p>
                <p>✓ {COMPANY.projectsDelivered}+ projects delivered</p>
                <p>✓ In-house manpower & factory</p>
                <p>✓ On-time handover, guaranteed</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Featured Projects (Office / Commercial / Educational) */}
      {showFeaturedProjects && (
        <section className="px-4 md:px-8 py-16 bg-neutral-50">
          <div className="max-w-[1400px] mx-auto">
            <FadeUp>
              <div className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-3">Featured Projects</div>
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-10">
                Recently delivered.
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_PROJECTS.filter((p) => service.featuredProjects.some((fp) => fp.includes(p.name))).map((p, i) => (
                <FadeUp key={p.name} delay={i * 0.06}>
                  <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] group">
                    <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{p.name}</h3>
                      <div className="text-sm text-white/80 mt-1">{p.size} · {p.location}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Door Materials (only doors) */}
      {isDoors && (
        <section className="px-4 md:px-8 py-20 bg-neutral-50">
          <div className="max-w-[1400px] mx-auto">
            <FadeUp>
              <div className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-3">Materials</div>
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-12 max-w-3xl">
                Our door materials.
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DOOR_MATERIALS.map((m, i) => (
                <FadeUp key={m.name} delay={i * 0.07}>
                  <div className="bg-white/80 rounded-[24px] p-7 h-full border border-neutral-200/70">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{m.name}</h3>
                        <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1"><Award className="h-3 w-3" /> {m.range} by Voomet</div>
                      </div>
                      <span className="text-sm font-semibold bg-neutral-900 text-white rounded-full px-3 py-1">{m.price}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">{m.desc}</p>
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-neutral-700 mb-2">ADVANTAGES</div>
                      <ul className="text-sm space-y-1.5">
                        {m.advantages.map((a) => (
                          <li key={a} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 mt-1 text-emerald-600 shrink-0" /> {a}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-700 mb-2">IDEAL FOR</div>
                      <div className="flex flex-wrap gap-1.5">
                        {m.idealFor.map((i) => (
                          <span key={i} className="text-xs rounded-full border border-neutral-300 px-2 py-1">{i}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Voomet vs Local comparison (only doors) */}
      {isDoors && (
        <section className="px-4 md:px-8 py-20">
          <div className="max-w-[1400px] mx-auto">
            <FadeUp>
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-12 max-w-4xl">
                Why customers pick Voomet over local manufacturers.
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COMPARISON.map((c, i) => (
                <FadeUp key={i} delay={i * 0.04}>
                  <div className="grid grid-cols-2 gap-4 bg-white/60 rounded-[20px] border border-neutral-200/70 p-5">
                    <div>
                      <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm mb-2"><X className="h-4 w-4" /> Local Manufacturer</div>
                      <div className="font-semibold text-sm mb-1">{c.local.title}</div>
                      <div className="text-xs text-neutral-600 leading-relaxed">{c.local.desc}</div>
                    </div>
                    <div className="border-l border-neutral-300 pl-4">
                      <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-2"><Check className="h-4 w-4" /> Voomet</div>
                      <div className="font-semibold text-sm mb-1">{c.voomet.title}</div>
                      <div className="text-xs text-neutral-600 leading-relaxed">{c.voomet.desc}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bulk Furniture Catalog (only bulk) */}
      {isBulk && (
        <section className="px-4 md:px-8 py-20 bg-neutral-50">
          <div className="max-w-[1400px] mx-auto">
            <FadeUp>
              <div className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-3">Catalogue</div>
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-12 max-w-3xl">
                Get custom-made furniture.
              </h2>
            </FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {BULK_PRODUCTS.map((p, i) => (
                <FadeUp key={p.name} delay={i * 0.03}>
                  <div className="bg-white/80 rounded-[18px] overflow-hidden border border-neutral-200/70 hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] bg-neutral-200 overflow-hidden">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{p.cat}</div>
                      <div className="font-display font-semibold text-base tracking-[-0.01em] leading-tight">{p.name}</div>
                      <div className="text-sm text-neutral-700 mt-1">Starting {p.price}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process (per-service if available, else fallback) */}
      {service.process && service.process.length > 0 && (
        <section className="px-4 md:px-8 py-20">
          <div className="max-w-[1400px] mx-auto">
            <FadeUp>
              <div className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-3">Work Stages</div>
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-12 max-w-3xl">
                Our {service.name.toLowerCase()} process.
              </h2>
            </FadeUp>
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min(service.process.length, 5)} gap-6`}>
              {service.process.map((p, i) => (
                <FadeUp key={p.title} delay={i * 0.07}>
                  <div className="font-display text-5xl font-semibold text-neutral-900/15">{String(i + 1).padStart(2, '0')}</div>
                  <h4 className="mt-3 font-semibold text-lg tracking-[-0.01em]">{p.title}</h4>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
                  <div className="mt-5 h-px w-full bg-neutral-300/70" />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {service.gallery?.length > 0 && (
        <section className="px-4 md:px-8 py-12 bg-neutral-50">
          <div className="max-w-[1400px] mx-auto">
            <FadeUp>
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-10">
                Selected work.
              </h2>
            </FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {service.gallery.map((img, i) => (
                <FadeUp key={i} delay={i * 0.04} className={`relative rounded-[20px] overflow-hidden ${i % 5 === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-[4/3]'} group`}>
                  <img src={img} alt={`${service.name} work ${i + 1}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </FadeUp>
              ))}
            </div>
            <FadeUp className="mt-10">
              <Link href="/portfolio" className="inline-flex items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-700 rounded-full px-6 py-3 text-sm transition-all hover:gap-3">
                See full portfolio <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeUp>
          </div>
        </section>
      )}

      {/* Why Voomet */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-3">Why Choose Voomet</div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-12 max-w-3xl">
              Every opportunity is about commitment.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((w, i) => (
              <FadeUp key={w.title} delay={i * 0.07}>
                <div className="bg-white/60 rounded-[20px] p-6 h-full border border-neutral-200/70">
                  <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center mb-4 text-sm font-semibold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-display text-xl font-semibold mb-2 tracking-[-0.02em]">{w.title}</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">{w.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Service-specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="px-4 md:px-8 py-20 bg-neutral-50">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-3">Have Any Questions</div>
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-10">
                Frequently asked.
              </h2>
            </FadeUp>
            <ServiceFAQ faqs={service.faqs} />
          </div>
        </section>
      )}

      {/* Related services */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] mb-10">
              You may also need.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r, i) => (
              <FadeUp key={r.slug} delay={i * 0.07}>
                <Link href={`/services/${r.slug}`} className="block group relative rounded-[24px] overflow-hidden aspect-[4/3]">
                  <img src={r.hero} alt={r.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-0 p-6 flex items-end justify-between text-white">
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{r.name}</h3>
                    <span className="bg-white text-neutral-900 rounded-full p-2.5 group-hover:rotate-45 transition-transform duration-500">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <ContactSection defaultRequirement={service.name} heading={`Ready to start\nyour project?`} />
      <SiteFooter />
      <StickyCTA />
    </main>
  )
}
