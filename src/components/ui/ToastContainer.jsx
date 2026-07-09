import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, Trophy, X } from 'lucide-react'
import { useData } from '../../context/DataContext'

const ICONS = {
  success: CheckCircle2,
  info: Info,
  achievement: Trophy,
}

const TONE = {
  success: 'border-forest-500/30 text-forest-600 dark:text-forest-300',
  info: 'border-slate-500/30 text-slate-600 dark:text-slate-300',
  achievement: 'border-lime-500/40 text-forest-700 dark:text-lime-400',
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useData()

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 w-[calc(100%-2.5rem)] max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.variant] || Info
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
              className={`panel flex items-center gap-3 border-l-4 px-4 py-3 ${TONE[toast.variant] || TONE.info}`}
            >
              <Icon size={18} className="shrink-0" />
              <p className="text-sm text-ink-light dark:text-ink-dark flex-1">{toast.message}</p>
              <button
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
                className="text-ink-light/40 dark:text-ink-dark/40 hover:text-ink-light dark:hover:text-ink-dark transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
