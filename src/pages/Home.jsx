import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

/* ─── Animation helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
})

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <section className="-mt-20 relative w-full h-screen overflow-hidden">
      {/* Fallback image — always rendered behind video */}
      <motion.img
        src="https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        animate={videoFailed ? { scale: [1, 1.08] } : {}}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ maxWidth: '100vw' }}
      />

      {/* Video overlay — on top of fallback */}
      {!videoFailed && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoFailed(true)}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ maxWidth: '100vw' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.h1
          {...fadeUp(0.2)}
          className="font-heading text-7xl md:text-9xl tracking-[12px] uppercase text-white"
        >
          ÉKOS
        </motion.h1>

        <motion.p
          {...fadeUp(0.5)}
          className="font-heading italic text-xl md:text-2xl text-white/80 tracking-wide mt-4"
        >
          Осознанная эстетика
        </motion.p>

        <motion.div {...fadeUp(0.8)}>
          <Link
            to="/catalog"
            className="inline-block mt-10 border border-white/50 bg-transparent text-white px-12 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-accent hover:text-black hover:border-accent transition-all duration-500"
          >Смотреть коллекцию
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(1.2)}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
          Scroll
        </span>
        <motion.span
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px h-8 bg-white/40"
        />
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FEATURED PRODUCTS
   ═══════════════════════════════════════════ */
function FeaturedProducts() {
  const newProducts = products.filter((p) => p.isNew)

  return (
    <section className="w-full py-32">
      <div className="max-w-[1600px] mx-auto px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-4xl md:text-5xl tracking-wide">
          Новинки
        </h2>
        <p className="mt-4 text-[11px] tracking-[0.25em] uppercase text-text-muted">
          Весна — Лето 2026
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View all link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-16"
      >
        <Link
          to="/catalog"
          className="inline-block text-[11px] tracking-[0.2em] uppercase text-text-muted hover:text-accent transition-colors duration-300 border-b border-text-muted/30 hover:border-accent pb-1"
        >
          Смотреть все
        </Link>
      </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   BRAND STORY TEASER
   ═══════════════════════════════════════════ */
function BrandStory() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="w-full bg-secondary overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        {/* Image — 55% */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <img
            src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="ÉKOS brand story"
            className="w-full h-full object-cover aspect-[4/5] lg:aspect-auto"
            loading="lazy"
          />
        </motion.div>

        {/* Text — 45% */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col justify-center px-8 py-32 lg:pl-24 lg:pr-16"
        >
          <div className="max-w-lg">
            <span className="text-accent text-[10px] tracking-[0.3em] uppercase">
              О бренде
            </span>

            <h2 className="font-heading text-3xl md:text-4xl text-text-primary mt-5 leading-tight">
              Одежда, которая говорит тихо
            </h2>

            <p className="text-text-muted text-sm leading-relaxed mt-6">
              ÉKOS — это философия осознанного гардероба. Мы верим, что настоящая
              элегантность не кричит о себе. Каждая вещь создаётся с вниманием к
              деталям, из лучших материалов, чтобы служить годами и становиться
              лучше с каждым днём.
            </p>

            <div className="w-12 h-[2px] bg-accent mt-8" />

            <Link
              to="/about"
              className="inline-block mt-8 text-sm text-text-primary underline underline-offset-4 decoration-white/30 hover:text-accent hover:decoration-accent transition-all duration-300"
            >
              Подробнее &rarr;
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BrandStory />
    </>
  )
}
