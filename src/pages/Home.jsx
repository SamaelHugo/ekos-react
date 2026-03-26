import { useCartStore } from '../store/cartStore'
import { products } from '../data/products'

export default function Home() {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6">
      <h1 className="font-heading text-6xl tracking-wide">ÉKOS</h1>
      <p className="text-text-muted text-sm tracking-[0.2em] uppercase">
        Осознанная эстетика
      </p>

      {/* Temporary test buttons — remove after testing */}
      <div className="mt-12 border border-white/10 p-8 max-w-md w-full">
        <p className="text-xs text-accent tracking-[0.2em] uppercase mb-6">
          Cart Test Panel (temporary)
        </p>
        <div className="flex flex-col gap-3">
          {products.slice(0, 3).map((product) => (
            <button
              key={product.id}
              onClick={() => addItem(product, product.sizes[0])}
              className="text-left px-4 py-3 border border-white/10 hover:border-accent text-sm text-text-muted hover:text-text-primary transition-all duration-300 cursor-pointer"
            >
              + {product.name} — {product.price.toLocaleString('ru-RU')} ₽
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
