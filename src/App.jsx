import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/ui/LoadingScreen'
import ToastContainer from './components/ui/ToastContainer'

const Landing = lazy(() => import('./pages/Landing'))
const About = lazy(() => import('./pages/About'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const AddProduct = lazy(() => import('./pages/AddProduct'))
const History = lazy(() => import('./pages/History'))
const Insights = lazy(() => import('./pages/Insights'))
const EcoTips = lazy(() => import('./pages/EcoTips'))
const Impact = lazy(() => import('./pages/Impact'))
const Community = lazy(() => import('./pages/Community'))
const DoomsdayChallenge = lazy(() => import('./pages/DoomsdayChallenge'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
          <Suspense fallback={<div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 text-ink-light/55 dark:text-ink-dark/55">Loading page...</div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/history" element={<History />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/eco-tips" element={<EcoTips />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/community" element={<Community />} />
            <Route path="/doomsday-challenge" element={<DoomsdayChallenge />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </AnimatePresence>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}
