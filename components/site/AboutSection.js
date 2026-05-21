'use client'

import Link from 'next/link'
import { ArrowRight, Zap, ShieldCheck, MapPin } from 'lucide-react'
import FadeUp from '@/components/site/FadeUp'

const COMMITMENTS = [
  { icon: Zap,         title: '6-Week Delivery',    desc: 'Every project, on time — monitored with software at every stage.' },
  { icon: ShieldCheck, title: 'Zero Outsourcing',   desc: 'Our in-house factory with German machines handles everything from cut to install.' },
  { icon: MapPin,      title: 'Based in Bangalore', desc: 'Serving businesses across India from our Doddaballapura facility.' },
]

export default function AboutSection() {
  return (
    <section id="about" className="px-4 md:px-8 py-20 md:py-32 bg-white border-y border-neutral-200/70">
      <div className="max-w-[1400px] mx-auto">

        {/* Label */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-neutral-900" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">About Voomet</span>
          </div>
        </FadeUp>

        {/* Heading + body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 md:mb-20">
          <FadeUp>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95]">
              Premium office interiors for <span className="italic font-light">companies that mean business.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1} className="flex flex-col gap-5 justify-center">
            <p className="text-neutral-600 leading-relaxed text-base md:text-lg text-editorial">
              Based in Bangalore. Trusted across India. For over two decades, we have been transforming workspaces
              for MNCs, SMEs, and start-ups into offices that attract talent and accelerate growth.
            </p>
            <p className="text-neutral-500 leading-relaxed text-base md:text-lg text-editorial">
              We design. We manufacture. We install — everything under one roof with in-house craftsmen,
              imported German machinery, and software-tracked timelines. Names like Physics Wallah, Zluri, Juego, Nordson, and Apps for Bharat trust us with their most important spaces.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-3 bg-neutral-900 hover:bg-neutral-700 text-white rounded-full px-6 py-3 text-sm transition-all hover:gap-3 w-fit"
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>
        </div>

        {/* Commitment cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMITMENTS.map((c, i) => {
            const Icon = c.icon
            return (
              <FadeUp key={c.title} delay={i * 0.08}>
                <div className="bg-white rounded-[24px] p-8 h-full border border-neutral-200/80 hover:border-neutral-300 hover:shadow-xl transition-all duration-700 group">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-950 text-white flex items-center justify-center group-hover:bg-neutral-800 group-hover:border-neutral-700 transition-all duration-500">
                      <Icon className="w-5 h-5 stroke-[1.9]" />
                    </div>
                    <div className="h-px w-10 bg-neutral-700 group-hover:w-14 transition-all duration-500" />
                  </div>
                  <h4 className="font-display text-xl font-semibold tracking-[-0.02em] mb-3">{c.title}</h4>
                  <p className="text-neutral-600 text-sm md:text-base leading-relaxed">{c.desc}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>

      </div>
    </section>
  )
}
