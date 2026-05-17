import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import StickyCTA from '@/components/site/StickyCTA'
import FadeUp from '@/components/site/FadeUp'
import ContactSection from '@/components/site/ContactSection'
import { Toaster } from 'sonner'
import { FOUNDER, COMPANY, STATS, TECH, WHY_CHOOSE, PROCESS_STEPS, CLIENTS } from '@/lib/voomet-data'

export const metadata = {
  title: 'About Voomet & Founder Vispi Khursetjee — 20+ Years of Interior Design',
  description: 'Vispi Khursetjee founded Voomet over 20 years ago with one promise: be the most committed interior design partner in Bangalore. Read his story.',
}

export default function AboutPage() {
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
              <span className="text-neutral-900">About</span>
            </div>
            <h1 className="font-display text-6xl md:text-9xl font-semibold leading-[0.9] tracking-[-0.05em] max-w-5xl">
              The studio<br />behind Voomet.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-neutral-700 max-w-2xl leading-relaxed">
              Two decades. {COMPANY.projectsDelivered}+ projects. {COMPANY.sqftCommissioned} sq.ft. delivered. One unwavering
              promise from our founder: be the most committed interior design partner
              in Bangalore. Not the biggest — the most committed.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Founder section */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <FadeUp className="relative rounded-[28px] overflow-hidden aspect-[4/5] bg-neutral-200">
            <img
              src={FOUNDER.image}
              alt={FOUNDER.name}
              className="w-full h-full object-cover"
            />
          </FadeUp>
          <FadeUp delay={0.1} className="lg:pl-8">
            <div className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-3">About the Founder</div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.03em]">
              I have invested my life into my passion.
            </h2>
            <blockquote className="mt-6 text-2xl md:text-3xl font-display font-medium italic text-neutral-800 leading-snug">
              &ldquo;{COMPANY.promise}&rdquo;
            </blockquote>
            <p className="mt-6 text-neutral-700 leading-relaxed max-w-xl">
              {FOUNDER.bio}
            </p>
            <img
              src={FOUNDER.signature}
              alt={`${FOUNDER.name} signature`}
              className="mt-6 h-12 w-auto"
            />
            <div className="mt-2 text-sm text-neutral-600">
              <strong>{FOUNDER.name}</strong>
              <span className="mx-2">·</span>
              {FOUNDER.title}
            </div>
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
            <div className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-3">Our Strength</div>
            <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.03em] max-w-3xl">
              Technology that powers us.
            </h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TECH.map((t, i) => (
              <FadeUp key={t.title} delay={i * 0.08}>
                <div className="bg-white/80 rounded-[24px] p-8 h-full border border-neutral-200/70">
                  <div className="font-display text-5xl font-semibold text-neutral-300 mb-4">0{i + 1}</div>
                  <h4 className="font-display text-2xl font-semibold mb-3 tracking-[-0.02em]">{t.title}</h4>
                  <p className="text-neutral-600 leading-relaxed text-sm">{t.desc}</p>
                </div>
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
              Every opportunity is about commitment.
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
              From first sketch to final handover.
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

      {/* Clients */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] max-w-3xl">
              Trusted by leading brands.
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

      <ContactSection heading="Work with the most\ncommitted team." />
      <SiteFooter />
      <StickyCTA />
    </main>
  )
}
