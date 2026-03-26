import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../store/cartStore'

const navLinks = [
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'О бренде' },
  { to: '/contact', label: 'Контакты' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const toggleCart = useCartStore((s) => s.toggleCart)
  const count = useCartStore((s) => s.getCount())

  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const showBg = scrolled || !isHome

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 overflow-x-hidden transition-all duration-500 ${
          showBg
            ? 'bg-primary/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-heading text-2xl tracking-[8px] uppercase text-text-primary hover:text-accent transition-colors duration-300"
          >
            ÉKOS
          </Link>

          {/* Center nav links — desktop */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 pb-1 ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side: cart + hamburger */}
          <div className="flex items-center gap-5">
            {/* Cart button */}
            <button
              onClick={toggleCart}
              className="relative text-text-muted hover:text-text-primary transition-colors duration-300 cursor-pointer"
              aria-label="Открыть корзину"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.4, 1] }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] bg-accent text-primary text-[10px] font-body font-semibold rounded-full flex items-center justify-center px-1"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Открыть меню"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-primary flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end px-6 h-20 items-center">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Закрыть меню"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Centered nav links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `font-heading text-4xl tracking-[0.15em] transition-colors duration-300 ${
                        isActive ? 'text-accent' : 'text-text-primary'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Bottom tagline */}
            <div className="pb-10 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted">
                Осознанная эстетика
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
