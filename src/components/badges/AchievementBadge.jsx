import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'

export default function AchievementBadge({ badge, earned, delay = 0 }) {
  const Icon = Icons[badge.icon] || Icons.Award

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`flex items-center gap-3 rounded-xl2 border p-4 transition-all ${
        earned
          ? 'border-forest-500/30 bg-forest-500/[0.06]'
          : 'border-forest-900/10 dark:border-forest-50/10 opacity-50 grayscale'
      }`}
    >
      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${earned ? 'bg-forest-500 text-white' : 'bg-forest-900/10 dark:bg-forest-50/10 text-ink-light/40 dark:text-ink-dark/40'}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold">{badge.title}</p>
        <p className="text-xs text-ink-light/50 dark:text-ink-dark/50">{badge.description}</p>
      </div>
    </motion.div>
  )
}
