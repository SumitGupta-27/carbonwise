import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/ui/LoadingScreen'
import ToastContainer from './components/ui/ToastContainer'

import Landing from './pages/Landing'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import History from './pages/History'
import Insights from './pages/Insights'
import EcoTips from './pages/EcoTips'
import Impact from './pages/Impact'
import NotFound from './pages/NotFound'

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname])

  if (loading) return <LoadingScreen />

  return (
    <div className="min-h-screen flex flex-col bg-grain">
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/history" element={<History />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/eco-tips" element={<EcoTips />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}
