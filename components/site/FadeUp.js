'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export default function FadeUp({
  children,
  delay = 0,
  className = '',
  y = 50,
  x = 0,
  scale = 0.97,
  blur = true,
  duration = 0.9,
  once = true,
  direction,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })

  let initX = x
  let initY = y
  if (direction === 'left') { initX = -80; initY = 0 }
  if (direction === 'right') { initX = 80; initY = 0 }
  if (direction === 'up') { initX = 0; initY = 50 }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: initY,
        x: initX,
        scale,
        filter: blur ? 'blur(8px)' : 'blur(0px)',
      }}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }
          : {}
      }
      transition={{ duration, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
