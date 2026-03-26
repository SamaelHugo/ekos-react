import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'

export default function CartSidebar() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const getTotal = useCartStore((s) => s.getTotal)
  const clearCart = useCartStore((s) => s.clearCart)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-secondary z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
              <h2 className="font-heading text-xl tracking-[0.15em]">Cart</h2>
              <button
                onClick={closeCart}
                className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="text-text-muted text-sm text-center mt-20">
                  Your cart is empty.
                </p>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover bg-card"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-body">{item.name}</p>
                          <p className="text-xs text-text-muted mt-1">
                            Size: {item.size}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="text-text-muted hover:text-text-primary text-xs cursor-pointer"
                            >
                              &minus;
                            </button>
                            <span className="text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="text-text-muted hover:text-text-primary text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-text-muted hover:text-accent self-start cursor-pointer"
                        aria-label={`Remove ${item.name}`}
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

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs tracking-[0.15em] uppercase text-text-muted">
                    Total
                  </span>
                  <span className="text-lg font-heading">
                    ${getTotal().toLocaleString()}
                  </span>
                </div>
                <button className="w-full py-4 bg-accent text-primary text-xs tracking-[0.2em] uppercase font-body font-semibold hover:bg-accent-dark transition-colors duration-300 cursor-pointer">
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full mt-3 py-3 text-xs tracking-[0.15em] uppercase text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
