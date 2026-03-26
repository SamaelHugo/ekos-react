import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-w-0"
    >
      <Link to={`/product/${product.id}`} className="group block">
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-card">
          {/* Primary image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
            loading="lazy"
          />
          {/* Secondary image — revealed on hover */}
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            loading="lazy"
          />

          {/* NEW badge */}
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-black text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 z-10">
              New
            </span>
          )}

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center">
            <span className="text-accent text-[11px] tracking-[0.15em] underline underline-offset-4">
              Быстрый просмотр
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <h3 className="text-[13px] uppercase tracking-wider leading-snug">
            {product.name}
          </h3>
          <span className="text-[13px] text-accent whitespace-nowrap shrink-0">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
