'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { HIGHLIGHTED_PROJECTS } from '@/lib/voomet-data'
import FadeUp from '@/components/site/FadeUp'

// Label positions for visual variety (matching the reference design)
const labelPositions = [
  'bottom-left',   // card 1
  'bottom-center', // card 2
  'center',        // card 3
  'top-right',     // card 4
  'bottom-left',   // card 5
  'top-center',    // card 6
  'bottom-center', // card 7
  'top-right',     // card 8
]

function getPositionClasses(position) {
  switch (position) {
    case 'top-left':
      return 'top-4 left-4'
    case 'top-center':
      return 'top-4 left-1/2 -translate-x-1/2'
    case 'top-right':
      return 'top-4 right-4'
    case 'center':
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    case 'bottom-left':
      return 'bottom-4 left-4'
    case 'bottom-center':
      return 'bottom-4 left-1/2 -translate-x-1/2'
    case 'bottom-right':
      return 'bottom-4 right-4'
    default:
      return 'bottom-4 left-4'
  }
}

function ProjectCard({ project, index }) {
  const position = labelPositions[index % labelPositions.length]
  const positionClasses = getPositionClasses(position)

  return (
    <Link href={`/case-study/${project.id}`}>
      <motion.div
        className="relative aspect-[4/3] overflow-hidden rounded-sm group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Image */}
        <img
          src={project.img}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Label with border frame */}
        <div className={`absolute ${positionClasses} z-10`}>
          <div className="relative bg-white px-5 py-3 min-w-[120px]">
            {/* Corner frame lines */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-neutral-400" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-neutral-400" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-neutral-400" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-neutral-400" />

            {/* Content */}
            <h4 className="font-semibold text-xs uppercase tracking-[0.15em] text-neutral-900 text-center">
              {project.name}
            </h4>
            <p className="text-[11px] text-neutral-500 text-center mt-0.5">
              {project.location}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default function ProjectHighlight({ hideViewAll = false }) {
  return (
    <section id="portfolio" className="px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <FadeUp>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-neutral-900" />
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">Selected Work</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em]">
              Project <span className="italic font-light">Highlights</span>
            </h2>
          </div>
        </FadeUp>

        {/* Projects Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {HIGHLIGHTED_PROJECTS.slice(0, 8).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </FadeUp>

        {/* View All Link */}
        {!hideViewAll && (
          <FadeUp delay={0.2}>
            <div className="mt-12 text-center">
              <Link 
                href="/portfolio" 
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors group"
              >
                View All Projects
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
