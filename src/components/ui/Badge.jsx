const TONE_CLASSES = {
  forest: 'bg-forest-500/12 text-forest-600 dark:text-forest-300',
  lime: 'bg-lime-500/20 text-forest-700 dark:text-lime-400',
  clay: 'bg-clay-500/12 text-clay-500',
  slate: 'bg-slate-500/12 text-slate-600 dark:text-slate-300',
}

export default function Badge({ children, tone = 'forest', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${TONE_CLASSES[tone]} ${className}`}>
      {children}
    </span>
  )
}
