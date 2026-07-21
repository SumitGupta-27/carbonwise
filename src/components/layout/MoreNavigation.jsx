import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const activeLinkClass = 'bg-forest-500/12 text-forest-600 dark:text-forest-300'
const idleLinkClass = 'text-ink-light/65 dark:text-ink-dark/65 hover:bg-forest-500/8 hover:text-ink-light dark:hover:text-ink-dark'

export default function MoreNavigation({ items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const location = useLocation()
  const hasActiveItem = items.some((item) => location.pathname === item.to)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center gap-1 rounded-full px-2 py-2 text-sm font-medium transition-colors xl:px-3.5 ${hasActiveItem ? activeLinkClass : idleLinkClass}`}
      >
        <span aria-hidden="true">🌍</span> Explore <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            role="menu"
            className="absolute right-0 top-[calc(100%+0.6rem)] w-[22rem] rounded-xl2 border border-forest-900/8 bg-surface-light/85 p-2 shadow-soft backdrop-blur-xl dark:border-forest-50/10 dark:bg-surface-dark/85"
          >
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={({ isActive }) => `group flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${isActive ? activeLinkClass : `${idleLinkClass} hover:translate-x-0.5`}`}
              >
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest-500/10 text-forest-600 transition-colors group-hover:bg-forest-500 group-hover:text-white dark:text-forest-300">
                  <item.icon size={17} />
                </span>
                <span className="min-w-0"><span className="block text-sm font-semibold">{item.label}</span><span className="mt-0.5 block text-xs font-normal leading-relaxed text-ink-light/55 dark:text-ink-dark/55">{item.description}</span></span>
              </NavLink>
            ))}
            <p className="mx-3 mt-1 border-t border-forest-900/8 pt-3 pb-1 text-xs text-ink-light/45 dark:border-forest-50/10 dark:text-ink-dark/45">More sustainability features coming soon.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
