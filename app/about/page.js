'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import StickyCTA from '@/components/site/StickyCTA'
import FadeUp from '@/components/site/FadeUp'
import ContactSection from '@/components/site/ContactSection'
import FeatureModal from '@/components/site/FeatureModal'
import { Toaster } from 'sonner'
import { COMPANY, STATS, TECH, WHY_CHOOSE, PROCESS_STEPS, CLIENTS } from '@/lib/voomet-data'

const TEAM_HIGHLIGHTS = [
  {
    src: '/teams/PHOTO-2026-05-29-11-17-45.jpg',
    alt: 'Voomet team standing together in the completed office space',
  },
  {
    src: '/teams/PHOTO-2026-05-29-11-17-46.jpg',
    alt: 'Voomet team group photo inside a newly delivered workspace',
  },
]

export default function AboutPage() {
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
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <SiteNav />

      {/* Hero */}
      <section className="relative h-screen px-4 md:px-8 overflow-hidden">
        <video
          src="/videos/StoryBg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />

        <div className="relative max-w-[1400px] mx-auto pt-28 pb-12 md:pb-16">
          <FadeUp>
            <div className="flex items-center gap-3 text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">About</span>
            </div>
            <h1 className="font-display text-6xl md:text-9xl font-semibold leading-[0.9] tracking-[-0.05em] max-w-5xl text-white">
              Commercial Interiors<br />Built to Perform.
            </h1>
            <p className="mt-24 md:mt-48 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              20+ years of commercial interior expertise.<br />
              {COMPANY.projectsDelivered}+ office projects delivered.<br />
              {COMPANY.sqftCommissioned} sq.ft. designed.<br />
              Turnkey office interiors for MNCs, SMEs, and start-ups across Bangalore.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.07}>
              <div className="font-display text-6xl md:text-8xl font-semibold tracking-[-0.04em] leading-none">
                {s.num}
              </div>
              <div className="mt-3 text-neutral-500 text-sm">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="px-4 md:px-8 py-20 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-3">Precision Through Technology</div>
            <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.03em] max-w-3xl">
              Designed &amp; Built With Precision.
            </h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TECH.map((t, i) => (
              <FadeUp key={t.title} delay={i * 0.08}>
                <motion.button
                  onClick={(e) => handleCardClick(t, e)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-left bg-white/80 rounded-[24px] p-8 h-full border border-neutral-200/70 hover:border-neutral-400 hover:bg-white transition-all duration-300 cursor-pointer group"
                >
                  <div className="font-display text-5xl font-semibold text-neutral-300 mb-4 group-hover:text-neutral-200 transition-colors">0{i + 1}</div>
                  <h4 className="font-display text-2xl font-semibold mb-3 tracking-[-0.02em]">{t.title}</h4>
                  <p className="text-neutral-600 leading-relaxed text-sm group-hover:text-neutral-700 transition-colors">{t.desc}</p>
                  <div className="mt-4 text-xs uppercase tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to explore →
                  </div>
                </motion.button>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-3">Why Choose Voomet?</div>
            <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.03em] max-w-3xl">
              Why Companies Choose Voomet.
            </h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((w, i) => (
              <FadeUp key={w.title} delay={i * 0.07}>
                <div className="rounded-[20px] p-6 h-full border border-neutral-300/60">
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

      {/* Process */}
      <section id="process" className="px-4 md:px-8 py-20 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
              <span>Our Process</span>
              <span className="w-1 h-1 rounded-full bg-neutral-400" />
              <span>Five Steps</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[1] tracking-[-0.03em] max-w-3xl">
              From Brief to Handover. On Time.
            </h2>
          </FadeUp>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((p, i) => (
              <FadeUp key={p.step} delay={i * 0.08}>
                <div className="font-display text-5xl font-semibold text-neutral-900/15">{p.step}</div>
                <h4 className="mt-3 font-semibold text-lg tracking-[-0.01em]">{p.title}</h4>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
                <div className="mt-5 h-px w-full bg-neutral-300/70" />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team highlights */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <span className="w-8 h-px bg-neutral-300" />
              <span className="text-[11px] text-neutral-500 uppercase tracking-[0.35em]">
                Our People
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-neutral-900 mb-6 md:mb-8">
              The Team Behind Every Delivery
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {TEAM_HIGHLIGHTS.map((image, index) => (
              <FadeUp key={image.src} delay={index * 0.08}>
                <figure className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-[280px] md:h-[420px] object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </figure>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] max-w-2xl">
              Trusted by Industry Leaders
            </h2>
          </FadeUp>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {CLIENTS.map((c, i) => (
              <FadeUp key={c.name} delay={i * 0.04}>
                <div className="bg-white/60 rounded-2xl border border-neutral-200/70 h-24 md:h-28 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500">
                  <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Modal */}
      {selectedFeature && (
        <FeatureModal 
          feature={selectedFeature} 
          isOpen={!!selectedFeature} 
          onClose={() => setSelectedFeature(null)}
          position={clickPosition}
        />
      )}

      <ContactSection heading="Let's Design Your\nNext Office." />
      <SiteFooter />
      <StickyCTA />
    </main>
  )
}
