import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Leaf, Lightbulb, Menu, Plus, Trophy, UsersRound, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import MoreNavigation from './MoreNavigation'

const PRIMARY_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/history', label: 'History' },
  { to: '/insights', label: 'Insights' },
  { to: '/about', label: 'About' },
]

const MORE_LINKS = [
  { to: '/eco-tips', label: 'Eco Tips', description: 'Learn practical ways to reduce your carbon footprint.', icon: Lightbulb },
  { to: '/community', label: 'Community', description: 'Connect with other eco-conscious users.', icon: UsersRound },
  { to: '/doomsday-challenge', label: 'Doomsday Challenge', description: 'Coming Soon • Earn rewards and achievements.', icon: Trophy },
]

const MOBILE_LINKS = [...PRIMARY_LINKS, ...MORE_LINKS, { to: '/impact', label: 'Impact' }]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-canvas-light/80 dark:bg-canvas-dark/80 backdrop-blur-md border-b border-forest-900/5 dark:border-forest-50/5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-6 xl:px-8 h-16">
        <NavLink to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
          <span className="w-8 h-8 rounded-full bg-forest-500 flex items-center justify-center">
            <Leaf size={16} className="text-white" />
          </span>
          CarbonWise
        </NavLink>

        <div className="hidden md:flex items-center gap-0 xl:gap-1">
          {PRIMARY_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `px-2 py-2 rounded-full text-sm font-medium transition-colors xl:px-3.5 ${
                  isActive
                    ? 'bg-forest-500/12 text-forest-600 dark:text-forest-300'
                    : 'text-ink-light/65 dark:text-ink-dark/65 hover:text-ink-light dark:hover:text-ink-dark'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <MoreNavigation items={MORE_LINKS} />
        </div>

        <div className="hidden md:flex items-center gap-2 xl:gap-3">
          <ThemeToggle />
          <NavLink to="/add-product" className="btn-primary text-sm !px-3.5 !py-2.5 xl:!px-5">
            <Plus size={16} /> Add Product
          </NavLink>
        </div>

        <div className="flex items-center gap-3 md:hidden">
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
            className="md:hidden overflow-hidden border-t border-forest-900/5 dark:border-forest-50/5"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {MOBILE_LINKS.map((link) => (
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
