'use client'

import Link from 'next/link'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import StickyCTA from '@/components/site/StickyCTA'
import FadeUp from '@/components/site/FadeUp'
import ContactSection from '@/components/site/ContactSection'
import ProjectHighlight from '@/components/site/ProjectHighlight'
import { Toaster } from 'sonner'
import { PROJECT_PORTFOLIO } from '@/lib/voomet-data'

export default function PortfolioPage() {
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
          {/* Dark overlay for readability */}
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

      {/* Project Highlights Section */}
      <ProjectHighlight hideViewAll />

      <ContactSection heading="Like what you see?\nLet&apos;s build yours." />
      <SiteFooter />
      <StickyCTA />
    </main>
  )
}
