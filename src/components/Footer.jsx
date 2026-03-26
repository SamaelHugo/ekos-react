import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl tracking-[0.3em] text-text-primary mb-4">
              ÉKOS
            </h3>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Refined essentials for the modern wardrobe. Designed with intention, crafted without compromise.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-text-muted mb-6">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { to: '/catalog', label: 'Catalog' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-text-muted hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-text-muted mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-text-muted">
              <span>hello@ekos.fashion</span>
              <span>+1 (212) 555-0190</span>
              <span>New York, NY</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} ÉKOS. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Portfolio project &mdash; not a real brand.
          </p>
        </div>
      </div>
    </footer>
  )
}
