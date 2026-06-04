'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, MessageCircle, Phone } from 'lucide-react'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import StickyCTA from '@/components/site/StickyCTA'
import FadeUp from '@/components/site/FadeUp'
import { COMPANY } from '@/lib/voomet-data'

export default function ThankYouPage() {
  // Fire GTM conversion event on page load
  useEffect(() => {
    // Initialize dataLayer if not exists
    window.dataLayer = window.dataLayer || []
    
    // Push conversion event
    window.dataLayer.push({
      event: 'form_submission',
      conversion_type: 'lead',
      page_type: 'thank_you',
      timestamp: new Date().toISOString(),
    })
    
    // Also fire GA4 event directly if gtag exists
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'conversion',
        event_label: 'contact_form',
        value: 1,
      })
    }
    
    console.log('[Voomet] Conversion event fired:', window.dataLayer)
  }, [])

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden">
      <SiteNav />
      <section className="pt-40 pb-24 px-4 md:px-8">
        <div className="max-w-[900px] mx-auto text-center">
          <FadeUp>
            <div className="inline-flex w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 items-center justify-center mb-6">
              <Check className="h-8 w-8" />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-5xl md:text-8xl font-semibold leading-[0.95] tracking-[-0.04em]">
              Request received.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 text-lg md:text-xl text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              Thank you for reaching out to Voomet. A senior consultant will call you
              within one business day to discuss your space, budget and timeline.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 py-3.5 text-sm font-medium"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us now
              </a>
              <a
                href={`tel:${COMPANY.phoneDigits}`}
                className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-700 text-white rounded-full px-6 py-3.5 text-sm font-medium"
              >
                <Phone className="h-4 w-4" /> Call {COMPANY.phone}
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <Link
                href="/portfolio"
                className="group rounded-[20px] border border-neutral-300/60 p-6 hover:bg-white/60 transition-all"
              >
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">While you wait</div>
                <div className="font-display text-2xl font-semibold tracking-[-0.02em] mb-2">
                  Browse our portfolio
                </div>
                <span className="text-sm inline-flex items-center gap-1 text-neutral-700 group-hover:gap-2 transition-all">
                  See work <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/about"
                className="group rounded-[20px] border border-neutral-300/60 p-6 hover:bg-white/60 transition-all"
              >
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Get to know us</div>
                <div className="font-display text-2xl font-semibold tracking-[-0.02em] mb-2">
                  Our story
                </div>
                <span className="text-sm inline-flex items-center gap-1 text-neutral-700 group-hover:gap-2 transition-all">
                  Read <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/"
                className="group rounded-[20px] border border-neutral-300/60 p-6 hover:bg-white/60 transition-all"
              >
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Explore</div>
                <div className="font-display text-2xl font-semibold tracking-[-0.02em] mb-2">
                  Back to home
                </div>
                <span className="text-sm inline-flex items-center gap-1 text-neutral-700 group-hover:gap-2 transition-all">
                  Voomet.com <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
      <SiteFooter />
      <StickyCTA />
    </main>
  )
}
