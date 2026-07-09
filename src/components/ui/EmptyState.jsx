import { motion } from 'framer-motion'

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      <div className="w-16 h-16 rounded-full bg-forest-500/10 flex items-center justify-center mb-4">
        {Icon && <Icon size={28} className="text-forest-500" />}
      </div>
      <h3 className="text-lg font-display font-semibold mb-1.5">{title}</h3>
      <p className="text-sm text-ink-light/60 dark:text-ink-dark/60 max-w-sm mb-6">{description}</p>
      {action}
    </motion.div>
  )
}
