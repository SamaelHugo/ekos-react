import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'

/* ─── Filter config ─── */
const filters = [
  { key: 'all', label: 'Все' },
  { key: 'top', label: 'Верх' },
  { key: 'bottom', label: 'Низ' },
  { key: 'accessories', label: 'Аксессуары' },
  { key: 'new', label: 'Новинки' },
]

const sortOptions = [
  { key: 'default', label: 'По умолчанию' },
  { key: 'price-asc', label: 'Цена ↑' },
  { key: 'price-desc', label: 'Цена ↓' },
  { key: 'new', label: 'Новинки' },
]

/* ─── Catalog Card (layout-animated variant) ─── */
function CatalogCard({ product }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-w-0"
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-card">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
            loading="lazy"
          />
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            loading="lazy"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-black text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 z-10">
              New
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center">
            <span className="text-accent text-[11px] tracking-[0.15em] underline underline-offset-4">
              Быстрый просмотр
            </span>
          </div>
        </div>
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

/* ═══════════════════════════════════════════
   CATALOG PAGE
   ═══════════════════════════════════════════ */
export default function Catalog() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (activeFilter === 'new') {
      result = result.filter((p) => p.isNew)
    } else if (activeFilter !== 'all') {
      result = result.filter((p) => p.category === activeFilter)
    }

    // Search by name
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter((p) => p.name.toLowerCase().includes(q))
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'new':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return result
  }, [activeFilter, search, sort])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl md:text-6xl tracking-wide"
        >
          Коллекция
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-[11px] tracking-[0.25em] uppercase text-text-muted"
        >
          Весна — Лето 2026
        </motion.p>
      </section>

      {/* Controls */}
      <div className="sticky top-20 z-30 bg-primary/90 backdrop-blur-md border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12">
          {/* Mobile: search on top */}
          <div className="py-4 md:hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск..."
              className="w-full bg-transparent border-b border-white/20 text-text-primary text-sm py-2 placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-between gap-6 py-4">
            {/* Filters */}
            <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar shrink-0">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`relative text-[11px] uppercase tracking-[0.2em] whitespace-nowrap pb-2 transition-colors duration-300 cursor-pointer ${
                    activeFilter === f.key
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {f.label}
                  {activeFilter === f.key && (
                    <motion.span
                      layoutId="filter-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search + Sort — desktop */}
            <div className="hidden md:flex items-center gap-6">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск..."
                className="w-48 bg-transparent border-b border-white/20 text-text-primary text-[12px] py-1.5 placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent border-b border-white/20 text-text-muted text-[12px] py-1.5 focus:border-accent focus:outline-none cursor-pointer appearance-none pr-4"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.key} value={opt.key} className="bg-primary text-text-primary">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile sort */}
          <div className="pb-4 md:hidden">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 text-text-muted text-[12px] py-2 focus:border-accent focus:outline-none cursor-pointer appearance-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.key} value={opt.key} className="bg-primary text-text-primary">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results count + Grid */}
      <section className="w-full py-12 pb-32">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12">
          <p className="text-xs text-text-muted mb-10">
            Показано: {filtered.length} {filtered.length === 1 ? 'товар' : filtered.length < 5 ? 'товара' : 'товаров'}
          </p>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <CatalogCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <p className="text-text-muted text-sm mb-4">Ничего не найдено</p>
              <button
                onClick={() => { setActiveFilter('all'); setSearch(''); setSort('default') }}
                className="text-accent text-xs tracking-[0.2em] uppercase hover:text-text-primary transition-colors cursor-pointer"
              >
                Сбросить фильтры
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
