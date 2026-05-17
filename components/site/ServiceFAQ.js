'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function ServiceFAQ({ faqs }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-neutral-300">
      {faqs.map((f, i) => (
        <div key={i} className="py-5">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full text-left flex items-start justify-between gap-6"
          >
            <span className="font-display text-lg md:text-2xl font-semibold tracking-[-0.01em]">{f.q}</span>
            <span className={`text-2xl transition-transform duration-500 ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden"
              >
                <p className="pt-3 text-neutral-600 max-w-3xl leading-relaxed">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
