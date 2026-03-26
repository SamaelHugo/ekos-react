import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import PageTransition from '../components/PageTransition'

/* ─── Values data ─── */
const values = [
  {
    num: '01',
    title: 'Качество',
    text: 'Натуральные ткани, проверенные поставщики, контроль на каждом этапе.',
  },
  {
    num: '02',
    title: 'Простота',
    text: 'Минимум деталей, максимум смысла. Каждая вещь работает в любом образе.',
  },
  {
    num: '03',
    title: 'Ответственность',
    text: 'Честное производство, справедливые условия, минимум отходов.',
  },
]

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function AboutHero() {
  return (
    <section className="-mt-20 relative w-full h-[60vh] overflow-hidden">
      <img
        src="https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="ÉKOS about"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-6xl text-white tracking-wide"
        >
          О бренде
        </motion.h1>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   STORY
   ═══════════════════════════════════════════ */
function Story() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32">
      <div className="max-w-4xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="overflow-hidden"
        >
          <img
            src="https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="ÉKOS story"
            className="w-full aspect-[3/4] object-cover"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl leading-tight">
            Мы верим в осознанный выбор
          </h2>
          <p className="text-sm text-text-muted leading-relaxed mt-6">
            ÉKOS родился из убеждения, что гардероб — это не про количество.
            Это про вещи, к которым хочется возвращаться. Мы создаём одежду,
            которая живёт дольше сезона и становится частью вашей истории.
          </p>
          <p className="text-sm text-text-muted leading-relaxed mt-4">
            Каждая коллекция — это диалог между мастерством и сдержанностью.
            Мы работаем с небольшими ателье в Европе, используем ткани, которые
            стареют красиво, и верим, что настоящая роскошь — это когда не нужно
            ничего доказывать.
          </p>
          <div className="w-12 h-[2px] bg-accent mt-8" />
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   VALUES
   ═══════════════════════════════════════════ */
function Values() {
  return (
    <section className="w-full bg-secondary py-32">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl text-center tracking-wide mb-16"
        >
          Наши принципы
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-card p-8 border border-white/5"
            >
              <span className="font-heading text-5xl text-accent/10">
                {v.num}
              </span>
              <h3 className="text-lg text-text-primary mt-4">{v.title}</h3>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════ */
function CTA() {
  return (
    <section className="py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl tracking-wide">
          Готовы обновить гардероб?
        </h2>
        <Link
          to="/catalog"
          className="inline-block mt-10 border border-white/50 bg-transparent text-white px-12 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-accent hover:text-black hover:border-accent transition-all duration-500"
        >
          Смотреть коллекцию
        </Link>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════ */
export default function About() {
  return (
    <PageTransition>
      <AboutHero />
      <Story />
      <Values />
      <CTA />
    </PageTransition>
  )
}
