'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/**
 * TextReveal — words slide up from behind a clip-mask, like GSAP SplitText.
 * Wrap any heading text:
 *   <TextReveal>Modern Style Timeless Charm</TextReveal>
 */
export default function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.04,
  duration = 0.8,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const text = typeof children === 'string' ? children : ''

  if (!text) {
    // Fallback for non-string children — just do a simple fade
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease, delay }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotateX: -80 }}
            animate={inView ? { y: '0%', rotateX: 0 } : {}}
            transition={{
              duration,
              ease,
              delay: delay + i * stagger,
            }}
            style={{ transformOrigin: 'bottom', perspective: 600 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  )
}
