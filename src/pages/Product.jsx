import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import { useCartStore } from '../store/cartStore'
import ProductCard from '../components/ProductCard'
import PageTransition from '../components/PageTransition'

/* ─── Features list ─── */
const features = [
  { icon: '📦', text: 'Бесплатная доставка от 10 000 ₽' },
  { icon: '↩️', text: 'Возврат в течение 14 дней' },
  { icon: '🌿', text: 'Натуральные материалы' },
]

export default function Product() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  const related = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [product])

  /* ─── 404 ─── */
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="font-heading text-4xl">Товар не найден</h1>
        <Link
          to="/catalog"
          className="text-accent text-xs tracking-[0.2em] uppercase hover:text-text-primary transition-colors"
        >
          Вернуться в каталог
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      openCart()
    }, 800)
  }

  return (
    <PageTransition>
    <div className="min-h-screen">
      {/* Main product section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* LEFT — Gallery */}
            <div className="lg:col-span-7">
              {/* Main image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-card group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={product.images[activeImage]}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </AnimatePresence>

                {product.isNew && (
                  <span className="absolute top-5 left-5 bg-black text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 z-10">
                    New
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 mt-4 overflow-x-auto no-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-20 aspect-[3/4] overflow-hidden cursor-pointer border-2 transition-colors duration-300 ${
                      activeImage === i ? 'border-accent' : 'border-transparent hover:border-white/30'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — Details */}
            <div className="lg:col-span-5 lg:sticky lg:top-40 lg:self-start">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-text-muted">
                <Link to="/" className="hover:text-text-primary transition-colors">
                  Главная
                </Link>
                <span>/</span>
                <Link to="/catalog" className="hover:text-text-primary transition-colors">
                  Каталог
                </Link>
                <span>/</span>
                <span className="text-text-primary truncate">{product.name}</span>
              </nav>

              {/* Name + Price */}
              <h1 className="font-heading text-3xl md:text-4xl mt-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-accent mt-2">
                {product.price.toLocaleString('ru-RU')} ₽
              </p>

              {/* Description */}
              <p className="text-sm text-text-muted leading-relaxed mt-6 max-w-md">
                {product.description}
              </p>

              <div className="border-t border-white/10 my-8" />

              {/* Size selector */}
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted">
                  Размер
                </span>
                <div className="flex flex-wrap gap-3 mt-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false) }}
                      className={`w-12 h-12 border text-sm transition-all duration-300 cursor-pointer ${
                        selectedSize === size
                          ? 'bg-white text-black border-white'
                          : 'border-white/20 text-text-primary hover:border-white/60'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-2"
                  >
                    Выберите размер
                  </motion.p>
                )}
              </div>

              {/* Add to cart */}
              <motion.button
                onClick={handleAddToCart}
                animate={sizeError ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`mt-8 w-full py-4 text-[11px] uppercase tracking-[0.2em] font-body font-medium transition-all duration-300 cursor-pointer ${
                  added
                    ? 'bg-accent text-black border border-accent'
                    : 'bg-white text-black border border-white hover:bg-accent hover:border-accent'
                }`}
              >
                {added ? '✓ Добавлено' : 'Добавить в корзину'}
              </motion.button>

              {/* Features */}
              <div className="mt-8 space-y-3">
                {features.map((f) => (
                  <div key={f.text} className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="text-sm">{f.icon}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="w-full pb-32">
          <div className="max-w-[1600px] mx-auto px-8 md:px-12">
            <h2 className="font-heading text-2xl md:text-3xl tracking-wide mb-12">
              Вам может понравиться
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
    </PageTransition>
  )
}
