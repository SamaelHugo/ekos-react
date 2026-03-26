# ÉKOS — Fashion Catalog (React)

## Project
Multi-page fashion catalog rebuilt on React. Premium editorial design with routing, state management, animations. Portfolio project to demonstrate React skills.

## Technical Stack
- React 19 + Vite 8
- React Router v7 (multi-page)
- Tailwind CSS
- Framer Motion (animations)
- Zustand (cart state management)
- No backend — mock data in JSON

## Architecture
- /src/components — reusable UI components
- /src/pages — route pages (Home, Catalog, Product, About, Contact)
- /src/store — Zustand cart store
- /src/data — products.json with all product data
- /src/assets — images, video

## Design Direction
- Same ÉKOS brand: black + white + gold (#C5A258)
- Editorial high-fashion aesthetic
- Video hero on home page
- Smooth page transitions (Framer Motion)
- Dark theme default

## Pages
- / — Home (video hero + featured products + brand story)
- /catalog — Full catalog with filters, search, sorting
- /product/:id — Individual product page with gallery
- /about — Brand story
- /contact — Contact form

## Features
- Cart sidebar (Zustand global state)
- Product search
- Category filtering + sorting (price, new)
- Individual product pages with image gallery
- Smooth page transitions
- Mobile responsive
- Scroll animations

## Progress
- [x] Project setup (Vite + React + Router + Tailwind)
- [x] Layout (Nav + Footer + Cart Sidebar)
- [x] Home page (Hero + Featured + Brand)
- [x] Catalog page (Filters + Grid + Search)
- [x] Product page (Gallery + Details + Add to cart)
- [x] About + Contact pages
- [ ] Animations + polish