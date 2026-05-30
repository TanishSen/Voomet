'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * CaseStudyScroll Component
 * Horizontal Scroll Section Animation
 * Scrolling vertically causes content to scroll horizontally
 */

function HorizontalScrollSection({ sections, project }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const containerHeight = container.offsetHeight
      
      // Calculate how far into the container we've scrolled
      const scrollStart = -rect.top
      const scrollRange = containerHeight - windowHeight
      
      if (scrollStart <= 0) {
        setScrollProgress(0)
      } else if (scrollStart >= scrollRange) {
        setScrollProgress(1)
      } else {
        setScrollProgress(scrollStart / scrollRange)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate horizontal translation based on scroll progress
  const numSections = sections.length
  const translateX = -scrollProgress * (100 - (100 / numSections))

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: `${numSections * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div 
          ref={trackRef}
          className="flex h-full transition-transform duration-100 ease-out"
          style={{ 
            width: `${numSections * 100}%`,
            transform: `translateX(${translateX}%)` 
          }}
        >
          {sections.map((section, index) => (
            <div 
              key={index}
              className="h-full flex-shrink-0"
              style={{ 
                width: `${100 / numSections}%`,
                backgroundColor: section.bgColor 
              }}
            >
              <div className="w-full h-full flex flex-col lg:flex-row">
                {/* Image Side */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/20 to-transparent" />
                </div>

                {/* Text Side */}
                <div 
                  className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center p-8 lg:p-16"
                  style={{ color: section.textColor }}
                >
                  <div className="max-w-xl">
                    <span className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4 block">
                      {section.label}
                    </span>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                      {section.title}
                    </h2>
                    <p className="text-lg opacity-80 leading-relaxed mb-8">
                      {section.description}
                    </p>
                    {section.stats && (
                      <div className="flex gap-12 pt-6 border-t border-current/20">
                        {section.stats.map((stat, i) => (
                          <div key={i}>
                            <span className="text-3xl font-bold block">{stat.value}</span>
                            <span className="text-sm opacity-60">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-white/60 text-sm font-medium">
            {Math.round(scrollProgress * (numSections - 1)) + 1} / {numSections}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CaseStudyScroll({ project }) {
  // Create sections from project data
  const sections = [
    {
      label: 'The Challenge',
      title: project.challenge?.title || 'Creating a Vision',
      description: project.challenge?.description || `${project.name} approached Voomet with a vision to create a workspace that reflects their brand identity while maximizing functionality for their growing team.`,
      image: project.images?.[0] || project.img,
      bgColor: '#1a1a1a',
      textColor: '#ffffff',
    },
    {
      label: 'The Solution',
      title: project.solution?.title || 'Design Strategy',
      description: project.solution?.description || `Our design team developed a comprehensive approach that integrates modern aesthetics with practical workspace solutions.`,
      image: project.images?.[1] || project.images?.[0] || project.img,
      bgColor: '#f5f5f5',
      textColor: '#1a1a1a',
      stats: [
        { value: project.size || '10,000 sq.ft.', label: 'Total Area' },
        { value: project.duration || '8 weeks', label: 'Completion Time' },
      ]
    },
    {
      label: 'The Result',
      title: project.result?.title || 'A Space Transformed',
      description: project.result?.description || `The completed workspace stands as a testament to thoughtful design and precise execution.`,
      image: project.images?.[2] || project.images?.[1] || project.img,
      bgColor: '#262626',
      textColor: '#ffffff',
    }
  ]

  return (
    <div className="relative">
      {/* Hero Section with Cinematic Zoom Animation */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Ken Burns Effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            scale: { duration: 8, ease: [0.25, 0.1, 0.25, 1] },
            opacity: { duration: 1.5, ease: 'easeOut' }
          }}
        >
          <motion.img
            src={project.img}
            alt={project.name}
            className="w-full h-full object-cover"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              scale: {
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
          />
          {/* Gradient Overlay with Animation */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </motion.div>

        {/* Animated Lines/Decorative Elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
        />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          {/* Category Tag */}
          <motion.span
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            className="text-xs uppercase tracking-[0.3em] text-white/70 block mb-4"
          >
            {project.category || 'Office Interior'}
          </motion.span>
          
          {/* Main Title with Letter Stagger Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 1, 
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6"
          >
            {project.name}
          </motion.h1>
          
          {/* Project Metadata with Stagger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: 'easeOut' }}
            className="flex items-center justify-center gap-8 text-sm text-white/80"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {project.location || 'Bangalore'}
            </motion.span>
            <motion.span 
              className="w-1.5 h-1.5 rounded-full bg-white/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6, type: 'spring' }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              {project.size}
            </motion.span>
            <motion.span 
              className="w-1.5 h-1.5 rounded-full bg-white/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.8, type: 'spring' }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
            >
              {project.category || 'Office Interior'}
            </motion.span>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-12 inset-x-0 flex justify-center px-4"
        >
          <div className="flex flex-col items-center">
            <motion.span 
              className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Scroll to explore
            </motion.span>
            <motion.div
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-white/70 rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.8,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Section */}
      <HorizontalScrollSection sections={sections} project={project} />

      {/* Image Gallery */}
      {project.images && project.images.length > 3 && (
        <div className="py-20 px-4 md:px-8 lg:px-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-8">Project Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.slice(3).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <img
                    src={image}
                    alt={`${project.name} - Image ${index + 4}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-4">
            Ready to transform your workspace?
          </h3>
          <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
            Let's discuss how Voomet can create a space that reflects your brand and empowers your team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#lead-form"
              className="px-8 py-3 bg-neutral-900 text-white rounded-sm hover:bg-neutral-800 transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3 border border-neutral-300 text-neutral-900 rounded-sm hover:bg-neutral-50 transition-colors"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
