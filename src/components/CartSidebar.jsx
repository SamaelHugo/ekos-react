import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'

export default function CartSidebar() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const getTotal = useCartStore((s) => s.getTotal)
  const count = useCartStore((s) => s.getCount())

  // Lock body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 h-screen w-full md:w-[420px] bg-primary z-50 flex flex-col border-l border-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 h-20 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="font-heading text-2xl tracking-[0.1em]">Корзина</h2>
                <span className="text-sm text-text-muted">({count})</span>
              </div>
              <button
                onClick={closeCart}
                className="text-text-muted hover:text-text-primary transition-colors duration-300 cursor-pointer p-1"
                aria-label="Закрыть корзину"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items or empty state */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted/40">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-text-muted text-sm">Корзина пуста</p>
                  <Link
                    to="/catalog"
                    onClick={closeCart}
                    className="text-xs tracking-[0.2em] uppercase text-accent hover:text-text-primary transition-colors duration-300"
                  >
                    Перейти в каталог
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-white/5">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-5 px-8 py-6">
                      {/* Product image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-[100px] object-cover bg-card shrink-0"
                        loading="lazy"
                      />

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <p className="text-sm uppercase tracking-wide leading-tight truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-text-muted mt-1.5">
                            Размер: {item.size}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity controls */}
                          <div className="flex items-center border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors text-xs cursor-pointer"
                              aria-label="Уменьшить"
                            >
                              &minus;
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-xs border-x border-white/10">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors text-xs cursor-pointer"
                              aria-label="Увеличить"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <p className="text-sm text-accent">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-text-muted/40 hover:text-text-primary self-start mt-0.5 transition-colors duration-300 cursor-pointer p-1"
                        aria-label={`Удалить ${item.name}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky footer */}
            {items.length > 0 && (
              <div className="shrink-0 border-t border-white/5 px-8 py-7">
                {/* Total */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted">
                    Итого
                  </span>
                  <span className="font-heading text-xl">
                    {getTotal().toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                <p className="text-[11px] text-text-muted mb-6">
                  Доставка рассчитывается при оформлении
                </p>

                {/* Checkout button */}
                <button className="w-full py-4 border border-white text-text-primary text-[11px] tracking-[0.2em] uppercase font-body hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 cursor-pointer">
                  Оформить заказ
                </button>

                {/* Continue shopping */}
                <button
                  onClick={closeCart}
                  className="w-full mt-4 py-3 text-[11px] tracking-[0.15em] uppercase text-text-muted hover:text-text-primary transition-colors duration-300 cursor-pointer"
                >
                  Продолжить покупки
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
