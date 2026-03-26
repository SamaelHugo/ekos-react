import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartSidebar from '../components/CartSidebar'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen bg-primary text-text-primary font-body overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <CartSidebar />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
