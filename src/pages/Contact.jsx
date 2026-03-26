import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <PageTransition>
    <div className="min-h-screen pb-32" style={{ paddingTop: '160px' }}>
      <div className="max-w-xl mx-auto px-8 text-center">
        <motion.h1
          {...fadeUp(0)}
          className="font-heading text-4xl md:text-5xl tracking-wide"
        >
          Связаться с нами
        </motion.h1>
        <motion.p
          {...fadeUp(0.15)}
          className="mt-4 text-sm text-text-muted"
        >
          Вопросы по наличию, размерам или коллаборациям
        </motion.p>

        {!submitted ? (
          <motion.form
            {...fadeUp(0.3)}
            onSubmit={handleSubmit}
            className="mt-12 text-left space-y-8"
          >
            <div>
              <label className="text-[11px] uppercase tracking-[0.2em] text-text-muted">
                Имя
              </label>
              <input
                type="text"
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-text-primary text-sm placeholder:text-text-muted/40 focus:border-accent focus:outline-none transition-colors"
                placeholder="Ваше имя"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[0.2em] text-text-muted">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-text-primary text-sm placeholder:text-text-muted/40 focus:border-accent focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[0.2em] text-text-muted">
                Сообщение
              </label>
              <textarea
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-text-primary text-sm placeholder:text-text-muted/40 focus:border-accent focus:outline-none transition-colors h-32 resize-none"
                placeholder="Ваше сообщение..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-body font-medium hover:bg-accent transition-all duration-300 cursor-pointer"
            >
              Отправить
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <span className="text-accent text-4xl">✓</span>
            <p className="font-heading text-2xl mt-6">Спасибо!</p>
            <p className="text-sm text-text-muted mt-3">
              Мы свяжемся с вами в течение 24 часов.
            </p>
          </motion.div>
        )}
      </div>
    </div>
    </PageTransition>
  )
}
