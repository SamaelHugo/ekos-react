import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-primary border-t border-white/10">
      <div className="w-full px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-heading text-2xl tracking-[8px] uppercase text-text-primary hover:text-accent transition-colors duration-300"
            >
              ÉKOS
            </Link>
            <p className="mt-5 text-xs text-text-muted tracking-[0.15em]">
              Осознанная эстетика
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-accent mb-7">
              Навигация
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { to: '/catalog', label: 'Каталог' },
                { to: '/about', label: 'О бренде' },
                { to: '/contact', label: 'Контакты' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-accent mb-7">
              Соцсети
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Telegram', href: '#' },
                { label: 'Instagram', href: '#' },
                { label: 'Pinterest', href: '#' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-text-muted tracking-wide">
            &copy; {new Date().getFullYear()} ÉKOS. Все права защищены.
          </p>
          <a
            href="#"
            className="text-[11px] text-text-muted hover:text-text-primary tracking-wide transition-colors duration-300"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  )
}
