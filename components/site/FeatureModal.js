'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function FeatureModal({ feature, isOpen, onClose, position }) {
  const [selectedBenefit, setSelectedBenefit] = useState(0)

  if (!feature) return null

  // Determine modal position (left or right)
  const isOnRightSide = position?.x ? position.x > window.innerWidth / 2 : false

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Also acts as centering container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[900px] h-auto max-h-[85vh] bg-neutral-950 rounded-3xl border border-white/10 overflow-hidden relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10 group"
              >
                <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5 text-white group-hover:text-white/80" />
                </motion.div>
              </button>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 h-full max-h-[85vh]">
                {/* Image section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="hidden md:block relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>

                {/* Text section - Scrollable */}
                <div className="overflow-y-auto max-h-[85vh] md:max-h-none">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 md:p-8 flex flex-col"
                  >
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-white/20 to-white/5 rounded-full border border-white/10 w-fit"
                    >
                      <span className="text-xs uppercase tracking-widest text-white/60">Feature Details</span>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
                    >
                      {feature.title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white/75 text-sm leading-relaxed mb-6"
                    >
                      {feature.fullDesc}
                    </motion.p>

                    {/* Benefits list */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="space-y-2"
                    >
                      <p className="text-xs uppercase tracking-widest text-white/40 mb-3 font-semibold">Key Benefits</p>
                      {feature.benefits && feature.benefits.map((benefit, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => setSelectedBenefit(idx)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.08 }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-lg transition-all duration-300 ${
                            selectedBenefit === idx
                              ? 'bg-white/15 border border-white/30'
                              : 'hover:bg-white/5 border border-white/0'
                          }`}
                        >
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors ${
                            selectedBenefit === idx ? 'text-white/90' : 'text-white/50'
                          }`} />
                          <span className={`text-sm text-left ${
                            selectedBenefit === idx ? 'text-white/90' : 'text-white/60'
                          }`}>{benefit}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Mobile image - shown above text on mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="md:hidden absolute top-0 left-0 right-0 h-40 overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 border-b border-white/10"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
