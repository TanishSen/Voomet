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
    <section id="about" className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 lg:px-20 py-20 md:py-28">

        {/* Label */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-px bg-neutral-400" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">About Voomet</span>
          </div>
        </FadeUp>

        {/* Heading + body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[0.95]">
              Premium office interiors for companies that mean business.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1} className="flex flex-col gap-5 justify-center">
            <p className="text-neutral-600 leading-relaxed text-[15px]">
              Based in Bangalore. Trusted across India. For over two decades, we have been transforming workspaces
              for MNCs, SMEs, and start-ups into offices that attract talent and accelerate growth.
            </p>
            <p className="text-neutral-500 leading-relaxed text-[15px]">
              We design. We manufacture. We install — everything under one roof with in-house craftsmen,
              imported German machinery, and software-tracked timelines. 250+ office projects delivered for names
              like Physics Wallah, Zluri, Juego, Nordson, and Apps for Bharat.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-neutral-900 border border-neutral-300 rounded-full px-5 py-2.5 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 w-fit mt-2"
            >
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </FadeUp>
        </div>

        {/* Commitment cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 border border-neutral-200 rounded-2xl overflow-hidden">
          {COMMITMENTS.map((c, i) => {
            const Icon = c.icon
            return (
              <FadeUp key={c.title} delay={i * 0.08}>
                <div className="p-7 md:p-8">
                  <Icon className="w-4 h-4 text-neutral-400 mb-4" />
                  <h4 className="font-display text-base font-semibold tracking-tight mb-1.5">{c.title}</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>

      </div>
    </section>
  )
}
