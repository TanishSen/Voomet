'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * ParallaxImage — image moves slower than scroll (parallax depth).
 * Wraps an img inside a clipped container.
 */
export default function ParallaxImage({
  src,
  alt = '',
  className = '',
  speed = 0.15,
  scale = 1.15,
  children,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ scale }}
          loading="lazy"
        />
      </motion.div>
      {children}
    </div>
  )
}
