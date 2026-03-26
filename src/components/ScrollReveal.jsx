import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const presets = {
  'fade-up': { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  'fade-down': { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } },
  'fade-left': { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
  'fade-right': { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  'fade': { initial: { opacity: 0 }, animate: { opacity: 1 } },
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })

  const { initial, animate } = presets[variant] || presets['fade-up']

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
