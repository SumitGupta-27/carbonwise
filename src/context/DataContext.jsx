import { createContext, useContext, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { buildDummyProducts } from '../utils/dummyData'
import { uid } from '../utils/formatters'
import { getEarnedBadges } from '../utils/achievements'

const DataContext = createContext(null)

let toastId = 0

export function DataProvider({ children }) {
  const [products, setProducts] = useLocalStorage('carbonwise-products', () => buildDummyProducts())
  const [toasts, setToasts] = useState([])
  const earnedBadgeIds = useRef(new Set())

  const pushToast = (message, variant = 'success') => {
    const id = ++toastId
    setToasts((t) => [...t, { id, message, variant }])
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id))
    }, 3800)
  }

  const dismissToast = (id) => setToasts((t) => t.filter((toast) => toast.id !== id))

  const checkNewBadges = (nextProducts) => {
    const earned = getEarnedBadges(nextProducts)
    earned.forEach((b) => {
      if (!earnedBadgeIds.current.has(b.id)) {
        earnedBadgeIds.current.add(b.id)
        pushToast(`Achievement unlocked: ${b.title}`, 'achievement')
      }
    })
  }

  const addProduct = (product) => {
    const entry = { id: uid(), createdAt: new Date().toISOString(), ...product }
    setProducts((prev) => {
      const next = [entry, ...prev]
      checkNewBadges(next)
      return next
    })
    pushToast('Product added to your footprint history.')
    return entry
  }

  const updateProduct = (id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
    pushToast('Product updated.')
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    pushToast('Product removed from history.', 'info')
  }

  const resetDemoData = () => {
    setProducts(buildDummyProducts())
    pushToast('Demo data restored.', 'info')
  }

  const clearAllData = () => {
    setProducts([])
    pushToast('All product data cleared.', 'info')
  }

  // pre-populate earned badges from existing data without firing toasts on load
  useMemo(() => {
    getEarnedBadges(products).forEach((b) => earnedBadgeIds.current.add(b.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDemoData,
    clearAllData,
    toasts,
    pushToast,
    dismissToast,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
