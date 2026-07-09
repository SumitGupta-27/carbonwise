import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Leaf, Menu, Plus, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/history', label: 'History' },
  { to: '/insights', label: 'Insights' },
  { to: '/eco-tips', label: 'Eco Tips' },
  { to: '/impact', label: 'Impact' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-canvas-light/80 dark:bg-canvas-dark/80 backdrop-blur-md border-b border-forest-900/5 dark:border-forest-50/5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <NavLink to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
          <span className="w-8 h-8 rounded-full bg-forest-500 flex items-center justify-center">
            <Leaf size={16} className="text-white" />
          </span>
          CarbonWise
        </NavLink>

        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-forest-500/12 text-forest-600 dark:text-forest-300'
                    : 'text-ink-light/65 dark:text-ink-dark/65 hover:text-ink-light dark:hover:text-ink-dark'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <NavLink to="/add-product" className="btn-primary text-sm !px-5 !py-2.5">
            <Plus size={16} /> Add Product
          </NavLink>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button aria-label="Toggle menu" onClick={() => setOpen((o) => !o)} className="p-2">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-forest-900/5 dark:border-forest-50/5"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-xl text-sm font-medium ${
                      isActive ? 'bg-forest-500/12 text-forest-600 dark:text-forest-300' : 'text-ink-light/70 dark:text-ink-dark/70'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/add-product" onClick={() => setOpen(false)} className="btn-primary text-sm mt-2 justify-center">
                <Plus size={16} /> Add Product
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
