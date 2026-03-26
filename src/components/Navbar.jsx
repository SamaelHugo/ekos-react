import { Link, NavLink } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

const navLinks = [
  { to: '/catalog', label: 'Catalog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const toggleCart = useCartStore((s) => s.toggleCart)
  const count = useCartStore((s) => s.getCount())

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-heading text-2xl tracking-[0.3em] text-text-primary">
          ÉKOS
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isActive ? 'text-accent' : 'text-text-muted hover:text-text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Cart button */}
        <button
          onClick={toggleCart}
          className="relative text-text-muted hover:text-text-primary transition-colors duration-300 cursor-pointer"
          aria-label="Open cart"
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
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-primary text-[10px] font-body font-semibold rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
