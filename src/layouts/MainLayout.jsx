import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartSidebar from '../components/CartSidebar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-primary text-text-primary font-body">
      <Navbar />
      <CartSidebar />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
